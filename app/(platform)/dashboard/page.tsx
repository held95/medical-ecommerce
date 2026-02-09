/**
 * Dashboard Page
 * Main landing page for authenticated users
 * Shows featured experiences and categories
 */

import { createClient } from '@/lib/supabase/server'
import { ExperienceCard } from '@/components/experiences/ExperienceCard'
import { CategoryNav } from '@/components/experiences/CategoryNav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Dashboard | MEG Exclusive',
  description: 'Benefícios exclusivos para médicos MEG',
}

export default async function DashboardPage() {
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
    .single()

  // Get featured experiences (is_featured = true)
  const { data: featuredExperiences } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_featured', true)
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(4)

  // Get additional highlighted experiences
  const { data: highlightedExperiences } = await supabase
    .from('experiences')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6)

  // Get first name from full name
  const firstName = profile?.full_name?.split(' ')[0] || 'Doutor(a)'

  // Main featured experience (first one)
  const mainFeatured = featuredExperiences?.[0]
  const otherFeatured = featuredExperiences?.slice(1) || []

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Exclusivo para você
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Bem-vindo de volta, {firstName}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Explore experiências premium selecionadas exclusivamente para médicos MEG.
              <br />
              Seu concierge está pronto para cuidar de tudo.
            </p>
          </div>
        </div>
      </section>

      {/* Main Featured Experience */}
      {mainFeatured && (
        <section className="container py-12 md:py-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Experiência em Destaque
              </h2>
              <p className="text-muted-foreground">
                Nossa recomendação especial para você nesta semana
              </p>
            </div>
          </div>

          <div className="max-w-4xl">
            <ExperienceCard experience={mainFeatured} featured />
          </div>
        </section>
      )}

      {/* Weekly Highlights */}
      {otherFeatured.length > 0 && (
        <section className="container py-12 md:py-16 border-t border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Destaques da Semana
              </h2>
              <p className="text-muted-foreground">
                Experiências exclusivas com disponibilidade limitada
              </p>
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

      {/* Categories */}
      <section className="container py-12 md:py-16 border-t border-border">
        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Explore por Categoria
          </h2>
          <p className="text-muted-foreground">
            Descubra benefícios exclusivos organizados por interesse
          </p>
        </div>

        <CategoryNav />
      </section>

      {/* Recent Experiences */}
      {highlightedExperiences && highlightedExperiences.length > 0 && (
        <section className="container py-12 md:py-16 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Novas Experiências
              </h2>
              <p className="text-muted-foreground">
                Adicionadas recentemente à plataforma
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlightedExperiences.slice(0, 6).map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild size="lg">
              <Link href="/experiences">Ver Todas as Experiências</Link>
            </Button>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="container py-16 md:py-20">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Precisa de Ajuda Personalizada?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Nossa equipe de concierge está disponível para criar experiências sob medida
            e cuidar de todos os detalhes para você.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <Link href="/concierge">Falar com Concierge</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
