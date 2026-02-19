import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { isAdminUser } from '@/lib/auth/admin'

interface AdjustPointsBody {
  userId?: string
  points?: number
  reason?: string
  source?: string
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Nao autenticado' }, { status: 401 })
  }

  if (!isAdminUser(user)) {
    return NextResponse.json({ error: 'Apenas administradores podem ajustar pontos' }, { status: 403 })
  }

  const body = (await request.json()) as AdjustPointsBody

  if (!body.userId || typeof body.points !== 'number' || !body.reason) {
    return NextResponse.json(
      { error: 'Campos obrigatorios: userId, points, reason' },
      { status: 400 }
    )
  }

  if (body.points === 0) {
    return NextResponse.json({ error: 'O ajuste de pontos nao pode ser zero' }, { status: 400 })
  }

  const { error } = await (supabase as any).rpc('adjust_points', {
    p_user_id: body.userId,
    p_points: body.points,
    p_reason: body.reason,
    p_source: body.source || 'admin_api',
    p_created_by: user.id,
  })

  if (error) {
    return NextResponse.json({ error: error.message || 'Falha ao ajustar pontos' }, { status: 400 })
  }

  return NextResponse.json({
    success: true,
    message: body.points > 0 ? 'Pontos creditados com sucesso.' : 'Pontos debitados com sucesso.',
  })
}