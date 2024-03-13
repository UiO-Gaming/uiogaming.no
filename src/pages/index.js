import * as React from "react"
import { graphql } from "gatsby"
import "../index.css"

import Layout from "../components/layout"
import Seo from "../components/seo"
import LanguageSelector from "../components/items/languageSelector"

import Header from "../components/sections/header"
import About from "../components/sections/about"
import Events from "../components/sections/events"
import Office from "../components/sections/office"
import BoardMembers from "../components/sections/boardMembers"
import Contact from "../components/sections/contact"
import Footer from "../components/sections/footer"

const IndexPage = () => (
  <>
    <Layout>
      <Seo />
      <Header />
      <About />
      <Events />
      <Office />
      <BoardMembers />
      <Contact />
      <Footer />
    </Layout>
    <LanguageSelector />
  </>
)

export default IndexPage

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(
      filter: {
        ns: { in: ["common", "index", "altText"] }
        language: { eq: $language }
      }
    ) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`
