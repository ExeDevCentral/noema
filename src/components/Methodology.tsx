const steps = [
  {
    num: '1',
    icon: 'fa-magnifying-glass-chart',
    title: 'Diagnóstico & Diseño',
    text: 'Alineación inicial con los objetivos de negocio, formulación de hipótesis y diseño del instrumento de investigación (cuestionarios o pautas).',
  },
  {
    num: '2',
    icon: 'fa-people-group',
    title: 'Trabajo de Campo',
    text: 'Recolección rigurosa de datos con control de calidad continuo, supervisión en tiempo real y muestreo representativo en Paraguay y región.',
  },
  {
    num: '3',
    icon: 'fa-chart-line',
    title: 'Procesamiento & Analítica',
    text: 'Limpieza de base de datos, análisis de consistencia, codificación cualitativa y modelado estadístico avanzado.',
  },
  {
    num: '4',
    icon: 'fa-bullhorn',
    title: 'Insights & Recomendación',
    text: 'Entrega de informe ejecutivo con conclusiones claras, presentación oral ante el directorio y hoja de ruta estratégica.',
  },
]

export default function Methodology() {
  return (
    <section id="metodologia" className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Proceso de Trabajo</span>
          <h2 className="section-title">Metodología Noema en 4 Pasos</h2>
          <p>
            Un flujo estructurado y transparente desde la definición del problema hasta las recomendaciones
            estratégicas finales.
          </p>
        </div>

        <div className="methodology-timeline">
          {steps.map((step) => (
            <div className="methodology-step" key={step.num}>
              <span className="step-label">Paso {step.num}</span>
              <div className="step-icon-badge">
                <i className={`fas ${step.icon}`}></i>
              </div>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
