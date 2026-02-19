/**
 * Experiences Listing Page
 */

import { createClient } from '@/lib/supabase/server'
import { ExperienceCard } from '@/components/experiences/ExperienceCard'
import { CategoryNav } from '@/components/experiences/CategoryNav'
import { Badge } from '@/components/ui/badge'
import { Filter } from 'lucide-react'
import type { Experience, Category } from '@/types/models'

export const metadata = {
  title: 'Experiencias | ProTime',
  description: 'Explore beneficios e experiencias exclusivas para medicos ProTime',
}

interface ExperiencesPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function ExperiencesPage({ searchParams }: ExperiencesPageProps) {
  const params = await searchParams
  const categorySlug = params.category

  const supabase = await createClient()

  let query = supabase.from('experiences').select('*').eq('is_active', true)

  if (categorySlug) {
    const { data: category } = await supabase
      .from('categories')
      .select('id, name')
      .eq('slug', categorySlug)
      .single() as { data: Pick<Category, 'id' | 'name'> | null; error: any }

    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  const { data: experiences } = await query.order('created_at', { ascending: false }) as { data: Experience[] | null; error: any }

  const categoryName = categorySlug
    ? ((await supabase.from('categories').select('name').eq('slug', categorySlug).single() as { data: Pick<Category, 'name'> | null; error: any }).data?.name)
    : null

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-primary/5 to-background border-b border-border">
        <div className="container py-12 md:py-16">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">{categoryName ? categoryName : 'Todas as Experiencias'}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {categoryName ? `Explore experiencias exclusivas em ${categoryName}` : 'Descubra beneficios premium para resgate com pontos'}
            </p>
          </div>
        </div>
      </section>

      <section className="container py-8 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground">Filtrar por Categoria</h2>
        </div>
        <CategoryNav compact />
      </section>

      <section className="container py-12 md:py-16">
        {experiences && experiences.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground">{experiences.length} experiencia(s) encontrada(s)</p>
              {categorySlug && <Badge variant="outline" className="bg-accent/10 text-accent">{categoryName}</Badge>}
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
            <h3 className="text-xl font-semibold text-foreground mb-2">Nenhuma experiencia encontrada</h3>
            <p className="text-muted-foreground">Nao ha experiencias disponiveis no momento.</p>
          </div>
        )}
      </section>
    </div>
  )
}