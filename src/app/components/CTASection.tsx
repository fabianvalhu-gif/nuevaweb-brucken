import { motion } from 'motion/react';
import { ArrowRight, Mail } from 'lucide-react';

export function CTASection() {
  return (
    <section id="contacto" className="py-24 lg:py-32 bg-white">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 mb-8 leading-tight">
              ¿Listo para transformar{' '}
              <span className="font-normal">su empresa?</span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-600 mb-12 font-light leading-relaxed">
              Conversemos sobre sus desafíos, puntos de mejora y cómo podemos ayudarle a alcanzar sus objetivos de negocio.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-black text-white px-8 py-4 hover:bg-gray-800 transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center">
                <Mail className="w-5 h-5" />
                <span>Contactar con nosotros</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="tel:+56993176140"
                className="text-gray-900 px-8 py-4 border border-gray-300 hover:border-gray-900 transition-colors w-full sm:w-auto text-center"
              >
                +56 9 9317 6140
              </a>
            </div>

            <div className="mt-12 pt-12 border-t border-gray-200">
              <p className="text-gray-600 font-light">
                O envíenos un correo a{' '}
                <a
                  href="mailto:soporte@bruckenglobal.com"
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  soporte@bruckenglobal.com
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
