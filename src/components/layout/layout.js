import * as React from "react"
import PropTypes from "prop-types"
import { ParallaxProvider } from "react-scroll-parallax"

import Cursor from "../cursor/cursor"
import Footer from "../footer/footer"
import Nav from "../nav/nav"

import { layout } from "./layout.module.css"

const Layout = ({ children }) => {
  return (
    <ParallaxProvider>
      <Nav />
      <main className={layout}>
        {children}
      </main>
      <Footer />
      <Cursor />
    </ParallaxProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
