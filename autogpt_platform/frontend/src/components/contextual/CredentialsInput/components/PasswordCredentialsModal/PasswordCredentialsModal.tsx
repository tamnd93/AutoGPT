import { FormField } from "@/components/molecules/Form/Form";
import { Button } from "@/components/atoms/Button/Button";
import { Input } from "@/components/atoms/Input/Input";
import { Dialog } from "@/components/molecules/Dialog/Dialog";
import useCredentials from "@/hooks/useCredentials";
import {
  BlockIOCredentialsSubSchema,
  CredentialsMetaInput,
} from "@/lib/autogpt-server-api/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { useT } from "@/lib/i18n";

type Props = {
  schema: BlockIOCredentialsSubSchema;
  open: boolean;
  onClose: () => void;
  onCredentialsCreate: (creds: CredentialsMetaInput) => void;
  siblingInputs?: Record<string, any>;
};

export function PasswordCredentialsModal({
  schema,
  open,
  onClose,
  onCredentialsCreate,
  siblingInputs,
}: Props) {
  const t = useT();
  const credentials = useCredentials(schema, siblingInputs);

  const formSchema = z.object({
    username: z.string().min(1, t("credentials1.password.usernameRequired")),
    password: z.string().min(1, t("credentials1.password.passwordRequired")),
    title: z.string().min(1, t("credentials1.apiKey.nameRequired")),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      title: "",
    },
  });

  if (
    !credentials ||
    credentials.isLoading ||
    !credentials.supportsUserPassword
  ) {
    return null;
  }

  const { provider, providerName, createUserPasswordCredentials } = credentials;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const newCredentials = await createUserPasswordCredentials({
      username: values.username,
      password: values.password,
      title: values.title,
    });
    onCredentialsCreate({
      provider,
      id: newCredentials.id,
      type: "user_password",
      title: newCredentials.title,
    });
  }

  return (
    <Dialog
      title={t("credentials1.password.title", { name: providerName })}
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
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-[98%] space-y-2 pt-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <Input
                  id="username"
                  label={t("credentials1.password.username")}
                  type="text"
                  placeholder={t("credentials1.password.usernamePlaceholder")}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <Input
                  id="password"
                  label={t("credentials1.password.password")}
                  type="password"
                  placeholder={t("credentials1.password.passwordPlaceholder")}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <Input
                  id="title"
                  label={t("credentials1.apiKey.name")}
                  type="text"
                  placeholder={t("credentials1.password.namePlaceholder")}
                  className="mb-8"
                  {...field}
                />
              )}
            />
            <Button type="submit" className="w-full">
              {t("credentials1.password.submit")}
            </Button>
          </form>
        </FormProvider>
      </Dialog.Content>
    </Dialog>
  );
}
