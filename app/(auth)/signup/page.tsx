/**
 * Signup Page
 */

import { SignupForm } from '@/components/auth/SignupForm'
import Link from 'next/link'

export const metadata = {
  title: 'Criar Conta | ProTime',
  description: 'Crie sua conta exclusiva ProTime com codigo de convite',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-primary mb-2">ProTime</h1>
          </Link>
          <p className="text-muted-foreground">Plataforma exclusiva para medicos ProTime</p>
        </div>

        <div className="premium-card">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">Criar sua conta</h2>
            <p className="text-sm text-muted-foreground">Use seu codigo de convite para acessar beneficios exclusivos</p>
          </div>

          <SignupForm />
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Ao criar uma conta, voce concorda com nossos{' '}
          <Link href="/terms" className="underline hover:text-foreground">Termos de Uso</Link>{' '}
          e{' '}
          <Link href="/privacy" className="underline hover:text-foreground">Politica de Privacidade</Link>.
        </p>
      </div>
    </div>
  )
}