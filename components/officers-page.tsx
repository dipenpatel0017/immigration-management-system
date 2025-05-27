"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Mail, Phone, MapPin, CheckCircle, Clock, UserPlus, Settings, Shield } from "lucide-react"
import type { UserRole } from "@/app/page"

interface OfficersPageProps {
  userRole: UserRole
}

export function OfficersPage({ userRole }: OfficersPageProps) {
  const officers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@immigration.gov",
      phone: "+1 (555) 123-4567",
      department: "Work Permits",
      status: "active",
      location: "Downtown Office",
      assignedCases: 24,
      completedCases: 156,
      joinDate: "2022-03-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Mike Wilson",
      email: "mike.wilson@immigration.gov",
      phone: "+1 (555) 234-5678",
      department: "Tourist Visas",
      status: "active",
      location: "North Office",
      assignedCases: 18,
      completedCases: 203,
      joinDate: "2021-08-22",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Emily Chen",
      email: "emily.chen@immigration.gov",
      phone: "+1 (555) 345-6789",
      department: "Student Visas",
      status: "busy",
      location: "Downtown Office",
      assignedCases: 31,
      completedCases: 89,
      joinDate: "2023-01-10",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "David Rodriguez",
      email: "david.rodriguez@immigration.gov",
      phone: "+1 (555) 456-7890",
      department: "Family Visas",
      status: "offline",
      location: "South Office",
      assignedCases: 12,
      completedCases: 134,
      joinDate: "2020-11-05",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </Badge>
        )
      case "busy":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Busy
          </Badge>
        )
      case "offline":
        return <Badge className="bg-gray-100 text-gray-800">Offline</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  if (userRole !== "admin") {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <Card className="w-full max-w-md text-center shadow-lg border-0">
          <CardContent className="p-8">
            <Shield className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Restricted</h2>
            <p className="text-muted-foreground">Only administrators can access the officers management page.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-in fade-in-50 duration-500">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Officers Management
          </h1>
          <p className="text-muted-foreground">Manage immigration officers and their assignments</p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Officer
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card className="animate-in slide-in-from-top-4 duration-500 delay-100 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Officers</p>
                <p className="text-2xl font-bold">{officers.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-in slide-in-from-top-4 duration-500 delay-200 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Now</p>
                <p className="text-2xl font-bold">{officers.filter((o) => o.status === "active").length}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-in slide-in-from-top-4 duration-500 delay-300 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Cases</p>
                <p className="text-2xl font-bold">{officers.reduce((sum, o) => sum + o.assignedCases, 0)}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="animate-in slide-in-from-top-4 duration-500 delay-400 shadow-lg border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{officers.reduce((sum, o) => sum + o.completedCases, 0)}</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Officers List */}
      <div className="grid gap-6">
        {officers.map((officer, index) => (
          <Card
            key={officer.id}
            className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-in slide-in-from-bottom-4 shadow-lg border-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 ring-4 ring-blue-500/20">
                    <AvatarImage src={officer.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-lg">
                      {officer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <div>
                      <h3 className="text-lg font-semibold">{officer.name}</h3>
                      <p className="text-sm text-muted-foreground">{officer.department}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {officer.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {officer.phone}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {officer.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{officer.assignedCases}</div>
                    <div className="text-xs text-muted-foreground">Assigned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{officer.completedCases}</div>
                    <div className="text-xs text-muted-foreground">Completed</div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {getStatusBadge(officer.status)}
                    <div className="flex items-center gap-1">
                      <Button size="sm" variant="outline" className="hover:scale-105 transition-transform duration-200">
                        <Settings className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="hover:scale-105 transition-transform duration-200">
                        <Mail className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
