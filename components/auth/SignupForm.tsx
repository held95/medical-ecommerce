'use client'

/**
 * Signup Form Component
 * Handles new doctor registration with invite code validation
 */

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, Loader2, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import {
  validateCPFFormat,
  formatCPF,
  validateEmail,
  validatePassword,
  validatePhoneFormat,
  formatPhone,
} from '@/lib/utils/validation'

interface SignupFormProps {
  inviteCode?: string
}

export function SignupForm({ inviteCode }: SignupFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    inviteCode: inviteCode || '',
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    cpf: '',
    phone: '',
    specialty: '',
    crm: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [inviteValidated, setInviteValidated] = useState(!!inviteCode)

  const validateInviteCode = async () => {
    if (!formData.inviteCode) {
      setErrors({ ...errors, inviteCode: 'Código de convite obrigatório' })
      return false
    }

    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('invites')
        .select('*')
        .eq('code', formData.inviteCode)
        .eq('status', 'pending')
        .single()

      if (error || !data) {
        setErrors({ ...errors, inviteCode: 'Código de convite inválido ou expirado' })
        return false
      }

      setInviteValidated(true)
      setErrors({ ...errors, inviteCode: '' })
      return true
    } catch (err) {
      setErrors({ ...errors, inviteCode: 'Erro ao validar convite' })
      return false
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.message || 'Senha inválida'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem'
    }

    if (!formData.fullName || formData.fullName.length < 3) {
      newErrors.fullName = 'Nome completo obrigatório'
    }

    if (!validateCPFFormat(formData.cpf)) {
      newErrors.cpf = 'CPF inválido (formato: XXX.XXX.XXX-XX ou XXXXXXXXXXX)'
    }

    if (formData.phone && !validatePhoneFormat(formData.phone)) {
      newErrors.phone = 'Telefone inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError(null)

    if (!inviteValidated) {
      const isValid = await validateInviteCode()
      if (!isValid) return
    }

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      const supabase = createClient()

      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Falha ao criar usuário')

      // Create profile
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        full_name: formData.fullName,
        cpf: formatCPF(formData.cpf),
        phone: formData.phone ? formatPhone(formData.phone) : null,
        specialty: formData.specialty || null,
        crm: formData.crm || null,
        membership_tier: 'basic',
        available_invites: 3,
      })

      if (profileError) throw profileError

      // Mark invite as used
      const { error: inviteError } = await supabase
        .from('invites')
        .update({
          status: 'used',
          used_by: authData.user.id,
          used_at: new Date().toISOString(),
        })
        .eq('code', formData.inviteCode)

      if (inviteError) {
        console.error('Failed to update invite:', inviteError)
      }

      // Redirect to dashboard
      router.push('/dashboard')
      router.refresh()
    } catch (err: any) {
      console.error('Signup error:', err)
      setGeneralError(
        err.message || 'Erro ao criar conta. Por favor, tente novamente.'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {generalError && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg flex items-start gap-3">
          <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
          <p className="text-sm">{generalError}</p>
        </div>
      )}

      {/* Invite Code */}
      <div className="space-y-2">
        <Label htmlFor="inviteCode">Código de Convite</Label>
        <div className="flex gap-2">
          <Input
            id="inviteCode"
            type="text"
            placeholder="MEG-XXXX-XXXX"
            value={formData.inviteCode}
            onChange={(e) =>
              setFormData({ ...formData, inviteCode: e.target.value.toUpperCase() })
            }
            required
            disabled={isLoading || inviteValidated}
            className="h-11"
          />
          {!inviteValidated && (
            <Button
              type="button"
              onClick={validateInviteCode}
              disabled={isLoading}
              variant="outline"
            >
              Validar
            </Button>
          )}
          {inviteValidated && (
            <div className="flex items-center text-green-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
          )}
        </div>
        {errors.inviteCode && (
          <p className="text-sm text-destructive">{errors.inviteCode}</p>
        )}
      </div>

      {inviteValidated && (
        <>
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu.email@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={isLoading}
              className="h-11"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Mínimo 8 caracteres"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              disabled={isLoading}
              className="h-11"
            />
            {errors.password && (
              <p className="text-sm text-destructive">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Digite a senha novamente"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              disabled={isLoading}
              className="h-11"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-destructive">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Full Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Dr. João Silva"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              disabled={isLoading}
              className="h-11"
            />
            {errors.fullName && (
              <p className="text-sm text-destructive">{errors.fullName}</p>
            )}
          </div>

          {/* CPF */}
          <div className="space-y-2">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              type="text"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
              required
              disabled={isLoading}
              className="h-11"
            />
            {errors.cpf && <p className="text-sm text-destructive">{errors.cpf}</p>}
          </div>

          {/* Phone (optional) */}
          <div className="space-y-2">
            <Label htmlFor="phone">Telefone (Opcional)</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={isLoading}
              className="h-11"
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone}</p>
            )}
          </div>

          {/* Specialty (optional) */}
          <div className="space-y-2">
            <Label htmlFor="specialty">Especialidade (Opcional)</Label>
            <Input
              id="specialty"
              type="text"
              placeholder="Ex: Cardiologia"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              disabled={isLoading}
              className="h-11"
            />
          </div>

          {/* CRM (optional) */}
          <div className="space-y-2">
            <Label htmlFor="crm">CRM (Opcional)</Label>
            <Input
              id="crm"
              type="text"
              placeholder="Ex: CRM-SP 123456"
              value={formData.crm}
              onChange={(e) => setFormData({ ...formData, crm: e.target.value })}
              disabled={isLoading}
              className="h-11"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Criando conta...
              </>
            ) : (
              'Criar Conta'
            )}
          </Button>
        </>
      )}

      <p className="text-center text-sm text-muted-foreground">
        Já possui uma conta?{' '}
        <Link href="/login" className="text-primary hover:underline font-medium">
          Fazer login
        </Link>
      </p>
    </form>
  )
}
