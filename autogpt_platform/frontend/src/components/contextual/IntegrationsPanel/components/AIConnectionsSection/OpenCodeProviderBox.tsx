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
import { invalidateConnectionQueries } from "@/lib/react-query/invalidateConnections";

import { ProviderBox } from "./ProviderBox";

const OPENCODE_KEY_DOCS_URL = "https://opencode.ai/docs/zen/";

interface Props {
  isLinked: boolean;
  onSuccess: () => void;
}

// The second user-owned subscription: a key pasted once, instead of an OAuth
// round trip. Chats on it run on the user's OpenCode plan.
export function OpenCodeProviderBox({ isLinked, onSuccess }: Props) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [isPending, setIsPending] = useState(false);

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
      toast({ title: "OpenCode connected", variant: "success" });
      setApiKey("");
      setIsOpen(false);
      onSuccess();
    } catch (error) {
      toast({
        title: "Couldn't save the OpenCode key",
        description:
          error instanceof Error ? error.message : "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  }

  const card = (
    <ProviderBox
      name="OpenCode"
      icon={<Icon icon={TerminalIcon} size={24} />}
      state={isLinked ? "connected" : "available"}
    />
  );

  if (isLinked) return card;

  return (
    <Dialog
      title="Connect OpenCode"
      variant="compact"
      controlled={{ isOpen, set: setIsOpen }}
    >
      <Dialog.Trigger>{card}</Dialog.Trigger>
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="small" as="p" tone="muted">
            Paste the API key from your OpenCode Console. Chats on this
            connection run on your OpenCode plan and spend no AutoGPT credits.
          </Text>
          <Input
            id="opencode-api-key"
            type="password"
            autoComplete="new-password"
            spellCheck={false}
            label="API key"
            placeholder="oc_sk_..."
            value={apiKey}
            onChange={(event) => setApiKey(event.target.value)}
            wrapperClassName="!mb-0"
          />
          <Text variant="small" as="p" tone="muted">
            Find the key in the OpenCode Console —{" "}
            <a
              href={OPENCODE_KEY_DOCS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              OpenCode docs
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
            Connect
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}
