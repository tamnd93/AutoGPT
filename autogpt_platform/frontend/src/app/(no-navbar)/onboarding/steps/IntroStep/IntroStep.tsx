"use client";

import { Button } from "@/components/atoms/Button/Button";
import { FadeIn } from "@/components/atoms/FadeIn/FadeIn";
import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useOnboardingWizardStore } from "../../store";
import { AutopilotScene } from "./components/AutopilotScene";
import { TeamScene } from "./components/TeamScene";
import { INTRO_SLIDE_KEYS, type IntroSlideId } from "./helpers";

interface Props {
  slide: IntroSlideId;
}

const SCENES: Record<IntroSlideId, () => React.JSX.Element> = {
  team: TeamScene,
  autopilot: AutopilotScene,
};

// One intro slide as a wizard step of its own, so it has a URL, a dot, a
// place in the funnel and a Back button like every other step.
export function IntroStep({ slide }: Props) {
  const t = useT();
  const nextStep = useOnboardingWizardStore((s) => s.nextStep);
  const keys = INTRO_SLIDE_KEYS[slide];
  const title = t(keys.title);
  const body = "body" in keys ? t(keys.body) : undefined;
  const Scene = SCENES[slide];

  return (
    <FadeIn
      className={cn(
        "flex w-full flex-col items-center gap-8 px-4",
        slide === "team" ? "max-w-2xl" : "max-w-lg",
      )}
    >
      <Text variant="h4" as="h1" className="text-center leading-tight">
        {title}
      </Text>

      <div
        data-testid="intro-stage"
        className={cn(
          "relative w-full overflow-hidden",
          slide === "team" ? "h-[420px]" : "h-[340px]",
        )}
      >
        <Scene />
      </div>

      {body && (
        <Text
          variant="large"
          as="p"
          tone="muted"
          className="max-w-md text-center md:max-w-full md:text-[1.125rem] md:leading-[1.2]"
        >
          {body}
        </Text>
      )}

      <Button
        type="button"
        size="small"
        onClick={nextStep}
        className="h-10 w-56"
      >
        {t("onboarding2.intro.next")}
      </Button>
    </FadeIn>
  );
}
