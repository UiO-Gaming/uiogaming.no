import * as React from "react"

import { Link } from "gatsby"

import "../index.css"

import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not found" />
    <div className="center" style={{ margin: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>404: Siden finnes ikke</h1>
      <p style={{ textAlign: "center" }}>
        Du har nådd en blindvei, men ikke på Blindern{" "}
        <span role="img" aria-label="eyes">
          👀
        </span>
      </p>
      <Link to="/" style={{ textAlign: "center", marginTop: "1rem" }}>
        Tilbake til hjemmesiden
      </Link>
    </div>
  </Layout>
)

export default NotFoundPage
