import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Broker Motors - Luxury Car Auctions & Trading | Premium Automotive Marketplace",
  description:
    "The leading platform for luxury car auctions and trading. Curated selection, inspection reports, secure payments, and insured delivery. Join thousands of collectors and enthusiasts worldwide.",
  keywords:
    "luxury car auctions, classic car sales, supercar marketplace, vehicle inspection, automotive trading, collector cars, exotic cars, premium vehicles, car investment, auction platform",
  authors: [{ name: "Broker Motors" }],
  creator: "Broker Motors",
  publisher: "Broker Motors",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://brokermotors.example"),
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "it-IT": "/it",
    },
  },
  openGraph: {
    title: "Broker Motors - Luxury Car Auctions & Trading",
    description: "The leading platform for luxury car auctions. Curated selection, secure payments, global reach.",
    type: "website",
    locale: "en_US",
    url: "https://brokermotors.example",
    siteName: "Broker Motors",
    images: [
      {
        url: "/brand/broker-motors-og.jpg",
        width: 1200,
        height: 630,
        alt: "Broker Motors - Luxury Car Auctions",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Broker Motors - Luxury Car Auctions & Trading",
    description: "The leading platform for luxury car auctions. Curated selection, secure payments, global reach.",
    images: ["/brand/broker-motors-og.jpg"],
    creator: "@brokermotors",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/brand/broker-motors-favicon.png" />
        <link rel="apple-touch-icon" href="/brand/broker-motors-apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0b5cff" />
        <meta name="msapplication-TileColor" content="#0b5cff" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Broker Motors",
              description: "The leading platform for luxury car auctions and trading",
              url: "https://brokermotors.example",
              logo: "https://brokermotors.example/brand/broker-motors.jpg",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+44-0000-000000",
                contactType: "customer service",
                email: "info@brokermotors.example",
                availableLanguage: ["English", "Italian"],
              },
              sameAs: [
                "https://www.youtube.com/@brokermotors",
                "https://www.instagram.com/brokermotors",
                "https://www.linkedin.com/company/brokermotors",
              ],
              address: {
                "@type": "PostalAddress",
                addressCountry: "GB",
              },
              foundingDate: "2025",
              industry: "Automotive Auctions",
              numberOfEmployees: "50-100",
              slogan: "The leading platform for luxury car auctions",
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Broker Motors",
              url: "https://brokermotors.example",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://brokermotors.example/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              name: "Luxury Car Auction Services",
              description:
                "Professional luxury car auction and trading services with inspection reports, secure payments, and global delivery",
              provider: {
                "@type": "Organization",
                name: "Broker Motors",
              },
              serviceType: "Automotive Auction",
              areaServed: ["United Kingdom", "European Union", "United States"],
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Luxury Vehicle Auctions",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Vehicle Consignment",
                      description: "Professional vehicle consignment services with marketing and auction management",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Vehicle Inspection",
                      description: "Comprehensive 200+ point vehicle inspection with detailed reporting",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Secure Payment Processing",
                      description: "Escrow services with KYC/AML compliance for secure transactions",
                    },
                  },
                ],
              },
            }),
          }}
        />
      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
