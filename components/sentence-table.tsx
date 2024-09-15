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
import { useMediaQuery } from 'react-responsive'
import EditPersonDialog from '@/components/dialogs/edit-person-dialog'
import EditSentenceDialog from '@/components/dialogs/edit-sentence-dialog'
import DeleteSentenceDialog from '@/components/dialogs/delete-sentence-dialog'
import DeletePersonDialog from '@/components/dialogs/delete-person-dialog'

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
  const isSmallScreen = useMediaQuery({ maxWidth: 640 }) // sm breakpoint

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    )
  }

  return (
    <Table>
      <TableCaption>A list of your human collection.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden sm:table-cell">No.</TableHead>
          <TableHead className="sm:text-left text-center">Name</TableHead>
          <TableHead className="hidden text-center sm:table-cell">Sentence Count</TableHead>
          <TableHead className="sm:text-right text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {people.map((person, index) => (
          <>
            <TableRow key={person.id}>
              <TableCell className="hidden sm:table-cell">{index + 1}</TableCell>
              <TableCell className="text-center sm:text-left">{person.name}</TableCell>
              <TableCell className="hidden text-center sm:table-cell">
                {person.sentences.length}
              </TableCell>
              <TableCell className="flex w-full flex-col justify-end gap-2 sm:flex-row">
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
                <DeletePersonDialog personId={person.id} />
              </TableCell>
            </TableRow>
            {expandedRows.includes(person.id) && (
              <TableRow key={`${person.id}-expanded`}>
                <TableCell colSpan={4} className="bg-muted/40 p-4">
                  <div className="space-y-4">
                    {person.sentences.map((sentence) => (
                      <div
                        key={sentence.id}
                        className="flex flex-col sm:grid grid-cols-[1fr,auto] gap-4 border-b border-muted-foreground/20 pb-4 last:border-b-0 last:pb-0"
                      >
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs">Sentence</p>
                            <p className="font-semibold text-md">{sentence.sentence}</p>
                          </div>
                          <div>
                            <p className="text-xs">Sentence count</p>
                            <p className="font-semibold text-md">{sentence.sentenceCount}</p>
                          </div>
                          <div>
                            <p className="text-xs">Elapsed time</p>
                            <p className="font-semibold text-md">{sentence.elapsedTime}</p>
                          </div>
                          <div>
                            <p className="text-xs">Sentences per minute</p>
                            <p className="font-semibold text-md">{sentence.sentencesPerMinute?.toFixed(2)}</p>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center gap-2">
                          <EditSentenceDialog
                            key={sentence.id}
                            sentenceId={sentence.id}
                            prevSentence={sentence.sentence}
                          />
                          <DeleteSentenceDialog key={sentence.id} sentenceId={sentence.id} />
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
          <TableCell colSpan={isSmallScreen ? 1 : 2}>
            <Button variant="outline" disabled>
              Previous
            </Button>
          </TableCell>
          <TableCell colSpan={isSmallScreen ? 1 : 2} className="text-right">
            <Button variant="outline" disabled>
              Next
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
