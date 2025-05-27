"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, Plus, Video } from "lucide-react"
import type { UserRole } from "@/app/page"
import { useState } from "react"

interface AppointmentsPageProps {
  userRole: UserRole
}

export function AppointmentsPage({ userRole }: AppointmentsPageProps) {
  const [isRescheduling, setIsRescheduling] = useState<number | null>(null)
  const [isJoining, setIsJoining] = useState<number | null>(null)

  const appointments = [
    {
      id: 1,
      title: "Biometric Appointment",
      applicant: "John Smith",
      date: "2024-02-15",
      time: "10:00 AM",
      location: "Immigration Office - Downtown",
      type: "in-person",
      status: "confirmed",
      purpose: "Work Permit Application",
    },
    {
      id: 2,
      title: "Citizenship Interview",
      applicant: "Maria Garcia",
      date: "2024-02-16",
      time: "2:00 PM",
      location: "Virtual Meeting",
      type: "virtual",
      status: "pending",
      purpose: "Citizenship Application",
    },
    {
      id: 3,
      title: "Document Review",
      applicant: "Li Wei",
      date: "2024-02-18",
      time: "11:30 AM",
      location: "Immigration Office - North",
      type: "in-person",
      status: "confirmed",
      purpose: "Student Visa Application",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    return type === "virtual" ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />
  }

  const handleReschedule = async (appointmentId: number) => {
    setIsRescheduling(appointmentId)
    // Simulate rescheduling process
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRescheduling(null)
    // Show success message or update UI
  }

  const handleJoinMeeting = async (appointmentId: number) => {
    setIsJoining(appointmentId)
    // Simulate joining process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsJoining(null)
    // Open meeting link or show meeting interface
    window.open("https://meet.immigration.gov/room/" + appointmentId, "_blank")
  }

  const handleGetDirections = (location: string) => {
    // Open maps with directions
    const encodedLocation = encodeURIComponent(location)
    window.open(`https://maps.google.com/maps?q=${encodedLocation}`, "_blank")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-in fade-in-50 duration-500">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Appointments
          </h1>
          <p className="text-muted-foreground">
            {userRole === "applicant"
              ? "Manage your scheduled appointments"
              : "View and schedule appointments with applicants"}
          </p>
        </div>
        <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </Button>
      </div>

      {/* Upcoming Appointments */}
      <div className="grid gap-6">
        {appointments.map((appointment, index) => (
          <Card
            key={appointment.id}
            className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-in slide-in-from-bottom-4 shadow-lg border-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-500" />
                    {appointment.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {appointment.applicant} • {appointment.purpose}
                  </CardDescription>
                </div>
                {getStatusBadge(appointment.status)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{appointment.date}</p>
                    <p className="text-xs text-muted-foreground">{appointment.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  {getTypeIcon(appointment.type)}
                  <div>
                    <p className="text-sm font-medium">{appointment.location}</p>
                    <p className="text-xs text-muted-foreground capitalize">{appointment.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    className="hover:scale-105 transition-transform duration-200"
                    onClick={() => handleReschedule(appointment.id)}
                    disabled={isRescheduling === appointment.id}
                  >
                    {isRescheduling === appointment.id ? (
                      <div className="w-3 h-3 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin mr-1" />
                    ) : null}
                    Reschedule
                  </Button>
                  {appointment.type === "virtual" ? (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 transition-transform duration-200"
                      onClick={() => handleJoinMeeting(appointment.id)}
                      disabled={isJoining === appointment.id}
                    >
                      {isJoining === appointment.id ? (
                        <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1" />
                      ) : (
                        <Video className="w-3 h-3 mr-1" />
                      )}
                      {isJoining === appointment.id ? "Joining..." : "Join"}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:scale-105 transition-transform duration-200"
                      onClick={() => handleGetDirections(appointment.location)}
                    >
                      <MapPin className="w-3 h-3 mr-1" />
                      Directions
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Calendar View */}
      <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-300 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-purple-500" />
            Calendar View
          </CardTitle>
          <CardDescription>Monthly overview of all appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-lg">
            <p className="text-muted-foreground">Calendar component would be integrated here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
