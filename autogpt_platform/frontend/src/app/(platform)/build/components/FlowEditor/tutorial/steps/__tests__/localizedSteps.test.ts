import { describe, expect, it } from "vitest";
import type { StepOptions } from "shepherd.js";
import { createTutorialSteps } from "../index";
import { createBlockBasicsSteps } from "../block-basics";
import { createBlockMenuSteps } from "../block-menu";
import { createCompletionSteps } from "../completion";
import { createConfigureCalculatorSteps } from "../configure-calculator";
import { createConnectionSteps } from "../connections";
import { createRunSteps } from "../run";
import { createSaveSteps } from "../save";
import { createSecondCalculatorSteps } from "../second-calculator";
import { createWelcomeSteps } from "../welcome";

const tour = {
  next: () => {},
  back: () => {},
  show: () => {},
  getCurrentStep: () => ({}),
} as never;

function stepOf(steps: StepOptions[], id: string) {
  const step = steps.find((candidate) => candidate.id === id);
  if (!step) throw new Error(`step "${id}" not found`);
  return step as {
    id: string;
    title?: string;
    text?: string;
    buttons?: { text?: string }[];
  };
}

describe("tutorial steps keep their English copy", () => {
  it("builds the same English titles when no locale is given", () => {
    expect(stepOf(createBlockMenuSteps(tour), "open-block-menu").title).toBe(
      "Open the Block Menu",
    );
    expect(stepOf(createBlockBasicsSteps(tour), "focus-new-block").title).toBe(
      "Your First Block!",
    );
    expect(
      stepOf(createConfigureCalculatorSteps(tour), "enter-values").title,
    ).toBe("Enter Values");
    expect(
      stepOf(createConnectionSteps(tour), "connect-blocks-output").title,
    ).toBe("Connect the Blocks: Output");
    expect(stepOf(createRunSteps(tour), "press-run").title).toBe(
      "Run Your Workflow",
    );
    expect(stepOf(createCompletionSteps(tour), "congratulations").title).toBe(
      "Congratulations! 🎉",
    );
  });
});

describe("tutorial steps in Vietnamese", () => {
  it("words the welcome step in Vietnamese", () => {
    const step = stepOf(createWelcomeSteps(tour, "vi"), "welcome");

    expect(step.title).toBe("Chào mừng tới AutoGPT Builder! 👋🏻");
    expect(step.text).toContain(
      "Hướng dẫn tương tác này sẽ dạy bạn cách dựng workflow AI đầu tiên.",
    );
    expect(step.text).toContain("- Thêm khối vào workflow");
    expect(step.text).toContain("Thời gian ước tính: 3-4 phút");
    expect(step.buttons?.[0]?.text).toBe("Bỏ qua hướng dẫn");
    expect(step.buttons?.[1]?.text).toBe("Bắt đầu");
  });

  it("words the save steps in Vietnamese", () => {
    const steps = createSaveSteps("vi");

    const open = stepOf(steps, "open-save");
    expect(open.title).toBe("Lưu workflow của bạn");
    expect(open.text).toContain(
      "Trước khi chạy, chúng ta cần <strong>lưu</strong> workflow",
    );
    expect(open.text).toContain("Bấm nút Save");

    const details = stepOf(steps, "save-details");
    expect(details.title).toBe("Đặt tên cho workflow");
    expect(details.text).toContain('Nhập tên rồi bấm "Save Workflow"');
    expect(details.text).toContain('Ví dụ: "Workflow máy tính của tôi"');
  });

  it("words the second-calculator steps in Vietnamese", () => {
    const steps = createSecondCalculatorSteps(tour, "vi");

    const adding = stepOf(steps, "adding-second-calculator");
    expect(adding.title).toBe("Thêm Calculator thứ hai");
    expect(adding.text).toContain("Chúng ta sẽ tạo một chuỗi:");
    expect(adding.buttons?.[1]?.text).toBe("Thêm Calculator thứ hai");

    const added = stepOf(steps, "second-calculator-added");
    expect(added.title).toBe("Đã thêm Calculator thứ hai! ✅");
    expect(added.buttons?.[0]?.text).toBe("Cấu hình khối này");

    const configure = stepOf(steps, "configure-second-calculator");
    expect(configure.title).toBe("Cấu hình Calculator thứ hai");
    expect(configure.text).toContain("Bắt buộc để tiếp tục:");
    expect(configure.text).toContain(
      "Nhập một số vào trường <strong>B</strong> (ví dụ: 2)",
    );
    expect(configure.text).toContain(
      "trường A sẽ được nối từ đầu ra của Calculator thứ nhất",
    );
    expect(configure.buttons?.[1]?.text).toBe("Tiếp tục");
  });

  it("words the block menu steps in Vietnamese", () => {
    const steps = createBlockMenuSteps(tour, "vi");

    const open = stepOf(steps, "open-block-menu");
    expect(open.title).toBe("Mở bảng chọn khối");
    expect(open.text).toContain("Hãy bắt đầu bằng việc mở bảng chọn khối.");
    expect(open.text).toContain("Bấm nút này để mở bảng chọn");

    const overview = stepOf(steps, "block-menu-overview");
    expect(overview.text).toContain("hộp công cụ để dựng workflow");
    expect(overview.text).toContain("<strong>Khối đầu vào</strong>");

    expect(overview.buttons?.[0]?.text).toBe("Tiếp");

    const search = stepOf(steps, "search-calculator");
    expect(search.text).toContain("Hãy thêm một khối Calculator để bắt đầu.");

    const add = stepOf(steps, "select-calculator");
    expect(add.text).toContain("Bấm vào khối Calculator để thêm");
    expect(add.text).toContain("Bạn cũng có thể kéo khối thả lên canvas");
  });

  it("words the block basics steps in Vietnamese", () => {
    const steps = createBlockBasicsSteps(tour, "vi");

    const first = stepOf(steps, "focus-new-block");
    expect(first.title).toBe("Khối đầu tiên của bạn!");
    expect(first.text).toContain(
      "Đây là <strong>khối Calculator</strong> của bạn.",
    );
    expect(first.buttons?.[0]?.text).toBe("Cho tôi xem");

    const input = stepOf(steps, "input-handles");
    expect(input.title).toBe("Điểm nối đầu vào");
    expect(input.text).toContain("<strong>điểm nối đầu vào</strong>");

    const output = stepOf(steps, "output-handles");
    expect(output.title).toBe("Điểm nối đầu ra");
    expect(output.text).toContain(
      "Bạn có thể kéo từ điểm nối đầu ra sang điểm nối đầu vào để nối các khối",
    );
  });

  it("words the configure-calculator step in Vietnamese", () => {
    const step = stepOf(
      createConfigureCalculatorSteps(tour, "vi"),
      "enter-values",
    );

    expect(step.title).toBe("Nhập giá trị");
    expect(step.text).toContain("Bắt buộc để tiếp tục:");
    expect(step.text).toContain("Nhập một số vào trường <strong>A</strong>");
    expect(step.text).toContain("Chọn một <strong>Operation</strong>");
    expect(step.text).toContain("Điền tất cả các trường bắt buộc ở trên");
    expect(step.buttons?.[0]?.text).toBe("Quay lại");
    expect(step.buttons?.[1]?.text).toBe("Tiếp tục");
  });

  it("words the connection steps in Vietnamese", () => {
    const steps = createConnectionSteps(tour, "vi");

    const output = stepOf(steps, "connect-blocks-output");
    expect(output.title).toBe("Nối các khối: Đầu ra");
    expect(output.text).toContain("Đang chờ kết nối...");
    expect(output.text).toContain("Kéo từ điểm nối đầu ra Result");
    expect(output.buttons?.[1]?.text).toBe("Bỏ qua (đã kết nối)");

    const input = stepOf(steps, "connect-blocks-input");
    expect(input.title).toBe("Nối các khối: Đầu vào");
    expect(input.text).toContain("Thả vào đầu vào A:");

    const complete = stepOf(steps, "connection-complete");
    expect(complete.title).toBe("Đã nối xong các khối! 🎉");
    expect(complete.text).toContain(
      "Kết quả của Calculator 1 chảy vào đầu vào A của Calculator 2",
    );
    expect(complete.buttons?.[0]?.text).toBe("Lưu workflow của tôi");
  });

  it("words the run steps in Vietnamese", () => {
    const steps = createRunSteps(tour, "vi");

    const press = stepOf(steps, "press-run");
    expect(press.title).toBe("Chạy workflow của bạn");
    expect(press.text).toContain("<strong>chạy nó</strong>");
    expect(press.text).toContain("Bấm nút Run");

    const output = stepOf(steps, "show-output");
    expect(output.title).toBe("Xem kết quả");
    expect(output.text).toContain("Kết quả mới nhất:");
    expect(output.buttons?.[0]?.text).toBe("Kết thúc hướng dẫn");
  });

  it("words the completion step in Vietnamese", () => {
    const step = stepOf(createCompletionSteps(tour, "vi"), "congratulations");

    expect(step.title).toBe("Chúc mừng! 🎉");
    expect(step.text).toContain("workflow đầu tiên");
    expect(step.text).toContain("• Nối các khối với nhau");
    expect(step.buttons?.[0]?.text).toBe("Bắt đầu lại hướng dẫn");
    expect(step.buttons?.[1]?.text).toBe("Hoàn tất");
  });

  it("threads the locale through the tutorial tour", () => {
    const steps = createTutorialSteps(tour, "vi");

    expect(stepOf(steps, "open-block-menu").title).toBe("Mở bảng chọn khối");
    expect(stepOf(steps, "focus-new-block").title).toBe(
      "Khối đầu tiên của bạn!",
    );
    expect(stepOf(steps, "enter-values").title).toBe("Nhập giá trị");
    expect(stepOf(steps, "connect-blocks-output").title).toBe(
      "Nối các khối: Đầu ra",
    );
    expect(stepOf(steps, "press-run").title).toBe("Chạy workflow của bạn");
    expect(stepOf(steps, "congratulations").title).toBe("Chúc mừng! 🎉");
    expect(stepOf(steps, "welcome").title).toBe(
      "Chào mừng tới AutoGPT Builder! 👋🏻",
    );
    expect(stepOf(steps, "open-save").title).toBe("Lưu workflow của bạn");
    expect(stepOf(steps, "adding-second-calculator").title).toBe(
      "Thêm Calculator thứ hai",
    );
  });
});
