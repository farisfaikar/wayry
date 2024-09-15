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
import { useToast } from "@/hooks/use-toast"
import { editPerson } from "@/server/actions/dashboard-actions"

export default function EditPersonDialog({
  personId,
  personPrevName,
}: {
  personId: number
  personPrevName: string
}) {
  const [name, setName] = useState(personPrevName)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Call the server action to create a person
      const response = await editPerson(personId, name)

      if (response.success) {
        setName("")
        toast({
          title: "Yay Yay Yay",
          description: "Successfully renamed the person!",
        })
        setOpen(false)
      }
    } catch (err) {
      console.log(err)
      toast({
        variant: "destructive",
        title: "Nay Nay Nay",
        description: "Failed to rename person :(",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-auto items-center gap-2">
          Rename
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename this poor fellow?</DialogTitle>
          <DialogDescription>
            You are, to assign this person another name. This person has lived all their life
            bearing this name, and you — god-wannabe — have the impudence to what-have-you rename
            this peasant. Why would you do such a thing? Why?
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between gap-4">
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
          <Button variant="default" onClick={handleSubmit} disabled={loading || !name}>
            {loading ? "Renaming..." : "You are what I command"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
