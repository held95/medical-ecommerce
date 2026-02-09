/**
 * Member Profile Page
 * View and edit profile information
 */

import { createClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { User, Mail, Phone, Briefcase, Award, Gift } from 'lucide-react'
import type { Profile } from '@/types/models'

export const metadata = {
  title: 'Meu Perfil | MEG Exclusive',
  description: 'Visualize e edite suas informações pessoais',
}

export default async function MemberProfilePage() {
  const supabase = await createClient()

  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id || '')
    .single() as { data: Profile | null; error: any }

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Perfil não encontrado</p>
      </div>
    )
  }

  // Get membership tier badge variant
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
      : 'Básico'

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Meu Perfil
              </h1>
              <p className="text-lg text-muted-foreground">
                Gerencie suas informações pessoais
              </p>
            </div>
            <Badge variant={tierVariant as any} className="text-lg px-4 py-2">
              <Award className="mr-2 h-5 w-5" />
              {tierLabel}
            </Badge>
          </div>
        </div>
      </section>

      {/* Profile Content */}
      <section className="container py-12">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Info Card */}
          <Card className="lg:col-span-2 p-8">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Informações Pessoais
            </h2>

            <div className="space-y-6">
              {/* Full Name */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Nome Completo
                  </label>
                  <p className="text-lg text-foreground mt-1">{profile.full_name}</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    Email
                  </label>
                  <p className="text-lg text-foreground mt-1">{user?.email}</p>
                </div>
              </div>

              {/* CPF */}
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <label className="text-sm font-medium text-muted-foreground">
                    CPF
                  </label>
                  <p className="text-lg text-foreground mt-1">{profile.cpf}</p>
                </div>
              </div>

              {/* Phone */}
              {profile.phone && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Telefone
                    </label>
                    <p className="text-lg text-foreground mt-1">{profile.phone}</p>
                  </div>
                </div>
              )}

              {/* Specialty */}
              {profile.specialty && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      Especialidade
                    </label>
                    <p className="text-lg text-foreground mt-1">{profile.specialty}</p>
                  </div>
                </div>
              )}

              {/* CRM */}
              {profile.crm && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-muted-foreground">
                      CRM
                    </label>
                    <p className="text-lg text-foreground mt-1">{profile.crm}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Edit Button - Placeholder for future */}
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">
                Precisa atualizar suas informações? Entre em contato com nossa equipe.
              </p>
              <Button asChild variant="outline">
                <Link href="/concierge">Contatar Concierge</Link>
              </Button>
            </div>
          </Card>

          {/* Sidebar Cards */}
          <div className="space-y-6">
            {/* Membership Card */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="h-6 w-6 text-accent" />
                <h3 className="font-semibold text-foreground">Plano Atual</h3>
              </div>
              <Badge variant={tierVariant as any} className="mb-3">
                {tierLabel}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {profile.membership_tier === 'basic'
                  ? 'Acesso a experiências exclusivas e concierge padrão'
                  : profile.membership_tier === 'premium'
                  ? 'Prioridade em reservas e benefícios ampliados'
                  : 'Acesso VIP completo com concierge dedicado 24/7'}
              </p>
            </Card>

            {/* Invites Card */}
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="h-6 w-6 text-accent" />
                <h3 className="font-semibold text-foreground">Convites</h3>
              </div>
              <p className="text-3xl font-bold text-accent mb-2">
                {profile.available_invites}
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Convites disponíveis para compartilhar com colegas
              </p>
              <Button variant="outline" className="w-full" disabled>
                Enviar Convite
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Em breve disponível
              </p>
            </Card>

            {/* Quick Links */}
            <Card className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Links Rápidos</h3>
              <div className="space-y-2">
                <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                  <Link href="/member/bookings">Minhas Reservas</Link>
                </Button>
                <Button asChild variant="ghost" className="w-full justify-start" size="sm">
                  <Link href="/experiences">Experiências</Link>
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
