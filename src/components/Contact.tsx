import { FormEvent, useState } from 'react'

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
    href: 'https://wa.me/595972536004?text=Hola%20Noema,%20quisiera%20consultar%20sobre%20sus%20servicios%20de%20investigación',
    target: '_blank',
    icon: 'fab fa-whatsapp',
    title: 'Teléfono / WhatsApp',
    text: '+595 972 536 004',
    label: 'Abrir WhatsApp al +595 972 536 004',
  },
  {
    href: 'https://maps.google.com/?q=Encarnacion,Paraguay',
    target: '_blank',
    icon: 'fa-location-dot',
    title: 'Ubicación',
    text: 'Encarnación, Paraguay | Cobertura en todo el país',
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
    <div className="page-view contact-page-view">
      {/* Hero Banner with Lapacho Rosado Image */}
      <section className="page-hero-banner hero-lapacho-rosado">
        <div className="banner-bg-image" style={{ backgroundImage: "url('/assets/images/heroes/lapacho_rosado.jpg')" }}></div>
        <div className="banner-overlay"></div>
        <div className="container banner-container">
          <span className="banner-tag">ATENCIÓN DIRECTA</span>
          <h1 className="banner-title">Contacto</h1>
          <p className="banner-subtitle">
            Escríbenos para conversar sobre tu próximo proyecto de investigación en Paraguay.
          </p>
        </div>
      </section>

      {/* Form & Details Grid */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-card">
              <h3>Hablemos de su próximo estudio</h3>
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
                      <p>{link.text}</p>
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
                Envíanos una consulta
              </h3>

              <form id="noemaContactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">Nombre Completo *</label>
                    <input type="text" id="nombre" className="form-control" placeholder="Ej. Lic. Carlos Benítez" required value={form.nombre} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="empresa">Empresa / Organización *</label>
                    <input type="text" id="empresa" className="form-control" placeholder="Ej. Organización / Empresa" required value={form.empresa} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Correo Electrónico *</label>
                    <input type="email" id="email" className="form-control" placeholder="contacto@empresa.com" required value={form.email} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefono">Teléfono de Contacto</label>
                    <input type="tel" id="telefono" className="form-control" placeholder="+595 972 ..." value={form.telefono} onChange={handleChange} />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="servicio">Tipo de Servicio Requerido *</label>
                  <select id="servicio" className="form-control" required value={form.servicio} onChange={handleChange}>
                    <option value="" disabled>Seleccione una opción...</option>
                    <option value="campo">Servicio de Campo (para agencias / consultoras)</option>
                    <option value="integral">Servicio Integral (estudio a medida)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">Detalles de su Consulta / Proyecto *</label>
                  <textarea id="mensaje" className="form-control" placeholder="Cuéntenos sobre el objetivo de su estudio o la consulta que desea realizar..." required value={form.mensaje} onChange={handleChange}></textarea>
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
                    <>Enviar Mensaje <i className="fas fa-paper-plane ms-2"></i></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

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
            <p>Gracias por comunicarse con <strong>Noema — Investigación y Estudios</strong>. Analizaremos su requerimiento y nos pondremos en contacto en las próximas horas.</p>
            <button type="button" className="btn-luxury btn-luxury-primary" style={{ padding: '0.75rem 2rem' }} onClick={closeModal}>
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

