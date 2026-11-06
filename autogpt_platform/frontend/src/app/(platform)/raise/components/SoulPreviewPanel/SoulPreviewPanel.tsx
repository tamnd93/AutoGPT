"use client";

import type { ExpertAvatarRequestCategory } from "@/app/api/__generated__/models/expertAvatarRequestCategory";
import { GlassOrb } from "@/components/molecules/GlassOrb/GlassOrb";
import { DEFAULT_GLASS_PARAMS } from "@/components/molecules/GlassOrb/GlassSurface";
import { useLocale, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  kitBudgetLabel,
  kitToolsLabel,
  localizeVoiceLabel,
  type RaiseKit,
} from "../../helpers";
import { roleFor } from "../CategoryStep/helpers";
import { SoulDetailCard } from "./SoulDetailCard";

const REVEAL =
  "duration-700 animate-in fade-in slide-in-from-bottom-2 fill-mode-both motion-reduce:animate-none";

type SoulDetail = {
  label: string;
  value: string;
};

interface Props {
  name: string;
  category: ExpertAvatarRequestCategory | null;
  jobTitle?: string | null;
  avatarUrl: string | null;
  color: string | null;
  about: string | null;
  voiceLabel: string | null;
  kit: RaiseKit | null;
}

// Starts as just the orb — an expert with nothing to say about itself yet.
// Answers stack beneath it, which pushes the identity card up as they land.
export function SoulPreviewPanel({
  name,
  category,
  jobTitle,
  avatarUrl,
  color,
  about,
  voiceLabel,
  kit,
}: Props) {
  const t = useT();
  const locale = useLocale();
  const roleLabel = jobTitle || roleFor(category);
  const details = [
    { label: t("team1.soulPreview.about"), value: about },
    {
      label: t("team1.soulPreview.voice"),
      value: localizeVoiceLabel(voiceLabel, locale),
    },
    { label: t("team1.budget.aria"), value: kitBudgetLabel(kit, locale) },
    { label: t("team1.soulPreview.tools"), value: kitToolsLabel(kit) },
  ].filter((detail): detail is SoulDetail => Boolean(detail.value));

  return (
    <div className="flex w-full max-w-[19rem] flex-col items-center gap-3">
      <aside className="flex w-full flex-col items-center gap-8 rounded-[2rem] border border-border bg-background px-8 py-12 shadow-2xl">
        <div className="size-28 shrink-0 overflow-hidden rounded-full">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={t("team1.soulPreview.pictureAlt", {
                name: name || t("team1.common.yourExpert"),
              })}
              width={112}
              height={112}
              className="size-28 rounded-full object-cover"
              unoptimized
            />
          ) : (
            <GlassOrb params={DEFAULT_GLASS_PARAMS} showRim={false} />
          )}
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <h2
            className={cn(
              "text-center text-2xl font-semibold tracking-heading",
              name ? `text-foreground ${REVEAL}` : "text-muted-foreground/50",
            )}
          >
            {name || t("team1.soulPreview.noName")}
          </h2>
          {roleLabel ? (
            <p
              className={`text-sm uppercase tracking-caps text-muted-foreground ${REVEAL}`}
            >
              {roleLabel}
            </p>
          ) : null}
        </div>
      </aside>

      {details.map((detail) => (
        <SoulDetailCard
          key={detail.label}
          label={detail.label}
          value={detail.value}
          color={color}
        />
      ))}
    </div>
  );
}
