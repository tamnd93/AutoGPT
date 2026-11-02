import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Form, FormField } from "@/components/molecules/Form/Form";
import { useT } from "@/lib/i18n";
import { useTopUpForm } from "./useTopUpForm";

interface Props {
  submitLabel?: string;
  size?: "small" | "normal";
}

export function TopUpForm({ submitLabel, size = "normal" }: Props) {
  const t = useT();
  const label = submitLabel ?? t("billing2.topUp.submit");
  const { form, isLoading, isRedirecting, submitTopUp } = useTopUpForm();
  const inputSize = size === "small" ? "small" : "medium";
  const buttonSize = size === "small" ? "small" : "large";

  return (
    <Form form={form} onSubmit={submitTopUp} className="my-4">
      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <Input
            label={t("billing2.topUp.amountLabel")}
            type="amount"
            size={inputSize}
            decimalCount={0}
            id={field.name}
            error={form.formState.errors.amount?.message}
            amountPrefix="$"
            {...field}
          />
        )}
      />
      <Button
        type="submit"
        disabled={isLoading || isRedirecting}
        size={buttonSize}
      >
        {isLoading ? t("billing2.topUp.redirecting") : label}
      </Button>
    </Form>
  );
}
