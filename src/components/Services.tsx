const services = [
  {
    num: '01',
    icon: 'fa-map-location-dot',
    tag: 'Para agencias de investigación',
    title: 'Servicio de Campo',
    text: 'Somos el brazo de campo de otras agencias: gestionamos, coordinamos y ejecutamos el relevamiento en Paraguay con control de calidad constante y supervisión en tiempo real.',
    items: [
      'Gestión y coordinación del trabajo de campo',
      'Relevamiento de datos en Paraguay y región',
      'Control de calidad y supervisión en tiempo real',
      'Muestreo representativo según el diseño del estudio',
    ],
  },
  {
    num: '02',
    icon: 'fa-diagram-project',
    tag: 'De punta a punta',
    title: 'Servicio Integral',
    text: 'Diseñamos y ejecutamos tu proyecto completo: desde la formulación del estudio hasta el relevamiento, el análisis de datos y las recomendaciones estratégicas finales.',
    items: [
      'Diseño del proyecto de investigación',
      'Recolección de datos y trabajo de campo',
      'Procesamiento y analítica avanzada',
      'Informe ejecutivo y recomendaciones',
    ],
  },
]

export default function Services() {
  return (
    <section id="servicios" className="section services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Nuestras Soluciones</span>
          <h2 className="section-title">Investigación de Campo & Servicios Integrales</h2>
          <p>
            Dos formas de trabajar juntos: ejecutamos el relevamiento en Paraguay para otras agencias o
            llevamos tu proyecto de investigación de punta a punta.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service) => (
            <div className="service-card" key={service.num}>
              <div className="service-header-row">
                <div className="service-icon-box">
                  <i className={`fas ${service.icon}`}></i>
                </div>
                <span className="service-num">{service.num}</span>
              </div>
              <span className="service-tag">{service.tag}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <ul className="service-list">
                {service.items.map((item) => (
                  <li key={item}><i className="fas fa-check"></i> {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
