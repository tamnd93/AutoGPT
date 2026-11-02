import { Icon } from "@/components/atoms/Icon/Icon";
import { Table01Icon } from "@hugeicons/core-free-icons";
import { useT } from "@/lib/i18n";
import type { MessageKey } from "@/lib/i18n/messages/en";
import type { PreviewTable } from "../../helpers";

interface Props {
  tables: PreviewTable[];
}

/** What a step will add to the user's connected account, in the names they
 *  will see there, so approving never means reading raw JSON. */
export function ChangePreview({ tables }: Props) {
  const shown = tables.filter((table) => table.name || table.fields.length);
  if (shown.length === 0) return null;
  return (
    <div className="flex flex-col gap-2">
      {shown.map((table, index) => (
        <TablePreview key={`${table.name}-${index}`} table={table} />
      ))}
    </div>
  );
}

function TablePreview({ table }: { table: PreviewTable }) {
  const t = useT();
  const label = table.name
    ? t("chatTools1.preview.fieldsIn", { name: table.name })
    : t("chatTools1.preview.newFields");
  return (
    <section className="overflow-hidden rounded-xl border border-border-base">
      {table.name && (
        <header className="flex flex-col gap-0.5 bg-surface-muted px-3 py-2 text-sm">
          <div className="flex min-w-0 items-center gap-2">
            <Icon
              icon={Table01Icon}
              size={16}
              className="shrink-0 text-foreground-tertiary"
            />
            <span
              translate="no"
              className="min-w-0 font-medium text-foreground-strong [overflow-wrap:anywhere]"
            >
              {table.name}
            </span>
            <span className="ms-auto shrink-0 text-foreground-tertiary">
              {t(fieldCountKey(table.fields.length), {
                count: table.fields.length,
              })}
            </span>
          </div>
          {table.description && (
            <p className="ps-6 text-foreground-tertiary [overflow-wrap:anywhere]">
              {table.description}
            </p>
          )}
        </header>
      )}
      {table.fields.length > 0 && (
        <ul aria-label={label} className="divide-y divide-border-base">
          {table.fields.map((field, index) => (
            <li
              key={`${field.name}-${index}`}
              className="flex min-w-0 items-baseline justify-between gap-3 px-3 py-1.5 text-sm"
            >
              <span className="flex min-w-0 flex-col">
                <span
                  translate="no"
                  className="text-foreground-strong [overflow-wrap:anywhere]"
                >
                  {field.name}
                </span>
                {field.detail && (
                  <span className="text-xs text-foreground-tertiary [overflow-wrap:anywhere]">
                    {field.detail}
                  </span>
                )}
              </span>
              <span className="max-w-[55%] text-end text-foreground-tertiary [overflow-wrap:anywhere]">
                {field.kind}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function fieldCountKey(count: number): MessageKey {
  return count === 1
    ? "chatTools1.preview.fieldOne"
    : "chatTools1.preview.fieldMany";
}
