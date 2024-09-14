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
import { CirclePlus } from 'lucide-react'
import createPerson from '@/server/actions/create-person'
import SuccessAlert from '@/components/success-alert'
import ErrorAlert from '@/components/error-alert'

export function PersonModal() {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)

    try {
      // Call the server action to create a person
      const response = await createPerson({ name })

      if (!response.success) {
        setError(response.error as string)
      } else {
        setName('')
        setSuccess('Successfully kidnapped a person!')
        setOpen(false)
      }
    } catch (err) {
      setError('An error occurred')
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
          <DialogTitle>Add Person</DialogTitle>
          <DialogDescription>Add a person to your human collection.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
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
        </div>
        <div className="w-full -mt-10">
          <SuccessAlert message={success} />
          <ErrorAlert message={error} />
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} disabled={loading || !name}>
            {loading ? 'Kidnapping...' : 'Kidnap person (I mean save)'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
