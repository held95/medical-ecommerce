/**
 * Invite Validation Page
 */

import { SignupForm } from '@/components/auth/SignupForm'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Aceitar Convite | ProTime',
  description: 'Complete seu cadastro com o codigo de convite',
}

interface InvitePageProps {
  params: Promise<{ code: string }>
}

export default async function InvitePage({ params }: InvitePageProps) {
  const { code } = await params
  const supabase = await createClient()

  const { data: invite, error } = await supabase
    .from('invites')
    .select('*')
    .eq('code', code)
    .eq('status', 'pending')
    .single()

  const isValid = !error && invite

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-primary mb-2">ProTime</h1>
          </Link>
          <p className="text-muted-foreground">Plataforma exclusiva para medicos ProTime</p>
        </div>

        {isValid ? (
          <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
            <p className="text-sm font-medium text-accent-foreground text-center">Convite validado! Complete seu cadastro abaixo.</p>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
            <p className="text-sm font-medium text-destructive text-center">Este convite e invalido ou ja foi utilizado.</p>
          </div>
        )}

        <div className="premium-card">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Voce foi convidado</h2>
            <p className="text-sm text-muted-foreground">Complete seu cadastro para acessar beneficios exclusivos</p>
          </div>

          <SignupForm inviteCode={code} />
        </div>
      </div>
    </div>
  )
}