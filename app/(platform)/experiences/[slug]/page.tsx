/**
 * Experience Detail Page
 */

import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ExperienceCard } from '@/components/experiences/ExperienceCard'
import { RequestBookingButton } from '@/components/experiences/RequestBookingButton'
import { formatPoints } from '@/lib/utils/format'
import { Clock, Users, ArrowLeft, Star, CheckCircle, MessageCircle } from 'lucide-react'
import type { Experience } from '@/types/models'

interface ExperienceDetailPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ExperienceDetailPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: experience } = await supabase
    .from('experiences')
    .select('title, short_description')
    .eq('slug', slug)
    .single() as { data: Pick<Experience, 'title' | 'short_description'> | null; error: any }

  if (!experience) {
    return { title: 'Experiencia nao encontrada | ProTime' }
  }

  return {
    title: `${experience.title} | ProTime`,
    description: experience.short_description,
  }
}

export default async function ExperienceDetailPage({ params }: ExperienceDetailPageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: experience } = await supabase
    .from('experiences')
    .select(`
      *,
      category:categories(name, slug)
    `)
    .eq('slug', slug)
    .eq('is_active', true)
    .single() as { data: (Experience & { category: { name: string; slug: string } | null }) | null; error: any }

  if (!experience) {
    notFound()
  }

  const { data: relatedExperiences } = experience.category_id
    ? await supabase
        .from('experiences')
        .select('*')
        .eq('category_id', experience.category_id)
        .eq('is_active', true)
        .neq('id', experience.id)
        .limit(3) as { data: Experience[] | null; error: any }
    : { data: null }

  const imageUrl = experience.images?.[0] || '/placeholder-experience.jpg'

  const hasLimitedAvailability =
    experience.availability_type === 'limited' && experience.max_availability
  const remainingSlots = hasLimitedAvailability && experience.max_availability
    ? experience.max_availability - experience.current_bookings
    : null

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-6">
        <Button asChild variant="ghost" size="sm">
          <Link href="/experiences">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para Experiencias
          </Link>
        </Button>
      </div>

      <section className="container pb-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-muted">
            <Image
              src={imageUrl}
              alt={experience.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          <Card className="p-8 h-fit">
            <div className="flex flex-wrap gap-2 mb-4">
              {experience.is_featured && (
                <Badge className="bg-accent text-accent-foreground">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Destaque
                </Badge>
              )}
              {experience.category && <Badge variant="outline">{experience.category.name}</Badge>}
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{experience.title}</h1>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{experience.short_description}</p>

            <div className="space-y-3 mb-6 pb-6 border-b border-border">
              {experience.availability_type === 'limited' && remainingSlots !== null && (
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm">
                    {remainingSlots > 0 ? (
                      <>
                        <span className="font-medium text-foreground">
                          {remainingSlots} vagas disponiveis
                        </span>{' '}
                        de {experience.max_availability}
                      </>
                    ) : (
                      <span className="font-medium text-destructive">Esgotado</span>
                    )}
                  </span>
                </div>
              )}

              {experience.availability_type === 'open' && (
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-success" />
                  <span className="text-sm font-medium text-success">Disponivel para membros</span>
                </div>
              )}

              {experience.availability_type === 'request_only' && (
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium text-accent">Disponivel mediante solicitacao</span>
                </div>
              )}
            </div>

            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">Custo em pontos</p>
              <p className="text-2xl font-bold text-accent">{formatPoints(experience.points_cost)} pts</p>
            </div>

            <div className="space-y-3">
              {experience.availability_type === 'request_only' || (hasLimitedAvailability && remainingSlots === 0) ? (
                <Button asChild size="lg" className="w-full font-semibold" variant="outline">
                  <Link href="/concierge">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Falar com Concierge
                  </Link>
                </Button>
              ) : (
                <RequestBookingButton experienceId={experience.id} />
              )}

              <Button asChild size="lg" variant="outline" className="w-full">
                <Link href="/concierge">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Duvidas? Fale Conosco
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="container py-12 border-t border-border">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Sobre esta Experiencia</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{experience.full_description}</p>
          </div>
        </div>
      </section>

      {relatedExperiences && relatedExperiences.length > 0 && (
        <section className="container py-12 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Experiencias Relacionadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedExperiences.map((related) => (
              <ExperienceCard key={related.id} experience={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}