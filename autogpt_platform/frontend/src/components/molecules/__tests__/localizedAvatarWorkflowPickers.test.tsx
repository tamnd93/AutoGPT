import { render, screen } from "@/tests/integrations/test-utils";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";

vi.mock("../ExpertAvatarPicker/useExpertAvatarPicker", () => ({
  useExpertAvatarPicker: () => ({
    selectedUrl: null,
    isGenerating: false,
    error: null,
    fileInputRef: { current: null },
    isUploading: false,
    isBusy: false,
    openFilePicker: vi.fn(),
    generate: vi.fn(),
    confirm: vi.fn(),
    uploadFile: vi.fn(),
  }),
}));

vi.mock("../InstallWorkflowPicker/useInstallWorkflowPicker", () => ({
  useInstallWorkflowPicker: () => ({
    title: "Cài lên một chuyên gia",
    hiredExperts: [],
    source: "library",
    setSource: vi.fn(),
    searchQuery: "",
    setSearchQuery: vi.fn(),
    libraryResults: [],
    hasMoreLibraryResults: false,
    loadMoreLibraryResults: vi.fn(),
    isLoadingMore: false,
    marketplaceResults: [],
    isSearching: false,
    pendingKey: null,
    installOnExpert: vi.fn(),
    installLibraryAgent: vi.fn(),
    installFromListing: vi.fn(),
  }),
}));

import { ExpertAvatarPicker } from "../ExpertAvatarPicker/ExpertAvatarPicker";
import { InstallWorkflowPicker } from "../InstallWorkflowPicker/InstallWorkflowPicker";
import { ExpertIdentityDetails } from "../ExpertIdentityDetails/ExpertIdentityDetails";

describe("avatar and workflow pickers in Vietnamese", () => {
  it("words the avatar picker actions in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ExpertAvatarPicker name="Maria" category="general" onPick={vi.fn()} />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Tải ảnh lên" }),
    ).toBeDefined();
    expect(screen.getByRole("button", { name: "Tạo lại" })).toBeDefined();
    expect(
      screen.getByRole("button", { name: "Dùng avatar này" }),
    ).toBeDefined();
    expect(screen.getByLabelText("Tải avatar lên")).toBeDefined();
  });

  it("words the install picker's empty state in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <InstallWorkflowPicker
          mode="pick-expert"
          open
          onClose={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByText("Chưa có chuyên gia nào được tuyển.")).toBeDefined();
  });

  it("words the expert identity subtitle in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <ExpertIdentityDetails name="Maria" />
      </LocaleProvider>,
    );

    expect(screen.getByText("Chuyên gia AI")).toBeDefined();
  });
});
