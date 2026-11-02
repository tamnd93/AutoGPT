"use client";

import { useLocale } from "@/lib/i18n";
import { getMessage } from "@/lib/i18n/translate";
import { useEffect } from "react";
import { MainDashboardPage } from "./components/MainDashboardPage/MainDashboardPage";

export default function Page() {
  const locale = useLocale();

  useEffect(() => {
    document.title = getMessage(locale, "profile4.dashboard.pageTitle");
  }, [locale]);

  return <MainDashboardPage />;
}
