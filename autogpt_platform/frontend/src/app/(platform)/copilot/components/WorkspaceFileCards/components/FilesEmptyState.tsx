"use client";

import {
  File02Icon,
  Image01Icon,
  Table01Icon,
} from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { PanelEmptyState } from "../../ContextPanel/components/PanelEmptyState/PanelEmptyState";
import { useT } from "@/lib/i18n";

// Only Otto's chats reach this: an expert's chat always lists that expert's
// documents instead.
export function FilesEmptyState() {
  const t = useT();

  return (
    <PanelEmptyState
      tiles={[
        <Icon
          key="image"
          icon={Image01Icon}
          size={22}
          // TODO(tokens): no exact role for text-sky-500
          className="text-sky-500"
        />,
        <Icon
          key="table"
          icon={Table01Icon}
          size={22}
          // TODO(tokens): no exact role for text-emerald-500
          className="text-emerald-500"
        />,
        <Icon
          key="doc"
          icon={File02Icon}
          size={22}
          // TODO(tokens): no exact role for text-violet-500
          className="text-violet-500"
        />,
      ]}
      title={t("chatFiles1.filesEmpty.title")}
      description={t("chatFiles1.filesEmpty.description")}
    />
  );
}
