"use client"

import { Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"

interface MobileHeaderProps {
  title: string
  subtitle?: string
  showTribalToggle?: boolean
  tribalMode?: boolean
  onTribalModeChange?: (enabled: boolean) => void
}

export default function MobileHeader({
  title,
  subtitle,
  showTribalToggle = false,
  tribalMode = false,
  onTribalModeChange,
}: MobileHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-blue-700 text-white shadow-lg safe-area-inset-top">
      <div className="px-3 py-3 max-w-screen-sm mx-auto">
        <div className="flex items-center justify-between gap-2">
          {/* Left side - Menu and Title */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Button size="sm" variant="ghost" className="text-white hover:bg-blue-600 p-2 shrink-0">
              <Menu className="w-4 h-4" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-base font-semibold text-white truncate leading-tight">{title}</h1>
              {subtitle && <p className="text-xs text-white/90 truncate leading-tight">{subtitle}</p>}
            </div>
          </div>

          {/* Right side - Controls */}
          <div className="flex items-center gap-1 shrink-0">
            {showTribalToggle && (
              <div className="flex items-center gap-1 bg-blue-800 rounded-full px-2 py-1">
                <span className="text-xs font-medium text-white">हिंदी</span>
                <Switch checked={tribalMode} onCheckedChange={onTribalModeChange} className="scale-75" />
              </div>
            )}

            <Button size="sm" variant="ghost" className="relative text-white hover:bg-blue-600 p-2">
              <Bell className="w-4 h-4" />
              <Badge className="absolute -top-0.5 -right-0.5 w-3 h-3 p-0 bg-red-500 text-white text-xs border-0 flex items-center justify-center">
                3
              </Badge>
            </Button>

            <Button size="sm" variant="ghost" className="text-white hover:bg-blue-600 p-2">
              <User className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
