import React from "react"
import c from "classnames"
import { Parallax } from "react-scroll-parallax";

import NavigationLink from "../navigation-link/navigation-link"

import { contact, contactHeadline } from "./contact.module.css"

const Contact = () => {
    const splitWord = (word, phrase) => {
        return word.split("").map((i) => {
            return (
                <Parallax key={"word-" + word.indexOf(i)} easing="easeOutQuad" shouldAlwaysCompleteAnimation translateX={[(-20 * phrase.length + 10 * word.indexOf(i)), 0]}>
                    <span>{i}</span>
                </Parallax>
            )
        })
    }

    const headline = "Reach Out"
    const headlineStart = headline.split(" ")[0]
    const headlineEnd = headline.split(" ")[1]

    const headlineParallax = <>
        <div className={contactHeadline}>{splitWord(headlineStart, headline)}</div>
        <div className={contactHeadline}>{splitWord(headlineEnd, headline)}</div>
    </>

    return (
        <section id="contact" className={c(contact, "divider grid-golden-ratio sp-inset-x sp-inset-stack-md")}>
            <h2 className="text-ms-4">
                {headlineParallax}
            </h2>
            <div>
                <Parallax easing="easeOutQuad" shouldAlwaysCompleteAnimation translateY={[50, 0]}>
                    <NavigationLink className="sp-stack-xs" to="mailto:hello@froes.design">hello@froes.design</NavigationLink>
                </Parallax>
                <Parallax easing="easeOutQuad" shouldAlwaysCompleteAnimation translateY={[75, 0]}>
                    <NavigationLink className="sp-stack-xs" to="https://www.linkedin.com/in/froesdesign/">in/froesdesign</NavigationLink>
                </Parallax>
                {/* <Parallax easing="easeOutQuad" shouldAlwaysCompleteAnimation translateY={[80, 0]}>
                    <NavigationLink classNames={"spacing-stack-sm"} to="https://www.instagram.com/pedrofelipefroes/">Working Not Working</NavigationLink>
                </Parallax> */}
                <Parallax easing="easeOutQuad" shouldAlwaysCompleteAnimation translateY={[125, 0]}>
                    <NavigationLink to="https://www.instagram.com/pedrofelipefroes/">@pedrofelipefroes</NavigationLink>
                </Parallax >
            </div>
        </section>
    )
}

export default Contact