import * as React from "react"

import * as styles from "./back.module.css"
import { Link } from "gatsby"
import { FaArrowLeft } from "react-icons/fa"

const Back = () => (
  <Link to="/" className={styles.container}>
    <FaArrowLeft />
    <p>Tilbake</p>
  </Link>
)

export default Back
