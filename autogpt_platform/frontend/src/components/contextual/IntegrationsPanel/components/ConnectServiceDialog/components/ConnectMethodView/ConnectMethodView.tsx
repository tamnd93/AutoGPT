"use client";

import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";
import { AutoGPTLogo } from "@/components/atoms/AutoGPTLogo/AutoGPTLogo";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { DeviceAuthConnectButton } from "@/components/contextual/DeviceAuth/DeviceAuthConnectButton";
import { McpFirstPanel } from "@/components/contextual/IntegrationsPanel/components/ConnectServiceDialog/components/DetailView/McpFirstPanel";
import { ProviderAvatar } from "@/components/contextual/IntegrationsPanel/components/ConnectServiceDialog/components/DetailView/ProviderAvatar";
import type { ApiKeyConnectFormValues } from "@/components/contextual/IntegrationsPanel/components/ConnectServiceDialog/components/DetailView/schema";
import { UnsupportedNotice } from "@/components/contextual/IntegrationsPanel/components/ConnectServiceDialog/components/DetailView/UnsupportedNotice";
import {
  AuthType,
  getSignInFallbackLabel,
  type AuthMethod,
  type ConnectableProvider,
} from "@/components/contextual/IntegrationsPanel/components/ConnectServiceDialog/helpers";
import type { UseFormReturn } from "react-hook-form";
import { InlineApiKeyForm } from "./InlineApiKeyForm";
import { InlineHostScopedForm } from "./InlineHostScopedForm";
import { InlineUserPasswordForm } from "./InlineUserPasswordForm";
import {
  GlobeIcon,
  Key01Icon,
  SecurityCheckIcon,
  SmartPhone01Icon,
  UserIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { AnimatePresence, domAnimation, LazyMotion, m } from "framer-motion";
import { useLocale, useT } from "@/lib/i18n";

interface Props {
  provider: ConnectableProvider;
  selectedMethod: AuthMethod | null;
  onSelectMethod: (method: AuthMethod | null) => void;
  apiKeyForm: UseFormReturn<ApiKeyConnectFormValues>;
  onApiKeySubmit: (values: ApiKeyConnectFormValues) => void;
  /** The host the requesting block will call, when one is in scope. */
  hostScopedHost?: string;
  /** A method that completes inside this view rather than through the
   *  panel footer's Continue: device auth, host-scoped, user/password. */
  onInlineConnectSuccess: (credential?: CredentialsMetaResponse) => void;
  /** Offers the vendor's own sign-in beside the block methods. The host
   *  owns which side shows, since the sign-in carries its own Back. */
  mcpSignIn?: {
    showNative: boolean;
    onShowNativeChange: (showNative: boolean) => void;
    onBack: () => void;
  };
}

export const METHOD_ORDER: AuthMethod[] = [
  AuthType.oauth2,
  AuthType.device_code,
  AuthType.api_key,
  AuthType.user_password,
  AuthType.host_scoped,
];

function getMethodCopy(t: ReturnType<typeof useT>): Record<
  AuthMethod,
  {
    label: string;
    description: string;
    icon: IconSvgElement;
    recommended?: boolean;
  }
> {
  return {
    [AuthType.oauth2]: {
      label: t("connectServices1.methodView.oauthLabel"),
      description: t("connectServices1.methodView.oauthDesc"),
      icon: SecurityCheckIcon,
      recommended: true,
    },
    [AuthType.api_key]: {
      label: t("connectServices1.methodView.apiKeyLabel"),
      description: t("connectServices1.methodView.apiKeyDesc"),
      icon: Key01Icon,
    },
    [AuthType.user_password]: {
      label: t("connectServices1.methodView.userPasswordLabel"),
      description: t("connectServices1.methodView.userPasswordDesc"),
      icon: UserIcon,
    },
    [AuthType.host_scoped]: {
      label: t("connectServices1.methodView.hostScopedLabel"),
      description: t("connectServices1.methodView.hostScopedDesc"),
      icon: GlobeIcon,
    },
    [AuthType.device_code]: {
      label: t("connectServices1.methodView.deviceCodeLabel"),
      description: t("connectServices1.methodView.deviceCodeDesc"),
      icon: SmartPhone01Icon,
    },
  };
}

// The connect step behind a provider click: logo pair, "Connect AutoGPT
// to X", method radio cards. Form methods expand their inputs inline as
// an accordion; OAuth is driven by the panel footer's Continue.
export function ConnectMethodView({
  provider,
  selectedMethod,
  onSelectMethod,
  apiKeyForm,
  onApiKeySubmit,
  hostScopedHost,
  onInlineConnectSuccess,
  mcpSignIn,
}: Props) {
  const t = useT();
  const locale = useLocale();
  const methodCopy = getMethodCopy(t);
  const methods = METHOD_ORDER.filter((method) =>
    provider.supportedAuthTypes.includes(method),
  );
  const offersMcp = Boolean(provider.mcpServer && mcpSignIn);
  const showMcp = offersMcp && !mcpSignIn?.showNative;

  function handleUseSignIn() {
    onSelectMethod(null);
    mcpSignIn?.onShowNativeChange(false);
  }

  return (
    // `m` + a local provider, so this renders both standalone and inside
    // the copilot tool chain's strict LazyMotion, which rejects `motion`.
    <LazyMotion features={domAnimation}>
      <div className="flex flex-col gap-5 pt-2">
        <div className="flex items-center justify-center gap-6">
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-separator">
            <AutoGPTLogo
              hideText
              className="absolute left-1/2 top-1/2 h-8 w-[4.4rem] -translate-x-[77%] -translate-y-1/2"
            />
          </span>
          <span aria-hidden className="grid grid-cols-3 gap-1.5">
            {Array.from({ length: 9 }, (_, dot) => (
              <span
                key={dot}
                // TODO(tokens): no exact role for bg-[#5b21b6]/30
                className="h-1 w-1 rounded-full bg-[#5b21b6]/30"
              />
            ))}
          </span>
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface shadow-[0_8px_24px_rgba(0,0,0,0.08)] ring-1 ring-separator">
            <ProviderAvatar
              id={provider.iconId ?? provider.id}
              name={provider.name}
            />
          </span>
        </div>

        <div className="flex flex-col gap-1.5 text-center">
          <Text
            variant="h3"
            className="!text-lead !leading-10 text-foreground-strong"
          >
            {showMcp
              ? t("connectServices1.methodView.connectProvider", {
                  provider: provider.name,
                })
              : t("connectServices1.methodView.connectAutoGpt", {
                  provider: provider.name,
                })}
          </Text>
          {showMcp ? null : (
            <Text variant="body" className="!text-foreground-tertiary">
              {t("connectServices1.methodView.chooseHow", {
                provider: provider.name,
              })}
            </Text>
          )}
        </div>

        {showMcp && provider.mcpServer ? (
          <McpFirstPanel
            server={provider.mcpServer}
            nativeMethods={methods}
            onUseNative={() => mcpSignIn?.onShowNativeChange(true)}
            onSuccess={onInlineConnectSuccess}
            onBack={mcpSignIn?.onBack}
          />
        ) : (
          <div className="flex flex-col gap-4">
            <div
              // TODO(tokens): no exact role for bg-neutral-100 #f5f5f5
              className="flex flex-col gap-1 rounded-2xl bg-neutral-100 p-1.5"
            >
              {methods.map((method) => {
                const copy = methodCopy[method];
                const isSelected = selectedMethod === method;
                const hasInlineForm = method !== AuthType.oauth2;
                return (
                  <div
                    key={method}
                    className={
                      isSelected ? "rounded-xl bg-surface shadow-sm" : ""
                    }
                  >
                    <button
                      type="button"
                      onClick={() => onSelectMethod(method)}
                      className={
                        isSelected
                          ? "flex w-full items-center gap-3 rounded-xl p-3 text-left"
                          : "flex w-full items-center gap-3 rounded-xl p-3 text-left transition-colors hover:bg-surface/60"
                      }
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-surface shadow-sm">
                        <Icon
                          icon={copy.icon}
                          size={22}
                          className="text-foreground-body"
                        />
                      </span>
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground-strong">
                            {copy.label}
                          </span>
                          {copy.recommended && (
                            <span
                              // TODO(tokens): no exact role for bg-violet-100 #ede9fe
                              className="rounded-md bg-violet-100 px-1.5 py-0.5 text-tiny font-semibold leading-inherit tracking-wide text-accent-strong"
                            >
                              {t("connectServices1.methodView.recommended")}
                            </span>
                          )}
                        </span>
                        <span className="text-xs text-foreground-tertiary">
                          {copy.description}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={
                          // TODO(tokens): no exact role for border-violet-600 #7c3aed
                          isSelected
                            ? "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-violet-600"
                            : "h-5 w-5 shrink-0 rounded-full border-2 border-border-base"
                        }
                      >
                        {isSelected && (
                          <span
                            // TODO(tokens): no exact role for bg-violet-600 #7c3aed
                            className="h-2.5 w-2.5 rounded-full bg-violet-600"
                          />
                        )}
                      </span>
                    </button>
                    {/* Form methods open in place: the card grows to reveal the
                      inputs, submit included — no separate step. */}
                    <AnimatePresence initial={false}>
                      {isSelected && hasInlineForm && (
                        <m.div
                          key="form"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-3 pb-3">
                            {method === AuthType.api_key ? (
                              <InlineApiKeyForm
                                form={apiKeyForm}
                                providerName={provider.name}
                                onSubmit={onApiKeySubmit}
                              />
                            ) : method === AuthType.device_code ? (
                              <DeviceAuthConnectButton
                                provider={provider.id}
                                providerName={provider.name}
                                onSuccess={onInlineConnectSuccess}
                              />
                            ) : method === AuthType.host_scoped ? (
                              <InlineHostScopedForm
                                provider={provider.id}
                                host={hostScopedHost}
                                onSuccess={onInlineConnectSuccess}
                              />
                            ) : method === AuthType.user_password ? (
                              <InlineUserPasswordForm
                                provider={provider.id}
                                providerName={provider.name}
                                onSuccess={onInlineConnectSuccess}
                              />
                            ) : (
                              <UnsupportedNotice providerName={provider.name} />
                            )}
                          </div>
                        </m.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
            {offersMcp ? (
              <Button variant="ghost" size="small" onClick={handleUseSignIn}>
                {getSignInFallbackLabel(provider, locale)}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </LazyMotion>
  );
}
