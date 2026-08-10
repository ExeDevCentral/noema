# NOEMA — Investigación de Mercado & Inteligencia Estratégica

![Noema Header Banner](assets/images/heroes/hero_main.jpg)

**Noema** es una consultora especializada en **investigación de mercado cualitativa y cuantitativa, business intelligence y análisis de datos estratégicos** con sede en Asunción, Paraguay.

---

## 🌟 Características Principales

- **Diseño Ultra Ejecutivo & Responsive**: Estética refinada con tipografía de lujo (*Cormorant Garamond* & *Plus Jakarta Sans*), microinteracciones fluidas y diseño adaptativo a todo dispositivo.
- **Calculadora Interactiva de Diagnóstico Metodológico**: Herramienta dinámica que permite simular la arquitectura de estudio sugerida (muestra, tiempo, técnica y entregables).
- **Tablero Dinámico de Data Insights (Chart.js)**: Gráficos interactivos de sentimiento de marca, segmentación psicográfica y proyecciones de tendencias de mercado.
- **Formulario de Contacto Integrado**: Conectado con Vercel Serverless Functions (`/api/contact`) y soporte de notificaciones vía Web3Forms.
- **SEO de Alto Impacto**: Optimizado con metadatos Open Graph, Twitter Cards, estructura semántica HTML5 y datos estructurados **JSON-LD** (`Schema.org`).
- **Control Metodológico ESOMAR & ISO 20252**: Alineado con los estándares internacionales de investigación social y de mercados.

---

## 🛠️ Tecnología y Stack

- **Frontend**: React 18 + TypeScript + Vite.
- **Estilos**: CSS3 personalizado (Design System con variables, Glassmorphism, micro-animaciones) con tema oscuro ambient (#11171D).
- **Tipografías e Iconos**: Google Fonts (*Cormorant Garamond*, *Plus Jakarta Sans*), FontAwesome 6.4, `country-flag-icons`.
- **Backend / Serverless**: Vercel Serverless Function (`api/contact.js`) para procesamiento de formularios.
- **Despliegue**: Vercel.

---

## 📁 Estructura del Proyecto

```text
noema/
├── api/
│   └── contact.js          # Vercel Serverless Function para formulario
├── public/
│   └── assets/images/      # Optimizado: imágenes de heroes, corporativas, etc.
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── Methodology.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   ├── useRevealOnScroll.ts
│   │   └── useSmoothScroll.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css          # Hoja de estilos principal (Design System)
├── .gitignore              # Exclusiones de Git
├── index.html              # Entry point de la aplicación
├── package.json
└── vercel.json             # Configuración de cabeceras de seguridad y URLs limpias
```

---

## 🚀 Instalación y Desarrollo Local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Levantar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

3. Abrir en el navegador en la URL que indique la consola (normalmente `http://localhost:5173`).

---

## 📜 Licencia & Créditos

Desarrollado y diseñado con precisión ejecutiva por **[Exepaginasweb.com](https://exepaginasweb.com)**.
© 2026 Noema Consultora. Todos los derechos reservados.
