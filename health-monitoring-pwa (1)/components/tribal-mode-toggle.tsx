"use client"
import { Switch } from "@/components/ui/switch"
import { Eye, Volume2 } from "lucide-react"

interface TribalModeToggleProps {
  tribalMode: boolean
  onToggle: (enabled: boolean) => void
}

export function TribalModeToggle({ tribalMode, onToggle }: TribalModeToggleProps) {
  return (
    <div className="flex items-center gap-2 p-2 bg-card rounded-lg border">
      <Eye className="w-4 h-4 text-muted-foreground" />
      <Switch checked={tribalMode} onCheckedChange={onToggle} aria-label="Toggle Tribal Mode for accessibility" />
      <Volume2 className="w-4 h-4 text-muted-foreground" />
      <span className="text-xs text-muted-foreground">{tribalMode ? "सरल मोड" : "Simple Mode"}</span>
    </div>
  )
}
