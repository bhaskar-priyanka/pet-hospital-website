"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { useOrders } from "@/lib/orders-context"
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Smartphone,
  Building,
  CheckCircle,
  MapPin,
  Package,
  Shield,
  Truck,
  Clock,
} from "lucide-react"

type PaymentMethod = "cod" | "credit_card" | "debit_card" | "upi" | "net_banking"

const paymentMethods = [
  { id: "cod", name: "Cash on Delivery", icon: Banknote, description: "Pay when you receive your order" },
  { id: "credit_card", name: "Credit Card", icon: CreditCard, description: "Visa, Mastercard, Amex" },
  { id: "debit_card", name: "Debit Card", icon: CreditCard, description: "All major debit cards" },
  { id: "upi", name: "UPI", icon: Smartphone, description: "Google Pay, PhonePe, Paytm" },
  { id: "net_banking", name: "Net Banking", icon: Building, description: "All major banks supported" },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const { addOrder } = useOrders()
  
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")
  useEffect(() => {
  if (!user) {
    router.push("/login")
  }
}, [user, router])
  
  const [shippingAddress, setShippingAddress] = useState({
    fullName: user?.name || "",
    address: user?.address || "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
  })
  
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })
  const [upiId, setUpiId] = useState("")

  const shipping = totalPrice > 50 ? 0 : 5.99
  const total = totalPrice + shipping

  if (!user) {
  return null
}

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some items to checkout</p>
            <Link href="/shop">
              <Button className="rounded-full">Browse Products</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep(2)
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const order = addOrder({
      userId: user.id,
      customerName: user.name,
      customerEmail: user.email,
      customerPhone: user.phone,
      items: items,
      subtotal: totalPrice,
      shipping: shipping,
      discount: 0,
      total: total,
      shippingAddress: shippingAddress,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === "cod" ? "pending" : "completed",
      orderStatus: "pending",
    })

    setOrderId(order.id)
    setOrderPlaced(true)
    setIsProcessing(false)
    clearCart()
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <div className="min-h-[80vh] flex items-center justify-center py-12">
          <div className="max-w-md w-full mx-4">
            <Card className="text-center">
              <CardContent className="pt-8 pb-8">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center animate-in zoom-in duration-500">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h2>
                <p className="text-muted-foreground mb-4">
                  Thank you for your purchase. Your order has been received.
                </p>
                <div className="bg-muted/50 rounded-xl p-4 mb-6">
                  <p className="text-sm text-muted-foreground mb-1">Order ID</p>
                  <p className="text-xl font-bold text-primary">{orderId}</p>
                </div>
                <div className="space-y-3 text-sm text-left mb-6">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Clock className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Order Confirmation</p>
                      <p className="text-muted-foreground">Email sent to {user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Truck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Estimated Delivery</p>
                      <p className="text-muted-foreground">3-5 business days</p>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <Banknote className="w-5 h-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Cash on Delivery</p>
                        <p className="text-yellow-700 text-xs">Please keep ${total.toFixed(2)} ready</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  <Link href="/dashboard/orders" className="flex-1">
                    <Button variant="outline" className="w-full rounded-full">View Orders</Button>
                  </Link>
                  <Link href="/shop" className="flex-1">
                    <Button className="w-full rounded-full">Continue Shopping</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Link href="/shop/cart">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
              <p className="text-muted-foreground">Complete your order</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-10">
            {[
              { num: 1, label: "Shipping" },
              { num: 2, label: "Payment" },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= s.num
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={step >= s.num ? "font-medium" : "text-muted-foreground"}>
                    {s.label}
                  </span>
                </div>
                {idx < 1 && (
                  <div className={`w-16 h-1 rounded-full ${step > 1 ? "bg-primary" : "bg-muted"}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-primary" />
                      Shipping Address
                    </CardTitle>
                    <CardDescription>Enter your delivery address</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleAddressSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={shippingAddress.fullName}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, fullName: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={shippingAddress.country}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, country: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Street Address</Label>
                        <Input
                          id="address"
                          placeholder="123 Main Street, Apt 4B"
                          value={shippingAddress.address}
                          onChange={(e) =>
                            setShippingAddress({ ...shippingAddress, address: e.target.value })
                          }
                          required
                        />
                      </div>
                      <div className="grid sm:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={shippingAddress.city}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, city: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={shippingAddress.state}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, state: e.target.value })
                            }
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={shippingAddress.zipCode}
                            onChange={(e) =>
                              setShippingAddress({ ...shippingAddress, zipCode: e.target.value })
                            }
                            required
                          />
                        </div>
                      </div>
                      <Button type="submit" className="w-full rounded-full h-12 mt-6">
                        Continue to Payment
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}

              {step === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-primary" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>Choose how you want to pay</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePaymentSubmit} className="space-y-6">
                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={(val) => setPaymentMethod(val as PaymentMethod)}
                        className="space-y-3"
                      >
                        {paymentMethods.map((method) => (
                          <div key={method.id}>
                            <Label
                              htmlFor={method.id}
                              className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                                paymentMethod === method.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <RadioGroupItem value={method.id} id={method.id} />
                              <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                                <method.icon className="w-5 h-5 text-foreground" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{method.name}</p>
                                <p className="text-sm text-muted-foreground">{method.description}</p>
                              </div>
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>

                      {/* Card Details Form */}
                      {(paymentMethod === "credit_card" || paymentMethod === "debit_card") && (
                        <div className="space-y-4 pt-4 border-t">
                          <h4 className="font-medium">Card Details</h4>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.cardNumber}
                              onChange={(e) =>
                                setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              value={cardDetails.cardName}
                              onChange={(e) =>
                                setCardDetails({ ...cardDetails, cardName: e.target.value })
                              }
                              required
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input
                                id="expiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, expiry: e.target.value })
                                }
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                type="password"
                                value={cardDetails.cvv}
                                onChange={(e) =>
                                  setCardDetails({ ...cardDetails, cvv: e.target.value })
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* UPI Form */}
                      {paymentMethod === "upi" && (
                        <div className="space-y-4 pt-4 border-t">
                          <h4 className="font-medium">UPI Details</h4>
                          <div className="space-y-2">
                            <Label htmlFor="upiId">UPI ID</Label>
                            <Input
                              id="upiId"
                              placeholder="yourname@upi"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      )}

                      {/* Net Banking Info */}
                      {paymentMethod === "net_banking" && (
                        <div className="pt-4 border-t">
                          <p className="text-sm text-muted-foreground">
                            You will be redirected to your bank's secure payment page after clicking "Place Order".
                          </p>
                        </div>
                      )}

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1 rounded-full h-12"
                          onClick={() => setStep(1)}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 rounded-full h-12"
                          disabled={isProcessing}
                        >
                          {isProcessing ? (
                            <span className="flex items-center gap-2">
                              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                              Processing...
                            </span>
                          ) : (
                            `Place Order - $${total.toFixed(2)}`
                          )}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-2xl shrink-0">
                        {item.image}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-semibold text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span className="text-primary">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Trust Badges */}
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Truck className="w-4 h-4 text-green-500" />
                      <span>Free shipping over $50</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Address Preview */}
              {step === 2 && (
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      Shipping To
                      <Button variant="ghost" size="sm" onClick={() => setStep(1)}>
                        Edit
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    <p className="font-medium text-foreground">{shippingAddress.fullName}</p>
                    <p>{shippingAddress.address}</p>
                    <p>
                      {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                    </p>
                    <p>{shippingAddress.country}</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
