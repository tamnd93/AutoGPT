"use client";

import { useT } from "@/lib/i18n";
import type { ReactNode } from "react";
import { Text } from "@/components/atoms/Text/Text";
import { TextGenerateEffect } from "./TextGenerateEffect/TextGenerateEffect";
import { getExpertIntroSuffix } from "../helpers";
import { EditNameDialog } from "./EditNameDialog/EditNameDialog";

interface Props {
  name: string | null;
  /** Null holds the line back (recipient still resolving) without moving
   * the composer below it. */
  intro: string | null;
  recipientPicker?: ReactNode;
  isExpert?: boolean;
  expertRole?: string | null;
}

// The regular empty-session hero. While a greeting is being written
// GreetingLoader renders in its place instead, and its orb travels into
// the intro card's heading under a shared layout id.
export function EmptyHero({
  name,
  intro,
  recipientPicker,
  isExpert,
  expertRole,
}: Props) {
  const t = useT();

  return (
    <>
      <div className="mb-1 flex items-center justify-center gap-3 pt-8 md:pt-0">
        <Text variant="h4" tone="primary">
          {t("home1.greeting.hey")}
          {name ? (
            <>
              {t("home1.greeting.nameJoin")}
              <span className="text-foreground-strong">{name}</span>
            </>
          ) : (
            <> {t("home1.greeting.there")}</>
          )}
          <EditNameDialog currentName={name ?? ""} />
        </Text>
      </div>
      {intro === null ? (
        <div aria-hidden className="mb-8 text-heading-sm leading-normal">
          &nbsp;
        </div>
      ) : recipientPicker ? (
        <div className="mb-8 text-heading-sm leading-relaxed tracking-normal text-foreground-strong">
          {isExpert ? t("home1.hero.expertPrefix") : t("home1.hero.ottoPrefix")}{" "}
          <span
            // TODO(tokens): no role holds 18px (text-lg); the type scale goes 16px (body-lg) to 20px (lead). SECRT-3152
            className="mr-1 inline-block align-middle [&_button]:ml-0 [&_button]:text-lg"
          >
            {recipientPicker}
          </span>
          {isExpert ? (
            getExpertIntroSuffix(expertRole ?? null, t)
          ) : (
            <> {t("home1.hero.ottoSuffix")}</>
          )}
        </div>
      ) : (
        // Keyed on the text so switching recipient re-types the line.
        <TextGenerateEffect
          key={intro}
          className="mb-8 !font-normal [&>div]:!mt-0 [&_div]:!text-heading-sm [&_div]:!leading-normal [&_div]:!tracking-normal"
          duration={0.6}
          words={intro}
        />
      )}
    </>
  );
}
