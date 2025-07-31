import { urlFor } from "@/lib/imageUrlBuilder"
import { sanityClient } from "@/lib/sanity"

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
      <h2>Styret</h2>
      <div className={styles.container}>
        {data.map((member: BoardMember) => (
          <article key={member._id} className={styles.card}>
            <div className={styles.header}>
              <div
                className={`circular-container ${styles.headerImageContainer}`}
              >
                <Image
                  src={urlFor(member.image?.asset?.url || "/person.png")
                    .width(512)
                    .height(512)
                    .url()}
                  width={256}
                  height={256}
                  className="circular"
                  alt={`Bilde av styremedlem, ${member.name}`}
                />
              </div>
              <div className={styles.info}>
                <h3>{member.name}</h3>
                <p>{member.role?.no}</p>
              </div>
            </div>
            <p>{member.bio?.no}</p>
            <div className={styles.footer}>
              <p className="text-center">
                {member.contactInfo ? (
                  member.contactInfo
                ) : (
                  <i>Ingen kontaktinfo</i>
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
