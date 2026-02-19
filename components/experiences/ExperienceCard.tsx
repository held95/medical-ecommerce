/**
 * Experience Card Component
 */

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Clock, Users } from 'lucide-react'
import { formatPoints } from '@/lib/utils/format'
import type { Experience } from '@/types/models'

interface ExperienceCardProps {
  experience: Experience
  featured?: boolean
}

export function ExperienceCard({ experience, featured = false }: ExperienceCardProps) {
  const {
    slug,
    title,
    short_description,
    images,
    availability_type,
    max_availability,
    current_bookings,
    points_cost,
    is_featured,
  } = experience

  const imageUrl = images && images.length > 0 ? images[0] : '/placeholder-experience.jpg'

  const hasLimitedAvailability = availability_type === 'limited' && max_availability
  const remainingSlots = hasLimitedAvailability ? max_availability - current_bookings : null

  const getAvailabilityBadge = () => {
    if (availability_type === 'request_only') {
      return (
        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
          Sob solicitacao
        </Badge>
      )
    }
    if (hasLimitedAvailability && remainingSlots !== null) {
      if (remainingSlots <= 3 && remainingSlots > 0) {
        return (
          <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
            <Clock className="w-3 h-3 mr-1" />
            {remainingSlots} disponiveis
          </Badge>
        )
      }
      if (remainingSlots === 0) {
        return <Badge variant="outline" className="bg-muted text-muted-foreground">Esgotado</Badge>
      }
      return (
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          <Users className="w-3 h-3 mr-1" />
          Disponivel
        </Badge>
      )
    }
    return (
      <Badge variant="outline" className="bg-success/10 text-success border-success/20">
        Disponivel
      </Badge>
    )
  }

  return (
    <Card className={`experience-card overflow-hidden h-full flex flex-col ${featured ? 'border-accent' : ''}`}>
      <Link href={`/experiences/${slug}`}>
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes={featured ? '(max-width: 768px) 100vw, 800px' : '(max-width: 768px) 100vw, 400px'}
          />
          {is_featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-accent text-accent-foreground">
                <Star className="w-3 h-3 mr-1 fill-current" />
                Destaque
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="flex-1 p-5 md:p-6">
        <div className="mb-3">{getAvailabilityBadge()}</div>

        <Link href={`/experiences/${slug}`}>
          <h3 className={`font-semibold mb-2 hover:text-primary transition-colors ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
            {title}
          </h3>
        </Link>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{short_description}</p>
      </CardContent>

      <CardFooter className="p-5 md:p-6 pt-0 flex items-center justify-between">
        <span className="text-sm font-medium text-accent">{formatPoints(points_cost)} pts</span>

        <Button asChild size="sm" variant={availability_type === 'request_only' ? 'outline' : 'default'}>
          <Link href={`/experiences/${slug}`}>Ver Detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}