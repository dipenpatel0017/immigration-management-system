"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, Plus, Eye, Edit, CheckCircle, XCircle, Clock, FileText, Download } from "lucide-react"
import type { UserRole } from "@/app/page"
import { ApplicationDetailModal } from "@/components/application-detail-modal"

interface ApplicationsPageProps {
  userRole: UserRole
}

export function ApplicationsPage({ userRole }: ApplicationsPageProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedApplication, setSelectedApplication] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const applications = [
    {
      id: "APP-2024-001",
      type: "Work Permit",
      applicant: "John Smith",
      country: "India",
      status: "approved",
      submittedDate: "2024-01-15",
      lastUpdate: "2024-01-20",
      officer: "Sarah Johnson",
    },
    {
      id: "APP-2024-002",
      type: "Tourist Visa",
      applicant: "Maria Garcia",
      country: "Mexico",
      status: "pending",
      submittedDate: "2024-01-18",
      lastUpdate: "2024-01-18",
      officer: "Mike Wilson",
    },
    {
      id: "APP-2024-003",
      type: "Student Visa",
      applicant: "Li Wei",
      country: "China",
      status: "under_review",
      submittedDate: "2024-01-20",
      lastUpdate: "2024-01-22",
      officer: "Sarah Johnson",
    },
    {
      id: "APP-2024-004",
      type: "Family Visa",
      applicant: "Ahmed Hassan",
      country: "Egypt",
      status: "rejected",
      submittedDate: "2024-01-10",
      lastUpdate: "2024-01-25",
      officer: "Mike Wilson",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "under_review":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Eye className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleViewApplication = (app: any) => {
    setSelectedApplication(app)
    setIsDetailModalOpen(true)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-in fade-in-50 duration-500">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Applications
          </h1>
          <p className="text-muted-foreground">
            {userRole === "applicant"
              ? "Track your immigration applications"
              : userRole === "officer"
                ? "Review and manage assigned applications"
                : "Oversee all immigration applications"}
          </p>
        </div>
        {userRole === "applicant" && (
          <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            New Application
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card className="animate-in slide-in-from-top-4 duration-500 delay-100 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="text-lg">Search & Filter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under_review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications Table */}
      <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-200 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Applications List
          </CardTitle>
          <CardDescription>{filteredApplications.length} applications found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                  <TableHead>Application ID</TableHead>
                  <TableHead>Type</TableHead>
                  {userRole !== "applicant" && <TableHead>Applicant</TableHead>}
                  <TableHead>Country</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submitted</TableHead>
                  {userRole !== "applicant" && <TableHead>Officer</TableHead>}
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((app, index) => (
                  <TableRow
                    key={app.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all duration-200 animate-in slide-in-from-left-4"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <TableCell className="font-medium">{app.id}</TableCell>
                    <TableCell>{app.type}</TableCell>
                    {userRole !== "applicant" && <TableCell>{app.applicant}</TableCell>}
                    <TableCell>{app.country}</TableCell>
                    <TableCell>{getStatusBadge(app.status)}</TableCell>
                    <TableCell>{app.submittedDate}</TableCell>
                    {userRole !== "applicant" && <TableCell>{app.officer}</TableCell>}
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:scale-105 transition-transform duration-200"
                          onClick={() => handleViewApplication(app)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        {userRole === "officer" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="hover:scale-105 transition-transform duration-200"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      {selectedApplication && (
        <ApplicationDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          application={selectedApplication}
        />
      )}
    </div>
  )
}
