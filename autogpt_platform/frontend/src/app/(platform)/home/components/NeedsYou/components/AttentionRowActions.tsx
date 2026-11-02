import { Cancel01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import type { HomeAttentionItem } from "@/app/api/__generated__/models/homeAttentionItem";
import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";

interface Props {
  item: HomeAttentionItem;
  isProcessing: boolean;
  confirmDecline: boolean;
  onApprove: () => void;
  onDecline: () => void;
  onDeclineBlur: () => void;
}

export function AttentionRowActions({
  item,
  isProcessing,
  confirmDecline,
  onApprove,
  onDecline,
  onDeclineBlur,
}: Props) {
  const t = useT();
  const primaryAction = (
    <Button
      as="NextLink"
      href={item.primary_action.href}
      variant="secondary"
      size="small"
      className="h-8 min-w-0 px-3"
    >
      {item.primary_action.label}
    </Button>
  );

  if (item.kind !== "approval" || !item.review) {
    return primaryAction;
  }

  return (
    <>
      {primaryAction}
      <Button
        variant="primary"
        size="icon-sm"
        leadingIcon={Tick02Icon}
        disabled={isProcessing}
        aria-label={t("home1.aria.action", {
          action: t("home1.attention.approve"),
          title: item.title,
        })}
        onClick={onApprove}
      />
      <Button
        variant={confirmDecline ? "destructive" : "icon"}
        size="icon-sm"
        leadingIcon={Cancel01Icon}
        disabled={isProcessing}
        aria-label={t("home1.aria.action", {
          action: confirmDecline
            ? t("home1.attention.confirmDecline")
            : t("home1.attention.decline"),
          title: item.title,
        })}
        onClick={onDecline}
        onBlur={onDeclineBlur}
      />
    </>
  );
}
