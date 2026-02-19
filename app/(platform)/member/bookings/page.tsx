/**
 * Member Bookings Page
 */

import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDateTime, formatBookingStatus, formatPoints, formatPointsStatus } from '@/lib/utils/format'
import { Calendar, Clock, Package, Coins } from 'lucide-react'
import type { Booking, Experience } from '@/types/models'

export const metadata = {
  title: 'Minhas Reservas | ProTime',
  description: 'Visualize suas reservas e o status dos pontos',
}

export default async function MemberBookingsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  type BookingWithExperience = Booking & {
    experience: Pick<Experience, 'title' | 'slug' | 'images' | 'points_cost'> | null
  }

  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      experience:experiences(title, slug, images, points_cost)
    `)
    .eq('user_id', user?.id || '')
    .order('created_at', { ascending: false }) as { data: BookingWithExperience[] | null; error: any }

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-12 md:py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Minhas Reservas</h1>
          <p className="text-lg text-muted-foreground">Acompanhe suas solicitacoes, confirmacoes e debitacoes de pontos.</p>
        </div>
      </section>

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
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-foreground">{booking.experience?.title || 'Experiencia'}</h3>
                        <Badge variant={statusVariant as any}>{formatBookingStatus(booking.status)}</Badge>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>Solicitado em: {formatDateTime(booking.created_at)}</span>
                        </div>

                        {booking.requested_date && (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>Data desejada: {formatDateTime(booking.requested_date)}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Coins className="h-4 w-4" />
                          <span>Custo: {formatPoints(booking.points_cost_snapshot || booking.experience?.points_cost || 0)} pts</span>
                        </div>

                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Coins className="h-4 w-4" />
                          <span>Status de pontos: {formatPointsStatus(booking.points_status || 'not_applicable')}</span>
                        </div>

                        {booking.notes && (
                          <div className="flex items-start gap-2 text-muted-foreground">
                            <Package className="h-4 w-4 mt-0.5" />
                            <span className="flex-1">{booking.notes}</span>
                          </div>
                        )}
                      </div>

                      {booking.status === 'pending' && (
                        <p className="mt-3 text-sm text-muted-foreground">
                          Sua solicitacao esta em analise. Os pontos serao debitados apenas na confirmacao.
                        </p>
                      )}

                      {booking.status === 'confirmed' && booking.confirmed_date && (
                        <p className="mt-3 text-sm text-success">Confirmado para {formatDateTime(booking.confirmed_date)}</p>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {booking.experience?.slug && (
                        <Button asChild variant="outline" size="sm">
                          <Link href={`/experiences/${booking.experience.slug}`}>Ver Experiencia</Link>
                        </Button>
                      )}

                      {booking.status === 'pending' && (
                        <Button asChild variant="outline" size="sm">
                          <Link href="/concierge">Contatar Concierge</Link>
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
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma reserva ainda</h3>
            <p className="text-muted-foreground mb-6">Explore experiencias e use seus pontos para a primeira reserva.</p>
            <Button asChild size="lg">
              <Link href="/experiences">Explorar Experiencias</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}