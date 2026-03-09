"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, Plus, Edit, Trash2, Calendar, Stethoscope, Syringe, X } from "lucide-react"

interface Pet {
  id: string
  name: string
  type: string
  breed: string
  age: string
  weight: string
  color: string
  lastVisit: string
  nextVaccination: string
}

const initialPets: Pet[] = [
  { id: "1", name: "Max", type: "Dog", breed: "Golden Retriever", age: "3 years", weight: "30 kg", color: "Golden", lastVisit: "Mar 5, 2024", nextVaccination: "Sep 5, 2024" },
  { id: "2", name: "Bella", type: "Cat", breed: "Persian", age: "2 years", weight: "4 kg", color: "White", lastVisit: "Mar 3, 2024", nextVaccination: "Mar 3, 2025" },
]

const petTypes = ["Dog", "Cat", "Bird", "Rabbit", "Hamster", "Fish", "Other"]

export default function PetsPage() {
  const [pets, setPets] = useState<Pet[]>(initialPets)
  const [showForm, setShowForm] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [formData, setFormData] = useState({ name: "", type: "", breed: "", age: "", weight: "", color: "" })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingPet) {
      setPets(pets.map(p => p.id === editingPet.id ? { ...editingPet, ...formData } : p))
    } else {
      const newPet: Pet = {
        id: Date.now().toString(),
        ...formData,
        lastVisit: "Not yet visited",
        nextVaccination: "Not scheduled",
      }
      setPets([...pets, newPet])
    }
    resetForm()
  }

  const resetForm = () => {
    setFormData({ name: "", type: "", breed: "", age: "", weight: "", color: "" })
    setShowForm(false)
    setEditingPet(null)
  }

  const startEdit = (pet: Pet) => {
    setEditingPet(pet)
    setFormData({ name: pet.name, type: pet.type, breed: pet.breed, age: pet.age, weight: pet.weight, color: pet.color })
    setShowForm(true)
  }

  const deletePet = (id: string) => {
    setPets(pets.filter(p => p.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Pet Details</h1>
          <p className="text-muted-foreground">Manage your pets' information</p>
        </div>
        <Button onClick={() => setShowForm(true)} className="gap-2 rounded-full">
          <Plus className="w-4 h-4" />
          Add Pet
        </Button>
      </div>

      {/* Add/Edit Pet Form */}
      {showForm && (
        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{editingPet ? "Edit Pet" : "Add New Pet"}</CardTitle>
            <Button variant="ghost" size="icon" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Pet Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter pet name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Pet Type</Label>
                <Select value={formData.type} onValueChange={(v) => setFormData({ ...formData, type: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {petTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  placeholder="Enter breed"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder="e.g., 2 years"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input
                  id="weight"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  placeholder="e.g., 10 kg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  placeholder="Enter color"
                />
              </div>
              <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit">{editingPet ? "Update Pet" : "Add Pet"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Pets Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {pets.map((pet) => (
          <Card key={pet.id} className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-accent/10 p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-card flex items-center justify-center text-3xl shadow-lg">
                    {pet.type === "Dog" ? "🐕" : pet.type === "Cat" ? "🐈" : pet.type === "Bird" ? "🐦" : "🐾"}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{pet.name}</h3>
                    <p className="text-muted-foreground">{pet.breed}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => startEdit(pet)}>
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deletePet(pet.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-xl">
                  <p className="text-lg font-bold text-foreground">{pet.age}</p>
                  <p className="text-xs text-muted-foreground">Age</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-xl">
                  <p className="text-lg font-bold text-foreground">{pet.weight}</p>
                  <p className="text-xs text-muted-foreground">Weight</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-xl">
                  <p className="text-lg font-bold text-foreground">{pet.color}</p>
                  <p className="text-xs text-muted-foreground">Color</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                  <Stethoscope className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Last Visit</p>
                    <p className="text-xs text-muted-foreground">{pet.lastVisit}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-xl">
                  <Syringe className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Next Vaccination</p>
                    <p className="text-xs text-muted-foreground">{pet.nextVaccination}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {pets.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No pets added yet</h3>
            <p className="text-muted-foreground mb-4">Add your first pet to get started</p>
            <Button onClick={() => setShowForm(true)} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Pet
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
