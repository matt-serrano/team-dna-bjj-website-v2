import type React from "react"
import type { Metadata } from "next"
import { DM_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const dmSans = DM_Sans({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hugo - Proactive Pet Care",
  description: "Join 1,000+ Australians improving their pet's health with proactive, personalised pet care.",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
