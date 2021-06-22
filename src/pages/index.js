import * as React from "react"

import "../index.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

import Header from "../components/sections/header"
import About from "../components/sections/about"
import Events from "../components/sections/events"
import Blog from "../components/sections/blog"
import BoardMembers from "../components/sections/boardMembers"
import Contact from "../components/sections/contact"
import Footer from "../components/sections/footer"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <Header />
    <About />
    <Events />
    <Blog />
    <BoardMembers />
    <Contact />
    <Footer />
  </Layout>
)

export default IndexPage
