import type { Expert } from "@/app/api/__generated__/models/expert";
import { LocaleProvider } from "@/lib/i18n";
import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";

import { AddSkillDialog } from "../AddSkillDialog";
import { ChainTile } from "../ChainTile";
import { CreateScheduleDialog } from "../CreateScheduleDialog";
import { EditBudgetDialog } from "../EditBudgetDialog/EditBudgetDialog";

const expert = {
  id: "expert-ada",
  name: "Ada",
  weekly_budget: null,
} as unknown as Expert;

function renderAddSkill() {
  render(
    <AddSkillDialog
      open
      source="library"
      onSourceChange={vi.fn()}
      skills={[]}
      isLoading={false}
      marketQuery=""
      onMarketQueryChange={vi.fn()}
      marketplaceSkills={[]}
      isMarketplaceLoading={false}
      isSaving={false}
      onAdd={vi.fn()}
      onAddMarketplace={vi.fn()}
      onClose={vi.fn()}
    />,
  );
}

function renderBudget() {
  render(<EditBudgetDialog expert={expert} open onClose={vi.fn()} />);
}

function renderSchedule() {
  render(
    <CreateScheduleDialog
      expertId="expert-ada"
      workflows={[]}
      open
      onClose={vi.fn()}
    />,
  );
}

describe("AddSkillDialog", () => {
  it("names the dialog, its sources and its empty library", async () => {
    renderAddSkill();

    expect(
      await screen.findByRole("heading", { name: "Add a skill" }),
    ).toBeDefined();
    expect(
      screen.getByText(/Skills are reusable instructions this expert follows/),
    ).toBeDefined();
    expect(screen.getByRole("tab", { name: "Library" })).toBeDefined();
    expect(screen.getByRole("tab", { name: "Marketplace" })).toBeDefined();
    expect(screen.getByPlaceholderText("Search your library")).toBeDefined();
    expect(
      screen.getByText("Every library skill is already on this expert."),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDefined();
  });

  it("reads in Vietnamese", async () => {
    render(
      <LocaleProvider locale="vi">
        <AddSkillDialog
          open
          source="library"
          onSourceChange={vi.fn()}
          skills={[]}
          isLoading={false}
          marketQuery=""
          onMarketQueryChange={vi.fn()}
          marketplaceSkills={[]}
          isMarketplaceLoading={false}
          isSaving={false}
          onAdd={vi.fn()}
          onAddMarketplace={vi.fn()}
          onClose={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Thêm kỹ năng" }),
    ).toBeDefined();
    expect(screen.getByRole("tab", { name: "Thư viện" })).toBeDefined();
    expect(
      screen.getByPlaceholderText("Tìm trong thư viện của bạn"),
    ).toBeDefined();
    expect(
      screen.getByText("Expert này đã có mọi kỹ năng trong thư viện."),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Huỷ" })).toBeDefined();
  });
});

describe("EditBudgetDialog", () => {
  it("names the weekly budget and its hint in English", async () => {
    renderBudget();

    expect(
      await screen.findByRole("heading", { name: "Weekly budget" }),
    ).toBeDefined();
    expect(document.querySelector("input#expert-weekly-budget")).not.toBeNull();
    expect(screen.getByPlaceholderText("e.g. 25")).toBeDefined();
    expect(
      screen.getByText(/What Ada may spend each week, in dollars/),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Save budget" })).toBeDefined();
  });

  it("reads the budget dialog in Vietnamese", async () => {
    render(
      <LocaleProvider locale="vi">
        <EditBudgetDialog expert={expert} open onClose={vi.fn()} />
      </LocaleProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Ngân sách tuần" }),
    ).toBeDefined();
    expect(screen.getByPlaceholderText("ví dụ: 25")).toBeDefined();
    expect(screen.getByText(/Số tiền Ada được chi mỗi tuần/)).toBeDefined();
    expect(screen.getByRole("button", { name: "Lưu ngân sách" })).toBeDefined();
  });
});

describe("CreateScheduleDialog", () => {
  it("tells an expert with no installed workflow what to do first", async () => {
    renderSchedule();

    expect(
      await screen.findByRole("heading", { name: "Create schedule" }),
    ).toBeDefined();
    expect(
      screen.getByText("Install a workflow first, then schedule it here."),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeDefined();
  });

  it("reads in Vietnamese", async () => {
    render(
      <LocaleProvider locale="vi">
        <CreateScheduleDialog
          expertId="expert-ada"
          workflows={[]}
          open
          onClose={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(
      await screen.findByRole("heading", { name: "Tạo lịch chạy" }),
    ).toBeDefined();
    expect(
      screen.getByText("Hãy cài một workflow trước, rồi đặt lịch tại đây."),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Huỷ" })).toBeDefined();
  });
});

describe("ChainTile", () => {
  it("labels its kind in English", () => {
    render(
      <ChainTile
        item={{ kind: "ai" } as React.ComponentProps<typeof ChainTile>["item"]}
        size="md"
      />,
    );

    expect(screen.getByRole("img", { name: "AI model" })).toBeDefined();
  });

  it("labels its kind in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ChainTile
          item={
            { kind: "ai" } as React.ComponentProps<typeof ChainTile>["item"]
          }
          size="md"
        />
      </LocaleProvider>,
    );

    expect(screen.getByRole("img", { name: "Mô hình AI" })).toBeDefined();
  });
});
