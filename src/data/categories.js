export const categories = [
  {
    id: 1,
    slug: "tecnologia-eletronica",
    name: "Tecnologia & Eletrônicos",
    icon: "FaLaptop",
    description: "Smartphones, notebooks, tablets e gadgets com descontos exclusivos",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400",
    productCount: 8,
    color: "#3b82f6"
  },
  {
    id: 2,
    slug: "viagens-experiencias",
    name: "Viagens & Experiências",
    icon: "FaPlane",
    description: "Pacotes turísticos, hotéis, cruzeiros e experiências inesquecíveis",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400",
    productCount: 10,
    color: "#ff9289"
  },
  {
    id: 3,
    slug: "veiculos-automotivo",
    name: "Veículos & Automotivo",
    icon: "FaCar",
    description: "Carros 0km, seminovos e serviços automotivos com condições especiais",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400",
    productCount: 6,
    color: "#253746"
  },
  {
    id: 4,
    slug: "seguros-protecao",
    name: "Seguros & Proteção",
    icon: "FaShieldAlt",
    description: "Seguros de vida, saúde, automotivo e proteção patrimonial",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
    productCount: 5,
    color: "#10b981"
  },
  {
    id: 5,
    slug: "cursos-educacao",
    name: "Cursos & Educação",
    icon: "FaGraduationCap",
    description: "Especializações, MBAs, cursos online e congressos médicos",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400",
    productCount: 7,
    color: "#8b5cf6"
  },
  {
    id: 6,
    slug: "lazer-entretenimento",
    name: "Lazer & Entretenimento",
    icon: "FaTheaterMasks",
    description: "Ingressos para shows, teatros, eventos esportivos e streaming",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400",
    productCount: 4,
    color: "#f59e0b"
  }
];

// Função auxiliar para buscar categoria por slug
export const getCategoryBySlug = (slug) => {
  return categories.find(c => c.slug === slug);
};
