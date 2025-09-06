"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  ChevronDown,
  Sun,
  Moon,
  Globe,
  Gavel,
  CheckCircle,
  Users,
  FileText,
  Award,
  ArrowRight,
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
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
import { useLanguage, languages } from "@/components/language-provider"

function BrokerMotorsContent() {
  const [activeSection, setActiveSection] = useState("home")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const [showROIModal, setShowROIModal] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const [selectedCar, setSelectedCar] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [roiData, setRoiData] = useState({
    amount: 1000,
    months: 12,
    apr: 10,
  })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    car: "",
    km: "",
    year: "",
    privacy: false,
  })
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  const cars = [
    {
      id: "volvo-xc90-2017",
      title: "Volvo XC90 (2017)",
      img: "/cars/volvo-xc90-2017.jpg",
      gallery: ["/cars/volvo-xc90-2017.jpg"],
      spec: [
        "2.0 Diesel Bi-Turbo",
        "Nero metallizzato",
        'Cerchi 21" set invernale',
        "Interni pelle color sughero",
        "Full optional",
        "Impianto frenante maggiorato",
        "Motore e meccanica rigenerati km0",
      ],
      badge: "live",
      year: 2017,
      mileage: 45000,
      color: "Nero metallizzato",
    },
    {
      id: "jaguar-2018",
      title: "Jaguar (2018)",
      img: "/cars/jaguar-2018.jpg",
      gallery: ["/cars/jaguar-2018.jpg"],
      spec: ["Dettagli in aggiornamento"],
      badge: "soon",
      year: 2018,
      mileage: 32000,
      color: "British Racing Green",
    },
    {
      id: "land-rover-44-2017",
      title: "Land Rover 4.4 (2017)",
      img: "/cars/land-rover-44-2017.jpg",
      gallery: ["/cars/land-rover-44-2017.jpg"],
      spec: ["V8 Diesel 4.4", "Pacchetto luxury", "Sospensioni ad aria"],
      badge: "noReserve",
      year: 2017,
      mileage: 58000,
      color: "Santorini Black",
    },
    {
      id: "land-rover-30-2017",
      title: "Land Rover 3.0 (2017)",
      img: "/cars/land-rover-30-2017.jpg",
      gallery: ["/cars/land-rover-30-2017.jpg"],
      spec: ["V6 Diesel 3.0", 'Cerchi 21/22"', "Amplificatore acustico rombo (se presente)"],
      badge: "live",
      year: 2017,
      mileage: 42000,
      color: "Fuji White",
    },
    {
      id: "maserati-levante-2018",
      title: "Maserati Levante (2018)",
      img: "/cars/maserati-levante-2018.jpg",
      gallery: ["/cars/maserati-levante-2018.jpg"],
      spec: ["3.0 Diesel", "Doppio treno invernali/estivi", "Uso rappresentanza"],
      badge: "soon",
      year: 2018,
      mileage: 28000,
      color: "Blu Emozione",
    },
    {
      id: "bmw-7-2018",
      title: "BMW Serie 7 (2018)",
      img: "/cars/bmw-7-2018.jpg",
      gallery: ["/cars/bmw-7-2018.jpg"],
      spec: [
        "3000 Diesel",
        "Blu notte metallizzato",
        "Interni pelle sabbia corallo",
        "Monitor posteriori",
        "Sedili massaggianti",
        "Consumi contenuti",
      ],
      badge: "noReserve",
      year: 2018,
      mileage: 35000,
      color: "Blu notte metallizzato",
    },
  ]

  const calculateROI = () => {
    const { amount, months, apr } = roiData
    const monthlyRate = apr / 12 / 100
    const futureValue = amount * Math.pow(1 + monthlyRate, months)
    const totalReturn = futureValue - amount
    const monthlyIncome = totalReturn / months
    return {
      monthlyIncome: monthlyIncome,
      totalReturn: totalReturn,
      futureValue: futureValue,
    }
  }

  const formatCurrency = (amount: number) => {
    const locale = language === "it" ? "it-IT" : "en-GB"
    const currency = language === "it" ? "EUR" : "GBP"
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(amount)
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
    { key: "home", label: t("nav.stock") as string },
    { key: "lots", label: t("nav.auctions") as string },
    { key: "investment", label: t("nav.invest") as string },
    { key: "usp", label: t("nav.services") as string },
    { key: "sell", label: t("nav.insights") as string },
    { key: "contact", label: t("nav.contact") as string },
  ]

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b nav">
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
                  className={`text-sm font-medium transition-colors hover:opacity-80 focusable ${
                    activeSection === item.key ? "opacity-100" : "opacity-70"
                  }`}
                  style={{
                    color: "var(--text)",
                    textDecoration: activeSection === item.key ? "underline" : "none",
                    textDecorationColor: "var(--accent)",
                  }}
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
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors hover:opacity-80 focusable"
                  style={{ color: "var(--text)" }}
                  aria-label={(t("nav.language") as string) || "Select language"}
                >
                  <Globe size={18} />
                  <span className="text-sm font-medium uppercase">{language}</span>
                  <ChevronDown size={14} />
                </button>

                {showLanguageDropdown && (
                  <div className="absolute right-0 top-full mt-2 py-2 w-40 rounded-lg shadow-lg border z-50 card">
                    {Object.entries(languages).map(([code, lang]) => (
                      <button
                        key={code}
                        onClick={() => {
                          setLanguage(code as keyof typeof languages)
                          setShowLanguageDropdown(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:opacity-80 transition-colors flex items-center space-x-2 focusable"
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
                className="p-2 rounded-lg transition-colors hover:opacity-80 focusable"
                style={{ color: "var(--text)" }}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Register Button */}
              <Button size="sm" className="btn--primary hidden sm:inline-flex focusable">
                {t("nav.register") as string}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero.webm" type="video/webm" />
          <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/brokerautomotive2-HXFq89EaeL3Okl2DBwRyej9IfCLoWp.mp4" type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(135deg, rgba(11, 11, 14, 0.8) 0%, rgba(20, 20, 24, 0.6) 100%)"
                : "linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)",
          }}
        />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6" style={{ color: "#FFFFFF" }}>
              {t("hero.title") as string}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl mb-8 leading-relaxed" style={{ color: "#FFFFFF" }}>
              {t("hero.subtitle") as string}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="btn--primary h-14 text-lg font-semibold rounded-xl px-8 focusable"
                onClick={() => scrollToSection("investment")}
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                {t("hero.ctaInvest") as string}
              </Button>
              <Button
                size="lg"
                className="btn--ghost h-14 text-lg font-semibold rounded-xl px-8 focusable"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  color: "#111217",
                }}
                onClick={() => scrollToSection("lots")}
              >
                <Gavel className="mr-2 h-5 w-5" />
                {t("hero.ctaAuctions") as string}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Cars Section */}
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
              {t("stock.title") as string}
            </h2>
          </motion.div>

          {/* Cars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card professional-hover cursor-pointer"
                onClick={() => setSelectedCar(car)}
              >
                <div className="relative">
                  <img
                    src={car.img || "/placeholder.svg"}
                    alt={car.title}
                    className="w-full h-64 object-cover rounded-t-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=300&width=500&query=${encodeURIComponent(car.title + " luxury car studio photo")}`
                    }}
                  />
                  <div className={`absolute top-4 left-4 badge badge-${car.badge}`}>
                    {t(`badges.${car.badge}`) as string}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2" style={{ color: "var(--text)" }}>
                    {car.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="font-medium" style={{ color: "var(--muted)" }}>
                        {language === "it" ? "Anno:" : "Year:"}
                      </span>
                      <span className="ml-1" style={{ color: "var(--text)" }}>
                        {car.year}
                      </span>
                    </div>
                    <div>
                      <span className="font-medium" style={{ color: "var(--muted)" }}>
                        {language === "it" ? "Km:" : "Miles:"}
                      </span>
                      <span className="ml-1" style={{ color: "var(--text)" }}>
                        {car.mileage.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <Button className="w-full btn--primary focusable">{t("stock.more") as string}</Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Section */}
      <section id="investment" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--surface)" }}>
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
              {t("invest.title") as string}
            </h2>
          </motion.div>

          {/* Investment Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: PieChart,
                title: t("invest.s1") as string,
                description:
                  language === "it"
                    ? "Scegli l'auto e la percentuale da investire a partire da €1.000"
                    : "Choose the car and percentage to invest starting from €1,000",
              },
              {
                icon: FileText,
                title: t("invest.s2") as string,
                description:
                  language === "it"
                    ? "Tutto online, rapido e sicuro con verifica KYC completa"
                    : "Everything online, fast and secure with complete KYC verification",
              },
              {
                icon: DollarSign,
                title: t("invest.s3") as string,
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
            <Button
              size="lg"
              className="btn--primary h-14 text-lg font-semibold rounded-xl px-8 focusable"
              onClick={() => setShowROIModal(true)}
            >
              <Calculator className="mr-2 h-5 w-5" />
              {t("invest.cta") as string}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* USP Section */}
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
                className="card professional-hover text-center p-6"
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

      {/* Sell Section */}
      <section id="sell" className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--surface)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--text)" }}>
                {t("sell.title") as string}
              </h2>
              <p className="text-lg mb-8 leading-relaxed" style={{ color: "var(--muted)" }}>
                {t("sell.stepsTitle") as string}
              </p>

              {/* Steps */}
              <div className="space-y-6">
                {[
                  {
                    title: t("sell.s1") as string,
                    description: language === "it" ? "Inserisci i dettagli della tua auto" : "Submit your car details",
                  },
                  {
                    title: t("sell.s2") as string,
                    description:
                      language === "it"
                        ? "I nostri esperti valuteranno la tua auto"
                        : "Our experts will assess your car",
                  },
                  {
                    title: t("sell.s3") as string,
                    description: language === "it" ? "La tua auto andrà all'asta" : "Your car goes to auction",
                  },
                ].map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1"
                      style={{ backgroundColor: "var(--accent)" }}
                    >
                      <span className="text-sm font-bold" style={{ color: "var(--accent-contrast)" }}>
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text)" }}>
                        {step.title}
                      </h3>
                      <p className="text-base" style={{ color: "var(--muted)" }}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="card p-6 sm:p-8"
            >
              <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text)" }}>
                {language === "it" ? "Richiedi valutazione" : "Request valuation"}
              </h3>

              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.name") as string}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border focusable"
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--divider)",
                        color: "var(--text)",
                      }}
                      placeholder={t("sell.form.name") as string}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.email") as string}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border focusable"
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--divider)",
                        color: "var(--text)",
                      }}
                      placeholder={t("sell.form.email") as string}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.phone") as string}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border focusable"
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--divider)",
                        color: "var(--text)",
                      }}
                      placeholder={t("sell.form.phone") as string}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.car") as string}
                    </label>
                    <input
                      type="text"
                      value={formData.car}
                      onChange={(e) => setFormData({ ...formData, car: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border focusable"
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--divider)",
                        color: "var(--text)",
                      }}
                      placeholder={t("sell.form.car") as string}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.km") as string}
                    </label>
                    <input
                      type="text"
                      value={formData.km}
                      onChange={(e) => setFormData({ ...formData, km: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border focusable"
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--divider)",
                        color: "var(--text)",
                      }}
                      placeholder={t("sell.form.km") as string}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                      {t("sell.form.year") as string}
                    </label>
                    <input
                      type="text"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg border focusable"
                      style={{
                        background: "var(--bg)",
                        borderColor: "var(--divider)",
                        color: "var(--text)",
                      }}
                      placeholder={t("sell.form.year") as string}
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="privacy"
                    checked={formData.privacy}
                    onChange={(e) => setFormData({ ...formData, privacy: e.target.checked })}
                    className="mt-1 focusable"
                  />
                  <label htmlFor="privacy" className="text-sm" style={{ color: "var(--muted)" }}>
                    {language === "it"
                      ? "Acconsento al trattamento dei dati personali secondo la Privacy Policy"
                      : "I consent to the processing of personal data according to the Privacy Policy"}
                  </label>
                </div>

                <Button className="w-full btn--primary h-12 text-lg font-semibold focusable">
                  {t("sell.form.submit") as string}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights Section */}
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
              {t("insights.title") as string}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: t("insights.a1") as string, icon: TrendingUp },
              { title: t("insights.a2") as string, icon: Gavel },
              { title: t("insights.a3") as string, icon: FileText },
            ].map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card professional-hover p-6 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <article.icon className="w-6 h-6 mr-3" style={{ color: "var(--accent)" }} />
                  <h3 className="text-lg font-bold" style={{ color: "var(--text)" }}>
                    {article.title}
                  </h3>
                </div>
                <p className="text-base mb-4" style={{ color: "var(--muted)" }}>
                  {language === "it"
                    ? "Scopri le ultime tendenze e strategie per massimizzare i tuoi investimenti."
                    : "Discover the latest trends and strategies to maximize your investments."}
                </p>
                <Button variant="outline" className="btn--ghost focusable bg-transparent">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  {language === "it" ? "Leggi di più" : "Read more"}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--surface)" }}>
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
              {t("faq.title") as string}
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {Array.isArray(t("faq.items")) &&
              (t("faq.items") as any[]).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="faq-item rounded-lg"
                >
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center focusable"
                    role="button"
                    aria-expanded={openFaqIndex === index}
                    aria-controls={`faq-${index}`}
                  >
                    <span className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform ${openFaqIndex === index ? "rotate-180" : ""}`}
                      style={{ color: "var(--accent)" }}
                    />
                  </button>
                  {openFaqIndex === index && (
                    <div id={`faq-${index}`} className="px-6 pb-4">
                      <p className="text-base leading-relaxed" style={{ color: "var(--muted)" }}>
                        {item.a}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 sm:py-24 lg:py-32" style={{ background: "var(--bg)" }}>
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8" style={{ color: "var(--text)" }}>
              {t("ctaFinal.title") as string}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="btn--primary h-14 text-lg font-semibold rounded-xl px-8 focusable"
                onClick={() => scrollToSection("lots")}
              >
                {t("ctaFinal.cta1") as string}
              </Button>
              <Button size="lg" className="btn--ghost h-14 text-lg font-semibold rounded-xl px-8 focusable">
                {t("ctaFinal.cta2") as string}
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer py-16 border-t" style={{ borderColor: "var(--divider)" }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <img
                  src="/brand/broker-motors-logo.png"
                  alt="Broker Motors"
                  className="h-10 w-auto"
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
              <p className="text-base leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
                {t("footer.tagline") as string}
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-2 rounded-lg transition-colors hover:opacity-80 focusable"
                  style={{ color: "var(--muted)" }}
                  aria-label="YouTube"
                >
                  <Youtube size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg transition-colors hover:opacity-80 focusable"
                  style={{ color: "var(--muted)" }}
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg transition-colors hover:opacity-80 focusable"
                  style={{ color: "var(--muted)" }}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text)" }}>
                {t("footer.contact") as string}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Phone size={16} className="mt-1" style={{ color: "var(--accent)" }} />
                  <span className="text-sm" style={{ color: "var(--muted)" }}>
                    +44 20 7123 4567
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail size={16} className="mt-1" style={{ color: "var(--accent)" }} />
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
                {t("footer.legal") as string}
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPrivacyModal(true)}
                  className="block text-sm transition-colors hover:opacity-80 link focusable"
                >
                  {t("footer.privacy") as string}
                </button>
                <a href="#" className="block text-sm transition-colors hover:opacity-80 link focusable">
                  {t("footer.cookies") as string}
                </a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80 link focusable">
                  {t("footer.terms") as string}
                </a>
                <a href="#" className="block text-sm transition-colors hover:opacity-80 link focusable">
                  {t("footer.complaints") as string}
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t pt-8" style={{ borderColor: "var(--divider)" }}>
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

      {showROIModal && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content max-w-md w-full"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                  {t("roi.title") as string}
                </h3>
                <button
                  onClick={() => setShowROIModal(false)}
                  className="p-2 hover:opacity-80 transition-colors focusable"
                  style={{ color: "var(--muted)" }}
                  aria-label={t("modal.close") as string}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                    {t("roi.amount") as string}
                  </label>
                  <input
                    type="number"
                    min="1000"
                    step="100"
                    value={roiData.amount}
                    onChange={(e) => setRoiData({ ...roiData, amount: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border focusable"
                    style={{
                      background: "var(--bg)",
                      borderColor: "var(--divider)",
                      color: "var(--text)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                    {t("roi.months") as string}
                  </label>
                  <input
                    type="number"
                    min="3"
                    max="36"
                    value={roiData.months}
                    onChange={(e) => setRoiData({ ...roiData, months: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border focusable"
                    style={{
                      background: "var(--bg)",
                      borderColor: "var(--divider)",
                      color: "var(--text)",
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
                    {t("roi.apr") as string}
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="18"
                    step="0.1"
                    value={roiData.apr}
                    onChange={(e) => setRoiData({ ...roiData, apr: Number(e.target.value) })}
                    className="w-full px-4 py-3 rounded-lg border focusable"
                    style={{
                      background: "var(--bg)",
                      borderColor: "var(--divider)",
                      color: "var(--text)",
                    }}
                  />
                </div>

                <div className="bg-opacity-10 p-4 rounded-lg" style={{ backgroundColor: "var(--accent)" }}>
                  <h4 className="text-lg font-bold mb-2" style={{ color: "var(--text)" }}>
                    {t("roi.estimation") as string}
                  </h4>
                  <p className="text-2xl font-bold" style={{ color: "var(--accent)" }}>
                    {formatCurrency(calculateROI().monthlyIncome)}
                  </p>
                </div>

                <p className="text-xs" style={{ color: "var(--muted)" }}>
                  {t("roi.disclaimer") as string}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {selectedCar && (
        <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                  {selectedCar.title}
                </h3>
                <button
                  onClick={() => setSelectedCar(null)}
                  className="p-2 hover:opacity-80 transition-colors focusable"
                  style={{ color: "var(--muted)" }}
                  aria-label={t("modal.close") as string}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Gallery */}
              <div className="relative mb-6">
                <img
                  src={selectedCar.gallery[currentImageIndex] || selectedCar.img}
                  alt={selectedCar.title}
                  className="w-full h-64 object-cover rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = `/placeholder.svg?height=300&width=500&query=${encodeURIComponent(selectedCar.title + " luxury car studio photo")}`
                  }}
                />
                {selectedCar.gallery.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex(Math.max(0, currentImageIndex - 1))}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 focusable"
                      disabled={currentImageIndex === 0}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex(Math.min(selectedCar.gallery.length - 1, currentImageIndex + 1))
                      }
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 focusable"
                      disabled={currentImageIndex === selectedCar.gallery.length - 1}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}
                <div className={`absolute top-4 left-4 badge badge-${selectedCar.badge}`}>
                  {t(`badges.${selectedCar.badge}`) as string}
                </div>
              </div>

              {/* Car Details */}
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
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3" style={{ color: "var(--text)" }}>
                  {language === "it" ? "Specifiche" : "Specifications"}
                </h4>
                <ul className="space-y-2">
                  {selectedCar.spec.map((spec: string, index: number) => (
                    <li key={index} className="flex items-center space-x-2">
                      <CheckCircle size={16} style={{ color: "var(--accent)" }} />
                      <span className="text-sm" style={{ color: "var(--muted)" }}>
                        {spec}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  className="btn--primary flex-1 focusable"
                  onClick={() => {
                    setSelectedCar(null)
                    scrollToSection("investment")
                  }}
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  {language === "it" ? "Investi ora" : "Invest Now"}
                </Button>
                <Button
                  className="btn--ghost flex-1 focusable"
                  onClick={() => {
                    setSelectedCar(null)
                    scrollToSection("lots")
                  }}
                >
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
        <div className="fixed inset-0 modal-overlay flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="modal-content max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                  {t("footer.privacy") as string}
                </h3>
                <button
                  onClick={() => setShowPrivacyModal(false)}
                  className="p-2 hover:opacity-80 transition-colors focusable"
                  style={{ color: "var(--muted)" }}
                  aria-label={t("modal.close") as string}
                >
                  <X size={20} />
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
