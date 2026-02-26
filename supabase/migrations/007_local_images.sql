-- ProTime Platform
-- Replace all external image URLs with local SVG files served from /public/images/
-- Run in Supabase SQL Editor

-- Travel
UPDATE experiences SET images = ARRAY['/images/cat-travel.svg']     WHERE slug IN ('swiss-alps-wellness-retreat','maldives-private-island','retiro-gramado','cruzeiro-mediterraneo','pousada-trancoso');

-- Wellness
UPDATE experiences SET images = ARRAY['/images/cat-wellness.svg']   WHERE slug IN ('advanced-health-checkup','performance-coaching','imersao-biohacking','massagem-terapeutica','nutricao-funcional');

-- Lifestyle
UPDATE experiences SET images = ARRAY['/images/cat-lifestyle.svg']  WHERE slug IN ('premium-home-office','personal-shopper','chef-particular','lavanderia-premium');

-- Mobility
UPDATE experiences SET images = ARRAY['/images/cat-mobility.svg']   WHERE slug IN ('luxury-vehicle-test-drive','motorista-executivo','manutencao-veiculo','moto-eletrica');

-- Technology
UPDATE experiences SET images = ARRAY['/images/cat-technology.svg'] WHERE slug IN ('apple-products-access','samsung-galaxy-s25','setup-telemedicina','adobe-creative-cloud');

-- Education
UPDATE experiences SET images = ARRAY['/images/cat-education.svg']  WHERE slug IN ('executive-mba-program','workshop-gestao-consultorio','coaching-lideranca-medica','biblioteca-medica-digital');

-- Verify
-- SELECT slug, images FROM experiences ORDER BY slug;
