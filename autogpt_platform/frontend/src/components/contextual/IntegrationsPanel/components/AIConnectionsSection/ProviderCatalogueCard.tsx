"use client";

import { SparklesIcon } from "@hugeicons/core-free-icons";

import { Icon } from "@/components/atoms/Icon/Icon";
import { useLocale } from "@/lib/i18n";

import { useOAuthConnect } from "../ConnectServiceDialog/components/DetailView/useOAuthConnect";
import { MicrosoftCopilotProviderBox } from "./MicrosoftCopilotProviderBox";
import { OpenCodeProviderBox } from "./OpenCodeProviderBox";
import { ProviderBox } from "./ProviderBox";
import {
  getProviderDescription,
  type NormalizedProvider,
} from "./providerCatalogue";

interface Props {
  provider: NormalizedProvider;
  isLinked?: boolean;
  onSuccess: () => void;
}

export function ProviderCatalogueCard({
  provider,
  isLinked = false,
  onSuccess,
}: Props) {
  const locale = useLocale();
  const description = getProviderDescription(provider, locale);
  const logoSrc = provider.logo_src ?? undefined;

  if (provider.status === "coming-soon" || provider.status === "unsupported") {
    return (
      <ProviderBox
        name={provider.display_name}
        logoSrc={logoSrc}
        icon={<Icon icon={SparklesIcon} size={24} />}
        description={description}
        state={provider.status}
      />
    );
  }

  if (provider.connect_method === "oauth") {
    return (
      <OAuthCatalogueCard
        provider={provider}
        logoSrc={logoSrc}
        description={description}
        isLinked={isLinked}
        onSuccess={onSuccess}
      />
    );
  }

  if (provider.connect_method === "device_code") {
    const deviceProviderKey =
      provider.id === "microsoft_365_copilot"
        ? "microsoft_365_copilot"
        : (provider.credential_provider ?? provider.id);

    return (
      <MicrosoftCopilotProviderBox
        name={provider.display_name}
        logoSrc={logoSrc}
        description={description}
        provider={deviceProviderKey}
        isLinked={isLinked}
        onSuccess={onSuccess}
      />
    );
  }

  if (provider.connect_method === "opencode_key") {
    return (
      <OpenCodeProviderBox
        name={provider.display_name}
        logoSrc={logoSrc}
        description={description}
        isLinked={isLinked}
        onSuccess={onSuccess}
      />
    );
  }

  return (
    <ProviderBox
      name={provider.display_name}
      logoSrc={logoSrc}
      icon={<Icon icon={SparklesIcon} size={24} />}
      description={description}
      state="unsupported"
    />
  );
}

interface OAuthCardProps {
  provider: NormalizedProvider;
  logoSrc?: string;
  description: string;
  isLinked: boolean;
  onSuccess: () => void;
}

function OAuthCatalogueCard({
  provider,
  logoSrc,
  description,
  isLinked,
  onSuccess,
}: OAuthCardProps) {
  const oauthProviderKey =
    provider.id === "codex"
      ? "codex"
      : (provider.credential_provider ?? provider.id);

  const { connect, isPending } = useOAuthConnect({
    provider: oauthProviderKey,
    onSuccess: () => onSuccess(),
  });

  return (
    <ProviderBox
      name={provider.display_name}
      logoSrc={logoSrc}
      icon={<Icon icon={SparklesIcon} size={24} />}
      description={description}
      state={isLinked ? "connected" : "available"}
      isBusy={isPending}
      onClick={connect}
    />
  );
}

