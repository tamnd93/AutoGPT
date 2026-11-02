"use client";

import { Button } from "@/components/atoms/Button/Button";
import { FadeIn } from "@/components/atoms/FadeIn/FadeIn";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { useLocale, useT } from "@/lib/i18n";
import {
  MAX_TYPED_CHARS,
  typedCharsLeftHint,
  typedTooLongCopy,
} from "../helpers";

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isTooLong: boolean;
  rows?: number;
}

const LIMIT_HINT_ID = "brain-dump-text-limit";

export function TypedFallback({
  value,
  onChange,
  onSubmit,
  isTooLong,
  rows = 6,
}: Props) {
  const t = useT();
  const locale = useLocale();

  return (
    <FadeIn className="w-full">
      <div className="flex w-full flex-col items-center gap-3">
        <div className="flex w-full flex-col gap-1">
          <Input
            id="brain-dump-text"
            type="textarea"
            label={t("onboarding1.typed.label")}
            hideLabel
            rows={rows}
            className="rounded-xl border-border-base"
            placeholder={t("onboarding1.typed.placeholder")}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={MAX_TYPED_CHARS}
            aria-describedby={LIMIT_HINT_ID}
            wrapperClassName="mb-0"
            autoFocus
          />
          {isTooLong ? (
            <Text
              variant="small"
              tone="danger"
              role="alert"
              id={LIMIT_HINT_ID}
              className="text-left"
            >
              {typedTooLongCopy(t, locale)}
            </Text>
          ) : (
            <Text
              variant="small"
              tone="muted"
              id={LIMIT_HINT_ID}
              className="min-h-[1.125rem] text-right"
            >
              {typedCharsLeftHint(value.length, t, locale)}
            </Text>
          )}
        </div>
        <Button
          size="small"
          onClick={onSubmit}
          disabled={!value.trim()}
          className="h-10 w-56"
        >
          {t("onboarding1.typed.done")}
        </Button>
      </div>
    </FadeIn>
  );
}
