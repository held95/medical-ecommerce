/**
 * Experiences Listing Page
 * Browse all experiences with category filtering
 */

import { createClient } from '@/lib/supabase/server'
import { ExperienceCard } from '@/components/experiences/ExperienceCard'
import { CategoryNav } from '@/components/experiences/CategoryNav'
import { Badge } from '@/components/ui/badge'
import { Filter } from 'lucide-react'
import type { Experience, Category } from '@/types/models'

export const metadata = {
  title: 'Experiências | MEG Exclusive',
  description: 'Explore benefícios e experiências exclusivas para médicos MEG',
}

interface ExperiencesPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ExperiencesPage({ searchParams }: ExperiencesPageProps) {
  const params = await searchParams
  const categorySlug = params.category

  const supabase = await createClient()

  // Build query
  let query = supabase
    .from('experiences')
    .select('*')
    .eq('is_active', true)

  // Filter by category if provided
  if (categorySlug) {
    // Get category ID
    const { data: category } = await supabase
      .from('categories')
      .select('id, name')
      .eq('slug', categorySlug)
      .single() as { data: Pick<Category, 'id' | 'name'> | null; error: any }

    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  // Execute query
  const { data: experiences } = await query.order('created_at', { ascending: false }) as { data: Experience[] | null; error: any }

  // Get category name for display
  const categoryName = categorySlug
    ? ((await supabase
        .from('categories')
        .select('name')
        .eq('slug', categorySlug)
        .single() as { data: Pick<Category, 'name'> | null; error: any })
      ).data?.name
    : null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {categoryName ? categoryName : 'Todas as Experiências'}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {categoryName
                ? `Explore experiências exclusivas em ${categoryName}`
                : 'Descubra benefícios premium selecionados especialmente para você'}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="container py-8 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">
            Filtrar por Categoria
          </h2>
        </div>
        <CategoryNav compact />
      </section>

      {/* Experiences Grid */}
      <section className="container py-12 md:py-16">
        {experiences && experiences.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">
                {experiences.length} experiência{experiences.length !== 1 ? 's' : ''} encontrada{experiences.length !== 1 ? 's' : ''}
              </p>
              {categorySlug && (
                <Badge variant="outline" className="bg-accent/10 text-accent">
                  {categoryName}
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {experiences.map((experience) => (
                <ExperienceCard key={experience.id} experience={experience} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
              <Filter className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Nenhuma experiência encontrada
            </h3>
            <p className="text-muted-foreground mb-6">
              {categorySlug
                ? 'Não há experiências disponíveis nesta categoria no momento.'
                : 'Não há experiências disponíveis no momento.'}
            </p>
          </div>
        )}
      </section>
    </div>
  )
}
