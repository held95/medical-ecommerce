/**
 * Landing Page
 * Redirects authenticated users to dashboard, others to login
 */

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  // Otherwise show landing page
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl text-center">
        {/* Logo / Brand */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
            MEG Exclusive
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Benefícios exclusivos para médicos MEG
          </p>
        </div>

        {/* Value Props */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl mb-3">✈️</div>
            <h3 className="font-semibold text-foreground mb-2">
              Experiências Premium
            </h3>
            <p className="text-sm text-muted-foreground">
              Viagens, wellness e lifestyle exclusivos
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl mb-3">⏱️</div>
            <h3 className="font-semibold text-foreground mb-2">
              Economia de Tempo
            </h3>
            <p className="text-sm text-muted-foreground">
              Concierge dedicado cuida de tudo
            </p>
          </div>

          <div className="p-6 rounded-lg bg-card border border-border">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-foreground mb-2">
              Acesso Exclusivo
            </h3>
            <p className="text-sm text-muted-foreground">
              Apenas para médicos credenciados
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="font-semibold text-lg h-12 px-8">
            <Link href="/login">Acessar Plataforma</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="font-semibold text-lg h-12 px-8"
          >
            <Link href="/signup">Criar Conta</Link>
          </Button>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-muted-foreground mt-12">
          Esta é uma plataforma exclusiva para médicos MEG.
          <br />
          Acesso mediante convite apenas.
        </p>
      </div>
    </div>
  )
}
