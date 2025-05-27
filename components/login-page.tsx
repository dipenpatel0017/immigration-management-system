"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Globe,
  Users,
  FileCheck,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  CheckCircle,
  Star,
  ArrowRight,
  Fingerprint,
  Scan,
} from "lucide-react"
import type { UserRole } from "@/app/page"

interface LoginPageProps {
  onLogin: () => void
  setUserRole: (role: UserRole) => void
}

export function LoginPage({ onLogin, setUserRole }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole>("applicant")

  const handleLogin = async (role: UserRole) => {
    setIsLoading(true)
    setUserRole(role)

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    onLogin()
  }

  const features = [
    {
      icon: FileCheck,
      title: "Application Management",
      description: "Submit and track your immigration applications in real-time",
    },
    {
      icon: Shield,
      title: "Secure Document Upload",
      description: "Upload your documents with bank-level security encryption",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Get assistance from certified immigration officers",
    },
    {
      icon: Globe,
      title: "Global Coverage",
      description: "Supporting immigration processes for 150+ countries",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Work Visa Applicant",
      content: "The process was so smooth and transparent. I could track every step of my application.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Student Visa",
      content: "Amazing support team and user-friendly interface. Highly recommended!",
      rating: 5,
    },
  ]

  const stats = [
    { label: "Applications Processed", value: "50K+" },
    { label: "Success Rate", value: "98%" },
    { label: "Countries Supported", value: "150+" },
    { label: "Average Processing Time", value: "7 Days" },
  ]

  return (
    // <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
    //   {/* Animated Background Elements */}
    //   <div className="absolute inset-0">
    //     <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
    //     <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    //     <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
    //   </div>

    <div className="min-h-screen bg-black relative overflow-hidden">
  {/* ✅ VIDEO BACKGROUND - Will NOT repeat */}
  {/* ✅ VIDEO BACKGROUND - Will repeat (loop) */}
<video
  autoPlay
  loop
  muted
  playsInline
  className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-70"
>
  <source src="https://logan14.oceansaver.in/pacific/?NWCkOsRlNIZiQxfrVZgGGYh" type="video/mp4" />
  Your browser does not support the video tag.
</video>

      <div className="relative z-10 min-h-screen flex">
        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 text-white">
          <div className="max-w-2xl animate-in slide-in-from-left-8 duration-1000 space-y-6">
            {/* <div className="flex items-center gap-2 mb-6">
              <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
                <Shield className="h-8 w-8" />
              </div>
              <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                Trusted by 50,000+ Users
              </Badge>
            </div> */}
             {/* Logo + Badge */}
  {/* <div className="flex items-center gap-3">
    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm">
      <Shield className="h-8 w-8" />
    </div>
    <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
      Trusted by 50,000+ Users
    </Badge>
  </div> */}

  {/* Indian Flag & System Title */}
  
  <div className="flex items-center gap-1">
    <img
      src="https://flagcdn.com/w80/in.png"
      alt="India Flag"
      className="w-10 h-6 rounded shadow-md border border-white/30"
    />
    <h2 className="text-2xl font-semibold tracking-wide">
      Immigration Management System - <span className="text-green-300">India</span>
    </h2>
  </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Gateway to
              <span className="block bg-gradient-to-r from-cyan-300 to-pink-300 bg-clip-text text-transparent">
                Global Immigration
              </span>
            </h1>

            <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
              Streamline your immigration journey with our advanced digital platform. From application submission to
              biometric verification, we've got you covered.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-in slide-in-from-left-8"
                  style={{ animationDelay: `${(index + 1) * 200}ms` }}
                >
                  <div className="p-2 rounded-lg bg-white/20">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm text-white/80">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-in slide-in-from-bottom-4 duration-1000"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="p-4 rounded-xl bg-white/10 backdrop-blur-sm animate-in slide-in-from-left-8"
                  style={{ animationDelay: `${(index + 1) * 300}ms` }}
                >
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/90 mb-2">"{testimonial.content}"</p>
                  <div className="text-sm">
                    <span className="font-semibold">{testimonial.name}</span>
                    <span className="text-white/70"> - {testimonial.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="w-full lg:w-96 xl:w-[480px] flex items-center justify-center p-8">
          <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-in slide-in-from-right-8 duration-1000">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600">Sign in to access your immigration portal</CardDescription>
            </CardHeader>

            <CardContent>
              <Tabs defaultValue="login" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                  <TabsTrigger value="login" className="data-[state=active]:bg-white">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-white">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        defaultValue="demo@immigration.gov"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        defaultValue="demo123"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Login as:</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {(["applicant", "officer", "admin"] as UserRole[]).map((role) => (
                        <Button
                          key={role}
                          variant={selectedRole === role ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedRole(role)}
                          className={
                            selectedRole === role ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white" : ""
                          }
                        >
                          {role === "applicant" && <User className="h-3 w-3 mr-1" />}
                          {role === "officer" && <Shield className="h-3 w-3 mr-1" />}
                          {role === "admin" && <Users className="h-3 w-3 mr-1" />}
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => handleLogin(selectedRole)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Signing In...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    )}
                  </Button>

                  <div className="text-center">
                    <Button variant="link" className="text-sm text-blue-600 hover:text-blue-800">
                      Forgot your password?
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input id="registerEmail" type="email" placeholder="Enter your email" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input id="phone" type="tel" placeholder="+1 (555) 123-4567" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input id="country" placeholder="Select your country" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="registerPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        className="pl-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    onClick={() => handleLogin("applicant")}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Creating Account...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Create Account
                      </div>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>

              {/* Biometric Login Option */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center mb-4">
                  <span className="text-sm text-gray-500">Or continue with</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                  >
                    <Fingerprint className="h-4 w-4" />
                    Fingerprint
                  </Button>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
                  >
                    <Scan className="h-4 w-4" />
                    Face ID
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
