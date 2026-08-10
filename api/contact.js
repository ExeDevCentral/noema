/**
 * Vercel Serverless Function - Noema Contact Form Handler
 * Endpoint: /api/contact
 * Integrates Resend API for corporate email sending & Web3Forms fallback.
 */
import { Resend } from 'resend';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utilice POST.' });
  }

  try {
    const { nombre, empresa, email, telefono, servicio, mensaje } = req.body || {};

    if (!nombre || !email || !mensaje) {
      return res.status(400).json({ error: 'Por favor complete todos los campos obligatorios.' });
    }

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'contacto@noemaconsultora.com.py';
    const senderEmail = process.env.SENDER_EMAIL || 'Noema Consultora <contacto@noemaconsultora.com.py>';
    const resendApiKey = process.env.RESEND_API_KEY;
    const web3Key = process.env.WEB3FORMS_KEY;

    // 1. Resend Email Dispatch
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const serviceLabel = servicio === 'campo'
        ? 'Servicio de Campo (Relevamiento en Paraguay)'
        : servicio === 'integral'
        ? 'Servicio Integral (Diseño + Ejecución completa)'
        : servicio || 'No especificado';

      // Send Notification to Corporate Inbox
      const notificationHtml = `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="utf-8"/></head>
        <body style="font-family: Arial, sans-serif; background-color: #FAF8F5; color: #1B2A38; margin:0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #E8BFAC;">
            <div style="background-color: #1B2A38; padding: 24px; text-align: center;">
              <h1 style="color: #C88A6E; margin: 0; font-size: 24px; letter-spacing: 2px;">N O E M A</h1>
              <p style="color: #FAF8F5; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 1px;">CONSULTORA DE INVESTIGACIÓN DE MERCADO</p>
            </div>
            <div style="padding: 24px;">
              <h2 style="color: #1B2A38; margin-top: 0;">Nueva Solicitud de Diagnóstico</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 35%;">Nombre:</td><td style="padding: 8px 0;">${nombre}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Empresa:</td><td style="padding: 8px 0;">${empresa || 'N/A'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Teléfono:</td><td style="padding: 8px 0;">${telefono || 'No provisto'}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Servicio:</td><td style="padding: 8px 0;">${serviceLabel}</td></tr>
              </table>
              <div style="margin-top: 20px; padding: 15px; background-color: #FAF8F5; border-left: 4px solid #C88A6E;">
                <p style="margin: 0; font-weight: bold;">Mensaje / Detalles:</p>
                <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${mensaje}</p>
              </div>
            </div>
            <div style="background-color: #1B2A38; padding: 12px; text-align: center; color: rgba(250, 248, 245, 0.7); font-size: 11px;">
              © ${new Date().getFullYear()} Noema Consultora — Asunción, Paraguay
            </div>
          </div>
        </body>
        </html>
      `;

      await resend.emails.send({
        from: senderEmail.includes('<') ? senderEmail : `Noema Consultora <${senderEmail}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `[Nuevo Leads Web] Diagnóstico: ${empresa || nombre}`,
        html: notificationHtml,
      });

      // Send Auto-response to Client Lead
      const autoResponseHtml = `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="utf-8"/></head>
        <body style="font-family: Arial, sans-serif; background-color: #FAF8F5; color: #1B2A38; margin:0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #E8BFAC;">
            <div style="background-color: #1B2A38; padding: 24px; text-align: center;">
              <h1 style="color: #C88A6E; margin: 0; font-size: 24px; letter-spacing: 2px;">N O E M A</h1>
              <p style="color: #FAF8F5; margin: 5px 0 0 0; font-size: 12px; letter-spacing: 1px;">CONSULTORA DE INVESTIGACIÓN DE MERCADO</p>
            </div>
            <div style="padding: 24px;">
              <h2 style="color: #1B2A38; margin-top: 0;">Hemos recibido su solicitud</h2>
              <p>Estimado/a <strong>${nombre}</strong>,</p>
              <p>Agradecemos su interés en los servicios de inteligencia de mercado de <strong>Noema Consultora</strong>.</p>
              <p>Hemos recibido correctamente su consulta respecto a <strong>${serviceLabel}</strong>. Un consultor senior analizará su proyecto y se pondrá en contacto en las próximas 24 horas hábiles.</p>
              <div style="margin: 25px 0; padding: 15px; background: #FAF8F5; border-radius: 6px; text-align: center;">
                <p style="margin: 0; font-weight: bold; color: #1B2A38;">¿Necesita atención inmediata?</p>
                <p style="margin: 5px 0 0 0;"><a href="https://wa.me/595981400800" style="color: #C88A6E; text-decoration: none; font-weight: bold;">Escríbanos por WhatsApp al +595 981 400 800</a></p>
              </div>
              <p style="margin-bottom: 0;">Atentamente,<br/><strong>Equipo Ejecutivo — Noema Consultora</strong><br/>Asunción, Paraguay</p>
            </div>
            <div style="background-color: #1B2A38; padding: 12px; text-align: center; color: rgba(250, 248, 245, 0.7); font-size: 11px;">
              © ${new Date().getFullYear()} Noema Consultora. Todos los derechos reservados.
            </div>
          </div>
        </body>
        </html>
      `;

      await resend.emails.send({
        from: senderEmail.includes('<') ? senderEmail : `Noema Consultora <${senderEmail}>`,
        to: email,
        subject: `Confirmación de Solicitud de Diagnóstico - Noema Consultora`,
        html: autoResponseHtml,
      });

      return res.status(200).json({ success: true, message: 'Mensaje enviado correctamente mediante Resend.' });
    }

    // 2. Web3Forms Fallback
    if (web3Key) {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: web3Key,
          subject: `Nuevo Diagnóstico Noema: ${empresa || nombre}`,
          from_name: 'Noema Landing Web',
          to_email: recipientEmail,
          nombre,
          empresa,
          email,
          telefono,
          servicio,
          mensaje
        })
      });

      const data = await response.json();
      if (data.success) {
        return res.status(200).json({ success: true, message: 'Mensaje enviado correctamente vía Web3Forms.' });
      }
    }

    // 3. Fallback response for dev/prototype environment
    console.log('Mensaje recibido en servidor:', { nombre, empresa, email, servicio, mensaje });
    return res.status(200).json({
      success: true,
      message: 'Solicitud recibida y procesada correctamente.',
      receivedData: { nombre, empresa, email, servicio }
    });

  } catch (error) {
    console.error('Error al procesar mensaje:', error);
    return res.status(500).json({ error: 'Ocurrió un error interno al enviar el correo.' });
  }
}
