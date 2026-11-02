import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

interface Props {
  label: string;
  value: string | null;
}

/** One labelled paragraph on a Basics tab, shared by the expert and
 *  Otto pages so their headings stay the same size. */
export function ProfileEntry({ label, value }: Props) {
  const t = useT();
  return (
    <div>
      <Text variant="large-medium" as="dt" tone="primary">
        {label}
      </Text>
      <Text
        variant="body-md"
        as="dd"
        tone="secondary"
        className="mt-1 whitespace-pre-line"
      >
        {value || t("team7.profile.notSet")}
      </Text>
    </div>
  );
}
