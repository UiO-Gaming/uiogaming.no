import createMiddleware from "next-intl/middleware"

import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Match everything except API routes, Next internals and files with an
  // extension, so paths without a locale get redirected to one
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}
