"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tag, Copy, CheckCircle, Clock, Gift } from "lucide-react"

const coupons = [
  { code: "PAWCARE10", discount: "10% OFF", description: "Get 10% off on any service", expires: "Dec 31, 2024", minOrder: "$30", status: "active" },
  { code: "NEWPET20", discount: "20% OFF", description: "Welcome offer for new users", expires: "Mar 31, 2024", minOrder: "$50", status: "active" },
  { code: "SAVE15", discount: "15% OFF", description: "Save on pet products", expires: "Jun 30, 2024", minOrder: "$40", status: "active" },
  { code: "GROOM25", discount: "$25 OFF", description: "Grooming service discount", expires: "Feb 28, 2024", minOrder: "$75", status: "expired" },
  { code: "FREESHIP", discount: "Free Shipping", description: "Free delivery on orders", expires: "Apr 30, 2024", minOrder: "$25", status: "active" },
]

export default function CouponsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const activeCoupons = coupons.filter(c => c.status === "active")
  const expiredCoupons = coupons.filter(c => c.status === "expired")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">My Coupons</h1>
        <p className="text-muted-foreground">Use these codes to save on your next purchase</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{activeCoupons.length}</p>
              <p className="text-sm text-muted-foreground">Active Coupons</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gray-400 flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{expiredCoupons.length}</p>
              <p className="text-sm text-muted-foreground">Expired</p>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-2 lg:col-span-1">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">$50+</p>
              <p className="text-sm text-muted-foreground">Total Savings</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Coupons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-primary" />
            Active Coupons
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeCoupons.map((coupon) => (
            <div
              key={coupon.code}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-dashed border-primary/30 bg-primary/5 gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center shrink-0">
                  <Tag className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-primary">{coupon.discount}</span>
                    <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">Active</span>
                  </div>
                  <p className="text-foreground font-medium">{coupon.description}</p>
                  <p className="text-sm text-muted-foreground">Min. order: {coupon.minOrder} | Expires: {coupon.expires}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <code className="px-4 py-2 bg-card rounded-lg border border-border font-mono text-foreground">
                  {coupon.code}
                </code>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyCode(coupon.code)}
                  className="gap-1"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Expired Coupons */}
      {expiredCoupons.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5" />
              Expired Coupons
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {expiredCoupons.map((coupon) => (
              <div
                key={coupon.code}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-muted/30 opacity-60 gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <Tag className="w-7 h-7 text-muted-foreground" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-muted-foreground">{coupon.discount}</span>
                      <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs font-medium">Expired</span>
                    </div>
                    <p className="text-muted-foreground font-medium">{coupon.description}</p>
                    <p className="text-sm text-muted-foreground">Expired: {coupon.expires}</p>
                  </div>
                </div>
                <code className="px-4 py-2 bg-card rounded-lg border border-border font-mono text-muted-foreground line-through">
                  {coupon.code}
                </code>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
