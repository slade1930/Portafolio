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
    slug: "resazon-loop",
    name: "ReSazón Loop",
    repo: "https://github.com/slade1930/Resazon",
    live: "https://resazon.vercel.app",
    year: 2026,
    status: "Producción",
    category: "IA / Gastronomía",
    tagline: "Convierte lo que tienes en la cocina en recetas panameñas, con visión e IA",
    description:
      "Aplicación web panameña que convierte lo que hay en tu despensa en recetas reales: escanea una foto de tus ingredientes, busca platos tradicionales por lo que tienes o genera una receta original con IA. Todo sobre un recetario panameño ingestado en un RAG con búsqueda semántica por embeddings, y una identidad visual cálida inspirada en el culantro, el maíz y el ají. Lema: «Menos desperdicio. Más sazón.».",
    problem:
      "El desperdicio de comida en casa casi siempre empieza con la misma pregunta: «tengo estos ingredientes, ¿qué cocino?». Las apps de recetas asumen que el usuario ya sabe qué quiere y lo obligan a buscar por nombre de plato, no por lo que realmente tiene en la nevera. ReSazón Loop invierte el flujo: parte de los ingredientes reales (detectados de una foto), los cruza contra un recetario panameño y devuelve platos que se pueden cocinar hoy, sin comprar nada extra.",
    architecture:
      "Monolito modular en FastAPI con capas estrictas: routers finos en api/v1, casos de uso en services, acceso a datos aislado en repositories (SQLAlchemy async, 12 tablas) y contratos Pydantic en schemas. La visión usa Gemini Vision para detectar ingredientes en la imagen y un normalizador que los mapea al catálogo real antes de confirmarlos. La generación y los embeddings van por un cliente Gemini único con prompts versionados y parser de salida. El RAG ingesta el recetario «Nuestro Sabor Panamá», genera embeddings y los guarda en PostgreSQL con pgvector; el retriever alimenta la lógica pura de recipes (matcher, ranker, assembler). La nutrición se estima con heurísticas. El frontend es React 18 + Vite 6 + Tailwind 4 con Radix, y el despliegue separa Vite en Vercel y FastAPI en Render con PostgreSQL + pgvector.",
    features: [
      "Escaneo de despensa: sube una foto y Gemini Vision detecta los ingredientes",
      "Normalización y confirmación editable de la lista detectada antes de buscar",
      "Búsqueda de recetas panameñas por los ingredientes que ya tienes",
      "Generación de recetas originales con IA cuando ningún plato del recetario encaja",
      "RAG sobre el recetario «Nuestro Sabor Panamá» con búsqueda semántica por embeddings (pgvector)",
      "Ranking de recetas por cobertura de ingredientes y ajuste de porciones",
      "Estimación heurística de macros y valores nutricionales por receta",
      "Identidad visual panameña (culantro, maíz, ají) con tipografías Fraunces, Inter y Caveat",
    ],
    tech: [
      "Python 3.12",
      "FastAPI",
      "SQLAlchemy 2 (async)",
      "PostgreSQL 16",
      "pgvector",
      "Alembic",
      "Gemini Vision",
      "Gemini Embeddings",
      "RAG",
      "Pydantic v2",
      "React 18",
      "Vite 6",
      "TypeScript",
      "Tailwind CSS 4",
      "Radix UI",
      "Vercel",
      "Render",
    ],
    challenges: [
      "Normalizar ingredientes detectados por visión (lenguaje libre, plurales, regionalismos) contra un catálogo cerrado antes de consultar el recetario",
      "Diseñar el RAG para que las recetas recuperadas sean cocinables de verdad: matcher por cobertura, no solo similitud semántica",
      "Mantener la API key de Gemini exclusivamente en el backend y validar MIME y tamaño de imagen antes de tocar cualquier servicio",
      "Separar lógica pura de recetas (matcher, ranker, assembler) de la infraestructura para poder probarla sin IA ni base de datos",
    ],
    learnings: [
      "Aprendí a integrar visión, generación y embeddings de un mismo proveedor detrás de una capa de IA única con prompts versionados, y a construir un RAG útil para un dominio concreto (recetas) donde la recuperación semántica sola no basta: hay que rankear por lo que el usuario realmente puede cocinar. También reforcé el diseño por capas y la validación de entradas no confiables (imágenes) en el backend.",
    ],
    images: ["/projects/resazon-1.png", "/projects/resazon-2.png"],
    accent: "from-emerald-500 via-lime-500 to-amber-500",
    icon: "ChefHat",
  },
  {
    slug: "smartbank",
    name: "SmartBank Core",
    repo: "https://github.com/slade1930/ETE-",
    year: 2026,
    status: "Demo",
    category: "Fintech / Banca",
    tagline: "Banca digital full stack: cuentas, transferencias, tarjetas y auditoría",
    description:
      "Plataforma bancaria digital completa construida como un monolith modular: autenticación JWT con roles, cuentas de ahorro y corriente con números verificados por Luhn, transferencias transaccionales con lock pesimista e idempotencia, tarjetas, notificaciones, auditoría y dashboards separados para cliente y administrador. Interfaz React con tema oscuro/claro y paleta corporativa azul.",
    problem:
      "Construir un core bancario que combine la robustez del backend (consistencia transaccional, auditoría, control de riesgo) con una experiencia de cliente moderna. El reto no era solo acumular features, sino mantener la seguridad y la integridad financiera en cada operación: transferencias que no se dupliquen, saldos consistentes y trazabilidad completa.",
    architecture:
      "Monolith modular en Java 21 + Spring Boot 3.5 con módulos por dominio (auth, customer, account, transaction, transfer, card, notification, audit, fraud, dashboard). Las transferencias se ejecutan con @Transactional, lock pesimista sobre cuentas e idempotencia para evitar duplicados. Persistencia en PostgreSQL 16 con Flyway para migraciones (schema + seed de dev). Seguridad con Spring Security + JWT (jjwt), BCrypt y roles CUSTOMER/ADMIN. Facecla un detector de fraude tras un interfaz (FraudDetectorService), hoy NoOp y preparado para Ollama. El frontend es Next.js 14 + React 18 + TypeScript con TanStack Query, zustand, Recharts para gráficas y Tailwind + shadcn/ui, con un sistema de diseño en paleta azul.",
    features: [
      "Autenticación JWT con registro, login y roles (cliente/administrador) con BCrypt",
      "Cuentas de ahorro y corriente con número de cuenta con dígito verificador Luhn",
      "Transferencias transaccionales con bloqueo pesimista, idempotencia y rollback",
      "Tarjetas y notificaciones vinculadas a la actividad del cliente",
      "Auditoría completa (AuditLog) y hook de detección de fraude extensible",
      "Dashboard de cliente: balance total, cuentas, movimientos y acciones de depósito/retiro",
      "Panel de administración: métricas globales, clientes, transferencias y auditoría",
      "UI React senior con tema oscuro/claro y paleta corporativa azul",
    ],
    tech: [
      "Java 21",
      "Spring Boot 3.5",
      "PostgreSQL 16",
      "Flyway",
      "Spring Security",
      "JWT",
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "TanStack Query",
      "zustand",
      "Recharts",
      "Docker",
    ],
    challenges: [
      "Garantizar consistencia y evitar duplicados en transferencias concurrentes (lock pesimista + idempotencia)",
      "Diseñar la detección de fraude como un sistema sustituible por un LLM (Ollama) sin tocar el dominio",
      "Organizar un monolith modular con claridad de responsabilidades y pruebas de integración (Testcontainers)",
    ],
    learnings: [
      "Reforcé el modelado de transacciones financieras concurrentes (bloqueo pesimista, idempotencia, rollback), integré seguridad de punta a punta (JWT + roles + BCrypt) y aprendí a estructurar un monolith modular en un core bancario manteniendo trazabilidad y auditoría en cada operación.",
    ],
    images: [
      "/projects/smartbank-core-1.png",
      "/projects/smartbank-core-2.png",
      "/projects/smartbank-core-3.png",
    ],
    accent: "from-blue-500 via-sky-500 to-indigo-600",
    icon: "Landmark",
  },
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
    slug: "itas",
    name: "ITAS",
    repo: "https://github.com/slade1930/Pedidos_IMA",
    live: "https://pedidos-ima.vercel.app",
    year: 2026,
    status: "Producción",
    category: "Sistema Administrativo",
    tagline: "Sistema de gestión integral para ferias: pedidos, inventario, pagos y roles",
    description:
      "Sistema de gestión integral (ITAS) para digitalizar ferias y agroferias panameñas: autenticación con roles, catálogo de productos con imágenes, control de inventario, pedidos, pagos, notificaciones y dashboards. Backend FastAPI sobre PostgreSQL y Redis, frontend Next.js 16 con React 19, desplegado en producción.",
    problem:
      "Las ferias manejan pedidos, inventario y pagos de forma manual y dispersa. ITAS centraliza todo el proceso: catálogo de productos, control de stock, gestión de pedidos por usuario, pagos, notificaciones y reportes en un panel administrativo accesible desde el navegador.",
    architecture:
      "Monorepo con backend FastAPI (Python) y frontend Next.js 16 + React 19. El backend se organiza por capas (rutas, servicios, repositorios y modelos SQLAlchemy async) sobre PostgreSQL (Neon en producción), con Redis para estado de sesión, bloqueos y rate limiting, y Celery para tareas en segundo plano. La autenticación usa JWT en cookies httpOnly con rotación de refresh y RBAC (admin, staff y usuario). Las imágenes de productos se almacenan en Cloudinary. Todo el stack está dockerizado (backend, frontend y PostgreSQL) y desplegado con el frontend en Vercel y el backend en Render.",
    features: [
      "Autenticación con JWT en cookies httpOnly, rotación de refresh y bloqueo por intentos fallidos",
      "Roles y permisos (admin, staff, usuario) con rutas protegidas",
      "Catálogo de productos con imágenes en Cloudinary e inventario con control de stock",
      "Gestión de pedidos y pagos con estados y validación de recogida",
      "Dashboard con métricas y reportes del negocio",
      "Notificaciones y tareas en segundo plano con Celery",
      "Rate limiting, CSRF por origen y cabeceras de seguridad",
      "Despliegue en producción (Vercel + Render + PostgreSQL/Neon)",
    ],
    tech: [
      "Python 3",
      "FastAPI",
      "SQLAlchemy 2",
      "PostgreSQL",
      "Neon",
      "Redis",
      "Celery",
      "JWT",
      "Cloudinary",
      "Docker",
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "Vercel",
      "Render",
    ],
    challenges: [
      "Mantener la consistencia de inventario y pedidos bajo operaciones concurrentes",
      "Asegurar la sesión entre frontend y backend en dominios distintos (cookies SameSite=None, CSRF y CORS)",
      "Separar responsabilidades por capas y desplegar el stack completo con Docker y servicios cloud",
    ],
    learnings: [
      "Aprendí a llevar un sistema administrativo real a producción: autenticación segura con JWT en cookies, RBAC, control de inventario y pedidos, y un despliegue separado de frontend y backend con PostgreSQL gestionado.",
    ],
    accent: "from-emerald-500 via-green-500 to-teal-500",
    icon: "LayoutDashboard",
    images: [
      "/projects/itas-1.png",
      "/projects/itas-2.png",
      "/projects/itas-3.png",
      "/projects/itas-4.png",
      "/projects/itas-5.png",
      "/projects/itas-6.png",
      "/projects/itas-7.png",
    ],
  },
];

export const projectCategories = [
  ...new Set(projects.map((p) => p.category)),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
