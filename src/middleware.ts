import createMiddleware from "next-intl/middleware"

export default createMiddleware({
  locales: ["no", "en"],
  defaultLocale: "no",
  localePrefix: "always",
})

export const config = {
  // Match everything except API routes, Next internals and files with an
  // extension, so paths without a locale get redirected to one
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
