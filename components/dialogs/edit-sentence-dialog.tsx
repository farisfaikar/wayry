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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { editSentence } from '@/server/actions/dashboard-actions'

export default function EditSentenceDialog({ sentenceId, prevSentence }: { sentenceId: number, prevSentence: string }) {
  const [name, setName] = useState(prevSentence)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Call the server action to create a person
      const response = await editSentence(sentenceId, name)

      if (response.success) {
        setName('')
        toast({
          title: 'Yay Yay Yay',
          description: 'Successfully altered the sentence!',
        })
        setOpen(false)
      }
    } catch (err) {
      console.log(err)
      toast({
        title: 'Nay Nay Nay',
        description: 'Failed to stretch the tongue',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex w-auto items-center gap-2">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>What would you change this sentence to?</DialogTitle>
          <DialogDescription>
            You dare alter someone&apos;s speech. At this point, have at you, I have no care.
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
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Perchance not
          </Button>
          <Button variant="default" onClick={handleSubmit} disabled={loading || !name}>
            {loading ? 'Altering...' : 'I have your tongue'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
