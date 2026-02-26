-- ProTime Platform
-- Replace all Unsplash image URLs with picsum.photos (reliable CDN, no API key)
-- Run in Supabase SQL Editor

UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/swiss-alps/800/450']          WHERE slug = 'swiss-alps-wellness-retreat';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/maldives-island/800/450']     WHERE slug = 'maldives-private-island';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/health-checkup/800/450']      WHERE slug = 'advanced-health-checkup';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/performance/800/450']         WHERE slug = 'performance-coaching';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/home-office/800/450']         WHERE slug = 'premium-home-office';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/luxury-car/800/450']          WHERE slug = 'luxury-vehicle-test-drive';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/apple-tech/800/450']          WHERE slug = 'apple-products-access';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/mba-program/800/450']         WHERE slug = 'executive-mba-program';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/gramado-retiro/800/450']      WHERE slug = 'retiro-gramado';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/mediterraneo/800/450']        WHERE slug = 'cruzeiro-mediterraneo';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/trancoso/800/450']            WHERE slug = 'pousada-trancoso';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/biohacking/800/450']          WHERE slug = 'imersao-biohacking';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/massagem/800/450']            WHERE slug = 'massagem-terapeutica';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/nutricao/800/450']            WHERE slug = 'nutricao-funcional';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/personal-shopper/800/450']   WHERE slug = 'personal-shopper';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/chef-jantar/800/450']         WHERE slug = 'chef-particular';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/lavanderia/800/450']          WHERE slug = 'lavanderia-premium';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/motorista/800/450']           WHERE slug = 'motorista-executivo';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/manutencao-car/800/450']      WHERE slug = 'manutencao-veiculo';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/moto-eletrica/800/450']       WHERE slug = 'moto-eletrica';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/samsung-galaxy/800/450']      WHERE slug = 'samsung-galaxy-s25';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/telemedicina/800/450']        WHERE slug = 'setup-telemedicina';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/adobe-creative/800/450']      WHERE slug = 'adobe-creative-cloud';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/workshop-gestao/800/450']     WHERE slug = 'workshop-gestao-consultorio';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/coaching-lider/800/450']      WHERE slug = 'coaching-lideranca-medica';
UPDATE experiences SET images = ARRAY['https://picsum.photos/seed/biblioteca-med/800/450']      WHERE slug = 'biblioteca-medica-digital';

-- Verify
-- SELECT slug, images FROM experiences ORDER BY slug;
