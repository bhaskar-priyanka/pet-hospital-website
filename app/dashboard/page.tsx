"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"
import {
  Calendar,
  ShoppingBag,
  ShoppingCart,
  Heart,
  ArrowRight,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const recentOrders = [
  { id: "ORD001", service: "Pet Grooming", pet: "Max", date: "Mar 5, 2024", status: "Completed" },
  { id: "ORD002", service: "Vaccination", pet: "Bella", date: "Mar 3, 2024", status: "Completed" },
  { id: "ORD003", service: "General Checkup", pet: "Max", date: "Feb 28, 2024", status: "Pending" },
]

const upcomingAppointments = [
  { service: "Pet Grooming", pet: "Max", date: "Mar 15, 2024", time: "10:00 AM", doctor: "Dr. Smith" },
  { service: "Vaccination", pet: "Bella", date: "Mar 20, 2024", time: "2:00 PM", doctor: "Dr. Johnson" },
]

export default function DashboardPage() {
  const { user } = useAuth()
  const { totalItems } = useCart()

  const quickActions = [
    { href: "/dashboard/book-appointment", label: "Book Appointment", icon: Calendar, color: "bg-blue-500" },
    { href: "/dashboard/orders", label: "View Orders", icon: ShoppingBag, color: "bg-green-500" },
    { href: "/shop", label: "Pet Shop", icon: ShoppingCart, color: "bg-purple-500" },
    { href: "/dashboard/pets", label: "Pet Details", icon: Heart, color: "bg-pink-500" },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 md:p-8 text-primary-foreground">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Welcome back, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="text-primary-foreground/80 mb-6">
            Manage your pet's appointments, orders, and more from your dashboard.
          </p>
          <Link href="/dashboard/book-appointment">
            <Button variant="secondary" className="rounded-full gap-2">
              Book New Appointment
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.href} href={action.href}>
            <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="font-medium text-foreground text-sm">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Upcoming Appointments</CardTitle>
            <Link href="/dashboard/book-appointment">
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((apt, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground">{apt.service}</h4>
                    <p className="text-sm text-muted-foreground">{apt.pet} with {apt.doctor}</p>
                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{apt.date} at {apt.time}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No upcoming appointments</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Orders</CardTitle>
            <Link href="/dashboard/orders">
              <Button variant="ghost" size="sm" className="gap-1 text-primary">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{order.service}</h4>
                      <p className="text-sm text-muted-foreground">{order.pet} - {order.date}</p>
                    </div>
                  </div>
                  <span
                    className={`flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {order.status === "Completed" ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Cart Preview */}
      {totalItems > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">You have {totalItems} items in your cart</h3>
                <p className="text-sm text-muted-foreground">Complete your purchase before they sell out!</p>
              </div>
            </div>
            <Link href="/shop/cart">
              <Button className="rounded-full gap-2">
                View Cart
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
