/**
 * Concierge Page
 * Contact concierge service via WhatsApp or email
 */

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, Mail, Clock, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Concierge | MEG Exclusive',
  description: 'Entre em contato com nosso concierge dedicado',
}

export default function ConciergePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_CONCIERGE_WHATSAPP || '5511999999999'
  const conciergeEmail = process.env.NEXT_PUBLIC_CONCIERGE_EMAIL || 'concierge@meg.com.br'

  const whatsappMessage = encodeURIComponent(
    'Olá! Sou membro MEG Exclusive e gostaria de falar com o concierge.'
  )
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Atendimento Premium
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Seu Concierge Pessoal
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nossa equipe está à disposição para criar experiências sob medida,
              esclarecer dúvidas e cuidar de todos os detalhes para você.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* WhatsApp Card */}
            <Card className="p-8 border-2 hover:border-accent transition-colors">
              <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <MessageCircle className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                WhatsApp
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Resposta rápida via WhatsApp. Nossa equipe responde em minutos
                durante horário comercial.
              </p>
              <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Abrir WhatsApp
                </a>
              </Button>
            </Card>

            {/* Email Card */}
            <Card className="p-8 border-2 hover:border-accent transition-colors">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                E-mail
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Prefere e-mail? Envie sua solicitação e responderemos em até 24 horas.
              </p>
              <Button asChild size="lg" variant="outline" className="w-full">
                <a href={`mailto:${conciergeEmail}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Enviar E-mail
                </a>
              </Button>
            </Card>
          </div>

          {/* Services Info */}
          <div className="bg-muted/50 rounded-xl p-8 mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
              Como Podemos Ajudar?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">1</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Reservas Personalizadas
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Cuidamos de todos os detalhes das suas reservas e experiências
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">2</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Experiências Sob Medida
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Criamos experiências exclusivas baseadas nas suas preferências
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">3</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Suporte Prioritário
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Atendimento dedicado e prioritário para membros
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent font-bold">4</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">
                    Assessoria Completa
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Recomendações e orientações para aproveitar ao máximo
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Hours & Info */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">
                  Horário de Atendimento
                </h3>
                <p className="text-muted-foreground">
                  Segunda a Sexta-feira: 9h às 18h (Horário de Brasília)
                  <br />
                  Sábados: 9h às 13h
                  <br />
                  <span className="text-sm">
                    * Solicitações fora do horário serão atendidas no próximo dia útil
                  </span>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container pb-16 md:pb-20">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-12 text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">
            Pronto para começar?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Nossa equipe está aguardando para tornar sua experiência excepcional.
          </p>
          <Button asChild size="lg" variant="secondary" className="font-semibold">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="mr-2 h-5 w-5" />
              Falar Agora no WhatsApp
            </a>
          </Button>
        </div>
      </section>
    </div>
  )
}
