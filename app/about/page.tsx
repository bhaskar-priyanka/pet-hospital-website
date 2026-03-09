"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Heart,
  Award,
  Users,
  Clock,
  Shield,
  Stethoscope,
  GraduationCap,
  Star,
  CheckCircle,
  ArrowRight,
  HeartPulse,
  Sparkles,
  Target,
} from "lucide-react"

const stats = [
  { value: "15+", label: "Years of Experience", icon: Clock },
  { value: "50K+", label: "Happy Pets Treated", icon: Heart },
  { value: "25+", label: "Expert Veterinarians", icon: Users },
  { value: "98%", label: "Client Satisfaction", icon: Star },
]

const values = [
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "We treat every pet with the love and attention they deserve, understanding they're family.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "Committed to providing the highest quality veterinary care using advanced medical technology.",
  },
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "Creating a safe, stress-free environment where pets feel comfortable and owners feel confident.",
  },
  {
    icon: GraduationCap,
    title: "Continuous Learning",
    description: "Our team stays updated with the latest veterinary practices and medical advancements.",
  },
]

const team = [
  {
    name: "Dr. Sarah Mitchell",
    role: "Chief Veterinarian",
    specialty: "Small Animal Surgery",
    experience: "18 years",
    image: "/images/vet-1.jpg",
  },
  {
    name: "Dr. James Wilson",
    role: "Senior Veterinarian",
    specialty: "Internal Medicine",
    experience: "15 years",
    image: "/images/vet-2.jpg",
  },
  {
    name: "Dr. Emily Chen",
    role: "Veterinary Specialist",
    specialty: "Dermatology & Nutrition",
    experience: "12 years",
    image: "/images/vet-3.jpg",
  },
  {
    name: "Dr. Michael Brown",
    role: "Emergency Care Specialist",
    specialty: "Critical Care & Emergency",
    experience: "10 years",
    image: "/images/vet-4.jpg",
  },
]

const milestones = [
  { year: "2009", title: "Founded PawCare", description: "Started with a vision to revolutionize pet healthcare" },
  { year: "2012", title: "First Expansion", description: "Opened our state-of-the-art surgical center" },
  { year: "2016", title: "Community Impact", description: "Launched free vaccination drives for shelter animals" },
  { year: "2019", title: "Innovation Award", description: "Recognized for pioneering pet telemedicine services" },
  { year: "2022", title: "50K Milestone", description: "Celebrated treating our 50,000th patient" },
  { year: "2024", title: "New Beginnings", description: "Expanded to 24/7 emergency care services" },
]

const services = [
  "Comprehensive Health Exams",
  "Preventive Vaccinations",
  "Advanced Surgical Procedures",
  "Dental Care & Cleaning",
  "Emergency & Critical Care",
  "Diagnostic Imaging (X-Ray, Ultrasound)",
  "Laboratory Services",
  "Pet Grooming & Spa",
  "Nutritional Counseling",
  "Behavioral Therapy",
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-secondary/50 to-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/paw-pattern.png')] opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                About PawCare
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Caring for Your Pets Like They're Our Own Family
              </h1>
              <p className="text-lg text-muted-foreground mb-8 text-balance">
                For over 15 years, PawCare has been the trusted partner for pet owners seeking 
                exceptional veterinary care. Our team of dedicated professionals combines 
                cutting-edge medical expertise with genuine compassion to ensure your furry 
                friends receive the best possible care.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/dashboard/book-appointment">
                  <Button size="lg" className="rounded-full gap-2">
                    Book Appointment
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <Image
                  src="/images/about-hero.jpg"
                  alt="Veterinarian caring for a pet"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Fully Accredited</p>
                    <p className="text-sm text-muted-foreground">AAHA Certified Hospital</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white/10 flex items-center justify-center">
                  <stat.icon className="w-7 h-7" />
                </div>
                <p className="text-4xl font-bold mb-2">{stat.value}</p>
                <p className="text-sm opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                  <Image
                    src="/images/clinic-1.jpg"
                    alt="Modern clinic interior"
                    width={300}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-secondary/20 overflow-hidden">
                  <Image
                    src="/images/clinic-2.jpg"
                    alt="Surgery room"
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 overflow-hidden">
                  <Image
                    src="/images/clinic-3.jpg"
                    alt="Veterinarian with pet"
                    width={300}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
                  <Image
                    src="/images/clinic-4.jpg"
                    alt="Pet grooming"
                    width={300}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium mb-6">
                <HeartPulse className="w-4 h-4 text-primary" />
                Our Story
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                A Legacy of Compassionate Pet Care
              </h2>
              <p className="text-muted-foreground mb-6">
                PawCare was founded in 2009 by Dr. Sarah Mitchell with a simple yet powerful mission: 
                to provide pets with the same quality of medical care that humans receive. What started 
                as a small clinic has grown into a comprehensive veterinary hospital, but our core 
                values remain unchanged.
              </p>
              <p className="text-muted-foreground mb-8">
                Today, we're proud to have a team of over 25 veterinary professionals, each bringing 
                unique expertise and a shared passion for animal welfare. Our state-of-the-art facility 
                is equipped with the latest diagnostic and surgical technology, ensuring your pets 
                receive the most accurate diagnoses and effective treatments.
              </p>
              <div className="space-y-3">
                {["AAHA Accredited Hospital", "Fear-Free Certified Practice", "24/7 Emergency Services"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground">
                  To provide exceptional, compassionate veterinary care that enhances the health and 
                  well-being of pets while supporting the human-animal bond. We strive to be a 
                  trusted partner in every pet's healthcare journey, from preventive care to 
                  specialized treatments.
                </p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground">
                  To be the leading veterinary care provider recognized for clinical excellence, 
                  innovative treatments, and unwavering dedication to animal welfare. We envision 
                  a world where every pet has access to quality healthcare and lives a happy, 
                  healthy life.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at PawCare
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Stethoscope className="w-4 h-4" />
              Expert Team
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Meet Our Skilled Veterinarians
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our team of experienced professionals is dedicated to providing the best care for your pets
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden group">
                <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-1">{member.specialty}</p>
                  <p className="text-xs text-muted-foreground">{member.experience} experience</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Offer */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Comprehensive Services for Your Pets
              </h2>
              <p className="text-muted-foreground mb-8">
                From routine check-ups to advanced surgical procedures, we offer a full range of 
                veterinary services under one roof. Our commitment to excellence ensures your pet 
                receives the highest standard of care.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {services.map((service) => (
                  <div key={service} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="text-sm text-foreground">{service}</span>
                  </div>
                ))}
              </div>
              <Link href="/services" className="inline-block mt-8">
                <Button className="rounded-full gap-2">
                  View All Services
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-video rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
                <Image
                  src="/images/services-collage.jpg"
                  alt="Our veterinary services"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Journey</h2>
            <p className="text-muted-foreground">Key milestones in PawCare's history</p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  className={`flex items-center gap-8 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                >
                  <div className={`flex-1 ${idx % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <Card>
                      <CardContent className="p-4">
                        <p className="text-2xl font-bold text-primary mb-1">{milestone.year}</p>
                        <h4 className="font-semibold text-foreground mb-1">{milestone.title}</h4>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-primary shrink-0 hidden md:block" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Give Your Pet the Best Care?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of happy pet owners who trust PawCare for their pets' health and happiness.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/dashboard/book-appointment">
              <Button size="lg" variant="secondary" className="rounded-full gap-2">
                Book an Appointment
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="rounded-full border-white/30 hover:bg-white/10">
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
