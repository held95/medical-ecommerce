-- Premium Medical Ecommerce Platform
-- Initial Database Schema
-- Created: 2026-02-07

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (Doctor Information)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  cpf VARCHAR(14) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  specialty VARCHAR(100),
  crm VARCHAR(20),
  membership_tier VARCHAR(50) DEFAULT 'basic' CHECK (membership_tier IN ('basic', 'premium', 'elite')),
  available_invites INTEGER DEFAULT 3 CHECK (available_invites >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add index for performance
CREATE INDEX idx_profiles_cpf ON profiles(cpf);
CREATE INDEX idx_profiles_membership_tier ON profiles(membership_tier);

-- ============================================
-- INVITES TABLE (Invite System)
-- ============================================
CREATE TABLE invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(50) UNIQUE NOT NULL,
  invited_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  invited_email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'used', 'expired')),
  used_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE
);

-- Add indexes
CREATE INDEX idx_invites_code ON invites(code);
CREATE INDEX idx_invites_status ON invites(status);
CREATE INDEX idx_invites_invited_by ON invites(invited_by);

-- ============================================
-- PARTNERS TABLE (Hidden from users)
-- ============================================
CREATE TABLE partners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  contact_email VARCHAR(255),
  contact_phone VARCHAR(20),
  commission_percentage DECIMAL(5,2) CHECK (commission_percentage >= 0 AND commission_percentage <= 100),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add index
CREATE INDEX idx_partners_is_active ON partners(is_active);

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_display_order ON categories(display_order);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- ============================================
-- EXPERIENCES TABLE (Products/Services)
-- ============================================
CREATE TABLE experiences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  short_description VARCHAR(500),
  full_description TEXT,
  images TEXT[] DEFAULT '{}',
  availability_type VARCHAR(20) DEFAULT 'open' CHECK (availability_type IN ('limited', 'open', 'request_only')),
  max_availability INTEGER CHECK (max_availability > 0),
  current_bookings INTEGER DEFAULT 0 CHECK (current_bookings >= 0),
  price_display VARCHAR(100) DEFAULT 'Exclusive for members',
  is_featured BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_experiences_slug ON experiences(slug);
CREATE INDEX idx_experiences_category_id ON experiences(category_id);
CREATE INDEX idx_experiences_is_featured ON experiences(is_featured);
CREATE INDEX idx_experiences_is_active ON experiences(is_active);
CREATE INDEX idx_experiences_availability_type ON experiences(availability_type);

-- ============================================
-- BOOKINGS TABLE (Requests & Reservations)
-- ============================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  experience_id UUID REFERENCES experiences(id) ON DELETE CASCADE NOT NULL,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  booking_type VARCHAR(20) DEFAULT 'request' CHECK (booking_type IN ('instant', 'request')),
  requested_date TIMESTAMP WITH TIME ZONE,
  confirmed_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  concierge_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_experience_id ON bookings(experience_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);

-- ============================================
-- MEMBERSHIP PLANS TABLE (Future monetization)
-- ============================================
CREATE TABLE membership_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  price_monthly DECIMAL(10,2) CHECK (price_monthly >= 0),
  price_yearly DECIMAL(10,2) CHECK (price_yearly >= 0),
  features JSONB DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Add indexes
CREATE INDEX idx_membership_plans_slug ON membership_plans(slug);
CREATE INDEX idx_membership_plans_is_active ON membership_plans(is_active);

-- ============================================
-- FUNCTIONS FOR AUTO-UPDATING TIMESTAMPS
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_experiences_updated_at BEFORE UPDATE ON experiences
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- FUNCTION TO VALIDATE CPF FORMAT
-- ============================================
CREATE OR REPLACE FUNCTION validate_cpf_format(cpf TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if CPF matches format: XXX.XXX.XXX-XX or XXXXXXXXXXX
  RETURN cpf ~ '^[0-9]{3}\.[0-9]{3}\.[0-9]{3}-[0-9]{2}$'
      OR cpf ~ '^[0-9]{11}$';
END;
$$ LANGUAGE plpgsql;

-- Add constraint to validate CPF format
ALTER TABLE profiles ADD CONSTRAINT cpf_format_check
  CHECK (validate_cpf_format(cpf));

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================
COMMENT ON TABLE profiles IS 'Doctor profiles with membership information';
COMMENT ON TABLE invites IS 'Invite-only registration system';
COMMENT ON TABLE categories IS 'Experience categories (Travel, Wellness, etc.)';
COMMENT ON TABLE experiences IS 'Premium experiences and benefits for members';
COMMENT ON TABLE bookings IS 'Booking requests and confirmations';
COMMENT ON TABLE partners IS 'Partner organizations (hidden from users)';
COMMENT ON TABLE membership_plans IS 'Future membership tier configurations';
