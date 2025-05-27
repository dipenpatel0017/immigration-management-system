"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Camera,
  Scan,
  Upload,
  CheckCircle,
  AlertTriangle,
  Fingerprint,
  Eye,
  User,
  FileText,
  Shield,
  Clock,
  Download,
  RefreshCw,
} from "lucide-react"
import type { UserRole } from "@/app/page"

interface PassportScanPageProps {
  userRole: UserRole
}

export function PassportScanPage({ userRole }: PassportScanPageProps) {
  const [scanStep, setScanStep] = useState<"upload" | "scanning" | "biometric" | "complete">("upload")
  const [scanProgress, setScanProgress] = useState(0)
  const [biometricStep, setBiometricStep] = useState<"fingerprint" | "face" | "complete">("fingerprint")

  const handleStartScan = () => {
    setScanStep("scanning")
    setScanProgress(0)

    // Simulate scanning progress
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setScanStep("biometric")
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleBiometricNext = () => {
    if (biometricStep === "fingerprint") {
      setBiometricStep("face")
    } else if (biometricStep === "face") {
      setBiometricStep("complete")
      setScanStep("complete")
    }
  }

  const extractedData = {
    passportNumber: "P123456789",
    fullName: "JOHN MICHAEL SMITH",
    nationality: "UNITED STATES OF AMERICA",
    dateOfBirth: "15 JAN 1990",
    placeOfBirth: "NEW YORK, USA",
    gender: "M",
    issueDate: "20 MAR 2020",
    expiryDate: "19 MAR 2030",
    issuingAuthority: "UNITED STATES DEPARTMENT OF STATE",
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="animate-in fade-in-50 duration-500">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Passport & Biometric Verification
        </h1>
        <p className="text-muted-foreground">
          Secure document scanning and biometric verification for your immigration application
        </p>
      </div>

      {/* Progress Steps */}
      <Card className="animate-in slide-in-from-top-4 duration-500 delay-100 shadow-lg border-0">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div
              className={`flex items-center gap-2 ${scanStep === "upload" ? "text-blue-600" : scanStep === "scanning" || scanStep === "biometric" || scanStep === "complete" ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${scanStep === "upload" ? "bg-blue-100 text-blue-600" : scanStep === "scanning" || scanStep === "biometric" || scanStep === "complete" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
              >
                <Upload className="h-4 w-4" />
              </div>
              <span className="font-medium">Upload Document</span>
            </div>

            <div
              className={`flex items-center gap-2 ${scanStep === "scanning" ? "text-blue-600" : scanStep === "biometric" || scanStep === "complete" ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${scanStep === "scanning" ? "bg-blue-100 text-blue-600" : scanStep === "biometric" || scanStep === "complete" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
              >
                <Scan className="h-4 w-4" />
              </div>
              <span className="font-medium">Scan & Extract</span>
            </div>

            <div
              className={`flex items-center gap-2 ${scanStep === "biometric" ? "text-blue-600" : scanStep === "complete" ? "text-green-600" : "text-gray-400"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${scanStep === "biometric" ? "bg-blue-100 text-blue-600" : scanStep === "complete" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
              >
                <Fingerprint className="h-4 w-4" />
              </div>
              <span className="font-medium">Biometric Verification</span>
            </div>

            <div className={`flex items-center gap-2 ${scanStep === "complete" ? "text-green-600" : "text-gray-400"}`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${scanStep === "complete" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"}`}
              >
                <CheckCircle className="h-4 w-4" />
              </div>
              <span className="font-medium">Complete</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      {scanStep === "upload" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Area */}
          <Card className="animate-in slide-in-from-left-4 duration-500 delay-200 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-blue-500" />
                Passport Upload
              </CardTitle>
              <CardDescription>Upload a clear photo of your passport's main page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-300">
                <div className="space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Upload Passport Photo</h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your passport image here, or click to browse
                    </p>
                  </div>
                  <div className="flex gap-3 justify-center">
                    <Button
                      className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                      onClick={handleStartScan}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Choose File
                    </Button>
                    <Button variant="outline">
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Requirements:</h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Clear, high-resolution image (min 300 DPI)
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    All text must be clearly visible
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    No glare or shadows on the document
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Supported formats: JPG, PNG, PDF
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Info */}
          <Card className="animate-in slide-in-from-right-4 duration-500 delay-300 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                Security & Privacy
              </CardTitle>
              <CardDescription>Your documents are protected with enterprise-grade security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800 dark:text-green-400">End-to-End Encryption</h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      All documents are encrypted during upload and storage
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                  <Eye className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 dark:text-blue-400">Privacy Protected</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Only authorized officers can access your documents
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                  <Clock className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-purple-800 dark:text-purple-400">Automatic Deletion</h4>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Documents are automatically deleted after processing
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-200 dark:border-orange-800">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-orange-800 dark:text-orange-400">Important Notice</h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Ensure your passport is valid for at least 6 months from your intended travel date
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {scanStep === "scanning" && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500 shadow-lg border-0">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <Scan className="h-5 w-5 text-blue-500 animate-pulse" />
              Scanning Passport
            </CardTitle>
            <CardDescription>AI is extracting information from your passport...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="w-64 h-40 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
                <div className="text-center">
                  <Scan className="h-12 w-12 mx-auto text-blue-500 animate-pulse mb-2" />
                  <p className="text-sm text-muted-foreground">Analyzing document...</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Scanning Progress</span>
                <span>{scanProgress}%</span>
              </div>
              <Progress value={scanProgress} className="h-2" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <FileText className="h-6 w-6 mx-auto text-blue-500 mb-1" />
                <p className="text-xs text-muted-foreground">Text Recognition</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <Shield className="h-6 w-6 mx-auto text-green-500 mb-1" />
                <p className="text-xs text-muted-foreground">Security Features</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <User className="h-6 w-6 mx-auto text-purple-500 mb-1" />
                <p className="text-xs text-muted-foreground">Photo Analysis</p>
              </div>
              <div className="p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
                <CheckCircle className="h-6 w-6 mx-auto text-orange-500 mb-1" />
                <p className="text-xs text-muted-foreground">Validation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {scanStep === "biometric" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="animate-in slide-in-from-left-4 duration-500 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Fingerprint className="h-5 w-5 text-purple-500" />
                Biometric Verification
              </CardTitle>
              <CardDescription>Complete biometric verification to secure your identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {biometricStep === "fingerprint" && (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Fingerprint className="h-16 w-16 text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Fingerprint Scan</h3>
                    <p className="text-muted-foreground">
                      Place your finger on the scanner or use your device's fingerprint sensor
                    </p>
                  </div>
                  <Button
                    onClick={handleBiometricNext}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                  >
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Start Fingerprint Scan
                  </Button>
                </div>
              )}

              {biometricStep === "face" && (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Eye className="h-16 w-16 text-white animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Facial Recognition</h3>
                    <p className="text-muted-foreground">Look directly at the camera for facial verification</p>
                  </div>
                  <Button
                    onClick={handleBiometricNext}
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Start Face Scan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="animate-in slide-in-from-right-4 duration-500 delay-200 shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-green-500" />
                Extracted Information
              </CardTitle>
              <CardDescription>Verify the information extracted from your passport</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(extractedData).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1").trim()}:</span>
                    <span className="text-sm text-muted-foreground">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {scanStep === "complete" && (
        <Card className="animate-in slide-in-from-bottom-4 duration-500 shadow-lg border-0">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-green-600">Verification Complete!</CardTitle>
            <CardDescription>Your passport and biometric data have been successfully verified</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CheckCircle className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <h3 className="font-semibold text-green-800 dark:text-green-400">Document Verified</h3>
                <p className="text-sm text-green-600 dark:text-green-300">Passport authenticated</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
                <Fingerprint className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <h3 className="font-semibold text-blue-800 dark:text-blue-400">Biometric Match</h3>
                <p className="text-sm text-blue-600 dark:text-blue-300">Identity confirmed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
                <Shield className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <h3 className="font-semibold text-purple-800 dark:text-purple-400">Security Passed</h3>
                <p className="text-sm text-purple-600 dark:text-purple-300">All checks complete</p>
              </div>
            </div>

            <div className="flex gap-3 justify-center">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white">
                <Download className="h-4 w-4 mr-2" />
                Download Report
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setScanStep("upload")
                  setScanProgress(0)
                  setBiometricStep("fingerprint")
                }}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Scan Another Document
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
