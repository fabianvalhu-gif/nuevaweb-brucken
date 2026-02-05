import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      number: '01',
      title: 'Productos y aplicaciones a medida',
      description:
        'Diseño y desarrollo de aplicaciones personalizadas end-to-end. UX, arquitectura y delivery ágil con foco en time-to-value y adopción.',
      metrics: ['Descubrimiento de producto', 'Apps a medida', 'Entrega full-stack'],
      colorClass: 'text-blue-600',
    },
    {
      number: '02',
      title: 'El gran poder de los datos',
      description:
        'Mejoramos procesos críticos con analítica, dashboards y automatización. Métricas accionables para operar con visibilidad y precisión.',
      metrics: ['Tableros de datos', 'Automatización de procesos', 'Analítica para decisiones','Dashboards interactivos'],
      colorClass: 'text-fuchsia-600',
    },
    {
      number: '03',
      title: 'Marketing digital y performance',
      description:
        'Campañas full-funnel, growth y desarrollo web para aumentar leads y ventas. Performance, contenido y experimentación continua.',
      metrics: ['Administración de Ads', 'SEO y contenido', 'Web y optimización de conversión'],
      colorClass: 'text-blue-600',
    },
    {
      number: '04',
      title: 'Representación y expansión internacional',
      description:
        'Go-to-market en LATAM y EE.UU. con set up legal/comercial, estrategia de precios y representación ejecutiva local para acelerar la penetración.',
      metrics: ['Research de mercado', 'Estrategia de canales', 'Alianzas locales'],
      colorClass: 'text-fuchsia-600',
    },
  ];

  return (
    <section id="consultoria" className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-24"
        >
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 mb-6 max-w-4xl leading-tight">
            Nuestros servicios de{' '}
            <span className="font-normal">consultoría</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl font-light">
            Soluciones integradas que combinan estrategia, tecnología y ejecución para generar transformación sostenible.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="border-l-2 border-gray-200 group-hover:border-gray-900 transition-colors pl-8 py-4">
                <div className={`text-sm ${service.colorClass} mb-4 uppercase tracking-wider font-medium`}>
                  {service.number}
                </div>

                <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 mb-6 leading-relaxed font-light">
                  {service.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {service.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="text-xs bg-gray-100 text-gray-700 px-3 py-1"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-gray-900 hover:gap-4 transition-all group"
                >
                  <span className="text-sm">Explorar</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
