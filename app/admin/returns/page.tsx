"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useOrders } from "@/lib/orders-context"
import { RotateCcw, CheckCircle, XCircle, Clock, DollarSign, Package } from "lucide-react"

export default function AdminReturnsPage() {
  const { returns, updateReturnStatus } = useOrders()

  const getStatusClass = (status: string) => {
    switch (status) {
      case "refunded":
        return "bg-green-100 text-green-700"
      case "approved":
        return "bg-blue-100 text-blue-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-yellow-100 text-yellow-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "refunded":
        return <DollarSign className="w-4 h-4" />
      case "approved":
        return <CheckCircle className="w-4 h-4" />
      case "rejected":
        return <XCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const handleApprove = (returnId: string) => {
    updateReturnStatus(returnId, "approved")
  }

  const handleReject = (returnId: string) => {
    updateReturnStatus(returnId, "rejected")
  }

  const handleRefund = (returnId: string) => {
    updateReturnStatus(returnId, "refunded")
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const totalRefunded = returns
    .filter((r) => r.status === "refunded")
    .reduce((acc, r) => acc + r.amount, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Returns & Refunds</h1>
        <p className="text-muted-foreground">Manage product returns and refund requests</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Returns", value: returns.length, color: "bg-blue-500", icon: RotateCcw },
          { label: "Pending", value: returns.filter((r) => r.status === "pending").length, color: "bg-yellow-500", icon: Clock },
          { label: "Approved", value: returns.filter((r) => r.status === "approved").length, color: "bg-green-500", icon: CheckCircle },
          { label: "Total Refunded", value: `$${totalRefunded.toFixed(2)}`, color: "bg-purple-500", icon: DollarSign },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Returns Table */}
      <Card>
        <CardHeader>
          <CardTitle>Return Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {returns.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">No return requests</p>
              <p className="text-sm text-muted-foreground mt-1">Return requests will appear here when customers submit them</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Return ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Product</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Reason</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {returns.map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground">{item.id}</td>
                      <td className="py-4 px-4 text-muted-foreground">{item.orderId}</td>
                      <td className="py-4 px-4">
                        <div>
                          <p className="text-foreground">{item.customerName}</p>
                          <p className="text-xs text-muted-foreground">{item.customerEmail}</p>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-foreground">{item.product}</td>
                      <td className="py-4 px-4 text-muted-foreground max-w-[150px] truncate">{item.reason}</td>
                      <td className="py-4 px-4 font-semibold text-foreground">${item.amount.toFixed(2)}</td>
                      <td className="py-4 px-4 text-muted-foreground">{formatDate(item.createdAt)}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusClass(
                            item.status
                          )}`}
                        >
                          {getStatusIcon(item.status)}
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        {item.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 hover:text-green-700 hover:bg-green-50"
                              onClick={() => handleApprove(item.id)}
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              onClick={() => handleReject(item.id)}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                        {item.status === "approved" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                            onClick={() => handleRefund(item.id)}
                          >
                            Process Refund
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
