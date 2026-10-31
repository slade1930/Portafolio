export interface Stat {
  label: string;
  value: number;
  suffix?: string;
  icon: string;
}

export const stats: Stat[] = [
  { label: "Repositorios en GitHub", value: 15, suffix: "", icon: "Github" },
  { label: "Tecnologías dominadas", value: 35, suffix: "+", icon: "Layers" },
  { label: "Proyectos completados", value: 13, suffix: "", icon: "Rocket" },
  { label: "Años programando", value: 4, suffix: "+", icon: "Calendar" },
  { label: "Horas de desarrollo", value: 2400, suffix: "+", icon: "Clock" },
  { label: "Métodos numéricos", value: 8, suffix: "+", icon: "Cpu" },
];

export const timeline: { year: string; title: string; description: string }[] = [
  {
    year: "2017 — 2022",
    title: "Bachiller en Informática",
    description:
      "Bases de programación, redes, hardware y desarrollo de software en el Colegio Federico Zúñiga.",
  },
  {
    year: "2022 — 2023",
    title: "Miembro TER · Tribunal Electoral",
    description:
      "Trabajo en equipo, gestión documental y procesos institucionales en un entorno de alta responsabilidad.",
  },
  {
    year: "2023",
    title: "Ingeniería en Informática · U.P.",
    description:
      "Inicio de la Licenciatura enfocada en software, arquitectura de sistemas, bases de datos e IA.",
  },
  {
    year: "2024",
    title: "Desarrollador Full Stack Freelance",
    description:
      "Primeros proyectos profesionales: sistemas administrativos, dashboards y e-commerce.",
  },
  {
    year: "2024",
    title: "Certificación IA · Samsung",
    description:
      "Curso de Inteligencia Artificial en Samsung Innovation Campus.",
  },
  {
    year: "2025",
    title: "Análisis numérico y OR",
    description:
      "IOP y KRAZ: plataformas de métodos numéricos e investigación de operaciones.",
  },
  {
    year: "2026",
    title: "IA aplicada y productos",
    description:
      "Slazx (RAG con Ollama), ITAS en producción y sistemas empresariales en monorepo.",
  },
];
