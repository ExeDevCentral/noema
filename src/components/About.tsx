const values = [
  { icon: 'fa-microscope', title: 'Rigor Científico', text: 'Metodologías validadas y muestras estadísticamente representativas.' },
  { icon: 'fa-brain', title: 'Empatía y Psicología', text: 'Comprensión profunda de las motivaciones reales del consumidor.' },
  { icon: 'fa-chart-pie', title: 'Lectura Ejecutiva', text: 'Entregables sintetizados directos para la toma de decisiones directivas.' },
  { icon: 'fa-shield-halved', title: 'Confidencialidad', text: 'Máxima protección y profesionalismo en el manejo de información estratégica.' },
]

export default function About() {
  return (
    <section id="nosotros" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-stack">
            <div className="about-image-main">
              <img
                src="/assets/images/about/carmen_capli.jpg"
                alt="Noema Consultora de Investigación de Mercado en Asunción Paraguay"
                width="900"
                height="672"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="about-quote-box">
              <p>"Investigar el mercado en Paraguay y la región no es acumular datos, es encontrar la verdad estratégica detrás de cada tendencia."</p>
              <span>Noema — Consultora Estratégica</span>
            </div>
          </div>

          <div className="about-content">
            <span className="section-tag">Sobre Noema</span>
            <h2 className="section-title">Claridad conceptual y evidencia objetiva para su empresa en Paraguay.</h2>
            <p className="about-text">
              <strong>Noema</strong> nace con la misión de brindar inteligencia de mercado de alto nivel directivo en Paraguay. Convertimos datos complejos en{' '}
              <strong>respuestas claras, objetivas y accionables</strong>.
            </p>
            <p className="about-text">
              Trabajamos junto a empresas líderes, marcas en expansión y organismos en Asunción, Ciudad del Este,
              Encarnación y la región para validar decisiones de inversión, medir posicionamiento de marca y comprender
              la evolución del consumidor paraguayo y regional.
            </p>

            <div className="values-grid">
              {values.map((v) => (
                <div className="value-card" key={v.icon}>
                  <div className="value-icon">
                    <i className={`fas ${v.icon}`}></i>
                  </div>
                  <h4>{v.title}</h4>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>

            <div className="work-gallery" aria-label="Evidencia de trabajo Noema">
              {['trabajo-01', 'trabajo-02', 'trabajo-03'].map((img) => (
                <div className="work-gallery-item" key={img}>
                  <img src={`/assets/images/trabajos/${img}.webp`} alt="Trabajo de investigación Noema" loading="lazy" decoding="async" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
