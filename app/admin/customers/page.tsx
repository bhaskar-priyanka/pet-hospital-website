"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Eye, Mail, Phone, Calendar, PawPrint } from "lucide-react"

const customers = [
  { id: "1", name: "John Doe", email: "john@example.com", phone: "+1 555-1234", pets: 2, petTypes: ["Dog", "Cat"], joinDate: "Jan 15, 2024", appointments: 5, totalSpent: "$450" },
  { id: "2", name: "Sarah Smith", email: "sarah@example.com", phone: "+1 555-5678", pets: 1, petTypes: ["Cat"], joinDate: "Feb 20, 2024", appointments: 3, totalSpent: "$275" },
  { id: "3", name: "Mike Wilson", email: "mike@example.com", phone: "+1 555-9012", pets: 3, petTypes: ["Dog", "Dog", "Bird"], joinDate: "Dec 10, 2023", appointments: 8, totalSpent: "$890" },
  { id: "4", name: "Emily Brown", email: "emily@example.com", phone: "+1 555-3456", pets: 1, petTypes: ["Dog"], joinDate: "Mar 1, 2024", appointments: 2, totalSpent: "$150" },
  { id: "5", name: "Alex Johnson", email: "alex@example.com", phone: "+1 555-7890", pets: 2, petTypes: ["Cat", "Rabbit"], joinDate: "Jan 28, 2024", appointments: 4, totalSpent: "$320" },
  { id: "6", name: "Lisa Chen", email: "lisa@example.com", phone: "+1 555-2345", pets: 1, petTypes: ["Bird"], joinDate: "Feb 5, 2024", appointments: 2, totalSpent: "$95" },
]

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null)

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Customer Management</h1>
        <p className="text-muted-foreground">View and manage customer information</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length, color: "bg-blue-500" },
          { label: "Total Pets", value: customers.reduce((acc, c) => acc + c.pets, 0), color: "bg-green-500" },
          { label: "Active This Month", value: 4, color: "bg-purple-500" },
          { label: "Total Revenue", value: "$2,180", color: "bg-orange-500" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedCustomer?.id === customer.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedCustomer(customer)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          {customer.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{customer.name}</h3>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{customer.pets} pets</p>
                        <p className="text-xs text-muted-foreground">{customer.appointments} visits</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Details */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCustomer ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary mb-3">
                    {selectedCustomer.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{selectedCustomer.name}</h3>
                  <p className="text-muted-foreground">Customer since {selectedCustomer.joinDate}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Mail className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Phone className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <PawPrint className="w-5 h-5 text-primary" />
                    <div>
                      <span className="text-foreground">{selectedCustomer.pets} Pets</span>
                      <p className="text-xs text-muted-foreground">{selectedCustomer.petTypes.join(", ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="text-foreground">{selectedCustomer.appointments} Appointments</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-primary/10 text-center">
                  <p className="text-sm text-muted-foreground mb-1">Total Spent</p>
                  <p className="text-2xl font-bold text-primary">{selectedCustomer.totalSpent}</p>
                </div>

                <Button className="w-full gap-2">
                  <Eye className="w-4 h-4" />
                  View Full Profile
                </Button>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a customer to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
