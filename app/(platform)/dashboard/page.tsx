/**
 * Dashboard Page
 */

import { createClient } from '@/lib/supabase/server'
import { ExperienceCard } from '@/components/experiences/ExperienceCard'
import { CategoryNav } from '@/components/experiences/CategoryNav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles, Coins } from 'lucide-react'
import { formatPoints } from '@/lib/utils/format'
import type { Profile, Experience } from '@/types/models'

export const metadata = {
  title: 'Dashboard | ProTime',
  description: 'Beneficios exclusivos para medicos ProTime',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user?.id || '')
    .single() as { data: Profile | null; error: any }

  const { data: featuredExperiences } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4) as { data: Experience[] | null; error: any }

  const { data: highlightedExperiences } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6) as { data: Experience[] | null; error: any }

  const firstName = profile?.full_name?.split(' ')[0] || 'Doutor(a)'
  const mainFeatured = featuredExperiences?.[0]
  const otherFeatured = featuredExperiences?.slice(1) || []

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Exclusivo para voce
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">Bem-vindo de volta, {firstName}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              Explore experiencias premium da ProTime e use seus pontos para desbloquear beneficios.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-accent">
              <Coins className="h-4 w-4" />
              Saldo atual: {formatPoints(profile?.points_balance || 0)} pts
            </div>
          </div>
        </div>
      </section>

      {mainFeatured && (
        <section className="container py-12 md:py-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Experiencia em Destaque</h2>
              <p className="text-muted-foreground">Nossa recomendacao especial desta semana</p>
            </div>
          </div>

          <div className="max-w-4xl">
            <ExperienceCard experience={mainFeatured} featured />
          </div>
        </section>
      )}

      {otherFeatured.length > 0 && (
        <section className="container py-12 md:py-16 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Destaques da Semana</h2>
              <p className="text-muted-foreground">Experiencias com disponibilidade limitada</p>
            </div>
            <Button asChild variant="outline">
              <Link href="/experiences">Ver Todas</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherFeatured.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        </section>
      )}

      <section className="container py-12 md:py-16 border-t border-border">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Explore por Categoria</h2>
          <p className="text-muted-foreground">Descubra beneficios exclusivos organizados por interesse</p>
        </div>

        <CategoryNav />
      </section>

      {highlightedExperiences && highlightedExperiences.length > 0 && (
        <section className="container py-12 md:py-16 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Novas Experiencias</h2>
              <p className="text-muted-foreground">Adicionadas recentemente</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedExperiences.slice(0, 6).map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/experiences">Ver Todas as Experiencias</Link>
            </Button>
          </div>
        </section>
      )}

      <section className="container py-16 md:py-20">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Precisa de Ajuda Personalizada?</h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Nossa equipe de concierge esta disponivel para criar experiencias sob medida.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <Link href="/concierge">Falar com Concierge</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}