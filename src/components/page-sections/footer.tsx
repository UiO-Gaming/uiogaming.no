import Image from "next/image"

import * as styles from "./footer.module.css"

const Footer = () => {
  return (
    <footer>
      <div className={styles.footer}>
        <Image
          src="/logo_2024_neon_trans.png"
          alt="UiO Gaming logo"
          width={187}
          height={256}
        />
        <div className={styles.links}>
          <ul className="remove-bullets">
            <li>
              <a href="https://vedtekter.uiogaming.no" rel="noreferrer">
                Vedtekter
              </a>
            </li>
            <li>
              <a href="https://innmelding.uiogaming.no" rel="noreferrer">
                Bli medlem
              </a>
            </li>
            <li>
              <a href="https://klage.uiogaming.no" rel="noreferrer">
                Klage
              </a>
            </li>
            <li>
              <a
                href="https://github.com/UiO-Gaming/uiogaming.no/"
                rel="noreferrer"
              >
                Kildekode
              </a>
            </li>
            <li>
              <a href="https://admin.uiogaming.no" rel="noreferrer">
                Adminområdet
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.orgInfo}>
          <p>Org.Nr.: 925 719 153</p>
          <address>Slemdalsveien 15, 0369 Oslo</address>
        </div>
      </div>
    </footer>
  )
}

export default Footer
