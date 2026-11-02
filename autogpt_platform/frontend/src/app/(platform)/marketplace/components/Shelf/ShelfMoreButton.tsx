import { Button } from "@/components/atoms/Button/Button";
import { useT } from "@/lib/i18n";

interface Props {
  isExpanded: boolean;
  /** How many tiles the button reveals. */
  count: number;
  /** False when the page cap keeps `count` short of the whole catalogue, so
   *  the label stops promising "all" — the header link covers the rest. */
  isAll?: boolean;
  /** Plural noun for the label, e.g. "workflows". */
  noun: string;
  onToggle: () => void;
}

export function ShelfMoreButton({
  isExpanded,
  count,
  isAll = true,
  noun,
  onToggle,
}: Props) {
  const t = useT();

  return (
    <Button size="small" aria-expanded={isExpanded} onClick={onToggle}>
      {isExpanded
        ? t("marketplace2.shelf.showFewer")
        : isAll
          ? t("marketplace2.shelf.loadAll", {
              count: count.toLocaleString(),
              noun,
            })
          : t("marketplace2.shelf.loadCount", {
              count: count.toLocaleString(),
              noun,
            })}
    </Button>
  );
}
