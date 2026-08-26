export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description: string;
  current?: boolean;
}

export const education: EducationItem[] = [
  {
    institution: "Universidad de Panamá",
    degree: "Licenciatura en Ingeniería Informática",
    period: "2023 — Actualidad",
    current: true,
    description:
      "Formación en desarrollo de software, programación, arquitectura de sistemas, bases de datos e inteligencia artificial. Enfocado en metodologías de ingeniería, algoritmos y construcción de aplicaciones profesionales.",
  },
  {
    institution: "Colegio Federico Zúñiga",
    degree: "Bachiller en Informática",
    period: "2017 — 2022",
    description:
      "Bases fundamentales de programación, redes, hardware y desarrollo de software que marcaron el inicio de mi carrera como desarrollador.",
  },
];

export interface Certification {
  title: string;
  issuer: string;
  year: string;
  description: string;
  icon: string;
}

export const certifications: Certification[] = [
  {
    title: "Curso de Inteligencia Artificial",
    issuer: "Samsung Innovation Campus",
    year: "2024",
    description:
      "Programa de formación en fundamentos de inteligencia artificial: aprendizaje automático, procesamiento de datos, ética de la IA y aplicaciones prácticas con Python.",
    icon: "brain",
  },
];

export interface Language {
  name: string;
  level: string;
  proficiency: number;
}

export const languages: Language[] = [
  { name: "Español", level: "Nativo", proficiency: 100 },
  { name: "Inglés", level: "Intermedio · B1", proficiency: 62 },
];
