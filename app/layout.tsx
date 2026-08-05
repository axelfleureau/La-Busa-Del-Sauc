import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { getHoursSeason } from "@/lib/hours"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

const IMAGE_CDN = "https://cdn.prod.website-files.com"
const LOGO = `${IMAGE_CDN}/65772a4150fc91181591a1e5/68b2a72a8dd2c293a7204a79_1.png`
const COVER = `${IMAGE_CDN}/65772a4150fc91181591a1e5/68b1dcb819fd354695ec0384_ambiente_busa_esterno.jpg`

/** Vercel espone il dominio di produzione: nessun URL da tenere aggiornato a mano. */
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000"

const isEveryDay = getHoursSeason(new Date()) !== "regular"

const description = isEveryDay
  ? "Cucina di montagna autentica alla Busa del Sauc, Piancavallo. Ad agosto aperto tutti i giorni, 10:30-22:30."
  : "Cucina di montagna autentica alla Busa del Sauc, Piancavallo. Aperto domenica e da mercoledì a sabato, 10:30-22:30."

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "La Busa del Sauc — Ristorante di montagna a Piancavallo",
  description,
  keywords: [
    "ristorante Piancavallo",
    "cucina di montagna",
    "Busa del Sauc",
    "ristorante Friuli",
    "malga Piancavallo",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "La Busa del Sauc — Ristorante di montagna a Piancavallo",
    description,
    type: "website",
    locale: "it_IT",
    siteName: "La Busa del Sauc",
    images: [{ url: COVER, width: 1200, height: 630, alt: "La Busa del Sauc a Piancavallo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Busa del Sauc — Ristorante di montagna a Piancavallo",
    description,
    images: [COVER],
  },
  robots: {
    index: true,
    follow: true,
  },
}

/** Dati strutturati: fanno comparire orari, telefono e fascia di prezzo su Google. */
const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "La Busa del Sauc",
  description,
  image: [COVER, LOGO],
  url: siteUrl,
  telephone: "+39 389 443 0724",
  servesCuisine: "Cucina di montagna",
  priceRange: "€€",
  currenciesAccepted: "EUR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Piazzale della Puppa",
    addressLocality: "Piancavallo",
    postalCode: "33081",
    addressRegion: "PN",
    addressCountry: "IT",
  },
  hasMenu: `${siteUrl}/menu.pdf`,
  sameAs: ["https://www.instagram.com/busa_del_sauc/", "https://www.facebook.com/baitacaprioli/?locale=it_IT"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: isEveryDay
        ? ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        : ["Sunday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:30",
      closes: "22:30",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <head>
        {/* Le foto stanno su un CDN esterno: apriamo la connessione prima che servano */}
        <link rel="preconnect" href={IMAGE_CDN} crossOrigin="" />
        <link rel="dns-prefetch" href={IMAGE_CDN} />
        <link rel="icon" type="image/png" href={LOGO} />
        <link rel="apple-touch-icon" href={LOGO} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }}
        />
      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
