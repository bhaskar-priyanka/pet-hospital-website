"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useOrders, Order } from "@/lib/orders-context"
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Truck,
  Package,
  X,
} from "lucide-react"

export default function AdminOrdersPage() {
  const { orders, bookings, updateOrderStatus, updateBookingStatus } = useOrders()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [activeTab, setActiveTab] = useState<"orders" | "bookings">("orders")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.orderStatus === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
      case "confirmed":
        return <CheckCircle className="w-4 h-4" />
      case "pending":
        return <AlertCircle className="w-4 h-4" />
      case "cancelled":
      case "rejected":
        return <XCircle className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusClass = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "cancelled":
      case "rejected":
        return "bg-red-100 text-red-700"
      case "shipped":
        return "bg-blue-100 text-blue-700"
      case "processing":
        return "bg-purple-100 text-purple-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, "confirmed")
  }

  const handleRejectOrder = (orderId: string) => {
    updateOrderStatus(orderId, "rejected")
  }

  const handleUpdateOrderStatus = (orderId: string, status: Order["orderStatus"]) => {
    updateOrderStatus(orderId, status)
  }

  const handleAcceptBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, "confirmed")
  }

  const handleRejectBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, "rejected")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    confirmed: orders.filter((o) => o.orderStatus === "confirmed").length,
    completed: orders.filter((o) => o.orderStatus === "delivered").length,
  }

  const bookingStats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Orders & Bookings Management</h1>
        <p className="text-muted-foreground">View and manage all customer orders and appointment bookings</p>
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
              { label: "Total Orders", value: orderStats.total, color: "bg-blue-500" },
              { label: "Pending", value: orderStats.pending, color: "bg-yellow-500" },
              { label: "Confirmed", value: orderStats.confirmed, color: "bg-green-500" },
              { label: "Delivered", value: orderStats.completed, color: "bg-purple-500" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          : [
              { label: "Total Bookings", value: bookingStats.total, color: "bg-blue-500" },
              { label: "Pending", value: bookingStats.pending, color: "bg-yellow-500" },
              { label: "Confirmed", value: bookingStats.confirmed, color: "bg-green-500" },
              { label: "Completed", value: bookingStats.completed, color: "bg-purple-500" },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                {activeTab === "orders" && (
                  <>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </>
                )}
                {activeTab === "bookings" && <SelectItem value="completed">Completed</SelectItem>}
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders/Bookings Table */}
      {activeTab === "orders" ? (
        <Card>
          <CardHeader>
            <CardTitle>Product Orders ({filteredOrders.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No orders found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Orders will appear here when customers place them
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Items</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Total</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Payment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-medium text-foreground">{order.id}</td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-foreground">{order.customerName}</p>
                            <p className="text-xs text-muted-foreground">{order.customerEmail}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground">{order.items.length} items</td>
                        <td className="py-4 px-4 font-semibold text-foreground">${order.total.toFixed(2)}</td>
                        <td className="py-4 px-4">
                          <span className="capitalize text-muted-foreground">
                            {order.paymentMethod.replace("_", " ")}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground text-sm">{formatDate(order.createdAt)}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                              order.orderStatus
                            )}`}
                          >
                            {getStatusIcon(order.orderStatus)}
                            {order.orderStatus}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            {order.orderStatus === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => handleAcceptOrder(order.id)}
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleRejectOrder(order.id)}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {order.orderStatus === "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateOrderStatus(order.id, "processing")}
                              >
                                Process
                              </Button>
                            )}
                            {order.orderStatus === "processing" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateOrderStatus(order.id, "shipped")}
                              >
                                Ship
                              </Button>
                            )}
                            {order.orderStatus === "shipped" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleUpdateOrderStatus(order.id, "delivered")}
                              >
                                Delivered
                              </Button>
                            )}
                          </div>
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
            <CardTitle>Service Bookings ({filteredBookings.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredBookings.length === 0 ? (
              <div className="text-center py-12">
                <Clock className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No bookings found</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Appointment bookings will appear here when customers book services
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Booking ID</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Pet</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Appointment</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                        <td className="py-4 px-4 font-medium text-foreground">{booking.id}</td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-foreground">{booking.customerName}</p>
                            <p className="text-xs text-muted-foreground">{booking.customerEmail}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <p className="text-foreground">{booking.petName}</p>
                            <p className="text-xs text-muted-foreground">
                              {booking.petType} - {booking.petBreed}
                            </p>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-foreground">{booking.service}</td>
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
                            {getStatusIcon(booking.status)}
                            {booking.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            {booking.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                                  onClick={() => handleAcceptBooking(booking.id)}
                                >
                                  Accept
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => handleRejectBooking(booking.id)}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {booking.status === "confirmed" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateBookingStatus(booking.id, "completed")}
                              >
                                Complete
                              </Button>
                            )}
                          </div>
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
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Order Details - {selectedOrder.id}</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(null)}>
                <X className="w-5 h-5" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-semibold mb-2">Customer Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Name</p>
                    <p className="font-medium">{selectedOrder.customerName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <p className="font-medium">{selectedOrder.customerEmail}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Phone</p>
                    <p className="font-medium">{selectedOrder.customerPhone}</p>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h4 className="font-semibold mb-2">Shipping Address</h4>
                <p className="text-sm">
                  {selectedOrder.shippingAddress.fullName}
                  <br />
                  {selectedOrder.shippingAddress.address}
                  <br />
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state}{" "}
                  {selectedOrder.shippingAddress.zipCode}
                  <br />
                  {selectedOrder.shippingAddress.country}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-semibold mb-2">Order Items</h4>
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

              {/* Order Summary */}
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

              {/* Payment & Status */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium capitalize">{selectedOrder.paymentMethod.replace("_", " ")}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Order Status</p>
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                      selectedOrder.orderStatus
                    )}`}
                  >
                    {getStatusIcon(selectedOrder.orderStatus)}
                    {selectedOrder.orderStatus}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
