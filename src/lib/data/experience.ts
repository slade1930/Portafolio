export interface Experience {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  tags: string[];
}

export const experiences: Experience[] = [
  {
    role: "Desarrollador Full Stack Freelance",
    company: "Independiente",
    period: "2024 — Actualidad",
    current: true,
    summary:
      "Diseño y desarrollo de aplicaciones web completas con arquitecturas full stack: integración de frontend, backend, APIs y bases de datos. Trabajo en proyectos reales, prototipos empresariales y productos orientados a rendimiento y experiencia de usuario.",
    highlights: [
      "Sistemas administrativos y plataformas empresariales con paneles, autenticación por roles y gestión de procesos.",
      "Chatbots inteligentes y aplicaciones con inteligencia artificial (LangChain, Ollama, OpenAI API, RAG).",
      "Dashboards con visualización de datos, reportes y CRUD completo de extremo a extremo.",
      "Gestión documental y comercio electrónico con carritos, inventario y pasarelas de pago.",
      "Despliegues en Vercel y Render con flujos Git, CI y buenas prácticas de calidad de código.",
    ],
    tags: [
      "React",
      "Next.js",
      "FastAPI",
      "Node.js",
      "PostgreSQL",
      "Django",
      "TypeScript",
      "Tailwind",
      "Docker",
    ],
  },
  {
    role: "Miembro TER",
    company: "Tribunal Electoral",
    period: "2022 — 2023",
    current: false,
    summary:
      "Participación en procesos institucionales durante un período electoral, con foco en trabajo en equipo, organización y gestión documental dentro de un entorno de alta responsabilidad.",
    highlights: [
      "Trabajo en equipo y comunicación efectiva en entornos de presión.",
      "Gestión documental y cumplimiento de procesos institucionales.",
      "Resolución de problemas y responsabilidad en tareas críticas.",
    ],
    tags: ["Organización", "Trabajo en equipo", "Procesos institucionales"],
  },
];
