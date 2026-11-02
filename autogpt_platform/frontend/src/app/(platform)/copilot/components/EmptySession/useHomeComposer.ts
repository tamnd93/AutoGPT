import { useLayoutEffect, useState } from "react";
import { useHomePage } from "@/app/(platform)/home/useHomePage";
import { useT } from "@/lib/i18n";
import { getInputPlaceholder } from "./helpers";

interface Args {
  enabled: boolean;
  /** The onboarding greeting on screen: "A" answers the user's brain dump. */
  greetingPath?: string | null;
}

export function useHomeComposer({ enabled, greetingPath = null }: Args) {
  const t = useT();
  const { dashboard } = useHomePage({ enabled });
  const hasExistingWork = Boolean(
    enabled &&
      dashboard &&
      (dashboard.team.total > 0 ||
        dashboard.attention.length > 0 ||
        dashboard.active_tasks.length > 0 ||
        dashboard.upcoming_tasks.length > 0 ||
        dashboard.week.run_count > 0 ||
        (dashboard.recent_work?.total_count ?? 0) > 0 ||
        (dashboard.recent_work?.groups?.length ?? 0) > 0),
  );
  // The width is the state and the wording is derived per render, so the
  // placeholder follows the locale as well as the breakpoint.
  const [discoveryWidth, setDiscoveryWidth] = useState<number>();

  useLayoutEffect(() => {
    function handleResize() {
      setDiscoveryWidth(window.innerWidth);
    }
    handleResize();
    const queries = [
      window.matchMedia("(max-width: 500px)"),
      window.matchMedia("(max-width: 1080px)"),
    ];
    queries.forEach((query) => query.addEventListener("change", handleResize));
    return () => {
      queries.forEach((query) =>
        query.removeEventListener("change", handleResize),
      );
    };
  }, []);

  if (greetingPath === "A") {
    return { inputPlaceholder: t("home1.placeholder.afterDump") };
  }
  return {
    inputPlaceholder: hasExistingWork
      ? t("home1.placeholder.team")
      : getInputPlaceholder(discoveryWidth, t),
  };
}
