/* ============================================
   CFO Playbook Survey - Altus Nova
   Interactive Survey App (EN/ES bilingual)
   ============================================ */

// ===== CONFIGURATION =====
const CONFIG = {
  contactEmail: 'jason@altusnova.com'
};

// Shared token for Google Sheets webhook (must match value in Apps Script)
const SHEETS_TOKEN = 'cfo-survey-2026-ax7k9m';

// ===== HUBSPOT CONFIGURATION =====
const HUBSPOT = {
  portalId: '45991979',
  formGuid: '3a374c67-d27d-4ea7-8570-4eb01b002617'
};

// Maps question IDs to existing HubSpot contact property names
const HUBSPOT_FIELD_MAP = {
  1:  'cfo_survey__your_role',
  2:  'cfo_survey_company_profile',
  3:  'cfo_survey_capital_allocation',
  4:  'cfo_survey_capital_challenge',
  5:  'cfo_survey_profitability_visibility',
  6:  'cfo_survey_pricing_analytics',
  7:  'cfo_survey_margin_limitation',
  8:  'cfo_survey_ai_operational',
  9:  'cfo_survey_ai_impact_area',
  10: 'cfo_survey_productivity_blocker',
  11: 'cfo_survey_forecasting_method',
  12: 'cfo_survey_forecast_usage',
  13: 'cfo_survey_forecasting_gap',
  14: 'cfo_survey_other_initiative',
  15: 'cfo_survey_underutilized_area',
  16: 'cfo_survey_peer_insights',
  17: 'cfo_survey_panel_interest'
};

// ===== GOOGLE SHEETS CONFIGURATION =====
const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbwna5TIZZ9t9obr6e47kdDXqVMum1Yw6-QbCpx7YBQ_c9sVZ7JerGrv_v285O8s_uQD/exec';

// ===== UI TEXT (static elements outside questions) =====
const UI = {
  en: {
    landingLabel: 'CFO Playbook Survey',
    landingHeadline: 'How CFOs Are Actually Creating Value with Data & AI',
    landingBody1: 'Finance leaders are under pressure to create value. The era of cheap debt and multiple expansion is over.',
    landingBody2: 'We are studying AI driven strategies that CFOs are executing.',
    landingBody3: "We'll share anonymized results with participants.",
    startSurvey: 'Start Survey',
    landingMeta: '17 questions \u00b7 3-5 minutes \u00b7 No login required',
    back: '\u2190 Back',
    next: 'Next',
    questionCounter: 'Question {n} of {total}',
    didYouKnow: 'Did you know?',
    pleaseSpecify: 'Please specify:',
    typeYourAnswer: 'Type your answer...',
    gateHeadline: 'Where should we send your benchmark results?',
    gateSubhead: "We'll compile anonymized results and share them with participants in the coming weeks.",
    labelName: 'Full Name',
    labelEmail: 'Work Email',
    labelCompany: 'Company',
    labelOptional: '(optional)',
    submitBtn: 'Submit & See Results',
    formPrivacy: 'Your information is secure and will not be shared with third parties.',
    thanksHeadline: 'Thanks for sharing your perspective',
    thanksBody1: "We'll compile anonymized results and share them with participants in the coming weeks.",
    thanksBody2: "In the meantime, if you haven't already:",
    downloadBtn: 'Download the Full CFO Playbook',
    thanksContact: 'For more information contact:'
  },
  es: {
    landingLabel: 'Encuesta del Playbook para CFOs',
    landingHeadline: 'Como los CFOs Estan Generando Valor con Datos e IA',
    landingBody1: 'Los lideres financieros estan bajo presion para generar valor. La era de la deuda barata y la expansion de multiplos termino.',
    landingBody2: 'Estamos estudiando las estrategias de IA que los CFOs estan implementando.',
    landingBody3: 'Compartiremos los resultados anonimizados con los participantes.',
    startSurvey: 'Iniciar Encuesta',
    landingMeta: '17 preguntas \u00b7 3-5 minutos \u00b7 Sin registro',
    back: '\u2190 Volver',
    next: 'Siguiente',
    questionCounter: 'Pregunta {n} de {total}',
    didYouKnow: '\u00bfSabia que?',
    pleaseSpecify: 'Por favor especifique:',
    typeYourAnswer: 'Escriba su respuesta...',
    gateHeadline: '\u00bfA donde le enviamos los resultados comparativos?',
    gateSubhead: 'Compilaremos los resultados anonimizados y los compartiremos con los participantes en las proximas semanas.',
    labelName: 'Nombre Completo',
    labelEmail: 'Correo Corporativo',
    labelCompany: 'Empresa',
    labelOptional: '(opcional)',
    submitBtn: 'Enviar y Ver Resultados',
    formPrivacy: 'Su informacion esta segura y no sera compartida con terceros.',
    thanksHeadline: 'Gracias por compartir su perspectiva',
    thanksBody1: 'Compilaremos los resultados anonimizados y los compartiremos con los participantes en las proximas semanas.',
    thanksBody2: 'Mientras tanto, si aun no lo ha hecho:',
    downloadBtn: 'Descargar el Playbook Completo para CFOs',
    thanksContact: 'Para mas informacion contacte a:'
  }
};

// ===== PLAY HEADERS =====
const PLAY_HEADERS = {
  'Play 1': {
    label_es: 'Jugada 1',
    title: 'Funding the Future: Data-Driven Capital Allocation',
    title_es: 'Financiando el Futuro: Asignacion de Capital Basada en Datos',
    summary: 'Build an intelligent capital allocation process where every investment is rigorously vetted and the portfolio is optimized for risk-adjusted return.',
    summary_es: 'Construya un proceso inteligente de asignacion de capital donde cada inversion sea rigurosamente evaluada y el portafolio este optimizado para retorno ajustado por riesgo.'
  },
  'Play 2': {
    label_es: 'Jugada 2',
    title: 'Architecting Your Pricing & Profitability Engine',
    title_es: 'Disenando su Motor de Precios y Rentabilidad',
    summary: 'Transform gut-feel pricing into a data-driven strategy that reveals exactly where margin is leaking and where opportunities exist.',
    summary_es: 'Transforme las decisiones de precios basadas en intuicion en una estrategia basada en datos que revele exactamente donde se filtra el margen y donde existen oportunidades.'
  },
  'Play 3': {
    label_es: 'Jugada 3',
    title: 'Fueling Growth with Operational Cash',
    title_es: 'Impulsando el Crecimiento con Efectivo Operacional',
    summary: 'Unlock cash hidden in operational inefficiency and multiply your team\'s output to fund growth from within.',
    summary_es: 'Libere el efectivo oculto en la ineficiencia operacional y multiplique la productividad de su equipo para financiar el crecimiento desde adentro.'
  },
  'Play 4': {
    label_es: 'Jugada 4',
    title: 'Building the Engine for Real-Time & Predictive Decisions',
    title_es: 'Construyendo el Motor para Decisiones en Tiempo Real y Predictivas',
    summary: 'Transform finance from reporting the past to predicting the future with AI-powered forecasting and scenario planning.',
    summary_es: 'Transforme las finanzas de reportar el pasado a predecir el futuro con pronosticos impulsados por IA y planificacion de escenarios.'
  }
};

// ===== QUESTIONS DATA =====
const QUESTIONS = [
  // Section A: Background
  {
    id: 1,
    section: 'Background',
    section_es: 'Antecedentes',
    text: 'Your Role',
    text_es: 'Su Rol',
    type: 'single',
    options: [
      { text: 'CFO', text_es: 'CFO' },
      { text: 'CEO', text_es: 'CEO' },
      { text: 'Controller', text_es: 'Controller' },
      { text: 'COO/Operations', text_es: 'COO/Operaciones' },
      { text: 'Other senior finance leader', text_es: 'Otro lider senior de finanzas' }
    ]
  },
  {
    id: 2,
    section: 'Background',
    section_es: 'Antecedentes',
    text: 'Company Profile',
    text_es: 'Perfil de la Empresa',
    type: 'twopart',
    parts: [
      {
        label: 'Revenue',
        label_es: 'Ingresos',
        options: [
          { text: 'Under $50M', text_es: 'Menos de $50M' },
          { text: '$50M - $100M', text_es: '$50M - $100M' },
          { text: '$100M - $250M', text_es: '$100M - $250M' },
          { text: '$250M - $500M', text_es: '$250M - $500M' },
          { text: '$500M - $1B', text_es: '$500M - $1B' },
          { text: 'Over $1B', text_es: 'Mas de $1B' }
        ]
      },
      {
        label: 'Ownership',
        label_es: 'Estructura de Propiedad',
        options: [
          { text: 'PE-backed', text_es: 'Respaldada por PE' },
          { text: 'Public', text_es: 'Publica' },
          { text: 'Private (not PE-backed)', text_es: 'Privada (sin respaldo de PE)' }
        ]
      }
    ]
  },

  // Section B: Play 1 - Data-Driven Capital Allocation
  {
    id: 3,
    section: 'Play 1: Capital Allocation',
    section_es: 'Jugada 1: Asignacion de Capital',
    text: 'Where are you on implementing a structured, data-backed capital allocation process?',
    text_es: '\u00bfEn que punto se encuentra en la implementacion de un proceso estructurado de asignacion de capital basado en datos?',
    type: 'single',
    options: [
      { text: 'Not on our radar', text_es: 'No esta en nuestro radar', subtext: "We haven't considered this", subtext_es: 'No lo hemos considerado' },
      { text: 'Exploring / researching', text_es: 'Explorando / investigando', subtext: 'Looking into what this could look like', subtext_es: 'Evaluando como podria verse' },
      { text: 'Planning to implement', text_es: 'Planeando implementar', subtext: 'On our roadmap for the next 12-18 months', subtext_es: 'En nuestra hoja de ruta para los proximos 12-18 meses' },
      { text: 'Piloted in one area', text_es: 'Piloto en un area', subtext: 'Testing with a subset of investments', subtext_es: 'Probando con un subconjunto de inversiones' },
      { text: 'Implemented for major investments', text_es: 'Implementado para inversiones importantes', subtext: 'Applied to significant capital decisions', subtext_es: 'Aplicado a decisiones de capital significativas' },
      { text: 'Fully embedded and closed-loop', text_es: 'Completamente integrado y con ciclo cerrado', subtext: 'Standard process with post-investment tracking', subtext_es: 'Proceso estandar con seguimiento post-inversion' }
    ],
    tooltip: "The most common capital allocation failure isn't picking wrong - it's lack of post-investment accountability. With a unified source of truth, your team tracks actual performance against original business cases - making the system smarter over time.",
    tooltip_es: 'La falla mas comun en la asignacion de capital no es elegir mal, sino la falta de rendicion de cuentas post-inversion. Con una fuente unica de verdad, su equipo rastrea el desempeno real versus los casos de negocio originales, haciendo el sistema mas inteligente con el tiempo.'
  },
  {
    id: 4,
    section: 'Play 1: Capital Allocation',
    section_es: 'Jugada 1: Asignacion de Capital',
    text: "What's been the biggest challenge in using data in your capital allocation process?",
    text_es: '\u00bfCual ha sido el mayor desafio al usar datos en su proceso de asignacion de capital?',
    type: 'single',
    hasOther: true,
    options: [
      { text: 'Data quality / integration issues', text_es: 'Problemas de calidad / integracion de datos' },
      { text: 'Lack of standardized metrics across business units', text_es: 'Falta de metricas estandarizadas entre unidades de negocio' },
      { text: 'Business unit resistance to transparency', text_es: 'Resistencia de las unidades de negocio a la transparencia' },
      { text: 'Tooling complexity', text_es: 'Complejidad de herramientas' },
      { text: 'Executive alignment on criteria', text_es: 'Alineacion ejecutiva en criterios' },
      { text: 'Post-investment accountability is weak', text_es: 'La rendicion de cuentas post-inversion es debil' },
      { text: "We haven't focused on this yet", text_es: 'Aun no nos hemos enfocado en esto' },
      { text: 'Other (please specify)', text_es: 'Otro (por favor especifique)', isOther: true }
    ],
    tooltip: "CFOs who implement closed-loop capital tracking report faster board approvals - not because projects get better, but because the decision-making process becomes defensible and repeatable.",
    tooltip_es: 'Los CFOs que implementan seguimiento de capital en ciclo cerrado reportan aprobaciones de directorio mas rapidas, no porque los proyectos mejoren, sino porque el proceso de toma de decisiones se vuelve defendible y repetible.'
  },

  // Section B: Play 2 - Pricing & Profitability Analytics
  {
    id: 5,
    section: 'Play 2: Pricing & Profitability',
    section_es: 'Jugada 2: Precios y Rentabilidad',
    text: 'Do you have customer- or SKU-level profitability visibility today?',
    text_es: '\u00bfTiene visibilidad de rentabilidad a nivel de cliente o SKU hoy?',
    type: 'single',
    options: [
      { text: 'No visibility', text_es: 'Sin visibilidad', subtext: "We don't track at this level", subtext_es: 'No rastreamos a este nivel' },
      { text: 'Planning to build this', text_es: 'Planeando construir esto', subtext: 'On our roadmap but not started', subtext_es: 'En nuestra hoja de ruta pero sin iniciar' },
      { text: 'Partial / delayed', text_es: 'Parcial / con retraso', subtext: 'We can get there but it takes significant effort', subtext_es: 'Podemos llegar pero requiere esfuerzo significativo' },
      { text: 'Mostly available', text_es: 'Mayormente disponible', subtext: 'Regular reporting but not real-time', subtext_es: 'Reportes regulares pero no en tiempo real' },
      { text: 'Fully real-time and actionable', text_es: 'Completamente en tiempo real y accionable', subtext: 'Embedded in daily decisions', subtext_es: 'Integrado en decisiones diarias' }
    ],
    tooltip: "In some cases, aggressive discounting actually *decreases* win rates. Without data, these counterintuitive dynamics stay hidden - and margin leaks continue unchecked.",
    tooltip_es: 'En algunos casos, los descuentos agresivos en realidad disminuyen las tasas de cierre. Sin datos, estas dinamicas contraintuitivas permanecen ocultas y las fugas de margen continuan sin control.'
  },
  {
    id: 6,
    section: 'Play 2: Pricing & Profitability',
    section_es: 'Jugada 2: Precios y Rentabilidad',
    text: 'Have you used analytics or AI to guide pricing or discounting decisions?',
    text_es: '\u00bfHa usado analitica o IA para guiar decisiones de precios o descuentos?',
    type: 'single',
    options: [
      { text: 'Not yet', text_es: 'Aun no', subtext: "Haven't explored this", subtext_es: 'No lo hemos explorado' },
      { text: 'Considering it', text_es: 'Considerandolo', subtext: 'Researching tools or approaches', subtext_es: 'Investigando herramientas o enfoques' },
      { text: 'Analysis only', text_es: 'Solo analisis', subtext: "We've run studies but no behavior change", subtext_es: 'Hemos hecho estudios pero sin cambio de comportamiento' },
      { text: 'Guardrails implemented', text_es: 'Guardarrailes implementados', subtext: 'Discount limits or approval workflows in place', subtext_es: 'Limites de descuento o flujos de aprobacion implementados' },
      { text: 'Actively steering pricing', text_es: 'Dirigiendo precios activamente', subtext: 'AI/analytics drive real-time pricing decisions', subtext_es: 'La IA/analitica impulsa decisiones de precios en tiempo real' }
    ],
    tooltip: "The fastest margin wins usually come from visibility, not optimization. Simply showing sales reps the margin impact of each deal - in real time, in their workflow - often changes behavior without new rules or approvals.",
    tooltip_es: 'Las ganancias de margen mas rapidas generalmente vienen de la visibilidad, no de la optimizacion. Simplemente mostrar a los vendedores el impacto en margen de cada negocio, en tiempo real y en su flujo de trabajo, a menudo cambia el comportamiento sin nuevas reglas ni aprobaciones.'
  },
  {
    id: 7,
    section: 'Play 2: Pricing & Profitability',
    section_es: 'Jugada 2: Precios y Rentabilidad',
    text: "What's limited margin improvement the most?",
    text_es: '\u00bfQue ha limitado mas la mejora de margenes?',
    type: 'single',
    hasOther: true,
    options: [
      { text: "We don't have accurate cost-to-serve data", text_es: 'No tenemos datos precisos de costo de servicio' },
      { text: "Sales team won't change behavior", text_es: 'El equipo de ventas no cambia su comportamiento' },
      { text: 'Compensation rewards revenue, not margin', text_es: 'La compensacion recompensa ingresos, no margen' },
      { text: 'Leadership fears losing customers if we tighten pricing', text_es: 'El liderazgo teme perder clientes si ajustamos precios' },
      { text: "We don't trust the underlying data", text_es: 'No confiamos en los datos subyacentes' },
      { text: "Pricing decisions are made outside finance's influence", text_es: 'Las decisiones de precios se toman fuera de la influencia de finanzas' },
      { text: "We haven't made this a priority yet / we don't know", text_es: 'Aun no lo hemos priorizado / no sabemos' },
      { text: 'Other (please specify)', text_es: 'Otro (por favor especifique)', isOther: true }
    ],
    tooltip: "In some cases, aggressive discounting actually decreases win rates. Customers interpret deep discounts as desperation or question product quality. The data often reveals pricing power you didn't know you had.",
    tooltip_es: 'En algunos casos, los descuentos agresivos en realidad disminuyen las tasas de cierre. Los clientes interpretan descuentos profundos como desesperacion o cuestionan la calidad del producto. Los datos a menudo revelan un poder de fijacion de precios que no sabia que tenia.'
  },

  // Section B: Play 3 - Operational Cash & Productivity
  {
    id: 8,
    section: 'Play 3: Operational Cash',
    section_es: 'Jugada 3: Efectivo Operacional',
    text: 'Have you used data-driven AI to reduce operational friction or increase revenue per employee?',
    text_es: '\u00bfHa usado IA basada en datos para reducir la friccion operacional o aumentar los ingresos por empleado?',
    type: 'single',
    options: [
      { text: 'Not on our radar', text_es: 'No esta en nuestro radar', subtext: "Haven't prioritized this", subtext_es: 'No lo hemos priorizado' },
      { text: 'Exploring opportunities', text_es: 'Explorando oportunidades', subtext: 'Looking at where AI could help', subtext_es: 'Evaluando donde podria ayudar la IA' },
      { text: 'Planning specific initiatives', text_es: 'Planeando iniciativas especificas', subtext: 'Identified use cases, building business case', subtext_es: 'Casos de uso identificados, construyendo caso de negocio' },
      { text: 'Small pilots', text_es: 'Pilotos pequenos', subtext: 'Testing in isolated areas', subtext_es: 'Probando en areas aisladas' },
      { text: 'Department-level impact', text_es: 'Impacto a nivel departamental', subtext: 'Measurable gains in specific functions', subtext_es: 'Ganancias medibles en funciones especificas' },
      { text: 'Company-wide operating model shift', text_es: 'Cambio de modelo operativo a nivel empresa', subtext: 'Fundamentally changed how we work', subtext_es: 'Cambio fundamentalmente como trabajamos' }
    ],
    tooltip: "A mid-market manufacturing company facing top-line pressure from rising interest rates improved service levels by several points, reduced working capital, and cut production costs - all through real-time supplier scorecards and production cycle time measurement.",
    tooltip_es: 'Una empresa manufacturera de mercado medio que enfrentaba presion en ingresos por el aumento de tasas de interes mejoro los niveles de servicio en varios puntos, redujo el capital de trabajo y recorto costos de produccion, todo mediante scorecards de proveedores en tiempo real y medicion del tiempo de ciclo de produccion.'
  },
  {
    id: 9,
    section: 'Play 3: Operational Cash',
    section_es: 'Jugada 3: Efectivo Operacional',
    text: 'When implementing data-driven AI, where have you seen the most impact (or would expect to)?',
    text_es: 'Al implementar IA basada en datos, \u00bfdonde ha visto el mayor impacto (o lo esperaria)?',
    subtext: 'Select up to 3',
    subtext_es: 'Seleccione hasta 3',
    type: 'multi',
    maxSelections: 3,
    options: [
      { text: 'Cash conversion cycle improvement', text_es: 'Mejora del ciclo de conversion de efectivo' },
      { text: 'Headcount avoidance / productivity gains', text_es: 'Eficiencia de personal / ganancias de productividad' },
      { text: 'Faster close / billing cycles', text_es: 'Ciclos de cierre / facturacion mas rapidos' },
      { text: 'Throughput / cycle time reduction', text_es: 'Reduccion de throughput / tiempo de ciclo' },
      { text: 'Customer service levels', text_es: 'Niveles de servicio al cliente' },
      { text: 'Limited or no impact yet', text_es: 'Impacto limitado o nulo hasta ahora' }
    ]
  },
  {
    id: 10,
    section: 'Play 3: Operational Cash',
    section_es: 'Jugada 3: Efectivo Operacional',
    text: "What has slowed progress on operational productivity?",
    text_es: '\u00bfQue ha frenado el progreso en productividad operacional?',
    subtext: 'Select up to 3',
    subtext_es: 'Seleccione hasta 3',
    type: 'multi',
    maxSelections: 3,
    options: [
      { text: 'Change management challenges', text_es: 'Desafios de gestion del cambio' },
      { text: 'IT bottlenecks / competing priorities', text_es: 'Cuellos de botella de TI / prioridades en competencia' },
      { text: 'Governance / security concerns', text_es: 'Preocupaciones de gobernanza / seguridad' },
      { text: 'Lack of clear ownership', text_es: 'Falta de propiedad clara' },
      { text: 'We have the tools but not the culture', text_es: 'Tenemos las herramientas pero no la cultura' },
      { text: "Haven't focused here yet", text_es: 'Aun no nos hemos enfocado aqui' }
    ],
    tooltip: "Don't let procurement processes and managers stand in the way of the AI-trailblazers in your organization. The biggest productivity gains often come from one or two 'data athletes' who get permission to experiment. Small pilots with motivated champions can outperform top-down mandates.",
    tooltip_es: 'No deje que los procesos de compras y los gerentes se interpongan en el camino de los pioneros de IA en su organizacion. Las mayores ganancias de productividad a menudo vienen de uno o dos "atletas de datos" que obtienen permiso para experimentar. Los pilotos pequenos con campeones motivados pueden superar los mandatos de arriba hacia abajo.'
  },

  // Section B: Play 4 - Real-Time & Predictive Decisioning
  {
    id: 11,
    section: 'Play 4: Predictive Decisioning',
    section_es: 'Jugada 4: Decisiones Predictivas',
    text: 'How do you forecast today?',
    text_es: '\u00bfComo hace pronosticos hoy?',
    type: 'single',
    options: [
      { text: 'Static annual budget', text_es: 'Presupuesto anual estatico', subtext: 'Traditional annual planning cycle', subtext_es: 'Ciclo tradicional de planificacion anual' },
      { text: 'Rolling forecast (manual)', text_es: 'Pronostico rotativo (manual)', subtext: 'Updated quarterly/monthly but heavy lift', subtext_es: 'Actualizado trimestral/mensualmente pero con gran esfuerzo' },
      { text: 'Planning to modernize', text_es: 'Planeando modernizar', subtext: 'Evaluating tools or approaches to improve', subtext_es: 'Evaluando herramientas o enfoques para mejorar' },
      { text: 'System-driven rolling forecast', text_es: 'Pronostico rotativo impulsado por sistema', subtext: 'Automated updates with some manual adjustment', subtext_es: 'Actualizaciones automatizadas con algunos ajustes manuales' },
      { text: 'Predictive / scenario-based', text_es: 'Predictivo / basado en escenarios', subtext: 'AI-powered with multiple scenario modeling', subtext_es: 'Impulsado por IA con modelado de multiples escenarios' }
    ],
    tooltip: "The winner won't be the one who reports the past most accurately, but the one who can model the future most effectively. While you reconcile last quarter, competitors are simulating next year.",
    tooltip_es: 'El ganador no sera quien reporte el pasado con mayor precision, sino quien pueda modelar el futuro de manera mas efectiva. Mientras usted concilia el trimestre pasado, los competidores estan simulando el proximo ano.'
  },
  {
    id: 12,
    section: 'Play 4: Predictive Decisioning',
    section_es: 'Jugada 4: Decisiones Predictivas',
    text: 'Are leaders in your company using forecasts to change decisions in-flight?',
    text_es: '\u00bfLos lideres de su empresa usan los pronosticos para cambiar decisiones en curso?',
    type: 'single',
    options: [
      { text: 'Rarely - forecasts are backward-looking reports', text_es: 'Rara vez - los pronosticos son reportes retrospectivos' },
      { text: 'Sometimes - major variances trigger discussion', text_es: 'A veces - las variaciones importantes generan discusion' },
      { text: 'Often - forecasts drive weekly/monthly decisions', text_es: 'Frecuentemente - los pronosticos impulsan decisiones semanales/mensuales' },
      { text: 'This is core to how we operate', text_es: 'Esto es fundamental en como operamos' }
    ],
    tooltip: "The shift to predictive decisioning starts when leaders ask 'what should we do differently?' not 'what happened?' The forecast becomes a decision tool, not a reporting exercise.",
    tooltip_es: 'El cambio hacia decisiones predictivas comienza cuando los lideres preguntan "\u00bfque deberiamos hacer diferente?" en vez de "\u00bfque paso?" El pronostico se convierte en una herramienta de decision, no en un ejercicio de reporte.'
  },
  {
    id: 13,
    section: 'Play 4: Predictive Decisioning',
    section_es: 'Jugada 4: Decisiones Predictivas',
    text: "What's the biggest gap preventing better forecasting?",
    text_es: '\u00bfCual es la mayor brecha que impide mejores pronosticos?',
    type: 'single',
    options: [
      { text: 'Fragmented data across systems', text_es: 'Datos fragmentados entre sistemas' },
      { text: 'Lack of modeling capability / tools', text_es: 'Falta de capacidad / herramientas de modelado' },
      { text: 'Trust in forecast outputs', text_es: 'Confianza en los resultados del pronostico' },
      { text: "Leadership adoption - they don't use it", text_es: 'Adopcion del liderazgo - no lo usan' },
      { text: 'Skills gap on the team', text_es: 'Brecha de habilidades en el equipo' },
      { text: "We're satisfied with our current approach", text_es: 'Estamos satisfechos con nuestro enfoque actual' },
      { text: "I don't know", text_es: 'No se' }
    ]
  },

  // Section C: The Missing Play
  {
    id: 14,
    section: 'The Missing Play',
    section_es: 'La Jugada Faltante',
    text: "Is there a major data-driven value creation initiative you've focused on that isn't covered by the four plays we reviewed?",
    text_es: '\u00bfHay alguna iniciativa importante de creacion de valor basada en datos en la que se haya enfocado y que no este cubierta por las cuatro jugadas que revisamos?',
    type: 'open',
    placeholder: "Describe any data/AI initiative that's driven significant value for your organization that's not covered by the four plays.",
    placeholder_es: 'Describa cualquier iniciativa de datos/IA que haya generado valor significativo para su organizacion y que no este cubierta por las cuatro jugadas.',
    optional: true
  },
  {
    id: 15,
    section: 'The Missing Play',
    section_es: 'La Jugada Faltante',
    text: 'Which area do you believe is most underutilized by finance teams today?',
    text_es: '\u00bfQue area cree que es la mas subutilizada por los equipos de finanzas hoy?',
    type: 'single',
    hasOther: true,
    options: [
      { text: 'M&A integration / post-acquisition value capture', text_es: 'Integracion de M&A / captura de valor post-adquisicion' },
      { text: 'Working capital / AR intelligence', text_es: 'Capital de trabajo / inteligencia de cuentas por cobrar' },
      { text: 'Vendor spend & contract leakage', text_es: 'Gasto en proveedores y fugas contractuales' },
      { text: 'Risk & compliance automation', text_es: 'Automatizacion de riesgo y cumplimiento' },
      { text: 'Customer lifetime value modeling', text_es: 'Modelado del valor de vida del cliente' },
      { text: 'Revenue operations alignment', text_es: 'Alineacion de operaciones de ingresos' },
      { text: 'Something else (please specify)', text_es: 'Otro (por favor especifique)', isOther: true }
    ],
    tooltip: "We're actively researching the \"5th play\" based on what CFOs tell us. Your input directly shapes our upcoming research and panel discussions.",
    tooltip_es: 'Estamos investigando activamente la "5ta jugada" basandonos en lo que nos dicen los CFOs. Su aporte da forma directamente a nuestra proxima investigacion y paneles de discusion.'
  },

  // Section D: Soft Conversion
  {
    id: 16,
    section: 'Share Results',
    section_es: 'Compartir Resultados',
    text: 'Would you find it useful to see how peers are executing these plays?',
    text_es: '\u00bfLe resultaria util ver como sus pares estan ejecutando estas jugadas?',
    type: 'single',
    options: [
      { text: 'Yes - send me anonymized benchmark results', text_es: 'Si - envienme resultados comparativos anonimizados' },
      { text: 'Maybe - depends on the quality of insights', text_es: 'Quizas - depende de la calidad de los insights' },
      { text: 'No thanks', text_es: 'No, gracias' }
    ]
  },
  {
    id: 17,
    section: 'Share Results',
    section_es: 'Compartir Resultados',
    text: "We're hosting a peer discussion panel with finance execs who've run these plays. Would you be interested in participating or attending?",
    text_es: 'Estamos organizando un panel de discusion entre pares con ejecutivos de finanzas que han ejecutado estas jugadas. \u00bfLe interesaria participar o asistir?',
    type: 'single',
    options: [
      { text: "Yes - I'd consider being a panelist", text_es: 'Si - consideraria ser panelista' },
      { text: "Yes - I'd attend as a participant", text_es: 'Si - asistiria como participante' },
      { text: "Maybe - tell me more when it's scheduled", text_es: 'Quizas - cuentenme mas cuando este programado' },
      { text: 'No thanks', text_es: 'No, gracias' }
    ]
  }
];

// ===== STATE =====
const state = {
  lang: 'en',
  currentQuestion: 0,
  answers: {},
  otherText: {},
  respondent: null,
  sessionId: null,
  seenPlays: {}
};

// ===== DOM REFS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== TRANSLATION HELPERS =====
// Returns the translated property if available, otherwise the English default
function tr(obj, prop) {
  if (state.lang === 'es' && obj[prop + '_es']) return obj[prop + '_es'];
  return obj[prop] || '';
}

// Returns a UI string for the current language
function ui(key) {
  return UI[state.lang][key] || UI.en[key] || '';
}

// ===== LANGUAGE TOGGLE =====
function setLanguage(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;

  // Update toggle buttons
  $$('.lang-toggle__btn').forEach(btn => {
    btn.classList.toggle('lang-toggle__btn--active', btn.dataset.lang === lang);
  });

  // Update all static text
  updateStaticText();

  // If currently on a question, re-render it
  const activeScreen = $('.screen.active');
  if (activeScreen) {
    const screenId = activeScreen.id;
    if (screenId === 'screen-question') {
      renderQuestion(state.currentQuestion);
    }
  }
}

function updateStaticText() {
  // Landing
  const el = (id) => document.getElementById(id);
  if (el('landing-label')) el('landing-label').textContent = ui('landingLabel');
  if (el('landing-headline')) el('landing-headline').textContent = ui('landingHeadline');
  if (el('landing-body-1')) el('landing-body-1').textContent = ui('landingBody1');
  if (el('landing-body-2')) el('landing-body-2').textContent = ui('landingBody2');
  if (el('landing-body-3')) el('landing-body-3').textContent = ui('landingBody3');
  if (el('btn-start')) el('btn-start').textContent = ui('startSurvey');
  if (el('landing-meta')) el('landing-meta').textContent = ui('landingMeta');

  // Question screen static elements
  if (el('btn-back-question')) el('btn-back-question').textContent = ui('back');
  if (el('btn-back-gate')) el('btn-back-gate').textContent = ui('back');
  if (el('btn-next')) el('btn-next').textContent = ui('next');
  if (el('tooltip-label')) el('tooltip-label').textContent = ui('didYouKnow');
  if (el('other-input-label')) el('other-input-label').textContent = ui('pleaseSpecify');
  if (el('other-input')) el('other-input').placeholder = ui('typeYourAnswer');

  // Gate screen
  if (el('gate-headline')) el('gate-headline').textContent = ui('gateHeadline');
  if (el('gate-subhead')) el('gate-subhead').textContent = ui('gateSubhead');
  if (el('label-name')) el('label-name').textContent = ui('labelName');
  if (el('label-email')) el('label-email').textContent = ui('labelEmail');
  if (el('label-company')) el('label-company').textContent = ui('labelCompany');
  if (el('label-optional')) el('label-optional').textContent = ui('labelOptional');
  if (el('btn-submit')) el('btn-submit').textContent = ui('submitBtn');
  if (el('form-privacy')) el('form-privacy').textContent = ui('formPrivacy');

  // Thanks screen
  if (el('thanks-headline')) el('thanks-headline').textContent = ui('thanksHeadline');
  if (el('thanks-body-1')) el('thanks-body-1').textContent = ui('thanksBody1');
  if (el('thanks-body-2')) el('thanks-body-2').textContent = ui('thanksBody2');
  if (el('btn-download')) el('btn-download').textContent = ui('downloadBtn');
  if (el('thanks-contact-label')) el('thanks-contact-label').textContent = ui('thanksContact');
}

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const target = $(`#${screenId}`);
  void target.offsetWidth;
  target.classList.add('active');

  const progressBar = $('#progress-bar');
  if (screenId === 'screen-question') {
    progressBar.classList.add('visible');
  } else {
    progressBar.classList.remove('visible');
  }
}

// ===== PROGRESS BAR =====
function updateProgressBar() {
  const pct = ((state.currentQuestion) / QUESTIONS.length) * 100;
  $('#progress-fill').style.width = pct + '%';
}

// ===== RENDER QUESTION =====
function renderQuestion(index) {
  const q = QUESTIONS[index];
  state.currentQuestion = index;
  updateProgressBar();

  // Back button visibility
  $('#btn-back-question').style.display = index === 0 ? 'none' : '';

  // Check if we need to show a play header
  const playHeader = $('#play-header');
  const sectionLabel = $('#question-section');
  const playMatch = q.section.match(/^Play (\d)/);

  if (playMatch) {
    const playKey = `Play ${playMatch[1]}`;
    if (PLAY_HEADERS[playKey]) {
      const header = PLAY_HEADERS[playKey];
      $('#play-header-label').textContent = state.lang === 'es' ? (header.label_es || playKey) : playKey;
      $('#play-header-title').textContent = tr(header, 'title');
      $('#play-header-summary').textContent = tr(header, 'summary');
      playHeader.hidden = false;
      sectionLabel.hidden = true;

      if (!state.seenPlays[playKey]) {
        playHeader.classList.remove('collapsed');
        state.seenPlays[playKey] = true;
      } else {
        playHeader.classList.add('collapsed');
      }
    } else {
      playHeader.hidden = true;
      sectionLabel.hidden = false;
    }
  } else {
    playHeader.hidden = true;
    sectionLabel.hidden = false;
  }

  // Section and counter
  $('#question-section').textContent = tr(q, 'section');
  const counterTemplate = ui('questionCounter');
  $('#question-counter').textContent = counterTemplate.replace('{n}', index + 1).replace('{total}', QUESTIONS.length);
  $('#question-text').textContent = tr(q, 'text');
  $('#question-subtext').textContent = tr(q, 'subtext');

  const answersContainer = $('#question-answers');
  answersContainer.innerHTML = '';

  // Hide tooltip, next button, and other input
  $('#question-tooltip').hidden = true;
  $('#btn-next').hidden = true;
  $('#other-input-container').hidden = true;
  $('#other-input').value = state.otherText[q.id] || '';

  // Render based on question type
  if (q.type === 'single') {
    renderSingleSelect(q, answersContainer);
  } else if (q.type === 'multi') {
    renderMultiSelect(q, answersContainer);
  } else if (q.type === 'twopart') {
    renderTwoPart(q, answersContainer);
  } else if (q.type === 'open') {
    renderOpenText(q, answersContainer);
  }

  showScreen('screen-question');
}

// ===== SINGLE SELECT =====
function renderSingleSelect(q, container) {
  q.options.forEach((opt, i) => {
    const card = document.createElement('div');
    card.className = 'answer-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    const subtextHtml = tr(opt, 'subtext') ? `<span class="answer-card__subtext">${tr(opt, 'subtext')}</span>` : '';
    card.innerHTML = `
      <div class="answer-card__radio"></div>
      <div class="answer-card__content">
        <span class="answer-card__text">${tr(opt, 'text')}</span>
        ${subtextHtml}
      </div>
    `;
    card.addEventListener('click', () => selectSingleAnswer(q, i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectSingleAnswer(q, i);
      }
    });
    container.appendChild(card);
  });

  // Restore previous selection
  if (state.answers[q.id] !== undefined) {
    const cards = container.querySelectorAll('.answer-card');
    cards[state.answers[q.id]].classList.add('selected');

    if (q.hasOther && q.options[state.answers[q.id]].isOther) {
      $('#other-input-container').hidden = false;
    }

    showTooltipAndNext(q);
  }
}

function selectSingleAnswer(q, index) {
  const cards = $$('.answer-card');
  cards.forEach((card, i) => card.classList.toggle('selected', i === index));

  state.answers[q.id] = index;

  if (q.hasOther && q.options[index].isOther) {
    $('#other-input-container').hidden = false;
    $('#other-input').focus();
  } else {
    $('#other-input-container').hidden = true;
  }

  showTooltipAndNext(q);
}

// ===== MULTI SELECT =====
function renderMultiSelect(q, container) {
  q.options.forEach((opt, i) => {
    const card = document.createElement('div');
    card.className = 'answer-card answer-card--multi';
    card.setAttribute('role', 'checkbox');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-checked', 'false');
    card.innerHTML = `
      <div class="answer-card__radio"></div>
      <div class="answer-card__content">
        <span class="answer-card__text">${tr(opt, 'text')}</span>
      </div>
    `;
    card.addEventListener('click', () => toggleMultiAnswer(q, i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMultiAnswer(q, i);
      }
    });
    container.appendChild(card);
  });

  // Restore previous selections
  if (state.answers[q.id]) {
    const cards = container.querySelectorAll('.answer-card');
    state.answers[q.id].forEach(idx => {
      cards[idx].classList.add('selected');
      cards[idx].setAttribute('aria-checked', 'true');
    });
    showTooltipAndNext(q);
  }
}

function toggleMultiAnswer(q, index) {
  const cards = $$('.answer-card');
  const card = cards[index];

  if (!state.answers[q.id]) state.answers[q.id] = [];

  const selections = state.answers[q.id];
  const alreadySelected = selections.includes(index);

  if (alreadySelected) {
    state.answers[q.id] = selections.filter(i => i !== index);
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
  } else {
    if (selections.length < (q.maxSelections || 99)) {
      selections.push(index);
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
    }
  }

  if (state.answers[q.id].length > 0) {
    showTooltipAndNext(q);
  } else {
    $('#btn-next').hidden = true;
    $('#question-tooltip').hidden = true;
  }
}

// ===== TWO-PART QUESTION =====
function renderTwoPart(q, container) {
  container.innerHTML = `
    <div class="question__two-part">
      ${q.parts.map((part, partIdx) => `
        <div class="question__part">
          <p class="question__part-label">${tr(part, 'label')}</p>
          <div class="question__answers" id="part-${partIdx}">
            ${part.options.map((opt, optIdx) => `
              <div class="answer-card" data-part="${partIdx}" data-option="${optIdx}" role="button" tabindex="0">
                <div class="answer-card__radio"></div>
                <div class="answer-card__content">
                  <span class="answer-card__text">${tr(opt, 'text')}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.answer-card').forEach(card => {
    card.addEventListener('click', () => {
      const partIdx = parseInt(card.dataset.part);
      const optIdx = parseInt(card.dataset.option);
      selectTwoPartAnswer(q, partIdx, optIdx);
    });
  });

  if (state.answers[q.id]) {
    Object.entries(state.answers[q.id]).forEach(([partIdx, optIdx]) => {
      const card = container.querySelector(`[data-part="${partIdx}"][data-option="${optIdx}"]`);
      if (card) card.classList.add('selected');
    });

    if (Object.keys(state.answers[q.id]).length === q.parts.length) {
      showTooltipAndNext(q);
    }
  }
}

function selectTwoPartAnswer(q, partIdx, optIdx) {
  const partContainer = $(`#part-${partIdx}`);
  partContainer.querySelectorAll('.answer-card').forEach(card => {
    card.classList.remove('selected');
  });

  const card = partContainer.querySelector(`[data-option="${optIdx}"]`);
  card.classList.add('selected');

  if (!state.answers[q.id]) state.answers[q.id] = {};
  state.answers[q.id][partIdx] = optIdx;

  if (Object.keys(state.answers[q.id]).length === q.parts.length) {
    showTooltipAndNext(q);
  }
}

// ===== OPEN TEXT =====
function renderOpenText(q, container) {
  const textarea = document.createElement('textarea');
  textarea.className = 'question__textarea';
  textarea.id = 'open-text-input';
  textarea.placeholder = tr(q, 'placeholder') || ui('typeYourAnswer');
  textarea.value = state.answers[q.id] || '';
  container.appendChild(textarea);

  textarea.addEventListener('input', () => {
    state.answers[q.id] = textarea.value;
  });

  if (q.optional) {
    $('#btn-next').hidden = false;
  } else {
    if (state.answers[q.id]) {
      $('#btn-next').hidden = false;
    }
    textarea.addEventListener('input', () => {
      $('#btn-next').hidden = !textarea.value.trim();
    });
  }
}

// ===== SHOW TOOLTIP AND NEXT =====
function showTooltipAndNext(q) {
  const tooltip = $('#question-tooltip');
  const nextBtn = $('#btn-next');

  const tooltipText = tr(q, 'tooltip');
  if (tooltipText) {
    $('#tooltip-body').textContent = tooltipText;
    tooltip.hidden = false;
  }

  nextBtn.hidden = false;
}

// ===== NAVIGATION =====
function advanceQuestion() {
  const q = QUESTIONS[state.currentQuestion];
  if (q.hasOther && state.answers[q.id] !== undefined) {
    const selectedOpt = q.options[state.answers[q.id]];
    if (selectedOpt.isOther) {
      state.otherText[q.id] = $('#other-input').value;
    }
  }

  savePartialToSheets();

  const next = state.currentQuestion + 1;
  if (next < QUESTIONS.length) {
    renderQuestion(next);
  } else {
    $('#progress-fill').style.width = '100%';
    setTimeout(() => showScreen('screen-gate'), 300);
  }
}

function goBack() {
  if (state.currentQuestion > 0) {
    renderQuestion(state.currentQuestion - 1);
  } else {
    showScreen('screen-landing');
  }
}

// ===== FORM SUBMISSION =====
function submitForm(e) {
  e.preventDefault();

  const name = $('#field-name').value.trim();
  const email = $('#field-email').value.trim();
  const company = $('#field-company').value.trim();

  let valid = true;

  if (!name) {
    $('#field-name').classList.add('error');
    valid = false;
  } else {
    $('#field-name').classList.remove('error');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    $('#field-email').classList.add('error');
    valid = false;
  } else {
    $('#field-email').classList.remove('error');
  }

  if (!valid) return;

  const honeypot = $('#field-website');
  if (honeypot && honeypot.value) {
    showScreen('screen-thanks');
    return;
  }

  state.respondent = { name, email, company };

  const submission = {
    timestamp: new Date().toISOString(),
    respondent: state.respondent,
    answers: compileAnswers()
  };

  console.log('Survey Submission:', submission);

  submitToHubSpot();
  submitCompletionToSheets(submission);

  showScreen('screen-thanks');
}

// ===== HUBSPOT SUBMISSION =====
// Always uses English text for data consistency
function getAnswerText(qId) {
  const q = QUESTIONS.find(q => q.id === qId);
  const answer = state.answers[qId];
  if (answer === undefined || answer === null) return '';

  if (q.type === 'single') {
    if (q.hasOther && q.options[answer].isOther && state.otherText[qId]) {
      return 'Other: ' + state.otherText[qId];
    }
    return q.options[answer].text;
  } else if (q.type === 'multi') {
    return answer.map(i => q.options[i].text).join('; ');
  } else if (q.type === 'twopart') {
    const parts = [];
    q.parts.forEach((part, idx) => {
      if (answer[idx] !== undefined) {
        parts.push(part.label + ': ' + part.options[answer[idx]].text);
      }
    });
    return parts.join('; ');
  } else if (q.type === 'open') {
    return (answer || '').trim();
  }
  return '';
}

function submitToHubSpot() {
  const fields = [];

  const nameParts = state.respondent.name.split(' ');
  fields.push({ objectTypeId: '0-1', name: 'firstname', value: nameParts[0] || '' });
  fields.push({ objectTypeId: '0-1', name: 'lastname', value: nameParts.slice(1).join(' ') || '' });
  fields.push({ objectTypeId: '0-1', name: 'email', value: state.respondent.email });
  fields.push({ objectTypeId: '0-1', name: 'company', value: state.respondent.company || '' });

  QUESTIONS.forEach(q => {
    const propName = HUBSPOT_FIELD_MAP[q.id];
    if (!propName) return;
    const value = getAnswerText(q.id);
    if (value) {
      fields.push({ objectTypeId: '0-1', name: propName, value: value });
    }
  });

  const context = {
    pageUri: window.location.href,
    pageName: document.title
  };
  const hutk = document.cookie.split('; ').find(c => c.startsWith('hubspotutk='));
  if (hutk) context.hutk = hutk.split('=')[1];

  const url = 'https://api.hsforms.com/submissions/v3/integration/submit/'
    + HUBSPOT.portalId + '/' + HUBSPOT.formGuid;

  fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ submittedAt: Date.now(), fields: fields, context: context })
  })
    .then(r => r.ok ? console.log('HubSpot: submitted') : r.json().then(d => console.error('HubSpot error:', d)))
    .catch(err => console.error('HubSpot submit failed:', err));
}

// ===== PARTIAL SAVE =====
function savePartialToSheets() {
  if (!SHEETS_WEBHOOK_URL || !state.sessionId) return;

  const payload = {
    token: SHEETS_TOKEN,
    sessionId: state.sessionId,
    timestamp: new Date().toISOString(),
    isPartial: true
  };

  QUESTIONS.forEach(q => {
    payload['q' + q.id] = getAnswerText(q.id);
  });

  fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  }).catch(err => console.error('Partial save failed:', err));
}

// ===== GOOGLE SHEETS COMPLETION =====
// Single-call completion: sessionId + identity + answers in one payload.
// Server upserts the existing partial row keyed by sessionId.
function submitCompletionToSheets(submission) {
  if (!SHEETS_WEBHOOK_URL || !state.sessionId) return;

  const payload = {
    token: SHEETS_TOKEN,
    sessionId: state.sessionId,
    isPartial: false,
    timestamp: submission.timestamp,
    name: state.respondent.name,
    email: state.respondent.email,
    company: state.respondent.company || '',
    lang: state.lang
  };

  QUESTIONS.forEach(q => {
    payload['q' + q.id] = getAnswerText(q.id);
  });

  fetch(SHEETS_WEBHOOK_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(() => console.log('Sheets: completion submitted'))
    .catch(err => console.error('Sheets completion failed:', err));
}

function compileAnswers() {
  const compiled = [];

  QUESTIONS.forEach(q => {
    const answer = state.answers[q.id];
    if (answer === undefined) {
      compiled.push({ questionId: q.id, question: q.text, answer: null });
      return;
    }

    let answerText;
    if (q.type === 'single') {
      answerText = q.options[answer].text;
      if (q.options[answer].isOther && state.otherText[q.id]) {
        answerText = `Other: ${state.otherText[q.id]}`;
      }
    } else if (q.type === 'multi') {
      answerText = answer.map(i => q.options[i].text);
    } else if (q.type === 'twopart') {
      answerText = {};
      q.parts.forEach((part, idx) => {
        if (answer[idx] !== undefined) {
          answerText[part.label] = part.options[answer[idx]].text;
        }
      });
    } else if (q.type === 'open') {
      answerText = answer;
    }

    compiled.push({
      questionId: q.id,
      section: q.section,
      question: q.text,
      answer: answerText
    });
  });

  return compiled;
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
  // Language toggle
  $$('.lang-toggle__btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  // Set initial static text
  updateStaticText();

  // Start button
  $('#btn-start').addEventListener('click', () => {
    state.sessionId = (typeof crypto !== 'undefined' && crypto.randomUUID)
      ? crypto.randomUUID()
      : 'sess-' + Math.random().toString(36).substr(2, 9) + '-' + Date.now();
    renderQuestion(0);
  });

  // Next button
  $('#btn-next').addEventListener('click', advanceQuestion);

  // Back buttons
  $('#btn-back-question').addEventListener('click', goBack);
  $('#btn-back-gate').addEventListener('click', () => renderQuestion(QUESTIONS.length - 1));

  // Play header toggle
  $('#play-header-toggle').addEventListener('click', () => {
    const playHeader = $('#play-header');
    playHeader.classList.toggle('collapsed');
  });

  // Form submit
  $('#gate-form').addEventListener('submit', submitForm);
});
