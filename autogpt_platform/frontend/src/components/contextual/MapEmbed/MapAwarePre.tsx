import type { ReactNode } from "react";
import { MapEmbed } from "./MapEmbed";
import { mapLanguageSource, parseMapSource } from "./helpers";
import { useLocale } from "@/lib/i18n";

interface Props {
  children?: ReactNode;
}

export function MapAwarePre({ children }: Props) {
  const locale = useLocale();
  const source = mapLanguageSource(children);
  if (source === null) return <>{children}</>;
  const data = parseMapSource(source, locale);
  if (!data) return <>{children}</>;
  return <MapEmbed data={data} />;
}
