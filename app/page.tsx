"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Gavel,
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
  TrendingUp,
  DollarSign,
  PieChart,
  Calculator,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useLanguage, languages } from "@/components/language-provider"

function BrokerMotorsContent() {
  const [activeSection, setActiveSection] = useState("home")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [selectedCar, setSelectedCar] = useState<any>(null)
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

  const featuredCars = [
    {
      id: "volvo-xc90",
      title: "Volvo XC90 T8",
      year: 2024,
      mileage: 2500,
      color: "Crystal White Pearl",
      reserve: false,
      endsAt: "2025-01-15T19:00:00Z",
      currentBid: "£68,500",
      image: "/volvo-xc90-luxury-suv.jpg",
      badge: "LIVE",
      investmentReturn: "8.5%",
      monthlyIncome: "£485",
    },
    {
      id: "jaguar-ftype",
      title: "Jaguar F-Type R",
      year: 2023,
      mileage: 3200,
      color: "British Racing Green",
      reserve: true,
      endsAt: "2025-01-20T18:30:00Z",
      currentBid: "£89,000",
      image: "/jaguar-f-type-british-racing-green.jpg",
      badge: "NO RESERVE",
      investmentReturn: "12.3%",
      monthlyIncome: "£740",
    },
    {
      id: "landrover-44",
      title: "Land Rover Defender 110 4.4",
      year: 2024,
      mileage: 1800,
      color: "Santorini Black",
      reserve: false,
      endsAt: "2025-01-18T20:00:00Z",
      currentBid: "£95,500",
      image: "/land-rover-defender-110-black.jpg",
      badge: "PRESTO",
      investmentReturn: "9.7%",
      monthlyIncome: "£625",
    },
    {
      id: "landrover-30",
      title: "Land Rover Range Rover Sport 3.0",
      year: 2023,
      mileage: 4100,
      color: "Byron Blue",
      reserve: true,
      endsAt: "2025-01-22T19:30:00Z",
      currentBid: "£78,200",
      image: "/range-rover-sport-byron-blue.jpg",
      badge: "LIVE",
      investmentReturn: "10.1%",
      monthlyIncome: "£590",
    },
    {
      id: "maserati-levante",
      title: "Maserati Levante Trofeo",
      year: 2023,
      mileage: 2900,
      color: "Rosso Potente",
      reserve: false,
      endsAt: "2025-01-25T18:00:00Z",
      currentBid: "£125,000",
      image: "/maserati-levante-trofeo-red.jpg",
      badge: "NO RESERVE",
      investmentReturn: "15.2%",
      monthlyIncome: "£1,250",
    },
    {
      id: "bmw-serie7",
      title: "BMW Serie 7 760Li",
      year: 2024,
      mileage: 1200,
      color: "Mineral Grey Metallic",
      reserve: true,
      endsAt: "2025-01-28T19:00:00Z",
      currentBid: "£142,500",
      image: "/bmw-serie-7-mineral-grey.jpg",
      badge: "PRESTO",
      investmentReturn: "11.8%",
      monthlyIncome: "£1,180",
    },
  ]

  const faqItems = [
    {
      question: t("faq.commission.question") || "Quali sono le commissioni?",
      answer:
        t("faq.commission.answer") ||
        "Le commissioni variano dal 5% al 10% in base al valore del veicolo e ai servizi richiesti.",
    },
    {
      question: t("faq.investment.question") || "Come funzionano gli investimenti frazionati?",
      answer:
        t("faq.investment.answer") ||
        "Puoi acquistare quote di proprietà di auto di lusso a partire da €1.000. I profitti derivanti dall'uso e dalla rivendita vengono distribuiti mensilmente agli investitori.",
    },
    {
      question: t("faq.returns.question") || "Quali sono i rendimenti attesi?",
      answer:
        t("faq.returns.answer") ||
        "I rendimenti variano dal 8% al 15% annuo, con distribuzioni mensili basate sui profitti generati dal veicolo.",
    },
    {
      question: t("faq.deposit.question") || "Come funzionano i depositi di sicurezza?",
      answer:
        t("faq.deposit.answer") ||
        "Il deposito cauzionale è del 10% del valore dell'offerta ed è completamente rimborsabile se non vinci l'asta.",
    },
    {
      question: t("faq.payment.question") || "Come avviene il pagamento?",
      answer:
        t("faq.payment.answer") ||
        "Utilizziamo un sistema di escrow sicuro con pagamenti tramite bonifico bancario o carta di credito.",
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
    const sections = ["home", "lots", "usp", "investment", "sell", "contact"]
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
    { key: "home", label: t("nav.stock") || "Stock" },
    { key: "lots", label: t("nav.auctions") || "Aste" },
    { key: "investment", label: t("nav.invest") || "Investi" },
    { key: "usp", label: t("nav.services") || "Servizi" },
    { key: "sell", label: t("nav.insights") || "Insights" },
    { key: "contact", label: t("nav.contact") || "Contatti" },
  ]

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b" style={{ borderColor: "var(--border)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <img
                src="/brand/broker-motors-logo.png"
                alt="Broker Motors"
                className="h-8 sm:h-10 w-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  const fallback = target.nextElementSibling as HTMLElement
                  if (fallback) fallback.style.display = "block"
                }}
              />
              <div className="hidden font-bold text-xl" style={{ color: "var(--text)" }}>
                BROKER MOTORS
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`text-sm font-medium transition-colors hover:opacity-80 ${
                    activeSection === item.key ? "opacity-100" : "opacity-70"
                  }`}
                  style={{ color: "var(--text)" }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:opacity-80"
                  style={{ color: "var(--text)" }}
                  aria-label="Select language"
                >
                  <Globe size={18} />
                  <span className="text-sm font-medium uppercase">{language}</span>
                  <ChevronDown size={14} />
                </button>

                {showLanguageDropdown && (
                  <div
                    className="absolute right-0 top-full mt-2 py-2 w-32 rounded-lg shadow-lg border z-50"
                    style={{ background: "var(--card)", borderColor: "var(--border)" }}
                  >
                    {Object.entries(languages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code as keyof typeof languages)
                          setShowLanguageDropdown(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:opacity-80 transition-colors"
                        style={{ color: "var(--text)" }}
                        role="menuitem"
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg transition-colors hover:opacity-80"
                style={{ color: "var(--text)" }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Register Button */}
              <Button size="sm" className="btn--primary hidden sm:inline-flex">
                {t("nav.register") || "Registrati"}
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
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-6"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-tight">
              Broker Motors
            </h1>
          </motion.div>

          {/* Investment Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-6 py-4 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl md:text-2xl font-light leading-relaxed">
                {language === "it"
                  ? "Investi nelle supercar, guadagna ogni mese"
                  : "Invest in Supercars, Earn Monthly Income"}
              </p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl"
          >
            <Button
              size="lg"
              className="btn--primary h-14 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex-1"
              onClick={() => scrollToSection("investment")}
            >
              <TrendingUp className="mr-2 h-5 w-5" />
              {language === "it" ? "Inizia a investire" : "Start Investing"}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-14 text-lg border-white/30 text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105 bg-transparent backdrop-blur-sm flex-1"
              onClick={() => scrollToSection("lots")}
            >
              <Gavel className="mr-2 h-5 w-5" />
              {language === "it" ? "Scopri le aste in corso" : "Explore Live Auctions"}
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
              {language === "it" ? "Auto in Evidenza" : "Featured Cars"}
            </h2>
            <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: "var(--muted)" }}>
              {language === "it"
                ? "Scopri le nostre supercar selezionate con opportunità di investimento frazionato"
                : "Discover our curated supercars with fractional investment opportunities"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredCars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => setSelectedCar(car)}
              >
                {/* Car Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={car.image || "/placeholder.svg"}
                    alt={car.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(car.title + " luxury car studio photo")}`
                    }}
                  />

                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className={`px-3 py-1 text-xs font-bold rounded-full ${
                        car.badge === "LIVE"
                          ? "bg-green-500 text-white"
                          : car.badge === "NO RESERVE"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-black"
                      }`}
                    >
                      {car.badge}
                    </span>
                  </div>

                  {/* Investment Return Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="bg-black/80 text-white px-3 py-1 text-xs font-bold rounded-full">
                      {car.investmentReturn} APY
                    </span>
                  </div>
                </div>

                {/* Car Details */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
                        {car.title}
                      </h3>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>
                        {car.year} • {car.mileage.toLocaleString()} km • {car.color}
                      </p>
                    </div>
                  </div>

                  {/* Investment Info */}
                  <div className="grid grid-cols-2 gap-4 mb-4 p-3 rounded-lg" style={{ background: "var(--bg)" }}>
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                        {language === "it" ? "Rendita Mensile" : "Monthly Income"}
                      </p>
                      <p className="text-lg font-bold" style={{ color: "var(--accent)" }}>
                        {car.monthlyIncome}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                        {language === "it" ? "Offerta Attuale" : "Current Bid"}
                      </p>
                      <p className="text-lg font-bold" style={{ color: "var(--text)" }}>
                        {car.currentBid}
                      </p>
                    </div>
                  </div>

                  <Button
                    className="w-full btn--primary"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedCar(car)
                    }}
                  >
                    {language === "it" ? "Scopri di più" : "Learn More"}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="investment" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--card)" }}>
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
              {language === "it" ? "Come funziona l'investimento in supercar?" : "How Does Supercar Investment Work?"}
            </h2>
          </motion.div>

          {/* Investment Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: PieChart,
                title: language === "it" ? "Seleziona la quota" : "Choose Your Share",
                description:
                  language === "it"
                    ? "Scegli l'auto e la percentuale da investire a partire da €1.000"
                    : "Choose the car and percentage to invest starting from €1,000",
              },
              {
                icon: FileText,
                title: language === "it" ? "Firma digitale" : "Sign Digitally",
                description:
                  language === "it"
                    ? "Tutto online, rapido e sicuro con verifica KYC completa"
                    : "Everything online, fast and secure with complete KYC verification",
              },
              {
                icon: DollarSign,
                title: language === "it" ? "Ricevi rendite mensili" : "Receive Monthly Income",
                description:
                  language === "it"
                    ? "I profitti dall'uso e rivendita vengono distribuiti agli investitori"
                    : "Profits from usage and resale are distributed to investors",
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="flex justify-center mb-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                  >
                    <step.icon className="w-10 h-10" style={{ color: "var(--accent)" }} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                  {step.title}
                </h3>
                <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Investment CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button size="lg" className="btn--primary h-14 text-lg font-semibold rounded-xl px-8">
              <Calculator className="mr-2 h-5 w-5" />
              {language === "it" ? "Calcola il tuo rendimento gratuito" : "Get Your Free Return Estimate"}
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="usp" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--bg)" }}>
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
              {language === "it" ? "Perché investire con Broker Motors?" : "Why invest with Broker Motors?"}
            </h2>
          </motion.div>

          {/* USP Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              {
                icon: Award,
                title: language === "it" ? "Accesso esclusivo" : "Exclusive access",
                description:
                  language === "it"
                    ? "Accesso esclusivo al mercato delle supercar di lusso"
                    : "Exclusive access to the luxury supercar market",
              },
              {
                icon: PieChart,
                title: language === "it" ? "Investimenti frazionati" : "Fractional investments",
                description:
                  language === "it"
                    ? "Investimenti frazionati accessibili a tutti a partire da €1.000"
                    : "Fractional investments accessible to everyone starting from €1,000",
              },
              {
                icon: TrendingUp,
                title: language === "it" ? "Rendite garantite" : "Guaranteed returns",
                description:
                  language === "it"
                    ? "Rendite mensili garantite e trasparenti dall'8% al 15%"
                    : "Guaranteed and transparent monthly returns from 8% to 15%",
              },
              {
                icon: Users,
                title: language === "it" ? "Gestione completa" : "Full management",
                description:
                  language === "it"
                    ? "Gestione completa da parte dei nostri esperti certificati"
                    : "Full management by our certified experts",
              },
            ].map((item, index) => (
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
                    <item.icon className="w-8 h-8" style={{ color: "var(--accent)" }} />
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
                  {item.title}
                </h3>

                <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees Section */}
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
              {language === "it" ? "Sicurezza e trasparenza" : "Security and transparency"}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: language === "it" ? "Ispezione completa 200+ punti" : "Complete 200+ point inspection",
                description:
                  language === "it"
                    ? "Ogni veicolo viene ispezionato da esperti certificati con report dettagliato"
                    : "Every vehicle is inspected by certified experts with detailed report",
              },
              {
                icon: Shield,
                title: language === "it" ? "Pagamenti sicuri con escrow" : "Secure payments with escrow",
                description:
                  language === "it"
                    ? "Sistema di pagamento sicuro con escrow certificato e KYC/AML completo"
                    : "Secure payment system with certified escrow and complete KYC/AML",
              },
              {
                icon: Truck,
                title: language === "it" ? "Trasporto protetto" : "Protected transport",
                description:
                  language === "it"
                    ? "Trasporto assicurato in tutta Europa con copertura completa"
                    : "Insured transport throughout Europe with full coverage",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="card p-8 text-center hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex justify-center mb-6">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
                  >
                    <item.icon className="w-8 h-8" style={{ color: "var(--accent)" }} />
                  </div>
                </div>

                <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text)" }}>
                  {item.title}
                </h3>

                <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="sell" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--bg)" }}>
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
              {language === "it" ? "Vendi la tua auto con Broker Motors" : "Sell your car with Broker Motors"}
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Left Column - Process Steps */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-bold mb-6" style={{ color: "var(--text)" }}>
                  {language === "it" ? "Processo in 3 step" : "3-step process"}
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: language === "it" ? "Inserisci dettagli" : "Enter details",
                      description:
                        language === "it"
                          ? "Compila il form con i dettagli della tua auto"
                          : "Fill out the form with your car details",
                    },
                    {
                      step: "2",
                      title: language === "it" ? "Valutazione esperti" : "Expert valuation",
                      description:
                        language === "it"
                          ? "I nostri esperti valuteranno la tua auto in 24h"
                          : "Our experts will evaluate your car within 24h",
                    },
                    {
                      step: "3",
                      title: language === "it" ? "Vai all'asta" : "Go to auction",
                      description:
                        language === "it"
                          ? "La tua auto viene messa all'asta sulla nostra piattaforma"
                          : "Your car is put up for auction on our platform",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start space-x-4"
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white flex-shrink-0"
                        style={{ backgroundColor: "var(--accent)" }}
                      >
                        {item.step}
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2" style={{ color: "var(--text)" }}>
                          {item.title}
                        </h4>
                        <p style={{ color: "var(--muted)" }}>{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="card p-8">
                <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>
                  {language === "it" ? "Richiedi valutazione" : "Request valuation"}
                </h3>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                        {language === "it" ? "Nome" : "Name"}
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                        style={
                          {
                            background: "var(--bg)",
                            borderColor: "var(--border)",
                            color: "var(--text)",
                            "--tw-ring-color": "var(--accent)",
                          } as React.CSSProperties
                        }
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                        style={
                          {
                            background: "var(--bg)",
                            borderColor: "var(--border)",
                            color: "var(--text)",
                            "--tw-ring-color": "var(--accent)",
                          } as React.CSSProperties
                        }
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {language === "it" ? "Telefono" : "Phone"}
                    </label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                      style={
                        {
                          background: "var(--bg)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                          "--tw-ring-color": "var(--accent)",
                        } as React.CSSProperties
                      }
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {language === "it" ? "Modello" : "Model"}
                    </label>
                    <input
                      type="text"
                      placeholder={language === "it" ? "Marca/Modello/Anno" : "Make/Model/Year"}
                      className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                      style={
                        {
                          background: "var(--bg)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                          "--tw-ring-color": "var(--accent)",
                        } as React.CSSProperties
                      }
                      value={formData.car}
                      onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {language === "it" ? "Chilometraggio" : "Mileage"}
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                      style={
                        {
                          background: "var(--bg)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                          "--tw-ring-color": "var(--accent)",
                        } as React.CSSProperties
                      }
                      value={formData.mileage}
                      onChange={(e) => setFormData({ ...formData, mileage: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {language === "it" ? "Link foto/video" : "Photos/Video link"}
                    </label>
                    <input
                      type="url"
                      className="w-full px-4 py-3 rounded-lg border transition-colors focus:outline-none focus:ring-2"
                      style={
                        {
                          background: "var(--bg)",
                          borderColor: "var(--border)",
                          color: "var(--text)",
                          "--tw-ring-color": "var(--accent)",
                        } as React.CSSProperties
                      }
                      value={formData.media}
                      onChange={(e) => setFormData({ ...formData, media: e.target.value })}
                    />
                  </div>

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1"
                      checked={formData.privacy}
                      onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    />
                    <label htmlFor="privacy" className="text-sm" style={{ color: "var(--muted)" }}>
                      {language === "it"
                        ? "Acconsento al trattamento dei dati personali secondo la Privacy Policy"
                        : "I consent to the processing of personal data according to the Privacy Policy"}
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full btn--primary h-12 text-lg font-semibold"
                    disabled={!formData.privacy}
                  >
                    {language === "it" ? "Richiedi valutazione" : "Request valuation"}
                  </Button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights/Blog Section */}
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
              Insights
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: language === "it" ? "Tendenze mercato auto di lusso 2025" : "Luxury Car Market Trends 2025",
                excerpt:
                  language === "it"
                    ? "Analisi completa del mercato delle supercar e opportunità di investimento"
                    : "Complete analysis of the supercar market and investment opportunities",
              },
              {
                title:
                  language === "it"
                    ? "Guida aste: come partecipare con successo"
                    : "Auction Guide: How to Bid Successfully",
                excerpt:
                  language === "it"
                    ? "Strategie e consigli per massimizzare le tue possibilità di vincita"
                    : "Strategies and tips to maximize your chances of winning",
              },
              {
                title: language === "it" ? "Normative e tasse su import/export" : "Import & Tax Regulations",
                excerpt:
                  language === "it"
                    ? "Tutto quello che devi sapere su tasse e normative per l'import/export"
                    : "Everything you need to know about taxes and regulations for import/export",
              },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <BookOpen className="w-6 h-6 mr-3" style={{ color: "var(--accent)" }} />
                  <span className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                    {language === "it" ? "Articolo" : "Article"}
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
                  {article.title}
                </h3>

                <p className="text-base mb-4" style={{ color: "var(--muted)" }}>
                  {article.excerpt}
                </p>

                <div className="flex items-center text-sm" style={{ color: "var(--accent)" }}>
                  <span>{language === "it" ? "Leggi di più" : "Read more"}</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            ))}
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
              FAQ
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
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              {language === "it"
                ? "Unisciti a migliaia di investitori e collezionisti che hanno scelto Broker Motors"
                : "Join thousands of investors and collectors who have chosen Broker Motors"}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              {language === "it"
                ? "Inizia il tuo viaggio nel mondo degli investimenti in supercar oggi stesso"
                : "Start your journey in the world of supercar investments today"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-14 text-lg border-white/30 text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105 bg-transparent backdrop-blur-sm flex-1"
                onClick={() => scrollToSection("lots")}
              >
                {language === "it" ? "Scopri le aste" : "Explore Auctions"}
              </Button>
              <Button
                size="lg"
                className="h-14 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg flex-1 bg-white text-black hover:bg-gray-100"
              >
                {language === "it" ? "Iscriviti ora" : "Register Now"}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 sm:py-20" style={{ background: "var(--card)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="/brand/broker-motors-big.png"
                  alt="Broker Motors"
                  className="h-12 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    const fallback = target.nextElementSibling as HTMLElement
                    if (fallback) fallback.style.display = "block"
                  }}
                />
                <div className="hidden font-bold text-2xl" style={{ color: "var(--text)" }}>
                  BROKER MOTORS
                </div>
              </div>

              <p className="text-base leading-relaxed mb-6 max-w-md" style={{ color: "var(--muted)" }}>
                {language === "it"
                  ? "La piattaforma leader per aste e investimenti in auto di lusso. Selezione curata, trasparenza totale, pagamenti sicuri."
                  : "The leading platform for luxury car auctions and investments. Curated selection, total transparency, secure payments."}
              </p>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-2 rounded-lg transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
                {language === "it" ? "Contatti" : "Contact"}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone size={16} style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    +44 20 7123 4567
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={16} style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    info@brokermotors.com
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <LocationIcon size={16} className="mt-1" style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    123 Luxury Lane
                    <br />
                    London, UK SW1A 1AA
                  </span>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
                Legal
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="block text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                >
                  Privacy Policy
                </button>
                <a
                  href="#"
                  className="block text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                >
                  Cookie Policy
                </a>
                <a
                  href="#"
                  className="block text-sm transition-colors hover:opacity-80"
                  style={{ color: "var(--muted)" }}
                >
                  {language === "it" ? "Termini & Condizioni" : "Terms & Conditions"}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t pt-8 mt-12" style={{ borderColor: "var(--border)" }}>
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm" style={{ color: "var(--muted)" }}>
                © 2025 Broker Motors. All rights reserved.
              </p>
              <p className="text-sm mt-2 sm:mt-0" style={{ color: "var(--muted)" }}>
                {language === "it" ? "Autorizzato e regolamentato dalla FCA" : "Authorized and regulated by the FCA"}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Car Detail Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                  {selectedCar.title}
                </h3>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="p-2 hover:opacity-80 transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  ×
                </button>
              </div>

              <img
                src={selectedCar.image || "/placeholder.svg"}
                alt={selectedCar.title}
                className="w-full h-64 object-cover rounded-lg mb-6"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = `/placeholder.svg?height=300&width=500&query=${encodeURIComponent(selectedCar.title + " luxury car studio photo")}`
                }}
              />

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                    {language === "it" ? "Anno" : "Year"}
                  </p>
                  <p className="text-lg font-bold" style={{ color: "var(--text)" }}>
                    {selectedCar.year}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                    {language === "it" ? "Chilometraggio" : "Mileage"}
                  </p>
                  <p className="text-lg font-bold" style={{ color: "var(--text)" }}>
                    {selectedCar.mileage.toLocaleString()} km
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                    {language === "it" ? "Colore" : "Color"}
                  </p>
                  <p className="text-lg font-bold" style={{ color: "var(--text)" }}>
                    {selectedCar.color}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--muted)" }}>
                    {language === "it" ? "Rendimento APY" : "APY Return"}
                  </p>
                  <p className="text-lg font-bold" style={{ color: "var(--accent)" }}>
                    {selectedCar.investmentReturn}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="btn--primary flex-1" onClick={() => scrollToSection("investment")}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {language === "it" ? "Investi ora" : "Invest Now"}
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => scrollToSection("lots")}>
                  <Gavel className="mr-2 h-4 w-4" />
                  {language === "it" ? "Fai un'offerta" : "Place Bid"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                  Privacy Policy
                </h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-2 hover:opacity-80 transition-colors"
                  style={{ color: "var(--muted)" }}
                >
                  ×
                </button>
              </div>

              <div className="space-y-4" style={{ color: "var(--muted)" }}>
                <p>
                  {language === "it"
                    ? "Broker Motors si impegna a proteggere la privacy dei propri utenti. Questa informativa descrive come raccogliamo, utilizziamo e proteggiamo le informazioni personali."
                    : "Broker Motors is committed to protecting the privacy of its users. This policy describes how we collect, use and protect personal information."}
                </p>
                <p>
                  {language === "it"
                    ? "I dati personali vengono utilizzati esclusivamente per fornire i nostri servizi di aste e investimenti in auto di lusso, nel rispetto del GDPR."
                    : "Personal data is used exclusively to provide our luxury car auction and investment services, in compliance with GDPR."}
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
