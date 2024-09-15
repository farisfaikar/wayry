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
import { ChevronDown, ChevronUp, Pencil, Trash2 } from 'lucide-react'
import { useState } from 'react'

const people = [
  {
    id: 1,
    name: 'Ressie',
    sentenceCount: 98,
    sentences: [
      {
        id: 36,
        sentence: 'hic qui facere',
        sentenceCount: 37,
        elapsedTime: 29,
        sentencesPerMinute: 84.52,
      },
      {
        id: 91,
        sentence: 'dolor commodi voluptatem',
        sentenceCount: 69,
        elapsedTime: 10,
        sentencesPerMinute: 71.73,
      },
    ],
  },
  {
    id: 2,
    name: 'Janice',
    sentenceCount: 50,
    sentences: [
      {
        id: 85,
        sentence: 'aspernatur qui dolores',
        sentenceCount: 58,
        elapsedTime: 87,
        sentencesPerMinute: 413.93,
      },
      {
        id: 81,
        sentence: 'cupiditate harum sunt',
        sentenceCount: 35,
        elapsedTime: 72,
        sentencesPerMinute: 36.79,
      },
    ],
  },
  {
    id: 3,
    name: 'Gonzalo',
    sentenceCount: 73,
    sentences: [
      {
        id: 78,
        sentence: 'eos et sunt',
        sentenceCount: 24,
        elapsedTime: 9,
        sentencesPerMinute: 962.36,
      },
      {
        id: 18,
        sentence: 'aut tenetur eos',
        sentenceCount: 65,
        elapsedTime: 8,
        sentencesPerMinute: 751.53,
      },
    ],
  },
  {
    id: 4,
    name: 'Kurtis',
    sentenceCount: 5,
    sentences: [
      {
        id: 1,
        sentence: 'eos sunt magni',
        sentenceCount: 52,
        elapsedTime: 42,
        sentencesPerMinute: 348.3,
      },
      {
        id: 23,
        sentence: 'voluptate et sit',
        sentenceCount: 43,
        elapsedTime: 46,
        sentencesPerMinute: 447.19,
      },
    ],
  },
  {
    id: 5,
    name: 'Winifred',
    sentenceCount: 40,
    sentences: [
      {
        id: 12,
        sentence: 'adipisci praesentium consequatur',
        sentenceCount: 8,
        elapsedTime: 706,
        sentencesPerMinute: 403.75,
      },
      {
        id: 63,
        sentence: 'hic officiis aut',
        sentenceCount: 50,
        elapsedTime: 52,
        sentencesPerMinute: 11.72,
      },
    ],
  },
  {
    id: 6,
    name: 'Leonie',
    sentenceCount: 26,
    sentences: [
      {
        id: 55,
        sentence: 'cumque vel quo',
        sentenceCount: 62,
        elapsedTime: 99,
        sentencesPerMinute: 60.08,
      },
      {
        id: 8,
        sentence: 'debitis itaque magni',
        sentenceCount: 48,
        elapsedTime: 10,
        sentencesPerMinute: 36.76,
      },
    ],
  },
  {
    id: 7,
    name: 'Margarita',
    sentenceCount: 87,
    sentences: [
      {
        id: 85,
        sentence: 'minus ullam qui',
        sentenceCount: 39,
        elapsedTime: 86,
        sentencesPerMinute: 303.61,
      },
      {
        id: 12,
        sentence: 'consequatur voluptate delectus',
        sentenceCount: 34,
        elapsedTime: 19,
        sentencesPerMinute: 117.89,
      },
    ],
  },
]

export default function SentenceTable() {
  const [expandedRows, setExpandedRows] = useState<number[]>([])

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    )
  }

  const handleEditSentence = (personId: number, sentenceId: number) => {
    console.log(`Edit sentence ${sentenceId} for person ${personId}`)
    // Implement edit functionality here
  }

  const handleDeleteSentence = (personId: number, sentenceId: number) => {
    console.log(`Delete sentence ${sentenceId} for person ${personId}`)
    // Implement delete functionality here
  }

  return (
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
              <TableCell className="text-center">{person.sentenceCount}</TableCell>
              <TableCell className="flex justify-end gap-2">
                <Button variant="outline" className="p-1 px-2" onClick={() => toggleRow(person.id)}>
                  {expandedRows.includes(person.id) ? (
                    <ChevronUp size={18} />
                  ) : (
                    <ChevronDown size={18} />
                  )}
                </Button>
                <Button variant="outline">Rename</Button>
                <Button variant="destructive">Delete</Button>
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
                            <p>{sentence.sentencesPerMinute.toFixed(2)}</p>
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
            <Button variant="outline">
              Previous
            </Button>
          </TableCell>
          <TableCell colSpan={2} className="text-right">
            <Button variant="outline">
              Next
            </Button>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}