"use client"

import { useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, ArrowRight, MapPin, Camera, Mic, Heart } from "lucide-react"
import Link from "next/link"

interface SymptomData {
  age: string
  gender: string
  symptoms: string[]
  location: string
  severity: string
}

const symptoms = [
  { id: "fever", label: "Fever", icon: "🤒", hindi: "बुखार" },
  { id: "diarrhea", label: "Diarrhea", icon: "🤢", hindi: "दस्त" },
  { id: "vomiting", label: "Vomiting", icon: "🤮", hindi: "उल्टी" },
  { id: "headache", label: "Headache", icon: "😵", hindi: "सिरदर्द" },
  { id: "cough", label: "Cough", icon: "😷", hindi: "खांसी" },
  { id: "fatigue", label: "Fatigue", icon: "😴", hindi: "थकान" },
  { id: "jaundice", label: "Jaundice", icon: "🟡", hindi: "पीलिया" },
  { id: "rash", label: "Skin Rash", icon: "🔴", hindi: "चकत्ते" },
]

export default function ReportSymptoms() {
  const [currentStep, setCurrentStep] = useState(1)
  const [tribalMode, setTribalMode] = useState(false)
  const [formData, setFormData] = useState<SymptomData>({
    age: "",
    gender: "",
    symptoms: [],
    location: "",
    severity: "",
  })

  const handleSymptomToggle = (symptomId: string) => {
    setFormData((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptomId)
        ? prev.symptoms.filter((s) => s !== symptomId)
        : [...prev.symptoms, symptomId],
    }))
  }

  const nextStep = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleSubmit = () => {
    // In a real app, this would save to IndexedDB and sync when online
    console.log("Symptom report submitted:", formData)
    alert(tribalMode ? "रिपोर्ट सफलतापूर्वक भेजी गई!" : "Report submitted successfully!")
  }

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
          <Heart className="w-6 h-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">{tribalMode ? "लक्षण रिपोर्ट करें" : "Report Symptoms"}</h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-muted-foreground mb-2">
          <span>
            {tribalMode ? "चरण" : "Step"} {currentStep} {tribalMode ? "का" : "of"} 5
          </span>
          <span>{Math.round((currentStep / 5) * 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardContent className="p-6">
          {/* Step 1: Age */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <CardTitle className="text-lg text-card-foreground">
                {tribalMode ? "🎂 उम्र बताएं" : "Patient Age"}
              </CardTitle>
              <div className="space-y-2">
                <Label htmlFor="age" className="text-sm font-medium">
                  {tribalMode ? "साल में उम्र" : "Age in years"}
                </Label>
                <Input
                  id="age"
                  type="number"
                  placeholder={tribalMode ? "जैसे: 25" : "e.g., 25"}
                  value={formData.age}
                  onChange={(e) => setFormData((prev) => ({ ...prev, age: e.target.value }))}
                  className="text-lg p-4"
                />
              </div>
            </div>
          )}

          {/* Step 2: Gender */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <CardTitle className="text-lg text-card-foreground">
                {tribalMode ? "👤 लिंग चुनें" : "Select Gender"}
              </CardTitle>
              <RadioGroup
                value={formData.gender}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="flex items-center gap-2 cursor-pointer">
                    <span className="text-2xl">👨</span>
                    <span>{tribalMode ? "पुरुष" : "Male"}</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="flex items-center gap-2 cursor-pointer">
                    <span className="text-2xl">👩</span>
                    <span>{tribalMode ? "महिला" : "Female"}</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Symptoms */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <CardTitle className="text-lg text-card-foreground">
                {tribalMode ? "🤒 लक्षण चुनें" : "Select Symptoms"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {tribalMode ? "जो भी लक्षण हैं उन्हें चुनें" : "Select all symptoms that apply"}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {symptoms.map((symptom) => (
                  <div
                    key={symptom.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      formData.symptoms.includes(symptom.id)
                        ? "border-primary bg-primary/10"
                        : "border-border hover:bg-muted"
                    }`}
                    onClick={() => handleSymptomToggle(symptom.id)}
                  >
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        checked={formData.symptoms.includes(symptom.id)}
                        onChange={() => handleSymptomToggle(symptom.id)}
                      />
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{symptom.icon}</span>
                        <span className="text-xs text-center">{tribalMode ? symptom.hindi : symptom.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Location */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <CardTitle className="text-lg text-card-foreground">{tribalMode ? "📍 स्थान बताएं" : "Location"}</CardTitle>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    {tribalMode ? "गांव या क्षेत्र का नाम" : "Village or Area Name"}
                  </Label>
                  <Input
                    id="location"
                    placeholder={tribalMode ? "जैसे: गांव A" : "e.g., Village A"}
                    value={formData.location}
                    onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                    className="text-lg p-4"
                  />
                </div>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <MapPin className="w-4 h-4 mr-2" />
                  {tribalMode ? "GPS से स्थान लें" : "Use GPS Location"}
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Additional Info */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <CardTitle className="text-lg text-card-foreground">
                {tribalMode ? "📋 अतिरिक्त जानकारी" : "Additional Information"}
              </CardTitle>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">{tribalMode ? "गंभीरता" : "Severity Level"}</Label>
                  <RadioGroup
                    value={formData.severity}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, severity: value }))}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="mild" id="mild" />
                      <Label htmlFor="mild" className="flex items-center gap-1">
                        <span className="text-green-500">🟢</span>
                        <span>{tribalMode ? "हल्का" : "Mild"}</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="moderate" id="moderate" />
                      <Label htmlFor="moderate" className="flex items-center gap-1">
                        <span className="text-yellow-500">🟡</span>
                        <span>{tribalMode ? "मध्यम" : "Moderate"}</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="severe" id="severe" />
                      <Label htmlFor="severe" className="flex items-center gap-1">
                        <span className="text-red-500">🔴</span>
                        <span>{tribalMode ? "गंभीर" : "Severe"}</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                    <Camera className="w-4 h-4 mr-2" />
                    {tribalMode ? "फोटो लें" : "Take Photo"}
                  </Button>
                  <Button variant="outline" size="lg" className="flex-1 bg-transparent">
                    <Mic className="w-4 h-4 mr-2" />
                    {tribalMode ? "आवाज रिकॉर्ड करें" : "Record Audio"}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6 pt-4 border-t">
            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1} size="lg">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {tribalMode ? "पिछला" : "Previous"}
            </Button>

            {currentStep === 5 ? (
              <Button onClick={handleSubmit} size="lg" className="bg-primary hover:bg-primary/90">
                {tribalMode ? "रिपोर्ट भेजें" : "Submit Report"}
              </Button>
            ) : (
              <Button onClick={nextStep} size="lg" className="bg-primary hover:bg-primary/90">
                {tribalMode ? "अगला" : "Next"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
