import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import type { DisplayStatus } from "../../helpers";
import {
  CircleIcon,
  PauseCircleIcon,
  Tick02Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

interface Props {
  status: DisplayStatus;
}

export function StatusIcon({ status }: Props) {
  const t = useT();

  if (status === "completed") {
    return (
      <Icon
        icon={Tick02Icon}
        size={14}
        // TODO(tokens): no exact role for text-emerald-500
        className="text-emerald-500"
        aria-label={t("shared4.taskStatus.completed")}
      />
    );
  }
  if (status === "in_progress") {
    return (
      <LoadingSpinner
        size="small"
        className="h-3.5 w-3.5 text-brand [animation-duration:0.5s]"
        aria-label={t("shared4.taskStatus.inProgress")}
      />
    );
  }
  if (status === "stopped") {
    return (
      <Icon
        icon={PauseCircleIcon}
        size={15}
        className="text-warning"
        aria-label={t("shared4.taskStatus.stopped")}
      />
    );
  }
  return (
    <Icon
      icon={CircleIcon}
      size={14}
      className="text-foreground-subtle"
      aria-label={t("shared4.taskStatus.pending")}
    />
  );
}
