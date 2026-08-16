# 📦 MANUAL DE ENTREGA & CONFIGURACIÓN — NOEMA CONSULTORA

¡Bienvenido al código fuente completo de **Noema Consultora**!

Este sitio web es una solución web corporativa de nivel empresarial para consultoras de investigación de mercado e inteligencia estratégica. Está construida sobre **React + TypeScript + Vite** y optimizada para ser desplegada en **Vercel** con Serverless Functions y **Resend** para envío automatizado de correos.

---

## 🚀 Inicio Rápido en 3 Pasos

### 1. Instalación de Dependencias

Asegúrate de tener [Node.js](https://nodejs.org/) (versión 18 o superior) instalado.

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo local
npm run dev
```

El sitio estará disponible en `http://localhost:5173`.

---

## ⚙️ Configuración del Formulario de Contacto & Correos (Resend)

El formulario de la web se comunica con `/api/contact` (Vercel Serverless Function). Para recibir los correos en tu bandeja de entrada:

1. Crea una cuenta gratuita en [Resend.com](https://resend.com).
2. Verifica tu dominio (ej: `noemaconsultora.com.py` o `.com`) agregando los registros DNS que indica Resend.
3. Genera una **API Key** en Resend.
4. En **Vercel** -> tu proyecto -> **Settings** -> **Environment Variables**, agrega:

| Variable | Descripción | Ejemplo |
|---|---|---|
| `RESEND_API_KEY` | Tu clave secreta de Resend | `re_123456789_abcdefg` |
| `NOTIFICATION_EMAIL` | Correo donde recibirás los leads | `contacto@tu-dominio.com` |
| `SENDER_EMAIL` | Remitente del sistema | `Noema Consultora <contacto@tu-dominio.com>` |

---

## 🌐 Vinculación de Dominio Propio en Vercel

1. Entra a tu proyecto en **Vercel Dashboard**.
2. Ve a **Settings** -> **Domains**.
3. Escribe tu dominio (ej: `tu-dominio.com` o `tu-dominio.com.py`).
4. Configura en el proveedor donde compraste el dominio:
   - **Registro A**: `@` -> `76.76.21.21`
   - **Registro CNAME**: `www` -> `cname.vercel-dns.com`

---

## ✏️ Personalización de Textos e Imágenes

- **Textos y Secciones**:
  - `src/components/Hero.tsx` — Titular principal y botones CTA.
  - `src/components/About.tsx` — Información de la empresa y pilares.
  - `src/components/Services.tsx` — Catálogo de servicios de investigación.
  - `src/components/Methodology.tsx` — Línea de tiempo interactiva del proyecto.
  - `src/components/FAQ.tsx` — Preguntas frecuentes.
  - `src/components/Contact.tsx` — Datos de contacto y formulario.
  - `src/components/FloatingWhatsApp.tsx` — Número de WhatsApp.

- **Imágenes**:
  - Todas las imágenes principales están guardadas en `public/assets/images/`.
  - Reemplaza los archivos con el mismo nombre y formato (preferentemente `.jpg` o `.webp`).

---

## 🛠️ Comandos Disponibles

- `npm run dev`: Inicia el entorno de desarrollo con Hot Reload.
- `npm run build`: Compila el código a producción en la carpeta `dist/`.
- `npm run preview`: Previsualiza la versión compilada localmente.
- `npm run zip`: Crea un archivo `.zip` limpio con todo el código listo para enviar o respaldar.

---

© Noema Consultora — Todos los derechos reservados.
