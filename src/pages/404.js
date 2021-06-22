import * as React from "react"

import { Link } from "gatsby"

import "../index.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="center">
      <h1>404: Siden finnes ikke</h1>
      <p>
        Du har nådd en blindvei, men ikke på Blindern{" "}
        <span role="img" aria-label="eyes">
          👀
        </span>
      </p>
      <Link to="/">Tilbake til hjemmesiden</Link>
    </div>
  </Layout>
)

export default NotFoundPage
