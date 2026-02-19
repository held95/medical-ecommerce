'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Sparkles, ArrowRight, Coins, Shield, Users, Gift } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">ProTime</span>
          <Button asChild variant="outline">
            <Link href="/login">Entrar</Link>
          </Button>
        </div>
      </header>

      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-6 py-20 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-yellow-300" />
            <span className="text-white font-medium">Exclusivo para medicos ProTime</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Beneficios por Pontos
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Quanto mais pontos voce acumula, mais experiencias premium pode desbloquear.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8">
              <Link href="/login">
                Explorar Beneficios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8">
              <Link href="/signup">
                <Gift className="mr-2 h-5 w-5" />
                Criar Conta
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white border-none shadow-xl"><CardContent className="pt-6 pb-6 text-center"><Coins className="h-6 w-6 text-blue-600 mx-auto mb-3" /><div className="text-3xl font-bold text-gray-900 mb-1">100%</div><p className="text-sm text-gray-600">Economia em Pontos</p></CardContent></Card>
          <Card className="bg-white border-none shadow-xl"><CardContent className="pt-6 pb-6 text-center"><Users className="h-6 w-6 text-green-600 mx-auto mb-3" /><div className="text-3xl font-bold text-gray-900 mb-1">5.000+</div><p className="text-sm text-gray-600">Medicos Ativos</p></CardContent></Card>
          <Card className="bg-white border-none shadow-xl"><CardContent className="pt-6 pb-6 text-center"><Gift className="h-6 w-6 text-purple-600 mx-auto mb-3" /><div className="text-3xl font-bold text-gray-900 mb-1">120+</div><p className="text-sm text-gray-600">Parceiros Exclusivos</p></CardContent></Card>
          <Card className="bg-white border-none shadow-xl"><CardContent className="pt-6 pb-6 text-center"><Shield className="h-6 w-6 text-pink-600 mx-auto mb-3" /><div className="text-3xl font-bold text-gray-900 mb-1">100%</div><p className="text-sm text-gray-600">Seguro e Confiavel</p></CardContent></Card>
        </div>
      </div>
    </div>
  )
}