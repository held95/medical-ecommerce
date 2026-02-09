-- Premium Medical Ecommerce Platform
-- Row Level Security (RLS) Policies
-- Created: 2026-02-07

-- ============================================
-- ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE invites ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PROFILES TABLE POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Users can insert their own profile (signup)
CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Service role can do anything (for admin operations)
CREATE POLICY "Service role full access to profiles"
  ON profiles FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- INVITES TABLE POLICIES
-- ============================================

-- Anyone can view pending invites by code (for validation during signup)
CREATE POLICY "Anyone can view pending invites by code"
  ON invites FOR SELECT
  USING (status = 'pending');

-- Users can view invites they created
CREATE POLICY "Users can view own invites"
  ON invites FOR SELECT
  USING (auth.uid() = invited_by);

-- Users can create new invites (if they have available invites)
CREATE POLICY "Users can create invites"
  ON invites FOR INSERT
  WITH CHECK (
    auth.uid() = invited_by
    AND EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND available_invites > 0
    )
  );

-- Service role full access (for invite generation and management)
CREATE POLICY "Service role full access to invites"
  ON invites FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- CATEGORIES TABLE POLICIES
-- ============================================

-- All authenticated users can view active categories
CREATE POLICY "Authenticated users can view active categories"
  ON categories FOR SELECT
  USING (auth.uid() IS NOT NULL AND is_active = true);

-- Service role full access
CREATE POLICY "Service role full access to categories"
  ON categories FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- EXPERIENCES TABLE POLICIES
-- ============================================

-- All authenticated users can view active experiences
CREATE POLICY "Authenticated users can view active experiences"
  ON experiences FOR SELECT
  USING (auth.uid() IS NOT NULL AND is_active = true);

-- Service role full access (for admin management)
CREATE POLICY "Service role full access to experiences"
  ON experiences FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- BOOKINGS TABLE POLICIES
-- ============================================

-- Users can view their own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create bookings for themselves
CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own pending bookings (to cancel, add notes, etc.)
CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Service role full access (for concierge management)
CREATE POLICY "Service role full access to bookings"
  ON bookings FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- PARTNERS TABLE POLICIES
-- ============================================

-- Only service role can access partners (hidden from users)
CREATE POLICY "Only service role can access partners"
  ON partners FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- MEMBERSHIP PLANS TABLE POLICIES
-- ============================================

-- All authenticated users can view active membership plans
CREATE POLICY "Authenticated users can view active plans"
  ON membership_plans FOR SELECT
  USING (auth.uid() IS NOT NULL AND is_active = true);

-- Service role full access
CREATE POLICY "Service role full access to plans"
  ON membership_plans FOR ALL
  USING (auth.jwt()->>'role' = 'service_role');

-- ============================================
-- HELPER FUNCTIONS FOR POLICIES
-- ============================================

-- Function to check if user has admin role (for future admin panel)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT COALESCE(
      (SELECT raw_user_meta_data->>'is_admin' FROM auth.users WHERE id = auth.uid())::BOOLEAN,
      FALSE
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement available invites when an invite is created
CREATE OR REPLACE FUNCTION decrement_invite_count()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET available_invites = available_invites - 1
  WHERE id = NEW.invited_by;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER decrement_invite_count_trigger
  AFTER INSERT ON invites
  FOR EACH ROW
  WHEN (NEW.invited_by IS NOT NULL)
  EXECUTE FUNCTION decrement_invite_count();

-- Function to increment bookings count on experiences
CREATE OR REPLACE FUNCTION increment_booking_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'confirmed' THEN
    UPDATE experiences
    SET current_bookings = current_bookings + 1
    WHERE id = NEW.experience_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_booking_count_trigger
  AFTER INSERT ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION increment_booking_count();

-- Function to decrement bookings count when booking is cancelled
CREATE OR REPLACE FUNCTION update_booking_count()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status = 'confirmed' AND NEW.status = 'cancelled' THEN
    UPDATE experiences
    SET current_bookings = GREATEST(current_bookings - 1, 0)
    WHERE id = NEW.experience_id;
  ELSIF OLD.status != 'confirmed' AND NEW.status = 'confirmed' THEN
    UPDATE experiences
    SET current_bookings = current_bookings + 1
    WHERE id = NEW.experience_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_booking_count_trigger
  AFTER UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_booking_count();

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================
COMMENT ON POLICY "Users can view own profile" ON profiles IS 'Doctors can only see their own profile';
COMMENT ON POLICY "Anyone can view pending invites by code" ON invites IS 'Allows invite validation during signup';
COMMENT ON POLICY "Authenticated users can view active experiences" ON experiences IS 'All members can browse experiences';
COMMENT ON POLICY "Users can view own bookings" ON bookings IS 'Doctors can only see their own bookings';
