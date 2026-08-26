export type SkillLevel = "avanzado" | "intermedio" | "aprendiendo";

export interface Skill {
  name: string;
  level: SkillLevel;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  accent: string;
  skills: Skill[];
}

export const skillLevels: Record<SkillLevel, string> = {
  avanzado: "Avanzado",
  intermedio: "Intermedio",
  aprendiendo: "En aprendizaje continuo",
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Lenguajes de Programación",
    description:
      "Utilizados en proyectos académicos y profesionales: desarrollo full stack, backend, algoritmos y estructuras de datos.",
    accent: "from-violet-500 to-fuchsia-500",
    skills: [
      { name: "TypeScript", level: "avanzado" },
      { name: "JavaScript (ES6+)", level: "avanzado" },
      { name: "Python", level: "avanzado" },
      { name: "Java", level: "intermedio" },
      { name: "C++", level: "intermedio" },
      { name: "C", level: "intermedio" },
      { name: "SQL", level: "avanzado" },
      { name: "HTML5", level: "avanzado" },
      { name: "CSS3", level: "avanzado" },
    ],
  },
  {
    title: "Frontend",
    description:
      "Interfaces modernas, rápidas e intuitivas, altamente optimizadas y con experiencia de usuario de primer nivel.",
    accent: "from-fuchsia-500 to-purple-500",
    skills: [
      { name: "React", level: "avanzado" },
      { name: "Next.js", level: "avanzado" },
      { name: "Angular", level: "intermedio" },
      { name: "Tailwind CSS", level: "avanzado" },
      { name: "Responsive Design", level: "avanzado" },
      { name: "Component Architecture", level: "avanzado" },
      { name: "SPA", level: "avanzado" },
      { name: "Consumo de APIs REST", level: "avanzado" },
      { name: "Framer Motion", level: "intermedio" },
    ],
  },
  {
    title: "Backend",
    description:
      "APIs robustas, autenticación, middleware y arquitectura en capas para lógica de negocio escalable.",
    accent: "from-purple-500 to-indigo-500",
    skills: [
      { name: "FastAPI", level: "avanzado" },
      { name: "Node.js", level: "avanzado" },
      { name: "Express.js", level: "intermedio" },
      { name: "Django", level: "intermedio" },
      { name: "Python", level: "avanzado" },
      { name: "JWT Authentication", level: "avanzado" },
      { name: "APIs REST", level: "avanzado" },
      { name: "Middleware", level: "avanzado" },
      { name: "Arquitectura en capas", level: "intermedio" },
    ],
  },
  {
    title: "Inteligencia Artificial",
    description:
      "Construcción de chatbots inteligentes, pipelines RAG y automatización con modelos de lenguaje locales y en la nube.",
    accent: "from-indigo-500 to-cyan-400",
    skills: [
      { name: "LangChain", level: "intermedio" },
      { name: "Ollama", level: "intermedio" },
      { name: "RAG (Retrieval-Augmented)", level: "intermedio" },
      { name: "OpenAI API", level: "intermedio" },
      { name: "Prompt Engineering", level: "avanzado" },
      { name: "Chatbots Inteligentes", level: "avanzado" },
      { name: "Embeddings", level: "intermedio" },
      { name: "Recuperación de contexto", level: "intermedio" },
      { name: "NLP", level: "intermedio" },
    ],
  },
  {
    title: "Bases de Datos",
    description:
      "Modelado relacional, diseño de esquemas, optimización de consultas SQL, relaciones y migraciones.",
    accent: "from-cyan-400 to-emerald-400",
    skills: [
      { name: "PostgreSQL", level: "avanzado" },
      { name: "MySQL", level: "intermedio" },
      { name: "SQLite", level: "avanzado" },
      { name: "Modelado relacional", level: "avanzado" },
      { name: "Diseño de esquemas", level: "avanzado" },
      { name: "Optimización SQL", level: "intermedio" },
      { name: "CRUD", level: "avanzado" },
      { name: "Migraciones", level: "intermedio" },
    ],
  },
  {
    title: "DevOps y Despliegue",
    description:
      "Flujos de desarrollo con Git y despliegue de aplicaciones full stack en plataformas modernas.",
    accent: "from-emerald-400 to-lime-400",
    skills: [
      { name: "Git", level: "avanzado" },
      { name: "GitHub", level: "avanzado" },
      { name: "Docker", level: "intermedio" },
      { name: "Docker Compose", level: "intermedio" },
      { name: "Vercel", level: "avanzado" },
      { name: "Render", level: "avanzado" },
      { name: "Postman", level: "avanzado" },
      { name: "npm / pnpm", level: "avanzado" },
    ],
  },
  {
    title: "Arquitectura y Desarrollo",
    description:
      "Código limpio, separación de responsabilidades y diseño modular para sistemas mantenibles y escalables.",
    accent: "from-lime-400 to-amber-400",
    skills: [
      { name: "Arquitectura Full Stack", level: "avanzado" },
      { name: "Cliente-Servidor", level: "avanzado" },
      { name: "Clean Code", level: "avanzado" },
      { name: "SOLID", level: "intermedio" },
      { name: "Componentización", level: "avanzado" },
      { name: "Modularización", level: "avanzado" },
      { name: "Integración Frontend + Backend", level: "avanzado" },
      { name: "Optimización de rendimiento", level: "avanzado" },
      { name: "Escalabilidad", level: "intermedio" },
    ],
  },
  {
    title: "Herramientas",
    description:
      "Entornos de desarrollo, IDEs y utilidades que agilizan el día a día.",
    accent: "from-amber-400 to-rose-400",
    skills: [
      { name: "VS Code", level: "avanzado" },
      { name: "IntelliJ IDEA", level: "intermedio" },
      { name: "Android Studio", level: "intermedio" },
      { name: "pgAdmin", level: "intermedio" },
      { name: "GitHub Desktop", level: "avanzado" },
      { name: "Postman", level: "avanzado" },
      { name: "Docker Desktop", level: "intermedio" },
    ],
  },
  {
    title: "Conocimientos Académicos",
    description:
      "Fundamentos sólidos adquiridos durante la carrera de Ingeniería en Informática.",
    accent: "from-rose-400 to-violet-400",
    skills: [
      { name: "Programación Orientada a Objetos", level: "avanzado" },
      { name: "Estructuras de Datos", level: "avanzado" },
      { name: "Algoritmos", level: "avanzado" },
      { name: "Métodos Numéricos", level: "avanzado" },
      { name: "Ingeniería de Software", level: "intermedio" },
      { name: "Sistemas Operativos", level: "intermedio" },
      { name: "Redes", level: "intermedio" },
      { name: "Bases de Datos", level: "avanzado" },
      { name: "Análisis y Diseño de Sistemas", level: "intermedio" },
    ],
  },
];
