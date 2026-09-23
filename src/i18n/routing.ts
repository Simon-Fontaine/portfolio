import { defineRouting } from "next-intl/routing";
import { locales } from "./generated/locales";

export const routing = defineRouting({
  locales,
  defaultLocale: "fr",
  localePrefix: "always",
  localeDetection: true,
  localeCookie: false,
});
