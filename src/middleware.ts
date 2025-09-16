import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  locales: ["no", "en"],
  defaultLocale: "no",
  localePrefix: "always",
})

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(no|en)/:path*"],
}
