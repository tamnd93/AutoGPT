"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/molecules/Form/Form";

import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";

import { useApiKeyConnectForm } from "./useApiKeyConnectForm";
import { useT } from "@/lib/i18n";

interface Props {
  provider: string;
  providerName: string;
  onSuccess: (credential?: CredentialsMetaResponse) => void;
}

export function ApiKeyConnectForm({
  provider,
  providerName,
  onSuccess,
}: Props) {
  const t = useT();
  const { form, handleSubmit, isPending } = useApiKeyConnectForm({
    provider,
    onSuccess,
  });

  return (
    <Form form={form} onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                label={t("connectServices1.apiKeyForm.name")}
                placeholder={t("connectServices1.apiKeyForm.keyPlaceholder", {
                  provider: providerName,
                })}
                wrapperClassName="!mb-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="apiKey"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                id={field.name}
                type="password"
                autoComplete="new-password"
                spellCheck={false}
                label={t("connectServices1.apiKeyForm.apiKey")}
                placeholder="sk-..."
                wrapperClassName="!mb-0"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="expiresAt"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                value={field.value ?? ""}
                id={field.name}
                type="date"
                label={t("connectServices1.apiKeyForm.expires")}
                hint={t("connectServices1.apiKeyForm.expiresHint")}
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
        size="large"
        disabled={!form.formState.isValid || isPending}
        loading={isPending}
      >
        {t("connectServices1.apiKeyForm.save")}
      </Button>
    </Form>
  );
}
