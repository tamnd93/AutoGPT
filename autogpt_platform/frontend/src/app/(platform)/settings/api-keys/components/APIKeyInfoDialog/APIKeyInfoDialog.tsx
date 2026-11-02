"use client";

import type { ReactNode } from "react";
import { format } from "date-fns";
import { vi as dateFnsVi } from "date-fns/locale";

import type { APIKeyInfo } from "@/app/api/__generated__/models/aPIKeyInfo";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { useLocale, useT } from "@/lib/i18n";
import { SCOPE_API_VERSION } from "@/lib/api-key-scopes";

import { maskAPIKey } from "../APIKeyList/helpers";
import { humanizePermission } from "../CreateAPIKeyDialog/schema";

interface Props {
  open: boolean;
  apiKey: APIKeyInfo;
  onOpenChange: (open: boolean) => void;
}

export function APIKeyInfoDialog({ open, apiKey, onOpenChange }: Props) {
  const t = useT();
  const locale = useLocale();
  const dateLocale = locale === "vi" ? dateFnsVi : undefined;

  return (
    <Dialog
      title={apiKey.name}
      styling={{ maxWidth: "30rem" }}
      controlled={{ isOpen: open, set: onOpenChange }}
    >
      <Dialog.Content>
        <div className="flex flex-col gap-4 px-1">
          <Section label={t("settingsRest1.info.key")}>
            <code className="font-mono text-sm text-foreground-emphasis">
              {maskAPIKey(apiKey.head, apiKey.tail)}
            </code>
          </Section>

          {apiKey.description && (
            <Section label={t("settingsRest1.info.description")}>
              <Text variant="body" className="text-foreground-body">
                {apiKey.description}
              </Text>
            </Section>
          )}

          <Section label={t("settingsRest1.info.scopes")}>
            {apiKey.scopes.length === 0 ? (
              <Text variant="body" className="text-foreground-tertiary">
                {t("settingsRest1.info.noScopes")}
              </Text>
            ) : (
              <ul className="flex flex-wrap gap-1.5">
                {apiKey.scopes.map((scope) => (
                  <li
                    key={scope}
                    className="rounded-full bg-surface-hover px-2.5 py-1 text-xs text-foreground-body"
                  >
                    {humanizePermission(scope)}
                    {SCOPE_API_VERSION[scope] === "v1" && (
                      <span className="text-foreground-secondary">
                        {" "}
                        {t("settingsRest1.info.v1Only")}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Section>

          <Section label={t("settingsRest1.info.created")}>
            <Text variant="body" className="text-foreground-body">
              {format(new Date(apiKey.created_at), "PPP p", {
                locale: dateLocale,
              })}
            </Text>
          </Section>

          <Section label={t("settingsRest1.info.lastUsed")}>
            <Text variant="body" className="text-foreground-body">
              {apiKey.last_used_at
                ? format(new Date(apiKey.last_used_at), "PPP p", {
                    locale: dateLocale,
                  })
                : t("settingsRest1.info.neverUsed")}
            </Text>
          </Section>
        </div>
      </Dialog.Content>
    </Dialog>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <Text
        variant="small-medium"
        as="span"
        className="text-foreground-tertiary"
      >
        {label}
      </Text>
      {children}
    </div>
  );
}
