import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";

interface Props {
  message: string;
  conflict: boolean;
  retry: () => void;
}

export function ProgressError({ message, conflict, retry }: Props) {
  const t = useT();

  return (
    <div className="flex flex-col items-center gap-3">
      <ErrorCard
        context={t("onboarding1.progress.errorContext")}
        responseError={{ message }}
        isOurProblem={!conflict}
        onRetry={retry}
      />
      {conflict && (
        <Button onClick={retry}>{t("onboarding1.progress.reload")}</Button>
      )}
    </div>
  );
}
