"use client";

import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";
import type { ProviderMetadata } from "@/app/api/__generated__/models/providerMetadata";
import { Link } from "@/components/atoms/Link/Link";
import { Text } from "@/components/atoms/Text/Text";
import type { ReactNode } from "react";
import {
  TabsLine,
  TabsLineList,
  TabsLineTrigger,
  TabsLineContent,
} from "@/components/molecules/TabsLine/TabsLine";
import { useT } from "@/lib/i18n";
import { McpConnectPanel } from "./McpConnectPanel";
import { PublicMCPPanel } from "./PublicMCPPanel";

type AuthMethod = NonNullable<
  ProviderMetadata["mcp_server"]
>["auth_methods"][number];

function getMethodLabels(t: ReturnType<typeof useT>): Record<AuthMethod, string> {
  return {
    none: t("connectServices1.mcpPreset.none"),
    oauth: t("connectServices1.mcpPreset.oauth"),
    bearer: t("connectServices1.mcpPreset.bearer"),
    basic: t("connectServices1.mcpPreset.basic"),
  };
}

interface Props {
  server: NonNullable<ProviderMetadata["mcp_server"]>;
  onSuccess: (credential?: CredentialsMetaResponse) => void;
  /** Extra buttons for the row that holds Connect. */
  actions?: ReactNode;
}

export function MCPPresetPanel({ server, onSuccess, actions }: Props) {
  const t = useT();
  const METHOD_LABELS = getMethodLabels(t);
  const methods = server.auth_methods;
  return (
    <div className="flex flex-col gap-4">
      <Text variant="body" className="text-foreground-secondary">
        {server.setup_instructions}
      </Text>
      <Link href={server.documentation_url} isExternal variant="secondary">
        {t("connectServices1.mcpPreset.docs")}
      </Link>
      {methods.length === 1 ? (
        <PresetMethod
          server={server}
          onSuccess={onSuccess}
          method={methods[0]}
          actions={actions}
        />
      ) : (
        <TabsLine defaultValue={methods[0]}>
          <TabsLineList
            aria-label={t("connectServices1.mcpPreset.connectionMethod")}
          >
            {methods.map((method) => (
              <TabsLineTrigger key={method} value={method}>
                {METHOD_LABELS[method]}
              </TabsLineTrigger>
            ))}
          </TabsLineList>
          {methods.map((method) => (
            <TabsLineContent key={method} value={method}>
              <PresetMethod
                server={server}
                onSuccess={onSuccess}
                method={method}
                actions={actions}
              />
            </TabsLineContent>
          ))}
        </TabsLine>
      )}
    </div>
  );
}

function PresetMethod({
  server,
  onSuccess,
  method,
  actions,
}: Props & { method: AuthMethod }) {
  if (method === "none") {
    return server.server_url ? (
      <PublicMCPPanel serverURL={server.server_url} actions={actions} />
    ) : null;
  }
  return (
    <McpConnectPanel
      onSuccess={onSuccess}
      initialServerURL={
        (method === "oauth" ? server.oauth_server_url : null) ??
        server.server_url ??
        ""
      }
      lockServerURL={
        server.connection_mode === "hosted" && !server.allow_custom_url
      }
      allowedAuthMethods={[method]}
      oauthScopes={server.oauth_scopes}
      oauthWriteScopes={server.oauth_write_scopes}
      serverURLOptions={server.server_url_options}
      actions={actions}
    />
  );
}
