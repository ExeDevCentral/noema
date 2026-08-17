import React, { createContext, useContext, useState, useEffect } from 'react'

export type Language = 'es' | 'gn'

export interface Translations {
  nav: {
    inicio: string
    sobreNoema: string
    servicios: string
    contacto: string
    whatsapp: string
    langToggle: string
    langName: string
  }
  hero: {
    titleMain: string
    descriptionMain: string
    tagline: string
    fieldWorkBadge: string
    card1Tag: string
    card1Title: string
    card1Desc: string
    card1Link: string
    card2Tag: string
    card2Title: string
    card2Desc: string
    card2Link: string
    card3Tag: string
    card3Title: string
    card3Desc: string
    card3Link: string
    sobreTag: string
    sobreTitle: string
    sobreLead: string
    sobreBody: string
    quote: string
    quoteAuthor: string
    howWeWork: string
    pillar1Title: string
    pillar1Desc: string
    pillar2Title: string
    pillar2Desc: string
    pillar3Title: string
    pillar3Desc: string
    pillar4Title: string
    pillar4Desc: string
  }
  about: {
    bannerTag: string
    bannerTitle: string
    bannerSubtitle: string
    sectionTitle: string
    lead: string
    body: string
    howWeWork: string
  }
  services: {
    bannerTag: string
    bannerTitle: string
    bannerSubtitle: string
    introTitle: string
    introLead: string
    introBody: string
    mode1Tag: string
    mode1Title: string
    mode1Desc: string
    mode1Items: string[]
    mode2Tag: string
    mode2Title: string
    mode2Desc: string
    mode2Items: string[]
  }
  contact: {
    bannerTag: string
    bannerTitle: string
    bannerSubtitle: string
    cardHeading: string
    cardDesc: string
    locationTitle: string
    locationText: string
    scheduleTitle: string
    scheduleText: string
    formHeading: string
    nameLabel: string
    namePlaceholder: string
    companyLabel: string
    companyPlaceholder: string
    emailLabel: string
    emailPlaceholder: string
    phoneLabel: string
    phonePlaceholder: string
    serviceLabel: string
    serviceOptionDefault: string
    serviceOption1: string
    serviceOption2: string
    serviceOption3: string
    serviceOption4: string
    messageLabel: string
    messagePlaceholder: string
    submitBtn: string
    submittingBtn: string
    modalTitle: string
    modalText: string
    modalClose: string
  }
  footer: {
    tagline: string
    directContact: string
    location: string
    rights: string
    guaraniMotto: string
  }
}

export const translations: Record<Language, Translations> = {
  es: {
    nav: {
      inicio: 'Inicio',
      sobreNoema: 'Sobre NOEMA',
      servicios: 'Servicios de Investigación',
      contacto: 'Contacto',
      whatsapp: 'WhatsApp',
      langToggle: 'GUA',
      langName: 'Guaraní',
    },
    hero: {
      titleMain: 'Investigamos para comprender.',
      descriptionMain: 'Diseñamos y desarrollamos estudios cuantitativos y cualitativos para obtener información confiable y relevante.',
      tagline: 'Cuantitativo · Cualitativo · Trabajo de campo en Paraguay',
      fieldWorkBadge: 'Relevamiento en Paraguay',
      card1Tag: 'CONÓCENOS',
      card1Title: 'Sobre NOEMA',
      card1Desc: 'Investigación y estudios diseñados para generar evidencia confiable en Paraguay.',
      card1Link: 'Conocer Más →',
      card2Tag: 'METODOLOGÍA',
      card2Title: 'Servicios',
      card2Desc: 'Estudios a medida y relevamiento de campo para agencias, empresas y organizaciones.',
      card2Link: 'Ver Servicios →',
      card3Tag: 'ATENCIÓN DIRECTA',
      card3Title: 'Contacto',
      card3Desc: 'Escríbenos para conversar sobre tu proyecto o estudio en Paraguay.',
      card3Link: 'Contactar →',
      sobreTag: 'SOBRE NOEMA',
      sobreTitle: 'Investigación rigurosa para comprender personas, opiniones y comportamientos.',
      sobreLead: 'Noema es una consultora de Investigación y Estudios que diseña y desarrolla proyectos cuantitativos y cualitativos para obtener información confiable, relevante y útil.',
      sobreBody: 'Trabajamos en las distintas etapas de un estudio, desde el diseño metodológico y la elaboración de instrumentos hasta el trabajo de campo, procesamiento y análisis de la información. Desarrollamos estudios integrales y también acompañamos proyectos en etapas específicas, de acuerdo con las necesidades de cada cliente.',
      quote: '“Investigar el mercado en Paraguay y la región no es acumular datos, es encontrar la verdad estratégica detrás de cada tendencia.”',
      quoteAuthor: 'NOEMA — INVESTIGACIÓN Y ESTUDIOS',
      howWeWork: 'Cómo trabajamos',
      pillar1Title: 'Investigación a medida',
      pillar1Desc: 'Cada proyecto parte de una pregunta y se construye con la metodología más adecuada para responderla.',
      pillar2Title: 'Del diseño al campo',
      pillar2Desc: 'Podemos desarrollar un estudio de manera integral o participar en etapas específicas, según las necesidades de cada proyecto.',
      pillar3Title: 'Campo con experiencia',
      pillar3Desc: 'Planificamos, coordinamos y ejecutamos trabajos de campo cuantitativos y cualitativos, con especial atención a la calidad del proceso.',
      pillar4Title: 'Conocimiento del contexto',
      pillar4Desc: 'Investigamos desde Paraguay, comprendiendo las particularidades de sus personas, mercados y realidades sociales.',
    },
    about: {
      bannerTag: 'INFORMACIÓN INSTITUCIONAL',
      bannerTitle: 'Sobre NOEMA',
      bannerSubtitle: 'Investigación y estudios diseñados para generar evidencia confiable y relevante en Paraguay.',
      sectionTitle: 'Investigación riguroosa para comprender personas, opiniones y comportamientos.',
      lead: 'Noema es una consultora de Investigación y Estudios que diseña y desarrolla proyectos cuantitativos y cualitativos para obtener información confiable, relevante y útil.',
      body: 'Trabajamos en las distintas etapas de un estudio, desde el diseño metodológico y la elaboración de instrumentos hasta el trabajo de campo, procesamiento y análisis de la información. Desarrollamos estudios integrales y también acompañamos proyectos en etapas específicas, de acuerdo con las necesidades de cada cliente.',
      howWeWork: 'Cómo trabajamos',
    },
    services: {
      bannerTag: 'SOLUCIONES DE INVESTIGACIÓN',
      bannerTitle: 'Servicios de Investigación',
      bannerSubtitle: 'Investigación para empresas, organizaciones e instituciones en Paraguay.',
      introTitle: 'Investigación para empresas, organizaciones e instituciones',
      introLead: 'Trabajamos con empresas, organizaciones sociales, ONG e instituciones públicas que necesitan conocer mejor a sus públicos, comprender una realidad, evaluar iniciativas o tomar decisiones basadas en información.',
      introBody: 'Diseñamos y desarrollamos estudios cuantitativos y cualitativos a medida, adaptados a los objetivos y características de cada proyecto.',
      mode1Tag: '01 · PARA AGENCIAS Y CONSULTORAS',
      mode1Title: 'Servicio de Campo',
      mode1Desc: 'Somos un equipo especializado en la ejecución de trabajos de campo en Paraguay. Nos integramos a proyectos de otras agencias y consultoras para planificar, coordinar y realizar relevamientos cuantitativos y cualitativos, con seguimiento y control de calidad.',
      mode1Items: [
        'Planificación y coordinación del trabajo de campo',
        'Encuestas presenciales y telefónicas',
        'Entrevistas en profundidad y grupos',
        'Reclutamiento de participantes',
        'Supervisión y control de calidad',
      ],
      mode2Tag: '02 · ESTUDIOS A MEDIDA',
      mode2Title: 'Servicio Integral',
      mode2Desc: 'Acompañamos a nuestros clientes en todo el proceso de investigación, desde la definición de objetivos hasta la entrega de informes y análisis para la toma de decisiones.',
      mode2Items: [
        'Estudios de mercado y opinión pública',
        'Estudios de marca, imagen y posicionamiento',
        'Investigación social y comunitaria',
        'Evaluación de proyectos y programas',
        'Informes y análisis de resultados',
      ],
    },
    contact: {
      bannerTag: 'CANALES DE COMUNICACIÓN',
      bannerTitle: 'Contacto',
      bannerSubtitle: 'Escríbenos para conversar sobre tu proyecto o estudio en Paraguay.',
      cardHeading: 'Hablemos de su próximo estudio',
      cardDesc: 'Déjenos sus datos y nos pondremos en contacto para coordinar una reunión de diagnóstico sin compromiso.',
      locationTitle: 'Ubicación',
      locationText: 'Encarnación, Paraguay | Cobertura en todo el país',
      scheduleTitle: 'Horario Institucional',
      scheduleText: 'Lunes a Viernes de 08:00 a 17:00 hs',
      formHeading: 'Envíanos una consulta',
      nameLabel: 'Nombre Completo *',
      namePlaceholder: 'Ej. Lic. Carlos Benítez',
      companyLabel: 'Empresa / Organización',
      companyPlaceholder: 'Ej. Empresa o Institución',
      emailLabel: 'Correo Electrónico *',
      emailPlaceholder: 'nombre@empresa.com',
      phoneLabel: 'Teléfono / WhatsApp *',
      phonePlaceholder: '+595 9XX XXX XXX',
      serviceLabel: '¿En qué servicio estás interesado? *',
      serviceOptionDefault: 'Selecciona una opción',
      serviceOption1: 'Servicio de Campo (Para agencias/consultoras)',
      serviceOption2: 'Servicio Integral de Investigación',
      serviceOption3: 'Estudio de Opinión Pública / Social',
      serviceOption4: 'Otro tipo de relevamiento',
      messageLabel: '¿Cómo podemos ayudarte? *',
      messagePlaceholder: 'Cuéntanos brevemente sobre tu proyecto o necesidad de investigación...',
      submitBtn: 'Enviar Consulta',
      submittingBtn: 'Enviando...',
      modalTitle: '¡Consulta Recibida con Éxito!',
      modalText: 'Muchas gracias por contactar a Noema. Hemos recibido tu información y un consultor de nuestro equipo se comunicará contigo a la brevedad.',
      modalClose: 'Aceptar',
    },
    footer: {
      tagline: 'Cuantitativo · Cualitativo · Trabajo de campo en Paraguay',
      directContact: 'Contacto Directo',
      location: 'Encarnación, Paraguay',
      rights: 'Todos los derechos reservados.',
      guaraniMotto: 'Ñeakãngeta ha pyʼamongeta',
    },
  },
  gn: {
    nav: {
      inicio: 'Ñepyrũ',
      sobreNoema: 'NOEMA Rehegua',
      servicios: 'Tembiapo Kuéra',
      contacto: 'Ñomongeta',
      whatsapp: 'WhatsApp',
      langToggle: 'ES',
      langName: 'Español',
    },
    hero: {
      titleMain: 'Ñahesaʼỹijo tekove ha apytuʼũ roikũmby hag̃ua.',
      descriptionMain: 'Rombosakoʼi ha romboguata tembiapo papapykuaa (kuantitativo) ha tekokuaa (kualitativo) rehegua rogueru hag̃ua marandu jeroviapy ha tekotevẽva.',
      tagline: 'Papapykuaa · Tekokuaa · Kóga rembiapo Paraguáipe',
      fieldWorkBadge: 'Kóga rembiapo Paraguáipe',
      card1Tag: 'OREIKUAA',
      card1Title: 'NOEMA Rehegua',
      card1Desc: 'Ñehesaʼỹijo ha tembiapo oñembosakoʼíva ogueru hag̃ua marandu jeroviapy Paraguáipe.',
      card1Link: 'Eikuaave →',
      card2Tag: 'MBAʼÉICHAPA ROJAPO',
      card2Title: 'Tembiapo Kuéra',
      card2Desc: 'Tembiapo hekopete ha ñembaʼapo kógagui agencia, empresa ha atykuérape g̃uarã.',
      card2Link: 'Ehecha Tembiapo →',
      card3Tag: 'ÑOMONGETA VOI',
      card3Title: 'Ñomongeta',
      card3Desc: 'Ehai oréve ñañomongeta hag̃ua nde tembiapo térã estudio rehe Paraguáipe.',
      card3Link: 'Eñemboja →',
      sobreTag: 'NOEMA REHEGUA',
      sobreTitle: 'Ñehesaʼỹijo añetegua roikũmby hag̃ua tekovekuéra, hembipota ha hembiapo.',
      sobreLead: 'Noema haʼe peteĩ consultora Ñehesaʼỹijo ha Estudio rehegua ombosakoʼíva ha omboguata tembiapo ogueru hag̃ua marandu añete, tekotevẽva ha ideprovéchova.',
      sobreBody: 'Rombaʼapo opa hendápe peteĩ estudio-pe: metodología ñembosakoʼígui, kuatia jepuru, ñembaʼapo kógagui ha marandu ñehesaʼỹijo peve. Rojapo tembiapo tuichakue ha avei roipytyvõ etapa oikotevẽháicha káda cliente.',
      quote: '“Ñahesaʼỹijo ñemuha Paraguái ha tetã ambuépe ndahaʼéi marandu ñembyatynte, haʼe jajuhu pe añetegua omomýiva káda tekove.”',
      quoteAuthor: 'NOEMA — ÑEHESAʼỸIJO HA PYʼAMONGETA',
      howWeWork: 'Mbaʼéichapa rombaʼapo',
      pillar1Title: 'Ñehesaʼỹijo tekotevẽháicha',
      pillar1Desc: 'Káda tembiapo oñepyrũ peteĩ porandúgui ha oñemopuʼã metodología iporãvéva reheve oñembohovái hag̃ua.',
      pillar2Title: 'Ñembosakoʼígui kógaguipe',
      pillar2Desc: 'Rojapo tembiapo opaite hendápe térã roipytyvõ etapa oñekotevẽhápe, káda proyecto oikotevẽháicha.',
      pillar3Title: 'Kóga rembiapo katupyry reheve',
      pillar3Desc: 'Romboheko, romboguata ha roejekuta tembiapo kógagui kuantitativo ha kualitativo tekokatu reheve.',
      pillar4Title: 'Tetã rekove jeikuaa',
      pillar4Desc: 'Rohesaʼỹijo Paraguáigui, roikũmbývo tekovekuéra, ñemuha ha tekoha rekove añete.',
    },
    about: {
      bannerTag: 'MARANDU INSTITUCIONAL',
      bannerTitle: 'NOEMA Rehegua',
      bannerSubtitle: 'Ñehesaʼỹijo ha tembiapo oñembosakoʼíva ogueru hag̃ua marandu jeroviapy ha tekotevẽva Paraguáipe.',
      sectionTitle: 'Ñehesaʼỹijo añetegua roikũmby hag̃ua tekovekuéra, hembipota ha hembiapo.',
      lead: 'Noema haʼe peteĩ consultora Ñehesaʼỹijo ha Estudio rehegua ombosakoʼíva ha omboguata tembiapo ogueru hag̃ua marandu añete, tekotevẽva ha ideprovéchova.',
      body: 'Rombaʼapo opa hendápe peteĩ estudio-pe: metodología ñembosakoʼígui, kuatia jepuru, ñembaʼapo kógagui ha marandu ñehesaʼỹijo peve. Rojapo tembiapo tuichakue ha avei roipytyvõ etapa oikotevẽháicha káda cliente.',
      howWeWork: 'Mbaʼéichapa rombaʼapo',
    },
    services: {
      bannerTag: 'ÑEHESAʼỸIJO POKATU',
      bannerTitle: 'Tembiapo Kuéra Ñehesaʼỹijo rehegua',
      bannerSubtitle: 'Ñehesaʼỹijo empresa, atykuéra ha tetã rembipota rehegua Paraguáipe.',
      introTitle: 'Ñehesaʼỹijo empresa, atykuéra ha institución-pe g̃uarã',
      introLead: 'Rombaʼapo empresa, atyguasu, ONG ha institución ndive oikuaaséva hetavépe hembiaporã, oikũmby hag̃ua tekove ha ojapyhy hag̃ua tape marandu añete reheve.',
      introBody: 'Rombosakoʼi ha romboguata estudio kuantitativo ha kualitativo tekotevẽháicha káda tembiaporã.',
      mode1Tag: '01 · AGENCIA HA CONSULTORA-PE G̃UARÃ',
      mode1Title: 'Kóga Rembiapo (Servicio de Campo)',
      mode1Desc: 'Ore haʼe peteĩ aty ikatupyrýva kóga rembiapópe Paraguái tuichakue. Roike ambue agencia ha consultora tembiapópe romboguata hag̃ua relevamiento kuantitativo ha kualitativo, tekokatu ha jesareko reheve.',
      mode1Items: [
        'Kóga rembiapo ñembosakoʼi ha ñemboguata',
        'Porandu tapichápe hovake ha pumbyry rupi',
        'Ñomongeta pypuku ha atykuéra ndive (Focus Groups)',
        'Tapichakuéra jeporavo tembiaporã',
        'Jesareko ha tekokatu ñangareko',
      ],
      mode2Tag: '02 · ESTUDIO TEKOTEVẼHÁICHA',
      mode2Title: 'Tembiapo Tuichakue (Servicio Integral)',
      mode2Desc: 'Ropytyvõ ore cliente-kuérape opaite ñehesaʼỹijópe: hembipota jehai guive marandu mombeʼu ha pyʼamongeta peve desisión pyahu ojejapyhy hag̃ua.',
      mode2Items: [
        'Ñemuha ha tetãygua rembipota ñehesaʼỹijo',
        'Marca, taʼanga ha tenda jeguereko ñehesaʼỹijo',
        'Tekoha ha tavaygua ñehesaʼỹijo',
        'Tembiaporã ha programa jehechajey',
        'Kuatiañeʼẽ ha marandu ñehesaʼỹijo tekotevẽva',
      ],
    },
    contact: {
      bannerTag: 'ÑOMONGETA TAPEKUÉRA',
      bannerTitle: 'Ñomongeta Noema ndive',
      bannerSubtitle: 'Ehai oréve ñañomongeta hag̃ua nde tembiapo térã estudio rehe Paraguáipe.',
      cardHeading: 'Ñañomongeta nde estudio pyahu rehe',
      cardDesc: 'Eheja oréve ne marandu ha roñembojáta nendive ñañomongeta hag̃ua vyʼápe ha mbaʼeve repyʼỹre.',
      locationTitle: 'Tenda',
      locationText: 'Encarnación, Paraguái | Roipytyvõ tetã tuichakue',
      scheduleTitle: 'Aravo Ñembaʼapoha',
      scheduleText: 'Arakõi guive Arapoteĩ peve 08:00 guive 17:00 aravo peve',
      formHeading: 'Embou ne porandu',
      nameLabel: 'Téra ha Terajoapy *',
      namePlaceholder: 'Techapyrã: Lic. Carlos Benítez',
      companyLabel: 'Empresa / Aty',
      companyPlaceholder: 'Techapyrã: Empresa térã Institución',
      emailLabel: 'Ñeʼẽveve (Email) *',
      emailPlaceholder: 'tera@empresa.com',
      phoneLabel: 'Pumbyry / WhatsApp *',
      phonePlaceholder: '+595 9XX XXX XXX',
      serviceLabel: '¿Mbaʼe tembiapópa reikotevẽ? *',
      serviceOptionDefault: 'Eiporavo peteĩ opción',
      serviceOption1: 'Kóga Rembiapo (Agencia/Consultora-pe g̃uarã)',
      serviceOption2: 'Tembiapo Tuichakue Ñehesaʼỹijópe',
      serviceOption3: 'Estudio de Opinión Pública / Tekoha rehegua',
      serviceOption4: 'Ambue relevamiento',
      messageLabel: '¿Mbaʼéichapa ikatu roipytyvõ? *',
      messagePlaceholder: 'Emombeʼu mbykymi oréve mbaʼépa reipotahína nde estudio-pe...',
      submitBtn: 'Embou Ne Porandu',
      submittingBtn: 'Oñembouhína...',
      modalTitle: '¡Ne Porandu Oguahẽ Porã!',
      modalText: 'Aguyjeve ndéve eñeʼẽ haguére Noema ndive. Roguerekomakatu ne marandu ha ore equipo oñeʼẽta nendive pyaʼeterei.',
      modalClose: 'Oĩma',
    },
    footer: {
      tagline: 'Papapykuaa · Tekokuaa · Kóga rembiapo Paraguáipe',
      directContact: 'Ñomongeta Voi',
      location: 'Encarnación, Paraguái',
      rights: 'Opa derécho oñeñangareko.',
      guaraniMotto: 'Ñeakãngeta ha pyʼamongeta',
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('noema_lang') as Language
    return saved === 'gn' || saved === 'es' ? saved : 'es'
  })

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('noema_lang', lang)
    document.documentElement.lang = lang === 'gn' ? 'gn' : 'es'
  }

  const toggleLanguage = () => {
    setLanguage(language === 'es' ? 'gn' : 'es')
  }

  useEffect(() => {
    document.documentElement.lang = language === 'gn' ? 'gn' : 'es'
  }, [language])

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
