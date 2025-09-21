"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, MapPin, Clock, Users, Droplets, Activity } from "lucide-react"
import MobileHeader from "@/components/mobile-header"

interface Alert {
  id: string
  type: "outbreak" | "water" | "weather"
  level: "low" | "medium" | "high"
  title: string
  titleHindi: string
  description: string
  descriptionHindi: string
  location: string
  locationHindi: string
  timestamp: string
  affectedCount?: number
}

const alerts: Alert[] = [
  {
    id: "1",
    type: "outbreak",
    level: "high",
    title: "Fever Outbreak Alert",
    titleHindi: "बुखार का प्रकोप",
    description: "Multiple fever cases reported in the area. Immediate medical attention recommended.",
    descriptionHindi: "इस क्षेत्र में कई बुखार के मामले दर्ज किए गए हैं। तुरंत चिकित्सा सहायता की सलाह दी जाती है।",
    location: "Village A, Sector 2",
    locationHindi: "गांव A, सेक्टर 2",
    timestamp: "2 hours ago",
    affectedCount: 15,
  },
  {
    id: "2",
    type: "water",
    level: "high",
    title: "Water Contamination",
    titleHindi: "पानी में संदूषण",
    description: "High bacterial count detected in main water source. Avoid consumption.",
    descriptionHindi: "मुख्य जल स्रोत में उच्च बैक्टीरिया की मात्रा पाई गई है। सेवन से बचें।",
    location: "Central Well, Village B",
    locationHindi: "केंद्रीय कुआं, गांव B",
    timestamp: "4 hours ago",
    affectedCount: 200,
  },
  {
    id: "3",
    type: "outbreak",
    level: "medium",
    title: "Diarrhea Cases Increasing",
    titleHindi: "दस्त के मामले बढ़ रहे हैं",
    description: "Rising trend of diarrhea cases. Monitor water sources and hygiene.",
    descriptionHindi: "दस्त के मामलों में बढ़ती प्रवृत्ति। पानी के स्रोतों और स्वच्छता की निगरानी करें।",
    location: "Village C",
    locationHindi: "गांव C",
    timestamp: "1 day ago",
    affectedCount: 8,
  },
  {
    id: "4",
    type: "weather",
    level: "low",
    title: "Heavy Rain Expected",
    titleHindi: "भारी बारिश की संभावना",
    description: "Heavy rainfall predicted. Risk of water contamination may increase.",
    descriptionHindi: "भारी बारिश की भविष्यवाणी। पानी के संदूषण का खतरा बढ़ सकता है।",
    location: "Entire District",
    locationHindi: "पूरा जिला",
    timestamp: "6 hours ago",
  },
]

export default function Alerts() {
  const [tribalMode, setTribalMode] = useState(false)
  const [activeTab, setActiveTab] = useState("list")

  const getLevelColor = (level: string) => {
    switch (level) {
      case "high":
        return "bg-destructive text-destructive-foreground"
      case "medium":
        return "bg-yellow-500 text-white"
      case "low":
        return "bg-green-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "high":
        return "🔴"
      case "medium":
        return "🟡"
      case "low":
        return "🟢"
      default:
        return "⚪"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "outbreak":
        return <Activity className="w-4 h-4" />
      case "water":
        return <Droplets className="w-4 h-4" />
      case "weather":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <MobileHeader
        title={tribalMode ? "स्वास्थ्य अलर्ट" : "Health Alerts"}
        subtitle={tribalMode ? "समुदायिक स्वास्थ्य चेतावनी" : "Community health warnings"}
        showTribalToggle={true}
        tribalMode={tribalMode}
        onTribalModeChange={setTribalMode}
      />

      <div className="px-3 py-4 max-w-screen-sm mx-auto space-y-4">
        {/* Alert Summary */}
        <div className="grid grid-cols-3 gap-2">
          <Card className="bg-red-50 border-red-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-red-600">{alerts.filter((a) => a.level === "high").length}</div>
              <div className="text-xs text-red-600">{tribalMode ? "उच्च जोखिम" : "High Risk"}</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-50 border-yellow-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-yellow-600">
                {alerts.filter((a) => a.level === "medium").length}
              </div>
              <div className="text-xs text-yellow-600">{tribalMode ? "मध्यम जोखिम" : "Medium Risk"}</div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-3 text-center">
              <div className="text-xl font-bold text-green-600">{alerts.filter((a) => a.level === "low").length}</div>
              <div className="text-xs text-green-600">{tribalMode ? "कम जोखिम" : "Low Risk"}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for List and Map View */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-10">
            <TabsTrigger value="list" className="flex items-center gap-1 text-sm">
              <AlertTriangle className="w-3 h-3" />
              {tribalMode ? "सूची" : "List"}
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-1 text-sm">
              <MapPin className="w-3 h-3" />
              {tribalMode ? "नक्शा" : "Map"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-3 mt-4">
            {alerts.map((alert) => (
              <Card key={alert.id} className="bg-white border border-gray-200">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {tribalMode ? (
                        <span className="text-lg">{getLevelIcon(alert.level)}</span>
                      ) : (
                        getTypeIcon(alert.type)
                      )}
                      <Badge className={getLevelColor(alert.level)} variant="secondary">
                        {tribalMode
                          ? alert.level === "high"
                            ? "उच्च"
                            : alert.level === "medium"
                              ? "मध्यम"
                              : "कम"
                          : alert.level.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                  <CardTitle className="text-base text-gray-900 leading-tight">
                    {tribalMode ? alert.titleHindi : alert.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {tribalMode ? alert.descriptionHindi : alert.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{tribalMode ? alert.locationHindi : alert.location}</span>
                    </div>

                    {alert.affectedCount && (
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="w-3 h-3 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          {alert.affectedCount} {tribalMode ? "प्रभावित" : "affected"}
                        </span>
                      </div>
                    )}
                  </div>

                  {alert.level === "high" && (
                    <div className="mt-2 p-2 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm font-medium text-red-700">
                        {tribalMode ? "⚠️ तुरंत कार्रवाई की आवश्यकता है!" : "⚠️ Immediate action required!"}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="map" className="mt-4">
            <Card className="bg-white border border-gray-200">
              <CardContent className="p-4">
                {/* Simplified Map View */}
                <div className="relative bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto" />
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {tribalMode ? "इंटरैक्टिव मैप" : "Interactive Map"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {tribalMode
                          ? "अलर्ट स्थानों का नक्शा यहां दिखाया जाएगा"
                          : "Map showing alert locations will be displayed here"}
                      </p>
                    </div>

                    {/* Mock Map Markers */}
                    <div className="absolute top-16 left-16 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    <div className="absolute top-24 right-20 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-16 left-24 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Map Legend */}
                <div className="mt-3 flex justify-center gap-4">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{tribalMode ? "उच्च जोखिम" : "High Risk"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{tribalMode ? "मध्यम जोखिम" : "Medium Risk"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">{tribalMode ? "कम जोखिम" : "Low Risk"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Emergency Contact */}
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-red-700 text-sm">
                  {tribalMode ? "आपातकालीन संपर्क" : "Emergency Contact"}
                </h3>
                <p className="text-xs text-red-600">
                  {tribalMode ? "गंभीर स्थिति में तुरंत कॉल करें: 108" : "For serious situations, call immediately: 108"}
                </p>
              </div>
              <Button variant="destructive" size="sm" className="shrink-0">
                {tribalMode ? "कॉल करें" : "Call Now"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
