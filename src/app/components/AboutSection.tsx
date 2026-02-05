import { motion } from 'motion/react';
import { Users, Globe, Target, Award, ArrowRight } from 'lucide-react';

export function AboutSection() {
  const values = [
    {
      icon: Target,
      title: 'Orientación a resultados',
      description:
        'Medimos nuestro éxito por el impacto tangible que generamos en los resultados de nuestros clientes.',
    },
    {
      icon: Users,
      title: 'Colaboración profunda',
      description:
        'Trabajamos codo a codo con los equipos de nuestros clientes, transfiriendo conocimiento en cada proyecto.',
    },
    {
      icon: Globe,
      title: 'Perspectiva global',
      description:
        'Combinamos expertise internacional con conocimiento profundo de mercados locales en LATAM.',
    },
    {
      icon: Award,
      title: 'Excelencia técnica',
      description:
        'Nuestros consultores son expertos reconocidos en sus campos con experiencia comprobada.',
    },
  ];

  const milestones = [
    { year: '2013', event: 'Inicio de experiencia multinacional' },
    {
      year: '2018',
      event: 'Desarrollo de red internacional ligada al automotive aftermarket',
    },
    { year: '2024', event: 'Preparación de idea' },
    { year: '2025', event: 'Apertura de oficina en Viña del Mar' },
  ];

  return (
    <section id="nosotros" className="bg-white">
      {/* Hero */}
      <div className="py-24 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl lg:max-w-6xl"
          >
            <div className="text-sm text-blue-600 uppercase tracking-wider mb-6 font-medium">
              Nosotros
            </div>
            <h1 className="text-5xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight">
              Construimos el{' '}
              <span className="font-normal">puente hacia el futuro</span> de su
              organización
            </h1>
            <p className="text-2xl text-gray-600 font-light leading-relaxed lg:pr-10 xl:pr-24">
              Brücken Global es una consultora estratégica y tecnológica que nace
              de la convicción de que las empresas latinoamericanas merecen acceso
              a consultoría de clase mundial con enfoque regional. Acompañamos a
              líderes y empresas en cada etapa de crecimiento, combinando visión de negocio,
              rigor analítico y ejecución ágil para materializar resultados.
              Somos la herramienta que conecta el presente con el futuro deseado.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 lg:py-24">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6">
                Nuestra <span className="font-normal">misión</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light mb-6">
                Acelerar el crecimiento y la transformación de organizaciones en
                Latinonamerica mediante consultoría estratégica de alto impacto,
                tecnología de vanguardia y metodologías probadas globalmente.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Trabajamos con CEO's, directorios, equipos ejecutivos, lideres de area, dueños de empresas y equipos multidisciplinarios para
                enfrentar sus desafíos más críticos y capturar oportunidades de
                crecimiento con velocidad y precisión.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-6">
                Nuestra <span className="font-normal">visión</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed font-light mb-6">
                Ser la firma de consultoría líder en la región, reconocida por
                generar transformación medible y sostenible en las
                organizaciones más ambiciosas de la región.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed font-light">
                Aspiramos a construir un ecosistema donde talento excepcional,
                metodologías innovadoras y profundo conocimiento sectorial se
                combinen para crear valor exponencial.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Nuestros <span className="font-normal">valores</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl font-light">
              Principios que guían nuestra forma de trabajar y relacionarnos con
              clientes, partners y colaboradores.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-fuchsia-600 rounded-full flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-normal text-gray-900 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mb-6">
              Nuestra <span className="font-normal">trayectoria</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl font-light">
              Una década de crecimiento continuo y expansión estratégica en LATAM.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border-l-2 border-blue-600 pl-6 py-2"
              >
                <div className="text-3xl font-light text-gray-900 mb-2">
                  {milestone.year}
                </div>
                <div className="text-gray-600 font-light">{milestone.event}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 lg:py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-fuchsia-900 text-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-5xl font-light mb-8 leading-tight">
              ¿Quiere trabajar con nosotros?
            </h2>
            <p className="text-xl text-blue-100 mb-12 font-light max-w-2xl mx-auto">
              Estamos buscando talento excepcional para unirse a nuestro equipo
              en múltiples ubicaciones de LATAM.
            </p>
            <a
              href="https://www.linkedin.com/company/br%C3%BCckenglobal/"
              target="_blank"
              rel="noreferrer"
              className="bg-white text-gray-900 px-8 py-4 hover:bg-gray-100 transition-colors inline-flex items-center gap-2 group"
            >
              <span>Ver oportunidades</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
