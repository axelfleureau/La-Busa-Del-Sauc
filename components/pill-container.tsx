"use client"

import type React from "react"

import { useTheme } from "./theme-provider"
import { cn } from "@/lib/utils"

interface PillContainerProps {
  children: React.ReactNode
  variant?: "default" | "accent" | "outline"
  className?: string
  onClick?: () => void
}

export function PillContainer({ children, variant = "default", className, onClick }: PillContainerProps) {
  const { theme } = useTheme()

  const baseClasses = "pill-container"
  const variantClasses = {
    default: theme === "dark" ? "pill-dark" : "pill-light",
    accent: "pill-accent",
    outline: theme === "dark" ? "pill-outline-dark" : "pill-outline-light",
  }

  return (
    <div
      className={cn(baseClasses, variantClasses[variant], className, onClick && "cursor-pointer hover:scale-105")}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
