"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart-context"
import {
  ShoppingCart,
  Star,
  Search,
  Filter,
  Grid3X3,
  List,
  Plus,
  Check,
  Heart,
} from "lucide-react"

const categories = [
  { id: "all", name: "All Products" },
  { id: "clothes", name: "Dog Clothes" },
  { id: "chains", name: "Dog Chains" },
  { id: "belts", name: "Pet Belts" },
  { id: "food", name: "Pet Food" },
  { id: "combs", name: "Combs" },
  { id: "toys", name: "Toys" },
  { id: "accessories", name: "Accessories" },
]

const products = [
  { id: "1", name: "Premium Dog Jacket", price: 45.99, rating: 4.8, reviews: 124, category: "clothes", image: "🧥", badge: "Best Seller" },
  { id: "2", name: "Cozy Winter Sweater", price: 32.99, rating: 4.6, reviews: 89, category: "clothes", image: "🧶" },
  { id: "3", name: "Summer Cool Vest", price: 24.99, rating: 4.5, reviews: 67, category: "clothes", image: "👕" },
  { id: "4", name: "Stainless Steel Chain", price: 28.99, rating: 4.7, reviews: 156, category: "chains", image: "⛓️", badge: "Popular" },
  { id: "5", name: "Leather Dog Leash", price: 35.99, rating: 4.9, reviews: 234, category: "chains", image: "🦮" },
  { id: "6", name: "Adjustable Collar Belt", price: 19.99, rating: 4.4, reviews: 98, category: "belts", image: "📿" },
  { id: "7", name: "Premium Pet Harness", price: 42.99, rating: 4.8, reviews: 187, category: "belts", image: "🎒", badge: "New" },
  { id: "8", name: "Organic Dog Food 5kg", price: 54.99, rating: 4.9, reviews: 312, category: "food", image: "🍖", badge: "Best Seller" },
  { id: "9", name: "Cat Premium Treats", price: 12.99, rating: 4.6, reviews: 145, category: "food", image: "🐟" },
  { id: "10", name: "Puppy Nutrition Pack", price: 38.99, rating: 4.7, reviews: 178, category: "food", image: "🦴" },
  { id: "11", name: "Professional Grooming Comb", price: 15.99, rating: 4.5, reviews: 89, category: "combs", image: "🪥" },
  { id: "12", name: "Deshedding Brush", price: 22.99, rating: 4.8, reviews: 234, category: "combs", image: "🖌️", badge: "Popular" },
  { id: "13", name: "Interactive Ball Toy", price: 18.99, rating: 4.6, reviews: 167, category: "toys", image: "⚽" },
  { id: "14", name: "Squeaky Plush Toy", price: 14.99, rating: 4.4, reviews: 123, category: "toys", image: "🧸" },
  { id: "15", name: "Puzzle Feeder Toy", price: 29.99, rating: 4.7, reviews: 198, category: "toys", image: "🎯", badge: "New" },
  { id: "16", name: "Pet ID Tag Set", price: 9.99, rating: 4.3, reviews: 87, category: "accessories", image: "🏷️" },
  { id: "17", name: "Travel Water Bottle", price: 16.99, rating: 4.5, reviews: 145, category: "accessories", image: "🍼" },
  { id: "18", name: "Cozy Pet Bed", price: 65.99, rating: 4.9, reviews: 267, category: "accessories", image: "🛏️", badge: "Best Seller" },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set())
  const { addToCart, totalItems } = useCart()

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAddedItems((prev) => new Set(prev).add(product.id))
    setTimeout(() => {
      setAddedItems((prev) => {
        const next = new Set(prev)
        next.delete(product.id)
        return next
      })
    }, 2000)
  }

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Pet Shop
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Everything Your Pet <span className="text-primary">Needs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Shop premium pet products from trusted brands. Quality items for dogs, cats, and more.
          </p>
        </div>
      </section>

      {/* Shop Section */}
      <section className="py-8 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters Bar */}
          <div className="bg-card rounded-2xl border border-border p-4 mb-8 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 rounded-full"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
                {categories.slice(0, 5).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* View Toggle & Cart */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-secondary rounded-full p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === "grid" ? "bg-card shadow-sm" : ""
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-full transition-colors ${
                      viewMode === "list" ? "bg-card shadow-sm" : ""
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <Link href="/shop/cart">
                  <Button className="rounded-full gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Cart ({totalItems})
                  </Button>
                </Link>
              </div>
            </div>

            {/* More Categories */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border overflow-x-auto">
              <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
              {categories.slice(5).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`group overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 ${
                  viewMode === "list" ? "flex-row" : ""
                }`}
              >
                <CardContent className={`p-0 ${viewMode === "list" ? "flex" : ""}`}>
                  {/* Image */}
                  <div className={`relative bg-gradient-to-br from-secondary to-muted ${
                    viewMode === "list" ? "w-48 shrink-0" : "aspect-square"
                  } flex items-center justify-center`}>
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </span>
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-2 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                        {product.badge}
                      </span>
                    )}
                    <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-card">
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className={`p-4 flex flex-col ${viewMode === "list" ? "flex-1 justify-center" : ""}`}>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-sm text-muted-foreground">({product.reviews})</span>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mt-auto pt-2">
                      <span className="text-xl font-bold text-primary">${product.price}</span>
                      <Button
                        size="sm"
                        className={`rounded-full gap-1 transition-all duration-300 ${
                          addedItems.has(product.id) ? "bg-green-500 hover:bg-green-600" : ""
                        }`}
                        onClick={() => handleAddToCart(product)}
                      >
                        {addedItems.has(product.id) ? (
                          <>
                            <Check className="w-4 h-4" />
                            Added
                          </>
                        ) : (
                          <>
                            <Plus className="w-4 h-4" />
                            Add
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
