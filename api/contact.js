/**
 * Vercel Serverless Function - Noema Contact Form Handler
 * Endpoint: /api/contact
 * Integrates Resend API for corporate email notifications and auto-response confirmations.
 */
import { Resend } from 'resend';

function escapeHtml(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getServiceLabel(serviceKey) {
  const serviceLabels = {
    campo: 'Servicio de Campo',
    integral: 'Servicio Integral de Investigación',
    opinion: 'Estudio de Opinión Pública / Social',
    otro: 'Otro tipo de relevamiento'
  };
  return serviceLabels[serviceKey] || escapeHtml(serviceKey) || 'Consulta General';
}

function buildNotificationHtml({ nombre, empresa, email, telefono, serviceLabel, mensaje, fechaEnvio }) {
  const safeNombre = escapeHtml(nombre);
  const safeEmpresa = escapeHtml(empresa);
  const safeEmail = escapeHtml(email);
  const safeTelefono = escapeHtml(telefono);
  const safeServiceLabel = escapeHtml(serviceLabel);
  const safeMensaje = escapeHtml(mensaje);
  const safeFechaEnvio = escapeHtml(fechaEnvio);

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Nueva Consulta - NOEMA</title>
      <style>
        a { color: inherit; text-decoration: none; }
        .contact-link { color: #A85333 !important; text-decoration: none !important; font-weight: 600; }
        .footer-link { color: #F3D3C1 !important; text-decoration: none !important; font-weight: 600; }
      </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1B2A38; margin: 0; padding: 24px 12px;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E2D9CF; box-shadow: 0 6px 24px rgba(27,42,56,0.07);">
        
        <!-- Header -->
        <div style="background-color: #1B2A38; padding: 26px 20px; text-align: center; border-bottom: 3px solid #C88A6E;">
          <h1 style="color: #FAF8F5; margin: 0; font-size: 25px; letter-spacing: 5px; font-weight: 700; text-transform: uppercase;">N O E M A</h1>
          <p style="color: #F3D3C1; margin: 6px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Investigación de Mercado & Opinión Pública</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 28px 24px;">
          <div style="margin-bottom: 20px;">
            <h2 style="color: #1B2A38; margin: 0 0 6px 0; font-size: 20px; font-weight: 700;">Nueva Consulta desde la Web</h2>
            <p style="color: #718096; font-size: 13px; margin: 0;">Recibido el ${safeFechaEnvio}</p>
          </div>

          <!-- Lead Info Table -->
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 22px; font-size: 14px;">
            <tbody>
              <tr style="border-bottom: 1px solid #F0EAE1;">
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38; width: 32%;">Nombre:</td>
                <td style="padding: 10px 0; color: #2D3748; font-weight: 500;">${safeNombre}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EAE1;">
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38;">Organización:</td>
                <td style="padding: 10px 0; color: #2D3748;">${safeEmpresa || 'No especificada'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EAE1;">
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38;">Correo:</td>
                <td style="padding: 10px 0;">
                  <a href="mailto:${safeEmail}" class="contact-link" style="color: #A85333; text-decoration: none; font-weight: 600;">${safeEmail}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #F0EAE1;">
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38;">Teléfono:</td>
                <td style="padding: 10px 0; color: #2D3748;">${safeTelefono || 'No provisto'}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38;">Servicio:</td>
                <td style="padding: 10px 0; color: #1B2A38; font-weight: 600;">${safeServiceLabel}</td>
              </tr>
            </tbody>
          </table>

          <!-- Message Card -->
          <div style="background-color: #FAF8F5; border-left: 4px solid #A85333; padding: 16px 18px; border-radius: 6px; margin-bottom: 26px; border: 1px solid #EFE9E0; border-left-width: 4px; border-left-color: #A85333;">
            <p style="margin: 0 0 6px 0; font-weight: 700; color: #8A4125; font-size: 11px; text-transform: uppercase; letter-spacing: 1.2px;">Mensaje:</p>
            <p style="margin: 0; color: #1B2A38; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeMensaje}</p>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin: 10px 0 6px 0;">
            <a href="mailto:${safeEmail}?subject=Re:%20Consulta%20-%20NOEMA" 
               style="display: inline-block; background-color: #1B2A38; color: #FAF8F5 !important; padding: 12px 28px; border-radius: 8px; text-decoration: none !important; font-weight: 600; font-size: 14px; letter-spacing: 0.3px; border: 1px solid #243647; box-shadow: 0 3px 8px rgba(27,42,56,0.15);">
              ✉️ Responder a ${safeNombre}
            </a>
          </div>
        </div>

        <!-- Footer -->
        <div style="background-color: #1B2A38; padding: 16px 20px; text-align: center; color: #E2E8F0; font-size: 12px; line-height: 1.6;">
          <p style="margin: 0 0 4px 0; color: #CBD5E0; font-size: 11px; letter-spacing: 0.5px;">NOEMA · Encarnación, Paraguay</p>
          <p style="margin: 0;">
            <a href="mailto:carmen@noema.com.py" class="footer-link" style="color: #F3D3C1 !important; text-decoration: none !important; font-weight: 600;">carmen@noema.com.py</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function buildAutoResponseHtml({ nombre, empresa, serviceLabel, mensaje }) {
  const safeNombre = escapeHtml(nombre);
  const safeEmpresa = escapeHtml(empresa);
  const safeServiceLabel = escapeHtml(serviceLabel);
  const safeMensaje = escapeHtml(mensaje);

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Consulta Recibida - NOEMA</title>
      <style>
        a { color: inherit; text-decoration: none; }
        .accent-link { color: #A85333 !important; text-decoration: none !important; font-weight: 600; }
        .footer-link { color: #F3D3C1 !important; text-decoration: none !important; font-weight: 600; }
      </style>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1B2A38; margin: 0; padding: 24px 12px;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E2D9CF; box-shadow: 0 6px 24px rgba(27,42,56,0.07);">
        
        <!-- Header -->
        <div style="background-color: #1B2A38; padding: 26px 20px; text-align: center; border-bottom: 3px solid #C88A6E;">
          <h1 style="color: #FAF8F5; margin: 0; font-size: 25px; letter-spacing: 5px; font-weight: 700; text-transform: uppercase;">N O E M A</h1>
          <p style="color: #F3D3C1; margin: 6px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Investigación de Mercado & Opinión Pública</p>
        </div>

        <!-- Body Content -->
        <div style="padding: 28px 24px; line-height: 1.6;">
          <h2 style="color: #1B2A38; margin: 0 0 14px 0; font-size: 20px; font-weight: 700;">Hemos recibido tu consulta</h2>
          <p style="color: #2D3748; font-size: 14px; margin: 0 0 12px 0;">Hola <strong>${safeNombre}</strong>${safeEmpresa ? ` (${safeEmpresa})` : ''}:</p>
          <p style="color: #4A5568; font-size: 14px; margin: 0 0 14px 0;">
            Confirmamos la recepción de tu mensaje sobre <strong>${safeServiceLabel}</strong> enviado desde nuestro sitio web (<strong>noema.com.py</strong>).
          </p>
          <p style="color: #4A5568; font-size: 14px; margin: 0 0 16px 0;">
            Nuestro equipo revisará tu solicitud y se comunicará contigo a la brevedad (Lunes a Viernes de 08:00 a 17:00 hs).
          </p>

          <div style="background-color: #FAF8F5; border-left: 4px solid #A85333; padding: 14px 18px; margin: 18px 0; border-radius: 6px; border: 1px solid #EFE9E0; border-left-width: 4px; border-left-color: #A85333;">
            <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #8A4125; text-transform: uppercase; letter-spacing: 1.2px;">Tu mensaje:</p>
            <p style="margin: 0; font-size: 14px; color: #1B2A38; line-height: 1.6; white-space: pre-wrap;">${safeMensaje}</p>
          </div>

          <div style="margin: 22px 0; padding: 16px 18px; background-color: #F8F5F0; border-radius: 8px; font-size: 13px; color: #1B2A38; border: 1px solid #E8DFD5;">
            <p style="margin: 0 0 10px 0; font-weight: 700; color: #1B2A38; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Canales de atención directa:</p>
            <p style="margin: 0 0 6px 0;">💬 <strong>WhatsApp:</strong> <a href="https://wa.me/595972536004" class="accent-link" style="color: #A85333; text-decoration: none;">+595 972 536 004</a></p>
            <p style="margin: 0 0 6px 0;">✉️ <strong>Correo:</strong> <a href="mailto:carmen@noema.com.py" class="accent-link" style="color: #A85333; text-decoration: none;">carmen@noema.com.py</a></p>
            <p style="margin: 0;">📍 <strong>Ubicación:</strong> Encarnación, Paraguay</p>
          </div>

          <p style="margin: 24px 0 0 0; font-size: 13px; color: #4A5568;">
            Saludos cordiales,<br/>
            <strong style="color: #1B2A38; font-size: 14px;">Equipo NOEMA</strong><br/>
            <span style="font-size: 12px; color: #718096;">Investigación y estudios de opinión en Paraguay</span>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #1B2A38; padding: 16px 20px; text-align: center; color: #E2E8F0; font-size: 12px; line-height: 1.6;">
          <p style="margin: 0 0 4px 0; color: #CBD5E0; font-size: 11px;">© ${new Date().getFullYear()} NOEMA · Todos los derechos reservados.</p>
          <p style="margin: 0;">
            <a href="mailto:carmen@noema.com.py" class="footer-link" style="color: #F3D3C1 !important; text-decoration: none !important; font-weight: 600;">carmen@noema.com.py</a> · +595 972 536 004
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function dispatchResendEmails(resend, config, payload) {
  const { senderEmail, recipientEmail } = config;
  const { nombre, empresa, email, notificationHtml } = payload;
  let adminResult = null;

  // Potential sender addresses
  const fromAddresses = [
    senderEmail.includes('<') ? senderEmail : `Noema Consultora <${senderEmail}>`,
    'Noema Consultora <onboarding@resend.dev>'
  ];

  // Primary recipient + Sandbox verified fallback recipient
  const recipients = [
    recipientEmail,
    'apikeynoema@gmail.com'
  ];

  let delivered = false;

  for (const recipient of recipients) {
    if (delivered) break;
    for (const from of fromAddresses) {
      try {
        adminResult = await resend.emails.send({
          from,
          to: recipient,
          replyTo: email,
          subject: `[Lead Web] Solicitud Diagnóstico: ${empresa || nombre} — Noema`,
          html: notificationHtml,
        });

        if (adminResult?.data?.id) {
          console.log(`✅ Notificación enviada con éxito id: ${adminResult.data.id} a ${recipient} desde ${from}`);
          delivered = true;
          break;
        }
      } catch (err) {
        console.warn(`Intento a ${recipient} desde ${from} falló:`, err.message);
      }
    }
  }

  return { adminResult };
}


export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });

  // Safe body extraction: protects against malformed JSON or empty string requests
  let body = {};
  try {
    const rawBody = req.body;
    if (typeof rawBody === 'string') {
      body = JSON.parse(rawBody || '{}');
    } else if (rawBody && typeof rawBody === 'object') {
      body = rawBody;
    }
  } catch {
    return res.status(400).json({ error: 'El cuerpo de la solicitud no contiene un formato JSON válido.' });
  }

  try {
    const { nombre, empresa, email, telefono, servicio, mensaje } = body;
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Por favor complete todos los campos obligatorios.' });
    }

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'apikeynoema@gmail.com';
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';
    const resendApiKey = process.env.RESEND_API_KEY;
    const serviceLabel = getServiceLabel(servicio);

    const fechaEnvio = new Date().toLocaleString('es-PY', {
      timeZone: 'America/Asuncion',
      dateStyle: 'full',
      timeStyle: 'short'
    });

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      const notificationHtml = buildNotificationHtml({ nombre, empresa, email, telefono, serviceLabel, mensaje, fechaEnvio });

      const { adminResult } = await dispatchResendEmails(
        resend,
        { senderEmail, recipientEmail },
        { nombre, empresa, email, serviceLabel, mensaje, notificationHtml }
      );

      return res.status(200).json({
        success: true,
        message: 'Solicitud enviada y procesada correctamente.',
        emailDelivered: Boolean(adminResult?.data?.id),
        adminResult: adminResult?.data || adminResult?.error,
      });
    }

    return res.status(200).json({ success: true, message: 'Solicitud recibida correctamente.' });
  } catch (error) {
    console.error('Error procesando formulario:', error);
    return res.status(500).json({ error: 'Ocurrió un error interno al procesar el mensaje.' });
  }
}
