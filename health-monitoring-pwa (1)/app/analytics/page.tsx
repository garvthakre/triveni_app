"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Users, AlertTriangle, Droplets, Heart, MapPin } from "lucide-react"
import MobileHeader from "@/components/mobile-header"
import BottomNavigation from "@/components/bottom-navigation"

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 pb-20">
      <MobileHeader title="Health Analytics" subtitle="Community health insights and trends" />

      <div className="px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">1,247</div>
              <div className="text-xs text-white/80">Total Cases</div>
              <div className="text-xs text-green-300 mt-1">↓ 12% from last week</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-500 to-pink-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <AlertTriangle className="w-5 h-5" />
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-2xl font-bold">23</div>
              <div className="text-xs text-white/80">Active Alerts</div>
              <div className="text-xs text-red-300 mt-1">↑ 5% from yesterday</div>
            </CardContent>
          </Card>
        </div>

        {/* Disease Outbreak Map */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              Disease Outbreak Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-cyan-50 to-blue-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Interactive Health Map</h3>
              <p className="text-sm text-gray-600 mb-4">
                View real-time disease patterns and outbreak zones across your region
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="bg-green-100 text-green-800 py-1 px-2 rounded">
                  <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1"></div>
                  Safe Zones
                </div>
                <div className="bg-yellow-100 text-yellow-800 py-1 px-2 rounded">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                  Moderate Risk
                </div>
                <div className="bg-red-100 text-red-800 py-1 px-2 rounded">
                  <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mb-1"></div>
                  High Risk
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Health Issues */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Heart className="w-5 h-5 text-gray-600" />
              Top Health Issues
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Dengue Fever</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">High Risk</Badge>
                  <span className="text-sm text-gray-600">45 cases</span>
                </div>
              </div>
              <Progress value={75} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Diarrhea</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-orange-500">Moderate</Badge>
                  <span className="text-sm text-gray-600">28 cases</span>
                </div>
              </div>
              <Progress value={50} className="h-2" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">Cough & Cold</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Low Risk</Badge>
                  <span className="text-sm text-gray-600">12 cases</span>
                </div>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </CardContent>
        </Card>

        {/* Water Quality Trends */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Droplets className="w-5 h-5 text-gray-600" />
              Water Quality Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">Safe</div>
                <div className="text-xs text-gray-600">pH Level</div>
                <div className="text-xs text-green-600">7.2</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">Good</div>
                <div className="text-xs text-gray-600">Clarity</div>
                <div className="text-xs text-blue-600">95%</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">Monitor</div>
                <div className="text-xs text-gray-600">Bacteria</div>
                <div className="text-xs text-orange-600">Low</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Water Safety</span>
                <Badge className="bg-green-500">Excellent</Badge>
              </div>
              <Progress value={92} className="h-3" />
              <div className="text-xs text-gray-600 mt-1">92% of sources meet safety standards</div>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Summary */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gray-600" />
              Weekly Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div className="text-lg font-bold text-green-700">156</div>
                <div className="text-sm text-green-600">Reports Submitted</div>
                <div className="text-xs text-green-500 mt-1">↑ 23% increase</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
                <div className="text-lg font-bold text-blue-700">89</div>
                <div className="text-sm text-blue-600">Water Tests</div>
                <div className="text-xs text-blue-500 mt-1">↑ 12% increase</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-purple-700">Community Health Score</div>
                  <div className="text-sm text-purple-600">Based on all health indicators</div>
                </div>
                <div className="text-3xl font-bold text-purple-700">B+</div>
              </div>
              <Progress value={78} className="h-3 mt-3" />
              <div className="text-xs text-purple-600 mt-1">78% - Good community health status</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  )
}
