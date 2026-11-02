import { CredentialsMetaInput } from "@/app/api/__generated__/models/credentialsMetaInput";
import { CredentialsType } from "@/lib/autogpt-server-api/types";
import {
  getCredentialDisplayName,
  getCredentialTypeLabel,
} from "../../helpers";
import { useLocale, useT } from "@/lib/i18n";
import { CredentialRow } from "../CredentialRow/CredentialRow";

interface Props {
  credentials: Array<{
    id: string;
    title?: string;
    username?: string;
    type: string;
    provider: string;
  }>;
  provider: string;
  displayName: string;
  selectedCredentials?: CredentialsMetaInput;
  onSelectCredential: (credentialId: string) => void;
  onClearCredential?: () => void;
  readOnly?: boolean;
  allowNone?: boolean;
  /** When "node", applies compact styling for node context */
  variant?: "default" | "node";
}

export function CredentialsSelect({
  credentials,
  provider,
  displayName,
  selectedCredentials,
  onSelectCredential,
  onClearCredential,
  readOnly = false,
  allowNone = true,
  variant = "default",
}: Props) {
  const t = useT();
  const locale = useLocale();

  function handleValueChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    if (value === "__none__") {
      onClearCredential?.();
    } else {
      onSelectCredential(value);
    }
  }

  const selectedCredential = selectedCredentials
    ? credentials.find((c) => c.id === selectedCredentials.id)
    : null;

  const displayCredential = selectedCredential
    ? {
        id: selectedCredential.id,
        title: selectedCredential.title,
        username: selectedCredential.username,
        type: selectedCredential.type,
        provider: selectedCredential.provider,
      }
    : allowNone
      ? {
          id: "__none__",
          title: t("credentials1.select.none"),
          type: "none",
          provider: provider,
        }
      : {
          id: "__placeholder__",
          title: t("credentials1.select.placeholder"),
          type: "placeholder",
          provider: provider,
        };

  return (
    <div className="mb-4 w-full">
      <div className="relative">
        <select
          value={selectedCredentials?.id ?? "__none__"}
          onChange={handleValueChange}
          disabled={readOnly}
          className="absolute inset-0 z-10 cursor-pointer opacity-0"
          aria-label={t("credentials1.select.aria", { name: displayName })}
        >
          {allowNone ? (
            <option value="__none__">{t("credentials1.select.none")}</option>
          ) : (
            <option value="__none__" disabled hidden>
              {t("credentials1.select.selectOne")}
            </option>
          )}
          {credentials.map((credential) => (
            <option key={credential.id} value={credential.id}>
              {getCredentialDisplayName(credential, displayName, locale)} (
              {getCredentialTypeLabel(
                credential.type as CredentialsType,
                locale,
              )})
            </option>
          ))}
        </select>
        <div className="rounded-medium border border-border-base bg-surface">
          <CredentialRow
            credential={displayCredential}
            provider={provider}
            displayName={displayName}
            onSelect={() => {}}
            onDelete={() => {}}
            readOnly={readOnly}
            asSelectTrigger={true}
            variant={variant}
          />
        </div>
      </div>
    </div>
  );
}
