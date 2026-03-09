"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/lib/auth-context"
import { useOrders } from "@/lib/orders-context"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  PawPrint,
  Stethoscope,
  User,
  Banknote,
} from "lucide-react"

const petTypes = ["Dog", "Cat", "Bird", "Rabbit", "Hamster", "Other"]
const services = [
  "Pet Grooming",
  "Pet Bathing",
  "Veterinary Clinic",
  "Vaccination",
  "Fever Treatment",
  "Injury Treatment",
  "General Checkup",
  "Emergency Care",
]
const doctors = [
  { name: "Dr. Sarah Smith", specialty: "General Care", available: true },
  { name: "Dr. Michael Johnson", specialty: "Surgery", available: true },
  { name: "Dr. Emily Brown", specialty: "Dermatology", available: false },
  { name: "Dr. James Wilson", specialty: "Emergency", available: true },
]
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"]

export default function BookAppointmentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    breed: "",
    service: "",
    doctor: "",
    date: "",
    time: "",
    paymentMethod: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const updateForm = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.petName && formData.petType
      case 2:
        return formData.service && formData.doctor && formData.date && formData.time
      case 3:
        return formData.paymentMethod
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsComplete(true)
  }

  if (isComplete) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">Booking Successful!</h2>
          <p className="text-muted-foreground mb-2">
            Your appointment has been scheduled.
          </p>
          <p className="text-muted-foreground mb-8">
            {formData.service} for {formData.petName} on {formData.date} at {formData.time}
          </p>
          <Button onClick={() => { setIsComplete(false); setStep(1); setFormData({ petName: "", petType: "", breed: "", service: "", doctor: "", date: "", time: "", paymentMethod: "" }) }} className="rounded-full">
            Book Another Appointment
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Book Appointment</h1>
        <p className="text-muted-foreground">Schedule a visit for your pet in just a few steps</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {["Pet Details", "Booking Details", "Payment"].map((label, i) => (
          <div key={label} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  step > i + 1
                    ? "bg-green-500 text-white"
                    : step === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {step > i + 1 ? <CheckCircle className="w-5 h-5" /> : i + 1}
              </div>
              <span className="text-xs mt-2 text-muted-foreground hidden sm:block">{label}</span>
            </div>
            {i < 2 && (
              <div
                className={`h-1 flex-1 mx-2 rounded-full transition-colors ${
                  step > i + 1 ? "bg-green-500" : "bg-muted"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Pet Details */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PawPrint className="w-5 h-5 text-primary" />
              Pet Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="petName">Pet Name</Label>
                <Input
                  id="petName"
                  placeholder="Enter your pet's name"
                  value={formData.petName}
                  onChange={(e) => updateForm("petName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Pet Type</Label>
                <Select value={formData.petType} onValueChange={(v) => updateForm("petType", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pet type" />
                  </SelectTrigger>
                  <SelectContent>
                    {petTypes.map((type) => (
                      <SelectItem key={type} value={type.toLowerCase()}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="breed">Breed (Optional)</Label>
              <Input
                id="breed"
                placeholder="Enter breed"
                value={formData.breed}
                onChange={(e) => updateForm("breed", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Booking Details */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Booking Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Service Type</Label>
              <Select value={formData.service} onValueChange={(v) => updateForm("service", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service} value={service}>
                      {service}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Doctor</Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {doctors.map((doc) => (
                  <button
                    key={doc.name}
                    onClick={() => doc.available && updateForm("doctor", doc.name)}
                    disabled={!doc.available}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      formData.doctor === doc.name
                        ? "border-primary bg-primary/5"
                        : doc.available
                        ? "border-border hover:border-primary/50"
                        : "border-border opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.specialty}</p>
                      </div>
                    </div>
                    {!doc.available && (
                      <span className="text-xs text-destructive mt-2 block">Not available</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateForm("date", e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div className="space-y-2">
                <Label>Select Time</Label>
                <Select value={formData.time} onValueChange={(v) => updateForm("time", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Payment */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Payment Method
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <button
                onClick={() => updateForm("paymentMethod", "online")}
                className={`p-6 rounded-xl border text-center transition-all ${
                  formData.paymentMethod === "online"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <CreditCard className="w-10 h-10 mx-auto mb-3 text-primary" />
                <p className="font-medium text-foreground">Online Payment</p>
                <p className="text-sm text-muted-foreground">Pay now with card</p>
              </button>
              <button
                onClick={() => updateForm("paymentMethod", "cash")}
                className={`p-6 rounded-xl border text-center transition-all ${
                  formData.paymentMethod === "cash"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <Banknote className="w-10 h-10 mx-auto mb-3 text-primary" />
                <p className="font-medium text-foreground">Cash on Visit</p>
                <p className="text-sm text-muted-foreground">Pay at hospital</p>
              </button>
            </div>

            {/* Booking Summary */}
            <div className="p-4 rounded-xl bg-muted/50">
              <h4 className="font-semibold text-foreground mb-3">Booking Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Pet</span>
                  <span className="font-medium">{formData.petName} ({formData.petType})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Service</span>
                  <span className="font-medium">{formData.service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Doctor</span>
                  <span className="font-medium">{formData.doctor}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date & Time</span>
                  <span className="font-medium">{formData.date} at {formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment</span>
                  <span className="font-medium">{formData.paymentMethod === "online" ? "Online" : "Cash on Visit"}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(step - 1)}
          disabled={step === 1}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
        {step < 3 ? (
          <Button onClick={() => setStep(step + 1)} disabled={!canProceed()} className="gap-2">
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={!canProceed() || isSubmitting} className="gap-2">
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
            ) : (
              <>
                Confirm Booking
                <CheckCircle className="w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
