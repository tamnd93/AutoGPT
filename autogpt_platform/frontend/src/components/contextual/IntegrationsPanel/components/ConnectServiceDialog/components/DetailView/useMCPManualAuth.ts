import { useState } from "react";
import { useGetV1ListCredentials } from "@/app/api/__generated__/endpoints/integrations/integrations";
import { useMCPAuthScheme } from "@/components/contextual/MCPAuthSchemeField/useMCPAuthScheme";
import {
  detectMCPAuthScheme,
  validateMCPAuthCredential,
  type MCPAuthScheme,
} from "@/lib/mcp-auth";
import { normalizeMcpUrl } from "@/lib/mcp-url";
import { useLocale, useT } from "@/lib/i18n";

export function useMCPManualAuth(
  serverURL: string,
  allowedSchemes: MCPAuthScheme[],
) {
  const t = useT();
  const locale = useLocale();
  const [token, setToken] = useState("");
  const { data: credentials } = useGetV1ListCredentials({
    query: {
      select: (response) => (response.status === 200 ? response.data : []),
    },
  });
  const saved = Array.isArray(credentials)
    ? credentials.find(
        (credential) =>
          credential.provider === "mcp" &&
          typeof credential.host === "string" &&
          normalizeMcpUrl(credential.host) === normalizeMcpUrl(serverURL),
      )
    : null;
  const savedScheme = saved?.mcp_auth_scheme === "basic" ? "basic" : "bearer";
  const defaultScheme = allowedSchemes.includes(savedScheme)
    ? savedScheme
    : (allowedSchemes[0] ?? "bearer");
  const auth = useMCPAuthScheme(defaultScheme, token);
  const scheme = allowedSchemes.includes(auth.scheme)
    ? auth.scheme
    : defaultScheme;

  function selectScheme(next: MCPAuthScheme) {
    if (allowedSchemes.includes(next)) auth.selectScheme(next);
  }

  function handleTokenChange(value: string) {
    setToken(value);
    const detected = detectMCPAuthScheme(value);
    if (detected && allowedSchemes.includes(detected))
      auth.detectSchemeFrom(value);
  }

  function validateToken() {
    const detected = detectMCPAuthScheme(token);
    if (detected && !allowedSchemes.includes(detected)) {
      return detected === "basic"
        ? t("connectServices1.mcp.basicUnsupported")
        : t("connectServices1.mcp.bearerUnsupported");
    }
    return validateMCPAuthCredential(token.trim(), scheme, locale);
  }

  function reset() {
    setToken("");
    auth.resetScheme();
  }

  return {
    token,
    scheme,
    selectScheme,
    handleTokenChange,
    validateToken,
    reset,
  };
}
