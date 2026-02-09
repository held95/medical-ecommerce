'use client';

import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  HeartPulse,
  GraduationCap,
  UtensilsCrossed,
  Dumbbell,
  Plane,
  ShoppingBag,
  Car,
  Home,
  Sparkles,
  ArrowRight,
  Gift,
  TrendingUp,
  Users,
  Shield
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-medium">Exclusivo para colaboradores M&G</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Benefícios Exclusivos<br />
              <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
                que transformam vidas
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Descontos especiais, vantagens únicas e oportunidades pensadas especialmente para você que faz parte da família M&G
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8">
                Explorar Benefícios
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8">
                <Gift className="mr-2 h-5 w-5" />
                Como Funciona
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 -mt-10 relative z-20">
          <Card className="bg-white border-none shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="pt-6 pb-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">120+</div>
              <p className="text-sm text-gray-600">Parceiros Exclusivos</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="pt-6 pb-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">70%</div>
              <p className="text-sm text-gray-600">Descontos de até</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="pt-6 pb-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">5.000+</div>
              <p className="text-sm text-gray-600">Colaboradores Ativos</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-xl hover:shadow-2xl transition-all">
            <CardContent className="pt-6 pb-6 text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="h-6 w-6 text-pink-600" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
              <p className="text-sm text-gray-600">Seguro e Confiável</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Nossos Benefícios
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Categorias especiais com descontos e vantagens exclusivas para você e sua família
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Saúde e Bem-Estar */}
            <Link href="/beneficios/saude">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br from-blue-500 to-cyan-500 h-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <HeartPulse className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Saúde & Bem-Estar
                  </h3>
                  <p className="text-sm text-white/80">
                    Consultas, exames e farmácias
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Educação */}
            <Link href="/beneficios/educacao">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br from-purple-500 to-pink-500 h-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <GraduationCap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Educação
                  </h3>
                  <p className="text-sm text-white/80">
                    Cursos, faculdades e idiomas
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Alimentação */}
            <Link href="/beneficios/alimentacao">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br from-orange-500 to-red-500 h-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Alimentação
                  </h3>
                  <p className="text-sm text-white/80">
                    Restaurantes e delivery
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Fitness */}
            <Link href="/beneficios/fitness">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br from-green-500 to-emerald-500 h-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Dumbbell className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Fitness
                  </h3>
                  <p className="text-sm text-white/80">
                    Academias e personal trainer
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Viagens */}
            <Link href="/beneficios/viagens">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br from-sky-500 to-blue-600 h-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Plane className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Viagens
                  </h3>
                  <p className="text-sm text-white/80">
                    Hotéis, passagens e pacotes
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Compras */}
            <Link href="/beneficios/compras">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br from-pink-500 to-rose-500 h-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <ShoppingBag className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Compras
                  </h3>
                  <p className="text-sm text-white/80">
                    Lojas e e-commerce
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Automotivo */}
            <Link href="/beneficios/automotivo">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br from-slate-600 to-gray-700 h-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Car className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Automotivo
                  </h3>
                  <p className="text-sm text-white/80">
                    Oficinas e seguros
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Casa e Decoração */}
            <Link href="/beneficios/casa">
              <Card className="border-none shadow-lg hover:shadow-2xl transition-all cursor-pointer group bg-gradient-to-br from-amber-500 to-orange-600 h-full">
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Home className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Casa & Decoração
                  </h3>
                  <p className="text-sm text-white/80">
                    Móveis e utilidades
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 border-none shadow-2xl">
          <CardContent className="py-12 px-6 text-center">
            <Sparkles className="h-12 w-12 text-yellow-300 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4">
              Comece a aproveitar seus benefícios agora!
            </h3>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Acesse com seu email corporativo M&G e descubra todas as vantagens exclusivas
            </p>
            <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 font-semibold text-lg px-8">
              Fazer Login
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
