"use client";
import { Text } from "@/components/atoms/Text/Text";
import { Plug01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  providerName: string;
  detail?: string;
}

export function UnsupportedNotice({ providerName, detail }: Props) {
  const t = useT();

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border-base px-6 py-10 text-center">
      <Icon icon={Plug01Icon} size={28} className="text-foreground-tertiary" />
      <Text
        // TODO(tokens): no exact role for text-[#1F1F20]
        variant="body"
        className="text-[#1F1F20]"
      >
        {t("connectServices1.unsupported.title")}
      </Text>
      <Text variant="small" className="max-w-[360px] text-foreground-tertiary">
        {detail ??
          t("connectServices1.unsupported.bodyDefault", {
            provider: providerName,
          })}
      </Text>
    </div>
  );
}
