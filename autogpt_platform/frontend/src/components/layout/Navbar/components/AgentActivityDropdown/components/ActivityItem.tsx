"use client";

import { AgentExecutionStatus } from "@/app/api/__generated__/models/agentExecutionStatus";
import { LoadingSpinner } from "@/components/atoms/LoadingSpinner/LoadingSpinner";
import { Text } from "@/components/atoms/Text/Text";
import { isCompletedWithErrors } from "@/lib/run-health";
import { useLocale, useT } from "@/lib/i18n";
import { formatTimeAgo } from "@/lib/utils/time";
import Link, { useLinkStatus } from "next/link";
import type { AgentExecutionWithInfo } from "../helpers";
import { getExecutionDuration } from "../helpers";
import {
  Alert01Icon,
  Alert02Icon,
  ArrowUpRight01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Loading03Icon,
  MinusSignCircleIcon,
  StopCircleIcon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

function ActivityNavIndicator() {
  const { pending } = useLinkStatus();
  if (pending) {
    return (
      <LoadingSpinner
        size="small"
        // TODO(tokens): no exact role for text-neutral-400 (#A3A3A3)
        className="shrink-0 text-neutral-400"
        aria-hidden="true"
      />
    );
  }
  return (
    <Icon
      icon={ArrowUpRight01Icon}
      size={16}
      // TODO(tokens): no exact role for text-neutral-400 (#A3A3A3)
      className="shrink-0 text-neutral-400"
      aria-hidden="true"
    />
  );
}

interface Props {
  execution: AgentExecutionWithInfo;
}

export function ActivityItem({ execution }: Props) {
  const locale = useLocale();
  const t = useT();

  function getStatusIcon() {
    switch (execution.status) {
      case AgentExecutionStatus.QUEUED:
        return <Icon icon={Clock01Icon} size={18} className="text-brand" />;
      case AgentExecutionStatus.RUNNING:
        return (
          <Icon
            icon={Loading03Icon}
            size={18}
            className="animate-spin text-brand"
          />
        );
      case AgentExecutionStatus.COMPLETED:
        return isCompletedWithErrors(execution) ? (
          <Icon
            icon={Alert02Icon}
            size={18}
            // TODO(tokens): no exact role for text-amber-600 (#D97706)
            className="text-amber-600"
          />
        ) : (
          <Icon icon={CheckmarkCircle02Icon} size={18} className="text-brand" />
        );
      case AgentExecutionStatus.FAILED:
        return <Icon icon={Alert01Icon} size={18} className="text-brand" />;
      case AgentExecutionStatus.TERMINATED:
        return <Icon icon={StopCircleIcon} size={18} className="text-brand" />;
      case AgentExecutionStatus.INCOMPLETE:
        return (
          <Icon icon={MinusSignCircleIcon} size={18} className="text-brand" />
        );
      case AgentExecutionStatus.REVIEW:
        return (
          <Icon
            icon={Alert01Icon}
            size={18}
            // TODO(tokens): no exact role for text-yellow-600 (#DFAF00)
            className="text-yellow-600"
          />
        );
      default:
        return null;
    }
  }

  function getItemDisplay() {
    // Handle active statuses (running/queued)
    const isActiveStatus =
      execution.status === AgentExecutionStatus.RUNNING ||
      execution.status === AgentExecutionStatus.QUEUED;

    if (isActiveStatus) {
      const timeAgo = execution.started_at
        ? formatTimeAgo(execution.started_at.toString(), locale)
        : t("nav2.activity.recently");
      const status =
        execution.status === AgentExecutionStatus.QUEUED
          ? t("nav2.activity.queued")
          : t("nav2.activity.running");
      return [
        t("nav2.activity.started", {
          timeAgo,
          duration: getExecutionDuration(execution, locale),
          status,
        }),
      ];
    }

    // Handle all other statuses with time display
    const timeAgo = execution.ended_at
      ? formatTimeAgo(execution.ended_at.toString(), locale)
      : execution.started_at
        ? formatTimeAgo(execution.started_at.toString(), locale)
        : t("nav2.activity.recently");

    let status = t("nav2.activity.ended");
    switch (execution.status) {
      case AgentExecutionStatus.COMPLETED:
        status = isCompletedWithErrors(execution)
          ? t("nav2.activity.completedWithErrors")
          : t("nav2.activity.completed");
        break;
      case AgentExecutionStatus.FAILED:
        status = t("nav2.activity.failed");
        break;
      case AgentExecutionStatus.TERMINATED:
        status = t("nav2.activity.stopped");
        break;
      case AgentExecutionStatus.INCOMPLETE:
        status = t("nav2.activity.incomplete");
        break;
      case AgentExecutionStatus.REVIEW:
        status = t("nav2.activity.awaitingApproval");
        break;
    }

    return [t("nav2.activity.statusLine", { status, timeAgo })];
  }

  // Determine the tab based on execution status
  const searchParams = new URLSearchParams();
  const isReview = execution.status === AgentExecutionStatus.REVIEW;
  searchParams.set("activeTab", isReview ? "reviews" : "runs");
  searchParams.set("activeItem", execution.id);
  const linkUrl = `/library/agents/${execution.library_agent_id}?${searchParams.toString()}`;
  const withExecutionLink = execution.library_agent_id && execution.id;

  const content = (
    <>
      {/* Icon + Agent Name */}
      <div className="flex items-center space-x-2">
        {getStatusIcon()}
        <Text
          variant="small-medium"
          // TODO(tokens): no exact role for text-gray-900 (#111827)
          className="max-w-44 truncate text-gray-900"
        >
          {execution.agent_name}
        </Text>
      </div>

      {/* Agent Message - Indented */}
      <div className="ml-7 pt-1">
        {getItemDisplay().map((line, index) => (
          <Text
            key={index}
            variant="small"
            className={
              index === 0
                ? "!text-foreground-secondary"
                : "!text-foreground-tertiary"
            }
          >
            {line}
          </Text>
        ))}
      </div>
    </>
  );

  if (withExecutionLink) {
    return (
      <Link
        className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-2 py-3 transition-colors hover:bg-bgLightGrey"
        href={linkUrl}
      >
        <div className="min-w-0 flex-1">{content}</div>
        <ActivityNavIndicator />
      </Link>
    );
  }

  return <div className="block rounded-xl px-2 py-3">{content}</div>;
}
