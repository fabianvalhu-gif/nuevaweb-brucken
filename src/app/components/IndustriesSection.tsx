import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function IndustriesSection() {
  const industries = [
    {
      slug: 'automotriz-aftermarket',
      title: 'Automotriz y Aftermarket',
      description: 'Estrategia comercial, digital y de servicio postventa para OEMs, distribuidores y redes de talleres locales.',
      image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1600&q=80',
      stat: '18%',
      statLabel: 'Mejora de revenue por mes',
    },
    {
      slug: 'mineria-industrial',
      title: 'Minería e Industrial',
      description: 'Optimización de operaciones, procesos, seguridad y supply chain con analítica y tecnología aplicada.',
      image: '/hero/Industries/mineria.jpg',
      stat: '21,7%',
      statLabel: 'Reducción de costos operativos en operaciones claves',
    },
    {
      slug: 'agricultura-construccion',
      title: 'Agricultura y Construcción',
      description: 'Digitalizamos flotas, mantenimiento y logística para agro y construcción; datos para productividad y seguridad. Digitalización de campos y desarrollo de herramientas a medida.',
      image: '/hero/Industries/harvesting-combine-field.jpg',
      stat: '15%',
      statLabel: 'Aumento de digitalización y penetración tecnológica',
    },
    {
      slug: 'pymes',
      title: 'Pequeñas y medianas empresas',
      description: 'Implementamos marketing digital, e-commerce y automatización ligera para acelerar ventas y eficiencia. Desarrollo de agentes personalizados y tecnología a medida para PYMEs.',
      image: '/hero/Industries/coffee-shop-small-business.jpg',
      stat: '28%',
      statLabel: 'Crecimiento en ventas',
    },
  ];

  return (
    <section id="industrias" className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6 max-w-3xl leading-tight">
            Industrias que <span className="font-normal">transformamos</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl font-light">
            Experiencia profunda en sectores clave con metodologías adaptadas y casos de éxito probados.
          </p>
        </motion.div>

        {/* Industries Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white overflow-hidden">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <ImageWithFallback
                    src={industry.image}
                    alt={industry.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-light text-gray-900 mb-3">
                    {industry.title}
                  </h3>
                  <p className="text-gray-600 mb-6 font-light leading-relaxed">
                    {industry.description}
                  </p>

                  <div className="flex items-end justify-between border-t border-gray-200 pt-4">
                    <div>
                      <div className="text-3xl font-light text-gray-900">
                        {industry.stat}
                      </div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider">
                        {industry.statLabel}
                      </div>
                    </div>
                    <a
                      href={`/industrias/${industry.slug}`}
                      aria-label={`Ver industria: ${industry.title}`}
                      className="inline-flex items-center justify-center p-2 -m-2"
                    >
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
