'use client'

/**
 * Header Component
 * Main navigation with profile dropdown
 */

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { formatPoints } from '@/lib/utils/format'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { User, LogOut, Heart, MessageCircle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface HeaderProps {
  userEmail?: string
  userName?: string
  pointsBalance?: number
}

export function Header({ userEmail, userName, pointsBalance = 0 }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [initials, setInitials] = useState('U')

  useEffect(() => {
    if (userName) {
      const names = userName.split(' ')
      const firstInitial = names[0]?.charAt(0) || ''
      const lastInitial = names[names.length - 1]?.charAt(0) || ''
      setInitials((firstInitial + lastInitial).toUpperCase())
    }
  }, [userName])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { href: '/dashboard', label: 'Inicio' },
    { href: '/experiences', label: 'Experiencias' },
    { href: '/concierge', label: 'Concierge' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">ProTime</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === item.href ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center rounded-full border border-border px-3 py-1 text-xs font-semibold text-accent">
            {formatPoints(pointsBalance)} pts
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName || 'Usuario'}</p>
                  <p className="text-xs leading-none text-muted-foreground">{userEmail || ''}</p>
                  <p className="text-xs leading-none text-accent font-semibold">{formatPoints(pointsBalance)} pts</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/member/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Meu Perfil</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/member/bookings" className="cursor-pointer">
                  <Heart className="mr-2 h-4 w-4" />
                  <span>Minhas Reservas</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/concierge" className="cursor-pointer">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Concierge</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}