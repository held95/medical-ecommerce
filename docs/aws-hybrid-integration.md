# AWS Integracao Hibrida (ProTime)

## Objetivo
Administrar acessos de medicos e operacoes de pontos com AWS, mantendo Next.js + Supabase como base do produto.

## Componentes
- AWS Cognito User Pool: identidade e grupos (`doctor_basic`, `doctor_premium`, `doctor_elite`, `admin`)
- API Gateway + Lambda (`points-admin-service`): ajustes administrativos de pontos
- EventBridge: eventos de negocio (`booking_confirmed`, `points_debited`, `points_refunded`)
- CloudWatch: logs, metricas e alarmes
- Secrets Manager: armazenar chaves sensiveis

## Fluxos
1. Cadastro/ativacao do medico:
- Medico cria conta via convite no Supabase.
- Lambda pos-confirmacao sincroniza atributos Cognito para `profiles` (tier, status, medical_verified).

2. Confirmacao de reserva:
- Concierge/Admin confirma reserva.
- API chama RPC `confirm_booking_points_deduction`.
- Debito registrado em `points_ledger`.
- Evento publicado no EventBridge.

3. Ajuste manual de pontos:
- Admin autenticado em grupo `admin` chama endpoint `/api/admin/points/adjust`.
- Endpoint executa RPC `adjust_points`.
- Operacao auditada no ledger e CloudWatch.

## Regras de seguranca
- IAM com privilegio minimo para Lambdas.
- Validacao de claims de grupo (admin) nos endpoints de administracao.
- Segredos apenas no Secrets Manager (nao hardcode em variaveis abertas).

## Observabilidade
- Alarme para falha de Lambda e aumento de erros 4xx/5xx do API Gateway.
- Dashboard CloudWatch com:
  - reservas confirmadas
  - pontos debitados
  - pontos estornados
  - ajustes manuais