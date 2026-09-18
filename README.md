# 🏠 NOEMA — Sitio Web Completo

**Noema Consultora** | Investigación de Mercado & Inteligencia Estratégica | Asunción, Paraguay

> Este es el sitio web completo de Noema. Seguí estos pasos **uno por uno** y tendrás el sitio funcionando en tu computadora. **No necesitas saber programar.**

---

## 📋 Lo que necesitás antes de empezar

Tenés que tener instalado en su computadora **dos programas** (gratis):

| # | Programa | Para qué sirve | Dónde descargar |
|---|----------|----------------|-----------------|
| 1 | **Visual Studio Code** (VS Code) | Es el programa donde vas a ver y trabajar el código | 👉 [code.visualstudio.com](https://code.visualstudio.com) |
| 2 | **Node.js** | Es el programa que hace funcionar el sitio web | 👉 [nodejs.org](https://nodejs.org) — Bajá la versión **LTS** (es la que dice "Recommended") |

> ⏱️ Cada descarga tarda **2-5 minutos**. Son programas gratis.

---

## 🚀 Paso 1: Instalar Visual Studio Code

1. Hacé clic en el link de arriba: **[code.visualstudio.com](https://code.visualstudio.com)**
2. Hacé clic en el botón azul **"Download for Windows"**
3. Cuando se descargue el archivo, hacé doble clic para instalarlo
4. Aceptá todo con **"Siguiente"** y **"Instalar"**
5. Cuando termine, abrí Visual Studio Code

---

## 🚀 Paso 2: Instalar Node.js

1. Hacé clic en el link de arriba: **[nodejs.org](https://nodejs.org)**
2. Hacé clic en el botón grande **"Download"** (la versión que dice **LTS**)
3. Cuando se descargue, hacé doble clic para instalarlo
4. Aceptá todo con **"Siguiente"** y **"Instalar"**
5. Cuando termine, **reiniciar tu computadora** (importante!)

> ✅ **Para verificar que se instaló bien:** Abrí VS Code, apretá la tecla `` ` `` (tildé invertida) en la terminal, escribí `node --version` y dale Enter. Si aparece un número como `v20.x.x`, ¡todo bien!

---

## 🚀 Paso 3: Descargar el código

### Opción A: Si te envié una carpeta comprimida (ZIP)

1. Buscá el archivo **`noema-main.zip`** en tu computadora (escritorio o Descargas)
2. Hacé doble clic para abrirlo
3. Hacé clic en **"Extraer todo"** y elegí tu **Escritorio**
4. Ahora tenés una carpeta llamada **`noema-main`** en tu escritorio

### Opción B: Si vas a usar GitHub

1. En VS Code, apretá **Ctrl+Shift+P** (o Cmd+Shift+P en Mac)
2. Escribí **"Git: Clone"** y dale Enter
3. Pegá esta dirección: `https://github.com/ExeDevCentral/noema.git`
4. Elegí dónde guardarlo (tu **Escritorio**)
5. Esperá a que termine de descargar

---

## 🚀 Paso 4: Abrir el proyecto en VS Code

1. Abrí **Visual Studio Code**
2. Hacé clic en **"Archivo"** → **"Abrir carpeta..."**
3. Buscá la carpeta **`noema-main`** (la que extrajiste antes)
4. Hacé clic en **"Seleccionar carpeta"**
5. Esperá un momento a que VS Code cargue todo

---

## 🚀 Paso 5: Instalar todo lo que necesita el sitio

1. En VS Code, abajo a la izquierda verás una **terminal** (un recuadro negro). Si no la ves, apretá el menú **"Ver"** → **"Terminal"**
2. En esa terminal, escribí esto y dale **Enter**:

```
npm install
```

3. **Esperá entre 1 y 3 minutos** (depende de tu internet)
4. Cuando termine, vas a ver que aparecieron muchos archivos nuevos — eso está bien

> ✅ Si ves que en la carpeta apareció una carpeta nueva llamada **`node_modules`**, ¡todo salió bien!

---

## 🚀 Paso 6: Ver el sitio web funcionando

1. En la **terminal** de VS Code (donde antes escribiste `npm install`), escribí:

```
npm run dev
```

2. Dale **Enter**
3. Se va a abrir una ventana del navegador (Chrome, Edge, Firefox) mostrando el **sitio web de Noema** 🎉
4. También vas a ver una dirección tipo `http://localhost:5173` en la terminal

> ✅ **¡Listo!** El sitio está corriendo. Podés cerrar esa terminal cuando quieras.

---

## 🔄 Si querés volver a correr el sitio después

Cada vez que quieras ver el sitio otra vez:

1. Abrí la carpeta en VS Code (Archivo → Abrir carpeta → `noema-main`)
2. En la terminal escribí: `npm run dev`
3. Enter
4. Se abrirá el sitio en tu navegador

---

## 🛑 Solución de problemas comunes

| Problema | Solución |
|----------|----------|
| `npm` no se reconoce | Reinstalá Node.js y **reiniciá la computadora** |
| La terminal no se abre | En VS Code: Menú → Ver → Terminal |
| No se abre el navegador | Copiá la dirección `http://localhost:5173` y pegala en tu navegador |
| `npm install` da error | Mirá el error, limpiá la terminal (`Ctrl+Shift+C`) y reejecutá `npm install` |

---

## 🚀 Paso 7 (opcional): Generar la versión de producción

Si algún día necesitás el sitio preparado para subir a internet, en la terminal de VS Code escribí:

```
npm run build
```

Esto crea una carpeta **`dist/`** con el sitio listo para producción (más liviano que el modo desarrollo). Para verlo localmente:

```
npm run preview
```

Luego abrí la dirección que aparece en la terminal (ej. `http://localhost:4173`).

> La versión en internet (https://noema.com.py) se actualiza sola cada vez que se suben los cambios a GitHub (git push) — Vercel se encarga del resto.

---

## 📁 Estructura del proyecto

```
noema-main/
├── src/              → El código del sitio (páginas, menú, contacto, estilos)
├── public/           → Imágenes, fuentes y archivos que se publican tal cual
├── scripts/          → Herramientas de mantenimiento (no tocar, ver abajo)
├── dist/             → El sitio ya compilado para producción (generado con npm run build)
├── assets-in/        → Archivos fuente temporales (fuentes originales, no se sube a GitHub)
├── api/              → El formulario de contacto
├── index.html        → La página principal
├── package.json      → Lista de programas que necesita
└── vercel.json       → Configuración para subir a internet
```

---

## ⚡ Optimizaciones de rendimiento aplicadas

El sitio está optimizado para cargar rápido, sobre todo en celulares:

- **Imágenes en WebP** con tamaño y calidad ajustados por uso (hero, cards, fondos). La imagen principal (LCP) se precarga con prioridad alta.
- **Iconos (Font Awesome) recortados a medida**: solo se usan los 23 iconos que aparecen en el sitio, servidos desde el propio sitio en un archivo de ~5 KiB (antes se descargaba una librería de 273 KiB desde un servidor externo).
- **Fuentes propias instaladas y optimizadas** (Cormorant + Libre Franklin) — el sitio no depende de servidores externos.
- **Sin librerías de animación pesadas**: todas las animaciones (pétalos de lapacho, el ave del logo, efectos hover) se hacen con CSS puro y SMIL. El JavaScript pasó de **101 kB → 57 kB** (comprimido).
- **Código limpiado** de elementos sin usar (dead code) y con acceso auditado (a11y) en perfecto estado.

Resultado: Web de **~788 KB** de peso total en el reporte de Google PageSpeed, con mejoras de rendimiento en móvil y sin pedidos de archivos a terceros en la carga inicial.

---

## 🛠️ Herramientas de mantenimiento (`scripts/`)

| Script | Para qué sirve |
|--------|----------------|
| `npm run build` | Compila el sitio para producción |
| `node scripts/optimize_images.js` | Comprime/redimensiona las imágenes a WebP |
| `node scripts/subset_fa.js` | Regenera el subset de iconos Font Awesome |
| `node scripts/generate_favicons.js` | Regenera los favicons desde el logo |
| `node scripts/generate_og_banner.js` | Regenera el banner para compartir en redes |

> Estas herramientas ya están configuradas y no hace falta usarlas normalmente.

---

## 📜 Créditos

Desarrollado y diseñado por **Exepaginasweb.com** para **Noema Consultora** | © 2026 Todos los derechos reservados.

