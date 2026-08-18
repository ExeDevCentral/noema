/**
 * Vercel Flags Discovery API Endpoint
 * Endpoint: /api/flags
 * Conforms to the Vercel Flags Protocol for Vercel Toolbar & Dashboard
 */

export default async function handler(req, res) {
  // Handle CORS for Vercel Toolbar
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Return the flag definitions for Vercel Dashboard and Toolbar
  return res.status(200).json({
    definitions: {
      NOEMAFLAG01: {
        description: 'NOEMA Feature Flag 01 — Control de funcionalidades y rollout gradual en Vercel',
        origin: 'https://www.noema.com.py',
        options: [
          { value: false, label: 'Desactivado (Off)' },
          { value: true, label: 'Activado (On)' },
        ],
      },
    },
  });
}
