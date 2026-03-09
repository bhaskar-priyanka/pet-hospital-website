"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageSquare, Star, ThumbsUp, ThumbsDown, Clock } from "lucide-react"

const feedback = [
  { id: "1", customer: "John Doe", service: "Pet Grooming", rating: 5, comment: "Excellent service! Max came out looking amazing. The staff was so gentle with him.", date: "Mar 5, 2024", status: "read" },
  { id: "2", customer: "Sarah Smith", service: "Vaccination", rating: 4, comment: "Very professional. Quick and efficient. Would recommend.", date: "Mar 4, 2024", status: "unread" },
  { id: "3", customer: "Mike Wilson", service: "General Checkup", rating: 5, comment: "Dr. Smith was incredibly thorough. Great experience overall!", date: "Mar 3, 2024", status: "read" },
  { id: "4", customer: "Emily Brown", service: "Emergency Care", rating: 5, comment: "Saved my bird's life! The emergency team was amazing. Forever grateful.", date: "Mar 2, 2024", status: "read" },
  { id: "5", customer: "Alex Johnson", service: "Pet Bathing", rating: 3, comment: "Service was okay but had to wait longer than expected.", date: "Mar 1, 2024", status: "unread" },
  { id: "6", customer: "Lisa Chen", service: "Grooming", rating: 4, comment: "Good grooming but slightly pricey compared to competitors.", date: "Feb 28, 2024", status: "read" },
]

export default function AdminFeedbackPage() {
  const avgRating = (feedback.reduce((acc, f) => acc + f.rating, 0) / feedback.length).toFixed(1)
  const positiveCount = feedback.filter(f => f.rating >= 4).length
  const negativeCount = feedback.filter(f => f.rating < 4).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Customer Feedback</h1>
        <p className="text-muted-foreground">View and respond to customer reviews</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Reviews", value: feedback.length, icon: MessageSquare, color: "bg-blue-500" },
          { label: "Average Rating", value: avgRating, icon: Star, color: "bg-yellow-500" },
          { label: "Positive", value: positiveCount, icon: ThumbsUp, color: "bg-green-500" },
          { label: "Needs Attention", value: negativeCount, icon: ThumbsDown, color: "bg-red-500" },
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

      {/* Feedback List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedback.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all ${
                item.status === "unread" ? "border-primary/30 bg-primary/5" : "border-border"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                    {item.customer.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{item.customer}</h3>
                      {item.status === "unread" && (
                        <span className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">New</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{item.service}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-foreground leading-relaxed">{item.comment}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground shrink-0">
                  <Clock className="w-4 h-4" />
                  {item.date}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
