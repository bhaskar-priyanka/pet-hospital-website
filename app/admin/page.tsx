"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ShoppingBag,
  Users,
  DollarSign,
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
} from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"

const stats = [
  { label: "Total Orders", value: "1,234", change: "+12%", trend: "up", icon: ShoppingBag, color: "bg-blue-500" },
  { label: "Total Customers", value: "856", change: "+8%", trend: "up", icon: Users, color: "bg-green-500" },
  { label: "Revenue", value: "$45,670", change: "+15%", trend: "up", icon: DollarSign, color: "bg-purple-500" },
  { label: "Appointments", value: "342", change: "-3%", trend: "down", icon: Calendar, color: "bg-orange-500" },
]

const ordersData = [
  { month: "Jan", orders: 65 },
  { month: "Feb", orders: 78 },
  { month: "Mar", orders: 90 },
  { month: "Apr", orders: 81 },
  { month: "May", orders: 95 },
  { month: "Jun", orders: 110 },
  { month: "Jul", orders: 125 },
  { month: "Aug", orders: 140 },
  { month: "Sep", orders: 135 },
  { month: "Oct", orders: 155 },
  { month: "Nov", orders: 170 },
  { month: "Dec", orders: 185 },
]

const revenueData = [
  { month: "Jan", revenue: 4200, profit: 1200, expenses: 3000 },
  { month: "Feb", revenue: 4800, profit: 1500, expenses: 3300 },
  { month: "Mar", revenue: 5500, profit: 1800, expenses: 3700 },
  { month: "Apr", revenue: 5100, profit: 1600, expenses: 3500 },
  { month: "May", revenue: 6000, profit: 2000, expenses: 4000 },
  { month: "Jun", revenue: 6800, profit: 2400, expenses: 4400 },
]

const appointmentsData = [
  { day: "Mon", appointments: 45 },
  { day: "Tue", appointments: 52 },
  { day: "Wed", appointments: 38 },
  { day: "Thu", appointments: 65 },
  { day: "Fri", appointments: 72 },
  { day: "Sat", appointments: 58 },
  { day: "Sun", appointments: 32 },
]

const serviceDistribution = [
  { name: "Grooming", value: 35, color: "#0088FE" },
  { name: "Vaccination", value: 25, color: "#00C49F" },
  { name: "Checkup", value: 20, color: "#FFBB28" },
  { name: "Emergency", value: 12, color: "#FF8042" },
  { name: "Other", value: 8, color: "#8884d8" },
]

const recentOrders = [
  { id: "ORD001", customer: "John Doe", service: "Pet Grooming", amount: "$45", status: "Completed" },
  { id: "ORD002", customer: "Sarah Smith", service: "Vaccination", amount: "$75", status: "Pending" },
  { id: "ORD003", customer: "Mike Wilson", service: "General Checkup", amount: "$55", status: "Completed" },
  { id: "ORD004", customer: "Emily Brown", service: "Emergency Care", amount: "$150", status: "In Progress" },
  { id: "ORD005", customer: "Alex Johnson", service: "Pet Bathing", amount: "$30", status: "Completed" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening at PawCare.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                  <div className={`flex items-center gap-1 mt-1 text-sm ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.trend === "up" ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    <span>{stat.change} from last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Orders Growth */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Orders Growth</span>
              <span className="text-sm text-green-600 flex items-center gap-1 font-normal">
                <ArrowUpRight className="w-4 h-4" />
                +12.5%
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ordersData}>
                  <defs>
                    <linearGradient id="orderGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="orders"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#orderGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="expenses" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Service Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Service Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {serviceDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {serviceDistribution.map((item) => (
                <div key={item.name} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Weekly Appointments */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={appointmentsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="appointments"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Customer</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Service</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">{order.id}</td>
                    <td className="py-3 px-4 text-foreground">{order.customer}</td>
                    <td className="py-3 px-4 text-muted-foreground">{order.service}</td>
                    <td className="py-3 px-4 font-semibold text-foreground">{order.amount}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
