import { Expert } from "@/app/api/__generated__/models/expert";
import { ExpertPod } from "@/app/api/__generated__/models/expertPod";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { ArrowLeft01Icon, Folder02Icon } from "@hugeicons/core-free-icons";
import { useT } from "@/lib/i18n";
import { ReactNode, useState } from "react";
import { TEAM_GRID_CLASS } from "../../helpers";

interface Props {
  isLoading: boolean;
  podGroups: { pod: ExpertPod; experts: Expert[] }[];
  onNewPod: () => void;
  renderCard: (expert: Expert) => ReactNode;
}

const FOLDER_GRID_CLASS =
  "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export function PodBoard({
  isLoading,
  podGroups,
  onNewPod,
  renderCard,
}: Props) {
  const t = useT();
  const [openPodId, setOpenPodId] = useState<string | null>(null);
  const openGroup = podGroups.find((group) => group.pod.id === openPodId);

  if (openGroup) {
    return (
      <section
        aria-label={t("team8.pods.podAria", { name: openGroup.pod.name })}
        className="flex flex-col gap-4"
      >
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            leadingIcon={ArrowLeft01Icon}
            aria-label={t("team8.pods.back")}
            onClick={() => setOpenPodId(null)}
          />
          <Text variant="large-medium" as="h5" tone="primary">
            {openGroup.pod.name}
          </Text>
          <Text variant="small" tone="muted">
            {t(
              openGroup.experts.length === 1
                ? "team8.pods.expertOne"
                : "team8.pods.expertMany",
              { count: openGroup.experts.length },
            )}
          </Text>
        </div>
        {openGroup.experts.length > 0 ? (
          <div className={TEAM_GRID_CLASS}>
            {openGroup.experts.map(renderCard)}
          </div>
        ) : (
          <Text variant="body" tone="muted">
            {t("team8.pods.emptyOpen")}
          </Text>
        )}
      </section>
    );
  }

  return (
    <section aria-label={t("team8.pods.title")} className="flex flex-col gap-4">
      <Text variant="large-medium" as="h5" tone="primary">
        {t("team8.pods.title")}
      </Text>
      {isLoading ? (
        <div className={FOLDER_GRID_CLASS}>
          {[0, 1, 2].map((index) => (
            <Skeleton key={index} className="h-28 w-full rounded-xl" />
          ))}
        </div>
      ) : podGroups.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border-strong bg-surface p-8 text-center">
          <Text variant="large-medium" tone="primary">
            {t("team8.pods.noPods")}
          </Text>
          <Text variant="body" tone="secondary" className="max-w-prose">
            {t("team8.pods.intro")}
          </Text>
          <Button variant="primary" size="small" onClick={onNewPod}>
            {t("team8.pods.newPod")}
          </Button>
        </div>
      ) : (
        <div className={FOLDER_GRID_CLASS}>
          {podGroups.map((group) => (
            <PodFolder
              key={group.pod.id}
              name={group.pod.name}
              experts={group.experts}
              onOpen={() => setOpenPodId(group.pod.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

interface PodFolderProps {
  name: string;
  experts: Expert[];
  onOpen: () => void;
}

function PodFolder({ name, experts, onOpen }: PodFolderProps) {
  const t = useT();
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={t("team8.pods.openPod", { name })}
      // TODO(tokens): no fitting role for focus-visible:ring-zinc-400 #ADADB3; #ADADB3 is foreground-subtle (a text colour)
      className="flex flex-col gap-3 rounded-2xl bg-surface p-4 text-left transition-colors smooth-shadow-ring-sm hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
    >
      <div className="flex items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-surface-hover text-foreground-secondary">
          <Icon icon={Folder02Icon} size={20} />
        </span>
        <div className="min-w-0">
          <Text
            variant="large-medium"
            as="h5"
            tone="primary"
            className="truncate"
          >
            {name}
          </Text>
          <Text variant="small" tone="muted">
            {t(
              experts.length === 1
                ? "team8.pods.expertOne"
                : "team8.pods.expertMany",
              { count: experts.length },
            )}
          </Text>
        </div>
      </div>
      {experts.length > 0 ? (
        <ul className="flex flex-wrap gap-1.5">
          {experts.map((expert) => (
            <Text
              key={expert.id}
              variant="small"
              as="li"
              tone="secondary"
              className="max-w-full truncate rounded-md bg-surface-muted px-2 py-0.5 ring-1 ring-inset ring-border-base"
            >
              {expert.name}
            </Text>
          ))}
        </ul>
      ) : (
        <Text variant="small" tone="muted">
          {t("team8.pods.emptyFolder")}
        </Text>
      )}
    </button>
  );
}
