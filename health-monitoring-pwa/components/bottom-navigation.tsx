"use client"

import { Home, Activity, MapPin, BookOpen, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      icon: Home,
      label: "Home",
      href: "/",
    },
    {
      icon: Activity,
      label: "Symptoms",
      href: "/report-symptoms",
    },
    {
      icon: MapPin,
      label: "Map",
      href: "/analytics",
    },
    {
      icon: BookOpen,
      label: "Learn",
      href: "/education",
    },
    {
      icon: Settings,
      label: "Profile",
      href: "/water-quality",
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto px-4 py-2 safe-area-inset-bottom">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 touch-manipulation active:scale-95",
                  "min-w-[60px] min-h-[60px]",
                  isActive
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                )}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium leading-tight">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}