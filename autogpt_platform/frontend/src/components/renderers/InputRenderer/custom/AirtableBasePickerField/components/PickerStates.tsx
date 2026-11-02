import { Button } from "@/components/atoms/Button/Button";
import { Link } from "@/components/atoms/Link/Link";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { AIRTABLE_HOME_URL } from "../helpers";
import { useT } from "@/lib/i18n";

export function LoadingBases() {
  const t = useT();

  return (
    <div
      role="status"
      aria-label={t("shared7.airtable.loadingAria")}
      className="flex flex-col gap-2"
    >
      {[0, 1, 2].map((row) => (
        <Skeleton key={row} className="h-11 w-full rounded-2xl" />
      ))}
    </div>
  );
}

interface ErrorProps {
  message: string;
  onRetry: () => void;
  retrying: boolean;
}

export function BasesError({ message, onRetry, retrying }: ErrorProps) {
  const t = useT();

  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-2 rounded-2xl bg-red-50 p-3"
    >
      <Text variant="small" className="text-red-700">
        {message}
      </Text>
      <Button
        type="button"
        size="small"
        variant="secondary"
        loading={retrying}
        onClick={onRetry}
      >
        {t("shared7.airtable.tryAgain")}
      </Button>
    </div>
  );
}

interface RefreshProps {
  onRefresh: () => void;
  refreshing: boolean;
}

export function NoBasesYet({ onRefresh, refreshing }: RefreshProps) {
  const t = useT();

  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl bg-zinc-50 p-3">
      <Text variant="small" className="text-zinc-700">
        {t("shared7.airtable.noBases")}
      </Text>
      <NewBaseActions onRefresh={onRefresh} refreshing={refreshing} />
    </div>
  );
}

export function NewBaseActions({ onRefresh, refreshing }: RefreshProps) {
  const t = useT();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link href={AIRTABLE_HOME_URL} isExternal variant="secondary">
        {t("shared7.airtable.openAirtable")}
        <span className="sr-only">{t("shared7.airtable.opensNewTab")}</span>
      </Link>
      <Button
        type="button"
        size="small"
        variant="ghost"
        loading={refreshing}
        onClick={onRefresh}
      >
        {t("shared7.airtable.refreshList")}
      </Button>
    </div>
  );
}
