"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import {
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Car,
  Gavel,
  Clock,
  Eye,
  MapPin,
  Shield,
  CheckCircle,
  Users,
  FileText,
  Truck,
  Award,
  ArrowRight,
  BookOpen,
  Youtube,
  Instagram,
  Linkedin,
  Phone,
  Mail,
  LocateOffIcon as LocationIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useLanguage, languages } from "@/components/language-provider"

function BrokerMotorsContent() {
  const [activeSection, setActiveSection] = useState("home")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    car: "",
    mileage: "",
    media: "",
    privacy: false,
  })
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { scrollY } = useScroll()

  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      "/audi-r8-v10-plus-luxury-sports-car-studio-photo.jpg",
      "/porsche-911-gt3-miami-blue-luxury-sports-car-studi.jpg",
      "/brand/broker-motors-logo.png",
    ]

    criticalImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      document.head.appendChild(link)
    })

    // Add keyboard navigation support
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowLanguageDropdown(false)
        setShowPrivacyModal(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  const faqItems = [
    {
      question: "What are the commission rates?",
      answer:
        "Our commission structure is transparent and competitive. Seller commission is 8% + VAT for vehicles under £50k, 6% + VAT for vehicles £50k-£150k, and 5% + VAT for vehicles over £150k. Buyer's premium is 5% + VAT.",
    },
    {
      question: "How does the security deposit work?",
      answer:
        "A refundable security deposit of £1,000 is required to participate in auctions. This is fully refundable after the auction period ends, regardless of whether you win any lots. The deposit helps ensure serious bidding participation.",
    },
    {
      question: "What is a reserve price?",
      answer:
        "A reserve price is the minimum amount the seller is willing to accept. If bidding doesn't reach the reserve, the vehicle won't be sold. 'No Reserve' auctions will sell to the highest bidder regardless of the final price.",
    },
    {
      question: "How thorough are the vehicle inspections?",
      answer:
        "Every vehicle undergoes a comprehensive 200+ point inspection by certified technicians. This includes mechanical, electrical, and cosmetic assessment with detailed photography and documentation available to all bidders.",
    },
    {
      question: "How do payments work?",
      answer:
        "All payments are processed through our secure escrow service. Winning bidders have 7 days to complete payment via bank transfer. Funds are held securely until vehicle collection is arranged.",
    },
    {
      question: "What about import duties and customs?",
      answer:
        "For international buyers, we provide full documentation for customs clearance. Import duties and VAT are the buyer's responsibility. We can recommend trusted customs agents and provide all necessary paperwork.",
    },
    {
      question: "Can I return a vehicle after purchase?",
      answer:
        "All sales are final. However, our detailed inspection reports and extensive photography ensure you have complete information before bidding. We encourage viewing appointments for high-value lots.",
    },
  ]

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.privacy) {
      alert("Please accept the privacy policy to continue.")
      return
    }
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Thank you! We'll contact you within 24 hours with a valuation.")
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const featuredLots = [
    {
      id: "r8-v10-2016",
      title: "Audi R8 V10 Plus",
      year: 2016,
      mileage: 7438,
      color: "Ara Blue",
      reserve: true,
      endsAt: "2025-10-01T19:00:00Z",
      image: "/audi-r8-v10-plus-luxury-sports-car-studio-photo.jpg",
      status: "LIVE",
      currentBid: "£145,000",
    },
    {
      id: "911-gt3-9912",
      title: "Porsche 911 GT3 (991.2)",
      year: 2018,
      mileage: 5338,
      color: "Miami Blue",
      reserve: false,
      endsAt: "2025-09-20T18:30:00Z",
      image: "/porsche-911-gt3-miami-blue-luxury-sports-car-studi.jpg",
      status: "NO RESERVE",
      currentBid: "£178,500",
    },
    {
      id: "huracan-evo-2020",
      title: "Lamborghini Huracán EVO",
      year: 2020,
      mileage: 3200,
      color: "Verde Mantis",
      reserve: true,
      endsAt: "2025-09-25T20:00:00Z",
      image: "/lamborghini-huracan-evo-green-luxury-supercar-stud.jpg",
      status: "PRESTO",
      currentBid: "£195,000",
    },
    {
      id: "f-type-svr-2019",
      title: "Jaguar F-Type SVR",
      year: 2019,
      mileage: 8900,
      color: "British Racing Green",
      reserve: true,
      endsAt: "2025-09-28T17:45:00Z",
      image: "/jaguar-f-type-svr-british-racing-green-luxury-spor.jpg",
      status: "LIVE",
      currentBid: "£89,500",
    },
    {
      id: "amg-gt-63s-2021",
      title: "Mercedes-AMG GT 63 S",
      year: 2021,
      mileage: 4100,
      color: "Designo Magno Brilliant Blue",
      reserve: false,
      endsAt: "2025-09-30T19:15:00Z",
      image: "/mercedes-amg-gt-63-s-blue-luxury-grand-tourer-stud.jpg",
      status: "NO RESERVE",
      currentBid: "£142,000",
    },
    {
      id: "db11-v12-2020",
      title: "Aston Martin DB11 V12",
      year: 2020,
      mileage: 6200,
      color: "Storm Black",
      reserve: true,
      endsAt: "2025-10-02T18:00:00Z",
      image: "/aston-martin-db11-v12-black-luxury-grand-tourer-st.jpg",
      status: "PRESTO",
      currentBid: "£165,000",
    },
  ]

  const getTimeRemaining = (endDate: string) => {
    const now = new Date().getTime()
    const end = new Date(endDate).getTime()
    const difference = end - now

    if (difference <= 0) return "Ended"

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `${days}d ${hours}h`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider"
    switch (status) {
      case "LIVE":
        return `${baseClasses} bg-red-500 text-white animate-pulse`
      case "NO RESERVE":
        return `${baseClasses} bg-green-500 text-white`
      case "PRESTO":
        return `${baseClasses} bg-orange-500 text-white`
      default:
        return `${baseClasses} bg-gray-500 text-white`
    }
  }

  useEffect(() => {
    const sections = ["home", "lots", "usp", "how", "sell", "contact"]
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const navigationItems = [
    { key: "home", label: t("nav.stock") },
    { key: "lots", label: t("nav.auctions") },
    { key: "sell", label: t("nav.sell") },
    { key: "usp", label: t("nav.services") },
    { key: "how", label: t("nav.insights") },
    { key: "contact", label: t("nav.contact") },
  ]

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <nav
        className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b"
        style={{ borderColor: "var(--border)" }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3">
          <div className="flex justify-between items-center">
            <motion.div className="flex items-center">
              <img
                src="/brand/broker-motors-logo.png"
                alt="Broker Motors - Luxury Car Auctions"
                className="h-12 sm:h-10 md:h-12 w-auto"
                onError={(e) => {
                  // Fallback to text logo
                  e.currentTarget.style.display = "none"
                  e.currentTarget.nextElementSibling.style.display = "block"
                }}
              />
              <span className="text-xl font-bold hidden" style={{ color: "var(--accent)" }}>
                BROKER MOTORS
              </span>
            </motion.div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8" role="menubar">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`font-inter text-sm font-medium transition-all duration-300 relative px-3 py-2 rounded-lg ${
                    activeSection === item.key ? "font-semibold" : "hover:opacity-80"
                  }`}
                  style={{
                    color: activeSection === item.key ? "var(--accent)" : "var(--text)",
                    backgroundColor: activeSection === item.key ? "var(--accent)20" : "transparent",
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="menuitem"
                  aria-current={activeSection === item.key ? "page" : undefined}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-12 w-12 sm:h-10 sm:w-10 p-0 hover:bg-white/10"
                style={{ color: "var(--text)" }}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <Sun className="h-8 w-8 sm:h-4 sm:w-4" />
                ) : (
                  <Moon className="h-8 w-8 sm:h-4 sm:w-4" />
                )}
              </Button>

              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="hover:bg-white/10 px-4 sm:px-3 py-3 sm:py-2"
                  style={{ color: "var(--text)" }}
                  aria-label="Select language"
                  aria-expanded={showLanguageDropdown}
                  aria-haspopup="true"
                >
                  <Globe className="h-8 w-8 sm:h-4 sm:w-4 mr-2 sm:mr-2" />
                  <span className="text-base sm:text-sm font-medium">
                    {languages[language].flag} <span className="hidden sm:inline">{language}</span>
                  </span>
                </Button>

                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-2 right-0 min-w-[120px] sm:min-w-[150px]"
                    role="menu"
                    aria-label="Language options"
                  >
                    <div className="card p-2 space-y-1">
                      {Object.entries(languages).map(([code, lang]) => (
                        <button
                          key={code}
                          onClick={() => {
                            setLanguage(code as keyof typeof languages)
                            setShowLanguageDropdown(false)
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:opacity-80 rounded-lg transition-colors flex items-center space-x-2"
                          style={{ color: "var(--text)" }}
                          role="menuitem"
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              <Button
                className="btn--primary hidden sm:flex px-4 py-2 rounded-lg font-medium"
                onClick={() => scrollToSection("contact")}
              >
                {t("nav.register")}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
          aria-label="Luxury cars in showroom background video"
        >
          <source src="/media/hero.webm" type="video/webm" />
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brokerautomotive2-HXFq89EaeL3Okl2DBwRyej9IfCLoWp.mp4" type="video/mp4" />
        </video>

        {/* Video Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 pt-24 z-20">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-6"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-4 py-2 inline-block">
              <p className="text-sm font-light uppercase tracking-widest text-blue-400">{t("hero.badge")}</p>
            </div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
              {t("hero.title")}
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-6 py-4 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed">{t("hero.subtitle")}</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.0 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
          >
            <Button
              size="lg"
              className="btn--primary h-14 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex-1"
            >
              <Gavel className="mr-2 h-5 w-5" />
              {t("hero.ctaBid")}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 text-lg border-white/30 text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105 bg-transparent backdrop-blur-sm flex-1"
              onClick={() => scrollToSection("sell")}
            >
              <Car className="mr-2 h-5 w-5" />
              {t("hero.ctaSell")}
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white z-20"
          aria-label="Scroll down for more content"
        >
          <ChevronDown size={24} />
        </motion.div>
      </section>

      <section id="lots" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--bg)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "var(--text)" }}
            >
              {t("lots.title")}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
                {t("lots.description")}
              </p>
            </div>
          </motion.div>

          {/* Car Lots Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredLots.map((lot, index) => (
              <motion.div
                key={lot.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                itemScope
                itemType="https://schema.org/Vehicle"
              >
                {/* Car Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={lot.image || "/placeholder.svg"}
                    alt={`${lot.title} ${lot.year}`}
                    className="w-full h-48 sm:h-56 object-cover transition-transform duration-300 hover:scale-105"
                    itemProp="image"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-3 left-3">
                    <span className={getStatusBadge(lot.status)}>{lot.status}</span>
                  </div>

                  {/* Reserve Badge */}
                  {lot.reserve && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-md bg-black/70 text-white backdrop-blur-sm">
                        {t("lots.reserve")}
                      </span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6">
                  {/* Car Title */}
                  <h3
                    className="text-lg sm:text-xl font-bold mb-2 leading-tight"
                    style={{ color: "var(--text)" }}
                    itemProp="name"
                  >
                    {lot.title} ({lot.year})
                  </h3>

                  {/* Car Details */}
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" style={{ color: "var(--accent)" }} />
                      <span style={{ color: "var(--muted)" }}>
                        {lot.mileage.toLocaleString()} {t("lots.mileage")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2"
                        style={{
                          backgroundColor: lot.color.toLowerCase().includes("blue")
                            ? "#0066cc"
                            : lot.color.toLowerCase().includes("green")
                              ? "#00cc66"
                              : lot.color.toLowerCase().includes("black")
                                ? "#333333"
                                : "#cccccc",
                        }}
                      />
                      <span style={{ color: "var(--muted)" }}>{lot.color}</span>
                    </div>
                  </div>

                  {/* Current Bid */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                        Current Bid
                      </span>
                      <span className="text-lg font-bold" style={{ color: "var(--accent)" }}>
                        {lot.currentBid}
                      </span>
                    </div>
                  </div>

                  {/* Countdown Timer */}
                  <div
                    className="flex items-center justify-between mb-4 p-3 rounded-lg"
                    style={{ backgroundColor: "var(--card)" }}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" style={{ color: "var(--accent)" }} />
                      <span className="text-sm font-medium" style={{ color: "var(--text)" }}>
                        {t("lots.endsIn")}
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: "var(--accent)" }}>
                      {getTimeRemaining(lot.endsAt)}
                    </span>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full btn--primary rounded-lg font-medium transition-all duration-300 hover:scale-105"
                    onClick={() => {
                      // Placeholder for lot detail navigation
                      console.log(`Opening lot: ${lot.id}`)
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    {t("lots.viewLot")}
                  </Button>
                </div>

                {/* Schema.org structured data */}
                <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "Vehicle",
                      name: `${lot.title} (${lot.year})`,
                      brand: lot.title.split(" ")[0],
                      model: lot.title.split(" ").slice(1).join(" "),
                      vehicleModelDate: lot.year.toString(),
                      mileageFromOdometer: {
                        "@type": "QuantitativeValue",
                        value: lot.mileage,
                        unitCode: "KMT",
                      },
                      color: lot.color,
                      offers: {
                        "@type": "Offer",
                        priceCurrency: "GBP",
                        price: lot.currentBid.replace(/[£,]/g, ""),
                        availability: "https://schema.org/InStock",
                      },
                      image: [lot.image],
                      url: `https://brokermotors.example/lot/${lot.id}`,
                    }),
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* View All Lots CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12 sm:mt-16"
          >
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 bg-transparent"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              View All Auctions
            </Button>
          </motion.div>
        </div>
      </section>

      {/* USP Cards Grid */}
      <section id="usp" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--card)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "var(--text)" }}
            >
              {t("usp.title")}
            </h2>
          </motion.div>

          {/* USP Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {Array.isArray(t("usp.items")) &&
              t("usp.items").map((item: any, index: number) => {
                const icons = [Award, FileText, Shield, Truck]
                const IconComponent = icons[index]

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="card p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="flex justify-center mb-6">
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                      >
                        <IconComponent className="w-8 h-8" style={{ color: "var(--accent)" }} />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                      {item.t}
                    </h3>

                    <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                      {item.d}
                    </p>
                  </motion.div>
                )
              })}
          </div>
        </div>
      </section>

      {/* How it Works Steps */}
      <section id="how" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--bg)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "var(--text)" }}
            >
              {t("how.title")}
            </h2>
          </motion.div>

          {/* How it Works Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {Array.isArray(t("how.steps")) &&
              t("how.steps").map((step: any, index: number) => {
                const icons = [Users, Shield, Gavel, Truck]
                const IconComponent = icons[index]

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="card p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                      {/* Step Number */}
                      <div
                        className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        {index + 1}
                      </div>

                      <div className="flex justify-center mb-6 mt-4">
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                        >
                          <IconComponent className="w-8 h-8" style={{ color: "var(--accent)" }} />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                        {step.t}
                      </h3>

                      <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                        {step.d}
                      </p>
                    </div>

                    {/* Arrow connector (except for last item) */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6" style={{ color: "var(--accent)" }} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
          </div>

          {/* CTA for Guide */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-3 text-lg rounded-xl transition-all duration-300 hover:scale-105 bg-transparent"
              style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
            >
              <BookOpen className="mr-2 h-5 w-5" />
              {t("how.guide")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Guarantees & Inspections */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--card)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "var(--text)" }}
            >
              {t("guarantees.title")}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
                {t("guarantees.description")}
              </p>
            </div>
          </motion.div>

          {/* Guarantees Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                >
                  <FileText className="w-8 h-8" style={{ color: "var(--accent)" }} />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                {t("guarantees.inspection")}
              </h3>

              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                Comprehensive 200+ point inspection with detailed photography and documentation.
              </p>

              <Button
                variant="outline"
                className="w-full rounded-lg transition-all duration-300 hover:scale-105 bg-transparent"
                style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
              >
                {t("guarantees.viewReport")}
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                >
                  <Shield className="w-8 h-8" style={{ color: "var(--accent)" }} />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                {t("guarantees.escrow")}
              </h3>

              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Secure payment processing with full KYC/AML compliance and buyer protection.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="card p-6 sm:p-8 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="flex justify-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                >
                  <Truck className="w-8 h-8" style={{ color: "var(--accent)" }} />
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                {t("guarantees.transport")}
              </h3>

              <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                Professional enclosed transport with full insurance coverage across UK and EU.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights & News */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--bg)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "var(--text)" }}
            >
              {t("insights.title")}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed" style={{ color: "var(--muted)" }}>
                {t("insights.description")}
              </p>
            </div>
          </motion.div>

          {/* Insights Articles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <img
                src="/placeholder.svg?height=200&width=400&text=Porsche+911+Market+Analysis"
                alt="Porsche 911 Market Analysis"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
                  Porsche 911 Market Trends 2025
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                  Analysis of current market values and investment potential for classic and modern 911 variants.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg transition-all duration-300 hover:scale-105 bg-transparent"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  Read More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <img
                src="/placeholder.svg?height=200&width=400&text=Auction+Bidding+Guide"
                alt="Auction Bidding Guide"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
                  First-Time Bidder's Guide
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                  Essential checklist and strategies for successful luxury car auction participation.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg transition-all duration-300 hover:scale-105 bg-transparent"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  Read More
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <img
                src="/placeholder.svg?height=200&width=400&text=Import+Tax+Guide"
                alt="Import Tax Guide"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
                  UK/EU Import & Tax Guide
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
                  Complete guide to import duties, VAT, and registration requirements for luxury vehicles.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg transition-all duration-300 hover:scale-105 bg-transparent"
                  style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
                >
                  Read More
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="sell" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--card)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "var(--text)" }}
            >
              {t("sell.title")}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: "var(--text)" }}>
                  Why sell with Broker Motors?
                </h3>

                <div className="space-y-4">
                  {Array.isArray(t("sell.bullets")) &&
                    t("sell.bullets").map((bullet: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: "var(--accent)" }}
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg" style={{ color: "var(--text)" }}>
                          {bullet}
                        </span>
                      </motion.div>
                    ))}
                </div>
              </div>

              {/* Process Steps */}
              <div className="card p-6 sm:p-8">
                <h4 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                  Simple 3-Step Process
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      1
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "var(--text)" }}>
                        Submit Details
                      </p>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>
                        Complete the form with your vehicle information
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      2
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "var(--text)" }}>
                        Professional Assessment
                      </p>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>
                        Our experts evaluate and photograph your vehicle
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      3
                    </div>
                    <div>
                      <p className="font-medium" style={{ color: "var(--text)" }}>
                        Go Live
                      </p>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>
                        Your vehicle goes to auction with global reach
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card p-6 sm:p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>
                  Get Your Free Valuation
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                        {t("sell.form.name")} *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                        style={{
                          backgroundColor: "var(--bg)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                          focusRingColor: "var(--accent)",
                        }}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                        {t("sell.form.email")} *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                        style={{
                          backgroundColor: "var(--bg)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                        }}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.phone")} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                      placeholder="+44 7XXX XXXXXX"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.car")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.car}
                      onChange={(e) => handleInputChange("car", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                      placeholder="e.g. Porsche 911 Carrera S 2020"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.km")} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.mileage}
                      onChange={(e) => handleInputChange("mileage", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                      placeholder="e.g. 25,000 km"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.media")}
                    </label>
                    <input
                      type="url"
                      value={formData.media}
                      onChange={(e) => handleInputChange("media", e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
                      style={{
                        backgroundColor: "var(--bg)",
                        borderColor: "var(--border)",
                        color: "var(--text)",
                      }}
                      placeholder="Link to photos or videos (optional)"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      checked={formData.privacy}
                      onChange={(e) => handleInputChange("privacy", e.target.checked)}
                      className="mt-1"
                      style={{ accentColor: "var(--accent)" }}
                    />
                    <label htmlFor="privacy" className="text-sm" style={{ color: "var(--muted)" }}>
                      {t("sell.form.privacy")} and agree to be contacted regarding my vehicle valuation.
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn--primary py-4 text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    {t("sell.form.submit")}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--bg)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "var(--text)" }}
            >
              {t("faq.title")}
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqItems.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center hover:opacity-80 transition-colors"
                  style={{ color: "var(--text)" }}
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                >
                  {faq.question}
                  <ChevronDown
                    className={`w-5 h-5 transition-transform ${openFaqIndex === index ? "rotate-180" : ""}`}
                  />
                </button>
                {openFaqIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="px-6 py-4 border-t"
                    style={{ borderColor: "var(--border)" }}
                  >
                    <p style={{ color: "var(--muted)" }}>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section
        className="py-16 sm:py-24 lg:py-32"
        style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
      >
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">{t("ctaFinal.title")}</h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of collectors and enthusiasts who have chosen Broker Motors for their dream cars.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Button
                size="lg"
                className="text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: "var(--accent-contrast)", color: "var(--accent)" }}
              >
                {t("ctaFinal.cta1")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 bg-transparent"
                style={{ borderColor: "var(--accent-contrast)", color: "var(--accent-contrast)" }}
              >
                {t("ctaFinal.cta2")}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16" style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <img
                  src="/brand/broker-motors-big.png"
                  alt="Broker Motors"
                  className="h-16 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = "block"
                  }}
                />
                <div className="hidden text-2xl font-bold" style={{ color: "var(--accent)" }}>
                  BROKER MOTORS
                </div>
              </div>
              <p className="mb-6 max-w-md" style={{ color: "var(--muted)" }}>
                The leading platform for luxury car auctions and trading. Curated selection, total transparency, secure
                payments.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://youtube.com/@brokermotors"
                  className="transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a
                  href="https://instagram.com/brokermotors"
                  className="transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a
                  href="https://linkedin.com/company/brokermotors"
                  className="transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
                Contact
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    +44 20 7946 0958
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4" style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    info@brokermotors.com
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <LocationIcon className="w-4 h-4 mt-0.5" style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    123 Luxury Lane
                    <br />
                    London, SW1A 1AA
                    <br />
                    United Kingdom
                  </span>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
                Legal
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="block text-sm hover:opacity-80 transition-colors text-left"
                  style={{ color: "var(--muted)" }}
                >
                  Privacy Policy
                </button>
                <a
                  href="/terms"
                  className="block text-sm hover:opacity-80 transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  Terms & Conditions
                </a>
                <a
                  href="/cookies"
                  className="block text-sm hover:opacity-80 transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  Cookie Policy
                </a>
                <a
                  href="/complaints"
                  className="block text-sm hover:opacity-80 transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  Complaints Procedure
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t text-center" style={{ borderColor: "var(--border)", color: "var(--muted)" }}>
            <p className="text-sm">
              © 2025 Broker Motors Ltd. All rights reserved. Authorised and regulated by the Financial Conduct
              Authority.
            </p>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold" style={{ color: "var(--text)" }}>
                  Privacy Policy
                </h3>
                <Button variant="ghost" size="sm" onClick={() => setShowPrivacyModal(false)} className="p-2">
                  ×
                </Button>
              </div>
              <div className="space-y-4 text-sm" style={{ color: "var(--muted)" }}>
                <p>
                  At Broker Motors, we are committed to protecting your privacy and ensuring the security of your
                  personal information.
                </p>
                <p>
                  We collect information you provide when registering, bidding, or selling through our platform. This
                  includes contact details, financial information for verification, and vehicle details.
                </p>
                <p>
                  Your information is used to facilitate auctions, verify identity for security purposes, communicate
                  about our services, and comply with legal requirements.
                </p>
                <p>
                  We implement industry-standard security measures and never sell your personal information to third
                  parties.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default function BrokerMotorsPage() {
  return <BrokerMotorsContent />
}
