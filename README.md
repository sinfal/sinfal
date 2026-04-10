# SINFAL — Portal (React + Vite)

**Sistema Nacional para la Federación de Trabajadores — Portal Institucional**

Aplicación frontend moderna y escalable del sistema SINFAL: heredada de un portal HTML estático, ahora es una **SPA (Single Page Application)** con React 18, Vite y Tailwind CSS.

## 📋 Descripción General

SINFAL es una plataforma integral de gestión institucional diseñada para administrar afiliaciones, consultas de datos, reportes analíticos y procedimientos administrativos en una federación nacional. El backend utiliza **MongoDB Realm (Stitch)** para sincronización en tiempo real.

### Módulos Principales

1. **Dashboard** — Overview operacional en tiempo real
   - Métricas de crecimiento y estado de afiliaciones
   - Registros recientes con avatares
   - Resumen semanal con indicadores de cumplimiento
   - Próximos reportes programados

2. **Registro de Afiliada** — Formulario multipasos (4 fases)
   - Datos Personales: nombre, DNI, email, teléfono
   - Ubicación Regional/Seccional: región administrativa, seccional operativa, orden
   - Salud y Previsión: afecciones médicas, grupo sanguíneo
   - Carga de Archivos: DNI, certificados médicos
   - Guardado en borrador, validaciones en tiempo real

3. **Consulta** — Búsqueda y perfil detallado
   - Barra de búsqueda por cédula o nombre (con autocompletado)
   - Tarjeta de perfil con foto y datos de contacto
   - Validación documental con estado visual
   - Información completada: perfil, estado médico, última actualización
   - Historial de trámites y vínculos familiares
   - Botones de acción: Ver Cédula, Certificado Médico, Editar
   - **Ejemplo de búsqueda**: María Paula Rodriguez (1.020.300.400)

4. **Reportes** — Centro de análisis e inteligencia
   - 4 Métricas principales: Crecimiento, Auditorías, Certificadores, Promedio Edad
   - Gráfico de Tendencia: comparativo 2024 vs 2023 (11 meses)
   - Gráfico Circular: Distribución por Rango de Edad (18-50, 21-60, 60+)
   - Tabla de Regionales: porcentajes de afiliadas por región
   - Tabla de Reportes Recientes: nombre, fecha, regional, formato (PDF/EXCEL), descarga
   - Filtros globales: período, regional
   - Estado General: indicador de operatividad

## 🎨 Diseño & Estilo

- **Paleta Corporativa**: Navy (#001233) + Emerald (#10b981)
- **Framework**: Tailwind CSS (responsive, dark mode ready)
- **Tipografía**: Inter
- **Iconografía**: Material Symbols (Google)
- **Tema**: Limpio, profesional, institucional

### Componentes Reutilizables

- **AppShell**: Sidebar + Header + Outlet
- **Cards de Métrica**: Con iconos y tendencias
- **Tablas Interactivas**: Con hover effects
- **Formularios**: Inputs con validación visual, selects, date pickers
- **Gráficos**: Barras, circulares, indicadores
- **Alertas**: Avisos legales, estados, notificaciones

## 🛠️ Stack Técnico

### Dependencias Directas

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.28.0"
}
```

### Dev Dependencies

```json
{
  "vite": "^5.4.11",
  "@vitejs/plugin-react": "^4.3.4",
  "tailwindcss": "^3.4.15",
  "postcss": "^8.4.49",
  "autoprefixer": "^10.4.20"
}
```

### Build Tools

- **Vite**: Servidor dev ultra-rápido, bundling optimizado
- **Tailwind**: Utilidades CSS, purging automático
- **PostCSS**: Transformaciones CSS avanzadas

## 📂 Estructura del Proyecto

```
c:\Sinfal/
├── index.html                 # Punto de entrada (monta #root)
├── vite.config.js             # Config Vite + alias @
├── tailwind.config.js         # Custom colors (navy, emerald)
├── postcss.config.js          # Autoprefixer + Tailwind
├── package.json               # Dependencies
├── jsconfig.json              # Path aliases
├── public/                    # Assets estáticos
│   └── vite.svg
├── legacy/
│   └── login-SINFAL.html      # HTML original (referencia)
└── src/
    ├── main.jsx               # Entrada React (Router + AuthProvider)
    ├── index.css              # Tailwind imports
    ├── app/
    │   └── App.jsx            # Rutas principales
    ├── context/
    │   └── AuthContext.jsx    # Estado global auth (mock/Stitch)
    ├── components/
    │   └── AppShell.jsx       # Layout: Sidebar + Header
    ├── pages/
    │   ├── LoginPage.jsx      # /
    │   ├── DashboardPage.jsx  # /dashboard
    │   ├── RegistroPage.jsx   # /registro
    │   ├── ConsultaPage.jsx   # /consulta
    │   └── ReportesPage.jsx   # /reportes
    ├── features/              # Módulos específicos (expandible)
    │   ├── auth/
    │   ├── consulta/
    │   ├── dashboard/
    │   ├── registro/
    │   └── reportes/
    ├── shared/
    │   ├── components/        # Componentes reutilizables
    │   └── layouts/           # Layouts comunes
    ├── data/                  # Mock data, fixtures
    ├── api/
    │   └── mocks/            # Mock responses
    └── lib/                   # Utilidades y helpers
```

## 🚀 Instalación y Desarrollo

### Requisitos

- **Node.js 18+** (recomendado LTS: 20.x o 22.x)
- **npm 9+** o **yarn**

### Instalación Inicial

```bash
cd c:\Sinfal
npm install
```

### Servidor de Desarrollo

```bash
npm run dev
```

**Salida esperada:**
```
  VITE v5.4.21  ready in 657 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Abre **http://localhost:5173** en tu navegador.

### Build para Producción

```bash
npm run build
# Genera carpeta dist/ optimizada
```

### Preview del Build

```bash
npm run preview
# Simula servidor de producción localmente
```

## 🔐 Flujo de Autenticación

### Actual (Mock)

1. Usuario llega a `/` (LoginPage)
2. Ingresa email y contraseña (cualquier formato válido)
3. AuthContext simula login y guarda en memoria
4. Redirige a `/dashboard` ✅
5. Cierra sesión → vuelve a `/`

**⚠️ Sesión volátil**: Si recargas F5, la sesión se pierde

### Futuro (Integración Stitch)

```javascript
// AuthContext.jsx (futuro)
import { useRealmApp } from '@realm/react';

export const useAuth = () => {
  const app = useRealmApp();
  const user = app.currentUser;
  
  const login = async (email, password) => {
    const credentials = BSON.Realm.Credentials.emailPassword(email, password);
    await app.logIn(credentials);
  };
  
  // ...JWT tokens, refresh logic, etc
};
```

**TODO**: 
- [ ] Conectar con Stitch Authentication
- [ ] Implementar JWT tokens seguros
- [ ] Persistencia con localStorage
- [ ] Refresh token automático
- [ ] Protección CSRF

## 📋 Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run dev` | Servidor Vite (http://localhost:5173) |
| `npm run build` | Build production (dist/) |
| `npm run preview` | Preview build local |

## 🔗 Rutas Protegidas

```javascript
// src/app/App.jsx

/ → LoginPage
  ↓
/dashboard → DashboardPage (protegida)
/registro → RegistroPage (protegida)
/consulta → ConsultaPage (protegida)
/reportes → ReportesPage (protegida)
* → 404 redirect to /
```

**ProtectedRoute**: Valida `isAuthenticated` del AuthContext

## 📊 Datos Simulados (Mocks)

Todos los datos mostrados son ejemplos para demostración:

**Afiliadas de Ejemplo:**
- María Paula Rodriguez (Antioquia, Belén)
- Jimena Duarte (Bogotá, Sur)
- Marcos Alvarez (Bogotá, Sur)
- Lucia Castro (Antioquia, Este)

**Métricas Ejemplo:**
- Total: 12.450 afiliadas
- Activas: 11.890 (95.5%)
- Nuevas este mes: 85
- Seccionales: 32

**Reportes Ejemplo:**
- Crecimiento mensual: 2.860 (+3%)
- Reportes de auditoría: 142
- Certificadores vencidos: 89
- Promedio edad: 34.2 años

## 🔄 Integración Stitch/MongoDB Realm

### Paso 1: Instalar SDK

```bash
npm install mongodb-realm-web
```

### Paso 2: Configurar AuthContext

```javascript
import * as Realm from "realm-web";

const app = new Realm.App({ id: "PROJECT_ID" });
```

### Paso 3: Conectar llamadas API

```javascript
// Ejemplo: Buscar afiliada
const buscarAfiliada = async (cedula) => {
  const user = app.currentUser;
  const mongodb = user.mongoClient("mongodb-atlas");
  const afiliadas = mongodb.db("sinfal").collection("afiliadas");
  return await afiliadas.findOne({ cedula });
};
```

## ✅ Funcionalidades Implementadas

- ✅ Login con AuthContext
- ✅ Rutas protegidas (ProtectedRoute)
- ✅ Dashboard con métricas
- ✅ Formulario Registro multipasos
- ✅ Búsqueda de afiliadas (mock)
- ✅ Perfil detallado con validaciones
- ✅ Reportes y gráficos
- ✅ Sidebar con navegación activa
- ✅ Tailwind CSS responsive
- ✅ Material Symbols icons

## 📋 Funcionalidades Pendientes (Roadmap)

### Fase 1: Backend Real (CRÍTICA)
- [ ] Conectar AuthContext con Stitch/Realm
- [ ] JWT tokens seguros
- [ ] Persistencia con localStorage
- [ ] Logout en servidor
- [ ] Rate limiting

### Fase 2: UX Enhancements (MEDIA)
- [ ] Validación robusta de formularios
- [ ] Toasts/Notificaciones visuales
- [ ] Loading spinners
- [ ] Manejo de errores mejorado
- [ ] Confirmaciones de acción

### Fase 3: Features Avanzadas (MEDIA)
- [ ] Exportación de reportes (PDF/EXCEL)
- [ ] Gráficos interactivos (recharts, d3)
- [ ] Filtros avanzados
- [ ] Búsqueda con debounce
- [ ] Paginación de resultados

### Fase 4: Testing & Optimización (BAJA)
- [ ] Jest + React Testing Library
- [ ] E2E tests con Cypress
- [ ] Performance audits
- [ ] Bundle size optimization
- [ ] SEO (meta tags, sitemap)

## 🎯 Variables de Configuración

### Tailwind Colors (Corporativo)

```javascript
// tailwind.config.js
colors: {
  sinfal: {
    navy: "#001233",      // Principal
    grey: "#757575",      // Secundario
    input: "#f2f2f2",     // Inputs background
    page: "#f4f4f2",      // Page background
  },
  emerald: {
    50: "#f0fdf4",
    600: "#10b981",
    700: "#059669",
  }
}
```

### Vite Alias

```javascript
// vite.config.js
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
}
```

## 🌍 Deployment

### Vercel

```bash
npm install -g vercel
vercel
# Sigue prompt y selecciona c:\Sinfal
```

### Netlify

```bash
npm run build
# Arrastra carpeta dist/ a netlify.com
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 📝 Licencia

**Propiedad de The Monolith - Autoridad Institucional**

Confidencial — Uso interno únicamente.

## 👤 Contacto

- **Email**: admin@monolith-authority.org
- **Admin Portal**: Acceder al Dashboard en /dashboard
