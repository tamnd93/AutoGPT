import type { CredentialRejection } from "@/app/api/__generated__/models/credentialRejection";
import { AttentionCard } from "@/components/organisms/AttentionCard/AttentionCard";
import { useT } from "@/lib/i18n";

interface Props {
  rejection: CredentialRejection;
}

export function CredentialRejectionNotice({ rejection }: Props) {
  const t = useT();

  return (
    <AttentionCard.Root variant="error" density="snug" role="alert">
      {rejection.credential_title
        ? t("chatStates2.credentialRejection.refusedNamed", {
            name: rejection.credential_title,
          })
        : t("chatStates2.credentialRejection.refused")}
      {rejection.status_code ? ` — HTTP ${rejection.status_code}` : ""}
      <p className="mt-1 break-words opacity-80">{rejection.detail}</p>
    </AttentionCard.Root>
  );
}
