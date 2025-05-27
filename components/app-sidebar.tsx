"use client"

import {
  Calendar,
  FileText,
  Home,
  Settings,
  Users,
  ClipboardList,
  Bell,
  User,
  LogOut,
  Shield,
  Crown,
  Scan,
  UserCheck,
  Database,
} from "lucide-react"
import { useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { CurrentPage, UserRole } from "@/app/page"

interface AppSidebarProps {
  currentPage: CurrentPage
  setCurrentPage: (page: CurrentPage) => void
  userRole: UserRole
  setUserRole: (role: UserRole) => void
  onLogout: () => void
}

export function AppSidebar({ currentPage, setCurrentPage, userRole, setUserRole, onLogout }: AppSidebarProps) {
  const [isDark, setIsDark] = useState(false)

  const getMenuItems = () => {
    const baseItems = [
      {
        title: "Dashboard",
        url: "dashboard",
        icon: Home,
        roles: ["applicant", "officer", "admin"],
      },
      {
        title: "Applications",
        url: "applications",
        icon: ClipboardList,
        roles: ["applicant", "officer", "admin"],
      },
      {
        title: "Appointments",
        url: "appointments",
        icon: Calendar,
        roles: ["applicant", "officer", "admin"],
      },
      {
        title: "Documents",
        url: "documents",
        icon: FileText,
        roles: ["applicant", "officer", "admin"],
      },
      {
        title: "Passport Scan",
        url: "passport-scan",
        icon: Scan,
        roles: ["applicant", "officer", "admin"],
      },
    ]

    const roleSpecificItems = []

    if (userRole === "officer") {
      roleSpecificItems.push({
        title: "Officer Portal",
        url: "officer-dashboard",
        icon: UserCheck,
        roles: ["officer"],
      })
    }

    if (userRole === "admin") {
      roleSpecificItems.push(
        {
          title: "Admin Portal",
          url: "admin-dashboard",
          icon: Database,
          roles: ["admin"],
        },
        {
          title: "Officers",
          url: "officers",
          icon: Users,
          roles: ["admin"],
        },
      )
    }

    const settingsItem = {
      title: "Settings",
      url: "settings",
      icon: Settings,
      roles: ["applicant", "officer", "admin"],
    }

    return [...baseItems, ...roleSpecificItems, settingsItem]
  }

  const filteredMenuItems = getMenuItems().filter((item) => item.roles.includes(userRole))

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "applicant":
        return <User className="h-4 w-4" />
      case "officer":
        return <Shield className="h-4 w-4" />
      case "admin":
        return <Crown className="h-4 w-4" />
    }
  }

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "applicant":
        return "bg-blue-500"
      case "officer":
        return "bg-green-500"
      case "admin":
        return "bg-purple-500"
    }
  }

  return (
    <Sidebar className="border-r border-gray-200/50 dark:border-gray-700/50">
      <SidebarHeader className="border-b border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
        <div className="flex items-center gap-3 px-3 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
            <Shield className="h-6 w-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Immigration Portal
            </h1>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-transparent via-blue-50/30 to-purple-50/30 dark:via-blue-900/20 dark:to-purple-900/20">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 dark:text-gray-400">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => setCurrentPage(item.url as CurrentPage)}
                    isActive={currentPage === item.url}
                    className="group transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <item.icon className="transition-transform duration-200 group-hover:scale-110" />
                    <span>{item.title}</span>
                    {item.title === "Applications" && (
                      <Badge variant="secondary" className="ml-auto animate-pulse">
                        12
                      </Badge>
                    )}
                    {item.title === "Officer Portal" && userRole === "officer" && (
                      <Badge className="ml-auto bg-green-100 text-green-800">New</Badge>
                    )}
                    {item.title === "Admin Portal" && userRole === "admin" && (
                      <Badge className="ml-auto bg-purple-100 text-purple-800">Pro</Badge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-200/50 dark:border-gray-700/50 bg-gradient-to-r from-green-500/10 via-blue-500/10 to-purple-500/10">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="group transition-all duration-200 hover:scale-105">
                  <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-blue-500/20">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback className={`${getRoleColor(userRole)} text-white`}>
                      {userRole === "applicant" ? "AP" : userRole === "officer" ? "OF" : "AD"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">John Doe</span>
                    <div className="flex items-center gap-1">
                      {getRoleIcon(userRole)}
                      <span className="text-xs text-muted-foreground capitalize">{userRole}</span>
                    </div>
                  </div>
                  <Bell className="ml-auto h-4 w-4 animate-pulse text-orange-500" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-56">
                <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setUserRole("applicant")}>
                  <User className="mr-2 h-4 w-4" />
                  Applicant
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole("officer")}>
                  <Shield className="mr-2 h-4 w-4" />
                  Officer
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setUserRole("admin")}>
                  <Crown className="mr-2 h-4 w-4" />
                  Admin
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
