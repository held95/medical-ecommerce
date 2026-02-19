/**
 * Member Profile Page
 */

import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User, Mail, Phone, Briefcase, Award, Gift, Coins } from 'lucide-react'
import { formatPoints } from '@/lib/utils/format'
import type { Profile, PointsLedger } from '@/types/models'

export const metadata = {
  title: 'Meu Perfil | ProTime',
  description: 'Visualize suas informacoes pessoais e carteira de pontos',
}

export default async function MemberProfilePage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id || '')
    .single() as { data: Profile | null; error: any }

  const { data: pointsLedger } = await supabase
    .from('points_ledger')
    .select('*')
    .eq('user_id', user?.id || '')
    .order('created_at', { ascending: false })
    .limit(5) as { data: PointsLedger[] | null; error: any }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Perfil nao encontrado</p>
      </div>
    )
  }

  const tierVariant =
    profile.membership_tier === 'elite'
      ? 'default'
      : profile.membership_tier === 'premium'
        ? 'secondary'
        : 'outline'

  const tierLabel =
    profile.membership_tier === 'elite'
      ? 'Elite'
      : profile.membership_tier === 'premium'
        ? 'Premium'
        : 'Basico'

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Meu Perfil</h1>
              <p className="text-lg text-muted-foreground">Gerencie suas informacoes pessoais e saldo de pontos</p>
            </div>
            <Badge variant={tierVariant as any} className="text-lg px-4 py-2">
              <Award className="mr-2 h-5 w-5" />
              {tierLabel}
            </Badge>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">Informacoes Pessoais</h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">Nome Completo</label>
                  <p className="text-lg text-foreground mt-1">{profile.full_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-lg text-foreground mt-1">{user?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">CPF</label>
                  <p className="text-lg text-foreground mt-1">{profile.cpf}</p>
                </div>
              </div>

              {profile.phone && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-muted-foreground">Telefone</label>
                    <p className="text-lg text-foreground mt-1">{profile.phone}</p>
                  </div>
                </div>
              )}

              {profile.specialty && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-muted-foreground">Especialidade</label>
                    <p className="text-lg text-foreground mt-1">{profile.specialty}</p>
                  </div>
                </div>
              )}

              {profile.crm && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-muted-foreground">CRM</label>
                    <p className="text-lg text-foreground mt-1">{profile.crm}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Precisa atualizar suas informacoes? Fale com o concierge.</p>
              <Button asChild variant="outline">
                <Link href="/concierge">Contatar Concierge</Link>
              </Button>
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Coins className="h-6 w-6 text-accent" />
                <h3 className="font-semibold text-foreground">Carteira de Pontos</h3>
              </div>
              <p className="text-3xl font-bold text-accent mb-2">{formatPoints(profile.points_balance)} pts</p>
              <p className="text-sm text-muted-foreground mb-3">Total acumulado: {formatPoints(profile.points_lifetime_earned)} pts</p>
              <Badge variant={profile.medical_verified ? 'default' : 'outline'}>
                {profile.medical_verified ? 'Medico verificado' : 'Verificacao pendente'}
              </Badge>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-6 w-6 text-accent" />
                <h3 className="font-semibold text-foreground">Convites</h3>
              </div>
              <p className="text-3xl font-bold text-accent mb-2">{profile.available_invites}</p>
              <p className="text-sm text-muted-foreground mb-4">Convites disponiveis para colegas</p>
              <Button variant="outline" className="w-full" disabled>
                Enviar Convite
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Extrato de Pontos</h3>
              <div className="space-y-3">
                {pointsLedger && pointsLedger.length > 0 ? (
                  pointsLedger.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium text-foreground">{entry.reason || 'Movimentacao'}</p>
                        <p className="text-xs text-muted-foreground">Saldo: {formatPoints(entry.balance_after)} pts</p>
                      </div>
                      <p className={entry.points >= 0 ? 'text-success font-semibold' : 'text-destructive font-semibold'}>
                        {entry.points >= 0 ? '+' : ''}{formatPoints(entry.points)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">Sem movimentacoes de pontos.</p>
                )}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Links Rapidos</h3>
              <div className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                  <Link href="/member/bookings">Minhas Reservas</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                  <Link href="/experiences">Experiencias</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                  <Link href="/concierge">Concierge</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}