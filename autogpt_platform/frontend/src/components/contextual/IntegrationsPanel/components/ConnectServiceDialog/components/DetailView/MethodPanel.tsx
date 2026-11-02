"use client";

import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";

import {
  AuthType,
  type AuthMethod,
  type ConnectableProvider,
} from "../../helpers";
import { ApiKeyConnectForm } from "./ApiKeyConnectForm";
import { DeviceAuthConnectButton } from "@/components/contextual/DeviceAuth/DeviceAuthConnectButton";
import { ChatGPTConnectExplainer } from "./ChatGPTConnectExplainer";
import { InlineHostScopedForm } from "../ConnectMethodView/InlineHostScopedForm";
import { InlineUserPasswordForm } from "../ConnectMethodView/InlineUserPasswordForm";
import { OAuthConnectButton } from "./OAuthConnectButton";
import { UnsupportedNotice } from "./UnsupportedNotice";
import { useT } from "@/lib/i18n";

function getTabLabels(t: ReturnType<typeof useT>): Record<AuthMethod, string> {
  return {
    [AuthType.oauth2]: t("connectServices1.tab.oauth"),
    [AuthType.api_key]: t("connectServices1.tab.apiKey"), // pragma: allowlist secret
    [AuthType.user_password]: t("connectServices1.tab.userPassword"), // pragma: allowlist secret
    [AuthType.host_scoped]: t("connectServices1.tab.host"),
    [AuthType.device_code]: t("connectServices1.tab.deviceAuth"),
  };
}

interface Props {
  method: AuthMethod;
  provider: ConnectableProvider;
  onSuccess: (credential?: CredentialsMetaResponse) => void;
}

export function MethodPanel({ method, provider, onSuccess }: Props) {
  const t = useT();
  const TAB_LABEL = getTabLabels(t);
  const authProvider = getAuthProvider(provider, method);
  if (method === AuthType.oauth2) {
    const isChatGPT = authProvider === "codex";
    return (
      <div className="flex flex-col gap-4">
        {isChatGPT && <ChatGPTConnectExplainer />}
        <OAuthConnectButton
          provider={authProvider}
          providerName={isChatGPT ? "ChatGPT" : provider.name}
          buttonLabel={
            isChatGPT ? t("connectServices1.tab.signInChatGpt") : undefined
          }
          termsNotice={isChatGPT ? "OpenAI" : undefined}
          onSuccess={onSuccess}
        />
      </div>
    );
  }
  if (method === AuthType.api_key) {
    return (
      <ApiKeyConnectForm
        provider={authProvider}
        providerName={provider.name}
        onSuccess={onSuccess}
      />
    );
  }
  if (method === AuthType.device_code) {
    return (
      <DeviceAuthConnectButton
        provider={provider.id}
        providerName={provider.name}
        onSuccess={onSuccess}
      />
    );
  }
  if (method === AuthType.host_scoped) {
    return (
      <InlineHostScopedForm provider={provider.id} onSuccess={onSuccess} />
    );
  }
  if (method === AuthType.user_password) {
    return (
      <InlineUserPasswordForm
        provider={provider.id}
        providerName={provider.name}
        onSuccess={onSuccess}
      />
    );
  }
  return (
    <UnsupportedNotice
      providerName={provider.name}
      detail={t("connectServices1.tab.notWired", {
        method: TAB_LABEL[method],
        provider: provider.name,
      })}
    />
  );
}

export function getAuthProvider(
  provider: ConnectableProvider,
  method: AuthMethod,
): string {
  return provider.authProviderByType?.[method] ?? provider.id;
}

export function getAuthMethodLabel(
  provider: ConnectableProvider,
  method: AuthMethod,
  t: ReturnType<typeof useT>,
): string {
  if (
    method === AuthType.oauth2 &&
    getAuthProvider(provider, method) === "codex"
  ) {
    return t("connectServices1.tab.chatgpt");
  }
  return getTabLabels(t)[method];
}
