/**
 * Signup Page
 * New doctor registration with invite code
 */

import { SignupForm } from '@/components/auth/SignupForm'
import Link from 'next/link'

export const metadata = {
  title: 'Criar Conta | MEG Exclusive',
  description: 'Crie sua conta exclusiva MEG com código de convite',
}

export default function SignupPage() {
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

        {/* Signup Card */}
        <div className="premium-card">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Criar sua conta
            </h2>
            <p className="text-sm text-muted-foreground">
              Use seu código de convite para acessar benefícios exclusivos
            </p>
          </div>

          <SignupForm />
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
