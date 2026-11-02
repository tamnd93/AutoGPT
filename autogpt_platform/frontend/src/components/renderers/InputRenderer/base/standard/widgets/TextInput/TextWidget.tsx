"use client";

import { useFieldAccessibility } from "../../../../field-accessibility";

import { useState } from "react";
import { WidgetProps } from "@rjsf/utils";
import {
  InputType,
  mapJsonSchemaTypeToInputType,
} from "@/app/(platform)/build/components/FlowEditor/nodes/helpers";
import { Input } from "@/components/atoms/Input/Input";
import { Button } from "@/components/atoms/Button/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/atoms/Tooltip/BaseTooltip";
import { BlockUIType } from "@/lib/autogpt-server-api/types";
import { InputExpanderModal } from "./TextInputExpanderModal";
import { ArrowExpandIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";
import { useT } from "@/lib/i18n";

export default function TextWidget(props: WidgetProps) {
  const t = useT();
  const { schema, placeholder, registry } = props;
  const { size, uiType } = registry.formContext;
  const accessibility = useFieldAccessibility(
    props.id,
    schema.title || props.label,
    registry.formContext,
    props["aria-describedby"],
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  const mapped = mapJsonSchemaTypeToInputType(schema);

  type InputConfig = {
    htmlType: string;
    placeholder: string;
    handleChange: (v: string) => any;
  };

  const inputConfig: Partial<Record<InputType, InputConfig>> = {
    [InputType.TEXT_AREA]: {
      htmlType: "textarea",
      placeholder: t("shared5.text.placeholderText"),
      handleChange: (v: string) => (v === "" ? undefined : v),
    },
    [InputType.PASSWORD]: {
      htmlType: "password",
      placeholder: t("shared5.text.placeholderSecret"),
      handleChange: (v: string) => (v === "" ? undefined : v),
    },
    [InputType.NUMBER]: {
      htmlType: "number",
      placeholder: t("shared5.text.placeholderNumber"),
      handleChange: (v: string) => {
        if (v === "") return undefined;
        const n = Number(v);
        return Number.isFinite(n) ? n : undefined;
      },
    },
    [InputType.INTEGER]: {
      htmlType: "number",
      placeholder: t("shared5.text.placeholderInteger"),
      handleChange: (v: string) => {
        if (v === "") return undefined;
        const n = Number(v);
        return Number.isFinite(n) ? Math.trunc(n) : undefined;
      },
    },
  };

  const defaultConfig: InputConfig = {
    htmlType: "text",
    placeholder: t("shared5.text.placeholderString"),
    handleChange: (v: string) => (v === "" ? undefined : v),
  };

  const config = (mapped && inputConfig[mapped]) || defaultConfig;

  const displayValue =
    typeof props.value === "number" && !Number.isFinite(props.value)
      ? ""
      : (props.value ?? "");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const v = e.target.value;
    return props.onChange(config.handleChange(v));
  };

  const handleModalSave = (value: string) => {
    props.onChange(config.handleChange(value));
    setIsModalOpen(false);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  // Determine input size based on context
  const inputSize = size === "large" ? "medium" : "small";

  // Check if this input type should show the expand button
  // Show for text and password types, not for number/integer
  const showExpandButton =
    config.htmlType === "text" ||
    config.htmlType === "password" ||
    config.htmlType === "textarea";

  if (uiType === BlockUIType.NOTE) {
    return (
      <Input
        {...accessibility}
        hideLabel={true}
        type={"textarea"}
        label={schema.title || props.label || t("shared5.text.noteLabel")}
        size="small"
        wrapperClassName="mb-0"
        value={displayValue}
        className="!h-[230px] resize-none rounded-none border-none bg-transparent p-0 placeholder:text-black/60 focus:ring-0"
        onChange={handleChange}
        placeholder={t("shared5.text.placeholderNote")}
        required={props.required}
        disabled={props.disabled}
      />
    );
  }

  return (
    <>
      <div className="nodrag relative flex items-center gap-2">
        <Input
          {...accessibility}
          hideLabel={true}
          type={config.htmlType as any}
          label={schema.title || props.label || ""}
          size={inputSize as any}
          wrapperClassName="mb-0 flex-1"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder || config.placeholder}
          required={props.required}
          disabled={props.disabled}
          className={showExpandButton ? "pr-8" : ""}
        />
        {showExpandButton && (
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleModalOpen}
                type="button"
                className="p-1"
                aria-label={t("shared5.text.expandAria")}
              >
                <Icon icon={ArrowExpandIcon} className="size-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t("shared5.text.expandAria")}</TooltipContent>
          </Tooltip>
        )}
      </div>

      <InputExpanderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleModalSave}
        title={schema.title || t("shared5.expander.editValue")}
        description={schema.description || ""}
        defaultValue={displayValue}
        placeholder={placeholder || config.placeholder}
      />
    </>
  );
}
