import NotFound from "@/components/page-sections/notFound"

import { getLocale } from "next-intl/server"

export default async function LocaleNotFound() {
  const locale = await getLocale()

  return <NotFound locale={locale} />
}
