/**
 * Login Page
 * Premium medical ecommerce platform authentication
 */

import { LoginForm } from '@/components/auth/LoginForm'
import Link from 'next/link'

export const metadata = {
  title: 'Login | MEG Exclusive',
  description: 'Acesse sua conta exclusiva MEG',
}

export default function LoginPage() {
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

        {/* Login Card */}
        <div className="premium-card">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Bem-vindo de volta
            </h2>
            <p className="text-sm text-muted-foreground">
              Entre com suas credenciais para acessar benefícios exclusivos
            </p>
          </div>

          <LoginForm />
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          Esta plataforma é exclusiva para médicos credenciados MEG.
          <br />
          Em caso de dúvidas, entre em contato com nosso concierge.
        </p>
      </div>
    </div>
  )
}
