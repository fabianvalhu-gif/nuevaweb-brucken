import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  // PNG keeps alpha so the back layer remains visible.
  const heroBgFront = '/hero/fondo-1.png';
  const heroBgBack = '/hero/fondo-2.jpg';

  return (
    <section className="relative overflow-hidden pt-24 lg:pt-36 pb-32 lg:pb-40 min-h-screen bg-white isolate">
      {/* Back layer */}
      <div className="absolute inset-0 -z-20">
        <img
          src={heroBgBack}
          alt="Fondo abstracto capa posterior"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      {/* Front layer */}
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBgFront}
          alt="Patrón abstracto Brücken Global"
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/45 via-white/25 to-white/05" />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h1 className="text-3xl lg:text-5xl xl:text-6xl font-semibold text-gray-900 mb-8 leading-tight tracking-tight">
            Consultoría estratégica y software factory para{' '}
            <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-fuchsia-600 to-rose-500">
              Latinoamerica y el mundo.
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-600 mb-10 leading-relaxed font-light">
            Consultoría estratégica y tecnológica para mercados globales. Aceleramos crecimiento con metodologías probadas, marketing direccionado e implementación tecnológica de vanguardia.
          </p>

          <div className="flex flex-wrap gap-4 items-center">
            <a
              href="/contacto"
              className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors flex items-center gap-2 group"
            >
              <span>Conversemos</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#insights"
              className="text-gray-900 px-8 py-4 border border-gray-300 hover:border-gray-900 transition-colors"
            >
              Ver insights
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
