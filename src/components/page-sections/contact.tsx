import * as styles from "./contact.module.css"

import {
  FaAt,
  FaDiscord,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa"

const Contact = () => {
  return (
    <section>
      <h2 className="section-center-header">Finn oss</h2>
      <div className={styles.container}>
        <div className={styles.item}>
          <FaAt />
          <a href="mailto:styret@uiogaming.no" target="_blank" rel="noreferrer">
            E-post
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
          <FaTiktok />
          <a
            href="https://tiktok.uiogaming.no"
            target="_blank"
            rel="noreferrer"
          >
            TikTok
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
