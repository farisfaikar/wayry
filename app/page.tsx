'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SentenceForm from '@/components/sentence-form'

type FormDataType = {
  sentence: string
  person: string | null
}

export default function HomePage() {
  const [formData, setFormData] = useState<FormDataType>({ sentence: '', person: '' })
  const router = useRouter()

  const handleFormSubmit = (data: FormDataType) => {
    setFormData(data)
    router.push(
      `/count?sentence=${encodeURIComponent(data.sentence)}&person=${encodeURIComponent(data.person || '')}`,
    )
  }

  return (
    <>
      <h1 className="flex justify-center p-5 text-center text-4xl font-extrabold">
        Why Are You Repeating Yourself?
      </h1>
      <SentenceForm onSubmit={handleFormSubmit} />
    </>
  )
}
