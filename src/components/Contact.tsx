import { FormEvent, useState } from 'react'
import { PageType } from './Navbar'
import { useLanguage } from '../context/LanguageContext'

const initialForm = {
  nombre: '',
  empresa: '',
  email: '',
  telefono: '',
  servicio: '',
  mensaje: '',
}

interface ContactProps {
  onNavigate?: (page: PageType) => void
}

export default function Contact({ onNavigate }: Readonly<ContactProps>) {
  const { t } = useLanguage()
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
          <h1 className="banner-title">{t.contact.bannerTitle}</h1>
          <p className="banner-subtitle">
            {t.contact.bannerSubtitle}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="section contact-main-section">
        <div className="container">
          <div className="contact-single-card-wrapper">
            <div className="contact-form-wrapper contact-form-centered">
              <div className="contact-form-header text-center">
                <span className="section-tag-small">CONSULTAS Y PROPUESTAS</span>
                <h2 className="contact-main-heading">
                  {t.contact.formHeading}
                </h2>
                <p className="contact-main-subtext">
                  Escríbenos directamente o completá el formulario. Atendemos consultas de lunes a viernes de 08:00 a 17:00 hs.
                </p>
              </div>

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
                  <select id="servicio" className="form-control select-custom" required value={form.servicio} onChange={handleChange}>
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

                <div className="contact-submit-wrapper">
                  <button type="submit" className="btn-contact-submit" disabled={submitting}>
                    {submitting ? (
                      <><i className="fas fa-spinner fa-spin"></i> {t.contact.submittingBtn}</>
                    ) : (
                      <>{t.contact.submitBtn} <i className="fas fa-paper-plane ms-2"></i></>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Back to Home Button */}
            <div className="page-back-home-wrapper">
              <button 

                type="button" 
                className="btn-back-home"
                onClick={() => onNavigate?.('inicio')}
              >
                <i className="fas fa-arrow-left"></i> Volver al inicio
              </button>
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

