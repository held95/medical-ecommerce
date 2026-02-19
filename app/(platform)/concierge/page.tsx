/**
 * Concierge Page
 */

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, Mail, Clock, Sparkles } from 'lucide-react'

export const metadata = {
  title: 'Concierge | ProTime',
  description: 'Entre em contato com nosso concierge dedicado',
}

export default function ConciergePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_CONCIERGE_WHATSAPP || '5511999999999'
  const conciergeEmail = process.env.NEXT_PUBLIC_CONCIERGE_EMAIL || 'concierge@protime.com.br'

  const whatsappMessage = encodeURIComponent('Ola! Sou membro ProTime e preciso de suporte com beneficios e pontos.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  return (
    <div className="min-h-screen bg-background">
      <section className="bg-gradient-to-b from-accent/10 to-background border-b border-border">
        <div className="container py-16 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 text-accent text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Atendimento Premium
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">Seu Concierge Pessoal</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Nossa equipe esta a disposicao para ajudar em reservas, pontos e experiencias sob medida.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card className="p-8 border-2 hover:border-accent transition-colors">
              <div className="h-14 w-14 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                <MessageCircle className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">WhatsApp</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">Resposta rapida durante horario comercial.</p>
              <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Abrir WhatsApp
                </a>
              </Button>
            </Card>

            <Card className="p-8 border-2 hover:border-accent transition-colors">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">E-mail</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">Envie sua solicitacao e retornaremos em ate 24 horas.</p>
              <Button asChild size="lg" variant="outline" className="w-full">
                <a href={`mailto:${conciergeEmail}`}>
                  <Mail className="mr-2 h-5 w-5" />
                  Enviar E-mail
                </a>
              </Button>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <Clock className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-2">Horario de Atendimento</h3>
                <p className="text-muted-foreground">
                  Segunda a Sexta-feira: 9h as 18h (Brasilia)
                  <br />
                  Sabados: 9h as 13h
                </p>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}