import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["no", "en"],
  defaultLocale: "no",
  localePrefix: "always",
})

// Types getLocale(), useLocale() etc. as "no" | "en" instead of string
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
  }
}
