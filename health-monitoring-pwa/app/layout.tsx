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
  title: "SANJIVANI",
  description: "Smart community health monitoring and early warning system",
  generator: "v0.app",
  manifest: "/manifest.json",
  icons: {
    icon: "/images/sanjivani.png",
    apple: "/images/sanjivani.png",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Health Monitor",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#1d4ed8", // Updated to match blue theme
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Ensure proper safe area handling */
            .safe-area-inset-top {
              padding-top: env(safe-area-inset-top);
            }
            .safe-area-inset-bottom {
              padding-bottom: env(safe-area-inset-bottom);
            }
            /* Fix iOS viewport issues */
            html, body {
              height: 100vh;
              height: -webkit-fill-available;
            }
            #__next {
              height: 100vh;
              height: -webkit-fill-available;
            }
          `
        }} />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
            {/* Main content with proper padding for fixed bottom nav */}
            <main className="flex-1 pb-20 overflow-x-hidden overflow-y-auto">
              {children}
            </main>
            <BottomNavigation />
          </div>
          <Analytics />
          <ServiceWorkerRegistration />
        </Suspense>
      </body>
    </html>
  )
}