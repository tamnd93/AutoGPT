import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { AGENT_LIBRARY_SECTION_PADDING_X } from "../../helpers";
import { SelectedViewLayout } from "./SelectedViewLayout";

interface Props {
  agent: LibraryAgent;
}

export function LoadingSelectedContent(props: Props) {
  const t = useT();

  return (
    <SelectedViewLayout agent={props.agent}>
      <div
        className={cn("flex flex-col gap-4", AGENT_LIBRARY_SECTION_PADDING_X)}
        data-testid="loading-selected-content"
        role="status"
        aria-busy="true"
        aria-label={t("library2.loading.content")}
      >
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    </SelectedViewLayout>
  );
}
