"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function DashboardCartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to your cart</p>
          <Link href="/shop">
            <Button className="rounded-full gap-2">
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">My Cart</h1>
        <p className="text-muted-foreground">{items.length} items in your cart</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex gap-4">
                <div className="w-20 h-20 rounded-xl bg-muted flex items-center justify-center text-4xl shrink-0">
                  {item.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{item.name}</h3>
                  <p className="text-lg font-bold text-primary mb-2">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="h-fit">
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>{totalPrice > 50 ? "FREE" : "$5.99"}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                <span>Total</span>
                <span className="text-primary">${(totalPrice + (totalPrice > 50 ? 0 : 5.99)).toFixed(2)}</span>
              </div>
            </div>
            <Link href="/shop/cart">
              <Button className="w-full rounded-full gap-2">
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
