import * as styles from "./memberButton.module.css"

const MemberButton = () => {
  return (
    <a
      href="https://innmelding.uiogaming.no"
      target="_blank"
      rel="noreferrer"
      className={styles.button}
    >
      Bli medlem
    </a>
  )
}
export default MemberButton
