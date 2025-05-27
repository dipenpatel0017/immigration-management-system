"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Shield,
  Users,
  FileCheck,
  Clock,
  Globe,
  Plane,
  Search,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Download,
  Flag,
  TrendingUp,
  UserCheck,
  FileText,
  Stamp,
} from "lucide-react"

export function OfficerDashboard() {
  const [selectedCountry, setSelectedCountry] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("pending")

  const countries = [
    { code: "US", name: "United States", flag: "🇺🇸", applications: 245 },
    { code: "CA", name: "Canada", flag: "🇨🇦", applications: 189 },
    { code: "UK", name: "United Kingdom", flag: "🇬🇧", applications: 156 },
    { code: "AU", name: "Australia", flag: "🇦🇺", applications: 134 },
    { code: "DE", name: "Germany", flag: "🇩🇪", applications: 98 },
    { code: "FR", name: "France", flag: "🇫🇷", applications: 87 },
  ]

  const pendingApplications = [
    {
      id: "APP-2024-156",
      applicant: "Maria Rodriguez",
      country: "Mexico",
      type: "Tourist Visa",
      priority: "high",
      submittedDate: "2024-01-25",
      visaOnArrival: false,
      eVisa: true,
    },
    {
      id: "APP-2024-157",
      applicant: "Ahmed Hassan",
      country: "Egypt",
      type: "Business Visa",
      priority: "normal",
      submittedDate: "2024-01-24",
      visaOnArrival: true,
      eVisa: false,
    },
    {
      id: "APP-2024-158",
      applicant: "Li Wei",
      country: "China",
      type: "Student Visa",
      priority: "urgent",
      submittedDate: "2024-01-23",
      visaOnArrival: false,
      eVisa: true,
    },
  ]

  const visaOnArrivalCountries = [
    { country: "Thailand", flag: "🇹🇭", duration: "30 days", fee: "$35" },
    { country: "UAE", flag: "🇦🇪", duration: "90 days", fee: "$100" },
    { country: "Turkey", flag: "🇹🇷", duration: "90 days", fee: "$50" },
    { country: "Jordan", flag: "🇯🇴", duration: "30 days", fee: "$40" },
  ]

  const eVisaApplications = [
    {
      id: "EVISA-2024-001",
      applicant: "John Smith",
      destination: "India",
      status: "approved",
      type: "Tourist",
      validUntil: "2024-12-31",
    },
    {
      id: "EVISA-2024-002",
      applicant: "Sarah Johnson",
      destination: "Vietnam",
      status: "pending",
      type: "Business",
      validUntil: "2024-11-15",
    },
    {
      id: "EVISA-2024-003",
      applicant: "Michael Chen",
      destination: "Sri Lanka",
      status: "rejected",
      type: "Tourist",
      validUntil: "N/A",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "urgent":
        return <Badge className="bg-red-100 text-red-800">🚨 Urgent</Badge>
      case "high":
        return <Badge className="bg-orange-100 text-orange-800">⚡ High</Badge>
      case "normal":
        return <Badge className="bg-blue-100 text-blue-800">📋 Normal</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">✅ Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">⏳ Pending</Badge>
      case "rejected":
        return <Badge className="bg-red-100 text-red-800">❌ Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Attractive Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white animate-in fade-in-50 duration-1000">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-cyan-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-pink-300 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Shield className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Officer Dashboard</h1>
                <p className="text-xl text-white/90">Immigration Control Center</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">24</div>
              <div className="text-sm text-white/80">Pending Reviews</div>
            </div>
          </div>

          {/* Country Selection */}
          <div className="flex items-center gap-4 mb-6">
            <Globe className="h-5 w-5" />
            <span className="font-medium">Immigration Destination:</span>
            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-64 bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">🌍 All Countries</SelectItem>
                {countries.map((country) => (
                  <SelectItem key={country.code} value={country.code}>
                    {country.flag} {country.name} ({country.applications})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileCheck className="h-5 w-5" />
                <span className="text-sm">Today's Reviews</span>
              </div>
              <div className="text-2xl font-bold">18</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Avg. Processing</span>
              </div>
              <div className="text-2xl font-bold">2.5h</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Approval Rate</span>
              </div>
              <div className="text-2xl font-bold">94%</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Active Cases</span>
              </div>
              <div className="text-2xl font-bold">156</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <TabsTrigger value="pending" className="data-[state=active]:bg-white">
            📋 Pending Applications
          </TabsTrigger>
          <TabsTrigger value="visa-arrival" className="data-[state=active]:bg-white">
            ✈️ Visa on Arrival
          </TabsTrigger>
          <TabsTrigger value="evisa" className="data-[state=active]:bg-white">
            💻 E-Visa Check
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-white">
            📊 Analytics
          </TabsTrigger>
        </TabsList>

        {/* Pending Applications Tab */}
        <TabsContent value="pending" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-500" />
                Pending Applications Review
              </CardTitle>
              <CardDescription>Applications requiring your immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApplications.map((app, index) => (
                  <div
                    key={app.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 animate-in slide-in-from-left-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          <UserCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{app.applicant}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>🌍 {app.country}</span>
                            <span>📄 {app.type}</span>
                            <span>📅 {app.submittedDate}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {app.visaOnArrival && <Badge variant="outline">✈️ Visa on Arrival</Badge>}
                            {app.eVisa && <Badge variant="outline">💻 E-Visa</Badge>}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getPriorityBadge(app.priority)}
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                            <CheckCircle className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <XCircle className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Visa on Arrival Tab */}
        <TabsContent value="visa-arrival" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5 text-green-500" />
                Visa on Arrival Management
              </CardTitle>
              <CardDescription>Countries offering visa on arrival services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {visaOnArrivalCountries.map((country, index) => (
                  <div
                    key={country.country}
                    className="p-6 border rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{country.flag}</span>
                        <div>
                          <h3 className="font-semibold text-lg">{country.country}</h3>
                          <p className="text-sm text-muted-foreground">Visa on Arrival Available</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Duration:</span>
                        <span className="font-medium">{country.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Fee:</span>
                        <span className="font-medium">{country.fee}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" className="flex-1">
                        <Stamp className="h-3 w-3 mr-1" />
                        Process
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* E-Visa Check Tab */}
        <TabsContent value="evisa" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-purple-500" />
                E-Visa Application Checker
              </CardTitle>
              <CardDescription>Verify and manage electronic visa applications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search Bar */}
              <div className="flex gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by E-Visa ID, passport number, or name..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                  <Search className="h-4 w-4 mr-2" />
                  Check E-Visa
                </Button>
              </div>

              {/* E-Visa Applications */}
              <div className="space-y-4">
                {eVisaApplications.map((evisa, index) => (
                  <div
                    key={evisa.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 animate-in slide-in-from-right-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 text-white">
                          <Globe className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{evisa.applicant}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>🆔 {evisa.id}</span>
                            <span>🌍 {evisa.destination}</span>
                            <span>📄 {evisa.type}</span>
                            <span>📅 Valid until: {evisa.validUntil}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(evisa.status)}
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Processing Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                  <p className="text-muted-foreground">Processing time analytics chart</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5 text-green-500" />
                  Country Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <p className="text-muted-foreground">Country-wise application chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
