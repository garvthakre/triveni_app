import type React from "react"
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import BottomNavigation from "@/components/bottom-navigation"
import { ServiceWorkerRegistration } from "@/components/service-worker-registration"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Health Monitoring PWA",
  description: "Smart community health monitoring and early warning system",
  generator: "v0.app",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/health-hero.png",
    apple: "/images/health-hero.png",
  },
}

// ✅ Move themeColor here
export const viewport: Viewport = {
  themeColor: "#000000",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Extra meta tags for PWA */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="min-h-screen bg-gray-50">
            <main className="pb-20">{children}</main>
            <BottomNavigation />
          </div>
          <Analytics />
          <ServiceWorkerRegistration />
        </Suspense>
      </body>
    </html>
  )
}