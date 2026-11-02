import Link from "next/link";
import type { HomeActiveTask } from "@/app/api/__generated__/models/homeActiveTask";
import { Text } from "@/components/atoms/Text/Text";
import { ExpertAvatar } from "@/components/molecules/ExpertAvatar/ExpertAvatar";
import { WorkflowAvatar } from "@/components/molecules/WorkflowAvatar/WorkflowAvatar";
import { useLocale, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { formatRunningFor } from "../helpers";

interface Props {
  item: HomeActiveTask;
}

const ROW_CLASS = "relative flex items-center gap-3 py-2 pl-[3.75rem] pr-4";

export function ActiveRow({ item }: Props) {
  const t = useT();
  const locale = useLocale();
  const content = (
    <>
      <span className="absolute left-4 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface">
        {item.expert ? (
          <ExpertAvatar
            name={item.expert.name}
            avatarUrl={item.expert.avatar_url}
            size={36}
          />
        ) : (
          <WorkflowAvatar
            name={item.title}
            imageUrl={item.image_url}
            size={36}
          />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <Text
          variant="body-medium"
          tone="primary"
          className="truncate leading-5"
        >
          <span>{item.title}</span>
          <span className="font-normal text-foreground-tertiary">
            {" "}
            workflow
          </span>
        </Text>
        <Text variant="small" tone="muted" className="truncate">
          {item.status === "queued"
            ? t("home2.nowNext.queued")
            : (formatRunningFor(item.started_at, new Date(), locale) ??
              t("home2.nowNext.runningNow"))}
        </Text>
      </div>
    </>
  );

  if (!item.link) return <div className={ROW_CLASS}>{content}</div>;
  return (
    <Link
      href={item.link}
      className={cn(
        ROW_CLASS,
        "outline-none transition-colors hover:bg-surface-muted focus-visible:bg-surface-muted",
      )}
    >
      {content}
    </Link>
  );
}
