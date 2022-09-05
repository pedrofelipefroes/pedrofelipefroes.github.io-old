import * as React from "react"
import c from "classnames"
import PropTypes from "prop-types"

import { AnchorLink } from "gatsby-plugin-anchor-links"

import { navigationLink } from "./navigation-link.module.css"

const NavigationLink = ({ children, className, to, ...other }) => {
    const internal = /^\/(?!\/)/.test(to)
    const classNames = c(navigationLink, className, "font-500 font-monospace js-interactable-link text-ms-1neg text-uppercase")

    if (internal) {
        return (
            <AnchorLink className={classNames} to={to} {...other}>
                {children}
            </AnchorLink>
        )
    }

    return (
        <a className={classNames} href={to} {...other}>
            {children}
        </a>
    )
}

NavigationLink.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    to: PropTypes.string.isRequired,
}

export default NavigationLink