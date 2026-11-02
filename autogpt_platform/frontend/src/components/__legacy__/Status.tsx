import { SubmissionStatus } from "@/app/api/__generated__/models/submissionStatus";
import { useT, type MessageKey } from "@/lib/i18n";
import * as React from "react";

interface StatusProps {
  status: SubmissionStatus;
}

const statusConfig: Record<
  SubmissionStatus,
  {
    bgColor: string;
    dotColor: string;
    textKey: MessageKey;
    darkBgColor: string;
    darkDotColor: string;
  }
> = {
  [SubmissionStatus.DRAFT]: {
    bgColor: "bg-blue-50",
    dotColor: "bg-blue-500",
    textKey: "shared1.status.draft",
    darkBgColor: "dark:bg-blue-900",
    darkDotColor: "dark:bg-blue-300",
  },
  [SubmissionStatus.PENDING]: {
    bgColor: "bg-amber-50",
    dotColor: "bg-amber-500",
    textKey: "shared1.status.pending",
    darkBgColor: "dark:bg-amber-900",
    darkDotColor: "dark:bg-amber-300",
  },
  [SubmissionStatus.APPROVED]: {
    bgColor: "bg-green-50",
    dotColor: "bg-green-500",
    textKey: "shared1.status.approved",
    darkBgColor: "dark:bg-green-900",
    darkDotColor: "dark:bg-green-300",
  },
  [SubmissionStatus.REJECTED]: {
    bgColor: "bg-red-50",
    dotColor: "bg-red-500",
    textKey: "shared1.status.rejected",
    darkBgColor: "dark:bg-red-900",
    darkDotColor: "dark:bg-red-300",
  },
};

export const Status: React.FC<StatusProps> = ({ status }) => {
  const t = useT();
  /**
   * Status component displays a badge with a colored dot and text indicating the agent's status
   * @param status - The current status of the agent
   *                 Valid values: 'draft', 'awaiting_review', 'approved', 'rejected'
   */
  if (!status) {
    return <Status status={SubmissionStatus.PENDING} />;
  } else if (!statusConfig[status]) {
    return <Status status={SubmissionStatus.PENDING} />;
  }

  const config = statusConfig[status];

  return (
    <div
      className={`px-2.5 py-1 ${config.bgColor} ${config.darkBgColor} flex items-center gap-1.5 rounded-[26px]`}
    >
      <div
        className={`h-3 w-3 ${config.dotColor} ${config.darkDotColor} rounded-full`}
      />
      <div className="font-sans text-sm font-normal leading-tight text-neutral-600 dark:text-neutral-300">
        {t(config.textKey)}
      </div>
    </div>
  );
};
