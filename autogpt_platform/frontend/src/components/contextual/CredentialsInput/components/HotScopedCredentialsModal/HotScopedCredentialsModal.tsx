import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button/Button";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import {
  FormDescription,
  FormField,
  FormLabel,
} from "@/components/molecules/Form/Form";
import useCredentials from "@/hooks/useCredentials";
import {
  BlockIOCredentialsSubSchema,
  CredentialsMetaInput,
} from "@/lib/autogpt-server-api/types";
import { CredentialsProvidersContext } from "@/providers/agent-credentials/credentials-provider";
import { getHostFromUrl } from "@/lib/utils/url";
import { toast } from "@/components/molecules/Toast/use-toast";
import {
  addHeaderPairToList,
  findExistingHostCredentials,
  hasExistingHostCredential,
  headerPairsToRecord,
  removeHeaderPairFromList,
  updateHeaderPairInList,
  type HeaderPair,
} from "../../helpers";
import { useT } from "@/lib/i18n";
import { Delete02Icon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/atoms/Icon/Icon";

type Props = {
  schema: BlockIOCredentialsSubSchema;
  open: boolean;
  onClose: () => void;
  onCredentialsCreate: (creds: CredentialsMetaInput) => void;
  siblingInputs?: Record<string, any>;
};

export function HostScopedCredentialsModal({
  schema,
  open,
  onClose,
  onCredentialsCreate,
  siblingInputs,
}: Props) {
  const t = useT();
  const credentials = useCredentials(schema, siblingInputs);
  const allProviders = useContext(CredentialsProvidersContext);

  // Get current host from siblingInputs or discriminator_values
  const currentUrl = credentials?.discriminatorValue;
  const currentHost = currentUrl ? getHostFromUrl(currentUrl) : "";

  const formSchema = z.object({
    host: z
      .string()
      .min(1, t("credentials1.hostScoped.hostRequired"))
      .refine((val) => !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(val), {
        message: t("credentials1.hostScoped.hostNoProtocol"),
      })
      .refine((val) => !val.includes("/"), {
        message: t("credentials1.hostScoped.hostNoPath"),
      }),
    title: z.string().optional(),
    headers: z.record(z.string()).optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      host: currentHost || "",
      title: currentHost || t("credentials1.hostScoped.manualEntry"),
      headers: {},
    },
  });

  const [headerPairs, setHeaderPairs] = useState<HeaderPair[]>([
    { key: "", value: "" },
  ]);

  // Update form values when siblingInputs change
  useEffect(() => {
    if (currentHost) {
      form.setValue("host", currentHost);
      form.setValue("title", currentHost);
    } else {
      // Reset to empty when no current host
      form.setValue("host", "");
      form.setValue("title", t("credentials1.hostScoped.manualEntry"));
    }
  }, [currentHost, form]);

  if (
    !credentials ||
    credentials.isLoading ||
    !credentials.supportsHostScoped
  ) {
    return null;
  }

  const {
    provider,
    providerName,
    createHostScopedCredentials,
    deleteCredentials,
  } = credentials;

  // Use the unfiltered credential list from the provider context for deduplication.
  // The hook's savedCredentials is pre-filtered by discriminatorValue, which may be
  // empty when no URL is entered yet — causing deduplication to miss existing creds.
  const allProviderCredentials =
    allProviders?.[provider]?.savedCredentials ?? [];

  const hasExistingForHost = hasExistingHostCredential(
    allProviderCredentials,
    currentHost || form.getValues("host"),
  );

  const addHeaderPair = () => {
    setHeaderPairs((prev) => addHeaderPairToList(prev));
  };

  const removeHeaderPair = (index: number) => {
    setHeaderPairs((prev) => removeHeaderPairFromList(prev, index));
  };

  const updateHeaderPair = (
    index: number,
    field: "key" | "value",
    value: string,
  ) => {
    setHeaderPairs((prev) => updateHeaderPairInList(prev, index, field, value));
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const headers = headerPairsToRecord(headerPairs);

    // Delete existing host-scoped credentials for the same host to avoid duplicates.
    // Uses unfiltered provider credentials (not the hook's pre-filtered list).
    const host = values.host;
    const existingForHost = findExistingHostCredentials(
      allProviderCredentials,
      host,
    );

    try {
      for (const existing of existingForHost) {
        await deleteCredentials(existing.id, true);
      }

      const newCredentials = await createHostScopedCredentials({
        host,
        title: currentHost || host,
        headers,
      });

      onCredentialsCreate({
        provider,
        id: newCredentials.id,
        type: "host_scoped",
        title: newCredentials.title,
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : t("credentials1.input.somethingWrong");
      toast({
        title: t("credentials1.hostScoped.saveFailedTitle"),
        description: message,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog
      title={
        hasExistingForHost
          ? t("credentials1.hostScoped.titleUpdate", { name: providerName })
          : t("credentials1.hostScoped.titleAdd", { name: providerName })
      }
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
        {schema.description && (
          <Text variant="body-tight" as="p" tone="secondary" className="mb-4">
            {schema.description}
          </Text>
        )}

        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="host"
              render={({ field }) => (
                <Input
                  id="host"
                  label={t("credentials1.hostScoped.hostPattern")}
                  type="text"
                  size="small"
                  readOnly={!!currentHost}
                  hint={
                    currentHost
                      ? t("credentials1.hostScoped.hostHintFixed")
                      : t("credentials1.hostScoped.hostHintManual")
                  }
                  placeholder={
                    currentHost
                      ? undefined
                      : t("credentials1.hostScoped.hostPlaceholder")
                  }
                  {...field}
                />
              )}
            />

            <div className="space-y-2">
              <FormLabel className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                <Text variant="body-medium-lh-none" as="span" tone="inherit">
                  {t("credentials1.hostScoped.headers")}
                </Text>
              </FormLabel>
              <FormDescription
                // TODO(tokens): SECRT-3152 rare size: text-[0.8rem].
                // dark:text-neutral-400: the legacy FormDescription's, moved verbatim (DS6, SECRT-3116)
                className="max-w-md text-[0.8rem] leading-inherit dark:text-neutral-400"
              >
                {t("credentials1.hostScoped.headersDesc")}
              </FormDescription>

              {headerPairs.map((pair, index) => (
                <div key={index} className="flex w-full items-center gap-4">
                  <Input
                    id={`header-${index}-key`}
                    label={t("credentials1.hostScoped.headerName")}
                    placeholder={t(
                      "credentials1.hostScoped.headerNamePlaceholder",
                    )}
                    size="small"
                    value={pair.key}
                    className="flex-1"
                    onChange={(e) =>
                      updateHeaderPair(index, "key", e.target.value)
                    }
                  />

                  <Input
                    id={`header-${index}-value`}
                    label={t("credentials1.hostScoped.headerValue")}
                    size="small"
                    type="password"
                    className="flex-2"
                    placeholder={t(
                      "credentials1.hostScoped.headerValuePlaceholder",
                    )}
                    value={pair.value}
                    onChange={(e) =>
                      updateHeaderPair(index, "value", e.target.value)
                    }
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    size="small"
                    onClick={() => removeHeaderPair(index)}
                    disabled={headerPairs.length === 1}
                  >
                    <Icon icon={Delete02Icon} className="size-4" />{" "}
                    {t("credentials1.hostScoped.remove")}
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="small"
                onClick={addHeaderPair}
              >
                <Icon icon={PlusSignIcon} className="size-4" />{" "}
                {t("credentials1.hostScoped.addAnotherHeader")}
              </Button>
            </div>

            <div className="pt-8">
              <Button type="submit" className="w-full" size="small">
                {hasExistingForHost
                  ? t("credentials1.hostScoped.saveUpdate")
                  : t("credentials1.hostScoped.saveAdd")}
              </Button>
            </div>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
