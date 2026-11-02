import { formatEn } from "./format.en";

export const formatVi: Partial<Record<keyof typeof formatEn, string>> = {
  "format.justNow": "vừa xong",
  "format.minutesAgo": "{count} phút trước",
  "format.hoursAgo": "{count} giờ trước",
  "format.daysAgo": "{count} ngày trước",
  "format.notSet": "Chưa đặt",
};
