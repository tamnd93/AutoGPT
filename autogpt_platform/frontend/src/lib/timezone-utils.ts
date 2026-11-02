/**
 * Utility functions for timezone conversions and display
 */

import type { Locale } from "./i18n/locale";
import { getMessage } from "./i18n/translate";

function intlLocale(locale: Locale): string {
  return locale === "vi" ? "vi-VN" : "en-US";
}

/**
 * Format a date/time in the user's timezone with timezone indicator
 * @param date - The date to format (can be string or Date)
 * @param timezone - The IANA timezone identifier (e.g., "America/New_York")
 * @param options - Intl.DateTimeFormat options
 * @param locale - The UI language; only the presentation changes, never the instant
 * @returns Formatted date string with timezone
 */
export function formatInTimezone(
  date: string | Date,
  timezone: string,
  options?: Intl.DateTimeFormatOptions,
  locale: Locale = "en",
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(intlLocale(locale), {
      ...defaultOptions,
      timeZone: timezone === "not-set" ? undefined : timezone,
    }).format(dateObj);
  } catch {
    // Fallback to local timezone if invalid timezone
    console.warn(`Invalid timezone "${timezone}", using local timezone`);
    return new Intl.DateTimeFormat(intlLocale(locale), defaultOptions).format(
      dateObj,
    );
  }
}

/**
 * Get the timezone abbreviation (e.g., "EST", "PST")
 * @param timezone - The IANA timezone identifier
 * @returns Timezone abbreviation
 */
export function getTimezoneAbbreviation(timezone: string): string {
  if (timezone === "not-set" || !timezone) {
    return "";
  }

  try {
    const date = new Date();
    const tzAbbr = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    })
      .formatToParts(date)
      .find((part) => part.type === "timeZoneName")?.value;

    return tzAbbr || timezone;
  } catch {
    return timezone;
  }
}

/**
 * Format time for schedule display with timezone context
 * @param nextRunTime - The next run time (UTC)
 * @param displayTimezone - The timezone to display the time in (typically user's timezone)
 * @param locale - The UI language of the presentation
 * @returns Formatted string in the specified timezone
 */
export function formatScheduleTime(
  nextRunTime: string | Date,
  displayTimezone: string = "UTC",
  locale: Locale = "en",
): string {
  const date =
    typeof nextRunTime === "string" ? new Date(nextRunTime) : nextRunTime;

  // Use provided timezone for display, fallback to UTC
  const formatted = formatInTimezone(
    date,
    displayTimezone,
    {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    },
    locale,
  );

  return formatted;
}

/**
 * Get a human-readable timezone name
 * @param timezone - IANA timezone identifier
 * @param locale - The UI language of the label
 * @returns Human-readable name
 */
export function getTimezoneDisplayName(
  timezone: string,
  locale: Locale = "en",
): string {
  if (timezone === "not-set") {
    return getMessage(locale, "format.notSet");
  }

  if (timezone === "UTC") {
    return "UTC";
  }

  // Convert America/New_York to "New York (EST)"
  try {
    const parts = timezone.split("/");
    const city = parts[parts.length - 1].replace(/_/g, " ");
    const abbr = getTimezoneAbbreviation(timezone);
    if (abbr && abbr !== timezone) {
      return `${city} (${abbr})`;
    }
    // If abbreviation is same as timezone or not found, show timezone with underscores replaced
    const timezoneDisplay = timezone.replace(/_/g, " ");
    return `${city} (${timezoneDisplay})`;
  } catch {
    return timezone.replace(/_/g, " ");
  }
}

/**
 * Get the GMT offset for a given timezone, e.g. "GMT+9" or "UTC"
 */
export function getTimezoneGmtOffset(timezone: string): string {
  if (timezone === "not-set" || !timezone) return "";
  try {
    const date = new Date();
    const formatted = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "short",
    }).format(date);

    // Common outputs look like "1/1/2024, GMT+9" or "1/1/2024, UTC"
    const match = formatted.match(/(GMT[+\-]\d{1,2}|UTC)/i);
    return match ? match[0].toUpperCase() : "";
  } catch {
    return "";
  }
}
