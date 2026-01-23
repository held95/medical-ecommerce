export const categories = [
  {
    id: 1,
    slug: "equipamentos-cirurgicos",
    name: "Equipamentos Cirúrgicos",
    icon: "FaSyringe",
    description: "Instrumentos cirúrgicos de alta precisão para procedimentos médicos",
    image: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=400",
    productCount: 10,
    color: "#007bff"
  },
  {
    id: 2,
    slug: "materiais-descartaveis",
    name: "Materiais Descartáveis",
    icon: "FaMask",
    description: "Materiais de uso único para máxima segurança e higiene",
    image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400",
    productCount: 15,
    color: "#28a745"
  },
  {
    id: 3,
    slug: "equipamentos-diagnostico",
    name: "Equipamentos de Diagnóstico",
    icon: "FaStethoscope",
    description: "Instrumentos de diagnóstico e monitoramento de pacientes",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400",
    productCount: 8,
    color: "#17a2b8"
  },
  {
    id: 4,
    slug: "mobiliario-medico",
    name: "Mobiliário Médico",
    icon: "FaBed",
    description: "Mobiliário hospitalar e equipamentos de grande porte",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400",
    productCount: 7,
    color: "#6c757d"
  }
];

// Função auxiliar para buscar categoria por slug
export const getCategoryBySlug = (slug) => {
  return categories.find(c => c.slug === slug);
};
