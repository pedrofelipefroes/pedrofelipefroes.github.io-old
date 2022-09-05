import c from "classnames"
import * as React from "react"
import { Parallax } from "react-scroll-parallax"

import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import NavigationLink from "../components/navigation-link/navigation-link"
import Contact from "../components/contact/contact"

import { indexAbout, indexHeader } from "./index.module.css"

const IndexPage = () => (
  <>
    <Layout>
      <Seo title=" " />
      <header className={c(indexHeader, "grid-golden-ratio sp-inset-x sp-inset-stack-lg")}>
        <h1 className="text-ms-1">
          Froes is a designer and engineer with a knack for <span className="text-nowrap">systematic design.</span>
        </h1>
        <div>
          <NavigationLink to="/#about" className="sp-stack-xs">About</NavigationLink>
          <br />
          <NavigationLink to="/#contact">Contact</NavigationLink>
        </div>
      </header>
      <section id="about" className={c(indexAbout, "divider grid-golden-ratio sp-inset-x sp-inset-stack-md")}>
        <Parallax speed={-5}>
          <h2 className="text-ms-3">Current Head of Design Systems at Postclick. Former Design Lead at Avenue Code.</h2>
        </Parallax>
        <div className="justify-self-end text-ms-0">
          <p className="sp-inset-stack-xs">I'm a designer and computer engineer with over six years of experience who really (really) enjoys a systematic approach <span className="text-nowrap">to design.</span></p>
          <p>This means I'm right at home when dealing with design systems, developing <span className="text-smcps">CSS</span> architectures, crafting typography scales, writing documentation, and finding <span className="text-nowrap">patterns everywhere.</span></p>
        </div>
        <div>
          <NavigationLink to="https://www.dropbox.com/s/qrps0a0p1zc745k/Froes%20%E2%80%94%20Design%20Portfolio.pdf?dl=0">Work Samples (WIP)</NavigationLink>
        </div>
      </section>
      <Contact />
    </Layout>
  </>
)

export default IndexPage
