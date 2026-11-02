import {
  useGetPlatformLinkingGetDisplayInfoForALinkToken,
  usePostPlatformLinkingConfirmAServerLinkTokenUserMustBeAuthenticated,
  usePostPlatformLinkingConfirmAUserLinkTokenUserMustBeAuthenticated,
} from "@/app/api/__generated__/endpoints/platform-linking/platform-linking";
import { ConfirmLinkResponse } from "@/app/api/__generated__/models/confirmLinkResponse";
import { ConfirmUserLinkResponse } from "@/app/api/__generated__/models/confirmUserLinkResponse";
import { LinkType } from "@/app/api/__generated__/models/linkType";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import { useLocale, useT } from "@/lib/i18n";
import { useParams, useSearchParams } from "next/navigation";
import {
  getLoginRedirect,
  getPlatformDisplayName,
  getTelegramAuth,
  isUserLink,
  TOKEN_PATTERN,
} from "./helpers";

export type PageStatus =
  | "loading"
  | "not-authenticated"
  | "ready"
  | "linking"
  | "success"
  | "error";

interface ViewData {
  linkType: LinkType;
  platform: string;
  serverName: string | null;
  serverNoun: string;
}

export function usePlatformLinkingPage() {
  const t = useT();
  const locale = useLocale();
  const params = useParams();
  const searchParams = useSearchParams();
  const rawToken = (params.token as string | undefined) ?? "";
  const token = TOKEN_PATTERN.test(rawToken) ? rawToken : null;
  const platformFromUrl = getPlatformDisplayName(
    searchParams.get("platform"),
    locale,
  );
  const { user, isUserLoading, logOut } = useAuth();

  const {
    data: info,
    isLoading: isInfoLoading,
    isError: isInfoError,
  } = useGetPlatformLinkingGetDisplayInfoForALinkToken(token ?? "", {
    query: {
      enabled: Boolean(token) && Boolean(user),
      select: (res) => (res && res.status === 200 ? res.data : undefined),
      retry: false,
    },
  });

  const serverConfirm =
    usePostPlatformLinkingConfirmAServerLinkTokenUserMustBeAuthenticated();
  const userConfirm =
    usePostPlatformLinkingConfirmAUserLinkTokenUserMustBeAuthenticated();

  const mutation =
    info && isUserLink(info.link_type) ? userConfirm : serverConfirm;
  const confirmResponse =
    mutation.data && mutation.data.status >= 200 && mutation.data.status < 300
      ? (mutation.data.data as ConfirmLinkResponse | ConfirmUserLinkResponse)
      : undefined;

  const status = resolveStatus({
    hasToken: Boolean(token),
    isUserLoading,
    hasUser: Boolean(user),
    isInfoLoading,
    isInfoError,
    isMutating: mutation.isPending,
    isMutationSuccess: mutation.isSuccess,
    isMutationError: mutation.isError,
  });

  function handleLink() {
    if (!token || !info) return;
    // A login_url button tap appends a Telegram-signed identity to this
    // page's URL; forwarding it lets the backend verify WHO opened the link.
    mutation.mutate({
      token,
      data: { telegram_auth: getTelegramAuth(searchParams) },
    });
  }

  async function handleSwitchAccount() {
    await logOut();
    window.location.href = getLoginRedirect(token);
  }

  return {
    status,
    token,
    loginRedirect: getLoginRedirect(token),
    userEmail: user?.email ?? null,
    viewData: buildViewData({ info, platformFromUrl, locale, t }),
    successData: buildSuccessData({
      confirmResponse,
      fallbackPlatform: platformFromUrl,
      serverNoun: info?.server_noun ?? t("sharing1.link.serverNounFallback"),
      locale,
      t,
    }),
    errorMessage: buildErrorMessage({
      hasToken: Boolean(token),
      isInfoError,
      mutation,
      t,
    }),
    handleLink,
    handleSwitchAccount,
  };
}

function resolveStatus(args: {
  hasToken: boolean;
  isUserLoading: boolean;
  hasUser: boolean;
  isInfoLoading: boolean;
  isInfoError: boolean;
  isMutating: boolean;
  isMutationSuccess: boolean;
  isMutationError: boolean;
}): PageStatus {
  if (!args.hasToken) return "error";
  if (args.isUserLoading) return "loading";
  if (!args.hasUser) return "not-authenticated";
  if (args.isMutationSuccess) return "success";
  if (args.isMutationError) return "error";
  if (args.isMutating) return "linking";
  if (args.isInfoLoading) return "loading";
  if (args.isInfoError) return "error";
  return "ready";
}

function buildViewData(args: {
  locale: ReturnType<typeof useLocale>;
  t: ReturnType<typeof useT>;
  info:
    | {
        link_type: LinkType;
        platform: string;
        server_name?: string | null;
        server_noun?: string;
      }
    | undefined;
  platformFromUrl: string;
}): ViewData | null {
  if (!args.info) return null;
  return {
    linkType: args.info.link_type,
    platform:
      getPlatformDisplayName(args.info.platform, args.locale) ||
      args.platformFromUrl,
    serverName: args.info.server_name ?? null,
    serverNoun: args.info.server_noun ?? args.t("sharing1.link.serverNounFallback"),
  };
}

function buildSuccessData(args: {
  locale: ReturnType<typeof useLocale>;
  t: ReturnType<typeof useT>;
  confirmResponse: ConfirmLinkResponse | ConfirmUserLinkResponse | undefined;
  fallbackPlatform: string;
  serverNoun: string;
}): (ViewData & { platform: string; returnUrl: string | null }) | null {
  if (!args.confirmResponse) return null;
  const serverName =
    "server_name" in args.confirmResponse
      ? (args.confirmResponse.server_name ?? null)
      : null;
  return {
    linkType: args.confirmResponse.link_type ?? LinkType.SERVER,
    platform:
      getPlatformDisplayName(args.confirmResponse.platform, args.locale) ||
      args.fallbackPlatform,
    serverName,
    // From the token info — the confirm response carries no noun.
    serverNoun: args.serverNoun,
    returnUrl: args.confirmResponse.return_url ?? null,
  };
}

function buildErrorMessage(args: {
  hasToken: boolean;
  isInfoError: boolean;
  mutation: { error: unknown };
  t: ReturnType<typeof useT>;
}): string {
  const defaultError = args.t("sharing1.link.errorCompleteFailed");
  if (!args.hasToken) {
    return args.t("sharing1.link.errorMalformed");
  }
  if (args.mutation.error) {
    return extractDetail(args.mutation.error) ?? defaultError;
  }
  if (args.isInfoError) {
    return args.t("sharing1.link.errorLoadDetails");
  }
  return defaultError;
}

function extractDetail(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;
  const responseDetail = extractDetailFromPayload(
    (error as { response?: unknown }).response,
  );
  if (responseDetail) return responseDetail;

  const dataDetail = extractDetailFromPayload(
    (error as { data?: unknown }).data,
  );
  if (dataDetail) return dataDetail;

  const message = (error as { message?: unknown }).message;
  return typeof message === "string" ? message : undefined;
}

function extractDetailFromPayload(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") return undefined;
  const detail = (payload as { detail?: unknown }).detail;
  return typeof detail === "string" ? detail : undefined;
}
