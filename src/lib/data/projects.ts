export type ProjectStatus =
  | "Producción"
  | "En desarrollo"
  | "Demo"
  | "Práctica"
  | "Académico";

export interface Project {
  slug: string;
  name: string;
  repo: string;
  live?: string;
  year: number;
  status: ProjectStatus;
  category: string;
  tagline: string;
  description: string;
  problem: string;
  architecture: string;
  features: string[];
  tech: string[];
  challenges: string[];
  learnings: string[];
  accent: string;
  icon: string;
  images?: string[];
}

export const projects: Project[] = [
  {
    slug: "slax",
    name: "SLAX",
    repo: "https://github.com/slade1930/slax-",
    year: 2026,
    status: "Práctica",
    category: "Inteligencia Artificial",
    tagline: "Asistente de escritorio en español que ejecuta acciones con confirmación de seguridad",
    description:
      "SLAX Quick es un asistente de escritorio local para Windows construido con Python y Qt: una ventana flotante que entiende frases en español y ejecuta acciones sobre archivos, aplicaciones y memoria. La IA solo genera la intención (qué herramienta y con qué parámetros); la ejecución siempre pasa por una capa de seguridad que exige confirmación explícita en operaciones de riesgo.",
    problem:
      "Los asistentes actuales dependen de la nube, del navegador o de comandos de terminal que el usuario no controla. SLAX responde con una app nativa local y privada: entiende lenguaje natural, automatiza tareas sobre el propio sistema (abrir, crear, buscar, organizar archivos) y nunca ejecuta nada sin pasar por su política de seguridad.",
    architecture:
      "Aplicación de escritorio en Python 3.12 con PySide6 (Qt). El orquestador de intenciones separa el proveedor de IA (motor de reglas offline por defecto, Ollama opcional) del enrutador de herramientas, que resuelve rutas y memoria antes de ejecutar. Cada acción pasa por una capa de seguridad con niveles de riesgo (LOW/MEDIUM/HIGH): las operaciones MEDIUM/HIGH requieren confirmación explícita en un diálogo modal. Historial de acciones y memoria clave→valor persisten en SQLite con SQLAlchemy y modelos Pydantic para configuración y validación. La UI trabaja con hilos de fondo que entregan resultados por señales Qt, y el build se empaqueta en un SLAX.exe con PyInstaller.",
    features: [
      "Ventana flotante frameless siempre-encima, invocable con hotkey global (Ctrl+Alt+Espacio)",
      "Comandos en español: abrir archivos y aplicaciones, crear/buscar carpetas, mover, copiar y renombrar con confirmación",
      "Memoria explícita clave→valor ('recuerda que…') e historial local de acciones",
      "Capa de seguridad por niveles de riesgo con confirmación modal antes de ejecutar",
      "Motor de intenciones por reglas offline; proveedor de IA intercambiable (Ollama opcional)",
      "Persistencia local en SQLite (SQLAlchemy) y build a SLAX.exe con PyInstaller",
    ],
    tech: [
      "Python 3.12",
      "PySide6 (Qt)",
      "SQLAlchemy",
      "SQLite",
      "Pydantic",
      "Ollama",
      "PyInstaller",
    ],
    challenges: [
      "Entregar resultados del hilo de procesamiento a la UI de forma segura, incluidos builds congelados con PyInstaller",
      "Diseñar una capa de seguridad que confirme acciones de riesgo sin bloquear la experiencia",
      "Mantener el proveedor de IA sustituible (reglas offline vs Ollama) sin tocar el orquestador",
    ],
    learnings: [
      "Construí una aplicación de escritorio completa con Qt y Python, diseñé una orquestación de intenciones con capa de seguridad explícita y resolví problemas reales de concurrencia y empaquetado (threading + señales Qt + PyInstaller) que solo aparecen en producción.",
    ],
    images: [
      "/projects/slax-1.png",
    ],
    accent: "from-indigo-500 via-purple-500 to-pink-500",
    icon: "Bot",
  },
  {
    slug: "slazx",
    name: "Slazx",
    repo: "https://github.com/slade1930/Chat-bot-con-ollama-",
    year: 2026,
    status: "En desarrollo",
    category: "Inteligencia Artificial",
    tagline: "Chat IA local con RAG, streaming y subida de documentos",
    description:
      "Plataforma de chat con IA construida como monorepo que ejecuta modelos locales (qwen2.5:3b, llama2 y nomic-embed-text) vía Ollama, sin depender de la nube. Combina una web en Next.js 16 con una API en FastAPI que transmite las respuestas en tiempo real por WebSocket. Incluye recuperación aumentada (RAG), memoria por conversación, agentes, auditoría y métricas de uso.",
    problem:
      "Las soluciones de chat con IA basadas en APIs en la nube generan costos por uso, dependencias externas y problemas de privacidad de los datos. Slazx responde con una plataforma local, privada y económica: los modelos corren en la propia máquina y los documentos del usuario se indexan localmente para responder con su propio contexto.",
    architecture:
      "Monorepo pnpm con separación clara entre dominios. La API (FastAPI + SQLAlchemy async + asyncpg + Alembic) se organiza en capas domain / application / infrastructure / presentation, con un cliente Ollama desacoplado (OllamaProvider) para sustituir el proveedor sin tocar la lógica de negocio. El streaming se hace por WebSocket con un RunManager que permite cancelar generaciones activas desde la UI. El frontend (Next.js 16 + React 19) usa TanStack Query para el estado del servidor, zustand para el estado global y renderiza respuestas con markdown, LaTeX y diagramas mermaid.",
    features: [
      "Pipeline RAG completo: subida de archivos → extracción de texto → chunking → embeddings en lote → recuperación por similitud → generación con contexto",
      "Streaming de tokens en tiempo real por WebSocket con cancelación de generación",
      "Historial persistido por conversación en PostgreSQL",
      "Renderizado de respuestas con markdown, fórmulas matemáticas (KaTeX) y diagramas (Mermaid)",
      "Memoria conversacional y roles de mensaje (usuario / asistente / sistema)",
      "Auditoría (AuditLog), métricas de uso (UsageStat) y rate limiting (slowapi)",
      "UI dark con resaltado de código (Shiki) y virtualización de listas largas",
    ],
    tech: [
      "Next.js 16",
      "React 19",
      "FastAPI",
      "SQLAlchemy async",
      "PostgreSQL",
      "Alembic",
      "WebSocket",
      "Ollama",
      "TanStack Query",
      "zustand",
      "TypeScript",
      "Shiki",
      "KaTeX",
      "Mermaid",
    ],
    challenges: [
      "Orquestar generaciones concurrentes y permitir su cancelación sin romper el streaming",
      "Diseñar el pipeline RAG para manejar formatos heterogéneos y documentos largos con chunks solapados",
      "Mantener latencia baja al recuperar contexto y generar respuestas de forma incremental",
      "Separar la infraestructura (Ollama/BD) del dominio para que el sistema sea portable",
    ],
    learnings: [
      "Diseñé una API asíncrona con capas de dominio, construí pipelines RAG reales con embeddings y retrieval, y sincronicé estado cliente-servidor con streaming bidireccional. También aprendí a estructurar monorepos con pnpm y a tratar la privacidad y el costo como decisiones de arquitectura.",
    ],
    images: [
      "/projects/slazx-1.png",
      "/projects/slazx-2.png",
    ],
    accent: "from-violet-500 via-purple-500 to-fuchsia-500",
    icon: "Bot",
  },
  {
    slug: "iop-analysis",
    name: "IOP Analysis",
    repo: "https://github.com/slade1930/IOP",
    year: 2025,
    status: "Académico",
    category: "Análisis Numérico",
    tagline: "Plataforma de métodos numéricos con soluciones paso a paso",
    description:
      "Aplicación de análisis numérico que resuelve problemas con los métodos de Gauss, Gauss-Jordan, Falsa Posición, método simplex, diferenciación finita e interpolación de Newton. Cada método muestra la solución con una explicación paso a paso, tablas iterativas y gráficas. Incluye un motor de resolución unificado y un asistente basado en IA que explica los resultados.",
    problem:
      "Resolver problemas de métodos numéricos a mano es propenso a errores y consume mucho tiempo, y muchas calculadoras online ocultan el procedimiento. IOP Analysis automatiza el cálculo pero conserva la trazabilidad pedagógica: muestra cada iteración para que el estudiante entienda cómo se llega a la solución.",
    architecture:
      "Backend Django + Django REST Framework con API documentada (drf-spectacular), autenticación por tokens y motores de resolución implementados desde cero en Python (solver simplex de dos fases, eliminación gaussiana con pivoteo, secante/bisección para falsa posición, diferencias finitas e interpolación de Newton). Un servicio unificado (resolver_y_persistir) serializa los pasos, guarda tablas, soluciones y gráficas, y clasifica errores como 'no acotado' o 'infactible'. Los datos se persisten en SQLite con migraciones.",
    features: [
      "Método simplex con fase I y fase II, incluyendo restricciones ≥ y =",
      "Eliminación de Gauss y Gauss-Jordan con matrices transformadas",
      "Falsa posición con tolerancia configurable y gráfica de convergencia",
      "Diferenciación finita e interpolación de Newton con polinomio resultante",
      "Explicaciones paso a paso y tabla de iteraciones",
      "Chatbot de IA que explica cada resultado (API de OpenAI)",
      "Autenticación por usuarios con aislamiento de datos (sin IDOR)",
      "Swagger/ReDoc para explorar la API",
    ],
    tech: [
      "Django",
      "Django REST Framework",
      "Python",
      "SQLite",
      "SymPy",
      "OpenAI API",
      "JWT / Token Auth",
      "Swagger",
    ],
    challenges: [
      "Corregir el parsing de coeficientes para que objetivos con coeficientes ≠ 1 se leyeran correctamente",
      "Restaurar la fila objetivo real al pasar de la fase I a la fase II del simplex",
      "Detectar y clasificar problemas no acotados e infactibles de forma robusta",
      "Eliminar vulnerabilidades de IDOR filtrando consultas por usuario",
    ],
    learnings: [
      "Implementé algoritmos numéricos desde cero (simplex en dos fases, pivoteo gaussiano) y aprendí a razonar sobre invariantes como la restauración de la fila objetivo. También reforcé la seguridad de APIs al detectar y corregir vulnerabilidades de IDOR.",
    ],
    accent: "from-blue-500 via-indigo-500 to-violet-500",
    icon: "Calculator",
    images: [
      "/projects/iop-analysis-1.png",
      "/projects/iop-analysis-2.png",
      "/projects/iop-analysis-3.png",
      "/projects/iop-analysis-4.png",
      "/projects/iop-analysis-5.png",
    ],
  },
  {
    slug: "kraz",
    name: "KRAZ",
    repo: "https://github.com/slade1930/kraz",
    year: 2025,
    status: "Académico",
    category: "Investigación de Operaciones",
    tagline: "Resolver problemas de transporte con esquina noroeste y costo mínimo",
    description:
      "Plataforma moderna de investigación de operaciones enfocada en problemas de transporte y asignación. Implementa los métodos de la Esquina Noroeste y el Costo Mínimo para distribuir recursos entre orígenes y destinos de forma óptima, mostrando cada tabla de iteraciones.",
    problem:
      "Los problemas de transporte (minimizar el costo de distribuir bienes desde varios orígenes hacia varios destinos) requieren algoritmos de asignación y comprobaciones de optimalidad tediosas. KRAZ automatiza el cálculo iterativo y muestra la trazabilidad de cada paso.",
    architecture:
      "Aplicación Django 5.2 + Django REST Framework sobre PostgreSQL. Cada algoritmo de resolución vive en su propio módulo (EsquinaNoroeste y CostoMinimo) y se expone vía API REST documentada, con plantillas HTML para la interfaz de usuario, formularios con crispy-tailwind y migraciones gestionadas por Django ORM.",
    features: [
      "Método de la Esquina Noroeste para generar una solución factible inicial",
      "Método del Costo Mínimo como alternativa de mejor aproximación",
      "Tablas de distribución con orígenes, destinos, oferta, demanda y costos",
      "API REST documentada con drf-spectacular",
      "Interfaz web con formularios y validación de datos",
    ],
    tech: ["Django", "DRF", "PostgreSQL", "Python", "crispy-tailwind", "Swagger"],
    challenges: [
      "Modelar el tableau de transporte y su evolución entre iteraciones",
      "Garantizar que las asignaciones respeten las restricciones de oferta y demanda",
      "Mantener el código de cada algoritmo aislado y reutilizable",
    ],
    learnings: [
      "Modelé estructuras algorítmicas complejas (tableau de transporte) y aprendí a aislar cada algoritmo en módulos reutilizables para que el sistema crezca sin acoplarse.",
    ],
    accent: "from-cyan-500 via-blue-500 to-indigo-500",
    icon: "Route",
    images: [
      "/projects/kraz-1.png",
      "/projects/kraz-2.png",
      "/projects/kraz-3.png",
    ],
  },
  {
    slug: "langchain",
    name: "LangChain Lab",
    repo: "https://github.com/slade1930",
    year: 2025,
    status: "Práctica",
    category: "Inteligencia Artificial",
    tagline: "Laboratorio de agentes, prompts, memoria y RAG con LangChain",
    description:
      "Proyecto de experimentación con inteligencia artificial usando el ecosistema LangChain: cadenas de conversación con recuperación (ConversationalRetrievalChain), memoria conversacional (ConversationBufferMemory), plantillas de prompts, embeddings y bases vectoriales con Chroma. Interfaz de prueba construida con Streamlit.",
    problem:
      "Entender cómo se construyen realmente las aplicaciones de IA con LangChain: cómo se estructuran los prompts, cómo se mantiene la memoria entre turnos y cómo un pipeline RAG recupera contexto antes de responder.",
    architecture:
      "Python con LangChain 0.3. Los documentos (PDF) se cargan con PyPDFLoader, se dividen con RecursiveCharacterTextSplitter y se indexan en una base vectorial Chroma con embeddings de Ollama. Las consultas usan ConversationalRetrievalChain con memoria y plantillas de prompts en español con salidas estructuradas mediante output parsers. UI con Streamlit.",
    features: [
      "Carga e indexación de PDFs con splits solapados",
      "Embeddings locales con OllamaEmbeddings",
      "Chat con recuperación de contexto (RAG) y memoria por sesión",
      "Plantillas de prompts personalizadas en español",
      "Parsers de salida para respuestas estructuradas",
      "Modo resumen con plantilla dedicada",
    ],
    tech: [
      "LangChain",
      "Python",
      "Ollama",
      "OpenAI API",
      "ChromaDB",
      "PyPDF",
      "Streamlit",
    ],
    challenges: [
      "Combinar memoria y recuperación sin duplicar contexto",
      "Ajustar los splitter para mejorar la relevancia de los chunks recuperados",
      "Integrar proveedores de embeddings locales y remotos de forma intercambiable",
    ],
    learnings: [
      "Entendí cómo se compone un pipeline RAG de principio a fin, cómo mantener la memoria sin duplicar contexto y cómo alternar proveedores de embeddings locales y remotos de forma intercambiable.",
    ],
    accent: "from-emerald-500 via-teal-500 to-cyan-500",
    icon: "Sparkles",
    images: [
      "/projects/langchain-1.png",
    ],
  },
  {
    slug: "tienda",
    name: "Tienda",
    repo: "https://github.com/slade1930",
    year: 2025,
    status: "Demo",
    category: "E-commerce",
    tagline: "Sistema de comercio electrónico full stack",
    description:
      "Sistema e-commerce completo con catálogo de productos, carrito de compras, autenticación, dashboard administrativo, gestión de inventario y pagos. Arquitectura full stack con backend en Django REST Framework y frontend en React.",
    problem:
      "Montar una tienda online que combine una experiencia de compra fluida (catálogo, carrito, checkout) con un panel administrativo para gestionar productos, pedidos e inventario, todo bajo un mismo sistema con autenticación segura.",
    architecture:
      "Backend Django REST Framework con autenticación JWT (djangorestframework-simplejwt), MySQL como base de datos, CORS habilitado y API documentada con drf-spectacular. El frontend es una SPA en Vite + React con componentes Radix UI, formularios con react-hook-form + Zod, estado con contexto/axios y consumo de la API REST. Diseño responsive y componentes accesibles.",
    features: [
      "Catálogo de productos con imágenes (Pillow)",
      "Carrito de compras persistente y checkout",
      "Autenticación JWT con registro y login",
      "Dashboard administrativo con gestión de inventario",
      "CRUD completo de productos y pedidos",
      "Validación de formularios con Zod",
    ],
    tech: [
      "Django",
      "Django REST Framework",
      "JWT",
      "MySQL",
      "React",
      "Vite",
      "Radix UI",
      "react-hook-form",
      "Zod",
      "axios",
    ],
    challenges: [
      "Coordinar el estado del carrito entre el cliente y el servidor",
      "Modelar las relaciones entre productos, pedidos y usuarios en MySQL",
      "Proteger las rutas administrativas con JWT y roles",
    ],
    learnings: [
      "Coordinar el estado del carrito entre cliente y servidor, modelar relaciones relacionales complejas y proteger rutas administrativas con JWT fueron los mayores aprendizajes de este sistema full stack.",
    ],
    accent: "from-rose-500 via-pink-500 to-fuchsia-500",
    icon: "ShoppingCart",
    images: [
      "/projects/tienda-1.png",
      "/projects/tienda-2.png",
    ],
  },
  {
    slug: "toxic-shield-ai",
    name: "Toxic Shield AI",
    repo: "https://github.com/slade1930",
    year: 2025,
    status: "Demo",
    category: "Inteligencia Artificial",
    tagline: "Detección de mensajes tóxicos y moderación para gaming",
    description:
      "Sistema inteligente para detectar mensajes tóxicos en comunidades gamer. Analiza texto en tiempo real, calcula un score de toxicidad, identifica palabras ofensivas y genera un veredicto legible. Backend FastAPI con autenticación JWT, salas de usuarios, reportes y análisis de mensajes.",
    problem:
      "Las comunidades online necesitan moderar contenido tóxico a gran escala. Toxic Shield AI ofrece una API de análisis de toxicidad que clasifica mensajes, emite un score y un veredicto, y permite a las plataformas integrarlo para reportes y moderación automática.",
    architecture:
      "Backend FastAPI con SQLAlchemy y autenticación JWT. Organizado en módulos (auth, users, rooms, messages, reports, ai) con el servicio de análisis de toxicidad aislado (ai_service) para que su motor se pueda sustituir por OpenAI/Claude sin tocar el resto del sistema. El motor actual combina listas de palabras, análisis de contexto y scoring para devolver is_toxic, toxicity_score y toxic_words_found.",
    features: [
      "Endpoint de análisis de toxicidad (texto → score → veredicto)",
      "Autenticación JWT con registro y login",
      "Salas de usuarios y moderación de mensajes",
      "Sistema de reportes y estadísticas de toxicidad",
      "Documentación interactiva Swagger/ReDoc",
      "Diseñado para integrarse con LLMs en producción",
    ],
    tech: ["FastAPI", "Python", "SQLAlchemy", "JWT", "SQLite", "NLP", "Swagger"],
    challenges: [
      "Diseñar un motor de detección que sea sustituible por un LLM sin cambiar la API",
      "Balancear precisión y falsos positivos en el scoring de toxicidad",
      "Estructurar la app para crecer con más features de moderación",
    ],
    learnings: [
      "Aprendí a aislar un motor de IA (ai_service) para que sea sustituible por un LLM sin cambiar la API, y a balancear precisión contra falsos positivos en clasificación de texto.",
    ],
    accent: "from-red-500 via-orange-500 to-amber-500",
    icon: "Shield",
    images: [
      "/projects/toxic-shield-ai-1.png",
      "/projects/toxic-shield-ai-2.png",
    ],
  },
  {
    slug: "ayzex",
    name: "Ayzex",
    repo: "https://github.com/slade1930/Ayzex",
    year: 2025,
    status: "Producción",
    category: "Web / Marketing",
    tagline: "Centro de viajes turísticos a destinos de todo el mundo",
    description:
      "Plataforma web de turismo que presenta destinos internacionales (Panamá, España, Japón y Portugal) con catálogos visuales, galerías por país, experiencia inmersiva y secciones de autenticación para usuarios. Sitio completo de marketing turístico con diseño responsive.",
    problem:
      "Las agencias de viajes necesitan presentar destinos de forma atractiva y estructurada. Ayzex organiza el contenido por país con páginas dedicadas, galerías, secciones de gastronomía, cultura, naturaleza y monumentos, además de un flujo de registro e inicio de sesión.",
    architecture:
      "Sitio web estático de alto impacto visual (HTML, CSS y JavaScript) con arquitectura multi-página por destino. Incluye headers con navegación, heroes por país, galerías de imágenes optimizadas, secciones temáticas (gastronomía, cultura, monumentos, naturaleza) y páginas de autenticación con estilos propios y Font Awesome.",
    features: [
      "Páginas dedicadas por destino (Panamá, España, Japón, Portugal)",
      "Galerías y secciones temáticas por país",
      "Diseño responsive y accesible",
      "Flujo de login y registro",
      "Branding propio y estética de viaje premium",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Font Awesome", "Responsive Design"],
    challenges: [
      "Mantener coherencia visual entre páginas de destinos muy distintos",
      "Optimizar una gran cantidad de imágenes sin sacrificar calidad",
      "Crear un flujo de autenticación en un sitio estático",
    ],
    learnings: [
      "Trabajar en un sitio de marketing turístico me enseñó a mantener coherencia visual entre páginas muy distintas y a optimizar recursos pesados (imágenes) sin sacrificar la estética.",
    ],
    accent: "from-amber-500 via-orange-500 to-rose-500",
    icon: "Plane",
    images: [
      "/projects/ayzex-1.png",
    ],
  },
  {
    slug: "gestion-contratos-cable",
    name: "Slazx Gestión Contratos Cable Tech",
    repo: "https://github.com/slade1930/SIstema-de-gestion-de-wifi",
    year: 2026,
    status: "En desarrollo",
    category: "Sistema Empresarial",
    tagline: "Administración de clientes, contratos y facturación de cable",
    description:
      "Sistema empresarial para la gestión de contratos de una empresa de servicios de cable: administración de clientes, contratos y facturación. Monorepo pnpm con una web Next.js 16, un worker de tareas en segundo plano y paquetes internos que separan dominio, lógica de infraestructura y UI.",
    problem:
      "Las empresas de servicios necesitan centralizar la gestión documental y de contratos: clientes, planes, facturación, roles y reportes. Este sistema organiza el dominio de negocio en paquetes reutilizables y automatiza tareas periódicas con un worker.",
    architecture:
      "Monorepo pnpm con apps (web, worker) y paquetes (contracts, domain, database, infra, ui, config). La web usa Next.js 16 con autenticación mejorada (better-auth), TanStack Query/Table para datos y tablas, recharts para reportes, react-hook-form + Zod para formularios y zustand para estado. El worker con node-cron ejecuta tareas programadas. La base de datos usa Drizzle ORM con generación de migraciones y seeds. Calidad de código con husky, commitlint, ESLint, Prettier y lint-staged.",
    features: [
      "Gestión documental de clientes y contratos",
      "Dashboard con reportes y gráficas (recharts)",
      "Autenticación con sesiones y roles",
      "CRUD completo de entidades de negocio",
      "Worker de tareas programadas con node-cron",
      "Migraciones y seed de base de datos con Drizzle",
      "Monorepo con paquetes de dominio e infraestructura reutilizables",
    ],
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "better-auth",
      "TanStack Query",
      "TanStack Table",
      "recharts",
      "react-hook-form",
      "Zod",
      "zustand",
      "Drizzle ORM",
      "node-cron",
      "pnpm",
    ],
    challenges: [
      "Diseñar el dominio de negocio en paquetes reutilizables entre la web y el worker",
      "Mantener la tipificación estricta compartida entre frontend y backend (contracts)",
      "Automatizar tareas periódicas sin acoplar el worker al frontend",
    ],
    learnings: [
      "Diseñar un dominio de negocio en paquetes reutilizables entre web y worker, compartir tipificación estricta entre frontend y backend, y automatizar tareas con node-cron fueron los aprendizajes clave de este monorepo.",
    ],
    accent: "from-purple-500 via-violet-500 to-fuchsia-500",
    icon: "FileText",
    images: [
      "/projects/gestion-contratos-cable-1.png",
      "/projects/gestion-contratos-cable-2.png",
      "/projects/gestion-contratos-cable-3.png",
    ],
  },
  {
    slug: "ima",
    name: "IMA",
    repo: "https://github.com/slade1930/Pedidos_IMA",
    live: "https://pedidos-ima.vercel.app",
    year: 2026,
    status: "Producción",
    category: "Sistema Administrativo",
    tagline: "Gestión de pedidos para agroferias con dashboard y reportes",
    description:
      "Sistema administrativo que gestiona pedidos simulando una mejora digital a las agroferias de Panamá: catálogo de productos, registro de pedidos, autenticación, dashboard con métricas y generación de reportes. Desplegado en Vercel.",
    problem:
      "Las agroferias manejan pedidos de forma manual y dispersa. IMA centraliza el proceso: catálogo de productos, gestión de pedidos por usuarios, control de inventario y reportes en un panel administrativo accesible desde el navegador.",
    architecture:
      "Aplicación Next.js + TypeScript con arquitectura moderna de frontend (componentes, estado y consumo de APIs), desplegada en Vercel. Complementada por un sistema desktop en Java (feria-ima) que genera facturas en PDF, gestiona turnos, compras y tarjetas, y produce reportes con JFreeChart sobre MySQL.",
    features: [
      "Autenticación de usuarios y roles",
      "Catálogo de productos y registro de pedidos",
      "Dashboard con métricas del negocio",
      "CRUD completo de entidades",
      "Reportes y facturación en PDF",
      "Despliegue en producción (Vercel)",
    ],
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Vercel",
      "Java",
      "Swing",
      "MySQL",
      "JFreeChart",
    ],
    challenges: [
      "Integrar un frontend web en producción con procesos administrativos del mundo real",
      "Generar facturas y reportes PDF con datos del sistema",
      "Diseñar el dashboard para que las métricas sean accionables",
    ],
    learnings: [
      "Integrar un sistema web en producción con procesos administrativos reales, generar facturas PDF y diseñar dashboards con métricas accionables fueron los aprendizajes de este proyecto.",
    ],
    accent: "from-emerald-500 via-green-500 to-teal-500",
    icon: "LayoutDashboard",
    images: [
      "/projects/ima-1.png",
      "/projects/ima-2.png",
      "/projects/ima-3.png",
      "/projects/ima-4.png",
      "/projects/ima-5.png",
      "/projects/ima-6.png",
      "/projects/ima-7.png",
    ],
  },
];

export const projectCategories = [
  ...new Set(projects.map((p) => p.category)),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
