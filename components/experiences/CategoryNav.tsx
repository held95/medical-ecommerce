/**
 * Category Navigation Component
 * Displays category grid with icons
 */

import Link from 'next/link'
import { Card } from '@/components/ui/card'
import {
  Plane,
  HeartPulse,
  Home,
  Car,
  Laptop,
  GraduationCap,
  LucideIcon
} from 'lucide-react'

interface Category {
  name: string
  slug: string
  description: string
  icon: string
}

interface CategoryNavProps {
  categories?: Category[]
  compact?: boolean
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  'plane': Plane,
  'heart-pulse': HeartPulse,
  'home': Home,
  'car': Car,
  'laptop': Laptop,
  'graduation-cap': GraduationCap,
}

const defaultCategories: Category[] = [
  {
    name: 'Premium Travel & Retreats',
    slug: 'premium-travel',
    description: 'Experiências exclusivas de viagem',
    icon: 'plane',
  },
  {
    name: 'Health & Wellness',
    slug: 'health-wellness',
    description: 'Programas de saúde e bem-estar',
    icon: 'heart-pulse',
  },
  {
    name: 'Lifestyle & Comfort',
    slug: 'lifestyle-comfort',
    description: 'Serviços premium de lifestyle',
    icon: 'home',
  },
  {
    name: 'Mobility & Vehicles',
    slug: 'mobility-vehicles',
    description: 'Acesso a veículos exclusivos',
    icon: 'car',
  },
  {
    name: 'Technology & Tools',
    slug: 'technology-tools',
    description: 'Equipamentos profissionais',
    icon: 'laptop',
  },
  {
    name: 'Education & Career',
    slug: 'education-career',
    description: 'Desenvolvimento profissional',
    icon: 'graduation-cap',
  },
]

export function CategoryNav({ categories = defaultCategories, compact = false }: CategoryNavProps) {
  return (
    <div className={`grid gap-4 ${
      compact
        ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
    }`}>
      {categories.map((category) => {
        const Icon = iconMap[category.icon] || Plane

        return (
          <Link
            key={category.slug}
            href={`/experiences?category=${category.slug}`}
          >
            <Card className={`group cursor-pointer border-2 transition-all duration-300 hover:border-accent hover:shadow-md ${
              compact ? 'p-4' : 'p-6'
            }`}>
              <div className="flex flex-col items-center text-center gap-3">
                {/* Icon */}
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                  <Icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
                </div>

                {/* Title */}
                <h3 className={`font-semibold group-hover:text-accent transition-colors ${
                  compact ? 'text-sm' : 'text-base'
                }`}>
                  {category.name}
                </h3>

                {/* Description - only show in non-compact mode */}
                {!compact && (
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                )}
              </div>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
