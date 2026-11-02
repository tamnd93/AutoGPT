"use client";

import type { ExpertAvatarRequestCategory } from "@/app/api/__generated__/models/expertAvatarRequestCategory";
import { ExpertAvatar } from "@/components/molecules/ExpertAvatar/ExpertAvatar";
import { ExpertAvatarPicker } from "@/components/molecules/ExpertAvatarPicker/ExpertAvatarPicker";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { bubbleClassFor } from "../ColorStep/helpers";

interface Props {
  name: string;
  category: ExpertAvatarRequestCategory;
  color: string | null;
  avatarUrl: string | null;
  onPick: (avatarUrl: string) => void;
}

export function AvatarStep({
  name,
  category,
  color,
  avatarUrl,
  onPick,
}: Props) {
  const t = useT();
  if (avatarUrl) {
    return (
      <div
        className={cn(
          "ml-auto flex w-fit items-center gap-3 rounded-full border py-2 pl-2 pr-5",
          bubbleClassFor(color) ?? "border-accent bg-accent/5",
        )}
      >
        <ExpertAvatar
          name={name || t("team1.common.yourExpert")}
          avatarUrl={avatarUrl}
          size={40}
        />
        <span className="text-sm font-medium text-foreground">
          {name
            ? t("team1.avatar.hasAvatar", { name })
            : t("team1.avatar.pictureSet")}
        </span>
      </div>
    );
  }

  return <ExpertAvatarPicker name={name} category={category} onPick={onPick} />;
}
