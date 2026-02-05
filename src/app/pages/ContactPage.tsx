import { useMemo, useState } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const isSending = status === 'sending';

  const helper = useMemo(() => {
    if (status === 'sent') return 'Mensaje enviado. Te responderemos pronto.';
    if (status === 'error') return error ?? 'No se pudo enviar. Intenta nuevamente.';
    return 'Respondemos en menos de 24 horas hábiles. Si lo prefieres, escríbenos a soporte@bruckenglobal.com.';
  }, [status, error]);

  return (
    <div className="min-h-screen bg-white">
      <Header logoTone="dark" />

      <main className="pt-24 lg:pt-32 pb-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-14"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Contacto</p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 leading-tight">
              Conversemos sobre tu próximo desafío
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl">
              Diseño de estrategias, tecnología y squads de alto desempeño con la misma esencia de Brücken Global.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2 bg-white border border-gray-100 shadow-lg rounded-2xl p-8 lg:p-10">
              <form
                className="space-y-7"
                onSubmit={async (e) => {
                  e.preventDefault();
                  setStatus('sending');
                  setError(null);

                  const form = e.currentTarget;
                  const data = new FormData(form);
                  const payload = Object.fromEntries(data.entries());

                  try {
                    const res = await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        fullName: payload.fullName,
                        email: payload.email,
                        company: payload.company,
                        country: payload.country,
                        interest: payload.interest,
                        message: payload.message,
                        consent: payload.consent === 'on',
                        website: payload.website, // honeypot
                      }),
                    });

                    const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
                    if (!res.ok || !json.ok) {
                      throw new Error(json.error || `Error ${res.status}`);
                    }

                    setStatus('sent');
                    form.reset();
                  } catch (err: unknown) {
                    setStatus('error');
                    setError(err instanceof Error ? err.message : 'Error enviando formulario');
                  }
                }}
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <label className="flex flex-col gap-2 text-sm text-gray-800">
                    Nombre completo
                    <input
                      required
                      type="text"
                      name="fullName"
                      placeholder="Tu nombre"
                      className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                      autoComplete="name"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-800">
                    Email corporativo
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="nombre@empresa.com"
                      className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                      autoComplete="email"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-800">
                    Empresa
                    <input
                      type="text"
                      name="company"
                      placeholder="Nombre de la empresa"
                      className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                      autoComplete="organization"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-gray-800">
                    País
                    <input
                      type="text"
                      name="country"
                      placeholder="Chile, México, Colombia..."
                      className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                      autoComplete="country-name"
                    />
                  </label>
                </div>

                {/* Honeypot (spam bots) */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <label className="flex flex-col gap-2 text-sm text-gray-800">
                  Interés principal
                  <select
                    name="interest"
                    className="rounded-lg border border-gray-200 bg-white px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                  >
                    <option value="">Selecciona una opción</option>
                    <option>Consultoría estratégica</option>
                    <option>Transformación tecnológica</option>
                    <option>Software factory / Producto digital</option>
                    <option>Expansión internacional</option>
                    <option>Otro</option>
                  </select>
                  <span className="text-xs text-gray-500">Elige el foco principal para que direccionemos al equipo correcto.</span>
                </label>

                <label className="flex flex-col gap-2 text-sm text-gray-800">
                  Detalles de tu proyecto
                  <textarea
                    rows={4}
                    name="message"
                    required
                    placeholder="Cuéntanos el contexto, objetivos y tiempos"
                    className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                  />
                  <span className="text-xs text-gray-500">
                    Incluye metas de negocio, plazos y stakeholders clave si los tienes.
                  </span>
                </label>

                <label className="flex items-start gap-3 text-sm text-gray-700">
                  <input type="checkbox" name="consent" className="mt-1" required />
                  Acepto la política de privacidad y autorizo el tratamiento de mis datos.
                </label>

                <button
                  type="submit"
                  disabled={isSending}
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-gray-800 transition-colors rounded-lg shadow-sm disabled:opacity-60"
                >
                  {isSending ? 'Enviando...' : 'Enviar mensaje'}
                  <Send className="w-4 h-4" />
                </button>

                <p
                  className={`text-xs ${status === 'sent' ? 'text-emerald-700' : status === 'error' ? 'text-rose-700' : 'text-gray-500'}`}
                  role={status === 'error' ? 'alert' : 'status'}
                >
                  {helper}
                </p>
              </form>
            </div>

            <div className="bg-gradient-to-br from-blue-600 via-fuchsia-600 to-rose-500 text-white p-8 lg:p-10 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4">¿Por qué Brücken?</h2>
              <ul className="space-y-3 text-sm text-white/90">
                <li>Squads senior listos en 2 semanas.</li>
                <li>Playbooks probados en LATAM y mercados globales.</li>
                <li>Modelo boutique: atención directa de partners.</li>
                <li>Integración de estrategia, producto y tecnología.</li>
              </ul>

              <div className="mt-8 text-sm text-white/80 space-y-2">
                <p>soporte@bruckenglobal.com</p>
                <p>+56 9 9317 6140</p>
                <p>Santiago · Chile</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
