import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";

export interface MapPin {
  name: string;
  lat: number;
  lng: number;
  address?: string;
}

export interface MapData {
  title?: string;
  pins: MapPin[];
}

const MAX_PINS = 50;

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function toPin(
  value: unknown,
  locale: Locale = DEFAULT_LOCALE,
): MapPin | null {
  if (typeof value !== "object" || value === null) return null;
  const { name, lat, lng, address } = value as Record<string, unknown>;
  if (!isFiniteNumber(lat) || !isFiniteNumber(lng)) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return {
    name:
      typeof name === "string" && name.trim()
        ? name.trim()
        : getMessage(locale, "shared1.mapEmbed.location"),
    lat,
    lng,
    address: typeof address === "string" ? address : undefined,
  };
}

export function parseMapSource(
  source: string,
  locale: Locale = DEFAULT_LOCALE,
): MapData | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(source);
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null) return null;
  const { title, pins } = parsed as Record<string, unknown>;
  if (!Array.isArray(pins)) return null;
  const valid = pins
    .map((pin) => toPin(pin, locale))
    .filter((pin): pin is MapPin => pin !== null)
    .slice(0, MAX_PINS);
  if (valid.length === 0) return null;
  return {
    title: typeof title === "string" && title.trim() ? title.trim() : undefined,
    pins: valid,
  };
}

export function googleMapsPinUrl(pin: MapPin) {
  const query = encodeURIComponent(`${pin.lat},${pin.lng}`);
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function mapLanguageSource(children: unknown): string | null {
  if (typeof children !== "object" || children === null) return null;
  const props = (children as { props?: unknown }).props;
  if (typeof props !== "object" || props === null) return null;
  const { className, children: inner } = props as Record<string, unknown>;
  if (
    typeof className !== "string" ||
    !/(^|\s)language-map(\s|$)/.test(className)
  )
    return null;
  return typeof inner === "string" ? inner : "";
}
