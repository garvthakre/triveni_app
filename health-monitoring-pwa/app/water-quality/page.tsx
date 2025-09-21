"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Droplets, Camera, MapPin, AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

interface WaterQualityData {
  sourceName: string
  location: string
  ph: number
  turbidity: number
  bacteria: string
  color: string
  odor: string
}

export default function WaterQuality() {
  const [tribalMode, setTribalMode] = useState(false)
  const [formData, setFormData] = useState<WaterQualityData>({
    sourceName: "",
    location: "",
    ph: 7,
    turbidity: 0,
    bacteria: "",
    color: "",
    odor: "",
  })

  const getPHStatus = (ph: number) => {
    if (ph < 6.5 || ph > 8.5) return { status: "danger", text: tribalMode ? "खराब" : "Poor", color: "text-destructive" }
    if (ph < 7 || ph > 8) return { status: "warning", text: tribalMode ? "सामान्य" : "Fair", color: "text-yellow-600" }
    return { status: "good", text: tribalMode ? "अच्छा" : "Good", color: "text-green-600" }
  }

  const getTurbidityStatus = (turbidity: number) => {
    if (turbidity > 4) return { status: "danger", text: tribalMode ? "खराब" : "Poor", color: "text-destructive" }
    if (turbidity > 1) return { status: "warning", text: tribalMode ? "सामान्य" : "Fair", color: "text-yellow-600" }
    return { status: "good", text: tribalMode ? "अच्छा" : "Good", color: "text-green-600" }
  }

  const handleSubmit = () => {
    // In a real app, this would save to IndexedDB and sync when online
    console.log("Water quality report submitted:", formData)
    alert(tribalMode ? "पानी की रिपोर्ट सफलतापूर्वक भेजी गई!" : "Water quality report submitted successfully!")
  }

  const phStatus = getPHStatus(formData.ph)
  const turbidityStatus = getTurbidityStatus(formData.turbidity)

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link href="/">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-2">
          <Droplets className="w-6 h-6 text-accent" />
          <h1 className="text-xl font-bold text-foreground">
            {tribalMode ? "पानी की गुणवत्ता जांच" : "Water Quality Test"}
          </h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Source Information */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center gap-2">
              {tribalMode ? "📍 पानी का स्रोत" : "📍 Water Source Information"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="sourceName" className="text-sm font-medium">
                {tribalMode ? "स्रोत का नाम" : "Source Name"}
              </Label>
              <Input
                id="sourceName"
                placeholder={tribalMode ? "जैसे: कुआं, नलकूप, तालाब" : "e.g., Well, Borewell, Pond"}
                value={formData.sourceName}
                onChange={(e) => setFormData((prev) => ({ ...prev, sourceName: e.target.value }))}
                className="text-lg p-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                {tribalMode ? "स्थान" : "Location"}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="location"
                  placeholder={tribalMode ? "गांव या क्षेत्र का नाम" : "Village or Area Name"}
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  className="flex-1"
                />
                <Button variant="outline" size="icon">
                  <MapPin className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* pH Level */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center justify-between">
              <span>{tribalMode ? "🧪 pH स्तर" : "🧪 pH Level"}</span>
              <div className={`flex items-center gap-2 ${phStatus.color}`}>
                {phStatus.status === "good" && <CheckCircle className="w-4 h-4" />}
                {phStatus.status === "warning" && <AlertTriangle className="w-4 h-4" />}
                {phStatus.status === "danger" && <AlertTriangle className="w-4 h-4" />}
                <span className="text-sm font-medium">{phStatus.text}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{tribalMode ? "अम्लीय" : "Acidic"}</span>
                <span className="font-bold text-lg text-foreground">{formData.ph.toFixed(1)}</span>
                <span>{tribalMode ? "क्षारीय" : "Alkaline"}</span>
              </div>
              <Slider
                value={[formData.ph]}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, ph: value[0] }))}
                max={14}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span className="text-green-600 font-medium">6.5-8.5 {tribalMode ? "(सुरक्षित)" : "(Safe)"}</span>
                <span>14</span>
              </div>
            </div>

            {/* Visual pH Indicator */}
            <div className="flex justify-center">
              <div className="w-full max-w-md h-8 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 relative">
                <div
                  className="absolute w-4 h-4 bg-white border-2 border-gray-800 rounded-full top-2 transform -translate-x-2"
                  style={{ left: `${(formData.ph / 14) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Turbidity */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground flex items-center justify-between">
              <span>{tribalMode ? "🌊 पानी की साफता" : "🌊 Water Clarity (Turbidity)"}</span>
              <div className={`flex items-center gap-2 ${turbidityStatus.color}`}>
                {turbidityStatus.status === "good" && <CheckCircle className="w-4 h-4" />}
                {turbidityStatus.status === "warning" && <AlertTriangle className="w-4 h-4" />}
                {turbidityStatus.status === "danger" && <AlertTriangle className="w-4 h-4" />}
                <span className="text-sm font-medium">{turbidityStatus.text}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{tribalMode ? "साफ" : "Clear"}</span>
                <span className="font-bold text-lg text-foreground">{formData.turbidity.toFixed(1)} NTU</span>
                <span>{tribalMode ? "गंदा" : "Cloudy"}</span>
              </div>
              <Slider
                value={[formData.turbidity]}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, turbidity: value[0] }))}
                max={10}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span className="text-green-600 font-medium">
                  {"<1 "}
                  {tribalMode ? "(सुरक्षित)" : "(Safe)"}
                </span>
                <span>10+</span>
              </div>
            </div>

            {/* Visual Turbidity Indicator */}
            <div className="flex justify-center gap-2">
              {[0, 1, 2, 4, 6, 8, 10].map((level) => (
                <div
                  key={level}
                  className={`w-8 h-12 rounded border-2 ${
                    formData.turbidity >= level ? "border-primary" : "border-gray-300"
                  }`}
                  style={{
                    backgroundColor: `rgba(139, 69, 19, ${Math.min(level / 10, 0.8)})`,
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visual Assessment */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg text-card-foreground">
              {tribalMode ? "👁️ देखकर जांच" : "👁️ Visual Assessment"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Label className="text-sm font-medium">{tribalMode ? "पानी का रंग" : "Water Color"}</Label>
              <RadioGroup
                value={formData.color}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, color: value }))}
                className="grid grid-cols-2 gap-3"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="clear" id="clear" />
                  <Label htmlFor="clear" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border rounded"></div>
                    <span>{tribalMode ? "साफ" : "Clear"}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="yellow" id="yellow" />
                  <Label htmlFor="yellow" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-300 border rounded"></div>
                    <span>{tribalMode ? "पीला" : "Yellow"}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="brown" id="brown" />
                  <Label htmlFor="brown" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-amber-600 border rounded"></div>
                    <span>{tribalMode ? "भूरा" : "Brown"}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="green" id="green" />
                  <Label htmlFor="green" className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-400 border rounded"></div>
                    <span>{tribalMode ? "हरा" : "Green"}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">{tribalMode ? "गंध" : "Odor"}</Label>
              <RadioGroup
                value={formData.odor}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, odor: value }))}
                className="grid grid-cols-2 gap-3"
              >
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="flex items-center gap-2">
                    <span>✅</span>
                    <span>{tribalMode ? "कोई गंध नहीं" : "No Odor"}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="chemical" id="chemical" />
                  <Label htmlFor="chemical" className="flex items-center gap-2">
                    <span>🧪</span>
                    <span>{tribalMode ? "रासायनिक" : "Chemical"}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="sewage" id="sewage" />
                  <Label htmlFor="sewage" className="flex items-center gap-2">
                    <span>🤢</span>
                    <span>{tribalMode ? "गंदगी" : "Sewage"}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="flex items-center gap-2">
                    <span>❓</span>
                    <span>{tribalMode ? "अन्य" : "Other"}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Photo Capture */}
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <Button variant="outline" size="lg" className="w-full bg-transparent">
              <Camera className="w-5 h-5 mr-2" />
              {tribalMode ? "टेस्ट स्ट्रिप की फोटो लें" : "Capture Test Strip Photo"}
            </Button>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button onClick={handleSubmit} size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          {tribalMode ? "रिपोर्ट भेजें" : "Submit Water Quality Report"}
        </Button>
      </div>
    </div>
  )
}
