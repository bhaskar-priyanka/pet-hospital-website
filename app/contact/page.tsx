"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react"

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["123 Pet Care Avenue", "Veterinary District", "New York, NY 10001"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+1 (555) 123-4567", "+1 (555) 987-6543", "Emergency: +1 (555) 911-PETS"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["info@pawcare.com", "appointments@pawcare.com", "support@pawcare.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    details: ["Monday - Friday: 8:00 AM - 8:00 PM", "Saturday: 9:00 AM - 6:00 PM", "Sunday: 10:00 AM - 4:00 PM"],
  },
]

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: "#" },
  { icon: Twitter, label: "Twitter", href: "#" },
  { icon: Instagram, label: "Instagram", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/50 to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <MessageSquare className="w-4 h-4" />
            Get in Touch
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            We'd Love to Hear From You
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance">
            Have questions about our services or want to schedule an appointment? 
            Our friendly team is here to help you and your furry friends.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info) => (
              <Card key={info.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <info.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-3">{info.title}</h3>
                  <div className="space-y-1">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you within 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground">
                      Thank you for contacting us. We'll respond shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          placeholder="+1 (555) 000-0000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full rounded-full h-12 gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              {/* Map Placeholder */}
              <Card className="overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[url('/images/map-pattern.png')] opacity-20" />
                  <div className="text-center z-10">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-primary" />
                    <h3 className="font-semibold text-foreground mb-2">PawCare Veterinary Hospital</h3>
                    <p className="text-sm text-muted-foreground">123 Pet Care Avenue, New York</p>
                    <Button variant="outline" className="mt-4 rounded-full" asChild>
                      <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                        Get Directions
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Quick Contact */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Emergency Contact</h3>
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                      <Phone className="w-6 h-6 text-destructive" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">24/7 Pet Emergency</p>
                      <p className="text-lg font-bold text-destructive">+1 (555) 911-PETS</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
                  <div className="flex gap-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground mb-8">
            Can't find what you're looking for? Check our FAQ or send us a message above.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              { q: "What are your operating hours?", a: "We're open Mon-Fri 8AM-8PM, Sat 9AM-6PM, Sun 10AM-4PM" },
              { q: "Do you offer emergency services?", a: "Yes! Our emergency line is available 24/7 at +1 (555) 911-PETS" },
              { q: "How do I book an appointment?", a: "You can book online through your dashboard or call us directly" },
              { q: "Do you accept pet insurance?", a: "Yes, we accept most major pet insurance providers" },
            ].map((faq, idx) => (
              <Card key={idx}>
                <CardContent className="p-4">
                  <h4 className="font-medium text-foreground mb-2">{faq.q}</h4>
                  <p className="text-sm text-muted-foreground">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
