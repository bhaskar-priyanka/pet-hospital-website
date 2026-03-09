"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import {
  Menu,
  X,
  ShoppingCart,
  User,
  PawPrint,
  Home,
  Info,
  Stethoscope,
  Store,
  Phone,
} from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { totalItems } = useCart()
  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/about", label: "About", icon: Info },
    { href: "/services", label: "Services", icon: Stethoscope },
    { href: "/shop", label: "Pet Shop", icon: Store },
    { href: "/contact", label: "Contact", icon: Phone },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-card/80 backdrop-blur-xl shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <PawPrint className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PawCare</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/shop/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold animate-in zoom-in duration-200">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            {user ? (
              <Link href={user.isAdmin ? "/admin" : "/dashboard"}>
                <Button className="rounded-full gap-2">
                  <User className="w-4 h-4" />
                  {user.name.split(" ")[0]}
                </Button>
              </Link>
            ) : (
              <Link href="/login">
                <Button className="rounded-full">Login</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Link href="/shop/cart" className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 pb-4" : "max-h-0"
          }`}
        >
          <div className="bg-card/95 backdrop-blur-xl rounded-2xl p-4 space-y-2 border border-border shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border">
              {user ? (
                <Link
                  href={user.isAdmin ? "/admin" : "/dashboard"}
                  onClick={() => setIsOpen(false)}
                >
                  <Button className="w-full rounded-xl gap-2">
                    <User className="w-4 h-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full rounded-xl">Login</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
