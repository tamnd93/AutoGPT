import type { WorkspaceFileItem } from "@/app/api/__generated__/models/workspaceFileItem";
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export type SelectionModifiers = { shift?: boolean; meta?: boolean };

export interface Selection {
  selected: ReadonlyMap<string, WorkspaceFileItem>;
  /** Id of the last plainly clicked file. An id, not an index, because a
   *  refetch can reorder the list under it. */
  anchor: string | null;
}

/**
 * Applies one click to the selection, following the range conventions people
 * already expect from a file manager: plain click toggles and re-anchors,
 * Shift extends from the anchor, Ctrl/Cmd toggles without moving it.
 */
export function applySelection(
  current: Selection,
  files: WorkspaceFileItem[],
  index: number,
  modifiers: SelectionModifiers = {},
): Selection {
  const file = files[index];
  if (!file) return current;

  // Shift with no anchor in the list has nothing to extend from, so it
  // behaves as the plain click that establishes one.
  const anchorIndex = files.findIndex((f) => f.id === current.anchor);
  if (modifiers.shift && anchorIndex !== -1) {
    return {
      selected: addRange(current.selected, files, anchorIndex, index),
      anchor: current.anchor,
    };
  }
  const selected = toggleOne(current.selected, file);
  return { selected, anchor: modifiers.meta ? current.anchor : file.id };
}

/**
 * Selection order is insertion order, which for a backwards range is the
 * order clicked rather than the order shown. Sort by the list so the chips —
 * and, at the cap, the files that survive it — match what the user saw.
 * Anything no longer in `files` (paged off, or filtered out) keeps its place
 * at the end.
 */
export function orderByList(
  selected: ReadonlyMap<string, WorkspaceFileItem>,
  files: WorkspaceFileItem[],
): WorkspaceFileItem[] {
  const listed: WorkspaceFileItem[] = [];
  const unlisted = new Map(selected);
  for (const file of files) {
    if (unlisted.delete(file.id)) listed.push(file);
  }
  return [...listed, ...unlisted.values()];
}

/** A range only ever adds, so dragging back over chosen files cannot clear
 *  them — the union is what makes repeated ranges additive. */
function addRange(
  selected: ReadonlyMap<string, WorkspaceFileItem>,
  files: WorkspaceFileItem[],
  anchor: number,
  index: number,
): Map<string, WorkspaceFileItem> {
  const next = new Map(selected);
  const from = Math.min(anchor, index);
  const to = Math.max(anchor, index);
  for (const file of files.slice(from, to + 1)) {
    next.set(file.id, file);
  }
  return next;
}

function toggleOne(
  selected: ReadonlyMap<string, WorkspaceFileItem>,
  file: WorkspaceFileItem,
): Map<string, WorkspaceFileItem> {
  const next = new Map(selected);
  if (next.has(file.id)) {
    next.delete(file.id);
  } else {
    next.set(file.id, file);
  }
  return next;
}

export function addLabel(
  files: number,
  folders: number,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const parts: string[] = [];
  if (files > 0) {
    parts.push(
      getMessage(
        locale,
        files === 1
          ? "chatInput2.workspacePicker.fileOne"
          : "chatInput2.workspacePicker.fileMany",
        { count: files },
      ),
    );
  }
  if (folders > 0) {
    parts.push(
      getMessage(
        locale,
        folders === 1
          ? "chatInput2.workspacePicker.folderOne"
          : "chatInput2.workspacePicker.folderMany",
        { count: folders },
      ),
    );
  }
  if (parts.length === 0)
    return getMessage(locale, "chatInput2.workspacePicker.add");
  const items =
    parts.length === 1
      ? parts[0]
      : getMessage(locale, "chatInput2.workspacePicker.addJoin", {
          first: parts[0],
          second: parts[1],
        });
  return getMessage(locale, "chatInput2.workspacePicker.addPrefix", { items });
}

export interface EmptyMessageOptions {
  isExpertOnly?: boolean;
  who?: string;
  isSearching?: boolean;
  isInFolder?: boolean;
  hasFolderRows?: boolean;
}

export function emptyMessage(
  opts: EmptyMessageOptions,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const copy = (key: string, values?: Record<string, string | number>) =>
    getMessage(locale, key, values);
  if (opts.isExpertOnly) {
    return opts.isSearching
      ? copy("chatInput2.workspacePicker.emptyExpertSearch", {
          who: opts.who ?? "",
        })
      : copy("chatInput2.workspacePicker.emptyExpert", { who: opts.who ?? "" });
  }
  if (opts.isSearching) return copy("chatInput2.workspacePicker.emptySearch");
  if (opts.isInFolder)
    return opts.hasFolderRows
      ? copy("chatInput2.workspacePicker.emptyFolderFiles")
      : copy("chatInput2.workspacePicker.emptyFolder");
  return copy("chatInput2.workspacePicker.emptyWorkspace");
}
