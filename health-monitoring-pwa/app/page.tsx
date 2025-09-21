"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Droplets, AlertTriangle, Users, Activity, TrendingUp, MapPin, Clock, Bot } from "lucide-react"
import Link from "next/link"
import MobileHeader from "@/components/mobile-header"

export default function Dashboard() {
  const [tribalMode, setTribalMode] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-cyan-50">
      <MobileHeader
        title={tribalMode ? "स्वास्थ्य मॉनिटर" : "Health Monitor"}
        subtitle={tribalMode ? "समुदाय की देखभाल" : "Community Health Dashboard"}
        showTribalToggle={true}
        tribalMode={tribalMode}
        onTribalModeChange={setTribalMode}
      />

      <div className="px-3 py-4 space-y-4 max-w-md mx-auto">
        {/* AI Health Advisor Card */}
        <div
          className="shadow-lg rounded-xl overflow-hidden"
          style={{
            backgroundColor: "#4f46e5",
            color: "white",
          }}
        >
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
              >
                <Bot className="w-5 h-5" style={{ color: "white" }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base" style={{ color: "white" }}>
                  {tribalMode ? "AI स्वास्थ्य सलाहकार" : "AI Health Advisor"}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "white" }}>
                  {tribalMode
                    ? "स्वास्थ्य प्रश्न पूछें और मित्रवत, निजी मार्गदर्शन पाएं।"
                    : "Ask health questions and get friendly, private guidance."}
                </p>
              </div>
            </div>
            <button
              className="w-full mt-3 border rounded-lg px-4 py-3 font-medium transition-all duration-200 active:scale-95 touch-manipulation"
              style={{
                backgroundColor: "#3730a3",
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                minHeight: "44px",
              }}
            >
              {tribalMode ? "चैट शुरू करें" : "Start a chat"}
            </button>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            {tribalMode ? "अलर्ट" : "Alerts"}
            <Badge variant="destructive" className="ml-auto text-xs">
              Auto-updated
            </Badge>
          </h2>

          <div className="grid gap-2">
            <Card className="border-l-4 border-l-red-500 bg-red-50 border-red-200">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-red-900 text-sm">
                      {tribalMode ? "डेंगू स्पाइक आपके क्षेत्र में" : "Dengue spike in your area"}
                    </h4>
                    <p className="text-xs text-red-700 mt-1">{tribalMode ? "30 जुलाई, 2025" : "Aug 30, 2025"}</p>
                  </div>
                  <Badge variant="destructive" className="text-xs shrink-0">
                    Urgent
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500 bg-orange-50 border-orange-200">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm">
                      {tribalMode ? "हीट एडवाइजरी, हाइड्रेटेड रहें" : "Heat advisory, stay hydrated"}
                    </h4>
                    <p className="text-xs text-orange-700 mt-1">{tribalMode ? "30 जुलाई, 2025" : "Aug 30, 2025"}</p>
                  </div>
                  <span
                    className="px-2 py-1 rounded text-xs font-medium shrink-0"
                    style={{ backgroundColor: "#f97316", color: "white" }}
                  >
                    Warning
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-cyan-600 text-white border-0">
            <CardContent className="p-3 text-center">
              <Users className="w-5 h-5 mx-auto mb-1 text-white" />
              <div className="text-xl font-bold text-white">24</div>
              <div className="text-xs text-white/90 leading-tight">{tribalMode ? "आज के मामले" : "Cases Today"}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-600 text-white border-0">
            <CardContent className="p-3 text-center">
              <Activity className="w-5 h-5 mx-auto mb-1 text-white" />
              <div className="text-xl font-bold text-white">Safe</div>
              <div className="text-xs text-white/90 leading-tight">
                {tribalMode ? "पानी की गुणवत्ता" : "Water Quality"}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-600 text-white border-0">
            <CardContent className="p-3 text-center">
              <TrendingUp className="w-5 h-5 mx-auto mb-1 text-white" />
              <div className="text-xl font-bold text-white">Low</div>
              <div className="text-xs text-white/90 leading-tight">{tribalMode ? "जोखिम स्तर" : "Risk Level"}</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-gray-900">{tribalMode ? "त्वरित कार्य" : "Quick Actions"}</h2>

          <div className="grid grid-cols-2 gap-2">
            <Link href="/report-symptoms" className="block">
              <div
                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 p-4 text-center touch-manipulation"
                style={{ backgroundColor: "#e11d48", color: "white", minHeight: "100px" }}
              >
                <Heart className="w-6 h-6 mx-auto mb-2" style={{ color: "white" }} />
                <h3 className="font-semibold text-sm" style={{ color: "white" }}>
                  {tribalMode ? "लक्षण रिपोर्ट" : "Report Symptoms"}
                </h3>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "white" }}>
                  {tribalMode ? "स्वास्थ्य समस्याएं साझा करें" : "Share health concerns"}
                </p>
              </div>
            </Link>

            <Link href="/water-quality" className="block">
              <div
                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 p-4 text-center touch-manipulation"
                style={{ backgroundColor: "#2563eb", color: "white", minHeight: "100px" }}
              >
                <Droplets className="w-6 h-6 mx-auto mb-2" style={{ color: "white" }} />
                <h3 className="font-semibold text-sm" style={{ color: "white" }}>
                  {tribalMode ? "पानी परीक्षण" : "Water Test"}
                </h3>
                <p className="text-xs mt-1 leading-relaxed" style={{ color: "white" }}>
                  {tribalMode ? "गुणवत्ता की जांच करें" : "Check quality levels"}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* Learn Section */}
        <Card className="bg-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="text-xl">📚</div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-white">{tribalMode ? "सीखें" : "Learn"}</h3>
                <p className="text-white/90 text-xs leading-relaxed">
                  {tribalMode
                    ? "स्वस्थ आदतें बनाने के लिए छोटे, मित्रवत वीडियो"
                    : "Short, friendly videos to build healthy habits"}
                </p>
              </div>
            </div>

            <div className="bg-green-800 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-9 bg-green-900 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-lg">🥗</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-white text-sm leading-tight">
                    {tribalMode
                      ? "इन सरल टिप्स के साथ अपने स्वास्थ्य को बढ़ावा दें!"
                      : "BOOST YOUR HEALTH WITH THESE SIMPLE TIPS!"}
                  </h4>
                  <p className="text-xs text-white/90">
                    {tribalMode ? "स्वास्थ्य टिप्स • 7 मिनट वीडियो" : "Health Tips • 7 min videos"}
                  </p>
                </div>
              </div>
            </div>

            <Link href="/education">
              <Button
                className="w-full bg-green-800 hover:bg-green-900 text-white border-white/30 active:scale-95 transition-transform touch-manipulation"
                style={{ minHeight: "44px" }}
              >
                {tribalMode ? "सभी वीडियो देखें" : "View all videos"}
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-600" />
              {tribalMode ? "हाल की गतिविधि" : "Recent Activity"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-200">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {tribalMode ? "नया पानी परीक्षण रिपोर्ट" : "New water test reported"}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{tribalMode ? "गांव A • 2 मिनट पहले" : "Village A • 2 minutes ago"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
              <div className="w-2 h-2 bg-rose-500 rounded-full shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  {tribalMode ? "बुखार के 3 मामले दर्ज" : "3 fever cases reported"}
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                  <MapPin className="w-3 h-3 shrink-0" />
                  <span className="truncate">{tribalMode ? "गांव B • 1 घंटा पहले" : "Village B • 1 hour ago"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
