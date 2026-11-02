import { Text } from "@/components/atoms/Text/Text";
import { useT } from "@/lib/i18n";
import { blockMenuContainerStyle } from "../style";
import { BlockMenuFilters } from "../BlockMenuFilters/BlockMenuFilters";
import { BlockMenuSearchContent } from "../BlockMenuSearchContent/BlockMenuSearchContent";

export const BlockMenuSearch = () => {
  const t = useT();
  return (
    <div
      className={blockMenuContainerStyle}
      data-id="blocks-control-search-results"
    >
      <BlockMenuFilters />
      <Text variant="body-medium">{t("build3.blockMenu.searchResults")}</Text>
      <BlockMenuSearchContent />
    </div>
  );
};
