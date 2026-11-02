"use client";

import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { SkillFileViewer } from "@/components/contextual/SkillPackage/SkillFileViewer";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import { SkillActions } from "../../../skills/[slug]/components/SkillActions";
import { SkillBody } from "../../../skills/[slug]/components/SkillBody";
import { useSkillPage } from "../../../skills/[slug]/components/useSkillPage";
import { useT } from "@/lib/i18n";

interface Props {
  slug: string;
  onClose: () => void;
}

export function SkillDialog({ slug, onClose }: Props) {
  const t = useT();
  const {
    skill,
    isLoggedIn,
    isLoading,
    isError,
    refetch,
    isReady,
    isAdded,
    isAdding,
    experts,
    addToAutoPilot,
    addToExpert,
    files,
    openFilePath,
    openFile,
    closeFile,
  } = useSkillPage(slug);

  return (
    <>
      <Dialog
        title={skill?.title ?? t("marketplace1.skillDialog.title")}
        styling={{ width: "760px" }}
        controlled={{
          isOpen: true,
          set: (open) => {
            if (!open) onClose();
          },
        }}
      >
        <Dialog.Content>
          <div data-testid="skill-dialog">
            {isLoading ? (
              <div role="status" aria-busy="true" className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : isError || !skill ? (
              <div className="flex items-center gap-2 text-sm text-foreground-secondary">
                <span>{t("marketplace1.skillDialog.loadFailed")}</span>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="font-medium text-accent underline-offset-2 transition-colors hover:underline"
                >
                  {t("marketplace1.skills.retry")}
                </button>
              </div>
            ) : (
              <>
                <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-border-base pb-5">
                  <p className="min-w-0 max-w-[52ch] flex-1 text-body-md leading-6 text-foreground-secondary">
                    {skill.description}
                  </p>
                  <SkillActions
                    slug={slug}
                    isLoggedIn={isLoggedIn}
                    isReady={isReady}
                    isAdded={isAdded}
                    isAdding={isAdding}
                    experts={experts}
                    onAdd={addToAutoPilot}
                    onAddToExpert={addToExpert}
                  />
                </div>
                {skill.body.trim() ? (
                  <SkillBody
                    body={skill.body}
                    title={skill.title}
                    packagePaths={files.map((file) => file.path)}
                    onOpenFile={openFile}
                  />
                ) : (
                  <p className="text-sm text-foreground-tertiary">
                    {t("marketplace1.skillDialog.noInstructions")}
                  </p>
                )}
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog>
      <SkillFileViewer
        source={{ kind: "listing", slug }}
        path={openFilePath}
        onClose={closeFile}
      />
    </>
  );
}
