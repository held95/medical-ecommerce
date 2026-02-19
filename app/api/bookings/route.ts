import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import type { Experience, Profile } from '@/types/models'

interface CreateBookingBody {
  experienceId?: string
  requestedDate?: string
  notes?: string
  bookingType?: 'instant' | 'request'
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  }

  const body = (await request.json()) as CreateBookingBody

  if (!body.experienceId) {
    return NextResponse.json({ error: 'experienceId e obrigatorio' }, { status: 400 })
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, access_status, points_balance')
    .eq('id', user.id)
    .single() as {
      data: Pick<Profile, 'id' | 'points_balance' | 'access_status'> | null
      error: unknown
    }

  if (profileError || !profile) {
    return NextResponse.json({ error: 'Perfil nao encontrado' }, { status: 404 })
  }

  if (profile.access_status !== 'active') {
    return NextResponse.json({ error: 'Seu acesso esta suspenso para reservas' }, { status: 403 })
  }

  const { data: experience, error: experienceError } = await supabase
    .from('experiences')
    .select('id, title, is_active, availability_type, max_availability, current_bookings, points_cost')
    .eq('id', body.experienceId)
    .single() as {
      data: Pick<Experience, 'id' | 'title' | 'is_active' | 'availability_type' | 'max_availability' | 'current_bookings' | 'points_cost'> | null
      error: unknown
    }

  if (experienceError || !experience || !experience.is_active) {
    return NextResponse.json({ error: 'Experiencia indisponivel' }, { status: 404 })
  }

  if (
    experience.availability_type === 'limited' &&
    experience.max_availability !== null &&
    experience.current_bookings >= experience.max_availability
  ) {
    return NextResponse.json({ error: 'Experiencia esgotada' }, { status: 409 })
  }

  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      user_id: user.id,
      experience_id: experience.id,
      status: 'pending',
      booking_type: body.bookingType || 'request',
      requested_date: body.requestedDate || null,
      notes: body.notes || null,
      points_cost_snapshot: experience.points_cost,
      points_status: 'not_applicable',
    } as any)
    .select('id')
    .single() as { data: { id: string } | null; error: unknown }

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'Falha ao criar reserva' }, { status: 500 })
  }

  const { error: reserveError } = await (supabase as any).rpc('reserve_points_for_booking', {
    p_user_id: user.id,
    p_experience_id: experience.id,
    p_booking_id: booking.id,
  })

  if (reserveError) {
    await supabase.from('bookings').delete().eq('id', booking.id)
    return NextResponse.json(
      { error: reserveError.message || 'Nao foi possivel reservar pontos para esta experiencia' },
      { status: 400 }
    )
  }

  return NextResponse.json({
    success: true,
    bookingId: booking.id,
    pointsReserved: experience.points_cost,
    currentBalance: profile.points_balance,
    message: 'Reserva criada. Seus pontos serao debitados apenas na confirmacao.',
  })
}
