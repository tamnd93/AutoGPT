"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import type { ReactNode } from "react";
import { useCheckMCPConnection } from "./useCheckMCPConnection";
import { useT } from "@/lib/i18n";

interface Props {
  serverURL: string;
  actions?: ReactNode;
}

export function PublicMCPPanel({ serverURL, actions }: Props) {
  const t = useT();
  const { check, isPending, toolCount, error } =
    useCheckMCPConnection(serverURL);
  return (
    <div className="flex flex-col gap-4">
      <Input
        id="public-mcp-server-url"
        label={t("connectServices1.mcpUrl.serverUrl")}
        type="url"
        value={serverURL}
        readOnly
      />
      <Text variant="small" className="text-foreground-secondary">
        {t("connectServices1.publicMCP.noAccount")}
      </Text>
      {toolCount !== null && (
        <Text variant="body" role="status">
          {toolCount === 0
            ? t("connectServices1.publicMCP.noTools")
            : toolCount === 1
              ? t("connectServices1.publicMCP.toolsOne")
              : t("connectServices1.publicMCP.tools", {
                  count: toolCount.toLocaleString(),
                })}
        </Text>
      )}
      {toolCount !== null && (
        <Text variant="small" className="text-foreground-secondary">
          {t("connectServices1.publicMCP.nothingSaved")}
        </Text>
      )}
      {error && (
        <Text variant="small" role="alert" className="text-error-foreground">
          {error}
        </Text>
      )}
      <div className="flex items-center justify-end gap-2">
        {actions}
        <Button
          variant="primary"
          size="small"
          onClick={check}
          loading={isPending}
        >
          {t("connectServices1.publicMCP.checkConnection")}
        </Button>
      </div>
    </div>
  );
}
