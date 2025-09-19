"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Play, CheckCircle, Award, Volume2 } from "lucide-react"
import Link from "next/link"

interface EducationModule {
  id: string
  title: string
  titleHindi: string
  description: string
  descriptionHindi: string
  category: "hygiene" | "water" | "symptoms" | "prevention"
  duration: string
  completed: boolean
  icon: string
  progress: number
}

const modules: EducationModule[] = [
  {
    id: "1",
    title: "Hand Washing Techniques",
    titleHindi: "हाथ धोने की तकनीक",
    description: "Learn proper hand washing steps to prevent disease transmission",
    descriptionHindi: "बीमारी के संचरण को रोकने के लिए हाथ धोने के सही तरीके सीखें",
    category: "hygiene",
    duration: "5 min",
    completed: true,
    icon: "🧼",
    progress: 100,
  },
  {
    id: "2",
    title: "Safe Drinking Water",
    titleHindi: "सुरक्षित पेयजल",
    description: "How to identify and prepare safe drinking water",
    descriptionHindi: "सुरक्षित पेयजल की पहचान और तैयारी कैसे करें",
    category: "water",
    duration: "7 min",
    completed: false,
    icon: "💧",
    progress: 60,
  },
  {
    id: "3",
    title: "Recognizing Fever Symptoms",
    titleHindi: "बुखार के लक्षणों की पहचान",
    description: "Early signs of fever and when to seek medical help",
    descriptionHindi: "बुखार के शुरुआती संकेत और कब चिकित्सा सहायता लेनी चाहिए",
    category: "symptoms",
    duration: "6 min",
    completed: false,
    icon: "🤒",
    progress: 0,
  },
  {
    id: "4",
    title: "Food Safety Basics",
    titleHindi: "खाद्य सुरक्षा की मूल बातें",
    description: "Proper food storage and preparation to prevent illness",
    descriptionHindi: "बीमारी से बचने के लिए भोजन का सही भंडारण और तैयारी",
    category: "prevention",
    duration: "8 min",
    completed: false,
    icon: "🍽️",
    progress: 25,
  },
  {
    id: "5",
    title: "Water Purification Methods",
    titleHindi: "पानी शुद्धीकरण के तरीके",
    description: "Simple methods to purify water at home",
    descriptionHindi: "घर पर पानी शुद्ध करने के सरल तरीके",
    category: "water",
    duration: "10 min",
    completed: false,
    icon: "🔬",
    progress: 0,
  },
  {
    id: "6",
    title: "Community Health Practices",
    titleHindi: "सामुदायिक स्वास्थ्य प्रथाएं",
    description: "How communities can work together for better health",
    descriptionHindi: "बेहतर स्वास्थ्य के लिए समुदाय कैसे मिलकर काम कर सकते हैं",
    category: "prevention",
    duration: "12 min",
    completed: false,
    icon: "👥",
    progress: 0,
  },
]

const quizQuestions = [
  {
    question: "How long should you wash your hands?",
    questionHindi: "आपको कितनी देर तक हाथ धोने चाहिए?",
    options: ["10 seconds", "20 seconds", "30 seconds", "1 minute"],
    optionsHindi: ["10 सेकंड", "20 सेकंड", "30 सेकंड", "1 मिनट"],
    correct: 1,
  },
  {
    question: "What is the safest way to purify water?",
    questionHindi: "पानी शुद्ध करने का सबसे सुरक्षित तरीका क्या है?",
    options: ["Boiling", "Filtering", "Adding salt", "Letting it sit"],
    optionsHindi: ["उबालना", "छानना", "नमक मिलाना", "रखकर छोड़ना"],
    correct: 0,
  },
]

export default function Education() {
  const [tribalMode, setTribalMode] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [quizScore, setQuizScore] = useState(0)

  const categories = [
    { id: "all", label: "All Topics", labelHindi: "सभी विषय", icon: "📚" },
    { id: "hygiene", label: "Hygiene", labelHindi: "स्वच्छता", icon: "🧼" },
    { id: "water", label: "Water Safety", labelHindi: "पानी की सुरक्षा", icon: "💧" },
    { id: "symptoms", label: "Symptoms", labelHindi: "लक्षण", icon: "🤒" },
    { id: "prevention", label: "Prevention", labelHindi: "रोकथाम", icon: "🛡️" },
  ]

  const filteredModules =
    selectedCategory === "all" ? modules : modules.filter((module) => module.category === selectedCategory)

  const completedModules = modules.filter((m) => m.completed).length
  const totalProgress = Math.round((completedModules / modules.length) * 100)

  const handleQuizAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === quizQuestions[currentQuestion].correct) {
      setQuizScore(quizScore + 1)
    }

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Quiz completed
      alert(
        tribalMode
          ? `क्विज़ पूरी! स्कोर: ${quizScore + (selectedAnswer === quizQuestions[currentQuestion].correct ? 1 : 0)}/${quizQuestions.length}`
          : `Quiz completed! Score: ${quizScore + (selectedAnswer === quizQuestions[currentQuestion].correct ? 1 : 0)}/${quizQuestions.length}`,
      )
      setShowQuiz(false)
      setCurrentQuestion(0)
      setQuizScore(0)
    }
  }

  if (showQuiz) {
    const question = quizQuestions[currentQuestion]
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="sm" onClick={() => setShowQuiz(false)}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">{tribalMode ? "स्वास्थ्य क्विज़" : "Health Quiz"}</h1>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                {tribalMode ? "प्रश्न" : "Question"} {currentQuestion + 1}/{quizQuestions.length}
              </CardTitle>
              <Badge variant="outline">
                {tribalMode ? "स्कोर" : "Score"}: {quizScore}
              </Badge>
            </div>
            <Progress value={((currentQuestion + 1) / quizQuestions.length) * 100} className="w-full" />
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              {tribalMode ? question.questionHindi : question.question}
            </h3>

            <div className="space-y-2">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto p-4 bg-transparent"
                  onClick={() => handleQuizAnswer(index)}
                >
                  <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}.</span>
                  {tribalMode ? question.optionsHindi[index] : option}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
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
          <BookOpen className="w-6 h-6 text-chart-3" />
          <h1 className="text-xl font-bold text-foreground">{tribalMode ? "स्वास्थ्य शिक्षा" : "Health Education"}</h1>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="bg-card border-border mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                {tribalMode ? "आपकी प्रगति" : "Your Progress"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {completedModules} {tribalMode ? "का" : "of"} {modules.length}{" "}
                {tribalMode ? "मॉड्यूल पूरे" : "modules completed"}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-bold text-foreground">{totalProgress}%</span>
            </div>
          </div>
          <Progress value={totalProgress} className="w-full" />
        </CardContent>
      </Card>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <span>{category.icon}</span>
            <span>{tribalMode ? category.labelHindi : category.label}</span>
          </Button>
        ))}
      </div>

      {/* Education Modules */}
      <div className="space-y-4 mb-6">
        {filteredModules.map((module) => (
          <Card key={module.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="text-3xl">{module.icon}</div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-card-foreground">
                      {tribalMode ? module.titleHindi : module.title}
                    </h3>
                    {module.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {tribalMode ? module.descriptionHindi : module.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="text-xs">
                        {module.duration}
                      </Badge>
                      {module.progress > 0 && (
                        <div className="flex items-center gap-2">
                          <Progress value={module.progress} className="w-20 h-2" />
                          <span className="text-xs text-muted-foreground">{module.progress}%</span>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {tribalMode && (
                        <Button variant="outline" size="sm">
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      )}
                      <Button size="sm" className="bg-chart-3 hover:bg-chart-3/90 text-white">
                        <Play className="w-4 h-4 mr-1" />
                        {tribalMode ? "शुरू करें" : "Start"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quiz Section */}
      <Card className="bg-accent/10 border-accent/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {tribalMode ? "🎯 अपना ज्ञान परखें" : "🎯 Test Your Knowledge"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tribalMode
                  ? "स्वास्थ्य के बारे में अपनी जानकारी की जांच करें"
                  : "Take a quick quiz to test your health knowledge"}
              </p>
            </div>
            <Button onClick={() => setShowQuiz(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              {tribalMode ? "क्विज़ शुरू करें" : "Start Quiz"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Offline Notice */}
      <Card className="bg-muted/50 border-muted mt-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-muted-foreground">
              {tribalMode ? "सभी सामग्री ऑफलाइन उपलब्ध है" : "All content available offline"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
