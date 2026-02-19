/**
 * Platform Layout
 * Wraps all protected pages with Header and Footer
 */

import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { redirect } from 'next/navigation'
import type { Profile } from '@/types/models'

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/unauthorized')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single() as { data: Profile | null; error: any }

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        userEmail={user.email}
        userName={profile?.full_name}
        pointsBalance={profile?.points_balance || 0}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}