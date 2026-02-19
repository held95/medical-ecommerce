'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface RequestBookingButtonProps {
  experienceId: string
  disabled?: boolean
}

export function RequestBookingButton({ experienceId, disabled = false }: RequestBookingButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleBooking = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          experienceId,
          bookingType: 'request',
        }),
      })

      const payload = await response.json()

      if (!response.ok) {
        throw new Error(payload.error || 'Nao foi possivel criar sua reserva')
      }

      router.push('/member/bookings')
      router.refresh()
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Erro inesperado ao solicitar reserva'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-2">
      <Button size="lg" className="w-full font-semibold" onClick={handleBooking} disabled={disabled || isLoading}>
        {isLoading ? 'Enviando solicitacao...' : 'Solicitar Resgate'}
      </Button>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  )
}