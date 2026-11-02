import { z } from "zod";
import { useT } from "@/lib/i18n";

export function apiKeyConnectSchemaFactory(t: ReturnType<typeof useT>) {
  return z
  .object({
    title: z
      .string()
      .trim()
      .min(1, t("connectServices1.apiKeyForm.nameRequired"))
      .max(100, t("connectServices1.apiKeyForm.nameMax")),
    apiKey: z.string().trim().min(1, t("connectServices1.apiKeyForm.keyRequired")),
    expiresAt: z
      .string()
      .trim()
      .optional()
      .superRefine((value, ctx) => {
        if (!value) return;
        const parsed = Date.parse(value);
        if (Number.isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("connectServices1.apiKeyForm.dateInvalid"),
          });
          return;
        }
        if (parsed <= Date.now()) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: t("connectServices1.apiKeyForm.dateFuture"),
          });
        }
      }),
  })
  .strict();
}

export type ApiKeyConnectFormValues = z.infer<
  ReturnType<typeof apiKeyConnectSchemaFactory>
>;
