"use client";

import { useId } from "react";

import { Text } from "@/components/atoms/Text/Text";
import type { Variant } from "@/components/atoms/Text/helpers";
import type { MCPAuthScheme } from "@/lib/mcp-auth";
import { useT } from "@/lib/i18n";

interface Props {
  value: MCPAuthScheme;
  onChange: (scheme: MCPAuthScheme) => void;
  disabled?: boolean;
  /** Disambiguates the accessible name when several connectors render at once. */
  nameSuffix?: string;
  className?: string;
  labelClassName?: string;
  /** Renders the label as a `<Text>` in this variant, in the parent's colour. */
  labelVariant?: Variant;
  selectClassName?: string;
}

/** Bearer/Basic selector shared by every surface that takes a manual MCP credential. */
export function MCPAuthSchemeField({
  value,
  onChange,
  disabled,
  nameSuffix,
  className,
  labelClassName,
  labelVariant,
  selectClassName,
}: Props) {
  const t = useT();
  const id = useId();
  const accessibleName = nameSuffix
    ? t("credentials1.mcp.authTypeAria", { name: nameSuffix })
    : undefined;

  return (
    <div className={className}>
      {labelVariant ? (
        <Text
          variant={labelVariant}
          as="label"
          tone="inherit"
          htmlFor={id}
          className={labelClassName}
        >
          {t("credentials1.mcp.authType")}
        </Text>
      ) : (
        <label htmlFor={id} className={labelClassName}>
          {t("credentials1.mcp.authType")}
        </label>
      )}
      <select
        id={id}
        aria-label={accessibleName}
        value={value}
        onChange={(e) => onChange(e.target.value as MCPAuthScheme)}
        disabled={disabled}
        className={selectClassName}
      >
        <option value="bearer">{t("credentials1.mcp.optionBearer")}</option>
        <option value="basic">{t("credentials1.mcp.optionBasic")}</option>
      </select>
    </div>
  );
}
