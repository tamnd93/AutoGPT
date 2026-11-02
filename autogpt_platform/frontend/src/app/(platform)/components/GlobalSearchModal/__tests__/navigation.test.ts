import { describe, expect, it } from "vitest";
import { buildNavigationBucket } from "../navigation";

function navIDs(query: string) {
  return (
    buildNavigationBucket(query, null).bucket?.items.map((item) => item.id) ??
    []
  );
}

describe("buildNavigationBucket", () => {
  it.each(["workflows", "my workflows", "agents", "my agents"])(
    "finds the Library when searching %s",
    (query) => {
      expect(navIDs(query)).toContain("nav:library");
    },
  );

  it("shows the destinations in Vietnamese while English searches still match", () => {
    const bucket = buildNavigationBucket("builder", null, true, "vi").bucket;
    const builder = bucket?.items.find((item) => item.id === "nav:builder");

    expect(bucket?.label).toBe("Điều hướng");
    expect(builder?.title).toBe("Trình tạo workflow");
    expect(navIDs("builder")).toContain("nav:builder");
  });
});
