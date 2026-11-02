"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/molecules/Form/Form";

import { useInlineConnectForm } from "./useInlineConnectForm";
import { useT } from "@/lib/i18n";

function makeUserPasswordSchema(t: ReturnType<typeof useT>) {
  return z
    .object({
      title: z
        .string()
        .trim()
        .min(1, t("connectServices1.userPassword.nameRequired"))
        .max(100, t("connectServices1.userPassword.nameMax")),
      username: z
        .string()
        .trim()
        .min(1, t("connectServices1.userPassword.usernameRequired")),
      password: z
        .string()
        .min(1, t("connectServices1.userPassword.passwordRequired")),
    })
    .strict();
}

type UserPasswordConnectFormValues = z.infer<
  ReturnType<typeof makeUserPasswordSchema>
>;

interface Props {
  provider: string;
  providerName: string;
  onSuccess: (credential?: CredentialsMetaResponse) => void;
}

// Carries its own submit, because the panel footer's Continue only drives
// OAuth and API key.
export function InlineUserPasswordForm({
  provider,
  providerName,
  onSuccess,
}: Props) {
  const t = useT();
  const userPasswordConnectSchema = makeUserPasswordSchema(t);
  const { submit, isPending } = useInlineConnectForm({
    provider,
    successTitle: t("connectServices1.userPassword.savedTitle"),
    failureTitle: t("connectServices1.userPassword.saveFailed"),
    onSuccess,
  });

  const form = useForm<UserPasswordConnectFormValues>({
    resolver: zodResolver(userPasswordConnectSchema),
    defaultValues: { title: "", username: "", password: "" },
    mode: "onChange",
  });

  function handleSubmit(values: UserPasswordConnectFormValues) {
    submit({
      provider,
      type: "user_password",
      title: values.title,
      username: values.username,
      password: values.password,
    });
  }

  return (
    <Form form={form} onSubmit={handleSubmit} className="space-y-2.5">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                id={field.name}
                autoComplete="off"
                label={t("connectServices1.userPassword.name")}
                labelVariant="small-medium"
                size="small"
                placeholder={t(
                  "connectServices1.userPassword.accountPlaceholder",
                  { provider: providerName },
                )}
                wrapperClassName="!mb-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                id={field.name}
                autoComplete="off"
                spellCheck={false}
                label={t("connectServices1.userPassword.username")}
                labelVariant="small-medium"
                size="small"
                wrapperClassName="!mb-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                id={field.name}
                type="password"
                autoComplete="new-password"
                label={t("connectServices1.userPassword.password")}
                labelVariant="small-medium"
                size="small"
                wrapperClassName="!mb-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button
        type="submit"
        variant="primary"
        size="small"
        className="w-full"
        disabled={!form.formState.isValid}
        loading={isPending}
      >
        {isPending
          ? t("connectServices1.hostScoped.connecting")
          : t("connectServices1.hostScoped.connect")}
      </Button>
    </Form>
  );
}
