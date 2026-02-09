/**
 * Unauthorized Page
 * Shown when non-authenticated users try to access protected routes
 */

import { Button } from '@/components/ui/button'
import { ShieldX } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'Acesso Restrito | MEG Exclusive',
  description: 'Esta plataforma é exclusiva para médicos MEG credenciados',
}

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldX className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Acesso Exclusivo
        </h1>

        <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
          Esta plataforma é <span className="font-semibold text-foreground">exclusiva para médicos MEG</span>.
          <br />
          Para acessar benefícios premium, você precisa estar autenticado.
        </p>

        {/* Divider */}
        <div className="h-px bg-border my-8" />

        {/* Info Boxes */}
        <div className="grid gap-4 mb-8 text-left">
          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-1">
              Já possui uma conta?
            </h3>
            <p className="text-sm text-muted-foreground">
              Faça login para acessar experiências exclusivas e benefícios premium.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-card border border-border">
            <h3 className="font-semibold text-foreground mb-1">
              Recebeu um convite?
            </h3>
            <p className="text-sm text-muted-foreground">
              Use seu código de convite para criar uma conta e começar a aproveitar.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="font-semibold">
            <Link href="/login">Fazer Login</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-semibold">
            <Link href="/signup">Criar Conta</Link>
          </Button>
        </div>

        {/* Footer */}
        <p className="text-sm text-muted-foreground mt-8">
          Em caso de dúvidas, entre em contato com nosso{' '}
          <Link href="/concierge" className="text-primary hover:underline font-medium">
            concierge
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
