"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Delete02Icon, PlusSignIcon } from "@hugeicons/core-free-icons";

import type { CredentialsMetaResponse } from "@/app/api/__generated__/models/credentialsMetaResponse";
import { Button } from "@/components/atoms/Button/Button";
import { Icon } from "@/components/atoms/Icon/Icon";
import { Input } from "@/components/atoms/Input/Input";
import { Text } from "@/components/atoms/Text/Text";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/molecules/Form/Form";
import {
  addHeaderPairToList,
  headerPairsToRecord,
  removeHeaderPairFromList,
  updateHeaderPairInList,
  type HeaderPair,
} from "@/components/contextual/CredentialsInput/helpers";

import { useInlineConnectForm } from "./useInlineConnectForm";
import { useT } from "@/lib/i18n";

function makeHostScopedSchema(t: ReturnType<typeof useT>) {
  return z
    .object({
      host: z
        .string()
        .trim()
        .min(1, t("connectServices1.hostScoped.hostRequired"))
        .refine((value) => !/^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(value), {
          message: t("connectServices1.hostScoped.hostNoUrl"),
        })
        .refine((value) => !value.includes("/"), {
          message: t("connectServices1.hostScoped.hostNoPath"),
        }),
    })
    .strict();
}

type HostScopedConnectFormValues = z.infer<
  ReturnType<typeof makeHostScopedSchema>
>;

interface Props {
  provider: string;
  /** The host the requesting block will call. Absent where no block is in
   *  scope — the settings dialog and the copilot connect card. */
  host?: string;
  onSuccess: (credential?: CredentialsMetaResponse) => void;
}

// Host pattern plus the headers to attach to requests matching it. Carries its
// own submit, because the panel footer's Continue only drives OAuth and API key.
export function InlineHostScopedForm({ provider, host, onSuccess }: Props) {
  const t = useT();
  const hostScopedConnectSchema = makeHostScopedSchema(t);
  const [headerPairs, setHeaderPairs] = useState<HeaderPair[]>([
    { key: "", value: "" },
  ]);
  const { submit, isPending } = useInlineConnectForm({
    provider,
    successTitle: t("connectServices1.hostScoped.savedTitle"),
    failureTitle: t("connectServices1.hostScoped.saveFailed"),
    onSuccess,
  });

  const form = useForm<HostScopedConnectFormValues>({
    resolver: zodResolver(hostScopedConnectSchema),
    defaultValues: { host: host ?? "" },
    mode: "onChange",
  });

  const headers = headerPairsToRecord(headerPairs);
  // Parsed rather than read off formState, which stays invalid until the
  // first change and so would reject a host we prefilled.
  const hostIsValid = hostScopedConnectSchema.safeParse({
    host: form.watch("host"),
  }).success;
  // A host-scoped credential with no headers adds nothing to a request, so
  // saving one would silently produce a credential that does nothing.
  const canSubmit = hostIsValid && Object.keys(headers).length > 0;

  function handleSubmit(values: HostScopedConnectFormValues) {
    submit({
      provider,
      type: "host_scoped",
      title: values.host,
      host: values.host,
      headers,
    });
  }

  return (
    <Form form={form} onSubmit={handleSubmit} className="space-y-2.5">
      <FormField
        control={form.control}
        name="host"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                {...field}
                id="host"
                autoComplete="off"
                spellCheck={false}
                label={t("connectServices1.hostScoped.host")}
                labelVariant="small-medium"
                size="small"
                readOnly={Boolean(host)}
                placeholder="api.example.com"
                wrapperClassName="!mb-0"
              />
            </FormControl>
            <Text variant="small" className="!text-foreground-tertiary">
              {host
                ? t("connectServices1.hostScoped.takenFromUrl")
                : t("connectServices1.hostScoped.hostFromUrl")}
            </Text>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <Text variant="small-medium" className="text-foreground-strong">
          {t("connectServices1.hostScoped.headers")}
        </Text>
        <Text variant="small" className="!text-foreground-tertiary">
          {t("connectServices1.hostScoped.headersBody")}
        </Text>

        {headerPairs.map((pair, index) => (
          <div key={index} className="flex items-end gap-2">
            <Input
              id={`header-${index}-key`}
              label={t("connectServices1.hostScoped.headerName")}
              hideLabel
              size="small"
              className="flex-1"
              wrapperClassName="!mb-0 flex-1"
              placeholder="Authorization"
              value={pair.key}
              onChange={(event) =>
                updateHeaderPair(index, "key", event.target.value)
              }
            />
            <Input
              id={`header-${index}-value`}
              label={t("connectServices1.hostScoped.headerValue")}
              hideLabel
              type="password"
              autoComplete="new-password"
              size="small"
              className="flex-1"
              wrapperClassName="!mb-0 flex-1"
              placeholder="Bearer …"
              value={pair.value}
              onChange={(event) =>
                updateHeaderPair(index, "value", event.target.value)
              }
            />
            <Button
              type="button"
              variant="icon"
              size="icon"
              aria-label={t("connectServices1.hostScoped.removeHeader", {
                index: index + 1,
              })}
              disabled={headerPairs.length === 1}
              onClick={() => removeHeaderPair(index)}
            >
              <Icon icon={Delete02Icon} size={16} />
            </Button>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          size="small"
          onClick={addHeaderPair}
        >
          <Icon icon={PlusSignIcon} size={16} />{" "}
          {t("connectServices1.hostScoped.addHeader")}
        </Button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="small"
        className="w-full"
        disabled={!canSubmit}
        loading={isPending}
      >
        {isPending
          ? t("connectServices1.hostScoped.connecting")
          : t("connectServices1.hostScoped.connect")}
      </Button>
    </Form>
  );

  function addHeaderPair() {
    setHeaderPairs((pairs) => addHeaderPairToList(pairs));
  }

  function removeHeaderPair(index: number) {
    setHeaderPairs((pairs) => removeHeaderPairFromList(pairs, index));
  }

  function updateHeaderPair(
    index: number,
    field: "key" | "value",
    value: string,
  ) {
    setHeaderPairs((pairs) =>
      updateHeaderPairInList(pairs, index, field, value),
    );
  }
}
