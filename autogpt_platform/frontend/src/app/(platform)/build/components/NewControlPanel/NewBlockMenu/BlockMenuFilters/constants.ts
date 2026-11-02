import type { MessageKey } from "@/lib/i18n/messages/en";
import { CategoryKey } from "./types";

export const categories: Array<{ key: CategoryKey; nameKey: MessageKey }> = [
  { key: "blocks", nameKey: "build3.filters.categoryBlocks" },
  {
    key: "integrations",
    nameKey: "build3.filters.categoryIntegrations",
  },
  {
    key: "marketplace_agents",
    nameKey: "build3.filters.categoryMarketplace",
  },
  { key: "my_agents", nameKey: "build3.filters.categoryMine" },
];
