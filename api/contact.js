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
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1B2A38; margin:0; padding: 20px;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #E8BFAC; box-shadow: 0 4px 16px rgba(27,42,56,0.06);">
        <div style="background-color: #1B2A38; padding: 24px 20px; text-align: center; border-bottom: 3px solid #C88A6E;">
          <h1 style="color: #FAF8F5; margin: 0; font-size: 24px; letter-spacing: 4px; font-weight: 700;">N O E M A</h1>
          <p style="color: #C88A6E; margin: 6px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Investigación de Mercado & Opinión Pública</p>
        </div>
        <div style="padding: 28px 24px;">
          <h2 style="color: #1B2A38; margin: 0 0 4px 0; font-size: 18px; font-weight: 700;">Nueva Consulta desde la Web</h2>
          <p style="color: #718096; font-size: 12px; margin: 0 0 20px 0;">Recibido el ${safeFechaEnvio}</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tbody>
              <tr style="border-bottom: 1px solid #FAF8F5;">
                <td style="padding: 8px 0; font-weight: 700; color: #1B2A38; width: 35%;">Nombre:</td>
                <td style="padding: 8px 0; color: #2D3748;">${safeNombre}</td>
              </tr>
              <tr style="border-bottom: 1px solid #FAF8F5;">
                <td style="padding: 8px 0; font-weight: 700; color: #1B2A38;">Organización:</td>
                <td style="padding: 8px 0; color: #2D3748;">${safeEmpresa || 'No especificada'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #FAF8F5;">
                <td style="padding: 8px 0; font-weight: 700; color: #1B2A38;">Correo:</td>
                <td style="padding: 8px 0;"><a href="mailto:${safeEmail}" style="color: #C88A6E; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #FAF8F5;">
                <td style="padding: 8px 0; font-weight: 700; color: #1B2A38;">Teléfono:</td>
                <td style="padding: 8px 0; color: #2D3748;">${safeTelefono || 'No provisto'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 700; color: #1B2A38;">Servicio:</td>
                <td style="padding: 8px 0; color: #1B2A38; font-weight: 600;">${safeServiceLabel}</td>
              </tr>
            </tbody>
          </table>

          <div style="background-color: #FAF8F5; border-left: 3px solid #C88A6E; padding: 14px 16px; border-radius: 4px; margin-bottom: 24px;">
            <p style="margin: 0 0 4px 0; font-weight: 700; color: #C88A6E; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Mensaje:</p>
            <p style="margin: 0; color: #2D3748; font-size: 13px; line-height: 1.5; white-space: pre-wrap;">${safeMensaje}</p>
          </div>

          <div style="text-align: center;">
            <a href="mailto:${safeEmail}?subject=Re:%20Consulta%20-%20NOEMA" 
               style="display: inline-block; background-color: #1B2A38; color: #FAF8F5; padding: 10px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 13px;">
              Responder a ${safeNombre}
            </a>
          </div>
        </div>

        <div style="background-color: #1B2A38; padding: 14px 20px; text-align: center; color: rgba(250, 248, 245, 0.6); font-size: 11px;">
          NOEMA · Encarnación, Paraguay · contacto@noema.com.py
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
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1B2A38; margin:0; padding: 20px;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid #E8BFAC; box-shadow: 0 4px 16px rgba(27,42,56,0.06);">
        <div style="background-color: #1B2A38; padding: 24px 20px; text-align: center; border-bottom: 3px solid #C88A6E;">
          <h1 style="color: #FAF8F5; margin: 0; font-size: 24px; letter-spacing: 4px; font-weight: 700;">N O E M A</h1>
          <p style="color: #C88A6E; margin: 6px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Investigación de Mercado & Opinión Pública</p>
        </div>
        <div style="padding: 28px 24px; line-height: 1.6;">
          <h2 style="color: #1B2A38; margin: 0 0 14px 0; font-size: 18px; font-weight: 700;">Hemos recibido tu consulta</h2>
          <p style="color: #2D3748; font-size: 14px; margin: 0 0 12px 0;">Hola <strong>${safeNombre}</strong>${safeEmpresa ? ` (${safeEmpresa})` : ''}:</p>
          <p style="color: #4A5568; font-size: 14px; margin: 0 0 14px 0;">
            Confirmamos la recepción de tu mensaje sobre <strong>${safeServiceLabel}</strong> enviado desde nuestro sitio web (<strong>noema.com.py</strong>).
          </p>
          <p style="color: #4A5568; font-size: 14px; margin: 0 0 16px 0;">
            Nuestro equipo revisará tu solicitud y se comunicará contigo a la brevedad (Lunes a Viernes de 08:00 a 17:00 hs).
          </p>

          <div style="background-color: #FAF8F5; border-left: 3px solid #C88A6E; padding: 12px 16px; margin: 18px 0; border-radius: 4px;">
            <p style="margin: 0 0 4px 0; font-size: 11px; font-weight: 700; color: #C88A6E; text-transform: uppercase; letter-spacing: 1px;">Tu mensaje:</p>
            <p style="margin: 0; font-size: 13px; color: #2D3748; line-height: 1.5; white-space: pre-wrap;">${safeMensaje}</p>
          </div>

          <div style="margin: 20px 0; padding: 14px 16px; background-color: #F8F5F0; border-radius: 6px; font-size: 13px; color: #1B2A38; border: 1px solid rgba(200,138,110,0.25);">
            <p style="margin: 0 0 8px 0; font-weight: 700; color: #1B2A38;">Canales de atención directa:</p>
            <p style="margin: 0 0 4px 0;">💬 <strong>WhatsApp:</strong> <a href="https://wa.me/595972536004" style="color: #C88A6E; text-decoration: none;">+595 972 536 004</a></p>
            <p style="margin: 0 0 4px 0;">✉️ <strong>Correo:</strong> <a href="mailto:contacto@noema.com.py" style="color: #C88A6E; text-decoration: none;">contacto@noema.com.py</a></p>
            <p style="margin: 0;">📍 <strong>Ubicación:</strong> Encarnación, Paraguay</p>
          </div>

          <p style="margin: 20px 0 0 0; font-size: 13px; color: #4A5568;">
            Saludos cordiales,<br/>
            <strong style="color: #1B2A38;">Equipo NOEMA</strong><br/>
            <span style="font-size: 12px; color: #718096;">Investigación y estudios de opinión en Paraguay</span>
          </p>
        </div>
        <div style="background-color: #1B2A38; padding: 14px 20px; text-align: center; color: rgba(250, 248, 245, 0.6); font-size: 11px;">
          © ${new Date().getFullYear()} NOEMA · Todos los derechos reservados.<br/>
          contacto@noema.com.py · +595 972 536 004
        </div>
      </div>
    </body>
    </html>
  `;
}

async function dispatchResendEmails(resend, config, payload) {
  const { senderEmail, recipientEmail } = config;
  const { nombre, empresa, email, notificationHtml, autoResponseHtml } = payload;
  let adminResult = null;
  let clientResult = null;

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

  // Attempt auto-response to client (works once domain is verified on Resend)
  try {
    clientResult = await resend.emails.send({
      from: fromAddresses[0],
      to: email,
      subject: `Confirmación de Solicitud de Diagnóstico — Noema Consultora`,
      html: autoResponseHtml,
    });
  } catch (_) {}

  return { adminResult, clientResult };
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
      const autoResponseHtml = buildAutoResponseHtml({ nombre, empresa, serviceLabel, mensaje });

      const { adminResult, clientResult } = await dispatchResendEmails(
        resend,
        { senderEmail, recipientEmail },
        { nombre, empresa, email, serviceLabel, mensaje, notificationHtml, autoResponseHtml }
      );

      return res.status(200).json({
        success: true,
        message: 'Solicitud enviada y procesada correctamente.',
        emailDelivered: Boolean(adminResult?.data?.id),
        adminResult: adminResult?.data || adminResult?.error,
        clientResult: clientResult?.data || null
      });
    }

    return res.status(200).json({ success: true, message: 'Solicitud recibida correctamente.' });
  } catch (error) {
    console.error('Error procesando formulario:', error);
    return res.status(500).json({ error: 'Ocurrió un error interno al procesar el mensaje.' });
  }
}
