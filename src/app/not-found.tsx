import NotFound from "@/components/page-sections/notFound"

import { defaultLocale } from "@/i18n"

import { Metadata } from "next"
import { getTranslations } from "next-intl/server"

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations({ locale: defaultLocale, namespace: "404" })

  return { title: `${t("title")} | UiO Gaming` }
}

// Rendered when [locale]/layout.tsx rejects an unknown locale (e.g. /de),
// so there is no valid locale to use
export default function RootNotFound() {
  return <NotFound locale={defaultLocale} />
}
