import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { fetchFeaturedInsight, type Insight } from '@/app/lib/insights';
import { isSupabaseConfigured } from '@/app/lib/supabaseClient';

function formatFeaturedDate(dateIso: string | null) {
  if (!dateIso) return '';
  try {
    return new Date(dateIso).toLocaleDateString('es-CL', { year: 'numeric', month: 'long' });
  } catch {
    return dateIso;
  }
}

export function FeaturedInsight() {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    setLoading(true);
    fetchFeaturedInsight()
      .then((data) => {
        if (cancelled) return;
        setInsight(data);
      })
      .catch(() => {
        if (cancelled) return;
        setInsight(null);
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const featured = useMemo(() => {
    if (!insight) return null;
    const dateLabel = formatFeaturedDate(insight.published_at ?? insight.created_at);
    const category = insight.category ?? 'Insight';
    const readTime = insight.read_time_min ? `${insight.read_time_min} min` : '';
    return {
      href: `/insights/${insight.slug}`,
      title: insight.title,
      excerpt: insight.excerpt ?? '',
      dateLabel,
      category,
      readTime,
      image: insight.cover_image_url ?? '',
    };
  }, [insight]);

  // Fallback to the static block when Supabase is not configured.
  const isStatic = !isSupabaseConfigured;

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
            {loading ? (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
            ) : (
              <ImageWithFallback
                src={
                  isStatic
                    ? '/featured-insight.svg'
                    : featured?.image || '/featured-insight.svg'
                }
                alt={featured?.title ?? 'Featured insight'}
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            )}
            <div className="absolute top-6 left-6">
              <span className="bg-blue-600 text-white text-xs px-4 py-2 uppercase tracking-wider">
                Featured Insight
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 xl:p-16 flex flex-col justify-center">
            <div className="text-xs text-gray-500 uppercase tracking-wider mb-4">
              {loading
                ? '...'
                : `${featured?.category ?? 'Insight'}${featured?.dateLabel ? ` • ${featured.dateLabel}` : ''}${
                    featured?.readTime ? ` • ${featured.readTime}` : ''
                  }`}
            </div>
            
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-light text-gray-900 mb-6 leading-tight">
              {loading ? 'Cargando...' : featured?.title ?? 'El futuro de la expansión comercial en LATAM'}
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed font-light">
              {loading
                ? '...'
                : featured?.excerpt ||
                  'Cómo las organizaciones líderes están redefiniendo sus modelos de go-to-market para capturar oportunidades en mercados emergentes con velocidad y precisión estratégica.'}
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
              href={loading ? undefined : featured?.href ?? '#'}
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
