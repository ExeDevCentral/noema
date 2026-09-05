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

## 📁 Estructura del proyecto

```
noema-main/
├── src/              → El código del sitio (páginas, menú, contacto)
├── public/           → Imágenes y archivos del sitio
├── api/              → El formulario de contacto
├── index.html        → La página principal
├── package.json      → Lista de programas que necesita
└── vercel.json       → Configuración para subir a internet
```

---

## 📜 Créditos

Desarrollado y diseñado por **Exepaginasweb.com** para **Noema Consultora** | © 2026 Todos los derechos reservados.

