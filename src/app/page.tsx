import Layout from "@/app/layout"

import About from "@/components/page-sections/about"
import BoardMembers from "@/components/page-sections/boardMembers"
import Contact from "@/components/page-sections/contact"
import Events from "@/components/page-sections/events"
import Footer from "@/components/page-sections/footer"
import Hero from "@/components/page-sections/hero"
import Office from "@/components/page-sections/office"
import { generateSeoMetadata, generateSeoViewport } from "@/components/seo"

import { Metadata, Viewport } from "next"

export const revalidate = 3600 // 1 hour

export function generateMetadata(): Metadata {
  return generateSeoMetadata({})
}

export function generateViewport(): Viewport {
  return generateSeoViewport()
}

export default function Home() {
  return (
    <Layout>
      <Hero />
      <About />
      <Events />
      <Office />
      <BoardMembers />
      <Contact />
      <Footer />
    </Layout>
  )
}
