"use client"

import { Bell, User, Menu, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"

interface MobileHeaderProps {
  title: string
  subtitle?: string
  showTribalToggle?: boolean
  tribalMode?: boolean
  onTribalModeChange?: (enabled: boolean) => void
  showBackButton?: boolean
  onBackClick?: () => void
  showNotifications?: boolean
  notificationCount?: number
}

export default function MobileHeader({
  title,
  subtitle,
  showTribalToggle = false,
  tribalMode = false,
  onTribalModeChange,
  showBackButton = false,
  onBackClick,
  showNotifications = true,
  notificationCount = 3,
}: MobileHeaderProps) {
  const router = useRouter()

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick()
    } else {
      router.back()
    }
  }

  return (
    <header className="bg-blue-700 text-white shadow-lg">
      <div className="px-3 py-3 max-w-md mx-auto safe-area-inset-top">
        <div className="flex items-center justify-between gap-2">
          {/* Left side - Back/Menu and Title */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            {showBackButton ? (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleBackClick}
                className="text-white hover:bg-blue-600 p-2 shrink-0 touch-manipulation active:scale-95 transition-transform"
                style={{ minHeight: "40px", minWidth: "40px" }}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-blue-600 p-2 shrink-0 touch-manipulation active:scale-95 transition-transform"
                style={{ minHeight: "40px", minWidth: "40px" }}
              >
                <Menu className="w-4 h-4" />
              </Button>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-white truncate leading-tight">{title}</h1>
              {subtitle && <p className="text-xs text-white/90 truncate leading-tight">{subtitle}</p>}
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {showTribalToggle && onTribalModeChange && (
              <div className="flex items-center gap-1 bg-blue-800 rounded-full px-2 py-1 touch-manipulation">
                <span className="text-xs font-medium text-white">हिंदी</span>
                <Switch
                  checked={tribalMode}
                  onCheckedChange={onTribalModeChange}
                  className="scale-75 touch-manipulation"
                />
              </div>
            )}

            {showNotifications && (
              <Button
                size="sm"
                variant="ghost"
                className="relative text-white hover:bg-blue-600 p-2 touch-manipulation active:scale-95 transition-transform"
                style={{ minHeight: "40px", minWidth: "40px" }}
              >
                <Bell className="w-4 h-4" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-0.5 -right-0.5 w-4 h-4 p-0 bg-red-500 text-white text-xs border-0 flex items-center justify-center">
                    {notificationCount > 9 ? "9+" : notificationCount}
                  </Badge>
                )}
              </Button>
            )}

            <Button
              size="sm"
              variant="ghost"
              className="text-white hover:bg-blue-600 p-2 touch-manipulation active:scale-95 transition-transform"
              style={{ minHeight: "40px", minWidth: "40px" }}
            >
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}