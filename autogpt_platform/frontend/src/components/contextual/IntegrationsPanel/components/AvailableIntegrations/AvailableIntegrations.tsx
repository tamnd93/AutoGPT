"use client";

import { Button } from "@/components/atoms/Button/Button";
import { Skeleton } from "@/components/atoms/Skeleton/Skeleton";
import { Text } from "@/components/atoms/Text/Text";
import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { useT } from "@/lib/i18n";
import { ProviderRow } from "../ConnectServiceDialog/components/ProviderRow";
import { useAvailableIntegrations } from "./useAvailableIntegrations";

interface Props {
  query: string;
  onSelect: (providerId: string) => void;
}

export function AvailableIntegrations({ query, onSelect }: Props) {
  const t = useT();
  const catalog = useAvailableIntegrations(query);

  return (
    <section
      aria-labelledby="available-integrations-heading"
      className="flex flex-col gap-4 pb-6 pt-6"
    >
      <div className="flex flex-col gap-1 px-4">
        <Text
          variant="small-medium"
          as="h2"
          id="available-integrations-heading"
          className="uppercase tracking-eyebrow text-foreground-secondary"
        >
          {t("integrations1.available.title")}
        </Text>
        <Text variant="small" className="text-foreground-tertiary">
          {t("integrations1.available.description")}
        </Text>
      </div>
      {catalog.isLoading ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {[0, 1, 2, 3].map((id) => (
            <Skeleton key={id} className="h-20 rounded-xl" />
          ))}
        </div>
      ) : catalog.isError ? (
        <ErrorCard
          context={t("errors2.context.availableIntegrations")}
          responseError={
            catalog.error instanceof Error
              ? { message: catalog.error.message }
              : undefined
          }
          onRetry={() => catalog.refetch()}
        />
      ) : (
        <>
          <ul className="grid gap-3 sm:grid-cols-2">
            {catalog.providers.map((provider) => (
              <li key={provider.id} className="min-w-0">
                <ProviderRow provider={provider} onSelect={onSelect} />
              </li>
            ))}
          </ul>
          <Text
            variant="small"
            className="px-4 text-foreground-tertiary"
            role="status"
          >
            {catalog.total === 0
              ? query.trim()
                ? t("integrations1.available.noMatch")
                : t("integrations1.available.empty")
              : t("integrations1.available.count", {
                  shown: catalog.providers.length,
                  total: catalog.total,
                })}
          </Text>
          {catalog.hasMore && (
            <Button variant="secondary" size="small" onClick={catalog.showMore}>
              {t("integrations1.available.showMore")}
            </Button>
          )}
        </>
      )}
    </section>
  );
}
