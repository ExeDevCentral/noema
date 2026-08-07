import { useState } from 'react'

const faqs = [
  {
    question: '¿Cuánto tiempo requiere un estudio de mercado estándar con Carmen Capli - Noema?',
    answer: (
      <p>
        El tiempo habitual de ejecución oscila entre <strong>15 y 30 días hábiles</strong> según la complejidad del
        muestreo. Para proyectos urgentes contamos con nuestro servicio <em>Express Diagnóstico</em> que entrega
        resultados preliminares en 10-12 días hábiles.
      </p>
    ),
  },
  {
    question: '¿Cómo garantizan la representatividad y calidad de los datos en Paraguay?',
    answer: (
      <p>
        Aplicamos controles de calidad strict bajo estándares <strong>ISO 20252 y ESOMAR</strong>. Cada respuesta
        pasa por filtros informáticos de consistencia, geolocalización, verificación de tiempo de llenado y auditoría
        directa a muestras aleatorias en Asunción y principales departamentos.
      </p>
    ),
  },
  {
    question: '¿En qué formato se entregan los informes estratégicos finales?',
    answer: (
      <p>
        Entregamos un <strong>Informe Ejecutivo en presentación PDF sintetizada</strong> pensado para Directorio, la
        base de datos limpia en formato SPSS/Excel y, según el servicio contratado, un <strong>Dashboard interactivo
        dinámico</strong> para consultas internas.
      </p>
    ),
  },
  {
    question: '¿Realizan investigaciones de mercado en todo el territorio paraguayo y región?',
    answer: (
      <p>
        Sí, contamos con cobertura completa en Asunción, Gran Asunción, Ciudad del Este, Encarnación y departamentos
        del interior, además de coordinación regional para el mercado MERCOSUR.
      </p>
    ),
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Respuestas Clave</span>
          <h2 className="section-title">Preguntas Frecuentes de Nuestros Clientes</h2>
          <p>
            Aclaramos las dudas más comunes sobre plazos, representatividad y entregables de investigación en Paraguay.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div className={`faq-item${openIndex === index ? ' active' : ''}`} key={faq.question}>
              <button className="faq-question" onClick={() => toggle(index)} aria-expanded={openIndex === index}>
                {faq.question}
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="faq-answer">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
