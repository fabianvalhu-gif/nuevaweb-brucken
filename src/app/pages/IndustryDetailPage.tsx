import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { motion } from 'motion/react';
import type { ComponentType } from 'react';
import {
  ArrowRight,
  BarChart3,
  ChevronLeft,
  Cpu,
  Factory,
  Leaf,
  Shield,
  Truck,
  Users,
  Wrench,
} from 'lucide-react';

type IndustrySlug =
  | 'automotriz-aftermarket'
  | 'mineria-industrial'
  | 'agricultura-construccion'
  | 'pymes';

type IndustryCapability = {
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
};

type IndustryData = {
  slug: IndustrySlug;
  eyebrow: string;
  title: string;
  subtitle: string;
  heroImage?: string;
  accent: 'blue' | 'fuchsia' | 'emerald' | 'slate';
  stats: Array<{ value: string; label: string }>;
  signals: Array<{ title: string; description: string }>;
  capabilities: IndustryCapability[];
  playbook: Array<{ title: string; description: string }>;
  outcomes: Array<string>;
};

const ACCENT: Record<IndustryData['accent'], { chip: string; glow: string; gradText: string; gradBg: string }> = {
  blue: {
    chip: 'bg-blue-600/10 text-blue-700 ring-1 ring-inset ring-blue-600/20',
    glow: 'from-blue-600/35 via-blue-600/0 to-transparent',
    gradText: 'from-blue-200 via-sky-200 to-white',
    gradBg: 'from-blue-700 via-blue-800 to-slate-950',
  },
  fuchsia: {
    chip: 'bg-fuchsia-600/10 text-fuchsia-700 ring-1 ring-inset ring-fuchsia-600/20',
    glow: 'from-fuchsia-600/35 via-fuchsia-600/0 to-transparent',
    gradText: 'from-fuchsia-200 via-rose-200 to-white',
    gradBg: 'from-fuchsia-700 via-indigo-900 to-slate-950',
  },
  emerald: {
    chip: 'bg-emerald-600/10 text-emerald-700 ring-1 ring-inset ring-emerald-600/20',
    glow: 'from-emerald-500/35 via-emerald-500/0 to-transparent',
    gradText: 'from-emerald-200 via-lime-200 to-white',
    gradBg: 'from-emerald-700 via-slate-900 to-slate-950',
  },
  slate: {
    chip: 'bg-slate-600/10 text-slate-700 ring-1 ring-inset ring-slate-600/20',
    glow: 'from-slate-500/35 via-slate-500/0 to-transparent',
    gradText: 'from-slate-200 via-zinc-200 to-white',
    gradBg: 'from-slate-800 via-slate-950 to-black',
  },
};

const INDUSTRIES: Record<IndustrySlug, IndustryData> = {
  'automotriz-aftermarket': {
    slug: 'automotriz-aftermarket',
    eyebrow: 'Industria',
    title: 'Automotriz y Aftermarket',
    subtitle:
      'De la experiencia en concesionarios a la monetizacion postventa: estrategia comercial, digital y operaciones conectadas.',
    heroImage:
      'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=2200&q=80',
    accent: 'blue',
    stats: [
      { value: '18%', label: 'mejora de revenue mensual' },
      { value: '12-16', label: 'semanas para un MVP operativo' },
      { value: '360', label: 'vista cliente: ventas + postventa' },
    ],
    signals: [
      {
        title: 'Cliente mas exigente',
        description: 'Transparencia, trazabilidad y experiencias digitales sin friccion.',
      },
      {
        title: 'Presion en margenes',
        description: 'Costos, inventario y captacion: cada punto de eficiencia cuenta.',
      },
      {
        title: 'Ecosistema fragmentado',
        description: 'OEMs, dealers y talleres: alinear datos y procesos para ejecutar.',
      },
    ],
    capabilities: [
      {
        title: 'Revenue playbooks',
        description: 'Pricing, bundles, financiamiento y cross-sell con medicion diaria.',
        icon: BarChart3,
      },
      {
        title: 'Aftermarket conectado',
        description: 'Agenda, repuestos, tiempos de ciclo y NPS con alertas accionables.',
        icon: Wrench,
      },
      {
        title: 'CRM + CDP ligero',
        description: 'Identidad del cliente y journeys: desde lead hasta recompra.',
        icon: Users,
      },
      {
        title: 'Operaciones en tiempo real',
        description: 'Tableros para servicio, inventario y performance por sucursal.',
        icon: Cpu,
      },
      {
        title: 'Calidad y cumplimiento',
        description: 'Controles, auditorias y estandares para redes de talleres.',
        icon: Shield,
      },
      {
        title: 'Supply + ultima milla',
        description: 'Forecast de repuestos y entregas optimizadas para minimizar quiebres.',
        icon: Truck,
      },
    ],
    playbook: [
      {
        title: 'Diagnostico quirurgico',
        description: '2 semanas de datos + campo. Identificamos palancas y quick wins con ROI.',
      },
      {
        title: 'Blueprint operativo',
        description: 'Definimos el modelo objetivo (procesos, KPI, tecnologia) y un plan por oleadas.',
      },
      {
        title: 'Squad en produccion',
        description: 'MVP en 12 semanas: integraciones, tableros y automatizaciones que se usan.',
      },
      {
        title: 'Escala y governance',
        description: 'Estandares, playbooks y entrenamiento para replicar en toda la red.',
      },
    ],
    outcomes: [
      'Aumento de conversion en leads y cotizaciones.',
      'Mejora de productividad en talleres y tiempos de ciclo.',
      'Reduccion de quiebres de stock y sobreinventario.',
      'Mejora sostenida en NPS y recompra.',
    ],
  },
  'mineria-industrial': {
    slug: 'mineria-industrial',
    eyebrow: 'Industria',
    title: 'Mineria e Industrial',
    subtitle:
      'Seguridad, confiabilidad y productividad: operaciones mas visibles, mas predecibles y mejor coordinadas.',
    heroImage: '/hero/Industries/mineria.jpg',
    accent: 'slate',
    stats: [
      { value: '21,7%', label: 'reduccion de costos operativos' },
      { value: '30-45', label: 'dias para tablero de control critico' },
      { value: '0', label: 'tolerancia a incidentes evitables' },
    ],
    signals: [
      {
        title: 'Operaciones distribuidas',
        description: 'Terreno, plantas y centros de control: todo debe conversar en tiempo real.',
      },
      {
        title: 'Riesgo y seguridad',
        description: 'Sistemas que previenen, no solo reportan. Protocolos claros y verificables.',
      },
      {
        title: 'Paradas caras',
        description: 'Confiabilidad, repuestos y mantenimiento: cada hora importa.',
      },
    ],
    capabilities: [
      {
        title: 'Control tower',
        description: 'Visibilidad E2E de produccion, mantenimiento, energia y abastecimiento.',
        icon: Factory,
      },
      {
        title: 'Mantenimiento predictivo',
        description: 'Sensores + analitica para anticipar fallas y reducir paradas.',
        icon: Cpu,
      },
      {
        title: 'Seguridad operacional',
        description: 'Checklists, permisos y alertas para reducir desvio en terreno.',
        icon: Shield,
      },
      {
        title: 'Supply chain robusto',
        description: 'Repuestos criticos, inventario y proveedores con foco en continuidad.',
        icon: Truck,
      },
      {
        title: 'Estandarizacion',
        description: 'KPI consistentes y rituales operativos para alinear equipos.',
        icon: Users,
      },
      {
        title: 'Tableros accionables',
        description: 'No dashboards decorativos: señales, decisiones y responsables.',
        icon: BarChart3,
      },
    ],
    playbook: [
      {
        title: 'Mapa de riesgos + cuellos',
        description: 'Identificamos eventos de alto impacto y puntos ciegos de informacion.',
      },
      {
        title: 'Modelo operativo',
        description: 'Roles, turnos, rutinas y escalamiento: quien decide que y cuando.',
      },
      {
        title: 'Digitalizacion por frentes',
        description: 'Priorizamos frentes de valor: seguridad, mantenimiento, supply, control.',
      },
      {
        title: 'Sostenibilidad del cambio',
        description: 'Entrenamiento, adopcion y mejora continua con indicadores lideres.',
      },
    ],
    outcomes: [
      'Menos paradas no planificadas y mejor cumplimiento.',
      'Mayor adherencia a estandares y protocolos de seguridad.',
      'Mejor coordinacion de repuestos y abastecimiento.',
      'Transparencia operacional para leadership y terreno.',
    ],
  },
  'agricultura-construccion': {
    slug: 'agricultura-construccion',
    eyebrow: 'Industria',
    title: 'Agricultura y Construccion',
    subtitle:
      'Flotas, equipos y operaciones en campo: conectamos datos y decisiones para producir mas con menos.',
    heroImage: '/hero/Industries/harvesting-combine-field.jpg',
    accent: 'emerald',
    stats: [
      { value: '15%', label: 'aumento de adopcion tecnologica' },
      { value: '8-10', label: 'semanas para pilotos en campo' },
      { value: '1', label: 'fuente de verdad para operaciones' },
    ],
    signals: [
      {
        title: 'Variabilidad en terreno',
        description: 'Clima, suelos y contextos: necesitas respuestas rapidas y robustas.',
      },
      {
        title: 'Activos criticos',
        description: 'Maquinaria y equipos: uso, mantencion y disponibilidad como ventaja competitiva.',
      },
      {
        title: 'Ejecucion multi-sitio',
        description: 'Coordinar cuadrillas, rutas y abastecimiento sin perder trazabilidad.',
      },
    ],
    capabilities: [
      {
        title: 'Telemetria + flotas',
        description: 'Uso real, consumo y tiempos muertos con alertas por umbrales.',
        icon: Truck,
      },
      {
        title: 'Planificacion operacional',
        description: 'Asignacion de recursos y secuenciacion con restricciones reales.',
        icon: BarChart3,
      },
      {
        title: 'Mantenimiento en campo',
        description: 'Ordenes, repuestos y SLA para maximizar disponibilidad.',
        icon: Wrench,
      },
      {
        title: 'Calidad y trazabilidad',
        description: 'Registros simples para auditoria y cumplimiento.',
        icon: Shield,
      },
      {
        title: 'Apps a medida',
        description: 'Herramientas ligeras para operarios: offline-first cuando aplica.',
        icon: Cpu,
      },
      {
        title: 'Sostenibilidad',
        description: 'Monitoreo de uso de recursos y oportunidades de eficiencia.',
        icon: Leaf,
      },
    ],
    playbook: [
      {
        title: 'Diseño con usuarios',
        description: 'Co-creacion con operadores y supervisores: menos friccion, mas adopcion.',
      },
      {
        title: 'Piloto instrumental',
        description: 'Implementamos en un frente, medimos, ajustamos y documentamos.',
      },
      {
        title: 'Escala por olas',
        description: 'Despliegue por faenas/campos con estandares y soporte.',
      },
      {
        title: 'Operar con datos',
        description: 'Rutinas de decision con KPI: se mira, se decide y se ejecuta.',
      },
    ],
    outcomes: [
      'Menos tiempos muertos y mejor utilizacion de equipos.',
      'Mejor cumplimiento de mantenimiento y disponibilidad.',
      'Mayor trazabilidad y control de ejecucion.',
      'Reduccion de desperdicio y eficiencia en recursos.',
    ],
  },
  pymes: {
    slug: 'pymes',
    eyebrow: 'Industria',
    title: 'Pequenas y medianas empresas',
    subtitle:
      'Crecimiento sin caos: marketing, ventas y operaciones con automatizacion ligera y tecnologia a medida.',
    heroImage: '/hero/Industries/coffee-shop-small-business.jpg',
    accent: 'fuchsia',
    stats: [
      { value: '28%', label: 'crecimiento en ventas' },
      { value: '2-4', label: 'semanas para poner automatizaciones' },
      { value: '1', label: 'tablero simple para dirigir el negocio' },
    ],
    signals: [
      {
        title: 'Tiempo limitado',
        description: 'Herramientas simples, impacto rapido y foco en caja.',
      },
      {
        title: 'Canales digitales',
        description: 'Performance, e-commerce y CRM: la demanda se gana (o se pierde) online.',
      },
      {
        title: 'Procesos manuales',
        description: 'Automatizacion y orden operativo sin proyectos eternos.',
      },
    ],
    capabilities: [
      {
        title: 'Growth y performance',
        description: 'SEO, paid media, CRO y experimentacion con foco en CAC/LTV.',
        icon: BarChart3,
      },
      {
        title: 'E-commerce y funnels',
        description: 'Checkout, catalogo y postventa para mejorar conversion.',
        icon: Truck,
      },
      {
        title: 'Automatizaciones',
        description: 'CRM, tickets, facturacion y reportes conectados.',
        icon: Cpu,
      },
      {
        title: 'Operaciones ordenadas',
        description: 'SOP, roles y tableros semanales: claridad para escalar.',
        icon: Users,
      },
      {
        title: 'Producto a medida',
        description: 'Cuando el SaaS no alcanza: construimos lo minimo necesario.',
        icon: Wrench,
      },
      {
        title: 'Riesgo y cumplimiento',
        description: 'Controles basicos, seguridad y buenas practicas desde el inicio.',
        icon: Shield,
      },
    ],
    playbook: [
      {
        title: 'Sprint de prioridades',
        description: 'Ordenamos backlog de crecimiento: 3 palancas, 90 dias, metas claras.',
      },
      {
        title: 'Implementacion rapida',
        description: 'Automatizamos y conectamos herramientas existentes sin re-trabajo.',
      },
      {
        title: 'Iteracion con datos',
        description: 'Dashboards simples + experimentos: mejora continua semanal.',
      },
      {
        title: 'Estandares para escalar',
        description: 'Documentamos procesos y dejamos al equipo operando autonomo.',
      },
    ],
    outcomes: [
      'Mas leads calificados y conversion en ventas.',
      'Menos tareas manuales y mas consistencia operativa.',
      'Visibilidad financiera simple (sin Excel infinito).',
      'Mejor experiencia de cliente postventa.',
    ],
  },
};

function getIndustry(slug: string): IndustryData | null {
  return (INDUSTRIES as Record<string, IndustryData | undefined>)[slug] ?? null;
}

export function IndustryDetailPage({ slug }: { slug: string }) {
  const industry = getIndustry(slug);

  if (!industry) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-28 lg:pt-36 pb-24">
          <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Industria</p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 leading-tight">
              Esta pagina no existe
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl">
              La industria que buscas no se encuentra. Vuelve al listado y elige una categoria.
            </p>
            <a
              href="/#industrias"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gray-900 text-white/95 hover:bg-black transition-colors shadow-sm mt-10"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver a industrias
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const accent = ACCENT[industry.accent];
  const heroChipClass = 'bg-white/10 text-white/90 ring-1 ring-inset ring-white/20 backdrop-blur';

  return (
    <div className="min-h-screen bg-white">
      <Header variant="overlay" />

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden pt-24 lg:pt-32 pb-24 lg:pb-28 min-h-[78vh] lg:min-h-[86vh] isolate">
          <div className="absolute inset-0 -z-20">
            {industry.heroImage ? (
              <ImageWithFallback
                src={industry.heroImage}
                alt={industry.title}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${accent.gradBg}`} />
            )}
            {/* Contrast scrims: left-to-right for copy, and top-to-bottom to blend into white sections */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/5" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-black/0" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-white" />
            <div className={`absolute -top-40 left-1/2 -translate-x-1/2 h-[520px] w-[520px] rounded-full blur-3xl bg-gradient-to-b ${accent.glow}`} />
          </div>

          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
            <motion.a
              href="/#industrias"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-sm text-white/90 hover:text-white transition-colors rounded-full px-4 py-2 bg-white/10 hover:bg-white/15 ring-1 ring-inset ring-white/20 backdrop-blur shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver a industrias
            </motion.a>

            <div className="mt-10 lg:mt-14 grid lg:grid-cols-12 gap-10 items-end">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="lg:col-span-8"
              >
                <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] ${heroChipClass}`}>
                  {industry.eyebrow}
                </span>

                <h1 className="mt-6 text-4xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-[1.05]">
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${accent.gradText}`}>
                    {industry.title}
                  </span>
                </h1>

                <p className="mt-6 text-lg lg:text-xl text-white/85 max-w-3xl font-light leading-relaxed">
                  {industry.subtitle}
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <a
                    href="/contacto"
                    className="bg-white text-gray-900 px-7 py-4 hover:bg-gray-100 transition-colors inline-flex items-center gap-2 group rounded-xl"
                  >
                    <span className="font-medium">Hablar con un partner</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="#capabilities"
                    className="text-white px-7 py-4 border border-white/30 hover:border-white/70 bg-white/5 hover:bg-white/10 transition-colors rounded-xl backdrop-blur"
                  >
                    Ver capacidades
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="lg:col-span-4"
              >
                <div className="bg-black/25 backdrop-blur border border-white/15 rounded-2xl p-6 lg:p-8 shadow-sm">
                  <p className="text-xs uppercase tracking-[0.24em] text-white/70">Indicadores tipicos</p>
                  <div className="mt-6 grid gap-5">
                    {industry.stats.map((stat) => (
                      <div key={stat.label} className="flex items-baseline justify-between gap-6">
                        <div className="text-3xl lg:text-4xl font-light text-white">{stat.value}</div>
                        <div className="text-xs text-white/70 uppercase tracking-wider text-right">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Outlined backdrop word */}
            <div className="pointer-events-none select-none absolute -bottom-16 lg:-bottom-24 left-0 right-0">
              <div
                className="mx-auto max-w-[1600px] px-6 lg:px-12"
                aria-hidden="true"
              >
                <div className="text-[54px] sm:text-[76px] lg:text-[120px] xl:text-[150px] font-semibold tracking-tight text-transparent opacity-40"
                  style={{
                    WebkitTextStroke: '1px rgba(255,255,255,0.25)',
                  }}
                >
                  BRUCKEN GLOBAL
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signals */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-12 gap-10 items-end"
            >
              <div className="lg:col-span-5">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Panorama</p>
                <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mt-4 leading-tight">
                  Senales que importan <span className="font-normal">ahora</span>
                </h2>
              </div>
              <div className="lg:col-span-7">
                <p className="text-lg text-gray-600 font-light leading-relaxed max-w-3xl">
                  No hacemos slides para decorar. Traducimos contexto en decisiones, ritmos de ejecucion y tecnologia usable.
                </p>
              </div>
            </motion.div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {industry.signals.map((signal, idx) => (
                <motion.div
                  key={signal.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="border border-gray-100 bg-gradient-to-b from-white to-slate-50 rounded-2xl p-7"
                >
                  <div className="text-xs uppercase tracking-[0.24em] text-gray-500">{String(idx + 1).padStart(2, '0')}</div>
                  <h3 className="mt-4 text-xl font-normal text-gray-900">{signal.title}</h3>
                  <p className="mt-3 text-gray-600 font-light leading-relaxed">{signal.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Lo que hacemos</p>
                <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mt-4 leading-tight">
                  Capacidades <span className="font-normal">listas para ejecutar</span>
                </h2>
              </div>
              <a
                href="/contacto"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-gray-800 transition-colors rounded-xl"
              >
                Agenda una conversacion
                <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {industry.capabilities.map((capability, idx) => {
                const Icon = capability.icon;
                return (
                  <motion.div
                    key={capability.title}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.06 }}
                    className="bg-white border border-gray-100 rounded-2xl p-7 group"
                  >
                    <div className="flex items-start justify-between gap-6">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-fuchsia-600 flex items-center justify-center shrink-0">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-xs uppercase tracking-[0.22em] text-gray-500">
                        {String(idx + 1).padStart(2, '0')}
                      </div>
                    </div>
                    <h3 className="mt-6 text-xl font-normal text-gray-900">{capability.title}</h3>
                    <p className="mt-3 text-gray-600 font-light leading-relaxed">{capability.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Playbook */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-12 gap-10 items-start"
            >
              <div className="lg:col-span-4">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Metodo</p>
                <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mt-4 leading-tight">
                  Playbook en <span className="font-normal">4 movimientos</span>
                </h2>
                <p className="mt-6 text-lg text-gray-600 font-light leading-relaxed">
                  Un ritmo claro: diagnostico, blueprint, construccion y escala. Sin humo. Con entregables que se usan.
                </p>
              </div>
              <div className="lg:col-span-8">
                <div className="space-y-6">
                  {industry.playbook.map((step, idx) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.06 }}
                      className="border border-gray-100 rounded-2xl p-7 bg-gradient-to-b from-white to-slate-50"
                    >
                      <div className="flex items-center justify-between gap-6">
                        <h3 className="text-xl font-normal text-gray-900">{step.title}</h3>
                        <span className={`text-xs uppercase tracking-[0.24em] px-3 py-2 rounded-full ${accent.chip}`}>
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <p className="mt-3 text-gray-600 font-light leading-relaxed">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Outcomes */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid lg:grid-cols-12 gap-10 items-start"
            >
              <div className="lg:col-span-5">
                <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Resultados</p>
                <h2 className="text-4xl lg:text-5xl font-light text-gray-900 mt-4 leading-tight">
                  Impacto <span className="font-normal">medible</span>
                </h2>
                <p className="mt-6 text-lg text-gray-600 font-light leading-relaxed">
                  Los numeros cambian por contexto, pero el patron se repite: mas visibilidad, mejor ejecucion y menos friccion.
                </p>
              </div>
              <div className="lg:col-span-7">
                <div className="bg-white border border-gray-100 rounded-2xl p-7 lg:p-8">
                  <ul className="space-y-4">
                    {industry.outcomes.map((outcome) => (
                      <li key={outcome} className="flex items-start gap-3">
                        <span className="mt-1 w-2 h-2 rounded-full bg-gradient-to-br from-blue-600 to-fuchsia-600" />
                        <span className="text-gray-700 font-light leading-relaxed">{outcome}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                    <div>
                      <div className="text-sm uppercase tracking-[0.2em] text-gray-500">Siguiente paso</div>
                      <div className="mt-2 text-gray-900 font-medium">
                        Te proponemos un sprint de diagnostico de 2 semanas.
                      </div>
                      <div className="mt-1 text-sm text-gray-600 font-light">
                        Resultado: mapa de palancas, quick wins y roadmap por oleadas.
                      </div>
                    </div>
                    <a
                      href="/contacto"
                      className="inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-xl"
                    >
                      Agendar
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
