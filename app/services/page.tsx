"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Scissors,
  Droplets,
  Stethoscope,
  Syringe,
  Thermometer,
  Bandage,
  Activity,
  AlertCircle,
  ArrowRight,
  Clock,
  CheckCircle,
} from "lucide-react"

const services = [
  {
    icon: Scissors,
    title: "Pet Grooming",
    description: "Professional grooming services including haircuts, nail trimming, ear cleaning, and styling. We use premium products that are gentle on your pet's skin and coat.",
    features: ["Full body haircut", "Nail trimming", "Ear cleaning", "Teeth brushing", "Coat conditioning"],
    price: "From $45",
    duration: "1-2 hours",
    image: "🐩",
  },
  {
    icon: Droplets,
    title: "Pet Bathing",
    description: "Luxurious bathing experience with specialized shampoos for different coat types. Includes blow-dry and brushing for a fresh, clean pet.",
    features: ["Premium shampoo", "Deep conditioning", "Blow dry & brush", "Detangling", "Cologne spray"],
    price: "From $30",
    duration: "45 mins",
    image: "🛁",
  },
  {
    icon: Stethoscope,
    title: "Veterinary Clinic",
    description: "Comprehensive medical services from routine checkups to complex treatments. Our experienced veterinarians provide top-quality care.",
    features: ["Physical exams", "Diagnostics", "Surgery", "Dental care", "Specialist referrals"],
    price: "From $75",
    duration: "30-60 mins",
    image: "🏥",
  },
  {
    icon: Syringe,
    title: "Vaccination",
    description: "Keep your pet protected with our complete vaccination programs. We follow the latest guidelines to ensure optimal immunity.",
    features: ["Core vaccines", "Rabies shots", "Booster shots", "Vaccination records", "Health certificates"],
    price: "From $25",
    duration: "15-30 mins",
    image: "💉",
  },
  {
    icon: Thermometer,
    title: "Fever Treatment",
    description: "Quick diagnosis and effective treatment for pets showing signs of fever. We identify the underlying cause and provide appropriate care.",
    features: ["Temperature check", "Blood tests", "Medication", "Fluid therapy", "Follow-up care"],
    price: "From $60",
    duration: "30-45 mins",
    image: "🌡️",
  },
  {
    icon: Bandage,
    title: "Injury Treatment",
    description: "Expert care for wounds, fractures, and other injuries. From minor cuts to surgical repairs, we handle it all with compassion.",
    features: ["Wound care", "Fracture treatment", "Suturing", "Pain management", "Recovery support"],
    price: "From $80",
    duration: "Varies",
    image: "🩹",
  },
  {
    icon: Activity,
    title: "General Checkup",
    description: "Regular health assessments to catch potential issues early. Includes comprehensive physical examination and health recommendations.",
    features: ["Physical exam", "Weight check", "Heart & lung check", "Diet advice", "Preventive care"],
    price: "From $55",
    duration: "30 mins",
    image: "📋",
  },
  {
    icon: AlertCircle,
    title: "Emergency Care",
    description: "24/7 emergency services for critical situations. Our emergency team is always ready to provide life-saving care when every second counts.",
    features: ["24/7 availability", "Critical care", "Emergency surgery", "ICU monitoring", "Rapid response"],
    price: "From $150",
    duration: "As needed",
    image: "🚑",
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Services
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Comprehensive Pet Care <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From grooming to emergency care, we offer a complete range of services to keep your beloved pets healthy and happy.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <Card
                key={service.title}
                className={`group overflow-hidden border-border/50 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 ${
                  index % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                <CardContent className="p-0">
                  <div className={`flex flex-col lg:flex-row ${index % 2 !== 0 ? "lg:flex-row-reverse" : ""}`}>
                    {/* Image/Icon Section */}
                    <div className="lg:w-2/5 bg-gradient-to-br from-primary/10 to-accent/10 p-8 lg:p-12 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4">{service.image}</div>
                        <div className="w-16 h-16 mx-auto rounded-2xl bg-card shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <service.icon className="w-8 h-8 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:w-3/5 p-8 lg:p-12">
                      <div className="flex items-center gap-3 mb-4">
                        <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{service.title}</h2>
                      </div>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                      {/* Features */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {service.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Price & Duration */}
                      <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold">
                          {service.price}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{service.duration}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link href="/dashboard/book-appointment">
                        <Button className="rounded-full gap-2 group-hover:gap-3 transition-all duration-300">
                          Book Now
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Not Sure Which Service Your Pet Needs?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Contact us for a free consultation. Our experts will help you determine the best care plan for your furry friend.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="rounded-full gap-2">
                Contact Us
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/dashboard/book-appointment">
              <Button size="lg" variant="outline" className="rounded-full border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Book Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
