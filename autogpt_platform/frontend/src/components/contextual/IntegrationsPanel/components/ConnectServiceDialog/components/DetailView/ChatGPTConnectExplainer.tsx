"use client";

import {
  ArrowDataTransferHorizontalIcon,
  ShieldKeyIcon,
  SparklesIcon,
  Target02Icon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

import { useGetV2ListProviderModelTiers } from "@/app/api/__generated__/endpoints/chat/chat";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Text } from "@/components/atoms/Text/Text";

import { chatgptModelsSentence } from "./helpers";
import { useT } from "@/lib/i18n";

interface Point {
  icon: IconSvgElement;
  title: string;
  body: string;
  withModels?: (models: string) => string;
}

/**
 * Linking a ChatGPT plan changes who pays for a run, so the four questions
 * that implies get answered on screen before the OAuth window opens rather
 * than after the user has committed.
 *
 * Says nothing about pausing and resuming a run at a provider limit, because
 * same-chat recovery is not built yet.
 *
 * It does name the models, from the catalog rather than from a literal here.
 * The connections list cannot answer that at this point -- the user has not
 * made this connection, so it is absent from their offers -- which is what
 * the provider-tiers endpoint exists for.
 */
function getPoints(t: ReturnType<typeof useT>): Point[] {
  return [
    {
      icon: ArrowDataTransferHorizontalIcon,
      title: t("connectServices1.gpt.what"),
      body: t("connectServices1.gpt.whatBody"),
    },
    {
      icon: Target02Icon,
      title: t("connectServices1.gpt.cost"),
      body: t("connectServices1.gpt.costBody"),
    },
    {
      icon: SparklesIcon,
      title: t("connectServices1.gpt.get"),
      body: t("connectServices1.gpt.getBody"),
      /** Replaced with the named models when the catalog can supply them. */
      withModels: (models: string) =>
        t("connectServices1.gpt.getBodyModels", { models }),
    },
    {
      icon: ShieldKeyIcon,
      title: t("connectServices1.gpt.control"),
      body: t("connectServices1.gpt.controlBody"),
    },
  ];
}

export function ChatGPTConnectExplainer() {
  const t = useT();
  const points = getPoints(t);
  const { data } = useGetV2ListProviderModelTiers({
    query: { refetchOnWindowFocus: false },
  });
  const models =
    data?.status === 200 ? chatgptModelsSentence(data.data.providers) : "";

  return (
    <div
      // TODO(tokens): no exact role for bg-[#FBFBFC]
      className="divide-y divide-border-base rounded-2xl border border-border-base bg-[#FBFBFC]"
    >
      {points.map((point) => (
        <div key={point.title} className="flex items-start gap-3 p-4">
          <span
            aria-hidden
            // TODO(tokens): no exact role for bg-[#F1EBFF], text-[#7444E5]
            className="mt-[2px] flex h-6 w-6 flex-none items-center justify-center rounded-lg bg-[#F1EBFF] text-[#7444E5]"
          >
            <Icon icon={point.icon} size={14} />
          </span>
          <Text variant="small" className="text-foreground-body">
            <span className="font-medium text-foreground-base">
              {point.title}
            </span>{" "}
            {models && point.withModels ? point.withModels(models) : point.body}
          </Text>
        </div>
      ))}
    </div>
  );
}
