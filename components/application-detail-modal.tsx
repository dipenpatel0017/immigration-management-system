"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Download,
  FileText,
  User,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  MessageSquare,
  Printer,
  Share,
} from "lucide-react"

interface ApplicationDetailModalProps {
  isOpen: boolean
  onClose: () => void
  application: {
    id: string
    type: string
    applicant: string
    country: string
    status: string
    submittedDate: string
    lastUpdate: string
    officer: string
  }
}

export function ApplicationDetailModal({ isOpen, onClose, application }: ApplicationDetailModalProps) {
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  const applicationDetails = {
    personalInfo: {
      fullName: "John Michael Smith",
      dateOfBirth: "January 15, 1990",
      placeOfBirth: "New York, USA",
      nationality: "American",
      passportNumber: "P123456789",
      gender: "Male",
      maritalStatus: "Single",
      email: "john.smith@email.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, New York, NY 10001",
    },
    applicationInfo: {
      applicationId: application.id,
      applicationType: application.type,
      submissionDate: application.submittedDate,
      lastUpdated: application.lastUpdate,
      currentStatus: application.status,
      assignedOfficer: application.officer,
      priority: "Normal",
      estimatedProcessingTime: "7-14 business days",
    },
    documents: [
      { name: "Passport Copy", status: "verified", uploadDate: "2024-01-15" },
      { name: "Birth Certificate", status: "verified", uploadDate: "2024-01-16" },
      { name: "Employment Letter", status: "verified", uploadDate: "2024-01-17" },
      { name: "Bank Statement", status: "pending", uploadDate: "2024-01-18" },
      { name: "Medical Certificate", status: "missing", uploadDate: null },
    ],
    timeline: [
      {
        date: "2024-01-15",
        time: "09:30 AM",
        event: "Application Submitted",
        description: "Initial application submitted with required documents",
        status: "completed",
      },
      {
        date: "2024-01-16",
        time: "02:15 PM",
        event: "Document Review Started",
        description: "Officer Sarah Johnson began reviewing submitted documents",
        status: "completed",
      },
      {
        date: "2024-01-18",
        time: "11:45 AM",
        event: "Additional Documents Requested",
        description: "Medical certificate required for processing",
        status: "completed",
      },
      {
        date: "2024-01-20",
        time: "10:00 AM",
        event: "Interview Scheduled",
        description: "Biometric appointment scheduled for January 25th",
        status: "pending",
      },
    ],
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "under_review":
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Eye className="w-3 h-3 mr-1" />
            Under Review
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true)

    // Simulate PDF generation
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create a simple PDF-like content
    const pdfContent = `
APPLICATION DETAILS REPORT
========================

Application ID: ${applicationDetails.applicationInfo.applicationId}
Application Type: ${applicationDetails.applicationInfo.applicationType}
Status: ${applicationDetails.applicationInfo.currentStatus}

PERSONAL INFORMATION
-------------------
Full Name: ${applicationDetails.personalInfo.fullName}
Date of Birth: ${applicationDetails.personalInfo.dateOfBirth}
Nationality: ${applicationDetails.personalInfo.nationality}
Passport Number: ${applicationDetails.personalInfo.passportNumber}
Email: ${applicationDetails.personalInfo.email}
Phone: ${applicationDetails.personalInfo.phone}

APPLICATION STATUS
-----------------
Submission Date: ${applicationDetails.applicationInfo.submissionDate}
Last Updated: ${applicationDetails.applicationInfo.lastUpdated}
Assigned Officer: ${applicationDetails.applicationInfo.assignedOfficer}
Priority: ${applicationDetails.applicationInfo.priority}

DOCUMENT STATUS
--------------
${applicationDetails.documents
  .map((doc) => `${doc.name}: ${doc.status.toUpperCase()}${doc.uploadDate ? ` (${doc.uploadDate})` : ""}`)
  .join("\n")}

TIMELINE
--------
${applicationDetails.timeline
  .map((event) => `${event.date} ${event.time} - ${event.event}\n${event.description}`)
  .join("\n\n")}

Generated on: ${new Date().toLocaleString()}
    `

    // Create and download the file
    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `application-${application.id}-details.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    setIsGeneratingPDF(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="h-6 w-6 text-blue-500" />
            Application Details - {application.id}
          </DialogTitle>
          <DialogDescription>Complete information and status for this immigration application</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Actions */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold">{applicationDetails.applicationInfo.applicationType}</h3>
                    <p className="text-muted-foreground">Application ID: {application.id}</p>
                  </div>
                  {getStatusBadge(application.status)}
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPDF}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    {isGeneratingPDF ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Generating...
                      </div>
                    ) : (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Printer className="h-4 w-4 mr-2" />
                    Print
                  </Button>
                  <Button variant="outline">
                    <Share className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="personal">Personal Info</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Application Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(applicationDetails.applicationInfo).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                        <span className="text-sm text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50">
                        <div className="text-2xl font-bold text-green-600">
                          {applicationDetails.documents.filter((d) => d.status === "verified").length}
                        </div>
                        <div className="text-xs text-muted-foreground">Verified Docs</div>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50">
                        <div className="text-2xl font-bold text-blue-600">{applicationDetails.timeline.length}</div>
                        <div className="text-xs text-muted-foreground">Timeline Events</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="personal" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-500" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {Object.entries(applicationDetails.personalInfo).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <label className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <div className="p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                          {key === "email" && <Mail className="inline h-4 w-4 mr-2 text-blue-500" />}
                          {key === "phone" && <Phone className="inline h-4 w-4 mr-2 text-green-500" />}
                          {key === "address" && <MapPin className="inline h-4 w-4 mr-2 text-red-500" />}
                          <span className="text-sm">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-purple-500" />
                    Document Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {applicationDetails.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-blue-500" />
                          <div>
                            <h4 className="font-medium">{doc.name}</h4>
                            {doc.uploadDate && (
                              <p className="text-sm text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(doc.status)}
                          {doc.status !== "missing" && (
                            <Button size="sm" variant="outline">
                              <Eye className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-500" />
                    Application Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {applicationDetails.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              event.status === "completed" ? "bg-green-500" : "bg-blue-500"
                            }`}
                          />
                          {index < applicationDetails.timeline.length - 1 && (
                            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700 mt-2" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium">{event.event}</h4>
                            <span className="text-sm text-muted-foreground">
                              {event.date} {event.time}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold mb-1">Need Help?</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact our support team for assistance with your application
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact Officer
                  </Button>
                  <Button variant="outline">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Support
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
