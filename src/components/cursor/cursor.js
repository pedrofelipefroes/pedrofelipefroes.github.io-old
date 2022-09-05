import React, { useEffect, useRef, useState } from "react"

import { cursor, isLocked } from "./cursor.module.css"

const Cursor = () => {
    const isBrowser = typeof window !== "undefined"

    let x = isBrowser ? window.innerWidth / 2 : null
    let y = isBrowser ? window.innerHeight / 2 : null

    const ref = useRef(null)
    const endX = useRef(x)
    const endY = useRef(y)
    const [cursorLocked, setCursorLocked] = useState(false)

    useEffect(() => {
        const cursor = ref.current
        const defaultCursorSize = "1em"

        const handleScroll = () => {
            cursor.style.setProperty("--cursor-scale", 0)

            window.setTimeout(() => {
                cursor.style.setProperty("--cursor-scale", 1)
            }, 500)
        }

        const handleMouseDown = () => {
            if (!cursorLocked) {
                cursor.style.setProperty("--cursor-scale", .5)
            }
        }

        const handleMouseMove = e => {
            endX.current = e.pageX
            endY.current = e.pageY

            if (!cursorLocked) {
                cursor.style.setProperty("--cursor-top", endY.current + "px")
                cursor.style.setProperty("--cursor-left", endX.current + "px")
            }
        }

        const handleMouseUp = () => {
            if (!cursorLocked) {
                cursor.style.setProperty("--cursor-scale", 1)
            }
        }

        const handleLinkMouseEnter = e => {
            setCursorLocked(true)

            document.removeEventListener("mousemove", handleMouseMove)

            cursor.classList.add(isLocked)

            let rect = e.target.getBoundingClientRect()

            cursor.style.setProperty("--cursor-top", window.scrollY + rect.top + rect.height / 2 + "px")
            cursor.style.setProperty("--cursor-left", rect.left + rect.width / 2 + "px")
            cursor.style.setProperty("--cursor-width", "calc(" + rect.width + "px + 1.2em)")
            cursor.style.setProperty("--cursor-height", "calc(" + rect.height + "px + .8em)")

            e.target.style.setProperty("--cursor-scale", 1.05)
        }

        const handleLinkMouseLeave = e => {
            setCursorLocked(false)

            document.addEventListener("mousemove", handleMouseMove)

            cursor.classList.remove(isLocked);

            cursor.style.setProperty("--cursor-width", defaultCursorSize)
            cursor.style.setProperty("--cursor-height", defaultCursorSize)
            cursor.style.setProperty("--cursor-translateX", 0)
            cursor.style.setProperty("--cursor-translateY", 0)

            e.target.style.setProperty("--cursor-translateX", 0)
            e.target.style.setProperty("--cursor-translateY", 0)
            e.target.style.setProperty("--cursor-scale", 1)
        }

        const handleLinkMouseMove = e => {
            let rect = e.target.getBoundingClientRect()

            const halfHeight = rect.height / 2
            const topOffset = (e.y - rect.top - halfHeight) / halfHeight
            const halfWidth = rect.width / 2
            const leftOffset = (e.x - rect.left - halfWidth) / halfWidth

            cursor.style.setProperty("--cursor-translateX", `${leftOffset * 3}px`)
            cursor.style.setProperty("--cursor-translateY", `${topOffset * 3}px`)

            e.target.style.setProperty("--cursor-translateX", `${leftOffset * 6}px`)
            e.target.style.setProperty("--cursor-translateY", `${topOffset * 4}px`)
        }

        // const handleTextMouseOut = () => {
        //     cursor.style.setProperty("--cursor-width", defaultCursorSize);
        //     cursor.style.setProperty("--cursor-height", defaultCursorSize);
        // }

        // const handleTextMouseOver = ({ target }) => {
        //     const lineHeight = getComputedStyle(target).lineHeight

        //     cursor.style.setProperty("--cursor-width", "0.15em");
        //     cursor.style.setProperty("--cursor-height", "calc(" + lineHeight + " + 0.3em)");
        // }

        document.addEventListener("scroll", handleScroll)
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)

        document.querySelectorAll(".js-interactable-link").forEach((link) => {
            const isHidden = getComputedStyle(link).display === "none"

            if (!isHidden) {
                link.addEventListener("mouseenter", handleLinkMouseEnter, { passive: true })
                link.addEventListener("mouseleave", handleLinkMouseLeave, { passive: true })
                link.addEventListener("mousemove", handleLinkMouseMove, { passive: true })
            }
        })

        // document.querySelectorAll(".text-title-1:not(.is-hidden), .text-title-2:not(.is-hidden), .text-body:not(.is-hidden)").forEach((text) => {
        //     text.addEventListener("mouseout", handleTextMouseOut, { passive: true })
        //     text.addEventListener("mouseover", handleTextMouseOver, { passive: true })
        // })

        return () => {
            document.removeEventListener("scroll", handleScroll)
            document.removeEventListener("mousedown", handleMouseDown)
            document.removeEventListener("mousemove", handleMouseMove)
            document.removeEventListener("mouseup", handleMouseUp)

            document.querySelectorAll(".js-interactable-link").forEach((link) => {
                const isHidden = getComputedStyle(link).display === "none"

                if (!isHidden) {
                    link.removeEventListener("mouseenter", handleLinkMouseEnter)
                    link.removeEventListener("mouseleave", handleLinkMouseLeave)
                    link.removeEventListener("mousemove", handleLinkMouseMove)
                }
            })

            // document.querySelectorAll(".text-title-1:not(.is-hidden), .text-title-2:not(.is-hidden), .text-body:not(.is-hidden)").forEach((text) => {
            //     text.removeEventListener("mouseout", handleTextMouseOut)
            //     text.removeEventListener("mouseover", handleTextMouseOver)
            // })
        }

    }, [cursorLocked])

    return (
        <div className={cursor} ref={ref}>
            <div />
        </div>
    )
}

export default Cursor