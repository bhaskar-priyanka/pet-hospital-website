"use client"

import { Suspense, useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { PawPrint, Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone, CheckCircle, Shield } from "lucide-react"

function SignupForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signup } = useAuth()

  const [isAdmin, setIsAdmin] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsAdmin(searchParams.get("type") === "admin")
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const success = signup({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      isAdmin: isAdmin,
    })

    if (success) {
      router.push(isAdmin ? "/admin" : "/dashboard")
    } else {
      setError("An account with this email already exists")
    }

    setIsLoading(false)
  }

  const passwordStrength = () => {
    const { password } = formData
    if (password.length === 0) return { score: 0, label: "", color: "" }
    if (password.length < 6) return { score: 1, label: "Weak", color: "bg-red-500" }
    if (password.length < 8) return { score: 2, label: "Fair", color: "bg-yellow-500" }
    if (password.length < 12) return { score: 3, label: "Good", color: "bg-green-400" }
    return { score: 4, label: "Strong", color: "bg-green-600" }
  }

  const strength = passwordStrength()

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <div className="relative w-full max-w-md py-8">

        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
            <PawPrint className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold text-foreground">PawCare</span>
        </Link>

        <Card className="border-border/50 shadow-2xl backdrop-blur-sm bg-card/80">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">
              {isAdmin ? "Create Admin Account" : "Create Account"}
            </CardTitle>
            <CardDescription>
              Join PawCare and give your pet the best care
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">

              {error && (
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm text-center">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Confirm Password</Label>
                <Input
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating..." : "Create Account"}
              </Button>

            </form>

            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

      </div>
    </main>
  )
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SignupForm />
    </Suspense>
  )
}