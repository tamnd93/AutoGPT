import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { ClarificationQuestionsCard } from "../ClarificationQuestionsCard";

const QUESTIONS = [
  { question: "Which topic?", keyword: "topic", example: "AI agents" },
  { question: "Which format?", keyword: "format" },
];

function renderCard(
  args: { isAnswered?: boolean; onSubmit?: () => void } = {},
) {
  return render(
    <LocaleProvider locale="vi">
      <ClarificationQuestionsCard
        questions={QUESTIONS}
        message="Tell me more."
        sessionId="session-vi"
        onSubmitAnswers={args.onSubmit ?? vi.fn()}
        onCancel={vi.fn()}
        isAnswered={args.isAnswered}
      />
    </LocaleProvider>,
  );
}

describe("ClarificationQuestionsCard in Vietnamese", () => {
  it("asks and submits its questions in Vietnamese", () => {
    const onSubmit = vi.fn();
    renderCard({ onSubmit });

    expect(screen.getByText("Tôi cần thêm thông tin")).toBeDefined();
    expect(screen.getByText("Ví dụ: AI agents")).toBeDefined();
    const answers = screen.getAllByPlaceholderText("Câu trả lời của bạn...");
    expect(answers).toHaveLength(2);
    const submit = screen.getByRole("button", { name: "Gửi câu trả lời" });
    expect(submit).toHaveProperty("disabled", true);
    expect(screen.getByRole("button", { name: "Huỷ" })).toBeDefined();

    fireEvent.change(answers[0], { target: { value: "AI" } });
    fireEvent.change(answers[1], { target: { value: "Report" } });
    fireEvent.click(submit);

    expect(onSubmit).toHaveBeenCalledWith({ topic: "AI", format: "Report" });
  });

  it("reports the submitted state in Vietnamese", () => {
    renderCard({ isAnswered: true });

    expect(screen.getByText("Đã gửi câu trả lời")).toBeDefined();
    expect(screen.getByText("Đang xử lý câu trả lời của bạn...")).toBeDefined();
  });
});
