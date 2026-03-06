"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { useTheme } from "@/components/theme-provider"

const CLICKABLE_SELECTOR = 'a, button, [role="button"], input, select, textarea, label'

export function CustomCursor() {
  const { theme } = useTheme()
  const [enabled, setEnabled] = useState(false)
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: -100, y: -100 })
  const smoothPos = useRef({ x: -100, y: -100 })
  const visible = useRef(false)
  const hovering = useRef(false)
  const rafId = useRef<number>(0)

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t

  const animate = useCallback(() => {
    smoothPos.current.x = lerp(smoothPos.current.x, pos.current.x, 0.15)
    smoothPos.current.y = lerp(smoothPos.current.y, pos.current.y, 0.15)

    const outer = outerRef.current
    const inner = innerRef.current
    if (outer && inner) {
      const opacity = visible.current ? 1 : 0
      const size = hovering.current ? 40 : 20

      outer.style.transform = `translate(${smoothPos.current.x - size / 2}px, ${smoothPos.current.y - size / 2}px)`
      outer.style.width = `${size}px`
      outer.style.height = `${size}px`
      outer.style.opacity = String(opacity * 0.8)
      outer.style.backgroundColor = hovering.current ? "transparent" : "var(--cursor-color)"
      outer.style.border = hovering.current ? "2px solid var(--cursor-color)" : "none"

      inner.style.transform = `translate(${pos.current.x - 2.5}px, ${pos.current.y - 2.5}px)`
      inner.style.opacity = String(opacity)
    }

    rafId.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches
    if (!hasFinePointer) return

    setEnabled(true)

    const hide = () => { visible.current = false }

    const onMouseMove = (e: MouseEvent) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      visible.current = true

      const target = e.target as HTMLElement
      hovering.current = target.closest(CLICKABLE_SELECTOR) !== null
    }

    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget) hide()
    }

    const onVisibilityChange = () => {
      if (document.hidden) hide()
    }

    rafId.current = requestAnimationFrame(animate)

    document.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseleave", hide)
    document.addEventListener("mouseout", onMouseOut)
    document.addEventListener("visibilitychange", onVisibilityChange)
    window.addEventListener("blur", hide)

    return () => {
      cancelAnimationFrame(rafId.current)
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseleave", hide)
      document.removeEventListener("mouseout", onMouseOut)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("blur", hide)
    }
  }, [animate])

  if (!enabled) return null

  const accentColor = theme === "dark" ? "#ff0092" : "#f59e0b"

  return (
    <>
      <style jsx global>{`
        @media (pointer: fine) {
          html, body, a, button, input, select, textarea, label,
          [role="button"] {
            cursor: none !important;
          }
        }
      `}</style>
      <div
        ref={outerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: accentColor,
          pointerEvents: "none",
          zIndex: 9999,
          opacity: 0,
          mixBlendMode: "difference",
          willChange: "transform, width, height, opacity",
          transition: "width 0.2s, height 0.2s, background-color 0.2s, border 0.2s",
          ["--cursor-color" as string]: accentColor,
        }}
      />
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: "50%",
          backgroundColor: accentColor,
          pointerEvents: "none",
          zIndex: 10000,
          opacity: 0,
          willChange: "transform, opacity",
        }}
      />
    </>
  )
}
