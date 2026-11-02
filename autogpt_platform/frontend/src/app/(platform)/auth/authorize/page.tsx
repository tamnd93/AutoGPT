"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthCard } from "@/components/auth/AuthCard";
import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button/Button";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import {
  postOauthAuthorize,
  useGetOauthGetOauthAppInfo,
} from "@/app/api/__generated__/endpoints/oauth/oauth";
import type { APIKeyPermission } from "@/app/api/__generated__/models/aPIKeyPermission";
import { SCOPE_DESCRIPTION_KEYS } from "@/lib/api-key-scopes";
import { CheckmarkBadge01Icon, Image01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { ApiError } from "@/lib/autogpt-server-api/helpers";
import { useT } from "@/lib/i18n";

export default function AuthorizePage() {
  const t = useT();
  const searchParams = useSearchParams();

  // Extract OAuth parameters from URL
  const clientID = searchParams.get("client_id");
  const redirectURI = searchParams.get("redirect_uri");
  const scope = searchParams.get("scope");
  const state = searchParams.get("state");
  const codeChallenge = searchParams.get("code_challenge");
  const codeChallengeMethod =
    searchParams.get("code_challenge_method") || "S256";
  const responseType = searchParams.get("response_type") || "code";

  // Parse requested scopes
  const requestedScopes = scope?.split(" ").filter(Boolean) || [];

  // Fetch application info using generated hook
  const {
    data: appInfoResponse,
    isLoading,
    error,
    refetch,
  } = useGetOauthGetOauthAppInfo(
    encodeURIComponent(clientID || ""),
    { redirect_uri: redirectURI },
    {
      query: {
        enabled: !!clientID && !!redirectURI,
        staleTime: Infinity,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      },
    },
  );

  const appInfo = appInfoResponse?.status === 200 ? appInfoResponse.data : null;

  // Validate required parameters
  const missingParams: string[] = [];
  if (!clientID) missingParams.push("client_id");
  if (!redirectURI) missingParams.push("redirect_uri");
  if (!scope) missingParams.push("scope");
  if (!state) missingParams.push("state");
  if (!codeChallenge) missingParams.push("code_challenge");

  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [authorizeError, setAuthorizeError] = useState<string | null>(null);

  async function handleApprove() {
    setIsAuthorizing(true);
    setAuthorizeError(null);

    try {
      // Call the backend /oauth/authorize POST endpoint
      // Returns JSON with redirect_url that we use to redirect the user
      const response = await postOauthAuthorize({
        client_id: clientID!,
        redirect_uri: redirectURI!,
        scopes: requestedScopes,
        state: state!,
        response_type: responseType,
        code_challenge: codeChallenge!,
        code_challenge_method: codeChallengeMethod as "S256" | "plain",
      });

      if (response.status === 200 && response.data.redirect_url) {
        window.location.href = response.data.redirect_url;
      } else {
        setAuthorizeError(t("auth1.authorize.failedNoRedirect"));
        setIsAuthorizing(false);
      }
    } catch (err) {
      console.error("Authorization error:", err);
      setAuthorizeError(
        err instanceof Error ? err.message : t("auth1.authorize.failed"),
      );
      setIsAuthorizing(false);
    }
  }

  function handleDeny() {
    // appInfo loads only once the backend accepts redirectURI for this client
    if (!appInfo) return;
    const params = new URLSearchParams({
      error: "access_denied",
      error_description: "User denied access",
      state: state || "",
    });
    window.location.href = `${redirectURI}?${params.toString()}`;
  }

  // Show error if missing required parameters
  if (missingParams.length > 0) {
    return (
      <div className="flex h-full min-h-[85vh] flex-col items-center justify-center py-10">
        <AuthCard title={t("auth1.authorize.invalidRequest")}>
          <ErrorCard
            context={t("auth1.authorize.paramsContext")}
            responseError={{
              message: t("auth1.authorize.missingParams", {
                params: missingParams.join(", "),
              }),
            }}
            hint={t("auth1.authorize.hint")}
            isOurProblem={false}
          />
        </AuthCard>
      </div>
    );
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-full min-h-[85vh] flex-col items-center justify-center py-10">
        <AuthCard title={t("auth1.authorize.loadingTitle")}>
          <div className="flex flex-col items-center gap-4 py-8">
            <LoadingSpinner size="large" />
            <Text variant="body" className="text-center text-slate-500">
              {t("auth1.authorize.loadingApp")}
            </Text>
          </div>
        </AuthCard>
      </div>
    );
  }

  // Unknown app or unregistered redirect_uri: never send the user to it
  if (error || !appInfo) {
    const redirectRejected = error instanceof ApiError && error.status === 400;
    return (
      <div className="flex h-full min-h-[85vh] flex-col items-center justify-center py-10">
        <AuthCard
          title={
            redirectRejected
              ? t("auth1.authorize.invalidRequest")
              : t("auth1.authorize.appNotFound")
          }
        >
          <ErrorCard
            context={t("auth1.authorize.appContext")}
            responseError={
              error
                ? error
                : {
                    message: t("auth1.authorize.appMissing"),
                  }
            }
            onRetry={refetch}
          />
        </AuthCard>
      </div>
    );
  }

  // Validate that requested scopes are allowed by the app
  const invalidScopes = requestedScopes.filter(
    (s) => !appInfo.scopes.includes(s),
  );

  if (invalidScopes.length > 0) {
    return (
      <div className="flex h-full min-h-[85vh] flex-col items-center justify-center py-10">
        <AuthCard title={t("auth1.authorize.invalidScopes")}>
          <ErrorCard
            context={t("auth1.authorize.scopesContext")}
            responseError={{
              message: t("auth1.authorize.scopesMessage", {
                scopes: invalidScopes.join(", "),
              }),
            }}
            hint={t("auth1.authorize.hint")}
            isOurProblem={false}
          />
          <Button
            variant="secondary"
            onClick={handleDeny}
            className="mt-4 w-full"
          >
            {t("auth1.authorize.returnToApp")}
          </Button>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-[85vh] flex-col items-center justify-center py-10">
      <AuthCard title={t("auth1.authorize.title")}>
        <div className="flex w-full flex-col gap-6">
          {/* App info */}
          <div className="flex flex-col items-center text-center">
            {/* App logo */}
            <div className="mb-4 flex size-16 items-center justify-center overflow-hidden rounded-xl border bg-slate-100">
              {appInfo.logo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={appInfo.logo_url}
                  alt={t("auth1.authorize.logoAlt", { name: appInfo.name })}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Icon icon={Image01Icon} className="h-8 w-8 text-slate-400" />
              )}
            </div>
            <Text variant="h4" className="mb-2">
              {appInfo.name}
            </Text>
            {appInfo.description && (
              <Text variant="body" className="text-slate-600">
                {appInfo.description}
              </Text>
            )}
          </div>

          {/* Permissions */}
          <div>
            <Text variant="body-medium" className="mb-3">
              {t("auth1.authorize.requesting")}
            </Text>
            <ul className="space-y-2">
              {requestedScopes.map((scopeKey) => (
                <li key={scopeKey} className="flex items-start gap-3">
                  <Icon
                    icon={CheckmarkBadge01Icon}
                    className="mt-0.5 text-green-600"
                  />
                  <Text variant="body">
                    {SCOPE_DESCRIPTION_KEYS[scopeKey as APIKeyPermission]
                      ? t(
                          SCOPE_DESCRIPTION_KEYS[
                            scopeKey as APIKeyPermission
                          ],
                        )
                      : scopeKey}
                  </Text>
                </li>
              ))}
            </ul>
          </div>

          {/* Error message */}
          {authorizeError && (
            <ErrorCard
              context={t("auth1.authorize.authzContext")}
              responseError={{ message: authorizeError }}
            />
          )}

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              onClick={handleApprove}
              disabled={isAuthorizing}
              className="w-full text-lg"
            >
              {isAuthorizing
                ? t("auth1.authorize.authorizing")
                : t("auth1.authorize.authorize")}
            </Button>
            <Button
              variant="secondary"
              onClick={handleDeny}
              disabled={isAuthorizing}
              className="w-full text-lg"
            >
              {t("auth1.authorize.deny")}
            </Button>
          </div>

          {/* Warning */}
          <Text variant="small" className="text-center text-slate-500">
            {t("auth1.authorize.warning")}
          </Text>
        </div>
      </AuthCard>
    </div>
  );
}
