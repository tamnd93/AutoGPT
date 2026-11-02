import { describe, expect, test } from "vitest";

import { en } from "../messages/en";
import { vi } from "../messages/vi";
import { getMessage } from "../translate";

type Catalogue = Record<string, string>;

type GlobImport = <T>(
  pattern: string,
  options: { eager: true },
) => Record<string, T>;

const shardModules = (import.meta as ImportMeta & { glob: GlobImport }).glob<
  Record<string, Catalogue>
>("../messages/*.en.ts", { eager: true });

function shardCatalogues(): Array<{ file: string; keys: string[] }> {
  return Object.entries(shardModules).map(([file, module]) => {
    // A shard exports its catalogue as <name>En (camelCase or PascalCase).
    const catalogues = Object.entries(module).filter(
      ([exportName, value]) => /En$/.test(exportName) && isCatalogue(value),
    );
    return {
      file,
      keys: catalogues.flatMap(([, value]) => Object.keys(value as Catalogue)),
    };
  });
}

function isCatalogue(value: unknown): value is Catalogue {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every((entry) => typeof entry === "string")
  );
}

function placeholders(message: string): string[] {
  return [...message.matchAll(/\{(\w+)\}/g)].map((match) => match[1]).sort();
}

// Documented, deliberate catalogue exceptions.
// - Whose Vietnamese value is only a separator, not prose.
const SEPARATOR_ONLY_KEYS = new Set(["home1.greeting.nameJoin"]);
// - Whose English placeholder has no Vietnamese equivalent (the article is
//   English grammar; the Vietnamese sentence drops it). Missing placeholders
//   are fine as long as no EXTRA placeholder appears in the translation.
const PLACEHOLDER_EXCEPTIONS: Record<string, string[]> = {
  "connectServices2.signInFallback.token": ["article"],
};

function fail(title: string, entries: string[], limit = 400): void {
  if (entries.length === 0) return;
  throw new Error(report(title, entries, limit));
}

function report(title: string, entries: string[], limit = 400): string {
  if (entries.length === 0) return "";
  const shown = entries.slice(0, limit).join("\n  ");
  const more =
    entries.length > limit
      ? `\n  … and ${entries.length - limit} more (total ${entries.length})`
      : "";
  return `${title}\n  ${shown}${more}`;
}

const enKeys = Object.keys(en);
const viCatalogue = vi as Record<string, string | undefined>;

describe("i18n catalogue", () => {
  test("every English key has a non-empty Vietnamese message", () => {
    const missing = enKeys.filter((key) => {
      if (SEPARATOR_ONLY_KEYS.has(key)) return false;
      const translated = viCatalogue[key];
      return typeof translated !== "string" || translated.trim().length === 0;
    });

    fail("Keys with no Vietnamese translation:", missing);
    expect(missing).toEqual([]);
  });

  test("no flat key is declared by two shards", () => {
    // Guard the glob: an empty shard list would make this test pass vacuously.
    expect(shardCatalogues().length).toBeGreaterThan(30);
    const owners = new Map<string, Set<string>>();
    for (const { file, keys } of shardCatalogues()) {
      for (const key of keys) {
        const files = owners.get(key) ?? new Set<string>();
        files.add(file);
        owners.set(key, files);
      }
    }
    const duplicates = [...owners.entries()]
      .filter(([, files]) => files.size > 1)
      .map(([key, files]) => `${key} — ${[...files].join(", ")}`);

    fail("Keys declared by more than one shard:", duplicates);
    expect(duplicates).toEqual([]);
  });

  test("Vietnamese keeps the same interpolation placeholders as English", () => {
    const mismatched = enKeys.flatMap((key) => {
      const translated = viCatalogue[key];
      if (typeof translated !== "string" || !translated.trim()) return [];
      const english = placeholders(en[key as keyof typeof en] as string);
      const vietnamese = placeholders(translated);
      const allowed = PLACEHOLDER_EXCEPTIONS[key] ?? [];
      const expectedEnglish = english.filter((name) => !allowed.includes(name));
      const same =
        expectedEnglish.length === vietnamese.length &&
        expectedEnglish.every((name, index) => name === vietnamese[index]);
      return same
        ? []
        : [
            `${key} — en: {${english.join("}, {")}} · vi: {${vietnamese.join("}, {")}}`,
          ];
    });

    fail("Placeholder mismatches:", mismatched);
    expect(mismatched).toEqual([]);
  });

  test("getMessage falls back to the key itself when the key is unknown", () => {
    expect(getMessage("en", "missing.unknown.key")).toBe("missing.unknown.key");
    expect(getMessage("vi", "missing.unknown.key")).toBe("missing.unknown.key");
  });

  test("getMessage returns Vietnamese when present and English when it is not", () => {
    const translatedKey = enKeys.find(
      (key) => (viCatalogue[key] ?? "").trim().length > 0,
    );
    expect(translatedKey).toBeDefined();
    if (translatedKey) {
      expect(getMessage("vi", translatedKey)).toBe(viCatalogue[translatedKey]);
    }

    const untranslatedKey = enKeys.find((key) => !(key in viCatalogue));
    if (untranslatedKey) {
      expect(getMessage("vi", untranslatedKey)).toBe(
        en[untranslatedKey as keyof typeof en],
      );
    }
  });
});
