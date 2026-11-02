import { notFound } from "next/navigation"

// Catch unknown paths below a locale so they render [locale]/not-found.tsx
export default function CatchAll() {
  notFound()
}
