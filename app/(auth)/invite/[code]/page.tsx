/**
 * Invite Validation Page
 * Pre-fills signup form with invite code from URL
 */

import { SignupForm } from '@/components/auth/SignupForm'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Aceitar Convite | MEG Exclusive',
  description: 'Complete seu cadastro com o código de convite',
}

interface InvitePageProps {
  params: Promise<{
    code: string
  }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { code } = await params
  const supabase = await createClient()

  // Validate invite code on server
  const { data: invite, error } = await supabase
    .from('invites')
    .select('*')
    .eq('code', code)
    .eq('status', 'pending')
    .single()

  // If invite is invalid or expired, redirect to signup
  const isValid = !error && invite

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo / Brand */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-primary mb-2">MEG Exclusive</h1>
          </Link>
          <p className="text-muted-foreground">
            Plataforma exclusiva para médicos MEG
          </p>
        </div>

        {/* Invite Status */}
        {isValid ? (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm font-medium text-accent-foreground text-center">
              ✓ Convite validado! Complete seu cadastro abaixo.
            </p>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm font-medium text-destructive text-center">
              Este convite é inválido ou já foi utilizado.
            </p>
          </div>
        )}

        {/* Signup Card */}
        <div className="premium-card">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Você foi convidado
            </h2>
            <p className="text-sm text-muted-foreground">
              Complete seu cadastro para acessar benefícios exclusivos
            </p>
          </div>

          <SignupForm inviteCode={code} />
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Ao criar uma conta, você concorda com nossos{' '}
          <Link href="/terms" className="underline hover:text-foreground">
            Termos de Uso
          </Link>{' '}
          e{' '}
          <Link href="/privacy" className="underline hover:text-foreground">
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
