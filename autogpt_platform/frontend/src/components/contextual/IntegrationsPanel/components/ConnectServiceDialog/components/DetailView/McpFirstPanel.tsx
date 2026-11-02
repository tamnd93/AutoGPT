"use client";

import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";
import type { ProviderMetadata } from "@/app/api/__generated__/models/providerMetadata";
import { Button } from "@/components/atoms/Button/Button";
import { MoreHorizontalCircle01Icon } from "@hugeicons/core-free-icons";
import { withoutDuplicateKeyMethod, type AuthMethod } from "../../helpers";
import { MCPPresetPanel } from "./MCPPresetPanel";
import { useT } from "@/lib/i18n";

interface Props {
  server: NonNullable<ProviderMetadata["mcp_server"]>;
  /** The vendor's block credential methods, if it also ships any. */
  nativeMethods: AuthMethod[];
  onUseNative: () => void;
  onSuccess: (credential?: CredentialsMetaResponse) => void;
  /** Puts a Back button beside Connect, for hosts without a header arrow. */
  onBack?: () => void;
}

/** The service's own sign-in, shown first, with the block credential one
 *  click away when the vendor also ships one. */
export function McpFirstPanel({
  server,
  nativeMethods,
  onUseNative,
  onSuccess,
  onBack,
}: Props) {
  const t = useT();

  return (
    <MCPPresetPanel
      server={withoutDuplicateKeyMethod(server, nativeMethods)}
      onSuccess={onSuccess}
      actions={
        <>
          {nativeMethods.length > 0 ? (
            <Button
              variant="ghost"
              size="small"
              className="mr-auto"
              leadingIcon={MoreHorizontalCircle01Icon}
              onClick={onUseNative}
            >
              {t("connectServices1.mcpFirst.moreWays")}
            </Button>
          ) : null}
          {onBack ? (
            <Button variant="secondary" size="small" onClick={onBack}>
              {t("connectServices1.mcpFirst.back")}
            </Button>
          ) : null}
        </>
      }
    />
  );
}
