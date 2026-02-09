/**
 * Database Types
 * Generated types matching Supabase database schema
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          cpf: string
          full_name: string
          phone: string | null
          specialty: string | null
          crm: string | null
          membership_tier: 'basic' | 'premium' | 'elite'
          available_invites: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          cpf: string
          full_name: string
          phone?: string | null
          specialty?: string | null
          crm?: string | null
          membership_tier?: 'basic' | 'premium' | 'elite'
          available_invites?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          cpf?: string
          full_name?: string
          phone?: string | null
          specialty?: string | null
          crm?: string | null
          membership_tier?: 'basic' | 'premium' | 'elite'
          available_invites?: number
          created_at?: string
          updated_at?: string
        }
      }
      invites: {
        Row: {
          id: string
          code: string
          invited_by: string | null
          invited_email: string | null
          status: 'pending' | 'used' | 'expired'
          used_by: string | null
          expires_at: string | null
          created_at: string
          used_at: string | null
        }
        Insert: {
          id?: string
          code: string
          invited_by?: string | null
          invited_email?: string | null
          status?: 'pending' | 'used' | 'expired'
          used_by?: string | null
          expires_at?: string | null
          created_at?: string
          used_at?: string | null
        }
        Update: {
          id?: string
          code?: string
          invited_by?: string | null
          invited_email?: string | null
          status?: 'pending' | 'used' | 'expired'
          used_by?: string | null
          expires_at?: string | null
          created_at?: string
          used_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          display_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      experiences: {
        Row: {
          id: string
          category_id: string | null
          partner_id: string | null
          title: string
          slug: string
          short_description: string | null
          full_description: string | null
          images: string[]
          availability_type: 'limited' | 'open' | 'request_only'
          max_availability: number | null
          current_bookings: number
          price_display: string
          is_featured: boolean
          is_active: boolean
          metadata: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id?: string | null
          partner_id?: string | null
          title: string
          slug: string
          short_description?: string | null
          full_description?: string | null
          images?: string[]
          availability_type?: 'limited' | 'open' | 'request_only'
          max_availability?: number | null
          current_bookings?: number
          price_display?: string
          is_featured?: boolean
          is_active?: boolean
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string | null
          partner_id?: string | null
          title?: string
          slug?: string
          short_description?: string | null
          full_description?: string | null
          images?: string[]
          availability_type?: 'limited' | 'open' | 'request_only'
          max_availability?: number | null
          current_bookings?: number
          price_display?: string
          is_featured?: boolean
          is_active?: boolean
          metadata?: Json
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          user_id: string
          experience_id: string
          status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          booking_type: 'instant' | 'request'
          requested_date: string | null
          confirmed_date: string | null
          notes: string | null
          concierge_notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          experience_id: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          booking_type?: 'instant' | 'request'
          requested_date?: string | null
          confirmed_date?: string | null
          notes?: string | null
          concierge_notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          experience_id?: string
          status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
          booking_type?: 'instant' | 'request'
          requested_date?: string | null
          confirmed_date?: string | null
          notes?: string | null
          concierge_notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      partners: {
        Row: {
          id: string
          name: string
          contact_email: string | null
          contact_phone: string | null
          commission_percentage: number | null
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          contact_email?: string | null
          contact_phone?: string | null
          commission_percentage?: number | null
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          contact_email?: string | null
          contact_phone?: string | null
          commission_percentage?: number | null
          is_active?: boolean
          created_at?: string
        }
      }
      membership_plans: {
        Row: {
          id: string
          name: string
          slug: string
          price_monthly: number | null
          price_yearly: number | null
          features: Json
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          price_monthly?: number | null
          price_yearly?: number | null
          features?: Json
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          price_monthly?: number | null
          price_yearly?: number | null
          features?: Json
          is_active?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
