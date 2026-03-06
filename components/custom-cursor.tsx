"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

const CLICKABLE_SELECTOR = 'a, button, [role="button"], input, select, textarea, label, [onclick]'

export function CustomCursor() {
  const { theme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 }
  const smoothX = useSpring(cursorX, springConfig)
  const smoothY = useSpring(cursorY, springConfig)

  useEffect(() => {
    const hasTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window
    setIsTouchDevice(hasTouch)
    if (hasTouch) return

    const hide = () => setIsVisible(false)
    const show = () => setIsVisible(true)

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      setIsVisible(true)

      const target = e.target as HTMLElement
      setIsPointer(target.closest(CLICKABLE_SELECTOR) !== null)
    }

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) hide()
    }

    const onVisibilityChange = () => {
      if (document.hidden) hide()
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseleave", hide)
    document.addEventListener("mouseenter", show)
    document.addEventListener("mouseout", onMouseOut)
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("blur", hide)

    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", hide)
      document.removeEventListener("mouseenter", show)
      document.removeEventListener("mouseout", onMouseOut)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("blur", hide)
    }
  }, [cursorX, cursorY])

  if (isTouchDevice) return null

  const accentColor = theme === "dark" ? "#ff0092" : "#f59e0b"

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          html, body, a, button, input, select, textarea, label,
          [role="button"], [onclick] {
            cursor: none !important;
          }
        }
      `}</style>
      <motion.div
        style={{
          position: "fixed",
          left: smoothX,
          top: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 9999,
          width: isPointer ? 40 : 20,
          height: isPointer ? 40 : 20,
          borderRadius: "50%",
          backgroundColor: isPointer ? "transparent" : accentColor,
          border: isPointer ? `2px solid ${accentColor}` : "none",
          opacity: isVisible ? 0.8 : 0,
          mixBlendMode: "difference",
        }}
        transition={{ width: { duration: 0.2 }, height: { duration: 0.2 }, opacity: { duration: 0.15 } }}
      />
      <motion.div
        style={{
          position: "fixed",
          left: cursorX,
          top: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
          zIndex: 10000,
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: accentColor,
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  )
}
