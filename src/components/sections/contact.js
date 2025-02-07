import * as React from "react"
import * as styles from "./contact.module.css"

import { useTranslation } from "gatsby-plugin-react-i18next"

import {
  FaYoutube,
  FaTwitch,
  FaFacebook,
  FaGithub,
  FaDiscord,
  FaAt,
  FaInstagram,
} from "react-icons/fa"

const Contact = () => {
  const { t } = useTranslation()

  return (
    <section>
      <h2 className="section-center-header">{t("contact.title")}</h2>
      <div className={styles.container}>
        <div className={styles.item}>
          <FaAt />
          <a href="mailto:styret@uiogaming.no" target="_blank" rel="noreferrer">
            {t("contact.email")}
          </a>
        </div>
        <div className={styles.item}>
          <FaDiscord />
          <a
            href="https://discord.uiogaming.no"
            target="_blank"
            rel="noreferrer"
          >
            Discord
          </a>
        </div>
	      <div className={styles.item}>
          <FaInstagram />
          <a
            href="https://instagram.uiogaming.no"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
        </div>
	      <div className={styles.item}>
          <FaTwitch />
          <a
            href="https://twitch.uiogaming.no"
            target="_blank"
            rel="noreferrer"
          >
            Twitch
          </a>
        </div>
        <div className={styles.item}>
          <FaYoutube />
          <a
            href="https://youtube.uiogaming.no"
            target="_blank"
            rel="noreferrer"
          >
            YouTube
          </a>
        </div>
	      <div className={styles.item}>
          <FaFacebook />
          <a
            href="https://facebook.uiogaming.no"
            target="_blank"
            rel="noreferrer"
          >
            Facebook
          </a>
        </div>
        <div className={styles.item}>
          <FaGithub />
          <a
            href="https://github.uiogaming.no"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
