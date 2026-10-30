import About from "@/components/page-sections/about"
import BoardMembers from "@/components/page-sections/boardMembers"
import Contact from "@/components/page-sections/contact"
import Events from "@/components/page-sections/events"
import Footer from "@/components/page-sections/footer"
import Hero from "@/components/page-sections/hero"
import Office from "@/components/page-sections/office"
import { generateSeoMetadata } from "@/components/seo"

import { Metadata } from "next"
import type { Locale } from "next-intl"

export const revalidate = 3600 // 1 hour

interface HomePageParams {
  params: Promise<{
    locale: Locale
  }>
}

export async function generateMetadata({
  params,
}: HomePageParams): Promise<Metadata> {
  const { locale } = await params

  return generateSeoMetadata({ locale })
}

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Events />
      <Office />
      <BoardMembers />
      <Contact />
      <Footer />
    </>
  )
}
