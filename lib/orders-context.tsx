"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface OrderItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

export interface Order {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: OrderItem[]
  subtotal: number
  shipping: number
  discount: number
  total: number
  shippingAddress: {
    fullName: string
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  paymentMethod: "cod" | "credit_card" | "debit_card" | "upi" | "net_banking"
  paymentStatus: "pending" | "completed" | "failed"
  orderStatus: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled" | "rejected"
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  userId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  petName: string
  petType: string
  petBreed: string
  service: string
  date: string
  time: string
  notes: string
  status: "pending" | "confirmed" | "completed" | "cancelled" | "rejected"
  createdAt: string
}

export interface ReturnRequest {
  id: string
  orderId: string
  userId: string
  customerName: string
  customerEmail: string
  product: string
  reason: string
  amount: number
  status: "pending" | "approved" | "rejected" | "refunded"
  createdAt: string
}

interface OrdersContextType {
  orders: Order[]
  bookings: Booking[]
  returns: ReturnRequest[]
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => Order
  addBooking: (booking: Omit<Booking, "id" | "createdAt">) => Booking
  addReturn: (returnReq: Omit<ReturnRequest, "id" | "createdAt">) => ReturnRequest
  updateOrderStatus: (orderId: string, status: Order["orderStatus"]) => void
  updateBookingStatus: (bookingId: string, status: Booking["status"]) => void
  updateReturnStatus: (returnId: string, status: ReturnRequest["status"]) => void
  getUserOrders: (userId: string) => Order[]
  getUserBookings: (userId: string) => Booking[]
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

const ORDERS_STORAGE_KEY = "pawcare_orders"
const BOOKINGS_STORAGE_KEY = "pawcare_bookings"
const RETURNS_STORAGE_KEY = "pawcare_returns"

function getStoredData<T>(key: string): T[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(key)
  return stored ? JSON.parse(stored) : []
}

function saveData<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [returns, setReturns] = useState<ReturnRequest[]>([])

  useEffect(() => {
    setOrders(getStoredData<Order>(ORDERS_STORAGE_KEY))
    setBookings(getStoredData<Booking>(BOOKINGS_STORAGE_KEY))
    setReturns(getStoredData<ReturnRequest>(RETURNS_STORAGE_KEY))
  }, [])

  const addOrder = (orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const updated = [...orders, newOrder]
    setOrders(updated)
    saveData(ORDERS_STORAGE_KEY, updated)
    return newOrder
  }

  const addBooking = (bookingData: Omit<Booking, "id" | "createdAt">): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BKG${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    }
    const updated = [...bookings, newBooking]
    setBookings(updated)
    saveData(BOOKINGS_STORAGE_KEY, updated)
    return newBooking
  }

  const addReturn = (returnData: Omit<ReturnRequest, "id" | "createdAt">): ReturnRequest => {
    const newReturn: ReturnRequest = {
      ...returnData,
      id: `RET${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    }
    const updated = [...returns, newReturn]
    setReturns(updated)
    saveData(RETURNS_STORAGE_KEY, updated)
    return newReturn
  }

  const updateOrderStatus = (orderId: string, status: Order["orderStatus"]) => {
    const updated = orders.map((order) =>
      order.id === orderId
        ? { ...order, orderStatus: status, updatedAt: new Date().toISOString() }
        : order
    )
    setOrders(updated)
    saveData(ORDERS_STORAGE_KEY, updated)
  }

  const updateBookingStatus = (bookingId: string, status: Booking["status"]) => {
    const updated = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status } : booking
    )
    setBookings(updated)
    saveData(BOOKINGS_STORAGE_KEY, updated)
  }

  const updateReturnStatus = (returnId: string, status: ReturnRequest["status"]) => {
    const updated = returns.map((ret) =>
      ret.id === returnId ? { ...ret, status } : ret
    )
    setReturns(updated)
    saveData(RETURNS_STORAGE_KEY, updated)
  }

  const getUserOrders = (userId: string) => orders.filter((o) => o.userId === userId)
  const getUserBookings = (userId: string) => bookings.filter((b) => b.userId === userId)

  return (
    <OrdersContext.Provider
      value={{
        orders,
        bookings,
        returns,
        addOrder,
        addBooking,
        addReturn,
        updateOrderStatus,
        updateBookingStatus,
        updateReturnStatus,
        getUserOrders,
        getUserBookings,
      }}
    >
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
