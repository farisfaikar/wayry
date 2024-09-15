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
import { deleteSentence } from '@/server/actions/dashboard-actions'

export default function DeleteSentenceDialog({ sentenceId }: { sentenceId: number }) {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Call the server action to create a person
      const response = await deleteSentence(sentenceId)

      if (response.success) {
        toast({
          title: 'Yay Yay Yay',
          description: 'Successfully mutilated their tongue!',
        })
        setOpen(false)
      }
    } catch (err) {
      console.log(err)
      toast({
        variant: 'destructive',
        title: 'Nay Nay Nay',
        description: 'Failed to mutilate their tongue',
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
          <DialogTitle>Would you like this person&apos;s tongue gone?</DialogTitle>
          <DialogDescription>
          This person has said sentences that are blasphemous to you my lord. 
          Shall you have their tongue?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Perchance not
          </Button>
          <Button variant="destructive" onClick={handleSubmit} disabled={loading}>
            {loading ? 'Mutilating...' : 'I shall cook it'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
