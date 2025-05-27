"use client"

import { useState } from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { DashboardContent } from "@/components/dashboard-content"
import { ApplicationsPage } from "@/components/applications-page"
import { AppointmentsPage } from "@/components/appointments-page"
import { DocumentsPage } from "@/components/documents-page"
import { OfficersPage } from "@/components/officers-page"
import { SettingsPage } from "@/components/settings-page"
import { LoginPage } from "@/components/login-page"
import { PassportScanPage } from "@/components/passport-scan-page"
import { OfficerDashboard } from "@/components/officer-dashboard"
import { AdminDashboard } from "@/components/admin-dashboard"

export type UserRole = "applicant" | "officer" | "admin"
export type CurrentPage =
  | "dashboard"
  | "applications"
  | "appointments"
  | "documents"
  | "officers"
  | "settings"
  | "passport-scan"
  | "officer-dashboard"
  | "admin-dashboard"

export default function ImmigrationManagementSystem() {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("dashboard")
  const [userRole, setUserRole] = useState<UserRole>("admin")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const renderContent = () => {
    // Role-specific dashboard routing
    if (currentPage === "dashboard") {
      switch (userRole) {
        case "officer":
          return <OfficerDashboard />
        case "admin":
          return <AdminDashboard />
        default:
          return <DashboardContent userRole={userRole} />
      }
    }

    switch (currentPage) {
      case "applications":
        return <ApplicationsPage userRole={userRole} />
      case "appointments":
        return <AppointmentsPage userRole={userRole} />
      case "documents":
        return <DocumentsPage userRole={userRole} />
      case "officers":
        return <OfficersPage userRole={userRole} />
      case "settings":
        return <SettingsPage userRole={userRole} />
      case "passport-scan":
        return <PassportScanPage userRole={userRole} />
      case "officer-dashboard":
        return <OfficerDashboard />
      case "admin-dashboard":
        return <AdminDashboard />
      default:
        return <DashboardContent userRole={userRole} />
    }
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={() => setIsAuthenticated(true)} setUserRole={setUserRole} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
      <SidebarProvider defaultOpen={true}>
        <AppSidebar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          userRole={userRole}
          setUserRole={setUserRole}
          onLogout={() => setIsAuthenticated(false)}
        />
        <main className="flex-1 transition-all duration-300 ease-in-out">{renderContent()}</main>
      </SidebarProvider>
    </div>
  )
}
