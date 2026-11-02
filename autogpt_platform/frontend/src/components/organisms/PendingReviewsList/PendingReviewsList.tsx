import { useMemo, useState } from "react";
import { PendingHumanReviewModel } from "@/app/api/__generated__/models/pendingHumanReviewModel";
import { PendingReviewCard } from "@/components/organisms/PendingReviewCard/PendingReviewCard";
import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button/Button";
import { Switch } from "@/components/atoms/Switch/Switch";
import { useToast } from "@/components/molecules/Toast/use-toast";
import { useProcessReviews } from "@/hooks/useProcessReviews";
import {
  Alert01Icon,
  ArrowDown01Icon,
  ArrowRight01Icon,
  Clock01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { AttentionCard } from "@/components/organisms/AttentionCard/AttentionCard";
import { useT } from "@/lib/i18n";

interface PendingReviewsListProps {
  reviews: PendingHumanReviewModel[];
  onReviewComplete?: () => void;
  emptyMessage?: string;
}

// Copilot action-gate approvals bind exact arguments; auto-approve cannot apply.
export const COPILOT_GATE_NODE_PREFIX = "copilot-node-gate-";

export function PendingReviewsList({
  reviews,
  onReviewComplete,
  emptyMessage,
}: PendingReviewsListProps) {
  const t = useT();
  const [reviewDataMap, setReviewDataMap] = useState<Record<string, string>>(
    () => {
      const initialData: Record<string, string> = {};
      reviews.forEach((review) => {
        initialData[review.node_exec_id] = JSON.stringify(
          review.payload,
          null,
          2,
        );
      });
      return initialData;
    },
  );

  const [pendingAction, setPendingAction] = useState<{
    nodeId: string;
    action: "approve" | "reject";
  } | null>(null);

  const [autoApproveFutureMap, setAutoApproveFutureMap] = useState<
    Record<string, boolean>
  >({});

  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  const { toast } = useToast();

  const groupedReviews = useMemo(() => {
    return reviews.reduce(
      (acc, review) => {
        const nodeId = review.node_id || "unknown";
        if (!acc[nodeId]) {
          acc[nodeId] = [];
        }
        acc[nodeId].push(review);
        return acc;
      },
      {} as Record<string, PendingHumanReviewModel[]>,
    );
  }, [reviews]);

  const { processReviews: submitReviewAction, isProcessing } =
    useProcessReviews({ onSettled: onReviewComplete });

  function handleReviewDataChange(nodeExecId: string, data: string) {
    setReviewDataMap((prev) => ({ ...prev, [nodeExecId]: data }));
  }

  function handleAutoApproveFutureToggle(nodeId: string, enabled: boolean) {
    setAutoApproveFutureMap((prev) => ({
      ...prev,
      [nodeId]: enabled,
    }));

    if (enabled) {
      const nodeReviews = groupedReviews[nodeId] || [];
      setReviewDataMap((prev) => {
        const updated = { ...prev };
        nodeReviews.forEach((review) => {
          updated[review.node_exec_id] = JSON.stringify(
            review.payload,
            null,
            2,
          );
        });
        return updated;
      });
    }
  }

  function toggleGroupCollapse(nodeId: string) {
    setCollapsedGroups((prev) => ({
      ...prev,
      [nodeId]: !prev[nodeId],
    }));
  }

  // Scoped to one node's reviews on purpose: these are the rows rendered
  // directly above the button that calls this, and a decision must never
  // reach a row the reviewer has not been shown.
  async function processGroup(nodeId: string, approved: boolean) {
    const groupReviews = groupedReviews[nodeId] || [];

    if (groupReviews.length === 0) {
      toast({
        title: t("errors4.pendingReviews.noReviewsTitle"),
        description: t("errors4.pendingReviews.noReviewsBody"),
        variant: "destructive",
      });
      return;
    }

    setPendingAction({ nodeId, action: approved ? "approve" : "reject" });
    const reviewItems = [];

    for (const review of groupReviews) {
      const reviewData = reviewDataMap[review.node_exec_id];
      const autoApproveThisNode = autoApproveFutureMap[review.node_id || ""];

      let parsedData: any = undefined;

      if (!autoApproveThisNode) {
        // An emptied draft is "" here and must fail the parse below, not
        // fall back to the original payload the reviewer just cleared.
        if (review.editable && reviewData !== undefined) {
          try {
            parsedData = JSON.parse(reviewData);
          } catch (error) {
            // A rejection sends nothing the reviewer edited, so a broken
            // draft only has to block an approval.
            if (approved) {
              toast({
                title: t("errors4.pendingReviews.invalidJsonTitle"),
                description: t("errors4.pendingReviews.invalidJsonBody", {
                  node: review.node_exec_id,
                  error:
                    error instanceof Error
                      ? error.message
                      : t("errors4.pendingReviews.invalidSyntax"),
                }),
                variant: "destructive",
              });
              setPendingAction(null);
              return;
            }
            parsedData = review.payload;
          }
        } else {
          parsedData = review.payload;
        }
      }

      reviewItems.push({
        node_exec_id: review.node_exec_id,
        approved,
        reviewed_data: parsedData,
        auto_approve_future: autoApproveThisNode && approved,
      });
    }

    try {
      const res = await submitReviewAction(reviewItems, groupReviews);

      if (res.status !== 200) {
        toast({
          title: t("errors4.pendingReviews.failedTitle"),
          description: t("errors4.pendingReviews.unexpectedResponse"),
          variant: "destructive",
        });
        return;
      }

      const result = res.data;

      if (result.failed_count > 0) {
        toast({
          title: t("errors4.pendingReviews.partialTitle"),
          description: t("errors4.pendingReviews.partialBody", {
            succeeded: result.approved_count + result.rejected_count,
            failed: result.failed_count,
            error: result.error || t("errors4.pendingReviews.partialFallback"),
          }),
          variant: "destructive",
        });
      } else {
        toast({
          title: t("errors4.pendingReviews.successTitle"),
          description: t("errors4.pendingReviews.successBody", {
            approved: result.approved_count,
            rejected: result.rejected_count,
          }),
          variant: "default",
        });
      }
    } catch (error) {
      toast({
        title: t("errors4.pendingReviews.failedTitle"),
        description:
          error instanceof Error
            ? error.message
            : t("errors4.pendingReviews.errorOccurred"),
        variant: "destructive",
      });
    } finally {
      setPendingAction(null);
    }
  }

  if (reviews.length === 0) {
    return (
      <div
        data-slot="pending-reviews-list-empty"
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <Icon
          icon={Clock01Icon}
          size={48}
          className="mb-4 text-muted-foreground"
        />
        <Text variant="h4" className="text-muted-foreground">
          {emptyMessage ?? t("errors4.pendingReviews.empty")}
        </Text>
        <Text variant="body" className="mt-2 max-w-md text-muted-foreground">
          {t("errors4.pendingReviews.emptyHint")}
        </Text>
      </div>
    );
  }

  return (
    <AttentionCard.Root
      variant="caution"
      density="spacious"
      data-slot="pending-reviews-list"
    >
      <div data-slot="pending-reviews-list-header" className="space-y-6">
        <AttentionCard.Row align="start" data-slot="pending-reviews-list-title">
          <AttentionCard.Icon>
            <Icon icon={Alert01Icon} size={28} />
          </AttentionCard.Icon>
          <Text
            variant="large-semibold"
            className="overflow-hidden text-ellipsis text-textBlack"
          >
            {t("errors4.pendingReviews.neededTitle")}
          </Text>
        </AttentionCard.Row>
        <Text variant="large" className="text-textGrey">
          {reviews.every((review) => isGateReview(review.node_id))
            ? t("errors4.pendingReviews.waitingGate")
            : t("errors4.pendingReviews.waitingWorkflow")}
        </Text>
      </div>

      <div data-slot="pending-reviews-list-groups" className="space-y-7">
        {Object.entries(groupedReviews).map(([nodeId, nodeReviews]) => {
          const isCollapsed = collapsedGroups[nodeId] ?? false;
          const reviewCount = nodeReviews.length;
          const groupAction =
            pendingAction?.nodeId === nodeId ? pendingAction.action : null;

          const firstReview = nodeReviews[0];
          const reviewTitle =
            firstReview?.action ??
            firstReview?.instructions ??
            t("errors4.pendingReviews.reviewFallback");
          const workflowName = firstReview?.agent_name;

          const getShortenedNodeId = (id: string) => {
            if (id.length <= 8) return id;
            return `${id.slice(0, 4)}...${id.slice(-4)}`;
          };

          return (
            <div
              key={nodeId}
              data-slot="pending-reviews-list-group"
              className="space-y-4"
            >
              <AttentionCard.Row asChild align="center">
                <button
                  onClick={() => toggleGroupCollapse(nodeId)}
                  data-slot="pending-reviews-list-group-toggle"
                  className="w-full text-left"
                >
                  {isCollapsed ? (
                    <Icon
                      icon={ArrowRight01Icon}
                      size={20}
                      // TODO(tokens): no role for Tailwind's default gray-600;
                      // the zinc roles are a different grey.
                      className="text-gray-600"
                    />
                  ) : (
                    <Icon
                      icon={ArrowDown01Icon}
                      size={20}
                      // TODO(tokens): no role for Tailwind's default gray-600;
                      // the zinc roles are a different grey.
                      className="text-gray-600"
                    />
                  )}
                  <div
                    data-slot="pending-reviews-list-group-heading"
                    className="flex-1"
                  >
                    <Text
                      // TODO(tokens): no role for Tailwind's default gray-900; the
                      // zinc roles are a different grey.
                      variant="body"
                      className="font-semibold text-gray-900"
                    >
                      {reviewTitle}
                    </Text>
                    {(workflowName ||
                      (!firstReview?.action && !isGateReview(nodeId))) && (
                      <Text
                        // TODO(tokens): no role for Tailwind's default gray-500;
                        // the zinc roles are a different grey.
                        variant="small"
                        className="text-gray-500"
                      >
                        {workflowName
                          ? `In workflow “${workflowName}”`
                          : `Node #${getShortenedNodeId(nodeId)}`}
                      </Text>
                    )}
                  </div>
                  <AttentionCard.Count data-slot="pending-reviews-list-group-count">
                    {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                  </AttentionCard.Count>
                </button>
              </AttentionCard.Row>

              {!isCollapsed && (
                <div
                  data-slot="pending-reviews-list-group-body"
                  className="space-y-4"
                >
                  {nodeReviews.map((review) => (
                    <PendingReviewCard
                      key={review.node_exec_id}
                      review={review}
                      onReviewDataChange={handleReviewDataChange}
                      autoApproveFuture={autoApproveFutureMap[nodeId] || false}
                      externalDataValue={reviewDataMap[review.node_exec_id]}
                      showAutoApprove={false}
                    />
                  ))}

                  {!isGateReview(nodeId) && (
                    <div
                      data-slot="pending-reviews-list-auto-approve"
                      className="flex items-center gap-3 pt-2"
                    >
                      <Switch
                        checked={autoApproveFutureMap[nodeId] || false}
                        onCheckedChange={(enabled: boolean) =>
                          handleAutoApproveFutureToggle(nodeId, enabled)
                        }
                      />
                      <Text
                        // TODO(tokens): no role for Tailwind's default gray-700;
                        // the zinc roles are a different grey.
                        variant="small"
                        className="text-gray-700"
                      >
                        Auto-approve future executions of this node
                      </Text>
                    </div>
                  )}

                  <AttentionCard.Actions
                    placement="footer"
                    data-slot="pending-reviews-list-actions"
                  >
                    <Button
                      onClick={() => processGroup(nodeId, true)}
                      disabled={isProcessing}
                      variant="primary"
                      className="flex min-w-20 items-center justify-center gap-2 rounded-full px-4 py-3"
                      loading={groupAction === "approve" && isProcessing}
                    >
                      {reviewCount === 1
                        ? "Approve"
                        : `Approve ${reviewCount} reviews`}
                    </Button>
                    <Button
                      onClick={() => processGroup(nodeId, false)}
                      disabled={isProcessing}
                      variant="destructive"
                      className="flex min-w-20 items-center justify-center gap-2 rounded-full bg-error-hover px-4 py-3"
                      loading={groupAction === "reject" && isProcessing}
                    >
                      {reviewCount === 1
                        ? "Reject"
                        : `Reject ${reviewCount} reviews`}
                    </Button>
                  </AttentionCard.Actions>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Text variant="small" className="text-textGrey">
        Each decision applies only to the reviews shown above it. You can turn
        auto-approval on or off using the toggle for each node.
      </Text>
    </AttentionCard.Root>
  );
}

function isGateReview(nodeId: string | null | undefined) {
  return !!nodeId?.startsWith(COPILOT_GATE_NODE_PREFIX);
}
