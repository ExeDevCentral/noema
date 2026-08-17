import { FormEvent, useState } from 'react'
import ParaguayFlag from './ParaguayFlag'
import { useLanguage } from '../context/LanguageContext'

const initialForm = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
}

export default function Contact() {
  const { t } = useLanguage()
  const [form, setForm] = useState(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [error, setError] = useState('')

  const contactLinks = [
    {
      href: 'mailto:contacto@noema.com.py',
      target: undefined as string | undefined,
      icon: 'fa-envelope',
      title: t.contact.emailLabel.replace(' *', ''),
      text: 'contacto@noema.com.py',
      label: 'contacto@noema.com.py',
    },
    {
      href: 'https://wa.me/595972536004?text=Hola%20Noema,%20quisiera%20consultar%20sobre%20sus%20servicios%20de%20investigación',
      target: '_blank',
      icon: 'fab fa-whatsapp',
      title: t.contact.phoneLabel.replace(' *', ''),
      text: '+595 972 536 004',
      label: 'WhatsApp +595 972 536 004',
    },
    {
      href: 'https://maps.google.com/?q=Encarnacion,Paraguay',
      target: '_blank',
      icon: 'fa-location-dot',
      title: t.contact.locationTitle,
      text: t.contact.locationText,
      label: 'Google Maps',
      flag: true,
    },
  ]

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
          <span className="banner-tag">{t.contact.bannerTag}</span>
          <h1 className="banner-title">{t.contact.bannerTitle}</h1>
          <p className="banner-subtitle">
            <ParaguayFlag size="sm" style={{ marginRight: '6px' }} />
            {t.contact.bannerSubtitle}
          </p>
        </div>
      </section>

      {/* Form & Details Grid */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-card">
              <h3>{t.contact.cardHeading}</h3>
              <p>{t.contact.cardDesc}</p>

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
                      <h5>
                        {link.flag && <ParaguayFlag size="sm" style={{ marginRight: '6px' }} />}
                        {link.title}
                      </h5>
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
                  <h5>{t.contact.scheduleTitle}</h5>
                  <p>{t.contact.scheduleText}</p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.5rem', color: 'var(--navy-primary)' }}>
                {t.contact.formHeading}
              </h3>

              <form id="noemaContactForm" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="nombre">{t.contact.nameLabel}</label>
                    <input 
                      type="text" 
                      id="nombre" 
                      className="form-control" 
                      placeholder={t.contact.namePlaceholder} 
                      required 
                      value={form.nombre} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="empresa">{t.contact.companyLabel}</label>
                    <input 
                      type="text" 
                      id="empresa" 
                      className="form-control" 
                      placeholder={t.contact.companyPlaceholder} 
                      value={form.empresa} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">{t.contact.emailLabel}</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control" 
                      placeholder={t.contact.emailPlaceholder} 
                      required 
                      value={form.email} 
                      onChange={handleChange} 
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefono">{t.contact.phoneLabel}</label>
                    <input 
                      type="tel" 
                      id="telefono" 
                      className="form-control" 
                      placeholder={t.contact.phonePlaceholder} 
                      value={form.telefono} 
                      onChange={handleChange} 
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="servicio">{t.contact.serviceLabel}</label>
                  <select id="servicio" className="form-control" required value={form.servicio} onChange={handleChange}>
                    <option value="" disabled>{t.contact.serviceOptionDefault}</option>
                    <option value="campo">{t.contact.serviceOption1}</option>
                    <option value="integral">{t.contact.serviceOption2}</option>
                    <option value="opinion">{t.contact.serviceOption3}</option>
                    <option value="otro">{t.contact.serviceOption4}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="mensaje">{t.contact.messageLabel}</label>
                  <textarea 
                    id="mensaje" 
                    className="form-control" 
                    placeholder={t.contact.messagePlaceholder} 
                    required 
                    value={form.mensaje} 
                    onChange={handleChange}
                  ></textarea>
                </div>

                {error && (
                  <p className="form-error" role="alert">
                    <i className="fas fa-triangle-exclamation"></i> {error}
                  </p>
                )}

                <button type="submit" className="btn-luxury btn-luxury-primary" disabled={submitting} style={{ width: '100%', borderRadius: 'var(--radius-sm)', padding: '1rem', justifyContent: 'center' }}>
                  {submitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> {t.contact.submittingBtn}</>
                  ) : (
                    <>{t.contact.submitBtn} <i className="fas fa-paper-plane ms-2"></i></>
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
            <h4>{t.contact.modalTitle}</h4>
            <p>{t.contact.modalText}</p>
            <button type="button" className="btn-luxury btn-luxury-primary" style={{ padding: '0.75rem 2rem' }} onClick={closeModal}>
              {t.contact.modalClose}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
