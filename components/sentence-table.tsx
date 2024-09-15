'use client'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { deletePerson, editPerson } from "@/server/actions/dashboard-actions"
import DeletePersonDialog from '@/components/dialogs/delete-person-dialog'
import { useToast } from "@/hooks/use-toast"
import EditPersonDialog from "@/components/dialogs/edit-person-dialog"

type Sentence = {
  id: number
  personId: number
  sentence: string
  sentenceCount: number | null
  elapsedTime: number | null
  sentencesPerMinute: number | null
}

type Person = {
  id: number
  userId: string
  name: string
  sentences: Sentence[]
}

type SentenceTableProps = {
  people: Person[]
}

export default function SentenceTable({ people }: SentenceTableProps) {
  const [expandedRows, setExpandedRows] = useState<number[]>([])
  const [personToDelete, setPersonToDelete] = useState<Person | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { toast } = useToast()

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    )
  }

  const handleDeletePerson = async () => {
    if (personToDelete) {
      const { success, error } = await deletePerson(personToDelete.id)

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Fuck Fuck Fuck',
          description: error,
        })
      } 
      if (success) {
        toast({
          title: 'Person slained',
          description: 'Person successfully removed from this world',
        })
      }
      setIsDeleteDialogOpen(false)
      setPersonToDelete(null)
    }
  }  
  
  const handleEditSentence = (personId: number, sentenceId: number) => {
    console.log(`Delete sentence ${sentenceId} for person ${personId}`)
    // Implement delete functionality here
  }

  const handleDeleteSentence = (personId: number, sentenceId: number) => {
    console.log(`Delete sentence ${sentenceId} for person ${personId}`)
    // Implement delete functionality here
  }

  return (
    <>
      <Table>
        <TableCaption>A list of your human collection.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-center">Sentence Count</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {people.map((person, index) => (
            <>
              <TableRow key={person.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{person.name}</TableCell>
                <TableCell className="text-center">{person.sentences.length}</TableCell>
                <TableCell className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    className="p-1 px-2" 
                    onClick={() => toggleRow(person.id)}
                    disabled={person.sentences.length === 0}
                  >
                    {expandedRows.includes(person.id) ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </Button>
                  <EditPersonDialog personId={person.id} personPrevName={person.name} />
                  <Button 
                    variant="destructive"
                    onClick={() => {
                      setPersonToDelete(person)
                      setIsDeleteDialogOpen(true)
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
              {expandedRows.includes(person.id) && (
                <TableRow key={`${person.id}-expanded`}>
                  <TableCell colSpan={4} className="bg-muted/40 p-4">
                    <div className="space-y-4">
                      {person.sentences.map((sentence) => (
                        <div key={sentence.id} className="grid grid-cols-[1fr,auto] gap-4 border-b border-muted-foreground/20 pb-4 last:border-b-0 last:pb-0">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="font-semibold">Sentence</p>
                              <p>{sentence.sentence}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Sentence count</p>
                              <p>{sentence.sentenceCount}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Elapsed time</p>
                              <p>{sentence.elapsedTime}</p>
                            </div>
                            <div>
                              <p className="font-semibold">Sentences per minute</p>
                              <p>{sentence.sentencesPerMinute?.toFixed(2)}</p>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-20"
                              onClick={() => handleEditSentence(person.id, sentence.id)}
                            >
                              Edit
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="w-20"
                              onClick={() => handleDeleteSentence(person.id, sentence.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </>
          ))}
        </TableBody>
        <TableFooter className="bg-transparent hover:bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={2}>
              <Button variant="outline" disabled>
                Previous
              </Button>
            </TableCell>
            <TableCell colSpan={2} className="text-right">
              <Button variant="outline" disabled>
                Next
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      <DeletePersonDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDeletePerson}
        personName={personToDelete?.name || ''}
      />
    </>
  )
}