"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

const heroImages = [
  "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb819fd354695ec0384_ambiente_busa_esterno.jpg",
  "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb83da47a9b8bc470d7_ambiente_busa_interno_1.jpg",
  "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb863459893cd156685_ambiente_busa_interno_2.jpg",
]

export function HeroSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    if (isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length)
    }, 12000) // Updated to 12-second intervals for professional pacing

    return () => clearInterval(interval)
  }, [isHovered])

  return (
    <div
      className="absolute inset-0 z-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: "easeInOut" }} // Slower, more elegant transitions
          className="absolute inset-0"
        >
          <div className="w-full h-full overflow-hidden">
            <img
              src={heroImages[currentIndex] || "/placeholder.svg"}
              alt={`Hero ${currentIndex + 1}`}
              className="w-full h-full object-cover ken-burns"
            />
          </div>
          <div className="absolute inset-0 gradient-overlay" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        <div className="professional-container glass-morphism flex space-x-3 px-6 py-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? theme === "dark"
                    ? "bg-[#ff0092] scale-125 shadow-lg shadow-[#ff0092]/50"
                    : "bg-amber-400 scale-125 shadow-lg shadow-amber-400/50"
                  : "bg-white/60 hover:bg-white/90 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
