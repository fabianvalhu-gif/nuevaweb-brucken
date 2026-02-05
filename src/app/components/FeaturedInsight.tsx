import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function FeaturedInsight() {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-0 bg-white overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-96 lg:h-auto">
            <img
              src="/featured-insight.svg"
              alt="Paisaje de montaña"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-6 left-6">
              <span className="bg-blue-600 text-white text-xs px-4 py-2 uppercase tracking-wider">
                Featured Insight
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
              Estrategia • Enero 2026
            </div>
            
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 mb-6 leading-tight">
              El futuro de la expansión comercial en LATAM
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
              Cómo las organizaciones líderes están redefiniendo sus modelos de go-to-market para capturar oportunidades en mercados emergentes con velocidad y precisión estratégica.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-1 h-6 bg-fuchsia-600 flex-shrink-0 mt-1"></div>
                <div>
                  <div className="font-medium text-gray-900">Nuevos modelos comerciales</div>
                  <div className="text-sm text-gray-600">Playbooks de revenue para B2B y B2C</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1 h-6 bg-blue-600 flex-shrink-0 mt-1"></div>
                <div>
                  <div className="font-medium text-gray-900">Tecnología aplicada</div>
                  <div className="text-sm text-gray-600">IA y automation en procesos críticos</div>
                </div>
              </div>
            </div>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-gray-900 hover:gap-4 transition-all group"
            >
              <span className="font-medium">Leer el artículo completo</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
