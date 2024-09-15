"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CirclePlus } from "lucide-react"
import createPerson from "@/server/actions/create-person"
import { useToast } from "@/hooks/use-toast"

type PersonModalProps = {
  onPersonAdded: () => void
}

export function CreatePersonDialog({ onPersonAdded }: PersonModalProps) {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Call the server action to create a person
      const response = await createPerson({ name })

      if (response.success) {
        setName("")
        toast({
          title: "Yay Yay Yay",
          description: "Successfully kidnapped a person!",
        })
        setOpen(false)
        onPersonAdded()
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Nay Nay Nay",
        description: "Failed to kidnap person :(",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-full items-center gap-2">
          <CirclePlus /> Add Person
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kidnap person</DialogTitle>
          <DialogDescription>Add a person to your human collection.</DialogDescription>
        </DialogHeader>
        <div className="flex w-full items-center justify-between gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)} // Capture input value
            className="col-span-3"
          />
        </div>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Perchance not
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={loading || !name}>
            {loading ? "Kidnapping..." : "Kidnap person (I mean save)"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
