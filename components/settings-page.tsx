"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, Bell, Shield, Globe, Moon, Mail, Smartphone, Lock, User, Save } from "lucide-react"
import type { UserRole } from "@/app/page"

interface SettingsPageProps {
  userRole: UserRole
}

export function SettingsPage({ userRole }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    statusUpdates: true,
    appointments: true,
    documents: false,
  })

  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    language: "English",
  })

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: "30",
    loginAlerts: true,
  })

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="animate-in fade-in-50 duration-500">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your account preferences and system settings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card className="animate-in slide-in-from-left-4 duration-500 delay-100 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Profile Settings
            </CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>
            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Save className="w-4 h-4 mr-2" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="animate-in slide-in-from-right-4 duration-500 delay-200 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Security Settings
            </CardTitle>
            <CardDescription>Manage your account security</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch
                checked={security.twoFactor}
                onCheckedChange={(checked) => setSecurity({ ...security, twoFactor: checked })}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Login Alerts</Label>
                <p className="text-sm text-muted-foreground">Get notified of new logins</p>
              </div>
              <Switch
                checked={security.loginAlerts}
                onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeout">Session Timeout (minutes)</Label>
              <Input
                id="timeout"
                type="number"
                value={security.sessionTimeout}
                onChange={(e) => setSecurity({ ...security, sessionTimeout: e.target.value })}
              />
            </div>
            <Button
              variant="outline"
              className="w-full hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300 hover:scale-105"
            >
              <Lock className="w-4 h-4 mr-2" />
              Change Password
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="animate-in slide-in-from-left-4 duration-500 delay-300 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-orange-500" />
              Notification Preferences
            </CardTitle>
            <CardDescription>Choose how you want to be notified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-500" />
                <Label>Email Notifications</Label>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-green-500" />
                <Label>SMS Notifications</Label>
              </div>
              <Switch
                checked={notifications.sms}
                onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
              />
            </div>
            <Separator />
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Notification Types</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Status Updates</Label>
                  <Switch
                    checked={notifications.statusUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, statusUpdates: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Appointments</Label>
                  <Switch
                    checked={notifications.appointments}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, appointments: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Document Updates</Label>
                  <Switch
                    checked={notifications.documents}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, documents: checked })}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="animate-in slide-in-from-right-4 duration-500 delay-400 shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-500" />
              System Preferences
            </CardTitle>
            <CardDescription>Customize your experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-500" />
                <Label>Dark Mode</Label>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-500" />
                <Label>Language</Label>
              </div>
              <select className="px-3 py-1 border rounded-md text-sm">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Chinese</option>
              </select>
            </div>
            <Separator />
            {userRole === "admin" && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Admin Settings</h4>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                  >
                    System Backup
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
                  >
                    User Management
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-300"
                  >
                    System Logs
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Save All Settings */}
      <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-500 shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Save All Changes</h3>
              <p className="text-sm text-muted-foreground">Apply all your settings changes across the system</p>
            </div>
            <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Save className="w-4 h-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
