import { useTranslations } from "next-intl"

import * as styles from "./memberButton.module.css"

const MemberButton = () => {
  const t = useTranslations("common")

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
