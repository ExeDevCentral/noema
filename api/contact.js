/**
 * Vercel Serverless Function - Noema Contact Form Handler
 * Endpoint: /api/contact
 */

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

    const recipientEmail = process.env.NOTIFICATION_EMAIL || 'contacto@noemaconsultora.com';
    const web3Key = process.env.WEB3FORMS_KEY;

    // If Web3Forms API Key is set in Vercel Environment Variables
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
        return res.status(200).json({ success: true, message: 'Mensaje enviado correctamente.' });
      }
    }

    // Default Fallback response (working prototype)
    console.log('Mensaje recibido en servidor:', { nombre, empresa, email, servicio, mensaje });
    return res.status(200).json({
      success: true,
      message: 'Solicitud procesada correctamente.',
      receivedData: { nombre, empresa, email, servicio }
    });

  } catch (error) {
    console.error('Error al procesar mensaje:', error);
    return res.status(500).json({ error: 'Ocurrió un error interno al enviar el correo.' });
  }
}
