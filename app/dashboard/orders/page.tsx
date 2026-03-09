"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useOrders, Order, Booking } from "@/lib/orders-context"
import {
  ShoppingBag,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  X,
  Package,
  Truck,
  XCircle,
} from "lucide-react"

export default function OrdersPage() {
  const { user } = useAuth()
  const { getUserOrders, getUserBookings } = useOrders()
  const [activeTab, setActiveTab] = useState<"orders" | "bookings">("orders")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  const orders = user ? getUserOrders(user.id) : []
  const bookings = user ? getUserBookings(user.id) : []

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
        return <CheckCircle className="w-3 h-3" />
      case "pending":
        return <AlertCircle className="w-3 h-3" />
      case "shipped":
        return <Truck className="w-3 h-3" />
      case "processing":
      case "confirmed":
        return <Package className="w-3 h-3" />
      case "cancelled":
      case "rejected":
        return <XCircle className="w-3 h-3" />
      default:
        return <Clock className="w-3 h-3" />
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "delivered":
      case "completed":
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "shipped":
        return "bg-blue-100 text-blue-700"
      case "processing":
        return "bg-purple-100 text-purple-700"
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">My Orders & Bookings</h1>
          <p className="text-muted-foreground">View your order history and appointment bookings</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-border pb-2">
        <button
          onClick={() => setActiveTab("orders")}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
            activeTab === "orders"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Product Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`px-4 py-2 font-medium rounded-t-lg transition-colors ${
            activeTab === "bookings"
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Service Bookings ({bookings.length})
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {activeTab === "orders"
          ? [
              { label: "Total Orders", value: orders.length, icon: ShoppingBag, color: "bg-blue-500" },
              { label: "Delivered", value: orders.filter((o) => o.orderStatus === "delivered").length, icon: CheckCircle, color: "bg-green-500" },
              { label: "Pending", value: orders.filter((o) => o.orderStatus === "pending").length, icon: Clock, color: "bg-yellow-500" },
              { label: "In Transit", value: orders.filter((o) => o.orderStatus === "shipped").length, icon: Truck, color: "bg-purple-500" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          : [
              { label: "Total Bookings", value: bookings.length, icon: Calendar, color: "bg-blue-500" },
              { label: "Completed", value: bookings.filter((b) => b.status === "completed").length, icon: CheckCircle, color: "bg-green-500" },
              { label: "Pending", value: bookings.filter((b) => b.status === "pending").length, icon: Clock, color: "bg-yellow-500" },
              { label: "Confirmed", value: bookings.filter((b) => b.status === "confirmed").length, icon: Package, color: "bg-purple-500" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Orders/Bookings Table */}
      {activeTab === "orders" ? (
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No orders yet</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Start shopping to see your orders here
                </p>
                <Link href="/shop">
                  <Button className="rounded-full">Browse Products</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Items</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-medium text-foreground">{order.id}</td>
                        <td className="py-4 px-4 text-muted-foreground">{order.items.length} items</td>
                        <td className="py-4 px-4 font-semibold text-foreground">${order.total.toFixed(2)}</td>
                        <td className="py-4 px-4 text-muted-foreground">{formatDate(order.createdAt)}</td>
                        <td className="py-4 px-4 text-muted-foreground capitalize">
                          {order.paymentMethod.replace("_", " ")}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                              order.orderStatus
                            )}`}
                          >
                            {getOrderStatusIcon(order.orderStatus)}
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm" className="gap-1" onClick={() => setSelectedOrder(order)}>
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Booking History</CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No bookings yet</p>
                <p className="text-sm text-muted-foreground mt-1 mb-4">
                  Book an appointment for your pet
                </p>
                <Link href="/dashboard/book-appointment">
                  <Button className="rounded-full">Book Appointment</Button>
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Booking ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pet</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Appointment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-medium text-foreground">{booking.id}</td>
                        <td className="py-4 px-4 text-foreground">{booking.service}</td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-foreground">{booking.petName}</p>
                            <p className="text-xs text-muted-foreground capitalize">{booking.petType}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-foreground">{booking.date}</p>
                            <p className="text-xs text-muted-foreground">{booking.time}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                              booking.status
                            )}`}
                          >
                            {getOrderStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <Button variant="ghost" size="sm" className="gap-1" onClick={() => setSelectedBooking(booking)}>
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Items</h4>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-2 bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 rounded bg-muted flex items-center justify-center text-xl">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border-t pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${selectedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{selectedOrder.shipping === 0 ? "FREE" : `$${selectedOrder.shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-primary">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Shipping Address</h4>
                <p className="text-sm text-muted-foreground">
                  {selectedOrder.shippingAddress.fullName}<br />
                  {selectedOrder.shippingAddress.address}<br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Booking Details - {selectedBooking.id}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setSelectedBooking(null)}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Service</p>
                  <p className="font-medium">{selectedBooking.service}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                      selectedBooking.status
                    )}`}
                  >
                    {selectedBooking.status}
                  </span>
                </div>
                <div>
                  <p className="text-muted-foreground">Pet Name</p>
                  <p className="font-medium">{selectedBooking.petName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Pet Type</p>
                  <p className="font-medium capitalize">{selectedBooking.petType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date</p>
                  <p className="font-medium">{selectedBooking.date}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Time</p>
                  <p className="font-medium">{selectedBooking.time}</p>
                </div>
              </div>
              {selectedBooking.notes && (
                <div>
                  <p className="text-muted-foreground text-sm">Notes</p>
                  <p className="text-sm">{selectedBooking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
