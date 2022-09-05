import React, { useEffect, useState } from "react"
import c from "classnames"

import { AnchorLink } from "gatsby-plugin-anchor-links"
import { StaticImage } from "gatsby-plugin-image"
import NavigationLink from "../navigation-link/navigation-link"

import { nav, navBody, navFooter, navHeader, navIcon, navIsExpanded, navIsVisible } from "./nav.module.css"


const Nav = () => {
    const [expanded, setExpanded] = useState(false)
    const [scrolled, setScrolled] = useState(null)
    const [visible, setVisible] = useState(true)

    const handleClick = () => {
        setExpanded(!expanded)
        document.querySelector("body").style.overflow = "revert"

        if (!expanded) {
            document.querySelector("body").style.overflow = "hidden"
        }
    }

    const icon = <svg className={c(navIcon, "icon js-interactable-link", { [navIsExpanded]: expanded })} onClick={handleClick} width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="5" y1="12.5" x2="25" y2="12.5" />
        <line x1="5" y1="16.5" x2="25" y2="16.5" />
    </svg>

    useEffect(() => {
        const handleScroll = () => {
            const previousScrollPos = scrolled
            const currentScrollPos = window.pageYOffset

            setVisible(previousScrollPos > currentScrollPos || currentScrollPos <= 0)
            setScrolled(currentScrollPos)
        }

        setScrolled(window.pageYOffset)

        document.addEventListener("scroll", handleScroll, { passive: true })

        return () => {
            document.removeEventListener("scroll", handleScroll)
        }
    }, [scrolled])

    return (
        <nav className={c(nav, { [navIsExpanded]: expanded, [navIsVisible]: visible })}>
            <div className={c(navHeader, "divider sp-inset-x", { [navIsExpanded]: expanded })}>
                <NavigationLink to="/">Froes.design</NavigationLink>
                {icon}
                <ul>
                    <li className="sp-inline-md">
                        <NavigationLink to="/#about">About</NavigationLink>
                    </li>
                    <li>
                        <NavigationLink to="/#contact">Contact</NavigationLink>
                    </li>
                </ul>
            </div>
            <div className={c(navBody, { [navIsExpanded]: expanded })}>
                <div className="divider sp-inset-x">
                    <AnchorLink to="/#about" className="color-on-bg text-decoration-none text-ms-3">
                        <span onClick={handleClick}>About</span>
                    </AnchorLink>
                </div>
                <div className="divider sp-inset-x">
                    <AnchorLink to="/#contact" className="color-on-bg text-decoration-none text-ms-3">
                        <span onClick={handleClick}>Contact</span>
                    </AnchorLink>
                </div>
            </div>
            <div className={c(navFooter, "divider sp-inset-x", { [navIsExpanded]: expanded })}>
                São Paulo, 2022.
                <StaticImage src="../../images/signature.png" alt="Froes handwritten signature in black." formats={["auto", "webp", "avif"]} layout="fixed" loading="eager" quality={100} width={58} />
            </div>
        </nav>
    )
}

export default Nav