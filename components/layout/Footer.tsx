/**
 * Footer Component
 */

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">ProTime</h3>
            <p className="text-sm text-muted-foreground">Plataforma exclusiva de beneficios para medicos ProTime</p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Links Rapidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Inicio</Link></li>
              <li><Link href="/experiences" className="text-muted-foreground hover:text-foreground transition-colors">Experiencias</Link></li>
              <li><Link href="/concierge" className="text-muted-foreground hover:text-foreground transition-colors">Concierge</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>concierge@protime.com.br</li>
              <li>(11) 99999-9999</li>
              <li>Atendimento: Seg-Sex, 9h-18h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} ProTime. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}