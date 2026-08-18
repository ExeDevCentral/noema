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
    campo: 'Servicio de Campo (Relevamiento y Auditoría en Paraguay)',
    integral: 'Servicio Integral (Diseño Metodológico + Ejecución completa)',
    opinion: 'Estudio de Opinión Pública y Clima Social',
    otro: 'Consulta Personalizada / Diagnóstico Especial'
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
      <title>Nuevo Lead - Noema</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1B2A38; margin:0; padding: 24px;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E8BFAC; box-shadow: 0 4px 20px rgba(27,42,56,0.06);">
        <div style="background-color: #1B2A38; padding: 28px 24px; text-align: center; border-bottom: 3px solid #C88A6E;">
          <h1 style="color: #FAF8F5; margin: 0; font-size: 26px; letter-spacing: 4px; font-weight: 700;">N O E M A</h1>
          <p style="color: #C88A6E; margin: 6px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Consultora de Investigación de Mercado & Opinión Pública</p>
        </div>
        <div style="padding: 32px 28px;">
          <div style="display: inline-block; background-color: rgba(200,138,110,0.15); color: #C88A6E; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px;">
            Nuevo Contacto Web
          </div>
          <h2 style="color: #1B2A38; margin: 0 0 8px 0; font-size: 20px;">Solicitud de Diagnóstico Recibida</h2>
          <p style="color: #6c757d; font-size: 13px; margin: 0 0 24px 0;">Recibido el ${safeFechaEnvio} (Hora Asunción, PY)</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tbody>
              <tr style="border-bottom: 1px solid #FAF8F5;">
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38; width: 35%; font-size: 14px;">Nombre completo:</td>
                <td style="padding: 10px 0; color: #333333; font-size: 14px;">${safeNombre}</td>
              </tr>
              <tr style="border-bottom: 1px solid #FAF8F5;">
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38; font-size: 14px;">Empresa / Organización:</td>
                <td style="padding: 10px 0; color: #333333; font-size: 14px;">${safeEmpresa || 'No especificada'}</td>
              </tr>
              <tr style="border-bottom: 1px solid #FAF8F5;">
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38; font-size: 14px;">Correo electrónico:</td>
                <td style="padding: 10px 0; font-size: 14px;"><a href="mailto:${safeEmail}" style="color: #C88A6E; text-decoration: none; font-weight: 600;">${safeEmail}</a></td>
              </tr>
              <tr style="border-bottom: 1px solid #FAF8F5;">
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38; font-size: 14px;">Teléfono / WhatsApp:</td>
                <td style="padding: 10px 0; color: #333333; font-size: 14px;">
                  ${safeTelefono ? `<a href="tel:${safeTelefono}" style="color: #1B2A38; text-decoration: none;">${safeTelefono}</a>` : 'No provisto'}
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: 700; color: #1B2A38; font-size: 14px;">Servicio de Interés:</td>
                <td style="padding: 10px 0; color: #1B2A38; font-weight: 600; font-size: 14px;">${safeServiceLabel}</td>
              </tr>
            </tbody>
          </table>
          <div style="background-color: #FAF8F5; border-left: 4px solid #C88A6E; padding: 18px; border-radius: 0 8px 8px 0; margin-top: 10px;">
            <p style="margin: 0 0 6px 0; font-weight: 700; color: #1B2A38; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Mensaje / Requerimientos:</p>
            <p style="margin: 0; color: #2C3E50; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${safeMensaje}</p>
          </div>
          <div style="margin-top: 28px; text-align: center;">
            <a href="mailto:${safeEmail}?subject=Re:%20Solicitud%20de%20Diagn%C3%B3stico%20-%20Noema%20Consultora" 
               style="display: inline-block; background-color: #1B2A38; color: #FAF8F5; padding: 12px 28px; border-radius: 6px; text-decoration: none; font-weight: 600; font-size: 14px; letter-spacing: 0.5px;">
              Responder a ${safeNombre}
            </a>
          </div>
        </div>

        <div style="background-color: #1B2A38; padding: 16px 24px; text-align: center; color: rgba(250, 248, 245, 0.7); font-size: 11px;">
          © ${new Date().getFullYear()} Noema Consultora — Asunción & Encarnación, Paraguay<br/>
          Sistema automatizado de captura de prospectos web
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
      <title>Confirmación de Solicitud - Noema Consultora</title>
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FAF8F5; color: #1B2A38; margin:0; padding: 24px;">
      <div style="max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #E8BFAC; box-shadow: 0 4px 20px rgba(27,42,56,0.06);">
        <div style="background-color: #1B2A38; padding: 32px 24px; text-align: center; border-bottom: 3px solid #C88A6E;">
          <h1 style="color: #FAF8F5; margin: 0; font-size: 28px; letter-spacing: 4px; font-weight: 700;">N O E M A</h1>
          <p style="color: #C88A6E; margin: 8px 0 0 0; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; font-weight: 600;">Consultora de Investigación de Mercado & Opinión Pública</p>
        </div>
        <div style="padding: 36px 30px; line-height: 1.6;">
          <h2 style="color: #1B2A38; margin: 0 0 16px 0; font-size: 22px; font-weight: 600;">Hemos recibido su consulta</h2>
          <p style="color: #4A5568; font-size: 15px;">Estimado/a <strong>${safeNombre}</strong>${safeEmpresa ? ` (${safeEmpresa})` : ''},</p>
          <p style="color: #4A5568; font-size: 15px;">
            Agradecemos su interés en los servicios de inteligencia estratégica de <strong>Noema Consultora</strong>.
          </p>
          <p style="color: #4A5568; font-size: 15px;">
            Confirmamos la recepción de su solicitud para el área de <strong>${safeServiceLabel}</strong>. Nuestro equipo de consultores senior está analizando su requerimiento y se pondrá en contacto con usted en un plazo no mayor a <strong>24 horas hábiles</strong>.
          </p>
          <div style="background-color: #FAF8F5; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid rgba(200,138,110,0.2);">
            <p style="margin: 0 0 10px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #C88A6E; font-weight: 700;">Detalle de su solicitud:</p>
            <p style="margin: 0; font-size: 14px; color: #2D3748; font-style: italic;">"${safeMensaje}"</p>
          </div>
          <div style="background: linear-gradient(135deg, #1B2A38 0%, #2A3F52 100%); color: #FAF8F5; border-radius: 8px; padding: 20px; text-align: center; margin: 28px 0;">
            <p style="margin: 0 0 6px 0; font-weight: 600; font-size: 15px; color: #FAF8F5;">¿Requiere asistencia inmediata para su proyecto?</p>
            <p style="margin: 0 0 14px 0; font-size: 13px; color: rgba(250,248,245,0.8);">Comuníquese directamente con nuestra dirección ejecutiva.</p>
            <a href="https://wa.me/595972536004?text=Hola%20Noema,%20acabo%20de%20enviar%20una%20solicitud%20de%20diagnóstico%20desde%20la%20web" 
               style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 25px; font-weight: 700; font-size: 13px; letter-spacing: 0.5px;">
              💬 Contactar por WhatsApp (+595 972 536 004)
            </a>
          </div>

          <p style="margin-top: 28px; margin-bottom: 0; font-size: 14px; color: #4A5568;">
            Atentamente,<br/>
            <strong style="color: #1B2A38;">Equipo Ejecutivo — Noema Consultora</strong><br/>
            <span style="font-size: 13px; color: #718096;">Asunción & Encarnación, Paraguay · Cobertura MERCOSUR</span>
          </p>
        </div>
        <div style="background-color: #1B2A38; padding: 18px 24px; text-align: center; color: rgba(250, 248, 245, 0.6); font-size: 11px;">
          © ${new Date().getFullYear()} Noema Consultora. Todos los derechos reservados.<br/>
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

  // Try primary sender first, fallback to onboarding@resend.dev if domain not yet verified in Resend
  const fromAddresses = [
    senderEmail.includes('<') ? senderEmail : `Noema Consultora <${senderEmail}>`,
    'Noema Consultora <onboarding@resend.dev>'
  ];

  for (const from of fromAddresses) {
    try {
      adminResult = await resend.emails.send({
        from,
        to: recipientEmail,
        replyTo: email,
        subject: `[Lead Web] Solicitud Diagnóstico: ${empresa || nombre} — Noema`,
        html: notificationHtml,
      });

      if (adminResult?.data?.id) {
        console.log(`✅ Notificación admin enviada exitosamente con id: ${adminResult.data.id} desde ${from}`);
        break;
      }
      if (adminResult?.error) {
        console.warn(`Aviso Resend con remitente ${from}:`, adminResult.error);
      }
    } catch (err) {
      console.warn(`Error al intentar enviar desde ${from}:`, err.message);
    }
  }

  // Attempt auto-response to client if possible
  try {
    clientResult = await resend.emails.send({
      from: fromAddresses[0],
      to: email,
      subject: `Confirmación de Solicitud de Diagnóstico — Noema Consultora`,
      html: autoResponseHtml,
    });
  } catch (error_) {
    console.warn('Nota: Confirmación al cliente requiere dominio verificado en resend.com/domains:', error_?.message);
  }

  return { adminResult, clientResult };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });

  try {
    const { nombre, empresa, email, telefono, servicio, mensaje } = req.body || {};
    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Por favor complete todos los campos obligatorios.' });
    }

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'luisanacapli@gmail.com';
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
