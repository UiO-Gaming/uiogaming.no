import { urlFor } from "@/lib/imageUrlBuilder"
import { sanityClient } from "@/lib/sanity"

import { getLocale, getTranslations } from "next-intl/server"
import Image from "next/image"

import * as styles from "./boardMembers.module.css"

interface BoardMember {
  _id: string
  boardMember: boolean
  contactInfo?: string
  name: string
  role?: {
    no: string
    en: string
  }
  image?: {
    asset?: {
      _id: string
      url: string
    }
  }
  bio?: {
    no: string
    en: string
  }
}

const BoardMembers = async () => {
  const t = await getTranslations("boardMembers")
  const locale = (await getLocale()) as "no" | "en"

  const query = `
    *[_type == "author" && boardMember == true] | order(orderRank asc) {
      _id,
      boardMember,
      contactInfo,
      name,
      role {
        no,
        en
      },
      image {
        asset->{
          _id,
          url
        }
      },
      bio {
        no,
        en
      }
    }
  `
  const data: BoardMember[] = await sanityClient.fetch(query)

  return (
    <section>
      <h2>{t("title")}</h2>
      <div className={styles.container}>
        {data.map((member: BoardMember) => (
          <article key={member._id} className={styles.card}>
            <div className={styles.header}>
              <div
                className={`circular-container ${styles.headerImageContainer}`}
              >
                <Image
                  src={
                    member.image?.asset?.url
                      ? urlFor(member.image.asset.url)
                          .width(512)
                          .height(512)
                          .url()
                      : "/person.png"
                  }
                  width={256}
                  height={256}
                  className="circular"
                  alt={`${t("imageAlt")}, ${member.name}`}
                />
              </div>
              <div className={styles.info}>
                <h3>{member.name}</h3>
                <p>{member.role?.[locale]}</p>
              </div>
            </div>
            <p>{member.bio?.[locale]}</p>
            <div className={styles.footer}>
              <p className="text-center">
                {member.contactInfo ? (
                  member.contactInfo
                ) : (
                  <i>{t("noContact")}</i>
                )}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default BoardMembers
