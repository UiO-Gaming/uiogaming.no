import DiscordButton from "@components/ui/discordButton"
import MemberButton from "@components/ui/memberButton"
import OtherButton from "@components/ui/otherButton"

import { useTranslations } from "next-intl"
import Image from "next/image"

import * as styles from "./about.module.css"

const About = () => {
  const t = useTranslations("about")
  const tCommon = useTranslations("common")

  return (
    <section>
      <div className={styles.container}>
        <div className={"no-mobile " + styles.image}>
          <Image
            src="/about.jpg"
            alt={t("imageAlt")}
            width={640}
            height={480}
          />
          <p className="photo-credit">
            {tCommon("photo")}: 장태민, Studentenes Fotoklubb
          </p>
        </div>
        <div>
          <h2 className="left-section-header">{t("title")}</h2>
          <div>
            <p>{t("text")}</p>
            <div className={styles.joinSection}>
              <h3>{t("interested")}</h3>
              <div className={styles.buttons}>
                <MemberButton />
                <DiscordButton />
                <OtherButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
