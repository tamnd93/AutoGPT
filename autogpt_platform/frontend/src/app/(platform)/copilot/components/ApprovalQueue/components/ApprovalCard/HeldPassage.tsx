import { useT } from "@/lib/i18n";

interface Props {
  passage: string;
}

export function HeldPassage({ passage }: Props) {
  const t = useT();

  return (
    <figure className="flex flex-col gap-1">
      <figcaption className="text-xs text-foreground-tertiary">
        {t("chatTools1.passage.caption")}
      </figcaption>
      <blockquote
        // TODO(tokens): no exact role for border-amber-400
        className="whitespace-pre-wrap border-l-2 border-amber-400 bg-warning-surface/60 px-3 py-2 text-sm text-foreground-emphasis [overflow-wrap:anywhere]"
      >
        {passage}
      </blockquote>
    </figure>
  );
}
