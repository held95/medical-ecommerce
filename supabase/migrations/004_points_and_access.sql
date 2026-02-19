-- ProTime Platform
-- Points economy, medical access controls, and points ledger
-- Created: 2026-02-19

-- ============================================
-- SCHEMA UPDATES
-- ============================================
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS points_balance INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS points_lifetime_earned INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS access_status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (access_status IN ('active', 'suspended', 'pending_validation')),
  ADD COLUMN IF NOT EXISTS medical_verified BOOLEAN NOT NULL DEFAULT false;

ALTER TABLE experiences
  ADD COLUMN IF NOT EXISTS points_cost INTEGER NOT NULL DEFAULT 0;

ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS points_cost_snapshot INTEGER,
  ADD COLUMN IF NOT EXISTS points_status VARCHAR(20) NOT NULL DEFAULT 'not_applicable' CHECK (points_status IN ('not_applicable', 'reserved', 'debited', 'released'));

CREATE TABLE IF NOT EXISTS points_ledger (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('earn', 'redeem', 'refund', 'adjustment')),
  points INTEGER NOT NULL,
  balance_after INTEGER NOT NULL CHECK (balance_after >= 0),
  reason TEXT,
  source VARCHAR(100) NOT NULL DEFAULT 'system',
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- ============================================
-- DATA MIGRATION
-- ============================================
UPDATE experiences
SET points_cost = CASE
  WHEN LOWER(COALESCE(price_display, '')) LIKE '%request%' THEN 5000
  WHEN LOWER(COALESCE(price_display, '')) LIKE '%member%' OR LOWER(COALESCE(price_display, '')) LIKE '%exclusive%' THEN 1000
  ELSE 1000
END
WHERE points_cost = 0;

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_profiles_points_balance ON profiles(points_balance);
CREATE INDEX IF NOT EXISTS idx_points_ledger_user_created ON points_ledger(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_user_points_status ON bookings(user_id, points_status);

-- ============================================
-- RLS
-- ============================================
ALTER TABLE points_ledger ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'points_ledger' AND policyname = 'Users can view own points ledger'
  ) THEN
    CREATE POLICY "Users can view own points ledger"
      ON points_ledger FOR SELECT
      USING (auth.uid() = user_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'points_ledger' AND policyname = 'Service role full access to points ledger'
  ) THEN
    CREATE POLICY "Service role full access to points ledger"
      ON points_ledger FOR ALL
      USING (auth.jwt()->>'role' = 'service_role');
  END IF;
END $$;

-- ============================================
-- FUNCTIONS / RPC
-- ============================================
CREATE OR REPLACE FUNCTION reserve_points_for_booking(
  p_user_id UUID,
  p_experience_id UUID,
  p_booking_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_points_cost INTEGER;
  v_points_balance INTEGER;
  v_access_status VARCHAR(20);
BEGIN
  SELECT points_cost
  INTO v_points_cost
  FROM experiences
  WHERE id = p_experience_id AND is_active = true;

  IF v_points_cost IS NULL THEN
    RAISE EXCEPTION 'Experi�ncia inv�lida';
  END IF;

  SELECT points_balance, access_status
  INTO v_points_balance, v_access_status
  FROM profiles
  WHERE id = p_user_id
  FOR UPDATE;

  IF v_points_balance IS NULL THEN
    RAISE EXCEPTION 'Perfil n�o encontrado';
  END IF;

  IF v_access_status <> 'active' THEN
    RAISE EXCEPTION 'Acesso bloqueado para reservas';
  END IF;

  IF v_points_balance < v_points_cost THEN
    RAISE EXCEPTION 'Pontos insuficientes';
  END IF;

  UPDATE bookings
  SET points_cost_snapshot = v_points_cost,
      points_status = 'reserved'
  WHERE id = p_booking_id
    AND user_id = p_user_id
    AND experience_id = p_experience_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION confirm_booking_points_deduction(
  p_booking_id UUID
)
RETURNS VOID AS $$
DECLARE
  v_user_id UUID;
  v_points_cost INTEGER;
  v_balance INTEGER;
BEGIN
  SELECT user_id, COALESCE(points_cost_snapshot, 0)
  INTO v_user_id, v_points_cost
  FROM bookings
  WHERE id = p_booking_id
  FOR UPDATE;

  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Reserva n�o encontrada';
  END IF;

  IF v_points_cost <= 0 THEN
    RAISE EXCEPTION 'Reserva sem custo em pontos';
  END IF;

  SELECT points_balance INTO v_balance
  FROM profiles
  WHERE id = v_user_id
  FOR UPDATE;

  IF v_balance < v_points_cost THEN
    RAISE EXCEPTION 'Pontos insuficientes para confirma��o';
  END IF;

  UPDATE profiles
  SET points_balance = points_balance - v_points_cost
  WHERE id = v_user_id;

  UPDATE bookings
  SET status = CASE WHEN status = 'pending' THEN 'confirmed' ELSE status END,
      confirmed_date = CASE WHEN confirmed_date IS NULL THEN TIMEZONE('utc', NOW()) ELSE confirmed_date END,
      points_status = 'debited'
  WHERE id = p_booking_id;

  INSERT INTO points_ledger (user_id, booking_id, type, points, balance_after, reason, source)
  SELECT
    v_user_id,
    p_booking_id,
    'redeem',
    -v_points_cost,
    p.points_balance,
    'Resgate confirmado da reserva',
    'booking_confirmation'
  FROM profiles p
  WHERE p.id = v_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION release_reserved_points(
  p_booking_id UUID
)
RETURNS VOID AS $$
BEGIN
  UPDATE bookings
  SET points_status = 'released',
      status = CASE WHEN status = 'pending' THEN 'cancelled' ELSE status END,
      updated_at = TIMEZONE('utc', NOW())
  WHERE id = p_booking_id
    AND points_status = 'reserved';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION award_points(
  p_user_id UUID,
  p_points INTEGER,
  p_reason TEXT,
  p_source VARCHAR(100),
  p_created_by UUID DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_balance_after INTEGER;
BEGIN
  IF p_points <= 0 THEN
    RAISE EXCEPTION 'Quantidade de pontos deve ser positiva';
  END IF;

  UPDATE profiles
  SET points_balance = points_balance + p_points,
      points_lifetime_earned = points_lifetime_earned + p_points
  WHERE id = p_user_id
  RETURNING points_balance INTO v_balance_after;

  IF v_balance_after IS NULL THEN
    RAISE EXCEPTION 'Perfil n�o encontrado';
  END IF;

  INSERT INTO points_ledger (user_id, type, points, balance_after, reason, source, created_by)
  VALUES (p_user_id, 'earn', p_points, v_balance_after, p_reason, COALESCE(p_source, 'admin_award'), p_created_by);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION adjust_points(
  p_user_id UUID,
  p_points INTEGER,
  p_reason TEXT,
  p_source VARCHAR(100),
  p_created_by UUID DEFAULT NULL
)
RETURNS VOID AS $$
DECLARE
  v_current_balance INTEGER;
  v_balance_after INTEGER;
BEGIN
  IF p_points = 0 THEN
    RAISE EXCEPTION 'Ajuste n�o pode ser zero';
  END IF;

  SELECT points_balance INTO v_current_balance
  FROM profiles
  WHERE id = p_user_id
  FOR UPDATE;

  IF v_current_balance IS NULL THEN
    RAISE EXCEPTION 'Perfil n�o encontrado';
  END IF;

  v_balance_after := v_current_balance + p_points;

  IF v_balance_after < 0 THEN
    RAISE EXCEPTION 'Saldo n�o pode ficar negativo';
  END IF;

  UPDATE profiles
  SET points_balance = v_balance_after,
      points_lifetime_earned = CASE WHEN p_points > 0 THEN points_lifetime_earned + p_points ELSE points_lifetime_earned END
  WHERE id = p_user_id;

  INSERT INTO points_ledger (user_id, type, points, balance_after, reason, source, created_by)
  VALUES (p_user_id, 'adjustment', p_points, v_balance_after, p_reason, COALESCE(p_source, 'admin_adjustment'), p_created_by);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON TABLE points_ledger IS 'Auditable points transactions ledger';
