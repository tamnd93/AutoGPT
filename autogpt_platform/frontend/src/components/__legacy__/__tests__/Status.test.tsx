import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, test } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { SubmissionStatus } from "@/app/api/__generated__/models/submissionStatus";
import { Status } from "../Status";

describe("Status", () => {
  test("labels the states in english", () => {
    render(<Status status={SubmissionStatus.DRAFT} />);
    expect(screen.getByText("Draft")).toBeDefined();
  });

  test("labels the states in vietnamese with a provider", () => {
    render(
      <LocaleProvider locale="vi">
        <Status status={SubmissionStatus.PENDING} />
      </LocaleProvider>,
    );
    expect(screen.getByText("Chờ duyệt")).toBeDefined();
  });
});
