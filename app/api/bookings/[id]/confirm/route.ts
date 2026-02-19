import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminUser } from '@/lib/auth/admin'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function POST(_request: Request, { params }: RouteParams) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  }

  if (!isAdminUser(user)) {
    return NextResponse.json({ error: 'Apenas administradores podem confirmar reservas' }, { status: 403 })
  }

  const { id } = await params

  const { error } = await (supabase as any).rpc('confirm_booking_points_deduction', {
    p_booking_id: id,
  })

  if (error) {
    return NextResponse.json({ error: error.message || 'Falha ao confirmar reserva' }, { status: 400 })
  }

  return NextResponse.json({ success: true, message: 'Reserva confirmada e pontos debitados.' })
}