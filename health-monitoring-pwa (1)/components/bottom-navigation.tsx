"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Heart, Droplets, AlertTriangle, BookOpen, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", icon: Home, label: "Home", activeColor: "text-cyan-500" },
  { href: "/report-symptoms", icon: Heart, label: "Report", activeColor: "text-rose-500" },
  { href: "/water-quality", icon: Droplets, label: "Water", activeColor: "text-blue-500" },
  { href: "/alerts", icon: AlertTriangle, label: "Alerts", activeColor: "text-orange-500" },
  { href: "/education", icon: BookOpen, label: "Learn", activeColor: "text-green-500" },
  { href: "/analytics", icon: BarChart3, label: "Stats", activeColor: "text-purple-500" },
]

export default function BottomNavigation() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-gray-200 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 min-w-[60px]",
                isActive ? "bg-gradient-to-t from-gray-100 to-white shadow-sm scale-105" : "hover:bg-gray-50",
              )}
            >
              <div
                className={cn(
                  "p-1.5 rounded-lg transition-colors duration-200",
                  isActive ? "bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg" : "bg-transparent",
                )}
              >
                <Icon
                  className={cn("w-5 h-5 transition-colors duration-200", isActive ? "text-white" : "text-gray-600")}
                />
              </div>
              <span
                className={cn(
                  "text-xs font-medium mt-1 transition-colors duration-200",
                  isActive ? "text-gray-900" : "text-gray-500",
                )}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
