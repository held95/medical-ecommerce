export const orders = [
  {
    id: 1,
    orderNumber: "PED-2026-0001",
    customer: {
      name: "Dr. João Silva",
      email: "joao.silva@hospital.com.br",
      phone: "(11) 98765-4321"
    },
    date: "2026-01-20",
    status: "entregue",
    items: [
      { productId: 11, name: "Luvas Cirúrgicas Estéreis M", quantity: 5, price: 45.90 },
      { productId: 13, name: "Máscara Cirúrgica Tripla Camada (cx 50)", quantity: 10, price: 18.90 }
    ],
    subtotal: 418.50,
    shipping: 25.00,
    total: 443.50,
    paymentMethod: "Cartão de Crédito",
    address: {
      street: "Rua das Flores, 123",
      complement: "Sala 45",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567"
    }
  },
  {
    id: 2,
    orderNumber: "PED-2026-0002",
    customer: {
      name: "Dra. Maria Santos",
      email: "maria.santos@clinica.com.br",
      phone: "(21) 91234-5678"
    },
    date: "2026-01-21",
    status: "enviado",
    items: [
      { productId: 26, name: "Estetoscópio Duplo Adulto Premium", quantity: 2, price: 185.00 },
      { productId: 28, name: "Oxímetro de Pulso Portátil", quantity: 3, price: 79.90 }
    ],
    subtotal: 609.70,
    shipping: 30.00,
    total: 639.70,
    paymentMethod: "PIX",
    address: {
      street: "Av. Paulista, 1000",
      complement: "Conj. 201",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100"
    }
  },
  {
    id: 3,
    orderNumber: "PED-2026-0003",
    customer: {
      name: "Hospital São Lucas",
      email: "compras@hsaolucas.com.br",
      phone: "(11) 3456-7890"
    },
    date: "2026-01-22",
    status: "processando",
    items: [
      { productId: 35, name: "Cadeira de Rodas Dobrável", quantity: 4, price: 680.00 },
      { productId: 40, name: "Suporte para Soro com Rodízios", quantity: 8, price: 145.00 }
    ],
    subtotal: 3880.00,
    shipping: 50.00,
    total: 3930.00,
    paymentMethod: "Boleto Bancário",
    address: {
      street: "Rua Hospital, 500",
      complement: "Setor de Compras",
      city: "Rio de Janeiro",
      state: "RJ",
      zipCode: "20000-000"
    }
  },
  {
    id: 4,
    orderNumber: "PED-2026-0004",
    customer: {
      name: "Dr. Carlos Oliveira",
      email: "carlos.oliveira@med.com",
      phone: "(31) 99876-5432"
    },
    date: "2026-01-22",
    status: "processando",
    items: [
      { productId: 1, name: "Bisturi Descartável Estéril nº 15", quantity: 100, price: 2.50 },
      { productId: 16, name: "Gaze Estéril 7,5 x 7,5cm (pacote 10)", quantity: 50, price: 4.90 }
    ],
    subtotal: 495.00,
    shipping: 20.00,
    total: 515.00,
    paymentMethod: "Cartão de Crédito",
    address: {
      street: "Rua Minas, 789",
      complement: "",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "30000-000"
    }
  },
  {
    id: 5,
    orderNumber: "PED-2026-0005",
    customer: {
      name: "Clínica Vida Nova",
      email: "admin@clinicavidanova.com.br",
      phone: "(85) 3222-1111"
    },
    date: "2026-01-23",
    status: "pendente",
    items: [
      { productId: 22, name: "Máscara N95 / PFF2", quantity: 200, price: 12.90 },
      { productId: 12, name: "Luvas de Procedimento Não Estéreis G", quantity: 30, price: 28.90 }
    ],
    subtotal: 3447.00,
    shipping: 45.00,
    total: 3492.00,
    paymentMethod: "Transferência Bancária",
    address: {
      street: "Av. Central, 1500",
      complement: "Edifício Saúde",
      city: "Fortaleza",
      state: "CE",
      zipCode: "60000-000"
    }
  },
  {
    id: 6,
    orderNumber: "PED-2026-0006",
    customer: {
      name: "Dra. Ana Paula Lima",
      email: "ana.lima@dermato.com",
      phone: "(61) 98765-1234"
    },
    date: "2026-01-23",
    status: "pendente",
    items: [
      { productId: 2, name: "Pinça Kelly Curva 14cm", quantity: 3, price: 28.90 },
      { productId: 3, name: "Tesoura Mayo Reta 17cm", quantity: 2, price: 35.50 },
      { productId: 5, name: "Porta-agulha Mayo-Hegar 16cm", quantity: 2, price: 42.00 }
    ],
    subtotal: 237.70,
    shipping: 18.00,
    total: 255.70,
    paymentMethod: "PIX",
    address: {
      street: "SQN 205, Bloco H",
      complement: "Loja 10",
      city: "Brasília",
      state: "DF",
      zipCode: "70000-000"
    }
  },
  {
    id: 7,
    orderNumber: "PED-2026-0007",
    customer: {
      name: "Dr. Roberto Alves",
      email: "roberto.alves@ortopedia.com",
      phone: "(41) 3333-4444"
    },
    date: "2026-01-21",
    status: "entregue",
    items: [
      { productId: 34, name: "Maca Hospitalar com Rodas", quantity: 1, price: 1850.00 },
      { productId: 36, name: "Mesa Auxiliar Inox com Rodízios", quantity: 2, price: 420.00 }
    ],
    subtotal: 2690.00,
    shipping: 80.00,
    total: 2770.00,
    paymentMethod: "Boleto Bancário",
    address: {
      street: "Rua XV de Novembro, 890",
      complement: "Consultório 3",
      city: "Curitiba",
      state: "PR",
      zipCode: "80000-000"
    }
  },
  {
    id: 8,
    orderNumber: "PED-2026-0008",
    customer: {
      name: "Policlínica Central",
      email: "compras@policentral.com.br",
      phone: "(51) 3456-7890"
    },
    date: "2026-01-20",
    status: "entregue",
    items: [
      { productId: 27, name: "Termômetro Digital Infravermelho", quantity: 10, price: 89.90 },
      { productId: 14, name: "Seringa 10ml com Agulha", quantity: 500, price: 1.20 }
    ],
    subtotal: 1499.00,
    shipping: 35.00,
    total: 1534.00,
    paymentMethod: "Cartão de Crédito",
    address: {
      street: "Av. Independência, 2500",
      complement: "Setor Administrativo",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90000-000"
    }
  },
  {
    id: 9,
    orderNumber: "PED-2026-0009",
    customer: {
      name: "Dr. Pedro Martins",
      email: "pedro.martins@cardio.com",
      phone: "(71) 99123-4567"
    },
    date: "2026-01-22",
    status: "enviado",
    items: [
      { productId: 29, name: "Esfigmomanômetro Aneroide com Estetoscópio", quantity: 2, price: 95.00 },
      { productId: 30, name: "Glicosímetro com 50 Tiras", quantity: 3, price: 125.00 }
    ],
    subtotal: 565.00,
    shipping: 22.00,
    total: 587.00,
    paymentMethod: "PIX",
    address: {
      street: "Rua Chile, 100",
      complement: "Sala 805",
      city: "Salvador",
      state: "BA",
      zipCode: "40000-000"
    }
  },
  {
    id: 10,
    orderNumber: "PED-2026-0010",
    customer: {
      name: "Dra. Juliana Costa",
      email: "juliana.costa@pediatria.com",
      phone: "(81) 98888-9999"
    },
    date: "2026-01-23",
    status: "pendente",
    items: [
      { productId: 31, name: "Lanterna Clínica LED", quantity: 5, price: 24.90 },
      { productId: 32, name: "Otoscópio Clínico", quantity: 2, price: 145.00 },
      { productId: 33, name: "Martelo Neurológico", quantity: 3, price: 32.90 }
    ],
    subtotal: 513.20,
    shipping: 20.00,
    total: 533.20,
    paymentMethod: "Cartão de Crédito",
    address: {
      street: "Av. Boa Viagem, 4500",
      complement: "Edifício Medical Center, Sala 1204",
      city: "Recife",
      state: "PE",
      zipCode: "50000-000"
    }
  },
  {
    id: 11,
    orderNumber: "PED-2026-0011",
    customer: {
      name: "UBS Saúde da Família",
      email: "ubs.saude@prefeitura.gov.br",
      phone: "(92) 3333-2222"
    },
    date: "2026-01-21",
    status: "enviado",
    items: [
      { productId: 17, name: "Esparadrapo Micropore 2,5cm x 10m", quantity: 40, price: 8.90 },
      { productId: 18, name: "Atadura Crepe 15cm x 1,8m", quantity: 80, price: 5.50 },
      { productId: 19, name: "Cateter Intravenoso 22G", quantity: 100, price: 3.80 }
    ],
    subtotal: 1176.00,
    shipping: 50.00,
    total: 1226.00,
    paymentMethod: "Nota de Empenho",
    address: {
      street: "Rua Municipal, 50",
      complement: "Unidade Básica de Saúde",
      city: "Manaus",
      state: "AM",
      zipCode: "69000-000"
    }
  },
  {
    id: 12,
    orderNumber: "PED-2026-0012",
    customer: {
      name: "Dr. Fernando Rocha",
      email: "fernando.rocha@cirurgia.com",
      phone: "(48) 99999-0000"
    },
    date: "2026-01-23",
    status: "pendente",
    items: [
      { productId: 20, name: "Campo Cirúrgico Descartável 50x50cm", quantity: 50, price: 6.50 },
      { productId: 21, name: "Compressa Cirúrgica Estéril 45x50cm", quantity: 50, price: 7.90 },
      { productId: 23, name: "Avental Cirúrgico Descartável", quantity: 30, price: 9.50 }
    ],
    subtotal: 1005.00,
    shipping: 28.00,
    total: 1033.00,
    paymentMethod: "Boleto Bancário",
    address: {
      street: "Rua Santos Saraiva, 200",
      complement: "Centro Cirúrgico",
      city: "Florianópolis",
      state: "SC",
      zipCode: "88000-000"
    }
  }
];

// Função auxiliar para buscar pedido por ID
export const getOrderById = (id) => {
  return orders.find(o => o.id === parseInt(id));
};

// Função auxiliar para buscar pedidos por status
export const getOrdersByStatus = (status) => {
  return orders.filter(o => o.status === status);
};

// Função auxiliar para calcular estatísticas
export const getOrderStats = () => {
  const today = new Date().toISOString().split('T')[0];
  const ordersToday = orders.filter(o => o.date === today);
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter(o => o.status === 'pendente');

  return {
    totalOrders: orders.length,
    ordersToday: ordersToday.length,
    totalRevenue,
    pendingCount: pendingOrders.length
  };
};
