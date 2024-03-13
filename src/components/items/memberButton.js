import * as React from "react"
import * as styles from "./memberButton.module.css"

import { useTranslation } from "gatsby-plugin-react-i18next"

const MemberButton = () => {
  const { t } = useTranslation()

  return (
    <a
      href="https://innmelding.uiogaming.no"
      target="_blank"
      rel="noreferrer"
      className={styles.button}
    >
      {t("join")}
    </a>
  )
}
export default MemberButton
