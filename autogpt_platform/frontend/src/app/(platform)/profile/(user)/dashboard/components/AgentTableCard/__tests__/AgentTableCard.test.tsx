import { describe, expect, test } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { fireEvent, render, screen } from "@/tests/integrations/test-utils";

import { AgentTableCard } from "../AgentTableCard";
import type { StoreSubmission } from "@/app/api/__generated__/models/storeSubmission";
import { SubmissionStatus } from "@/app/api/__generated__/models/submissionStatus";

const SUBMISSION = {
  listing_id: "l1",
  user_id: "u1",
  slug: "digest",
  listing_version_id: "lv1",
  listing_version: 1,
  graph_id: "g1",
  graph_version: 2,
  name: "Daily digest",
  sub_heading: "A short summary",
  description: "Longer description",
  instructions: null,
  categories: [],
  image_urls: ["https://cdn.test/agent.png"],
  video_url: null,
  agent_output_demo_url: null,
  submitted_at: new Date("2026-01-01T00:00:00Z"),
  changes_summary: null,
  status: SubmissionStatus.APPROVED,
} as unknown as StoreSubmission;

describe("AgentTableCard", () => {
  test("reads its run count in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <AgentTableCard
          storeAgentSubmission={{ ...SUBMISSION, run_count: 12 }}
          onViewSubmission={() => {}}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("12 lượt chạy")).toBeDefined();
  });

  test("renders the submission image while the URL loads", () => {
    render(
      <AgentTableCard
        storeAgentSubmission={SUBMISSION}
        onViewSubmission={() => {}}
      />,
    );
    expect(screen.getByAltText("Daily digest")).toBeDefined();
  });

  test("falls back to a placeholder when the image URL is dead", () => {
    const { container } = render(
      <AgentTableCard
        storeAgentSubmission={SUBMISSION}
        onViewSubmission={() => {}}
      />,
    );

    fireEvent.error(screen.getByAltText("Daily digest"));

    expect(screen.queryByAltText("Daily digest")).toBeNull();
    expect(container.querySelector("svg")).not.toBeNull();
  });
});
