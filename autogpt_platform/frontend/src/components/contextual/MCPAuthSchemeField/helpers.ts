import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import type { MCPAuthScheme } from "@/lib/mcp-auth";

export function mcpAuthTokenLabel(
  scheme: MCPAuthScheme,
  locale: Locale = DEFAULT_LOCALE,
): string {
  return getMessage(
    locale,
    scheme === "basic"
      ? "credentials1.mcp.tokenLabelBasic"
      : "credentials1.mcp.tokenLabelBearer",
  );
}

export function mcpAuthTokenHint(
  scheme: MCPAuthScheme,
  locale: Locale = DEFAULT_LOCALE,
): string {
  return getMessage(
    locale,
    scheme === "basic"
      ? "credentials1.mcp.hintBasic"
      : "credentials1.mcp.hintBearer",
  );
}

export function mcpAuthTokenPlaceholder(
  scheme: MCPAuthScheme,
  locale: Locale = DEFAULT_LOCALE,
): string {
  return getMessage(
    locale,
    scheme === "basic"
      ? "credentials1.mcp.placeholderBasic"
      : "credentials1.mcp.placeholderBearer",
  );
}
