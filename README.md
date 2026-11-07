# Java para desarrolladores .NET - JConf 2026 Guatemala

Demostración en vivo para la charla "Java para desarrolladores que vienen de .NET" en JConf 2026 Guatemala (7 de noviembre, 2026).

## 🎯 Descripción

Este proyecto contiene una aplicación web de demostración interactiva que compara lado a lado el desarrollo de una API REST en **ASP.NET Core (C#)** y **Spring Boot (Java)**. Ambas implementan la misma funcionalidad: una API CRUD para gestionar tareas.

### ✨ Características Nuevas

- **Interfaz Visual Moderna**: Hero landing, animaciones fluidas, identidad visual por tecnología
- **Editor de Código con Efecto Typewriter**: Código que se escribe línea por línea con controles de velocidad
- **Demo Animado**: Flujo de request/response visualizado con animaciones y barras de latencia
- **Generador de Código con IA**: Genera código equivalente en C# y Java usando IA (con Groq gratis)
- **Navegación con Teclado**: Flechas para navegar, F para pantalla completa
- **Modo Presentador**: Diseñado para proyector con fuentes grandes y alto contraste

### Componentes

- **Backend .NET**: ASP.NET Core 8 + Entity Framework Core + xUnit
- **Backend Java**: Spring Boot 3.2 + Spring Data JPA + JUnit 5  
- **Frontend**: Next.js 16 con TypeScript, Tailwind CSS, Framer Motion y generador IA

## 🚀 Inicio Rápido

### Prerequisitos

- Docker y Docker Compose instalados
- Puertos 3000, 5000 y 8081 disponibles
- (Opcional) API key de Groq para el generador de IA

### Paso 1: Configurar API Key de IA (Opcional pero Recomendado)

El generador de código con IA funciona sin configuración (modo offline con ejemplos), pero para usar IA real:

1. **Obtén una API key GRATUITA de Groq:**
   - Ve a [console.groq.com/keys](https://console.groq.com/keys)
   - Crea una cuenta gratis
   - Genera una nueva API key

2. **Crea un archivo `.env`** en la raíz del proyecto (mismo nivel que `docker-compose.yml`):

```bash
# Copia el archivo de ejemplo
cp .env.example .env

# Edita .env y agrega tu key:
GROQ_API_KEY=gsk_tu_key_aqui
GROQ_MODEL=llama-3.3-70b-versatile
```

**Alternativas** (si prefieres usar otro proveedor):
- OpenAI: agrega `OPENAI_API_KEY=sk-...`
- Anthropic: agrega `ANTHROPIC_API_KEY=sk-ant-...`

⚠️ **Importante**: Si no configuras ninguna key, el generador funcionará en modo offline con ejemplos pre-generados de alta calidad.

### Paso 2: Ejecutar la aplicación completa

```bash
docker compose up --build
```

Espera a que los servicios inicien (puede tomar 2-3 minutos la primera vez). Luego abre:

**🌐 http://localhost:3000**

### 🎮 Controles de Presentación

- **← →**: Navegar entre secciones
- **F**: Activar/desactivar pantalla completa
- **Play/Pause**: Controlar animación de código typewriter
- **1x/2x/5x**: Ajustar velocidad del typewriter

### Detener los servicios

```bash
docker compose down
```

## 🧪 Desarrollo Local

### Backend .NET

```bash
cd dotnet-api
dotnet restore
dotnet build
dotnet test

# Ejecutar API (puerto 5000)
dotnet run
```

**Probar**: http://localhost:5000/api/tareas

### Backend Java

```bash
cd java-api
mvn clean install
mvn test

# Ejecutar API (puerto 8081 internamente 8080)
mvn spring-boot:run
```

**Probar**: http://localhost:8081/api/tareas

### Frontend

```bash
cd frontend
npm install
npm run dev
```

**Ver**: http://localhost:3000

Configura las URLs de las APIs en `.env.local`:
```env
NEXT_PUBLIC_DOTNET_API_URL=http://localhost:5000
NEXT_PUBLIC_JAVA_API_URL=http://localhost:8081

# Opcional: Para desarrollo del generador IA
GROQ_API_KEY=tu_key_aqui
```

## 📚 Estructura del Proyecto

```
.
├── dotnet-api/              # Backend ASP.NET Core
│   ├── Controllers/         # TareasController
│   ├── Models/              # Modelo Tarea
│   ├── Data/                # TareasDbContext (EF Core)
│   └── Dockerfile
├── java-api/                # Backend Spring Boot
│   ├── src/main/java/
│   │   ├── controller/      # TareaController
│   │   ├── model/           # Entidad Tarea
│   │   ├── repository/      # TareaRepository (JPA)
│   │   └── config/          # Inicializador de datos
│   └── Dockerfile
├── frontend/                # Frontend Next.js
│   ├── app/                 # Páginas y layout
│   ├── components/demo/     # Componentes de demostración
│   ├── lib/api/             # Clientes API
│   └── Dockerfile
├── TareasApi.Tests/         # Pruebas unitarias .NET (xUnit)
├── docker-compose.yml       # Orquestación de servicios
└── README.md
```

## 🔍 Endpoints de la API

Ambos backends exponen los mismos endpoints:

| Método | Ruta                      | Descripción                    |
|--------|---------------------------|--------------------------------|
| GET    | /api/tareas               | Listar todas las tareas        |
| GET    | /api/tareas/{id}          | Obtener una tarea por ID       |
| GET    | /api/tareas/completadas   | Filtrar tareas completadas     |
| POST   | /api/tareas               | Crear una nueva tarea          |
| PUT    | /api/tareas/{id}          | Actualizar una tarea existente |
| DELETE | /api/tareas/{id}          | Eliminar una tarea             |

### Ejemplo de Tarea (JSON)

```json
{
  "id": 1,
  "titulo": "Aprender Spring Boot",
  "completada": true
}
```

## 🎨 Diseño Visual

### Colores de JConf

- **Naranja**: `#F29111` (ASP.NET Core / .NET)
- **Teal**: `#00758F` (Spring Boot / Java)
- **Oscuro**: `#090224` (Header/Footer/Código IDE)
- **Blanco**: Fondo principal

### Fuentes

- **Títulos**: Poppins (bold, moderno)
- **Texto**: Open Sans (legible en proyector)
- **Código**: Roboto Mono (monoespaciada en editor oscuro)

### Editor de Código

Los paneles de código imitan VS Code:
- Window chrome con semáforos (rojo/amarillo/verde)
- Pestañas de archivo
- Números de línea
- Fondo oscuro #1e1e1e con syntax highlighting
- Cursor parpadeante durante typewriter
- Barra de progreso por color (.NET naranja, Java teal)

## 🧩 Secciones de la Presentación

1. **Inicio**: Hero landing con comparación visual de ambos stacks
2. **Equivalencias**: Tabla comparativa y modelo de datos lado a lado
3. **Controllers**: REST API endpoints con typewriter effect
4. **Database**: EF Core vs Spring Data JPA con código en vivo
5. **Testing**: xUnit vs JUnit 5 + Mockito
6. **Demo en Vivo**: Ejecución animada contra ambas APIs con timing real
7. **Generador IA**: Crea código equivalente en C# y Java al instante

### 🤖 Generador de Código con IA

El generador usa **Groq** (gratis) como proveedor principal con el modelo `llama-3.3-70b-versatile`:

**Características:**
- Genera código completo (modelo + repository/DbContext + controller) para ambos stacks
- Muestra el código con efecto typewriter sincronizado
- Explica las diferencias en español
- **Modo offline**: Si no hay API key, usa ejemplos pre-generados de alta calidad
- Ejemplos incluidos: notas de estudiante, productos, libros, citas médicas

**Cómo usar:**
1. Escribe lo que necesitas (ej: "CRUD de productos con inventario")
2. Click en "Generar" o Enter
3. El código aparece letra por letra en ambos editores
4. Lee la explicación de diferencias

**Configuración:**
- Usa la variable `GROQ_API_KEY` en el archivo `.env`
- Opcional: cambia el modelo con `GROQ_MODEL`
- Alternativa: `OPENAI_API_KEY` si prefieres GPT

## 🛠️ Tecnologías

### .NET Stack
- ASP.NET Core 8.0
- C# 12
- Entity Framework Core (In-Memory)
- xUnit
- Swagger/OpenAPI

### Java Stack
- Spring Boot 3.2.11
- Java 21
- Spring Data JPA
- H2 Database (In-Memory)
- JUnit 5 + Mockito
- SLF4J

### Frontend
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Fuentes: Poppins, Open Sans, Roboto Mono

## 📝 Notas para el Presentador

### Antes de la charla

1. Ejecuta `docker compose up --build` al menos 30 minutos antes
2. Verifica que las tres URLs respondan:
   - Frontend: http://localhost:3000
   - .NET API: http://localhost:5000/api/tareas
   - Java API: http://localhost:8080/api/tareas
3. Ten abiertas las pestañas en el navegador
4. Prepara ejemplos de tareas para crear durante la demo

### Durante la charla

- El frontend tiene **modo fallback simulado** si un backend falla
- Usa la pestaña "Demo en Vivo" para ejecutar operaciones
- Las respuestas muestran timing, status code y JSON
- Código legible en proyector (fuente monoespaciada, tamaño adecuado)

### Backup

Si Docker falla, cada servicio puede correr localmente (ver sección Desarrollo Local).

## 🤝 Contribuciones

Este es un proyecto de demostración para JConf 2026. Sugerencias y mejoras son bienvenidas vía issues o pull requests.

## 📄 Licencia

MIT License - Proyecto educativo para JConf 2026 Guatemala
