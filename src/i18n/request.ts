import { getRequestConfig } from "next-intl/server";
import { locales } from "./generated/locales";
import { loadMessages } from "./generated/messages";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested && locales.includes(requested) ? requested : "fr";
  return { locale, messages: await loadMessages(locale) };
});
