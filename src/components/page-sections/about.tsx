import DiscordButton from "@components/ui/discordButton"
import MemberButton from "@components/ui/memberButton"
import OtherButton from "@components/ui/otherButton"

import Image from "next/image"

import * as styles from "./about.module.css"

const About = () => {
  return (
    <section>
      <div className={styles.container}>
        <div className={"no-mobile " + styles.image}>
          <Image
            src="/about.jpg"
            alt="To medlemmer spiller sammen"
            width={640}
            height={480}
          />
          <p className="photo-credit">Foto: 장태민, Studentenes Fotoklubb</p>
        </div>
        <div>
          <h2 className="left-section-header">Hvem er vi?</h2>
          <div>
            <p>
              UiO Gaming er en forening med hovedfokus på å danne et
              inkluderende fellesskap rundt videospill og e-sport. Hos oss er
              det enkelt å skaffe seg venner, ettersom alle har felles
              interesser. Vi arrangerer ukentlige spillkvelder og fysiske
              sosiale arrangementer, som for eksempel brettspillkvelder og
              sosiale sammenkomster. Vår hovedkanal er en aktiv Discord-server
              hvor man kan møte nye folk med felles interesser og game med andre
              studenter.
            </p>
            <div className={styles.joinSection}>
              <h3>Interessert?</h3>
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
