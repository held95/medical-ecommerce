/**
 * Category Constants
 * Defines all experience categories with metadata
 */

export interface Category {
  name: string
  slug: string
  description: string
  icon: string
}

export const CATEGORIES: Category[] = [
  {
    name: 'Premium Travel & Retreats',
    slug: 'premium-travel',
    description: 'Exclusive travel experiences and wellness retreats',
    icon: 'plane',
  },
  {
    name: 'Health, Wellness & Performance',
    slug: 'health-wellness',
    description: 'Advanced health optimization and wellness programs',
    icon: 'heart-pulse',
  },
  {
    name: 'Lifestyle & Comfort',
    slug: 'lifestyle-comfort',
    description: 'Premium lifestyle services and comfort solutions',
    icon: 'home',
  },
  {
    name: 'Mobility & Vehicles',
    slug: 'mobility-vehicles',
    description: 'Exclusive vehicle access and mobility solutions',
    icon: 'car',
  },
  {
    name: 'Technology & Professional Tools',
    slug: 'technology-tools',
    description: 'Latest technology and professional equipment',
    icon: 'laptop',
  },
  {
    name: 'Education & Career Growth',
    slug: 'education-career',
    description: 'Professional development and career advancement',
    icon: 'graduation-cap',
  },
]

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((cat) => cat.slug === slug)
}

export function getCategoryIcon(slug: string): string {
  const category = getCategoryBySlug(slug)
  return category?.icon || 'circle'
}
