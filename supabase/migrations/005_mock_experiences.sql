-- ProTime Platform
-- Mock experiences seed — fixes points_cost and adds 18 new experiences
-- Run in Supabase SQL Editor

-- ============================================
-- FIX EXISTING EXPERIENCES (points_cost was set as boolean 'true' = 1)
-- ============================================
UPDATE experiences SET points_cost = 3500 WHERE slug = 'swiss-alps-wellness-retreat';
UPDATE experiences SET points_cost = 8000 WHERE slug = 'maldives-private-island';
UPDATE experiences SET points_cost = 1200 WHERE slug = 'advanced-health-checkup';
UPDATE experiences SET points_cost = 2000 WHERE slug = 'performance-coaching';
UPDATE experiences SET points_cost = 1800 WHERE slug = 'premium-home-office';
UPDATE experiences SET points_cost = 500  WHERE slug = 'luxury-vehicle-test-drive';
UPDATE experiences SET points_cost = 800  WHERE slug = 'apple-products-access';
UPDATE experiences SET points_cost = 5000 WHERE slug = 'executive-mba-program';

-- ============================================
-- INSERT NEW MOCK EXPERIENCES
-- ============================================
DO $$
DECLARE
  cat_travel     UUID;
  cat_wellness   UUID;
  cat_lifestyle  UUID;
  cat_mobility   UUID;
  cat_tech       UUID;
  cat_education  UUID;
  partner_id     UUID;
BEGIN
  SELECT id INTO cat_travel    FROM categories WHERE slug = 'premium-travel';
  SELECT id INTO cat_wellness  FROM categories WHERE slug = 'health-wellness';
  SELECT id INTO cat_lifestyle FROM categories WHERE slug = 'lifestyle-comfort';
  SELECT id INTO cat_mobility  FROM categories WHERE slug = 'mobility-vehicles';
  SELECT id INTO cat_tech      FROM categories WHERE slug = 'technology-tools';
  SELECT id INTO cat_education FROM categories WHERE slug = 'education-career';
  SELECT id INTO partner_id    FROM partners   WHERE name = 'ProTime Concierge Services';

  -- ==================
  -- PREMIUM TRAVEL
  -- ==================
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, points_cost, is_featured, is_active) VALUES
  (
    cat_travel, partner_id,
    'Retiro de Bem-Estar em Gramado',
    'retiro-gramado',
    'Retiro exclusivo de 4 dias nas serras gaúchas com spa, vinhos e gastronomia de alto nível',
    'Uma imersão completa em relaxamento e bem-estar nas montanhas de Gramado. Inclui hospedagem em pousada boutique 5 estrelas, tratamentos de spa diários, degustação de vinhos premium, passeios guiados e gastronomia exclusiva. Máximo de 8 participantes para uma experiência verdadeiramente personalizada.',
    ARRAY['https://images.unsplash.com/photo-1571896349842-33c89424de2d'],
    'limited', 8, 'Exclusivo para membros', 2500, false, true
  ),
  (
    cat_travel, partner_id,
    'Cruzeiro pelo Mediterrâneo',
    'cruzeiro-mediterraneo',
    'Cruzeiro privativo de 10 dias pelo Mediterrâneo com paradas em Barcelona, Positano e Santorini',
    'Uma jornada inesquecível pelo Mar Mediterrâneo a bordo de um iate privativo. Roteiro personalizado com paradas em Barcelona, Côte d''Azur, Positano e Santorini. Inclui tripulação dedicada, chef exclusivo, passeios culturais e mergulho em locais paradisíacos.',
    ARRAY['https://images.unsplash.com/photo-1548574505-5e239809ee19'],
    'request_only', NULL, 'Sob consulta', 6000, true, true
  ),
  (
    cat_travel, partner_id,
    'Pousada Exclusiva em Trancoso',
    'pousada-trancoso',
    'Estadia de 5 dias na pousada mais exclusiva de Trancoso com acesso à praia privativa',
    'Descubra o charme incomparável de Trancoso em uma pousada boutique de luxo com apenas 6 suítes. Praia privativa, culinária baiana de primeira linha, passeios de quadriciclo pelo Quadrado histórico e serviço de concierge personalizado para cada detalhe da sua estadia.',
    ARRAY['https://images.unsplash.com/photo-1499793983690-e29da59ef1c2'],
    'limited', 6, 'Exclusivo para membros', 3000, false, true
  );

  -- ==================
  -- HEALTH & WELLNESS
  -- ==================
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, points_cost, is_featured, is_active) VALUES
  (
    cat_wellness, partner_id,
    'Imersão de Biohacking',
    'imersao-biohacking',
    'Programa de 2 dias com os principais protocolos de biohacking para otimização de saúde e performance',
    'Dois dias intensivos de otimização biológica com especialistas em longevidade e performance humana. Inclui avaliação de biomarcadores avançados, crioterapia, fotobiomodulação, análise genômica, protocolos de sono e nutrição individualizada. Uma experiência transformadora para profissionais de alto desempenho.',
    ARRAY['https://images.unsplash.com/photo-1559757175-0eb30cd8c063'],
    'limited', 10, 'Exclusivo para membros', 1500, true, true
  ),
  (
    cat_wellness, partner_id,
    'Massagem Terapêutica Premium',
    'massagem-terapeutica',
    'Sessão mensal de massagem terapêutica com terapeuta especializado em profissionais de saúde',
    'Sessão de 90 minutos de massagem terapêutica com terapeuta certificado com experiência em atender profissionais médicos. Técnicas combinadas de massagem sueca, trigger point e drenagem linfática. Agendamento flexível com horários exclusivos para membros ProTime.',
    ARRAY['https://images.unsplash.com/photo-1544161515-4ab6ce6db874'],
    'open', NULL, 'Incluído na assinatura', 400, false, true
  ),
  (
    cat_wellness, partner_id,
    'Acompanhamento Nutricional Funcional',
    'nutricao-funcional',
    'Programa de 12 sessões com nutricionista funcional especializado em médicos e profissionais de saúde',
    'Programa completo de reeducação alimentar com foco nas necessidades específicas de médicos: plantões, alimentação rápida de qualidade, suplementação inteligente e estratégias para manter energia e foco. Inclui exames de análise nutricional, plano alimentar personalizado e suporte via app.',
    ARRAY['https://images.unsplash.com/photo-1490645935967-10de6ba17061'],
    'limited', 15, 'Exclusivo para membros', 900, false, true
  );

  -- ==================
  -- LIFESTYLE & COMFORT
  -- ==================
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, points_cost, is_featured, is_active) VALUES
  (
    cat_lifestyle, partner_id,
    'Personal Shopper Premium',
    'personal-shopper',
    'Dia exclusivo com personal shopper nas melhores lojas de São Paulo com acesso VIP',
    'Uma experiência de compras completamente personalizada com personal shopper certificado. Acesso VIP a showrooms exclusivos, marcas nacionais e internacionais, consultoria de imagem e estilo adaptada à rotina médica. Serviço de alteração expressa e entrega em domicílio incluídos.',
    ARRAY['https://images.unsplash.com/photo-1483985988355-763728e1935b'],
    'open', NULL, 'Preços exclusivos para membros', 600, false, true
  ),
  (
    cat_lifestyle, partner_id,
    'Chef Particular para Jantares',
    'chef-particular',
    'Chef renomado vai até sua casa preparar um jantar exclusivo para até 10 pessoas',
    'Surpreenda seus convidados com um jantar assinado por um chef de cozinha renomado. O chef vai até sua residência com todos os ingredientes premium, monta a cozinha, prepara o menu de até 6 etapas e cuida de toda a limpeza. Cardápio personalizado de acordo com suas preferências e restrições alimentares.',
    ARRAY['https://images.unsplash.com/photo-1466637574441-749b8f19452f'],
    'limited', 5, 'Exclusivo para membros Elite', 1200, false, true
  ),
  (
    cat_lifestyle, partner_id,
    'Lavanderia Premium com Delivery',
    'lavanderia-premium',
    'Serviço de lavanderia premium com coleta e entrega em domicílio — perfeito para jaleco e roupas cirúrgicas',
    'Serviço de lavanderia de alta qualidade com coleta na sua casa ou consultório e entrega em 24 horas. Especializado em roupas médicas, jalecos, uniformes e peças delicadas. Tratamento com produtos premium, embalagem a vácuo e guararda-roupa organizado. Agendamentos recorrentes com desconto especial para membros.',
    ARRAY['https://images.unsplash.com/photo-1545173168-9f1947eebb7f'],
    'open', NULL, 'Preços exclusivos para membros', 300, false, true
  );

  -- ==================
  -- MOBILITY & VEHICLES
  -- ==================
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, points_cost, is_featured, is_active) VALUES
  (
    cat_mobility, partner_id,
    'Motorista Executivo Mensal',
    'motorista-executivo',
    'Pacote mensal de 20 viagens com motorista executivo particular para consultas, eventos e aeroporto',
    'Mobilidade urbana de luxo sem as preocupações do trânsito. Pacote de 20 corridas mensais com motorista particular em veículo de alto padrão (BMW Série 5 ou Mercedes Classe E). Agendamento com 1 hora de antecedência, rotas otimizadas e sigilo absoluto. Ideal para médicos com agenda intensa.',
    ARRAY['https://images.unsplash.com/photo-1449965408869-eaa3f722e40d'],
    'open', NULL, 'Exclusivo para membros', 1500, false, true
  ),
  (
    cat_mobility, partner_id,
    'Manutenção Completa de Veículo',
    'manutencao-veiculo',
    'Revisão completa do seu veículo com busca e entrega no consultório ou residência',
    'Revisão completa do seu veículo realizada por mecânica certificada com transparência total. Inclui busca do veículo, diagnóstico computadorizado, troca de óleo e filtros, freios, pneus, alinhamento e balanceamento. Laudo detalhado enviado por e-mail e devolução do veículo higienizado. Sem surpresas no orçamento.',
    ARRAY['https://images.unsplash.com/photo-1530046339160-ce3e530c7d2f'],
    'open', NULL, 'Preços exclusivos para membros', 700, false, true
  ),
  (
    cat_mobility, partner_id,
    'Aluguel de Moto Elétrica Premium',
    'moto-eletrica',
    'Aluguel mensal de moto elétrica premium para deslocamentos urbanos rápidos e sustentáveis',
    'Mobilidade urbana inteligente com a moto elétrica mais moderna do mercado. Aluguel mensal com seguro completo, manutenção inclusa e troca de bateria ilimitada. Perfeita para deslocamentos rápidos entre consultório, hospital e residência. Zero emissões, zero multas de rodízio.',
    ARRAY['https://images.unsplash.com/photo-1558618666-fcd25c85cd64'],
    'limited', 20, 'Exclusivo para membros', 350, false, true
  );

  -- ==================
  -- TECHNOLOGY & TOOLS
  -- ==================
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, points_cost, is_featured, is_active) VALUES
  (
    cat_tech, partner_id,
    'Samsung Galaxy S25 Ultra — Acesso Prioritário',
    'samsung-galaxy-s25',
    'Acesso prioritário ao Samsung Galaxy S25 Ultra com preço exclusivo e setup personalizado para uso médico',
    'Seja um dos primeiros a ter o Samsung Galaxy S25 Ultra com valor exclusivo para membros ProTime. Inclui configuração completa do dispositivo, migração de dados, instalação de apps médicos essenciais (prontuário, telemedicina, referências médicas) e suporte técnico dedicado por 30 dias.',
    ARRAY['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c'],
    'open', NULL, 'Preços exclusivos para membros', 900, false, true
  ),
  (
    cat_tech, partner_id,
    'Setup Completo para Telemedicina',
    'setup-telemedicina',
    'Equipamento e configuração profissional para consultório de telemedicina em casa',
    'Tudo que você precisa para oferecer teleconsultas de qualidade: câmera 4K, iluminação de estúdio, microfone direcional, ring light, fundo virtual profissional e configuração completa do software de telemedicina homologado pelo CFM. Inclui treinamento e suporte técnico mensal.',
    ARRAY['https://images.unsplash.com/photo-1576091160550-2173dba999ef'],
    'limited', 10, 'Exclusivo para membros', 1200, true, true
  ),
  (
    cat_tech, partner_id,
    'Assinatura Adobe Creative Cloud',
    'adobe-creative-cloud',
    'Acesso ao Adobe Creative Cloud completo para criar materiais médicos, apresentações e conteúdo digital',
    'Licença completa do Adobe Creative Cloud com todos os apps: Photoshop, Illustrator, Premiere, After Effects e mais. Ideal para criar apresentações médicas, materiais educativos, conteúdo para redes sociais e vídeos de procedimentos. Inclui 1TB de armazenamento em nuvem e acesso à biblioteca de templates médicos.',
    ARRAY['https://images.unsplash.com/photo-1561736778-92e52a7769ef'],
    'open', NULL, 'Preços exclusivos para membros', 600, false, true
  );

  -- ==================
  -- EDUCATION & CAREER
  -- ==================
  INSERT INTO experiences (category_id, partner_id, title, slug, short_description, full_description, images, availability_type, max_availability, price_display, points_cost, is_featured, is_active) VALUES
  (
    cat_education, partner_id,
    'Workshop de Gestão de Consultório',
    'workshop-gestao-consultorio',
    'Workshop intensivo de 2 dias sobre gestão financeira, marketing médico e expansão de consultório',
    'Aprenda a transformar seu consultório em um negócio sustentável e lucrativo. Workshop intensivo com especialistas em gestão de saúde, marketing médico ético, precificação de serviços, gestão de equipe e tecnologia para consultórios. Turmas pequenas de até 25 médicos para máximo aproveitamento.',
    ARRAY['https://images.unsplash.com/photo-1552664730-d307ca884978'],
    'limited', 25, 'Exclusivo para membros', 800, false, true
  ),
  (
    cat_education, partner_id,
    'Coaching de Liderança Médica',
    'coaching-lideranca-medica',
    'Programa de 8 sessões com coach especializado em liderança para médicos e gestores de saúde',
    'Desenvolva habilidades de liderança essenciais para médicos que desejam liderar equipes, departamentos ou expandir sua influência. 8 sessões individuais com coach executivo certificado com experiência no setor de saúde. Foco em comunicação assertiva, gestão de conflitos, tomada de decisão sob pressão e visão estratégica.',
    ARRAY['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d'],
    'limited', 12, 'Exclusivo para membros', 1600, false, true
  ),
  (
    cat_education, partner_id,
    'Biblioteca Médica Digital Premium',
    'biblioteca-medica-digital',
    'Acesso ilimitado às principais bases de dados e publicações médicas internacionais',
    'Acesso anual completo às principais plataformas de publicações médicas: UpToDate, NEJM, The Lancet, JAMA, BMJ e mais de 500 periódicos indexados. Inclui ferramentas de gestão de referências bibliográficas, alertas de novas publicações por especialidade e acesso via aplicativo mobile.',
    ARRAY['https://images.unsplash.com/photo-1481627834876-b7833e8f5570'],
    'open', NULL, 'Incluído na assinatura Premium', 400, false, true
  );

END $$;

-- ============================================
-- VERIFICATION
-- ============================================
-- SELECT COUNT(*) FROM experiences WHERE is_active = true;           -- should be 26
-- SELECT title, points_cost FROM experiences ORDER BY points_cost DESC;
-- SELECT c.name, COUNT(e.id) as total FROM categories c LEFT JOIN experiences e ON e.category_id = c.id GROUP BY c.name;
