-- Premium Medical Ecommerce Platform
-- Seed Data (Categories & Sample Experiences)
-- Created: 2026-02-07

-- ============================================
-- SEED CATEGORIES
-- ============================================
INSERT INTO categories (name, slug, description, icon, display_order, is_active) VALUES
  (
    'Premium Travel & Retreats',
    'premium-travel',
    'Exclusive travel experiences and wellness retreats designed for medical professionals',
    'plane',
    1,
    true
  ),
  (
    'Health, Wellness & Performance',
    'health-wellness',
    'Advanced health optimization, wellness programs, and performance coaching',
    'heart-pulse',
    2,
    true
  ),
  (
    'Lifestyle & Comfort',
    'lifestyle-comfort',
    'Premium lifestyle services, home improvements, and comfort solutions',
    'home',
    3,
    true
  ),
  (
    'Mobility & Vehicles',
    'mobility-vehicles',
    'Exclusive vehicle access, maintenance services, and mobility solutions',
    'car',
    4,
    true
  ),
  (
    'Technology & Professional Tools',
    'technology-tools',
    'Latest technology, professional equipment, and productivity tools',
    'laptop',
    5,
    true
  ),
  (
    'Education & Career Growth',
    'education-career',
    'Professional development, specialized training, and career advancement opportunities',
    'graduation-cap',
    6,
    true
  );

-- ============================================
-- SEED SAMPLE PARTNER
-- ============================================
INSERT INTO partners (name, contact_email, contact_phone, commission_percentage, is_active) VALUES
  ('MEG Concierge Services', 'partners@meg.com.br', '5511999999999', 0.00, true);

-- ============================================
-- SEED SAMPLE EXPERIENCES
-- ============================================

-- Get category IDs for reference
DO $$
DECLARE
  cat_travel UUID;
  cat_wellness UUID;
  cat_lifestyle UUID;
  cat_mobility UUID;
  cat_tech UUID;
  cat_education UUID;
  partner_meg UUID;
BEGIN
  SELECT id INTO cat_travel FROM categories WHERE slug = 'premium-travel';
  SELECT id INTO cat_wellness FROM categories WHERE slug = 'health-wellness';
  SELECT id INTO cat_lifestyle FROM categories WHERE slug = 'lifestyle-comfort';
  SELECT id INTO cat_mobility FROM categories WHERE slug = 'mobility-vehicles';
  SELECT id INTO cat_tech FROM categories WHERE slug = 'technology-tools';
  SELECT id INTO cat_education FROM categories WHERE slug = 'education-career';
  SELECT id INTO partner_meg FROM partners WHERE name = 'MEG Concierge Services';

  -- Travel & Retreats
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, is_featured, is_active) VALUES
    (
      cat_travel,
      partner_meg,
      'Swiss Alps Wellness Retreat',
      'swiss-alps-wellness-retreat',
      '5-day exclusive wellness retreat in the Swiss Alps with spa treatments, yoga, and gourmet dining',
      'Experience ultimate relaxation at our curated 5-day wellness retreat in the Swiss Alps. This exclusive experience includes daily spa treatments, guided meditation sessions, yoga with mountain views, and gourmet meals prepared by Michelin-starred chefs. Limited to 12 participants per month for maximum exclusivity and personalized attention.',
      ARRAY['https://images.unsplash.com/photo-1506905925346-21bda4d32df4'],
      'limited',
      12,
      'Members-only',
      true,
      true
    ),
    (
      cat_travel,
      partner_meg,
      'Private Island Experience - Maldives',
      'maldives-private-island',
      'Exclusive 7-day private island access in the Maldives with personal concierge and water sports',
      'Escape to your own private paradise. This 7-day exclusive experience grants you access to a private island in the Maldives, complete with overwater villas, personal concierge service, private yacht access, and unlimited water sports activities. Perfect for a complete disconnection from daily stresses.',
      ARRAY['https://images.unsplash.com/photo-1514282401047-d79a71a590e8'],
      'request_only',
      NULL,
      'Request pricing',
      true,
      true
    );

  -- Health & Wellness
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, is_featured, is_active) VALUES
    (
      cat_wellness,
      partner_meg,
      'Advanced Health Check-up Program',
      'advanced-health-checkup',
      'Comprehensive preventive health screening with latest diagnostic technology',
      'Take control of your health with our comprehensive check-up program. Includes full-body MRI, advanced cardiovascular screening, genetic testing, nutritional analysis, and personalized wellness plan. All results reviewed by specialist physicians with detailed consultation.',
      ARRAY['https://images.unsplash.com/photo-1576091160399-112ba8d25d1d'],
      'open',
      NULL,
      'Included for Premium members',
      false,
      true
    ),
    (
      cat_wellness,
      partner_meg,
      'Personal Performance Coaching',
      'performance-coaching',
      '12-week program with elite performance coach focused on stress management and peak performance',
      'Achieve your peak potential with our 12-week personalized coaching program. Work one-on-one with elite performance coaches who specialize in helping medical professionals optimize their energy, manage stress, and achieve work-life balance. Includes bi-weekly sessions, 24/7 support access, and personalized protocols.',
      ARRAY['https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b'],
      'limited',
      20,
      'Members-only',
      false,
      true
    );

  -- Lifestyle & Comfort
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, is_featured, is_active) VALUES
    (
      cat_lifestyle,
      partner_meg,
      'Premium Home Office Setup',
      'premium-home-office',
      'Complete ergonomic home office design and installation with premium furniture and technology',
      'Transform your home workspace into a productivity haven. Our team of designers will create a custom ergonomic office setup including Herman Miller furniture, multi-monitor setup, acoustic treatment, and smart lighting. Installation and setup included.',
      ARRAY['https://images.unsplash.com/photo-1524758631624-e2822e304c36'],
      'open',
      NULL,
      'Exclusive pricing for members',
      false,
      true
    );

  -- Mobility & Vehicles
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, is_featured, is_active) VALUES
    (
      cat_mobility,
      partner_meg,
      'Luxury Vehicle Test Drive Experience',
      'luxury-vehicle-test-drive',
      'Private test drive sessions with latest luxury and electric vehicles',
      'Experience the latest luxury and electric vehicles in a private, no-pressure environment. Schedule exclusive test drives of vehicles from Tesla, Mercedes EQ, Porsche Taycan, and other premium brands. Our concierge handles all arrangements and provides expert consultation.',
      ARRAY['https://images.unsplash.com/photo-1492144534655-ae79c964c9d7'],
      'open',
      NULL,
      'Complimentary for members',
      false,
      true
    );

  -- Technology & Tools
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, is_featured, is_active) VALUES
    (
      cat_tech,
      partner_meg,
      'Latest Apple Product Access',
      'apple-products-access',
      'Priority access to new Apple products and exclusive trade-in offers',
      'Be among the first to access the latest Apple products. Members receive priority ordering for new releases, exclusive trade-in values on current devices, and white-glove setup service. Includes device configuration, data migration, and personalized training.',
      ARRAY['https://images.unsplash.com/photo-1591337676887-a217a6970a8a'],
      'open',
      NULL,
      'Members-only pricing',
      true,
      true
    );

  -- Education & Career
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, is_featured, is_active) VALUES
    (
      cat_education,
      partner_meg,
      'Executive MBA Program Access',
      'executive-mba-program',
      'Exclusive partnerships with top business schools for Executive MBA programs',
      'Advance your career with our exclusive partnerships with leading business schools. Members receive priority admission consideration, scholarship opportunities, and flexible payment plans for Executive MBA programs at institutions like FGV, Insper, and international partners.',
      ARRAY['https://images.unsplash.com/photo-1523050854058-8df90110c9f1'],
      'request_only',
      NULL,
      'Request information',
      false,
      true
    );

END $$;

-- ============================================
-- SEED MEMBERSHIP PLANS (For Future)
-- ============================================
INSERT INTO membership_plans (name, slug, price_monthly, price_yearly, features, is_active) VALUES
  (
    'Basic',
    'basic',
    0.00,
    0.00,
    '{
      "access_to_experiences": true,
      "concierge_support": "Standard",
      "invites_per_month": 3,
      "priority_booking": false
    }'::jsonb,
    true
  ),
  (
    'Premium',
    'premium',
    297.00,
    2970.00,
    '{
      "access_to_experiences": true,
      "concierge_support": "Priority",
      "invites_per_month": 10,
      "priority_booking": true,
      "exclusive_events": true,
      "annual_health_checkup": true
    }'::jsonb,
    false
  ),
  (
    'Elite',
    'elite',
    997.00,
    9970.00,
    '{
      "access_to_experiences": true,
      "concierge_support": "24/7 Dedicated",
      "invites_per_month": "unlimited",
      "priority_booking": true,
      "exclusive_events": true,
      "annual_health_checkup": true,
      "personal_assistant": true,
      "custom_experiences": true
    }'::jsonb,
    false
  );

-- ============================================
-- CREATE INITIAL ADMIN INVITE (OPTIONAL)
-- ============================================
-- Uncomment and customize to create initial invite for platform admin
-- INSERT INTO invites (code, invited_email, status, expires_at) VALUES
--   ('MEG-ADMIN-2026', 'admin@meg.com.br', 'pending', TIMEZONE('utc', NOW()) + INTERVAL '90 days');

-- ============================================
-- VERIFICATION QUERIES
-- ============================================
-- Run these to verify seed data was inserted correctly:
-- SELECT COUNT(*) FROM categories;
-- SELECT COUNT(*) FROM experiences;
-- SELECT name, slug FROM categories ORDER BY display_order;
