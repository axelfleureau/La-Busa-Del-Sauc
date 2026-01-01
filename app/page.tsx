"use client"

import { useState, useEffect } from "react"
import { motion, useScroll } from "framer-motion"
import {
  ChevronDown,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Facebook,
  ExternalLink,
  Sun,
  Moon,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { HeroSlideshow } from "@/components/hero-slideshow"
import { ThemeProvider, useTheme } from "@/components/theme-provider"
import { LanguageProvider, useLanguage, languages } from "@/components/language-provider"

function RestaurantContent() { 
  const [activeSection, setActiveSection] = useState("home")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [showPrivacyModal, setShowPrivacyModal] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const { scrollY } = useScroll()

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "menu", "gallery", "contact"]
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
    { key: "home", label: t("nav.home") },
    { key: "about", label: t("nav.about") },
    { key: "menu", label: t("nav.menu") },
    { key: "gallery", label: t("nav.gallery") },
    { key: "contact", label: t("nav.contact") },
  ]

  const menuItems = {
    antipasti: [
      { name: t("menu.items.tagliere"), price: "€15,00" },
      { name: t("menu.items.formaggi"), price: "€15,00" },
      { name: t("menu.items.tartare"), price: "€18,00" },
      { name: t("menu.items.flan"), price: "€13,00" },
    ],
    primi: [
      { name: t("menu.items.pappardelle"), price: "€14,00" },
      { name: t("menu.items.gnocchi"), price: "€14,00" },
      { name: t("menu.items.zuppa"), price: "€10,00" },
    ],
    secondi: [
      { name: t("menu.items.cervo"), price: "€17,00" },
      { name: t("menu.items.frico"), price: "€15,00" },
      { name: t("menu.items.tagliata"), price: "€22,00" },
    ],
    contorni: [
      { name: t("menu.items.patate"), price: "€5,00" },
      { name: t("menu.items.funghi"), price: "€6,00" },
      { name: t("menu.items.spinaci"), price: "€5,00" },
      { name: t("menu.items.insalata"), price: "€7,00" },
    ],
    bevande: [
      { name: t("menu.items.spritz_aperol"), price: "€4,00" },
      { name: t("menu.items.spritz_campari"), price: "€4,50" },
      { name: t("menu.items.birra_egg"), price: "€3,00" },
      { name: t("menu.items.birra_men"), price: "€6,00" },
    ],
  }

  const foodImages = [
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb702885b88e1d0c3a6_menu%CC%80_busa-089.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb7a79fd48a8f930cb3_menu%CC%80_busa-039.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb851fb04d42c7318a4_menu%CC%80_busa-014.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb820a110075b063a7b_menu%CC%80_busa-063.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb9f7c763c60cca2c61_menu%CC%80_busa-138.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb90555aeb9253567ee_menu%CC%80_busa-199.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb9c67818c7beaf240e_menu%CC%80_busa-166.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb9938d0e62b680b4fc_menu%CC%80_busa-129.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb9a35264ecb8a55616_busa_interno_vini.jpg",
  ]

  const interiorImages = [
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb83da47a9b8bc470d7_ambiente_busa_interno_1.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb863459893cd156685_ambiente_busa_interno_2.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcbabd248ce579d994ce_busa_interno_vini.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb819fd354695ec0384_ambiente_busa_esterno.jpg",
    "https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1dcb843491d0fbd97fd95_menu%CC%80_busa-075.jpg",
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Completely hide all slideshow indicators on mobile */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .hero-slideshow-indicators,
          .slideshow-dots,
          .slideshow-indicators,
          .swiper-pagination,
          .swiper-pagination-bullet,
          [class*="indicator"],
          [class*="dot"],
          [class*="pagination"],
          [class*="bullet"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            height: 0 !important;
            width: 0 !important;
            overflow: hidden !important;
          }
        }
        @media (max-width: 420px) {
          .hero-content .professional-container {
            padding: 6px !important;
          }
        }
      `}</style>

      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.img
              src="https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1d87e5d2e62b54c46ec1c_busa_del_sauc.png"
              alt="La Busa del Sauc"
              className={`h-12 sm:h-10 md:h-12 w-auto ${theme === "dark" ? "brightness-0 invert" : "brightness-0"}`}
              whileHover={{ scale: 1.05 }}
            />

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.key}
                  onClick={() => scrollToSection(item.key)}
                  className={`font-inter text-sm font-medium transition-all duration-300 relative px-3 py-2 rounded-lg ${
                    activeSection === item.key
                      ? theme === "dark"
                        ? "text-[#ff0092] font-semibold bg-[#ff0092]/20"
                        : "text-amber-600 font-semibold bg-amber-400/20"
                      : theme === "dark"
                        ? "text-white hover:text-[#ff0092] hover:bg-white/10"
                        : "text-slate-800 hover:text-amber-600 hover:bg-slate-100"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
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
                className={`h-12 w-12 sm:h-10 sm:w-10 p-0 hover:bg-white/10 ${theme === "dark" ? "text-white" : "text-slate-800"}`}
              >
                {theme === "dark" ? <Sun className="h-8 w-8 sm:h-4 sm:w-4" /> : <Moon className="h-8 w-8 sm:h-4 sm:w-4" />}
              </Button>

              {/* Language Selector */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                  className={`hover:bg-white/10 px-4 sm:px-3 py-3 sm:py-2 ${theme === "dark" ? "text-white" : "text-slate-800"}`}
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
                  >
                    <div className="professional-container p-2 space-y-1">
                      {Object.entries(languages).map(([code, lang]) => (
                        <button
                          key={code}
                          onClick={() => {
                            setLanguage(code as keyof typeof languages)
                            setShowLanguageDropdown(false)
                          }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-amber-400/20 rounded-lg transition-colors flex items-center space-x-2"
                        >
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - RIMOSSO */}
      </nav>

      {/* Hero Section - Ultra Compact Version */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroSlideshow />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4 pt-24 z-20">
          
          {/* Benvenuti Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-4"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-3 py-2 mb-6 inline-block">
              <p className={`text-sm font-light uppercase tracking-widest ${
                theme === "dark" ? "text-[#ff0092]" : "text-amber-400"
              }`}>
                {t("hero.welcome")}
              </p>
            </div>
            
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold text-white mb-6 leading-tight">
              La Busa del Sauc
            </h1>
          </motion.div>

          {/* Descrizione */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg px-6 py-4 max-w-2xl mx-auto">
              <p className="text-base sm:text-lg font-light leading-relaxed">
                {t("hero.subtitle")}
              </p>
            </div>
          </motion.div>

          {/* Pulsanti */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl"
          >
            <Button
              size="lg"
              className={`h-12 text-black font-semibold rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                theme === "dark" ? "bg-[#ff0092] hover:bg-[#ff3daa]" : "bg-amber-500 hover:bg-amber-600"
              }`}
              onClick={() =>
                window.open(
                  "/menu.pdf",
                  "_blank",
                )
              }
            >
              <ExternalLink className="mr-2 h-5 w-5" />
              {t("menu")}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 border-white/30 text-white hover:bg-white/10 rounded-xl transition-all duration-300 hover:scale-105 bg-transparent backdrop-blur-sm"
              onClick={() => scrollToSection("about")}
            >
              {t("hero.discover")}
            </Button>

            <a
              href="https://www.wearerighello.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-105 h-12 px-4"
            >
              <img
                src="https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/6814c5b54bc85218c633c5a8_Righello_logo_E.png"
                alt="Righello Icon"
                className={`w-5 h-5 ${theme === "dark" ? "brightness-0 invert" : "brightness-100"}`}
              />
              <div className="flex flex-col items-start">
                <span className="text-xs uppercase tracking-wider opacity-80 font-medium">
                  Partner of
                </span>
                <img
                  src="https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/65774a509c1f2e0f55137c8e_Logo_righello.svg"
                  alt="Righello"
                  className={`h-3 ${theme === "dark" ? "brightness-0 invert" : "brightness-100"}`}
                />
              </div>
            </a>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-3 sm:bottom-6 left-1/2 transform -translate-x-1/2 text-white z-[5]"
        >
          <ChevronDown size={22} />
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              {t("about.title")}
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="font-inter text-lg sm:text-xl md:text-2xl leading-relaxed text-muted-foreground">
                {t("about.description")}
              </p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="professional-container p-6 sm:p-8 lg:p-10 professional-hover">
                <h3
                  className={`font-inter text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 ${
                    theme === "dark" ? "text-[#ff0092]" : "text-amber-500"
                  }`}
                >
                  {t("atmosphere.title")}
                </h3>
                <div className="mb-6 sm:mb-8">
                  <Button
                    size="lg"
                    className={`w-full sm:w-auto text-black font-semibold px-6 sm:px-8 py-3 text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-lg ${
                      theme === "dark" ? "bg-[#ff0092] hover:bg-[#ff3daa]" : "bg-amber-500 hover:bg-amber-500"
                    }`}
                    onClick={() =>
                      window.open(
                        "/menu.pdf",
                        "_blank",
                      )
                    }
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t("menu")}
                  </Button>
                </div>
                <div className="space-y-6 sm:space-y-8">
                  <div
                    className={`professional-container p-6 sm:p-8 border-l-4 ${theme === "dark" ? "border-[#ff0092]" : "border-amber-400"}`}
                  >
                    <p className="font-inter text-base sm:text-lg leading-relaxed">{t("atmosphere.description1")}</p>
                  </div>
                  <div
                    className={`professional-container p-6 sm:p-8 border-l-4 ${theme === "dark" ? "border-[#ff0092]" : "border-amber-400"}`}
                  >
                    <p className="font-inter text-base sm:text-lg leading-relaxed">{t("atmosphere.description2")}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4 sm:gap-6"
            >
              {interiorImages.map((image, index) => (
                <motion.div key={index} whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                  <div className="professional-container overflow-hidden p-0 professional-hover">
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`Interior ${index + 1}`}
                      className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              {t("menu.title")}
            </h2>
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
              <p className="font-inter text-lg sm:text-xl md:text-2xl leading-relaxed text-muted-foreground">
                {t("menu.description")}
              </p>
            </div>
            <Button
              size="lg"
              className={`text-black font-semibold px-6 sm:px-8 lg:px-10 py-3 sm:py-4 text-base rounded-xl transition-all duration-300 hover:scale-105 shadow-lg h-12 sm:h-14 lg:h-16 min-w-[180px] sm:min-w-[200px] ${
                theme === "dark" ? "bg-[#ff0092] hover:bg-[#ff3daa]" : "bg-amber-500 hover:bg-amber-500"
              }`}
              onClick={() =>
                window.open(
                  "/menu.pdf",
                  "_blank",
                )
              }
            >
              <ExternalLink className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              {t("menu")}
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-10">
            {Object.entries(menuItems).map(([category, items], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="professional-container p-6 sm:p-8 lg:p-10 professional-hover h-full">
                  <h3
                    className={`font-inter text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 ${
                      theme === "dark" ? "text-[#ff0092]" : "text-amber-500"
                    }`}
                  >
                    {t(`menu.${category}` as any)}
                  </h3>
                  <div className="space-y-4 sm:space-y-6">
                    {items.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <article className="rounded-2xl border border-white/10 bg-white/5 p-3 sm:p-4 md:p-5">
                          <header className="mb-2 flex items-start justify-between gap-3">
                            <h4 className="text-sm sm:text-base md:text-lg font-medium leading-tight">{item.name}</h4>
                            <span className="shrink-0 rounded-xl border border-white/10 bg-black/30 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold">
                              {item.price}
                            </span>
                          </header>
                        </article>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 sm:py-24 lg:py-32 bg-muted">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              {t("gallery.title")}
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="font-inter text-lg sm:text-xl md:text-2xl leading-relaxed text-muted-foreground">
                {t("gallery.description")}
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {foodImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
              >
                <div className="professional-container overflow-hidden p-0 professional-hover">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`Food ${index + 1}`}
                    className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-24 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            <h2 className="font-inter text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6">
              {t("contact.title")}
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="font-inter text-lg sm:text-xl md:text-2xl leading-relaxed text-muted-foreground">
                {t("contact.description")}
              </p>
            </div>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-3 gap-8 sm:gap-10"
            >
              <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                <div className="professional-container p-6 sm:p-8 lg:p-10">
                  <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
                    {/* Address Card */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${theme === "dark" ? "border-[#ff0092]/50 bg-[#ff0092]/10" : "border-amber-500/50 bg-amber-500/10"}`}
                        >
                          <MapPin className={`h-4 w-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`} />
                        </span>
                        <h3
                          className={`${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"} font-semibold text-lg`}
                        >
                          {t("contact.address")}
                        </h3>
                      </div>
                      <div className="space-y-3 text-sm leading-relaxed">
                        <p className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <span className="font-medium">Piazzale della Puppa</span>
                          <br />
                          <span className="font-medium">33081 Piancavallo PN</span>
                        </p>
                      </div>
                    </section>

                    {/* Hours Card */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${theme === "dark" ? "border-[#ff0092]/50 bg-[#ff0092]/10" : "border-amber-500/50 bg-amber-500/10"}`}
                        >
                          <Clock className={`h-4 w-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`} />
                        </span>
                        <h3
                          className={`${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"} font-semibold text-lg`}
                        >
                          {t("contact.hours")}
                        </h3>
                      </div>
                      <div className="space-y-3 text-sm leading-relaxed">
                        <p className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <span className="font-medium">Venerdì–Domenica:</span> {t("hours.weekend")}
                        </p>
                        <p className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <span className="font-medium">Lunedì–Giovedì:</span> {t("hours.weekdays")}
                        </p>
                      </div>
                    </section>

                    {/* Phone Card */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${theme === "dark" ? "border-[#ff0092]/50 bg-[#ff0092]/10" : "border-amber-500/50 bg-amber-500/10"}`}
                        >
                          <Phone className={`h-4 w-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`} />
                        </span>
                        <h3
                          className={`${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"} font-semibold text-lg`}
                        >
                          {t("contact.phone")}
                        </h3>
                      </div>
                      <div className="space-y-3 text-sm leading-relaxed">
                        <p className="rounded-xl border border-white/10 bg-black/20 p-3">
                          <span className="font-medium">389 443 0724</span>
                          <br />
                          <span className="text-xs opacity-80">{t("whatsapp.info")}</span>
                        </p>
                      </div>
                    </section>

                    {/* Social Media Card */}
                    <section className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full border ${theme === "dark" ? "border-[#ff0092]/50 bg-[#ff0092]/10" : "border-amber-500/50 bg-amber-500/10"}`}
                        >
                          <Instagram className={`h-4 w-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`} />
                        </span>
                        <h3
                          className={`${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"} font-semibold text-lg`}
                        >
                          {t("contact.follow")}
                        </h3>
                      </div>
                      <div className="flex space-x-4">
                        <Button
                          size="lg"
                          className={`text-black transition-all duration-300 hover:scale-105 p-3 sm:p-4 ${theme === "dark" ? "bg-[#ff0092] hover:bg-[#ff3daa]" : "bg-amber-500 hover:bg-amber-500"}`}
                          onClick={() => window.open("https://www.instagram.com/busa_del_sauc/", "_blank")}
                        >
                          <Instagram size={20} className="sm:w-6 sm:h-6" />
                        </Button>
                        <Button
                          size="lg"
                          className={`text-black transition-all duration-300 hover:scale-105 p-3 sm:p-4 ${theme === "dark" ? "bg-[#ff0092] hover:bg-[#ff3daa]" : "bg-amber-500 hover:bg-amber-500"}`}
                          onClick={() => window.open("https://www.facebook.com/baitacaprioli/?locale=it_IT", "_blank")}
                        >
                          <Facebook size={20} className="sm:w-6 sm:h-6" />
                        </Button>
                      </div>
                    </section>
                  </div>
                </div>
              </div>

              <div className="space-y-6 sm:space-y-8">
                <div className="professional-container p-6 sm:p-8 lg:p-10 text-center">
                  <h3
                    className={`font-inter text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
                      theme === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {t("contact.priceRange")}
                  </h3>
                  <div
                    className={`professional-container p-6 sm:p-8 mb-4 sm:mb-6 border-l-4 ${theme === "dark" ? "border-[#ff0092]" : "border-amber-400"}`}
                  >
                    <p
                      className={`font-inter text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                    >
                      media 25€
                    </p>
                    <p className="font-inter text-base sm:text-lg opacity-80">{t("contact.perPerson")}</p>
                  </div>
                </div>

                <div className="professional-container p-6 sm:p-8 lg:p-10">
                  <div className="professional-container p-6 sm:p-8">
                    <p className="font-inter text-sm sm:text-base leading-relaxed text-center">
                      {t("contact.reservationInfo")}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-white py-8 sm:py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <div className="sm:col-span-2 md:col-span-1">
              <motion.img
                src="https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b1d87e5d2e62b54c46ec1c_busa_del_sauc.png"
                alt="La Busa del Sauc"
                className="h-12 sm:h-16 w-auto brightness-0 invert mb-4"
              />
              <p className="text-slate-400 text-sm sm:text-base">{t("footer.tagline")}</p>
            </div>

            <div>
              <h3
                className={`font-semibold mb-4 text-sm sm:text-base ${theme === "dark" ? "text-[#ff0092]" : "text-amber-400"}`}
              >
                {t("contact.address")}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                Piazzale della Puppa
                <br />
                33081 Piancavallo PN
              </p>
            </div>

            <div>
              <h3
                className={`font-semibold mb-4 text-sm sm:text-base ${theme === "dark" ? "text-[#ff0092]" : "text-amber-400"}`}
              >
                {t("contact.hours")}
              </h3>
              <p className="text-slate-400 text-sm sm:text-base">
                {t("hours.weekend")}
                <br />
                {t("hours.weekdays")}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-700 pt-6 sm:pt-8 text-center text-slate-400">
            <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm">
              <p>
                {t("footer.createdBy")}{" "}
                <a
                  href="https://www.wearerighello.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`font-semibold transition-colors ${
                    theme === "dark" ? "text-[#ff0092] hover:text-[#ff3daa]" : "text-amber-400 hover:text-amber-300"
                  }`}
                >
                  Righello s.r.l.
                </a>
              </p>
              <span className="hidden sm:inline">|</span>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className={`transition-colors ${
                  theme === "dark" ? "text-[#ff0092] hover:text-[#ff3daa]" : "text-amber-400 hover:text-amber-300"
                }`}
              >
                Privacy & Cookie Policy
              </button>
            </div>
            <p className="mt-2 text-xs sm:text-sm">© 2025 La Busa del Sauc. Tutti i diritti riservati.</p>
          </div>
        </div>
      </footer>

      {/* Privacy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="professional-container max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6">
                <h2
                  className={`text-2xl sm:text-3xl font-bold ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}
                >
                  Privacy & Cookie Policy
                </h2>
                <Button
                  onClick={() => setShowPrivacyModal(false)}
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              {/* Introduction */}
              <div
                className={`professional-container p-4 sm:p-6 mb-4 sm:mb-6 border-l-4 ${theme === "dark" ? "border-[#ff0092]" : "border-amber-400"}`}
              >
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                  This document outlines how we collect, use, and protect your personal information, as well as how we
                  utilize cookies to enhance your experience on our website. It is important to understand both our
                  privacy practices and our cookie usage to ensure transparency and trust. Please review this combined
                  policy carefully to understand your rights and our obligations regarding your data.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {/* Section 1 */}
                <div className="professional-container p-4 sm:p-6">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}
                  >
                    1. Introduzione
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Questo sito, accessibile all'indirizzo https://www.wearerighello.com/busadelsauc, non raccoglie né
                    tratta dati personali identificabili né utilizza cookie di profilazione o finalizzati alla
                    pubblicità.
                  </p>
                </div>

                {/* Section 2 */}
                <div className="professional-container p-4 sm:p-6">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}
                  >
                    2. Cookie tecnici essenziali
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    Il sito potrebbe utilizzare solo cookie tecnici strettamente necessari al corretto funzionamento (ad
                    esempio per mantenere la navigazione tra le pagine o gestire eventuali preferenze tecniche). Questi
                    cookie:
                  </p>
                  <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground space-y-2 ml-4">
                    <li>non raccolgono dati personali;</li>
                    <li>non richiedono esplicito consenso dell'utente ai sensi del GDPR e normativa italiana.</li>
                  </ul>
                </div>

                {/* Section 3 */}
                <div className="professional-container p-4 sm:p-6">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}
                  >
                    3. Assenza di profilazione e tracciamento
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Il sito non utilizza cookie di profilazione, pubblicitari, statistici o di terze parti (es. Google
                    Analytics, social plugins, retargeting).
                  </p>
                </div>

                {/* Section 4 */}
                <div className="professional-container p-4 sm:p-6">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}
                  >
                    4. Trattamento dei dati personali
                  </h3>
                  <ul className="list-disc list-inside text-sm sm:text-base text-muted-foreground space-y-2 ml-4">
                    <li>Nessun dato personale viene raccolto, archiviato o trattato.</li>
                    <li>
                      Non sono presenti form, registrazioni, newsletter o funzioni interattive che richiedano
                      informazioni personali.
                    </li>
                  </ul>
                </div>

                {/* Section 5 */}
                <div className="professional-container p-4 sm:p-6">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}
                  >
                    5. Diritti dell'utente
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Poiché non vengono raccolti o trattati dati personali, non si applicano procedure legate
                    all'esercizio dei diritti GDPR (accesso, rettifica, cancellazione, ecc.).
                  </p>
                </div>

                {/* Section 6 */}
                <div className="professional-container p-4 sm:p-6">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}
                  >
                    6. Sicurezza
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Anche se non vengono trattati dati personali, il sito adotta misure tecniche per garantire il
                    corretto funzionamento e la sicurezza dell'accesso (come ad esempio un certificato SSL/TLS per la
                    connessione HTTPS).
                  </p>
                </div>

                {/* Section 7 */}
                <div className="professional-container p-4 sm:p-6">
                  <h3
                    className={`text-lg sm:text-xl font-semibold mb-4 ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}
                  >
                    7. Modifiche della policy
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                    Questa policy può essere aggiornata per riflettere eventuali cambiamenti tecnici o normativi. In
                    caso di modifiche rilevanti, sarà cura dell'amministratore pubblicare la versione aggiornata con
                    data di entrata in vigore.
                  </p>
                  <p className={`text-sm font-semibold ${theme === "dark" ? "text-[#ff0092]" : "text-amber-500"}`}>
                    Ultima revisione: 30 agosto 2025
                  </p>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 text-center">
                <Button
                  onClick={() => setShowPrivacyModal(false)}
                  className={`text-black px-6 sm:px-8 py-3 text-base ${theme === "dark" ? "bg-[#ff0092] hover:bg-[#ff3daa]" : "bg-amber-400 hover:bg-amber-500"}`}
                >
                  Ho compreso
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default function LaBusaDelSauc() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RestaurantContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}
