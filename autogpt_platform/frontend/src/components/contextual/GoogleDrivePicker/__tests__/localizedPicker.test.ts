import { describe, expect, it } from "vitest";

import { getCredentialsSchema } from "../helpers";

describe("Google Drive picker copy in Vietnamese", () => {
  it("words the credentials schema in Vietnamese", () => {
    const schema = getCredentialsSchema(["https://scope"], "vi");

    expect(schema.title).toBe("Google Drive");
    expect(schema.description).toBe(
      "Cần OAuth Google để truy cập Google Drive",
    );
    expect(schema.credentials_scopes).toEqual(["https://scope"]);
  });

  it("keeps the schema in English by default", () => {
    expect(getCredentialsSchema([]).description).toBe(
      "Google OAuth needed to access Google Drive",
    );
  });
});
