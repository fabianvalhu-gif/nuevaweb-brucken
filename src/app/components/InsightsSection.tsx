import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function InsightsSection() {
  const insights = [
    {
      category: 'Strategy',
      title: 'Cinco palancas para acelerar crecimiento en mercados maduros',
      author: 'María González, Partner',
      date: 'Enero 20, 2026',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1758518729593-275baa967f78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbHMlMjBtZWV0aW5nfGVufDF8fHx8MTc2OTQwNTA2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      category: 'Technology',
      title: 'IA generativa: De la experimentación al impacto operacional',
      author: 'Carlos Mendoza, Senior Partner',
      date: 'Enero 18, 2026',
      readTime: '12 min',
      image: 'https://images.unsplash.com/photo-1758873268745-dd2cf0d677b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBzdHJhdGVneSUyMHRlYW13b3JrfGVufDF8fHx8MTc2OTQ0OTc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      category: 'Operations',
      title: 'El camino hacia la excelencia operacional en la era digital',
      author: 'Ana Rodríguez, Partner',
      date: 'Enero 15, 2026',
      readTime: '10 min',
      image: 'https://images.unsplash.com/photo-1759850426415-8888ea55b07b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBidXNpbmVzcyUyMGNpdHklMjBza3lsaW5lfGVufDF8fHx8MTc2OTQ0OTc3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  return (
    <section id="insights" className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-end mb-12 lg:mb-16"
        >
          <div>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-4">
              Nuestros <span className="font-normal">insights</span>
            </h2>
            <p className="text-lg text-gray-600 font-light">
              Pensamiento de liderazgo y análisis profundo sobre tendencias que transforman industrias
            </p>
          </div>
          <a
            href="#"
            className="hidden lg:inline-flex items-center gap-2 text-gray-900 hover:gap-4 transition-all"
          >
            <span>Ver todos los artículos</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 mb-6 overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={insight.image}
                  alt={insight.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="space-y-3">
                <div className="text-xs text-blue-600 uppercase tracking-wider font-medium">
                  {insight.category}
                </div>

                <h3 className="text-xl lg:text-2xl font-light text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                  {insight.title}
                </h3>

                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>{insight.author}</span>
                  <span>•</span>
                  <span>{insight.date}</span>
                  <span>•</span>
                  <span>{insight.readTime}</span>
                </div>

                <div className="pt-2">
                  <div className="inline-flex items-center gap-2 text-gray-900 group-hover:gap-4 transition-all">
                    <span className="text-sm">Leer más</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="lg:hidden mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-gray-900 hover:gap-4 transition-all"
          >
            <span>Ver todos los artículos</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
