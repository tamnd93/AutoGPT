import { useT } from "@/lib/i18n";
import { OrbitLoader } from "../../../OrbitLoader/OrbitLoader";

interface Props {
  expertName?: string;
}

export function ExpertKickoffLoader({ expertName }: Props) {
  const t = useT();

  return (
    <div
      role="status"
      aria-live="polite"
      className="flex h-full flex-1 flex-col items-center justify-center gap-4 text-center"
    >
      <OrbitLoader size={32} />
      <div>
        <p
          // TODO(tokens): no exact role for text-neutral-900
          className="text-base font-medium text-neutral-900"
        >
          {expertName
            ? t("home1.kickoff.openingExpert", { name: expertName })
            : t("home1.kickoff.opening")}
        </p>
        <p
          // TODO(tokens): no exact role for text-neutral-500
          className="mt-1 text-sm text-neutral-500"
        >
          {t("home1.kickoff.starting")}
        </p>
      </div>
    </div>
  );
}
