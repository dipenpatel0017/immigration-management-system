"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, Download, Eye, CheckCircle, XCircle, Clock, AlertTriangle, Plus } from "lucide-react"
import type { UserRole } from "@/app/page"
import { useState } from "react"

interface DocumentsPageProps {
  userRole: UserRole
}

export function DocumentsPage({ userRole }: DocumentsPageProps) {
  const documents = [
    {
      id: 1,
      name: "Passport Copy",
      type: "Identity",
      status: "verified",
      uploadDate: "2024-01-15",
      size: "2.4 MB",
      format: "PDF",
      required: true,
    },
    {
      id: 2,
      name: "Birth Certificate",
      type: "Identity",
      status: "pending",
      uploadDate: "2024-01-18",
      size: "1.8 MB",
      format: "PDF",
      required: true,
    },
    {
      id: 3,
      name: "Employment Letter",
      type: "Work",
      status: "verified",
      uploadDate: "2024-01-20",
      size: "856 KB",
      format: "PDF",
      required: true,
    },
    {
      id: 4,
      name: "Bank Statement",
      type: "Financial",
      status: "rejected",
      uploadDate: "2024-01-12",
      size: "3.2 MB",
      format: "PDF",
      required: true,
      rejectionReason: "Document is older than 3 months",
    },
    {
      id: 5,
      name: "Medical Certificate",
      type: "Health",
      status: "missing",
      required: true,
    },
  ]

  const [isUploading, setIsUploading] = useState(false)
  const [downloadingDoc, setDownloadingDoc] = useState<number | null>(null)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "verified":
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      case "missing":
        return (
          <Badge className="bg-gray-100 text-gray-800">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Missing
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCompletionPercentage = () => {
    const totalRequired = documents.filter((doc) => doc.required).length
    const completed = documents.filter((doc) => doc.required && doc.status === "verified").length
    return Math.round((completed / totalRequired) * 100)
  }

  const handleUploadDocument = async () => {
    setIsUploading(true)
    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsUploading(false)
    // Show success message or update document list
  }

  const handleDownloadDocument = async (docId: number, docName: string) => {
    setDownloadingDoc(docId)
    // Simulate download process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Create a sample document content
    const content = `
IMMIGRATION DOCUMENT: ${docName}
================================

Document ID: DOC-${docId}
Generated: ${new Date().toLocaleString()}
Applicant: John Doe
Application ID: APP-2024-001

This is a sample document for demonstration purposes.
In a real application, this would contain the actual document data.

Status: Verified
Verification Date: ${new Date().toLocaleDateString()}
Verified By: Immigration Officer Sarah Johnson

---
This document is digitally signed and verified.
    `

    // Create and download the file
    const blob = new Blob([content], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${docName.toLowerCase().replace(/\s+/g, "-")}.txt`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)

    setDownloadingDoc(null)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-in fade-in-50 duration-500">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Documents
          </h1>
          <p className="text-muted-foreground">
            {userRole === "applicant"
              ? "Upload and manage your application documents"
              : "Review and verify applicant documents"}
          </p>
        </div>
        {userRole === "applicant" && (
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            onClick={handleUploadDocument}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Uploading...
              </div>
            ) : (
              <>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </>
            )}
          </Button>
        )}
      </div>

      {/* Progress Overview */}
      <Card className="animate-in slide-in-from-top-4 duration-500 delay-100 shadow-lg border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-500" />
            Document Completion
          </CardTitle>
          <CardDescription>Track your document submission progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span className="font-medium">{getCompletionPercentage()}%</span>
            </div>
            <Progress value={getCompletionPercentage()} className="h-2" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <div className="text-2xl font-bold text-green-600">
                {documents.filter((doc) => doc.status === "verified").length}
              </div>
              <div className="text-xs text-muted-foreground">Verified</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
              <div className="text-2xl font-bold text-yellow-600">
                {documents.filter((doc) => doc.status === "pending").length}
              </div>
              <div className="text-xs text-muted-foreground">Pending</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20">
              <div className="text-2xl font-bold text-red-600">
                {documents.filter((doc) => doc.status === "rejected").length}
              </div>
              <div className="text-xs text-muted-foreground">Rejected</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/20 dark:to-slate-900/20">
              <div className="text-2xl font-bold text-gray-600">
                {documents.filter((doc) => doc.status === "missing").length}
              </div>
              <div className="text-xs text-muted-foreground">Missing</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <div className="grid gap-4">
        {documents.map((document, index) => (
          <Card
            key={document.id}
            className="group hover:shadow-xl transition-all duration-300 hover:scale-[1.01] animate-in slide-in-from-bottom-4 shadow-lg border-0"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold flex items-center gap-2">
                      {document.name}
                      {document.required && (
                        <Badge variant="outline" className="text-xs">
                          Required
                        </Badge>
                      )}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Type: {document.type}</span>
                      {document.uploadDate && (
                        <>
                          <span>•</span>
                          <span>Uploaded: {document.uploadDate}</span>
                        </>
                      )}
                      {document.size && (
                        <>
                          <span>•</span>
                          <span>
                            {document.size} ({document.format})
                          </span>
                        </>
                      )}
                    </div>
                    {document.rejectionReason && (
                      <p className="text-sm text-red-600 mt-1">Rejection reason: {document.rejectionReason}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(document.status)}
                  <div className="flex items-center gap-1">
                    {document.status !== "missing" && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:scale-105 transition-transform duration-200"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="hover:scale-105 transition-transform duration-200"
                          onClick={() => handleDownloadDocument(document.id, document.name)}
                          disabled={downloadingDoc === document.id}
                        >
                          {downloadingDoc === document.id ? (
                            <div className="w-3 h-3 border-2 border-gray-400 border-t-gray-600 rounded-full animate-spin" />
                          ) : (
                            <Download className="w-3 h-3" />
                          )}
                        </Button>
                      </>
                    )}
                    {(document.status === "missing" || document.status === "rejected") && userRole === "applicant" && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:scale-105 transition-transform duration-200"
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Upload
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upload Area */}
      {userRole === "applicant" && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500 delay-300 shadow-lg border-0 border-dashed border-2 border-gray-300 dark:border-gray-600">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white w-16 h-16 mx-auto flex items-center justify-center">
                <Upload className="h-8 w-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Drop files here or click to upload</h3>
                <p className="text-muted-foreground">Supported formats: PDF, JPEG, PNG (Max size: 10MB)</p>
              </div>
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={handleUploadDocument}
                disabled={isUploading}
              >
                {isUploading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Uploading...
                  </div>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Choose Files
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
