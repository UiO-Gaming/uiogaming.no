import { useTranslations } from "next-intl"
import Image from "next/image"

import * as styles from "./hero.module.css"

const Hero = () => {
  const t = useTranslations("hero")

  return (
    <header id="hjem" className={styles.container}>
      <div className={styles.content}>
        <Image
          src="/logo_2024_black_trans.png"
          alt="UiO Gaming logo"
          width={187}
          height={256}
        />
        <p>{t("text")}</p>
      </div>
    </header>
  )
}

export default Hero
