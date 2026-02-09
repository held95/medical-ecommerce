/**
 * Application Models
 * User-friendly types for the application layer
 */

import type { Database } from './database'

// Type aliases for database tables
export type Profile = Database['public']['Tables']['profiles']['Row']
export type Invite = Database['public']['Tables']['invites']['Row']
export type Category = Database['public']['Tables']['categories']['Row']
export type Experience = Database['public']['Tables']['experiences']['Row']
export type Booking = Database['public']['Tables']['bookings']['Row']
export type Partner = Database['public']['Tables']['partners']['Row']
export type MembershipPlan = Database['public']['Tables']['membership_plans']['Row']

// Extended types with relations
export interface ExperienceWithCategory extends Experience {
  category: Category | null
}

export interface BookingWithDetails extends Booking {
  experience: Experience | null
  user: Profile | null
}

// Form types for creating/updating
export interface SignupFormData {
  email: string
  password: string
  fullName: string
  cpf: string
  phone?: string
  specialty?: string
  crm?: string
}

export interface LoginFormData {
  email: string
  password: string
}

export interface ProfileUpdateData {
  full_name?: string
  phone?: string
  specialty?: string
  crm?: string
}

export interface BookingCreateData {
  experience_id: string
  requested_date?: string
  notes?: string
  booking_type?: 'instant' | 'request'
}

export interface InviteCreateData {
  invited_email: string
}

// UI-specific types
export interface ExperienceCardProps {
  experience: Experience
  category?: Category | null
}

export interface AvailabilityInfo {
  type: 'limited' | 'open' | 'request_only'
  available: boolean
  remaining?: number
  message: string
}

// Status badge variants
export type BookingStatusVariant = 'pending' | 'confirmed' | 'completed' | 'cancelled'
export type MembershipTierVariant = 'basic' | 'premium' | 'elite'

// Pagination
export interface PaginationParams {
  page: number
  pageSize: number
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Error handling
export interface ApiError {
  message: string
  code?: string
  details?: unknown
}

export interface ApiResponse<T> {
  data?: T
  error?: ApiError
  success: boolean
}
