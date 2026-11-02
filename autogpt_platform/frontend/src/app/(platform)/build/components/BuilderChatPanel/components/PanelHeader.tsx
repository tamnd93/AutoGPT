import { Button } from "@/components/atoms/Button/Button";
import {
  BubbleChatIcon,
  Cancel01Icon,
  RefreshIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";

interface Props {
  onClose: () => void;
  canRevert: boolean;
  revertTargetVersion: number | null;
  onRevert: () => void;
}

export function PanelHeader({
  onClose,
  canRevert,
  revertTargetVersion,
  onRevert,
}: Props) {
  const t = useT();
  return (
    <div
      // TODO(tokens): no exact role: border-slate-100 #EFF1F4
      className="flex items-center justify-between border-b border-slate-100 px-4 py-3"
    >
      <div className="flex items-center gap-2">
        <Icon
          // TODO(tokens): no exact role: text-violet-600 #7C3AED
          icon={BubbleChatIcon}
          size={18}
          className="text-violet-600"
        />
        <Text
          variant="body-semibold-tight"
          as="span"
          // TODO(tokens): no exact role: text-slate-800 #475263
          className="text-slate-800"
        >
          {t("build1.panelHeader.title")}
        </Text>
      </div>
      <div className="flex items-center gap-1">
        {canRevert && (
          <Button
            variant="ghost"
            size="small"
            onClick={onRevert}
            leftIcon={<Icon icon={RefreshIcon} size={14} />}
            aria-label={
              revertTargetVersion != null
                ? t("build1.panelHeader.revertToVersion", {
                    version: revertTargetVersion,
                  })
                : t("build1.panelHeader.revertPrev")
            }
            title={t("build1.panelHeader.revertTooltip")}
          >
            {t("build1.panelHeader.revert")}
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label={t("build1.panelHeader.close")}
        >
          <Icon icon={Cancel01Icon} size={16} />
        </Button>
      </div>
    </div>
  );
}
