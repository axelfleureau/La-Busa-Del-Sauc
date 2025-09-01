import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "La Busa del Sauc - Premium Mountain Restaurant | Piancavallo",
  description:
    "Experience authentic mountain cuisine at La Busa del Sauc in Piancavallo. Premium dining with traditional flavors, cozy atmosphere, and exceptional service. Open Friday-Sunday.",
  generator: "v0.app",
  keywords: "restaurant, mountain cuisine, Piancavallo, Italian food, traditional dining, premium restaurant",
  openGraph: {
    title: "La Busa del Sauc - Premium Mountain Restaurant",
    description: "Authentic mountain cuisine in the heart of Piancavallo",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b2a72a8dd2c293a7204a79_1.png"
        />
        <link
          rel="apple-touch-icon"
          href="https://cdn.prod.website-files.com/65772a4150fc91181591a1e5/68b2a72a8dd2c293a7204a79_1.png"
        />
      </head>
      <body className={`font-sans ${inter.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
