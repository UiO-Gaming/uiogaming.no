import * as React from "react"
import * as styles from "./office.module.css"

const Office = () => (
  <section>
    <h2>Kontoret</h2>
    <div className={styles.container}>
      <p>
        Vi har et foreningskontor på Chateau Neuf der man kan bruke utstyret
        vårt og henge med andre medlemmer!
      </p>

      <iframe
        className={styles.frame}
        src="https://www.google.com/maps/embed?pb=!4v1695744274768!6m8!1m7!1sCAoSLEFGMVFpcFBiSUJEWVhFcTFwMDBxWDZPamlhNXc2RjFvVEo2RWlYdmNNSnFM!2m2!1d59.9324458!2d10.7129466!3f300!4f0!5f0.7820865974627469"
        allowfullscreen="true"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </section>
)

export default Office
