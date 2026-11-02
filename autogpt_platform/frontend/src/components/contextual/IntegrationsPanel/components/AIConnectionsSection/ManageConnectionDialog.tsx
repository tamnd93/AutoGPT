"use client";

import { useState } from "react";
import { useGetV1CodexAccount } from "@/app/api/__generated__/endpoints/integrations/integrations";
import type { AIConnectionOffer } from "@/app/api/__generated__/models/aIConnectionOffer";
import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useLocale, useT } from "@/lib/i18n";

import { useOAuthConnect } from "../ConnectServiceDialog/components/DetailView/useOAuthConnect";
import { DeleteConfirmDialog } from "../DeleteConfirmDialog/DeleteConfirmDialog";
import { useDeleteIntegration } from "../hooks/useDeleteIntegration";
import { microsoftAccessLabels } from "./helpers";

interface Props {
  connection: AIConnectionOffer | null;
  credential?: CredentialsMetaResponse;
  onOpenChange: (open: boolean) => void;
}

/**
 * Single-account first pass. Deliberately shows no usage figure and no reset
 * window: the only numbers available would be from whenever they were last
 * observed, and a stale window presented as current is worse than none —
 * especially on the reconnect path, where authorization is already invalid.
 */
export function ManageConnectionDialog({
  connection,
  credential,
  onOpenChange,
}: Props) {
  if (connection?.auth_provider === "microsoft_365_copilot") {
    return (
      <Microsoft365CopilotConnectionDialog
        connection={connection}
        credential={credential}
        onOpenChange={onOpenChange}
      />
    );
  }

  if (connection?.auth_provider === "opencode") {
    return (
      <OpenCodeConnectionDialog
        connection={connection}
        onOpenChange={onOpenChange}
      />
    );
  }

  return (
    <ChatGPTConnectionDialog
      connection={connection}
      credential={credential}
      onOpenChange={onOpenChange}
    />
  );
}

function ChatGPTConnectionDialog({
  connection,
  credential,
  onOpenChange,
}: Props) {
  const credentialId = connection?.credential_id ?? null;
  const [forceMessage, setForceMessage] = useState<string | null>(null);
  const account = credential?.username ?? undefined;
  const t = useT();

  // Asked for only while this dialog is open. Reading it leases a runtime
  // against the provider, so it must never run on the list behind — and it
  // means what is shown was true a moment ago rather than whenever the
  // connection was last used.
  const accountQuery = useGetV1CodexAccount(credentialId ?? "", {
    query: {
      enabled: credentialId !== null,
      staleTime: 0,
      retry: false,
      // A window-focus refetch would lease another provider runtime while
      // the same snapshot is already visible. Reopening Manage is the user's
      // explicit refresh boundary.
      refetchOnWindowFocus: false,
    },
  });
  const accountResponse =
    accountQuery.data?.status === 200 ? accountQuery.data.data : undefined;
  const snapshot = accountResponse?.connected ? accountResponse : undefined;
  const requiresReconnect =
    accountResponse !== undefined && !accountResponse.connected;

  function setManageOpen(open: boolean) {
    if (!open) setForceMessage(null);
    onOpenChange(open);
  }

  const { connect, isPending: isReconnecting } = useOAuthConnect({
    provider: "codex",
    onSuccess: () => setManageOpen(false),
  });

  const { remove, isPending: isDisconnecting } = useDeleteIntegration();

  async function disconnect(force = false) {
    if (!credentialId) return;
    const target = {
      id: credentialId,
      provider: "codex",
      name: account ?? "ChatGPT",
    };
    const result = await remove([target], force);
    const confirmation = result.needsConfirmation[0];
    if (confirmation) {
      setForceMessage(confirmation.message);
      return;
    }
    if (result.succeeded.length === 0) return;

    setForceMessage(null);
    setManageOpen(false);
  }

  return (
    <>
      <Dialog
        title="ChatGPT"
        styling={{ maxWidth: "28rem" }}
        controlled={{
          isOpen: connection !== null && forceMessage === null,
          set: (open) => {
            // Opening the force-confirmation dialog intentionally hides this
            // one. Radix reports that controlled close through this callback;
            // keep the connection selected so Cancel can return here.
            if (!open && forceMessage !== null) return;
            setManageOpen(open);
          },
        }}
      >
        <Dialog.Content>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <Text
                // TODO(tokens): no exact role for text-[#8A8A90]
                variant="small"
                className="text-[#8A8A90]"
              >
                {t("integrations.manage.connectedAccount")}
              </Text>
              <Text variant="body-medium" className="text-foreground-base">
                {snapshot?.email ??
                  account ??
                  t("integrations.manage.chatgptAccount")}
              </Text>
              {accountQuery.isLoading ? (
                <Text
                  // TODO(tokens): no exact role for text-[#8A8A90]
                  variant="small"
                  className="text-[#8A8A90]"
                >
                  {t("integrations.manage.checkingChatGPT")}
                </Text>
              ) : accountQuery.isError ? (
                <Text
                  // TODO(tokens): no exact role for text-[#8A8A90]
                  variant="small"
                  className="text-[#8A8A90]"
                >
                  {t("integrations.manage.chatgptUnreachable")}
                </Text>
              ) : requiresReconnect ? (
                <Text variant="small" className="text-warning-foreground">
                  {t("integrations.manage.chatgptNeedsReconnect")}
                </Text>
              ) : (
                snapshot?.plan_type && (
                  <span className="mt-1 flex flex-wrap gap-2">
                    <span
                      // TODO(tokens): no exact role for bg-[#F1EBFF], text-[#4A25AD]
                      className="rounded-[10px] bg-[#F1EBFF] px-2 py-[2px] text-body-sm font-medium leading-5 text-[#4A25AD]"
                    >
                      {t("common.planSuffix", {
                        plan: snapshot.plan_type,
                      })}
                    </span>
                  </span>
                )
              )}
            </div>

            <Text
              // TODO(tokens): no exact role for text-[#8A8A90]
              variant="small"
              className="text-[#8A8A90]"
            >
              {t("integrations.manage.chatgptWorkspaceNote")}
            </Text>

            <Text variant="small" className="text-foreground-body">
              {connection?.is_default
                ? t("integrations.manage.chatgptDefaultNote")
                : t("integrations.manage.chatgptRoutedNote")}
            </Text>

            <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-end">
              <Button
                variant="secondary"
                size="small"
                onClick={connect}
                loading={isReconnecting}
                disabled={isDisconnecting}
              >
                {t("integrations.manage.reconnect")}
              </Button>
              <Button
                variant="destructive"
                size="small"
                onClick={() => void disconnect()}
                loading={isDisconnecting}
                disabled={isReconnecting}
              >
                {t("integrations.manage.disconnect")}
              </Button>
            </div>

            <Text
              // TODO(tokens): no exact role for text-[#8A8A90]
              variant="small"
              className="text-[#8A8A90]"
            >
              {t("integrations.manage.chatgptDisconnectNote")}
            </Text>
          </div>
        </Dialog.Content>
      </Dialog>

      <DeleteConfirmDialog
        open={forceMessage !== null}
        onOpenChange={(open) => {
          if (!open) setForceMessage(null);
        }}
        itemNames={[account ?? "ChatGPT"]}
        isPending={isDisconnecting}
        onConfirm={() => void disconnect(true)}
        variant="force"
        notice={forceMessage ?? undefined}
      />
    </>
  );
}

interface OpenCodeProps {
  connection: AIConnectionOffer;
  onOpenChange: (open: boolean) => void;
}

function OpenCodeConnectionDialog({ connection, onOpenChange }: OpenCodeProps) {
  const { remove, isPending: isDisconnecting } = useDeleteIntegration();
  const credentialId = connection.credential_id;
  const t = useT();

  async function disconnect() {
    if (!credentialId) return;
    const result = await remove([
      { id: credentialId, provider: "opencode", name: "OpenCode" },
    ]);
    if (result.succeeded.length === 0) return;
    onOpenChange(false);
  }

  return (
    <Dialog
      title="OpenCode"
      variant="compact"
      styling={{ maxWidth: "28rem" }}
      controlled={{ isOpen: connection !== null, set: onOpenChange }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4">
          <Text variant="small" as="p" tone="muted">
            {t("integrations.manage.opencodeNote")}
          </Text>
          <Button
            variant="destructive"
            size="small"
            onClick={() => void disconnect()}
            loading={isDisconnecting}
            className="self-end"
          >
            {t("integrations.manage.disconnect")}
          </Button>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

interface MicrosoftProps {
  connection: AIConnectionOffer;
  credential?: CredentialsMetaResponse;
  onOpenChange: (open: boolean) => void;
}

function Microsoft365CopilotConnectionDialog({
  connection,
  credential,
  onOpenChange,
}: MicrosoftProps) {
  const [forceMessage, setForceMessage] = useState<string | null>(null);
  const { remove, isPending: isDisconnecting } = useDeleteIntegration();
  const locale = useLocale();
  const credentialId = connection.credential_id;
  const accessLabels = microsoftAccessLabels(credential?.scopes, locale);
  const displayName =
    credential?.title && credential.title !== "Microsoft 365 Copilot"
      ? credential.title
      : undefined;

  const accountName = credential?.username ?? "Microsoft 365 Copilot";
  const t = useT();

  function setManageOpen(open: boolean) {
    if (!open) setForceMessage(null);
    onOpenChange(open);
  }

  async function disconnect(force = false) {
    if (!credentialId) return;
    const target = {
      id: credentialId,
      provider: "microsoft_365_copilot",
      name: accountName,
    };
    const result = await remove([target], force);
    const confirmation = result.needsConfirmation[0];
    if (confirmation) {
      setForceMessage(confirmation.message);
      return;
    }
    if (result.succeeded.length === 0) return;

    setForceMessage(null);
    setManageOpen(false);
  }

  return (
    <>
      <Dialog
        title="Microsoft 365 Copilot"
        styling={{ maxWidth: "32rem" }}
        controlled={{
          isOpen: forceMessage === null,
          set: (open) => {
            if (!open && forceMessage !== null) return;
            setManageOpen(open);
          },
        }}
      >
        <Dialog.Content>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Text
                // TODO(tokens): no exact role for text-[#8A8A90]
                variant="small"
                className="text-[#8A8A90]"
              >
                {t("integrations.manage.connectedWorkAccount")}
              </Text>
              <Text variant="body-medium" className="text-foreground-base">
                {displayName ??
                  credential?.username ??
                  t("integrations.manage.microsoftAccount")}
              </Text>
              {displayName && credential?.username && (
                <Text variant="small" className="text-foreground-body">
                  {credential.username}
                </Text>
              )}
              {!credential?.username && (
                <Text
                  // TODO(tokens): no exact role for text-[#8A8A90]
                  variant="small"
                  className="text-[#8A8A90]"
                >
                  {t("integrations.manage.microsoftReconnectToShow")}
                </Text>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Text variant="small-medium" className="text-foreground-body">
                {t("integrations.manage.accessGranted")}
              </Text>
              {accessLabels.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {accessLabels.map((label) => (
                    <span
                      key={label}
                      // TODO(tokens): no exact role for bg-[#EFF1F4]
                      className="rounded-[10px] bg-[#EFF1F4] px-2 py-[2px] text-body-sm font-medium leading-5 text-foreground-body"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              ) : (
                <Text
                  // TODO(tokens): no exact role for text-[#8A8A90]
                  variant="small"
                  className="text-[#8A8A90]"
                >
                  {t("integrations.manage.microsoftReconnectToRefresh")}
                </Text>
              )}
            </div>

            <Text variant="small" className="text-foreground-body">
              {t("integrations.manage.microsoftLimitNote")}
            </Text>

            <div className="flex justify-end pt-1">
              <Button
                variant="destructive"
                size="small"
                onClick={() => void disconnect()}
                loading={isDisconnecting}
              >
                {t("integrations.manage.disconnect")}
              </Button>
            </div>

            <Text
              // TODO(tokens): no exact role for text-[#8A8A90]
              variant="small"
              className="text-[#8A8A90]"
            >
              {t("integrations.manage.microsoftDisconnectNote")}
            </Text>
          </div>
        </Dialog.Content>
      </Dialog>

      <DeleteConfirmDialog
        open={forceMessage !== null}
        onOpenChange={(open) => {
          if (!open) setForceMessage(null);
        }}
        itemNames={[accountName]}
        isPending={isDisconnecting}
        onConfirm={() => void disconnect(true)}
        variant="force"
        notice={forceMessage ?? undefined}
      />
    </>
  );
}
