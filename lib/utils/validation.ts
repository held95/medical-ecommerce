/**
 * Validation Utilities
 * CPF validation and other form validations
 */

/**
 * Validates Brazilian CPF format
 * Accepts: XXX.XXX.XXX-XX or XXXXXXXXXXX
 */
export function validateCPFFormat(cpf: string): boolean {
  if (!cpf) return false

  // Remove any whitespace
  const cleanCPF = cpf.trim()

  // Check if matches format: XXX.XXX.XXX-XX or XXXXXXXXXXX
  const formatWithMask = /^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$/
  const formatWithoutMask = /^[0-9]{11}$/

  return formatWithMask.test(cleanCPF) || formatWithoutMask.test(cleanCPF)
}

/**
 * Formats CPF to standard format: XXX.XXX.XXX-XX
 */
export function formatCPF(cpf: string): string {
  // Remove all non-numeric characters
  const numbers = cpf.replace(/\D/g, '')

  // If not 11 digits, return as is
  if (numbers.length !== 11) return cpf

  // Format as XXX.XXX.XXX-XX
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

/**
 * Removes CPF formatting (returns only numbers)
 */
export function removeCPFFormatting(cpf: string): string {
  return cpf.replace(/\D/g, '')
}

/**
 * Validates email format
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validates phone format (Brazilian)
 * Accepts: (XX) XXXXX-XXXX or XXXXXXXXXXX
 */
export function validatePhoneFormat(phone: string): boolean {
  if (!phone) return true // Phone is optional

  const cleanPhone = phone.trim()
  const formatWithMask = /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/
  const formatWithoutMask = /^[0-9]{10,11}$/

  return formatWithMask.test(cleanPhone) || formatWithoutMask.test(cleanPhone)
}

/**
 * Formats phone to standard format: (XX) XXXXX-XXXX
 */
export function formatPhone(phone: string): string {
  const numbers = phone.replace(/\D/g, '')

  if (numbers.length === 11) {
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  } else if (numbers.length === 10) {
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
  }

  return phone
}

/**
 * Validates password strength
 * Minimum 8 characters, at least one letter and one number
 */
export function validatePassword(password: string): {
  isValid: boolean
  message?: string
} {
  if (!password || password.length < 8) {
    return { isValid: false, message: 'Password must be at least 8 characters' }
  }

  if (!/[A-Za-z]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one letter' }
  }

  if (!/[0-9]/.test(password)) {
    return { isValid: false, message: 'Password must contain at least one number' }
  }

  return { isValid: true }
}
