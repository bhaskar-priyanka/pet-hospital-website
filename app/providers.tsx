"use client"

import { ReactNode } from "react"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { OrdersProvider } from "@/lib/orders-context"

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <OrdersProvider>
        <CartProvider>
          {children}
        </CartProvider>
      </OrdersProvider>
    </AuthProvider>
  )
}
