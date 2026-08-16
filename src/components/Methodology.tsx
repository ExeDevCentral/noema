const steps = [
  {
    num: '01',
    icon: 'fa-magnifying-glass-chart',
    title: 'Diagnóstico & Diseño',
    timeframe: 'Semana 1',
    text: 'Alineación estratégica con los objetivos de negocio, formulación de hipótesis, definición del universo muestral y diseño del instrumento de investigación (cuestionarios estructurados o pautas cualitativas).',
    deliverable: 'Cuestionario Aprobado + Plan Muestral',
    tags: ['Briefing', 'Muestreo', 'Diseño Cuestionario'],
  },
  {
    num: '02',
    icon: 'fa-people-group',
    title: 'Trabajo de Campo',
    timeframe: 'Semanas 2 - 3',
    text: 'Recolección rigurosa de datos cuantitativos y cualitativos con supervisión geolocalizada en tiempo real, auditoría de encuestas e inspección de calidad continua en Paraguay y MERCOSUR.',
    deliverable: 'Base de Datos Cruda + Reporte de Avance',
    tags: ['Encuestas CAPI/CATI', 'Focus Groups', 'Auditoría GPS'],
  },
  {
    num: '03',
    icon: 'fa-chart-line',
    title: 'Procesamiento & Analítica',
    timeframe: 'Semana 4',
    text: 'Limpieza profunda de datos, análisis de consistencia lógica, codificación cualitativa, tabulación cruzada y modelado estadístico avanzado para extraer patrones de mercado.',
    deliverable: 'Matriz de Datos Limpia + SPSS/Excel',
    tags: ['Modelado Estadístico', 'Cross-Tabs', 'Análisis Cualitativo'],
  },
  {
    num: '04',
    icon: 'fa-bullhorn',
    title: 'Insights & Recomendación',
    timeframe: 'Semana 5',
    text: 'Elaboración del informe estratégico ejecutivo con visualizaciones interactivas, recomendaciones accionables para la toma de decisiones y presentación oral ante el directorio.',
    deliverable: 'Informe Ejecutivo PDF + Dashboard + Presentación',
    tags: ['Informe Estratégico', 'Presentación Executive', 'Hoja de Ruta'],
  },
]

export default function Methodology() {
  return (
    <section id="metodologia" className="section methodology-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">
            <i className="fas fa-route me-2"></i>Proceso Metodológico
          </span>
          <h2 className="section-title">Línea de Tiempo del Proyecto</h2>
          <p>
            Un flujo de trabajo riguroso, transparente y por fases desde la definición estratégica inicial 
            hasta la entrega de informes de alto impacto.
          </p>
        </div>

        <div className="methodology-timeline">
          <div className="timeline-connecting-line" aria-hidden="true"></div>

          {steps.map((step, idx) => (
            <div className="methodology-step-card" key={step.num} data-reveal="fade-up" style={{ animationDelay: `${idx * 0.15}s` }}>
              <div className="step-card-header">
                <div className="step-number-badge">{step.num}</div>
                <div className="step-icon-glow">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <span className="step-timeframe">{step.timeframe}</span>
              </div>

              <div className="step-card-body">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.text}</p>
                
                <div className="step-deliverable">
                  <span className="deliverable-label">
                    <i className="fas fa-box-archive me-1"></i> Entregable Clave:
                  </span>
                  <span className="deliverable-value">{step.deliverable}</span>
                </div>
              </div>

              <div className="step-card-footer">
                <div className="step-tags">
                  {step.tags.map((tag) => (
                    <span key={tag} className="step-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

