/**
 * Member Bookings Page
 * View booking history and status
 */

import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDateTime, formatBookingStatus } from '@/lib/utils/format'
import { Calendar, Clock, Package } from 'lucide-react'
import type { Booking, Experience } from '@/types/models'

export const metadata = {
  title: 'Minhas Reservas | MEG Exclusive',
  description: 'Visualize suas reservas e solicitações',
}

export default async function MemberBookingsPage() {
  const supabase = await createClient()

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user bookings with experience details
  type BookingWithExperience = Booking & {
    experience: Pick<Experience, 'title' | 'slug' | 'images' | 'price_display'> | null
  }
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      experience:experiences(title, slug, images, price_display)
    `)
    .eq('user_id', user?.id || '')
    .order('created_at', { ascending: false }) as { data: BookingWithExperience[] | null; error: any }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Minhas Reservas
          </h1>
          <p className="text-lg text-muted-foreground">
            Acompanhe todas as suas solicitações e reservas
          </p>
        </div>
      </section>

      {/* Bookings List */}
      <section className="container py-12">
        {bookings && bookings.length > 0 ? (
          <div className="space-y-6">
            {bookings.map((booking) => {
              const statusVariant =
                booking.status === 'confirmed'
                  ? 'default'
                  : booking.status === 'pending'
                  ? 'outline'
                  : booking.status === 'cancelled'
                  ? 'destructive'
                  : 'secondary'

              return (
                <Card key={booking.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      {/* Experience Title */}
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-foreground">
                          {booking.experience?.title || 'Experiência'}
                        </h3>
                        <Badge variant={statusVariant as any}>
                          {formatBookingStatus(booking.status)}
                        </Badge>
                      </div>

                      {/* Details */}
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            Solicitado em: {formatDateTime(booking.created_at)}
                          </span>
                        </div>

                        {booking.requested_date && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>
                              Data desejada: {formatDateTime(booking.requested_date)}
                            </span>
                          </div>
                        )}

                        {booking.notes && (
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <Package className="h-4 w-4 mt-0.5" />
                            <span className="flex-1">{booking.notes}</span>
                          </div>
                        )}
                      </div>

                      {/* Status Messages */}
                      {booking.status === 'pending' && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          Nossa equipe está analisando sua solicitação. Você receberá
                          uma confirmação em breve.
                        </p>
                      )}

                      {booking.status === 'confirmed' && booking.confirmed_date && (
                        <p className="mt-3 text-sm text-success">
                          ✓ Confirmado para {formatDateTime(booking.confirmed_date)}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                      {booking.experience?.slug && (
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/experiences/${booking.experience.slug}`}>
                            Ver Experiência
                          </Link>
                        </Button>
                      )}

                      {booking.status === 'pending' && (
                        <Button asChild variant="outline" size="sm">
                          <Link href="/concierge">
                            Contatar Concierge
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma reserva ainda
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore nossas experiências exclusivas e faça sua primeira reserva.
            </p>
            <Button asChild size="lg">
              <Link href="/experiences">Explorar Experiências</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
