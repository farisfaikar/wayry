'use client'

import { useState, useEffect } from 'react'
import { Check, ChevronsUpDown, Loader, AlertCircle } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import getPeople from '@/server/actions/get-people'
import { CreatePersonDialog } from "@/components/create-person-dialog"

type PeopleDropdownInputProps = {
  value: string
  onChange: (value: string) => void
}

export default function PeopleDropdownInput({ value, onChange }: PeopleDropdownInputProps) {
  const [open, setOpen] = useState(false)
  const [people, setPeople] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchPeople = async () => {
    try {
      const response = await getPeople()
      if (response.success) {
        setPeople(response.success)
      } else if (response.error) {
        setError(response.error)
      }
    } catch (err) {
      setError('Failed fetching people')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchPeople()
  }, [])

  if (loading) {
    return (
      <Button
        variant="outline"
        role="button"
        className="w-full justify-center gap-2"
        disabled
      >
        <Loader className="animate-spin" /> Loading...
      </Button>
    )
  }

  if (error) {
    return (
      <Button
        variant="destructive"
        role="button"
        className="w-full justify-center gap-2"
        disabled
      >
        <AlertCircle /> Error fetching people
      </Button>
    )
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? value : 'Select person...'}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="sm:w-[634px] w-[280px] p-0">
        <Command>
          <CommandInput placeholder="Search person..." />
          <CommandList>
            <CommandEmpty className="flex flex-col items-center">
              <div className="flex w-full items-center justify-center p-2 py-4 text-sm">No person found.</div>
            </CommandEmpty>
            <CommandGroup>
              {people.map((person) => (
                <CommandItem
                  key={person.id}
                  value={person.id.toString()}
                  onSelect={() => {
                    onChange(person.name)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      value === person.name ? 'opacity-100' : 'opacity-0',
                    )}
                  />
                  {person.name}
                </CommandItem>
              ))}
              <div className="w-full p-2">
                <CreatePersonDialog onPersonAdded={fetchPeople} />
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
