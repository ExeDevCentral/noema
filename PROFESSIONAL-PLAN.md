# PROFESSIONAL-PLAN.md

# 📋 PLAN PROFESIONAL — NOEMA CONSULTORA

## Estado actual (diagnóstico)

| Ya existe | Falta / es prototipo |
|---|---|
| Site desplegado en Vercel (`noema-ivory.vercel.app`) | Dominio propio (sin decidir `.com` vs `.com.py`) |
| Repo GitHub `ExeDevCentral/noema` (2 commits) | Auto-deploy por push sin configurar (hoy solo CLI manual) |
| Formulario → `/api/contact` (Vercel Function) | Email es PROTOTIPO: sin API key solo hace `console.log` |
| ImprovMX cuenta creada | DNS/registros de email no aplicados |
| Vercel Analytics (script) | Sin Speed Insights, sitemap, robots, favicon |
| Seguridad básica (headers) | Sin CSP, sin rate-limit, sin spam protection |

**Bug detectado:** el código mezcla `noemaconsultora.com` (email + ImprovMX) y `noemaconsultora.com.py` (canonical, meta OG). Hay que unificarlo al decidir el dominio.

---

## FASE 1 — Repo & GitHub (la puedo ejecutar yo)

- [ ] Commitear cambios pendientes (styles, index, gitignore, package-lock) y push.
- [ ] Crear `.vercelignore`: excluir `node_modules/`, `backup_v1/`, `backup_v2/` (hoy subes 12.5MB innecesarios).
- [ ] Revisar `.gitignore` (confirmar `.vercel/` ignorado ✅, agregar `*.env*`).
- [ ] Estrategia de ramas: `main` = producción; ramas/PRs = preview automáticos.
- [ ] Conectar el repo GitHub al proyecto Vercel → **auto-deploy en cada push** (evita deploys manuales).

## FASE 2 — Dominio (depende de tu decisión)

- [ ] **Decidir** el dominio final:
  - `noemaconsultora.com` (recomendado: ya está en ImprovMX, más corto)
  - o `noemaconsultora.com.py`
- [ ] En Vercel → *Domains* → agregar dominio y DNS (apex + www, SSL y redirección automáticos).
- [ ] Unificar en el código: canonical, meta OG/Twitter, JSON-LD y correo visible al dominio definitivo.

## FASE 3 — Email profesional: ImprovMX + Resend (clave; mezcla de acciones)

### ImprovMX (recibir)
- [ ] Crear alias `contacto@noemaconsultora.com` → reenvío a tu buzón real.
- [ ] Aplicar en el registrar los **registros MX** que da ImprovMX.
- [ ] Agregar **SPF, DKIM, DMARC**.

### Resend (enviar — con el formulario)
- [ ] Crear cuenta en resend.com, verificar dominio y generar **API Key**.
- [ ] `npm i resend` y reescribir `api/contact.js` para enviar desde `contacto@noemaconsultora.com`.
- [ ] Crear en Vercel las env vars: `RESEND_API_KEY`, `NOTIFICATION_EMAIL`.
- [ ] Añadir **anti-spam** (honeypot + rate-limit con Upstash) y validación de inputs.

## FASE 4 — SEO & Analítica

- [ ] `sitemap.xml`, `robots.txt`, favicon.
- [ ] OG image con URL absoluta (hoy es relativa → falla en WhatsApp/Facebook).
- [ ] Corregir JSON-LD (Schema.org) con datos exactos del dominio.
- [ ] Instalar **Speed Insights** (`@vercel/speed-insights`).
- [ ] *Opcional:* Google Analytics 4 / Search Console (necesita tu cuenta).
- [ ] Performance: comprimir/convertir a WebP (el hero pesa mucho).

## FASE 5 — Seguridad

- [ ] Cabeceras CSP y HSTS en `vercel.json`.
- [ ] Rate-limiting en `/api/contact` (Upstash + Vercel).
- [ ] Página 404 personalizada.
- [ ] Manejo de errores y logging.

## FASE 6 — QA & Monitoreo

- [ ] Auditoría Lighthouse (objetivo: Performance/SEO ≥ 90).
- [ ] Test end-to-end del formulario (email de prueba).
- [ ] *Opcional:* monitoreo de uptime + alertas.

## FASE 7 — Documentación

- [ ] Actualizar `README.md` (instalación, env vars, deploy).
- [ ] Crear `.env.example`, `CHANGELOG.md`, convención de commits.

---

## Lo que necesito de vos para ejecutar

1. Decisión de dominio (`.com` o `.com.py`).
2. Cuenta Resend + API key.
3. Acceso al registrar DNS (MX/SPF/DKIM/DMARC).
4. Permiso para commitear/pushear el repo.

## Progreso

| Fase | Estado |
|---|---|
| Fase 1 — Repo & GitHub | ⬜ Pendiente |
| Fase 2 — Dominio | ⬜ Pendiente |
| Fase 3 — Email (ImprovMX + Resend) | ⬜ Pendiente |
| Fase 4 — SEO & Analítica | ⬜ Pendiente |
| Fase 5 — Seguridad | ⬜ Pendiente |
| Fase 6 — QA & Monitoreo | ⬜ Pendiente |
| Fase 7 — Documentación | ⬜ Pendiente |
