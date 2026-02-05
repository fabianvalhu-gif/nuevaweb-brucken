import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { fetchPublishedInsights, type Insight } from '@/app/lib/insights';
import { isSupabaseConfigured } from '@/app/lib/supabaseClient';
import { ArrowRight, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';

function formatDate(dateIso: string | null) {
  if (!dateIso) return '';
  try {
    return new Date(dateIso).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return dateIso;
  }
}

export function InsightsIndexPage() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    setLoading(true);
    setError(null);
    fetchPublishedInsights(50)
      .then((data) => {
        if (cancelled) return;
        setInsights(data);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Error cargando insights');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const cards = useMemo(() => {
    return insights.map((i) => ({
      slug: i.slug,
      title: i.title,
      excerpt: i.excerpt ?? '',
      image: i.cover_image_url ?? '',
      category: i.category ?? 'Insight',
      author: i.author_name ?? '',
      date: formatDate(i.published_at ?? i.created_at),
      readTime: i.read_time_min ? `${i.read_time_min} min` : '',
    }));
  }, [insights]);

  return (
    <div className="min-h-screen bg-white">
      <Header logoTone="dark" />

      <main className="pt-24 lg:pt-32 pb-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14"
          >
            <div>
              <a
                href="/#insights"
                className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors rounded-full px-4 py-2 bg-white border border-gray-100 hover:border-gray-200 shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
                Volver
              </a>

              <p className="text-sm uppercase tracking-[0.2em] text-gray-500 mt-8">Insights</p>
              <h1 className="text-4xl lg:text-6xl font-semibold text-gray-900 mt-4 leading-tight">
                Pensamiento accionable, sin relleno.
              </h1>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl font-light leading-relaxed">
                Estrategia, tecnologia y operaciones para lideres que necesitan claridad y ejecucion.
              </p>
            </div>

            <a
              href="/contacto"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-gray-800 transition-colors rounded-xl"
            >
              Conversemos
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          {!isSupabaseConfigured ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-8 text-gray-700">
              Aun no esta configurado el blog (Supabase). Cuando lo conectes, aqui se listaran los insights publicados.
            </div>
          ) : error ? (
            <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8 text-rose-900">
              {error}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(loading ? Array.from({ length: 6 }) : cards).map((c: any, idx: number) => (
                <motion.a
                  key={loading ? idx : c.slug}
                  href={loading ? undefined : `/insights/${c.slug}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.04 }}
                  className={`group bg-white border border-gray-100 overflow-hidden rounded-2xl hover:shadow-lg transition-shadow ${
                    loading ? 'pointer-events-none' : ''
                  }`}
                >
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    {loading ? (
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                    ) : (
                      <ImageWithFallback
                        src={c.image}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                    {!loading ? (
                      <div className="absolute top-5 left-5">
                        <span className="bg-white/90 text-gray-900 text-[11px] px-4 py-2 uppercase tracking-[0.2em] ring-1 ring-inset ring-black/5">
                          {c.category}
                        </span>
                      </div>
                    ) : null}
                  </div>

                  <div className="p-7">
                    <h2 className="text-xl lg:text-2xl font-light text-gray-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {loading ? 'Cargando...' : c.title}
                    </h2>
                    {c.excerpt ? (
                      <p className="mt-4 text-gray-600 font-light leading-relaxed line-clamp-3">
                        {c.excerpt}
                      </p>
                    ) : null}

                    <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between gap-4 text-sm text-gray-500">
                      <span className="truncate">{c.author}</span>
                      <span className="shrink-0">
                        {c.date} {c.readTime ? `• ${c.readTime}` : ''}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

