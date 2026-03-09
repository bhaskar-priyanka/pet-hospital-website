"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  PawPrint,
  Heart,
  Shield,
  Clock,
  Scissors,
  Droplets,
  Stethoscope,
  Syringe,
  Thermometer,
  Bandage,
  Activity,
  AlertCircle,
  Star,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

function AnimatedCounter({ end, label, icon: Icon }: { end: number; label: string; icon: React.ElementType }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const duration = 2000

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isVisible, end])

  return (
    <div ref={ref} className="text-center group">
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
        <Icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-foreground mb-2">
        {count.toLocaleString()}+
      </div>
      <div className="text-muted-foreground font-medium">{label}</div>
    </div>
  )
}

const services = [
  { icon: Scissors, title: "Pet Grooming", description: "Professional grooming services to keep your pet looking their best" },
  { icon: Droplets, title: "Pet Bathing", description: "Gentle bathing with premium pet-safe products" },
  { icon: Stethoscope, title: "Veterinary Clinic", description: "Comprehensive health checkups and medical care" },
  { icon: Syringe, title: "Vaccination", description: "Complete vaccination programs for all pets" },
  { icon: Thermometer, title: "Fever Treatment", description: "Quick diagnosis and treatment for sick pets" },
  { icon: Bandage, title: "Injury Treatment", description: "Expert care for wounds and injuries" },
  { icon: Activity, title: "General Checkup", description: "Regular health assessments for preventive care" },
  { icon: AlertCircle, title: "Emergency Care", description: "24/7 emergency services for critical situations" },
]

const testimonials = [
  { name: "Sarah Johnson", pet: "Max (Golden Retriever)", content: "PawCare has been absolutely wonderful with Max. The staff is incredibly caring and professional.", rating: 5, avatar: "SJ" },
  { name: "Michael Chen", pet: "Whiskers (Persian Cat)", content: "Best veterinary clinic in town! They treated Whiskers like royalty during her stay.", rating: 5, avatar: "MC" },
  { name: "Emily Rodriguez", pet: "Buddy (Labrador)", content: "The grooming service is exceptional. Buddy always comes home looking and smelling amazing!", rating: 5, avatar: "ER" },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Heart className="w-4 h-4" />
                Trusted by 10,000+ Pet Parents
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight text-balance">
                Caring for Your Pets{" "}
                <span className="text-primary">Like Family</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Experience world-class veterinary care, premium grooming services, and everything your pet needs - all under one roof.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <Link href="/dashboard/book-appointment">
                  <Button size="lg" className="rounded-full text-lg px-8 h-14 gap-2 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300">
                    Book Appointment
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/shop">
                  <Button size="lg" variant="outline" className="rounded-full text-lg px-8 h-14 gap-2 hover:bg-secondary transition-all duration-300">
                    Shop Pet Products
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                {/* Decorative circles */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 animate-spin-slow" style={{ animationDuration: '20s' }} />
                <div className="absolute inset-8 rounded-full bg-gradient-to-tr from-secondary/40 to-primary/10 backdrop-blur-sm" />
                
                {/* Pet icons */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-card shadow-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}>
                      <span className="text-3xl">🐕</span>
                    </div>
                    <div className="absolute bottom-0 left-0 -translate-x-1/2 translate-y-1/2 w-14 h-14 rounded-2xl bg-card shadow-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }}>
                      <span className="text-2xl">🐈</span>
                    </div>
                    <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-14 h-14 rounded-2xl bg-card shadow-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
                      <span className="text-2xl">🐦</span>
                    </div>
                    <div className="absolute top-1/2 left-0 -translate-x-full -translate-y-1/2 w-12 h-12 rounded-2xl bg-card shadow-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}>
                      <span className="text-xl">🐰</span>
                    </div>
                    <div className="absolute top-1/2 right-0 translate-x-full -translate-y-1/2 w-12 h-12 rounded-2xl bg-card shadow-xl flex items-center justify-center animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
                      <span className="text-xl">🐹</span>
                    </div>
                    {/* Center paw */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 rounded-3xl bg-primary shadow-2xl shadow-primary/30 flex items-center justify-center">
                        <PawPrint className="w-12 h-12 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <AnimatedCounter end={15000} label="Happy Pets Treated" icon={Heart} />
            <AnimatedCounter end={25} label="Expert Doctors" icon={Stethoscope} />
            <AnimatedCounter end={14} label="Years of Service" icon={Clock} />
            <AnimatedCounter end={99} label="Success Rate %" icon={Shield} />
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Our Services
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 text-balance">
              Comprehensive Pet Care Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From routine checkups to emergency care, we provide everything your beloved pet needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className="group relative overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg" variant="outline" className="rounded-full gap-2">
                View All Services
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                Why Choose Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
                Your Pet Deserves the Best Care
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At PawCare, we combine cutting-edge veterinary medicine with compassionate care to ensure your pet receives the treatment they deserve.
              </p>
              <div className="space-y-6">
                {[
                  { title: "24/7 Emergency Services", description: "Round-the-clock care for urgent situations" },
                  { title: "Experienced Veterinarians", description: "Board-certified specialists with years of experience" },
                  { title: "Modern Facilities", description: "State-of-the-art equipment and comfortable environment" },
                  { title: "Affordable Pricing", description: "Quality care that won't break the bank" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-muted-foreground text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glassmorphism Card */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
              <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-background/50 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-2">🏥</div>
                    <h4 className="font-semibold text-foreground">Modern Clinic</h4>
                  </div>
                  <div className="bg-background/50 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-2">💊</div>
                    <h4 className="font-semibold text-foreground">In-House Pharmacy</h4>
                  </div>
                  <div className="bg-background/50 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-2">🔬</div>
                    <h4 className="font-semibold text-foreground">Lab Services</h4>
                  </div>
                  <div className="bg-background/50 rounded-2xl p-6 text-center">
                    <div className="text-4xl mb-2">🛁</div>
                    <h4 className="font-semibold text-foreground">Grooming Spa</h4>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Next Available Slot</p>
                    <p className="font-semibold text-foreground">Today, 2:00 PM</p>
                  </div>
                  <Link href="/dashboard/book-appointment">
                    <Button className="rounded-full">Book Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              What Pet Parents Say
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <Card className="border-border/50 shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-xl md:text-2xl text-foreground mb-8 leading-relaxed">
                  &ldquo;{testimonials[currentTestimonial].content}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{testimonials[currentTestimonial].name}</h4>
                    <p className="text-muted-foreground">{testimonials[currentTestimonial].pet}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === currentTestimonial ? "bg-primary w-8" : "bg-muted-foreground/30"
                    }`}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                onClick={nextTestimonial}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Book an appointment today and experience the PawCare difference. Your furry friend will thank you!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/dashboard/book-appointment">
              <Button size="lg" variant="secondary" className="rounded-full text-lg px-8 h-14 gap-2">
                Book Appointment
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full text-lg px-8 h-14 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
