"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Crown,
  Users,
  Globe,
  TrendingUp,
  Settings,
  Database,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Plane,
  BarChart3,
  Calendar,
  UserPlus,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
} from "lucide-react"

export function AdminDashboard() {
  const [selectedRegion, setSelectedRegion] = useState("global")
  const [timeRange, setTimeRange] = useState("30d")

  const globalStats = {
    totalApplications: 15847,
    activeOfficers: 45,
    countriesSupported: 195,
    systemUptime: 99.9,
    dailyApplications: 234,
    approvalRate: 87.5,
    avgProcessingTime: "3.2 days",
    pendingReviews: 1247,
  }

  const regions = [
    { code: "global", name: "🌍 Global", applications: 15847 },
    { code: "americas", name: "🌎 Americas", applications: 5234 },
    { code: "europe", name: "🇪🇺 Europe", applications: 4567 },
    { code: "asia", name: "🌏 Asia Pacific", applications: 3890 },
    { code: "africa", name: "🌍 Africa", applications: 1456 },
    { code: "middle-east", name: "🕌 Middle East", applications: 700 },
  ]

  const topCountries = [
    { country: "United States", flag: "🇺🇸", applications: 2456, growth: "+12%" },
    { country: "Canada", flag: "🇨🇦", applications: 1890, growth: "+8%" },
    { country: "United Kingdom", flag: "🇬🇧", applications: 1567, growth: "+15%" },
    { country: "Australia", flag: "🇦🇺", applications: 1234, growth: "+5%" },
    { country: "Germany", flag: "🇩🇪", applications: 987, growth: "+18%" },
  ]

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High Application Volume",
      message: "Applications increased by 25% in the last 24 hours",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "info",
      title: "System Maintenance",
      message: "Scheduled maintenance on Sunday 2:00 AM - 4:00 AM",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "success",
      title: "New Officer Onboarded",
      message: "Sarah Johnson has been added to the Europe region",
      time: "2 days ago",
    },
  ]

  const officers = [
    {
      id: 1,
      name: "Sarah Johnson",
      region: "Europe",
      status: "active",
      casesAssigned: 24,
      completionRate: 94,
      avgProcessingTime: "2.8 days",
    },
    {
      id: 2,
      name: "Mike Wilson",
      region: "Americas",
      status: "active",
      casesAssigned: 18,
      completionRate: 89,
      avgProcessingTime: "3.1 days",
    },
    {
      id: 3,
      name: "Emily Chen",
      region: "Asia Pacific",
      status: "busy",
      casesAssigned: 31,
      completionRate: 92,
      avgProcessingTime: "2.5 days",
    },
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case "info":
        return <Activity className="h-4 w-4 text-blue-500" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">🟢 Active</Badge>
      case "busy":
        return <Badge className="bg-yellow-100 text-yellow-800">🟡 Busy</Badge>
      case "offline":
        return <Badge className="bg-gray-100 text-gray-800">⚫ Offline</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Attractive Admin Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-8 text-white animate-in fade-in-50 duration-1000">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-8 left-8 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-8 right-8 w-48 h-48 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-cyan-300 rounded-full blur-2xl"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Crown className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold mb-2">Admin Control Center</h1>
                <p className="text-xl text-white/90">Global Immigration Management System</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{globalStats.systemUptime}%</div>
              <div className="text-sm text-white/80">System Uptime</div>
            </div>
          </div>

          {/* Region and Time Range Selection */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              <span className="font-medium">Region:</span>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48 bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region.code} value={region.code}>
                      {region.name} ({region.applications.toLocaleString()})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span className="font-medium">Period:</span>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-32 bg-white/20 border-white/30 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="90d">90 Days</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Global Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-5 w-5" />
                <span className="text-sm">Total Applications</span>
              </div>
              <div className="text-2xl font-bold">{globalStats.totalApplications.toLocaleString()}</div>
              <div className="text-xs text-white/70">+{globalStats.dailyApplications} today</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="text-sm">Active Officers</span>
              </div>
              <div className="text-2xl font-bold">{globalStats.activeOfficers}</div>
              <div className="text-xs text-white/70">Across all regions</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5" />
                <span className="text-sm">Approval Rate</span>
              </div>
              <div className="text-2xl font-bold">{globalStats.approvalRate}%</div>
              <div className="text-xs text-white/70">Last 30 days</div>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Avg. Processing</span>
              </div>
              <div className="text-2xl font-bold">{globalStats.avgProcessingTime}</div>
              <div className="text-xs text-white/70">System-wide</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Admin Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="officers">👥 Officers</TabsTrigger>
          <TabsTrigger value="countries">🌍 Countries</TabsTrigger>
          <TabsTrigger value="visa-services">✈️ Visa Services</TabsTrigger>
          <TabsTrigger value="system">⚙️ System</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Top Countries */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-500" />
                  Top Destination Countries
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topCountries.map((country, index) => (
                  <div
                    key={country.country}
                    className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 animate-in slide-in-from-left-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <div className="font-medium">{country.country}</div>
                        <div className="text-sm text-muted-foreground">
                          {country.applications.toLocaleString()} applications
                        </div>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{country.growth}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* System Alerts */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  System Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {systemAlerts.map((alert, index) => (
                  <div
                    key={alert.id}
                    className="p-3 rounded-lg border hover:shadow-md transition-all duration-200 animate-in slide-in-from-right-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm text-muted-foreground">{alert.message}</div>
                        <div className="text-xs text-muted-foreground mt-1">{alert.time}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-purple-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Officer
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  System Backup
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Reports
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Cache
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Officers Management Tab */}
        <TabsContent value="officers" className="space-y-6">
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Officer Management
              </CardTitle>
              <CardDescription>Manage immigration officers across all regions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {officers.map((officer, index) => (
                  <div
                    key={officer.id}
                    className="p-4 border rounded-lg hover:shadow-md transition-all duration-200 animate-in slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{officer.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>🌍 {officer.region}</span>
                            <span>📋 {officer.casesAssigned} cases</span>
                            <span>⚡ {officer.completionRate}% completion</span>
                            <span>⏱️ {officer.avgProcessingTime} avg</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(officer.status)}
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="h-3 w-3" />
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

        {/* Countries Tab */}
        <TabsContent value="countries" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-500" />
                  Country Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                  <p className="text-muted-foreground">Country-wise application distribution chart</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-purple-500" />
                  Regional Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                  <p className="text-muted-foreground">Regional processing performance chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Visa Services Tab */}
        <TabsContent value="visa-services" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="h-5 w-5 text-blue-500" />
                  Visa on Arrival Services
                </CardTitle>
                <CardDescription>Manage visa on arrival for different countries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">🇹🇭 Thailand</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">30 days • $35 fee</div>
                    <Progress value={85} className="mt-2" />
                    <div className="text-xs text-muted-foreground mt-1">85% approval rate</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">🇦🇪 UAE</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">90 days • $100 fee</div>
                    <Progress value={92} className="mt-2" />
                    <div className="text-xs text-muted-foreground mt-1">92% approval rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-purple-500" />
                  E-Visa Management
                </CardTitle>
                <CardDescription>Electronic visa application system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">🇮🇳 India E-Visa</span>
                      <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">1,234 applications today</div>
                    <Progress value={78} className="mt-2" />
                    <div className="text-xs text-muted-foreground mt-1">78% processed</div>
                  </div>
                  <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">🇻🇳 Vietnam E-Visa</span>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">567 applications today</div>
                    <Progress value={95} className="mt-2" />
                    <div className="text-xs text-muted-foreground mt-1">95% processed</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Tab */}
        <TabsContent value="system" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-blue-500" />
                  System Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Database Performance</span>
                      <span>98%</span>
                    </div>
                    <Progress value={98} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>API Response Time</span>
                      <span>95%</span>
                    </div>
                    <Progress value={95} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Server Uptime</span>
                      <span>99.9%</span>
                    </div>
                    <Progress value={99.9} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  System Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 overflow-y-auto space-y-2 text-sm">
                  <div className="p-2 rounded bg-green-50 dark:bg-green-900/20">
                    <span className="text-green-600">✓</span> System backup completed successfully
                  </div>
                  <div className="p-2 rounded bg-blue-50 dark:bg-blue-900/20">
                    <span className="text-blue-600">ℹ</span> New officer Sarah Johnson added
                  </div>
                  <div className="p-2 rounded bg-yellow-50 dark:bg-yellow-900/20">
                    <span className="text-yellow-600">⚠</span> High traffic detected
                  </div>
                  <div className="p-2 rounded bg-green-50 dark:bg-green-900/20">
                    <span className="text-green-600">✓</span> Database optimization completed
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
