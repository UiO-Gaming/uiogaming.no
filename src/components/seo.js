import * as React from "react"

import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "gatsby-plugin-react-i18next"

function Seo({ description, lang, meta, imageURL, title, author }) {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          description
          author
          url
        }
      }
    }
  `)

  const { t } = useTranslation()

  const metaAuthor = author || site.siteMetadata.author
  const metaDescription =
    description || t("header.text", site.siteMetadata.description)
  const defaultTitle = site.siteMetadata?.title

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    logo: `${site.siteMetadata.url}/logo_2024_neon_trans.png`,
    url: site.siteMetadata.url,
    sameAs: [
      "https://www.instagram.com/uio_gaming",
      "https://www.facebook.com/profile.php?id=100066853901827",
      "https://www.twitch.tv/uio_gaming",
      "https://www.youtube.com/channel/UCZhUhWT_q0oZGk0rCeov51Q",
      "https://github.com/UiO-Gaming",
    ],
    name: site.siteMetadata.title,
    description: t("longDescription"),
    email: "styret@uiogaming.no",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Slemdalsveien 15",
      addressLocality: "Oslo",
      postalCode: "0369",
      addressRegion: "Oslo",
      addressCountry: "NO",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "styret@uiogaming.no",
    },
    foundingDate: "2020-09-11",
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title ? title : defaultTitle}
      titleTemplate={title ? `%s | ${defaultTitle}` : defaultTitle}
      meta={[
        {
          name: `author`,
          content: metaAuthor,
        },
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:site_name`,
          content: site.siteMetadata.title,
        },
        {
          property: `og:title`,
          content: title ? title : defaultTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:locale`,
          content: lang,
        },
        {
          name: `twitter:creator`,
          content: metaAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ]
        .concat(
          imageURL
            ? [
                {
                  property: "og:image",
                  content: imageURL,
                },
                {
                  name: "twitter:card",
                  content: "summary_large_image",
                },
              ]
            : [
                {
                  property: "og:image",
                  content: `${site.siteMetadata.url}/logo_2024_neon_trans.png`,
                },
                {
                  name: "twitter:card",
                  content: "summary",
                },
              ]
        )
        .concat(meta)}
    >
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `no`,
  meta: [],
  description: ``,
}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
}

export default Seo
