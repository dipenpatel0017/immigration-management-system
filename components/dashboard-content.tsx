"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, FileCheck, Clock, AlertCircle, TrendingUp, Calendar, Globe, CheckCircle } from "lucide-react"
import { StatsChart } from "@/components/stats-chart"
import { ActivityTimeline } from "@/components/activity-timeline"
import { CountryAnalytics } from "@/components/country-analytics"
import type { UserRole } from "@/app/page"

interface DashboardContentProps {
  userRole: UserRole
}

export function DashboardContent({ userRole }: DashboardContentProps) {
  const getWelcomeMessage = () => {
    switch (userRole) {
      case "applicant":
        return "Welcome back! Track your immigration applications and appointments."
      case "officer":
        return "Officer Dashboard - Review applications and manage cases efficiently."
      case "admin":
        return "Admin Dashboard - Oversee the entire immigration management system."
    }
  }

  const getStatsCards = () => {
    if (userRole === "applicant") {
      return [
        {
          title: "My Applications",
          value: "3",
          description: "Active applications",
          icon: FileCheck,
          color: "from-blue-500 to-cyan-500",
          trend: "+1 this month",
        },
        {
          title: "Pending Reviews",
          value: "2",
          description: "Awaiting officer review",
          icon: Clock,
          color: "from-orange-500 to-red-500",
          trend: "2 in queue",
        },
        {
          title: "Appointments",
          value: "1",
          description: "Upcoming this week",
          icon: Calendar,
          color: "from-green-500 to-emerald-500",
          trend: "Next: Tomorrow",
        },
        {
          title: "Documents",
          value: "8",
          description: "Uploaded documents",
          icon: FileCheck,
          color: "from-purple-500 to-pink-500",
          trend: "All verified",
        },
      ]
    } else if (userRole === "officer") {
      return [
        {
          title: "Assigned Cases",
          value: "24",
          description: "Cases to review",
          icon: Users,
          color: "from-blue-500 to-cyan-500",
          trend: "+3 today",
        },
        {
          title: "Pending Reviews",
          value: "12",
          description: "Awaiting your review",
          icon: Clock,
          color: "from-orange-500 to-red-500",
          trend: "High priority: 4",
        },
        {
          title: "Approved Today",
          value: "8",
          description: "Applications approved",
          icon: CheckCircle,
          color: "from-green-500 to-emerald-500",
          trend: "+2 from yesterday",
        },
        {
          title: "Interviews",
          value: "5",
          description: "Scheduled this week",
          icon: Calendar,
          color: "from-purple-500 to-pink-500",
          trend: "Next: 2 PM",
        },
      ]
    } else {
      return [
        {
          title: "Total Applications",
          value: "1,247",
          description: "All time applications",
          icon: Users,
          color: "from-blue-500 to-cyan-500",
          trend: "+12% from last month",
        },
        {
          title: "Pending Reviews",
          value: "89",
          description: "Awaiting officer review",
          icon: Clock,
          color: "from-orange-500 to-red-500",
          trend: "Average: 3.2 days",
        },
        {
          title: "Active Officers",
          value: "15",
          description: "Officers online",
          icon: Users,
          color: "from-green-500 to-emerald-500",
          trend: "Peak hours: 12",
        },
        {
          title: "System Alerts",
          value: "3",
          description: "Require attention",
          icon: AlertCircle,
          color: "from-red-500 to-pink-500",
          trend: "1 critical",
        },
      ]
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2 animate-in fade-in-50 duration-500">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground">{getWelcomeMessage()}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {getStatsCards().map((stat, index) => (
          <Card
            key={stat.title}
            className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
            />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <div
                className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-xs text-green-600 dark:text-green-400">{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="animate-in slide-in-from-left-4 duration-700 delay-300 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-500" />
              Application Statistics
            </CardTitle>
            <CardDescription>Monthly application trends and status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <StatsChart />
          </CardContent>
        </Card>

        <Card className="animate-in slide-in-from-right-4 duration-700 delay-300 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              Country Analytics
            </CardTitle>
            <CardDescription>Applications by country of origin</CardDescription>
          </CardHeader>
          <CardContent>
            <CountryAnalytics />
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <Card className="animate-in slide-in-from-bottom-4 duration-700 delay-500 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-500" />
            Recent Activity
          </CardTitle>
          <CardDescription>Latest updates and system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <ActivityTimeline userRole={userRole} />
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {userRole === "applicant" && (
        <Card className="animate-in slide-in-from-bottom-4 duration-700 delay-700 shadow-lg border-0">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              New Application
            </Button>
            <Button
              variant="outline"
              className="hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300 hover:scale-105"
            >
              Upload Documents
            </Button>
            <Button
              variant="outline"
              className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 hover:scale-105"
            >
              Schedule Appointment
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
