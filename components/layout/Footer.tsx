/**
 * Footer Component
 * Simple footer with links and copyright
 */

import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg text-primary mb-2">MEG Exclusive</h3>
            <p className="text-sm text-muted-foreground">
              Plataforma exclusiva de benefícios para médicos MEG
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/experiences"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Experiências
                </Link>
              </li>
              <li>
                <Link
                  href="/concierge"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3">Contato</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>concierge@meg.com.br</li>
              <li>(11) 99999-9999</li>
              <li>Atendimento: Seg-Sex, 9h-18h</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} MEG Exclusive. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
