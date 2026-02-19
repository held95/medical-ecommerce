# ProTime - Plataforma Exclusiva para Medicos

Plataforma privada de beneficios para medicos da ProTime, com economia 100% baseada em pontos.

## Stack
- Next.js + TypeScript
- Supabase (Postgres, Auth, RLS)
- Tailwind + shadcn/ui

## Novidades implementadas
- Rebranding completo para ProTime
- Catalogo e reservas com custo em pontos (`points_cost`)
- Carteira de pontos por medico (`profiles.points_balance`)
- Ledger auditavel (`points_ledger`)
- Reserva com debito apenas na confirmacao
- Endpoints API para criar reserva, confirmar reserva e ajustar pontos (admin)
- Base para integracao AWS hibrida (Cognito + Lambda + EventBridge)

## Migrations
Execute em ordem:
1. `supabase/migrations/001_initial_schema.sql`
2. `supabase/migrations/002_rls_policies.sql`
3. `supabase/migrations/003_seed_data.sql`
4. `supabase/migrations/004_points_and_access.sql`

## Endpoints
- `POST /api/bookings`
- `POST /api/bookings/[id]/confirm`
- `POST /api/admin/points/adjust`

## AWS (modelo hibrido)
Recomendado para producao:
- Cognito User Pool para identidade e grupos (`doctor_basic`, `doctor_premium`, `doctor_elite`, `admin`)
- API Gateway + Lambda para administracao de pontos
- EventBridge para eventos de negocio (`booking_confirmed`, `points_debited`, `points_refunded`)
- CloudWatch para logs/metricas/alertas
- Secrets Manager para credenciais

## Variaveis de ambiente
Use `.env.local.example` como base.

## Rodar localmente
```bash
npm install
npm run dev
```