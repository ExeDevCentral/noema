import { FormEvent, useState } from 'react'
import PyFlag from 'country-flag-icons/react/3x2/PY'

const contactLinks = [
  {
    href: 'mailto:contacto@noemaconsultora.com.py',
    target: undefined as string | undefined,
    icon: 'fa-envelope',
    title: 'Correo Electrónico',
    text: 'contacto@noemaconsultora.com.py',
    label: 'Enviar correo a contacto@noemaconsultora.com.py',
  },
  {
    href: 'https://wa.me/595981400800',
    target: '_blank',
    icon: 'fab fa-whatsapp',
    title: 'Teléfono / WhatsApp',
    text: '+595 981 400 800',
    label: 'Abrir WhatsApp al +595 981 400 800',
  },
  {
    href: 'https://maps.google.com/?q=Asuncion,Paraguay',
    target: '_blank',
    icon: 'fa-location-dot',
    title: 'Atención & Ubicación',
    text: 'Asunción, Paraguay | Cobertura regional MERCOSUR & Latam',
    label: 'Ver ubicación en Google Maps',
    flag: true,
  },
]

const initialForm = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
}

export default function Contact() {
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Error al enviar el formulario')
      }

      setForm(initialForm)
      setModalOpen(true)
    } catch {
      setError('No pudimos enviar tu mensaje. Intentá nuevamente.')
    } finally {
      setSubmitting(false)
    }
  }

  const closeModal = () => setModalOpen(false)

  return (
    <section id="contacto" className="section contact-section">
      <div className="container">
        <div className="contact-grid">
          <div className="contact-info-card">
            <h3>Hablemos de su próximo estudio de mercado</h3>
            <p>Déjenos sus datos y nos pondremos en contacto para coordinar una reunión de diagnóstico sin compromiso.</p>

            {contactLinks.map((link) => (
              <a
                className="contact-detail-link"
                href={link.href}
                key={link.icon}
                target={link.target}
                rel={link.target === '_blank' ? 'noopener' : undefined}
                aria-label={link.label}
              >
                <div className="contact-detail-item">
                  <div className="contact-detail-icon">
                    <i className={link.icon}></i>
                  </div>
                  <div className="contact-detail-text">
                    <h5>{link.title}</h5>
                    <p>
                      {link.flag && (
                        <PyFlag
                          style={{ width: 28, height: 19, borderRadius: 3, marginRight: '0.4rem', verticalAlign: 'middle' }}
                        />
                      )}
                      {link.text}
                    </p>
                  </div>
                  <i className="fas fa-arrow-up-right-from-square contact-detail-arrow"></i>
                </div>
              </a>
            ))}

            <div className="contact-detail-item">
              <div className="contact-detail-icon">
                <i className="fas fa-clock"></i>
              </div>
              <div className="contact-detail-text">
                <h5>Horario Institucional</h5>
                <p>Lunes a Viernes de 08:00 a 17:00 hs</p>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--navy-primary)' }}>
              Solicitud de Diagnóstico
            </h3>

            <form id="noemaContactForm" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre Completo *</label>
                  <input type="text" id="nombre" className="form-control" placeholder="Ej. Lic. Carlos Benítez" required value={form.nombre} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="empresa">Empresa / Organización *</label>
                  <input type="text" id="empresa" className="form-control" placeholder="Ej. Grupo Comercial Paraguay S.A." required value={form.empresa} onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Correo Corporativo *</label>
                  <input type="email" id="email" className="form-control" placeholder="carlos@empresa.com.py" required value={form.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono de Contacto</label>
                  <input type="tel" id="telefono" className="form-control" placeholder="+595 981 ..." value={form.telefono} onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="servicio">Tipo de Servicio Requerido *</label>
                <select id="servicio" className="form-control" required value={form.servicio} onChange={handleChange}>
                  <option value="" disabled>Seleccione una opción...</option>
                  <option value="campo">Servicio de Campo (relevamiento en Paraguay)</option>
                  <option value="integral">Servicio Integral (diseño + ejecución completa)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">Detalles de su Consulta / Proyecto *</label>
                <textarea id="mensaje" className="form-control" placeholder="Cuéntenos sobre el objetivo de su estudio o el desafío que busca resolver..." required value={form.mensaje} onChange={handleChange}></textarea>
              </div>

              {error && (
                <p className="form-error" role="alert">
                  <i className="fas fa-triangle-exclamation"></i> {error}
                </p>
              )}

              <button type="submit" className="btn-luxury btn-luxury-primary" disabled={submitting} style={{ width: '100%', borderRadius: 'var(--radius-sm)', padding: '1rem', justifyContent: 'center' }}>
                {submitting ? (
                  <><i className="fas fa-spinner fa-spin"></i> Procesando...</>
                ) : (
                  <>Enviar Solicitud de Diagnóstico <i className="fas fa-paper-plane"></i></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          id="thankYouModal"
          className="modal-overlay active"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={(e) => { if (e.target === e.currentTarget) closeModal() }}
          onKeyDown={(e) => { if (e.key === 'Escape') closeModal() }}
        >
          <div className="modal-card">
            <div className="modal-icon">
              <i className="fas fa-check"></i>
            </div>
            <h4>¡Solicitud Recibida!</h4>
            <p>Gracias por comunicarse con <strong>Noema Consultora</strong>. Un consultor senior analizará su requerimiento y se pondrá en contacto en las próximas 24 horas hábiles.</p>
            <button type="button" className="btn-luxury btn-luxury-primary" style={{ padding: '0.75rem 2rem' }} onClick={closeModal}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
