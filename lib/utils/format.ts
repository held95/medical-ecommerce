/**
 * Formatting Utilities
 * Date, currency, and text formatting
 */

import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Formats date to Brazilian format: DD/MM/YYYY
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, 'dd/MM/yyyy', { locale: ptBR })
}

/**
 * Formats date with time: DD/MM/YYYY às HH:mm
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })
}

/**
 * Formats date as relative time: "2 days ago"
 */
export function formatRelativeTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true, locale: ptBR })
}

/**
 * Formats currency to Brazilian Real
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

/**
 * Truncates text to specified length with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

/**
 * Capitalizes first letter of each word
 */
export function capitalizeWords(text: string): string {
  return text.replace(/\b\w/g, (char) => char.toUpperCase())
}

/**
 * Formats booking status to Portuguese
 */
export function formatBookingStatus(status: string): string {
  const statusMap: Record<string, string> = {
    pending: 'Pendente',
    confirmed: 'Confirmado',
    completed: 'Concluído',
    cancelled: 'Cancelado',
  }
  return statusMap[status] || status
}

/**
 * Formats availability type to Portuguese
 */
export function formatAvailabilityType(type: string): string {
  const typeMap: Record<string, string> = {
    limited: 'Disponibilidade Limitada',
    open: 'Disponível',
    request_only: 'Solicite Acesso',
  }
  return typeMap[type] || type
}
