import { motion } from 'motion/react';

export function ExpertiseSection() {
  const capabilities = [
    {
      area: 'Estrategia y Crecimiento',
      capabilities: [
        'Modelos de crecimiento y nuevos negocios',
        'Ventas B2B/B2C y go-to-market',
        'Pricing y revenue management',
        'Alianzas estratégicas y M&A',
      ],
    },
    {
      area: 'Producto y Tecnología',
      capabilities: [
        'Producto digital y UX',
        'Aplicaciones a medida y plataformas',
        'Arquitectura cloud y devops',
        'Integraciones y APIs',
      ],
    },
    {
      area: 'Datos y Automatización',
      capabilities: [
        'Analítica avanzada y visualización',
        'Dashboards ejecutivos y BI',
        'Automatización de procesos (RPA/AI)',
        'Data apps y decision intelligence',
      ],
    },
    {
      area: 'Marketing y Revenue Digital',
      capabilities: [
        'Estrategia full-funnel y growth',
        'Paid media y performance',
        'SEO, contenido y CRO',
        'E-commerce y activación digital',
      ],
    },
  ];

  const stats = [
    { value: '3 ', label: 'Aplicaciones en desarrollo ' },
    { value: '12+', label: 'Proyectos entregados' },
    { value: '70%', label: 'Cobertura de Países en LATAM' },
    { value: '22%', label: 'Crecimiento promedio por proyecto' },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-900 via-blue-800 to-fuchsia-900 text-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <h2 className="text-4xl lg:text-5xl font-light mb-6 max-w-3xl leading-tight">
            Nuestra <span className="font-normal">expertise</span>
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl font-light">
            Capacidades integradas que abarcan toda la cadena de valor del negocio
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {capabilities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <h3 className="text-lg font-normal mb-6 pb-3 border-b border-white/20">
                {item.area}
              </h3>
              <ul className="space-y-3">
                {item.capabilities.map((capability, idx) => (
                  <li
                    key={idx}
                    className="text-blue-100 font-light hover:text-white transition-colors cursor-pointer"
                  >
                    {capability}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-16 lg:mt-24 pt-16 border-t border-white/20"
        >
          {stats.map((item, idx) => (
            <div key={idx}>
              <div className="text-4xl lg:text-5xl font-light mb-2">{item.value}</div>
              <div className="text-sm text-blue-200 uppercase tracking-wider">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
