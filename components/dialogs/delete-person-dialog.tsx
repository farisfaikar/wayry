'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useToast } from '@/hooks/use-toast'
import { deletePerson } from '@/server/actions/dashboard-actions'

export default function DeletePersonDialog({ personId }: { personId: number }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Call the server action to create a person
      const response = await deletePerson(personId)

      if (response.success) {
        toast({
          title: 'Yay Yay Yay',
          description: 'Person successfully removed from this world',
        })
        setOpen(false)
      }
    } catch (err) {
      console.log(err)
      toast({
        variant: 'destructive',
        title: 'Nay Nay Nay',
        description: "Person escaped the grim reaper's scythe",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="flex w-auto items-center gap-2">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lynch this person?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. I repeat this action cannot be undone. You will permanently remove
            this person from this world, including all of their other-worldly connections. The souls, those who
            are attached to this person will haunt you for the rest of your life. Are you sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Perchance not
          </Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Lynching...' : 'They shall meet god'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
