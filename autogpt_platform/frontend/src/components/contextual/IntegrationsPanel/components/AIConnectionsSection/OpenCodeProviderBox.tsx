"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { TerminalIcon } from "@hugeicons/core-free-icons";

import { postV1CreateCredentials } from "@/app/api/__generated__/endpoints/integrations/integrations";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { toast } from "@/components/molecules/Toast/use-toast";
import { useT } from "@/lib/i18n";
import { invalidateConnectionQueries } from "@/lib/react-query/invalidateConnections";

import { ProviderBox } from "./ProviderBox";

const OPENCODE_KEY_DOCS_URL = "https://opencode.ai/docs/zen/";

interface Props {
  isLinked: boolean;
  onSuccess: () => void;
  name?: string;
  logoSrc?: string;
  description?: string;
}

// The second user-owned subscription: a key pasted once, instead of an OAuth
// round trip. Chats on it run on the user's OpenCode plan.
export function OpenCodeProviderBox({
  isLinked,
  onSuccess,
  name = "OpenCode",
  logoSrc,
  description,
}: Props) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isPending, setIsPending] = useState(false);
  const t = useT();

  async function connect() {
    const key = apiKey.trim();
    if (!key) return;
    setIsPending(true);
    try {
      await postV1CreateCredentials("opencode", {
        provider: "opencode",
        type: "api_key",
        title: "OpenCode",
        api_key: key,
      });
      await invalidateConnectionQueries(queryClient);
      toast({
        title: t("aiConnections1.opencode.connected"),
        variant: "success",
      });
      setApiKey("");
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      toast({
        title: t("aiConnections1.opencode.saveFailed"),
        description:
          error instanceof Error
            ? error.message
            : t("aiConnections1.opencode.unexpectedError"),
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  const card = (
    <ProviderBox
      name={name}
      logoSrc={logoSrc}
      icon={<Icon icon={TerminalIcon} size={24} />}
      description={description}
      state={isLinked ? "connected" : "available"}
    />
  );

  if (isLinked) return card;

  return (
    <Dialog
      title={t("integrations.opencode.dialogTitle")}
      variant="compact"
      controlled={{ isOpen, set: setIsOpen }}
    >
      <Dialog.Trigger>{card}</Dialog.Trigger>
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="small" as="p" tone="muted">
            {t("integrations.opencode.description")}
          </Text>
          <Input
            id="opencode-api-key"
            type="password"
            autoComplete="new-password"
            spellCheck={false}
            label={t("integrations.opencode.apiKeyLabel")}
            placeholder="oc_sk_..."
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            wrapperClassName="!mb-0"
          />
          <Text variant="small" as="p" tone="muted">
            {t("integrations.opencode.docsHint")}{" "}
            <a
              href={OPENCODE_KEY_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              {t("integrations.opencode.docsLink")}
            </a>
            .
          </Text>
          <Button
            className="w-full"
            loading={isPending}
            disabled={!apiKey.trim()}
            onClick={() => {
              void connect();
            }}
          >
            {t("integrations.opencode.connect")}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
