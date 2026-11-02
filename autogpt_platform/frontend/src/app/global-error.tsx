"use client";

import { ErrorCard } from "@/components/molecules/ErrorCard/ErrorCard";
import { LocaleProvider } from "@/lib/i18n";
import {
  DEFAULT_LOCALE,
  isLocale,
  LOCALE_COOKIE,
  type Locale,
} from "@/lib/i18n/locale";
import { getMessage } from "@/lib/i18n/translate";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`),
  );
  const value = match ? decodeURIComponent(match[1]) : undefined;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export default function GlobalError({ error, reset }: Props) {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  useEffect(() => {
    setLocale(readLocaleCookie());
  }, []);

  return (
    <html>
      <body>
        <div
          // TODO(tokens): no exact role for bg-gray-50 (#F9FAFB)
          className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="relative w-full max-w-xl lg:bottom-[4rem]">
            <LocaleProvider locale={locale}>
              <ErrorCard
                responseError={{
                  message:
                    error.message ||
                    getMessage(locale, "errors1.error.unexpected.message"),
                }}
                context={getMessage(locale, "errors1.error.unexpected.context")}
                onRetry={reset}
              />
            </LocaleProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
