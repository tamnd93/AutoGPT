"use client";

import { Expert } from "@/app/api/__generated__/models/expert";
import { ExpertSoulUpdate } from "@/app/api/__generated__/models/expertSoulUpdate";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { LockIcon } from "@hugeicons/core-free-icons";
import { useState } from "react";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ExpertSidePanel } from "../ExpertSidePanel/ExpertSidePanel";
import { LearnedNotes } from "./components/LearnedNotes/LearnedNotes";
import { SoulSectionTitle } from "./SoulSectionTitle";
import { useBottomScrollShadow } from "./useBottomScrollShadow";
import { useSoulDrawer } from "./useSoulDrawer";

interface Props {
  expert: Expert | null;
  onClose: () => void;
}

export function SoulDrawer({ expert, onClose }: Props) {
  const t = useT();
  return (
    <ExpertSidePanel
      identity={
        expert
          ? {
              name: expert.name,
              avatarUrl: expert.avatar_url,
              color: expert.color,
            }
          : null
      }
      title={expert ? t("team9.soul.title", { name: expert.name }) : ""}
      panelId="soul"
      closeLabel={t("team9.soul.closeAria")}
      onClose={onClose}
    >
      {expert ? <SoulPanelBody expert={expert} onClose={onClose} /> : null}
    </ExpertSidePanel>
  );
}

interface BodyProps {
  expert: Expert;
  onClose: () => void;
}

function SoulPanelBody({ expert, onClose }: BodyProps) {
  const t = useT();
  const { soul, updateField, save, isPending, canSave } = useSoulDrawer({
    expert,
    onClose,
  });
  const [scrollElement, setScrollElement] = useState<HTMLDivElement | null>(
    null,
  );
  const hasMoreBelow = useBottomScrollShadow(scrollElement);

  return (
    <form onSubmit={save} className="flex min-h-0 flex-1 flex-col">
      <div className="relative min-h-0 flex-1">
        <div
          ref={setScrollElement}
          className="h-full overflow-y-auto px-5 py-5"
        >
          <Text variant="small" tone="muted" className="mb-5">
            {t("team9.soul.intro")}
          </Text>
          <SoulFields soul={soul} updateField={updateField} />
          <LearnedNotes expertId={expert.id} />
          <ProtectedRules rules={expert.protected_soul_rules} />
        </div>
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-sidebar to-transparent transition-opacity duration-200",
            hasMoreBelow ? "opacity-100" : "opacity-0",
          )}
        />
      </div>
      <div className="flex shrink-0 justify-end gap-2 border-t border-t-sidebar-border px-5 py-3">
        <Button type="button" variant="ghost" size="small" onClick={onClose}>
          {t("team9.soul.cancel")}
        </Button>
        <Button
          type="submit"
          variant="primary"
          size="small"
          loading={isPending}
          disabled={!canSave}
        >
          {t("team9.soul.save")}
        </Button>
      </div>
    </form>
  );
}

interface SoulFieldsProps {
  soul: ExpertSoulUpdate;
  updateField: (field: keyof ExpertSoulUpdate, value: string) => void;
}

function SoulFields({ soul, updateField }: SoulFieldsProps) {
  const t = useT();
  return (
    <div className="space-y-1">
      <Input
        id="soul-name"
        label={t("team9.soul.name")}
        labelVariant="small-medium"
        labelClassName="!text-foreground-body"
        value={soul.name}
        maxLength={100}
        required
        onChange={(event) => updateField("name", event.target.value)}
      />
      <Input
        id="soul-identity"
        label={t("team9.soul.identity")}
        labelVariant="small-medium"
        labelClassName="!text-foreground-body"
        type="textarea"
        rows={6}
        value={soul.identity}
        maxLength={10000}
        required
        onChange={(event) => updateField("identity", event.target.value)}
      />
      <Input
        id="soul-voice"
        label={t("team9.soul.voice")}
        labelVariant="small-medium"
        labelClassName="!text-foreground-body"
        type="textarea"
        rows={3}
        value={soul.voice_preferences}
        maxLength={4000}
        placeholder={t("team9.soul.voicePlaceholder")}
        onChange={(event) =>
          updateField("voice_preferences", event.target.value)
        }
      />
      <Input
        id="soul-boundaries"
        label={t("team9.soul.boundaries")}
        labelVariant="small-medium"
        labelClassName="!text-foreground-body"
        type="textarea"
        rows={4}
        value={soul.boundaries}
        maxLength={4000}
        placeholder={t("team9.soul.boundariesPlaceholder")}
        onChange={(event) => updateField("boundaries", event.target.value)}
      />
    </div>
  );
}

function ProtectedRules({ rules }: { rules: string[] }) {
  const t = useT();
  return (
    <section className="border-t border-border-base pt-6">
      <div className="mb-3 flex items-center gap-2">
        <Icon icon={LockIcon} size={16} className="text-foreground-tertiary" />
        <SoulSectionTitle>{t("team9.soul.protectedRules")}</SoulSectionTitle>
      </div>
      <div className="space-y-2 rounded-xl bg-surface-muted p-4">
        {rules.map((rule) => (
          <Text
            key={rule}
            variant="body"
            as="div"
            tone="secondary"
            className="flex gap-2 leading-5"
          >
            <Icon icon={LockIcon} size={14} className="mt-0.5 shrink-0" />
            <span>{rule}</span>
          </Text>
        ))}
      </div>
      <Text variant="small" tone="muted" className="mt-3">
        {t("team9.soul.protectedRulesNote")}
      </Text>
    </section>
  );
}
