import * as React from "react"
import c from "classnames"
import { AnchorLink } from "gatsby-plugin-anchor-links"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"

import { notFound } from "../pages/not-found.module.css"

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Not Found" />
    <section className={c(notFound, "divider grid-golden-ratio sp-inset-x sp-inset-stack-md")}>
      <div>
        <h1 className="sp-stack-xs text-ms-4">Not all those who wander are lost.</h1>
        <p className="text-ms-1">
          A lyric from an <a href="https://open.spotify.com/track/0Z3JiHn6mhcObPmKhV9WRW?si=DGv5aAaWQG6Vjr0DbF4VBw" className="color-on-bg js-interactable-link text-nowrap">homonymous song</a> from Lana Del Rey.
        </p>
      </div>
      <p className="text-ms-0">
        (But you are definetly lost. <AnchorLink to="/" className="color-on-bg js-interactable-link text-nowrap">Go back home.</AnchorLink>)
      </p>
    </section>
  </Layout>
)

export default NotFoundPage
