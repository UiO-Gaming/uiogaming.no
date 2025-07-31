import Image from "next/image"

import * as styles from "./hero.module.css"

const Hero = () => {
  return (
    <header id="hjem" className={styles.container}>
      <div className={styles.content}>
        <Image
          src="/logo_2024_black_trans.png"
          alt="UiO Gaming logo"
          width={187}
          height={256}
        />
        <p>
          En hobbyforening som ønsker å skape et sosialt miljø rundt gaming og
          e-sport på UiO
        </p>
      </div>
    </header>
  )
}

export default Hero
