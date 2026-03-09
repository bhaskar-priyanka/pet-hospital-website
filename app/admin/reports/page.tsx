"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, TrendingUp, Calendar, DollarSign, Users } from "lucide-react"
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
  AreaChart,
  Area,
} from "recharts"

const monthlyData = [
  { month: "Jan", revenue: 12500, orders: 145, customers: 52 },
  { month: "Feb", revenue: 15800, orders: 178, customers: 68 },
  { month: "Mar", revenue: 18200, orders: 195, customers: 74 },
  { month: "Apr", revenue: 16900, orders: 182, customers: 65 },
  { month: "May", revenue: 21000, orders: 220, customers: 89 },
  { month: "Jun", revenue: 24500, orders: 258, customers: 102 },
]

const serviceData = [
  { service: "Grooming", revenue: 15600, orders: 234 },
  { service: "Vaccination", revenue: 12400, orders: 186 },
  { service: "Checkup", revenue: 9800, orders: 147 },
  { service: "Emergency", revenue: 8500, orders: 42 },
  { service: "Bathing", revenue: 7200, orders: 180 },
]

const reports = [
  { name: "Monthly Revenue Report", type: "Revenue", date: "Mar 1, 2024", size: "2.4 MB" },
  { name: "Customer Analytics Report", type: "Customers", date: "Mar 1, 2024", size: "1.8 MB" },
  { name: "Service Performance Report", type: "Services", date: "Feb 1, 2024", size: "3.1 MB" },
  { name: "Appointment Trends Report", type: "Appointments", date: "Feb 1, 2024", size: "1.5 MB" },
]

export default function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Reports & Analytics</h1>
          <p className="text-muted-foreground">Detailed insights and performance reports</p>
        </div>
        <Button className="gap-2">
          <Download className="w-4 h-4" />
          Export All
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$108,900", change: "+18%", icon: DollarSign, color: "bg-green-500" },
          { label: "Total Orders", value: "1,178", change: "+12%", icon: FileText, color: "bg-blue-500" },
          { label: "Total Customers", value: "450", change: "+15%", icon: Users, color: "bg-purple-500" },
          { label: "Avg. Order Value", value: "$92", change: "+5%", icon: TrendingUp, color: "bg-orange-500" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
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
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Service Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Service Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={serviceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis dataKey="service" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                  />
                  <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders & Customers Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Orders & Customers Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
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
                <Line type="monotone" dataKey="orders" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))" }} name="Orders" />
                <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} dot={{ fill: "#10b981" }} name="New Customers" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Downloadable Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Downloadable Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 gap-4">
            {reports.map((report) => (
              <div
                key={report.name}
                className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{report.name}</h4>
                    <p className="text-sm text-muted-foreground">{report.date} | {report.size}</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Download className="w-5 h-5" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
