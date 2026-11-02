import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { LocaleProvider } from "@/lib/i18n";
import { QuestionAnswerField } from "../QuestionAnswerField";

function renderField(value = "ねこ") {
  const onSubmit = vi.fn();
  render(
    <QuestionAnswerField
      question={{ question: "Which animal?", keyword: "animal" }}
      value={value}
      labelId="label-1"
      autoFocus={false}
      onChange={() => {}}
      onSubmit={onSubmit}
    />,
  );
  return { textarea: screen.getByRole("textbox"), onSubmit };
}

describe("QuestionAnswerField in Vietnamese", () => {
  it("asks for an answer in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <QuestionAnswerField
          question={{ question: "Which animal?", keyword: "animal" }}
          value=""
          labelId="label-vi"
          autoFocus={false}
          onChange={() => {}}
          onSubmit={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(screen.getByPlaceholderText("Gõ câu trả lời của bạn")).toBeDefined();
  });

  it("offers the escape hatch in Vietnamese", () => {
    render(
      <LocaleProvider locale="vi">
        <QuestionAnswerField
          question={{
            question: "Which animal?",
            keyword: "animal",
            options: ["Cat", "Dog"],
          }}
          value=""
          labelId="label-vi-2"
          autoFocus={false}
          onChange={() => {}}
          onSubmit={vi.fn()}
        />
      </LocaleProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Gõ nội dung khác…" }),
    ).toBeDefined();
  });
});

describe("QuestionAnswerField Enter handling", () => {
  it("advances the pager on a plain Enter", () => {
    const { textarea, onSubmit } = renderField();

    fireEvent.keyDown(textarea, { key: "Enter" });

    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("does not advance while an IME owns the Enter", () => {
    const { textarea, onSubmit } = renderField();

    fireEvent.keyDown(textarea, { key: "Enter", isComposing: true });
    // Safari's confirming Enter arrives after compositionend.
    fireEvent.keyDown(textarea, { key: "Enter", keyCode: 229 });

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("leaves Shift+Enter as the newline", () => {
    const { textarea, onSubmit } = renderField();

    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });

    expect(onSubmit).not.toHaveBeenCalled();
  });
});
