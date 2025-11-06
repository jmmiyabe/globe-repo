"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"

interface Contact {
  id: string
  name: string
  role: string
  department: string
  phone: string
  email: string
  availability: "available" | "busy" | "offline"
}

interface ContactDirectoryProps {
  title?: string
  contacts: Contact[]
  onContact?: (contact: Contact) => void
}

const availabilityColors = {
  available: "text-status-safe",
  busy: "text-status-warning",
  offline: "text-status-critical",
}

export function ContactDirectory({ title = "Contact Directory", contacts, onContact }: ContactDirectoryProps) {
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.role.toLowerCase().includes(search.toLowerCase()) ||
        c.department.toLowerCase().includes(search.toLowerCase()),
    )
  }, [search, contacts])

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Find and contact emergency personnel</CardDescription>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, role, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No contacts found</p>
          ) : (
            filtered.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm">{contact.name}</p>
                    <div className={`h-2 w-2 rounded-full ${availabilityColors[contact.availability]}`} />
                  </div>
                  <p className="text-xs text-muted-foreground">{contact.role}</p>
                  <p className="text-xs text-muted-foreground">{contact.department}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => onContact?.(contact)}>
                    Contact
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
