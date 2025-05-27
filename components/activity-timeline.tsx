"use client"
import { FileText, CheckCircle, Clock, Upload, Calendar, MessageSquare, AlertTriangle } from "lucide-react"
import type { UserRole } from "@/app/page"

interface ActivityTimelineProps {
  userRole: UserRole
}

export function ActivityTimeline({ userRole }: ActivityTimelineProps) {
  const getActivities = () => {
    if (userRole === "applicant") {
      return [
        {
          id: 1,
          type: "upload",
          title: "Document uploaded",
          description: "Passport copy uploaded successfully",
          time: "2 hours ago",
          icon: Upload,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
        },
        {
          id: 2,
          type: "status",
          title: "Application status updated",
          description: "Work permit application moved to review",
          time: "1 day ago",
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-50",
        },
        {
          id: 3,
          type: "appointment",
          title: "Appointment scheduled",
          description: "Biometric appointment for next Tuesday",
          time: "2 days ago",
          icon: Calendar,
          color: "text-purple-500",
          bgColor: "bg-purple-50",
        },
        {
          id: 4,
          type: "message",
          title: "Message from officer",
          description: "Additional documents requested",
          time: "3 days ago",
          icon: MessageSquare,
          color: "text-orange-500",
          bgColor: "bg-orange-50",
        },
      ]
    } else if (userRole === "officer") {
      return [
        {
          id: 1,
          type: "review",
          title: "Application reviewed",
          description: "Approved work permit for John Smith",
          time: "30 minutes ago",
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-50",
        },
        {
          id: 2,
          type: "assignment",
          title: "New case assigned",
          description: "Tourist visa application #VT-2024-0156",
          time: "1 hour ago",
          icon: FileText,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
        },
        {
          id: 3,
          type: "interview",
          title: "Interview completed",
          description: "Citizenship interview with Maria Garcia",
          time: "3 hours ago",
          icon: Calendar,
          color: "text-purple-500",
          bgColor: "bg-purple-50",
        },
        {
          id: 4,
          type: "request",
          title: "Document request sent",
          description: "Additional proof of income requested",
          time: "5 hours ago",
          icon: MessageSquare,
          color: "text-orange-500",
          bgColor: "bg-orange-50",
        },
      ]
    } else {
      return [
        {
          id: 1,
          type: "system",
          title: "System backup completed",
          description: "Daily backup completed successfully",
          time: "1 hour ago",
          icon: CheckCircle,
          color: "text-green-500",
          bgColor: "bg-green-50",
        },
        {
          id: 2,
          type: "alert",
          title: "High volume alert",
          description: "Application volume 25% above average",
          time: "2 hours ago",
          icon: AlertTriangle,
          color: "text-red-500",
          bgColor: "bg-red-50",
        },
        {
          id: 3,
          type: "user",
          title: "New officer added",
          description: "Sarah Johnson joined as Immigration Officer",
          time: "4 hours ago",
          icon: CheckCircle,
          color: "text-blue-500",
          bgColor: "bg-blue-50",
        },
        {
          id: 4,
          type: "maintenance",
          title: "Maintenance scheduled",
          description: "System maintenance planned for Sunday 2 AM",
          time: "6 hours ago",
          icon: Clock,
          color: "text-purple-500",
          bgColor: "bg-purple-50",
        },
      ]
    }
  }

  const activities = getActivities()

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 animate-in slide-in-from-left-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className={`p-2 rounded-full ${activity.bgColor} ${activity.color} shadow-sm`}>
            <activity.icon className="h-4 w-4" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">{activity.title}</h4>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
