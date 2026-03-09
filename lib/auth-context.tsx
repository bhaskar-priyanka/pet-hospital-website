"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
  id: string
  name: string
  email: string
  phone: string
  address?: string
  isAdmin?: boolean
}

interface StoredUser extends User {
  password: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, isAdmin?: boolean) => boolean
  signup: (data: Omit<User, "id"> & { password: string }) => boolean
  logout: () => void
  updateUser: (data: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const USERS_STORAGE_KEY = "pawcare_users"
const CURRENT_USER_KEY = "pawcare_current_user"

function getStoredUsers(): StoredUser[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

function saveUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem(CURRENT_USER_KEY)
  return stored ? JSON.parse(stored) : null
}

function saveCurrentUser(user: User | null) {
  if (user) {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(CURRENT_USER_KEY)
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = getCurrentUser()
    if (storedUser) {
      setUser(storedUser)
    }
    setIsLoading(false)
  }, [])

  const login = (email: string, password: string, isAdmin?: boolean) => {
    const users = getStoredUsers()
    const foundUser = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() &&
        u.password === password &&
        (isAdmin ? u.isAdmin === true : u.isAdmin !== true)
    )
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      saveCurrentUser(userWithoutPassword)
      return true
    }
    return false
  }

  const signup = (data: Omit<User, "id"> & { password: string }) => {
    const users = getStoredUsers()
    const exists = users.find((u) => u.email.toLowerCase() === data.email.toLowerCase())
    if (exists) return false
    
    const newUser: StoredUser = { 
      ...data, 
      id: Date.now().toString(),
      isAdmin: data.isAdmin || false
    }
    saveUsers([...users, newUser])
    
    const { password: _, ...userWithoutPassword } = newUser
    setUser(userWithoutPassword)
    saveCurrentUser(userWithoutPassword)
    return true
  }

  const logout = () => {
    setUser(null)
    saveCurrentUser(null)
  }

  const updateUser = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      saveCurrentUser(updatedUser)
      
      // Also update in stored users
      const users = getStoredUsers()
      const idx = users.findIndex((u) => u.id === user.id)
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...data }
        saveUsers(users)
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
