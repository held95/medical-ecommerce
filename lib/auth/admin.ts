import type { User } from '@supabase/supabase-js'

export function isAdminUser(user: User): boolean {
  const role = user.app_metadata?.role
  const groups = user.app_metadata?.groups

  if (role === 'admin' || role === 'service_role') {
    return true
  }

  if (Array.isArray(groups) && groups.includes('admin')) {
    return true
  }

  return false
}