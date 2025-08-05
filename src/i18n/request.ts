import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const locale = cookieStore.get("locale")?.value || "no"

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})
