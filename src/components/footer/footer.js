import * as React from "react"
import c from "classnames"
import { StaticImage } from "gatsby-plugin-image"

import { footer, footerNotice } from "./footer.module.css"

const Footer = () => {
    return (
        <footer className={c(footer, "grid-golden-ratio text-ms-0 sp-inset-x sp-inset-stack-xs w-max-container")}>
            <p>
                This site was fully designed and developed by myself, coffee, and <a href="https://open.spotify.com/playlist/0fAnZehFEjglZCHOiGGNcY?si=dae1004bfdf44b20" className="color-on-bg js-interactable-link">a playlist filled with visual songs.</a>
            </p>
            <div className={footerNotice}>
                <address className="sp-inline-md">São Paulo, Brazil.</address>
                <div>
                    <p className="sp-inline-md">Froes © 2022.</p>
                    <StaticImage src="../../images/signature.png" alt="Froes handwritten signature in black." formats={["auto", "webp", "avif"]} layout="fixed" loading="eager" quality={100} width={58} />
                </div>
            </div>
        </footer>
    )
}

export default Footer