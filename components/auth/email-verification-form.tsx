'use client'

import AuthCard from '@/components/auth/auth-card'
import { emailVerification } from '@/server/actions/tokens'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import SuccessForm from "@/components/auth/success-form"
import ErrorForm from "@/components/auth/error-form"

export const EmailVerificationForm = () => {
  const token = useSearchParams().get('token') || ''
  const router = useRouter()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleVerification = useCallback(() => {

    if (error || success) return
    if (!token) {
      setError('Token not found')
      return
    }
    emailVerification(token).then((data) => {
      if (data.error) setError(data.error)
      if (data.success) {
        setSuccess(data.success)
        router.push('/auth/login')
      }
    })
  }, [])

  useEffect(() => {
    handleVerification()
  }, [])
  
  return (
    <AuthCard
      cardTitle="Verify your account"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      showSocials={false}
    >
      <div className="flex w-full flex-col items-center justify-center">
        <p>{!success && !error ? 'Verifying email...' : ''}</p>
        <SuccessForm message={success} />
        <ErrorForm message={error} />
      </div>
    </AuthCard>
  )
}
