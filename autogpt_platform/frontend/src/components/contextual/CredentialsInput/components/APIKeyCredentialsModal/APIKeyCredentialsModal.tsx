import { FormProvider } from "react-hook-form";
import { FormDescription, FormField } from "@/components/molecules/Form/Form";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import {
  BlockIOCredentialsSubSchema,
  CredentialsMetaInput,
} from "@/lib/autogpt-server-api/types";
import { useT } from "@/lib/i18n";
import { useAPIKeyCredentialsModal } from "./useAPIKeyCredentialsModal";

type Props = {
  schema: BlockIOCredentialsSubSchema;
  open: boolean;
  onClose: () => void;
  onCredentialsCreate: (creds: CredentialsMetaInput) => void;
  siblingInputs?: Record<string, any>;
};

export function APIKeyCredentialsModal({
  schema,
  open,
  onClose,
  onCredentialsCreate,
  siblingInputs,
}: Props) {
  const t = useT();
  const {
    form,
    isLoading,
    isSubmitting,
    supportsApiKey,
    providerName,
    schemaDescription,
    onSubmit,
  } = useAPIKeyCredentialsModal({ schema, siblingInputs, onCredentialsCreate });

  if (isLoading || !supportsApiKey) {
    return null;
  }

  return (
    <Dialog
      title={t("credentials1.apiKey.title", { name: providerName ?? "" })}
      controlled={{
        isOpen: open,
        set: (isOpen) => {
          if (!isOpen) onClose();
        },
      }}
      onClose={onClose}
      styling={{
        maxWidth: "25rem",
      }}
    >
      <Dialog.Content>
        {schemaDescription && (
          <Text variant="body-tight" as="p" tone="secondary" className="mb-4">
            {schemaDescription}
          </Text>
        )}

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 px-2"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input
                  id="title"
                  label={t("credentials1.apiKey.name")}
                  type="text"
                  placeholder={t("credentials1.apiKey.namePlaceholder")}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <>
                  <Input
                    id="apiKey"
                    label={t("credentials1.apiKey.label")}
                    type="password"
                    placeholder={t("credentials1.apiKey.placeholder")}
                    hint={
                      schema.credentials_scopes ? (
                        <FormDescription
                          // TODO(tokens): SECRT-3152 rare size: text-[0.8rem].
                          // dark:text-neutral-400: the legacy FormDescription's, moved verbatim (DS6, SECRT-3116)
                          className="text-[0.8rem] leading-inherit dark:text-neutral-400"
                        >
                          {t("credentials1.apiKey.scopesHint")}{" "}
                          {schema.credentials_scopes?.map((s, i, a) => (
                            <span key={i}>
                              <Text
                                variant="small-mono-bold-tight"
                                as="code"
                                tone="inherit"
                              >
                                {s}
                              </Text>
                              {i < a.length - 1 && ", "}
                            </span>
                          ))}
                        </FormDescription>
                      ) : null
                    }
                    {...field}
                  />
                </>
              )}
            />

            <FormField
              control={form.control}
              name="expiresAt"
              render={({ field }) => (
                <Input
                  id="expiresAt"
                  label={t("credentials1.apiKey.expiration")}
                  type="datetime-local"
                  placeholder={t("credentials1.apiKey.expirationPlaceholder")}
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value) {
                      const dateTime = new Date(value);
                      dateTime.setHours(0, 0, 0, 0);
                      const year = dateTime.getFullYear();
                      const month = String(dateTime.getMonth() + 1).padStart(
                        2,
                        "0",
                      );
                      const day = String(dateTime.getDate()).padStart(2, "0");
                      const normalizedValue = `${year}-${month}-${day}T00:00`;
                      field.onChange(normalizedValue);
                    } else {
                      field.onChange(value);
                    }
                  }}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              )}
            />
            <Button
              type="submit"
              className="min-w-68"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {t("credentials1.apiKey.submit")}
            </Button>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
