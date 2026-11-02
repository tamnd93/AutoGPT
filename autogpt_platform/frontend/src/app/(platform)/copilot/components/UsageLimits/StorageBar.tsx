"use client";

import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { formatBytes } from "../usageHelpers";
import { useWorkspaceStorage } from "./useWorkspaceStorage";

export function StorageBar() {
  const t = useT();
  const { data: storage } = useWorkspaceStorage();
  if (!storage || storage.limit_bytes <= 0) return null;

  const { used_bytes, limit_bytes, file_count } = storage;
  const percent = Math.min(100, Math.round((used_bytes / limit_bytes) * 100));
  const isHigh = percent >= 80;
  const percentLabel =
    used_bytes > 0 && percent === 0
      ? t("chatInput3.storage.underOne")
      : t("chatInput3.storage.percentUsed", { percent });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <Text
          // TODO(tokens): no exact role for text-neutral-700
          variant="body-medium"
          className="text-neutral-700"
        >
          {t("chatInput3.storage.title")}
        </Text>
        <Text
          // TODO(tokens): no exact role for text-neutral-500
          variant="body"
          className="tabular-nums text-neutral-500"
        >
          {percentLabel}
        </Text>
      </div>
      <div
        // TODO(tokens): no exact role for bg-neutral-200
        className="h-2 w-full overflow-hidden rounded-full bg-neutral-200"
      >
        <div
          role="progressbar"
          aria-label={t("chatInput3.storage.aria")}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className={`h-full rounded-full transition-[width] duration-300 ease-out ${
            // TODO(tokens): no exact role for bg-orange-500
            isHigh ? "bg-orange-500" : "bg-info"
          }`}
          style={{ width: `${Math.max(used_bytes > 0 ? 1 : 0, percent)}%` }}
        />
      </div>
      <Text
        // TODO(tokens): no exact role for text-neutral-400
        variant="small"
        className="text-neutral-400"
      >
        {t("chatInput3.storage.summary", {
          used: formatBytes(used_bytes),
          limit: formatBytes(limit_bytes),
          files:
            file_count === 1
              ? t("chatInput3.storage.fileOne")
              : t("chatInput3.storage.fileMany", { count: file_count }),
        })}
      </Text>
    </div>
  );
}
