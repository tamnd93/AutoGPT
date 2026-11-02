"use client";

import {
  getGetV2ListLibraryAgentsQueryKey,
  useDeleteV2DeleteLibraryAgent,
  useGetV2ListLibraryAgents,
  usePostV2AddMarketplaceAgent,
} from "@/app/api/__generated__/endpoints/library/library";
import { getV2GetSpecificAgent } from "@/app/api/__generated__/endpoints/store/store";
import { LibraryAgent } from "@/app/api/__generated__/models/libraryAgent";
import { LibraryAgentResponse } from "@/app/api/__generated__/models/libraryAgentResponse";
import { Button } from "@/components/atoms/Button/Button";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useAuth } from "@/lib/auth/hooks/useAuth";
import { useT } from "@/lib/i18n";
import * as Sentry from "@sentry/nextjs";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

function UndoActions({
  libraryAgentID,
  libraryHref,
  onUndo,
}: {
  libraryAgentID: string;
  libraryHref: string;
  onUndo: (id: string) => Promise<void>;
}) {
  const t = useT();
  const [isUndoing, setIsUndoing] = useState(false);

  return (
    <div className="mt-6 flex items-center gap-2">
      <Button
        variant="primary"
        size="small"
        as="NextLink"
        // TODO(tokens): no exact role: bg-neutral-200 #E5E5E5, hover:bg-neutral-300 #D4D4D4
        className="bg-neutral-200 text-foreground-strong hover:bg-neutral-300 hover:text-foreground-emphasis"
        href={libraryHref}
      >
        {t("marketplace1.addToLibrary.open")}
      </Button>
      <Button
        variant="ghost"
        size="small"
        loading={isUndoing}
        // TODO(tokens): no fitting role for text-zinc-200 #DADADC; #DADADC is surface-active (a surface fill), border-base (a border colour)
        className="border-none text-zinc-200 hover:bg-transparent hover:text-foreground-subtle"
        onClick={async () => {
          setIsUndoing(true);
          try {
            await onUndo(libraryAgentID);
          } finally {
            setIsUndoing(false);
          }
        }}
      >
        {isUndoing
          ? t("marketplace1.addToLibrary.undoing")
          : t("marketplace1.addToLibrary.undo")}
      </Button>
    </div>
  );
}

interface Props {
  creatorSlug: string;
  agentSlug: string;
  agentName: string;
  agentGraphID: string;
  className?: string;
  isInLibrary?: boolean;
}

export function AddToLibraryButton({
  creatorSlug,
  agentSlug,
  agentName,
  agentGraphID,
  className,
  isInLibrary,
}: Props) {
  const { isLoggedIn } = useAuth();
  const t = useT();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [justAdded, setJustAdded] = useState(false);

  // Only fetch library list if isInLibrary wasn't provided by parent
  const { data: libraryAgents } = useGetV2ListLibraryAgents(
    { is_hidden: false },
    {
      query: {
        enabled: isLoggedIn && isInLibrary === undefined,
        select: (res) =>
          res.status === 200 ? (res.data as LibraryAgentResponse) : undefined,
      },
    },
  );

  const { mutateAsync: addToLibrary, isPending } =
    usePostV2AddMarketplaceAgent();

  const { mutateAsync: removeFromLibrary } = useDeleteV2DeleteLibraryAgent();

  if (!isLoggedIn) return null;
  if (justAdded) return null;

  const isAlreadyInLibrary =
    isInLibrary ??
    libraryAgents?.agents?.some(
      (a: LibraryAgent) => a.graph_id === agentGraphID,
    );

  if (isAlreadyInLibrary) return null;

  async function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();

    try {
      const details = await getV2GetSpecificAgent(creatorSlug, agentSlug);

      if (details.status !== 200) {
        throw new Error(t("marketplace1.addToLibrary.fetchFailed"));
      }

      const { data: response } = await addToLibrary({
        data: {
          store_listing_version_id: details.data.store_listing_version_id,
        },
      });

      const data = response as LibraryAgent;
      setJustAdded(true);

      await queryClient.invalidateQueries({
        queryKey: getGetV2ListLibraryAgentsQueryKey(),
      });

      const addedToast = toast({
        title: t("marketplace1.addToLibrary.added", { name: agentName }),
        description: (
          <UndoActions
            libraryAgentID={data.id}
            libraryHref={`/library/agents/${data.id}`}
            onUndo={async (id) => {
              try {
                await removeFromLibrary({ libraryAgentId: id });
                await queryClient.invalidateQueries({
                  queryKey: getGetV2ListLibraryAgentsQueryKey(),
                });
                setJustAdded(false);
                addedToast.dismiss();
                toast({
                  title: t("marketplace1.addToLibrary.undone"),
                  variant: "info",
                  duration: 3000,
                });
              } catch (undoError) {
                Sentry.captureException(undoError);
                toast({
                  title: t("marketplace1.addToLibrary.undoFailed"),
                  variant: "destructive",
                });
              }
            }}
          />
        ),
        dismissable: false,
        duration: 10000,
      });
    } catch (error) {
      Sentry.captureException(error);
      toast({
        title: t("marketplace1.addToLibrary.error"),
        description: t("marketplace1.addToLibrary.addFailed"),
        variant: "destructive",
      });
    }
  }

  return (
    <Button
      variant="secondary"
      size="small"
      loading={isPending}
      leftIcon={<Icon icon={PlusSignIcon} size={14} />}
      onClick={handleClick}
      className={`z-10 ${className ?? ""}`}
      aria-label={t("marketplace1.addToLibrary.aria", { name: agentName })}
    >
      {isPending
        ? t("marketplace1.addToLibrary.adding")
        : t("marketplace1.addToLibrary.add")}
    </Button>
  );
}
