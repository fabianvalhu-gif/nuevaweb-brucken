import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { fetchPublishedInsights, type Insight } from '@/app/lib/insights';
import { isSupabaseConfigured } from '@/app/lib/supabaseClient';

export function InsightsSection() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;
    let cancelled = false;

    setLoading(true);
    fetchPublishedInsights(3)
      .then((data) => {
        if (cancelled) return;
        setInsights(data);
      })
      .catch(() => {
        // Keep the section layout stable; if Supabase fails, just render empty.
        if (cancelled) return;
        setInsights([]);
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
    return insights.map((i) => {
      const date = i.published_at ?? i.created_at;
      const dateLabel = date
        ? new Date(date).toLocaleDateString('es-CL', { year: 'numeric', month: 'short', day: 'numeric' })
        : '';
      const readTime = i.read_time_min ? `${i.read_time_min} min` : '';
      return {
        slug: i.slug,
        category: i.category ?? 'Insight',
        title: i.title,
        author: i.author_name ?? '',
        date: dateLabel,
        readTime,
        image: i.cover_image_url ?? '',
      };
    });
  }, [insights]);

  const displayCards = useMemo(() => {
    if (loading) {
      return Array.from({ length: 3 }).map((_, idx) => ({
        slug: `loading-${idx}`,
        category: '...',
        title: 'Cargando insight...',
        author: '',
        date: '',
        readTime: '',
        image: '',
      }));
    }
    return cards;
  }, [cards, loading]);

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
            href={cards.length ? '/insights' : '#'}
            className="hidden lg:inline-flex items-center gap-2 text-gray-900 hover:gap-4 transition-all"
          >
            <span>Ver todos los artículos</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        {/* Insights Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {displayCards.map((insight, index) => (
            <motion.a
              key={insight.slug}
              href={loading ? undefined : `/insights/${insight.slug}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`group ${loading ? 'pointer-events-none' : 'cursor-pointer'}`}
            >
              {/* Image */}
              <div className="relative h-56 mb-6 overflow-hidden bg-gray-100">
                {loading ? (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse" />
                ) : (
                  <ImageWithFallback
                    src={insight.image}
                    alt={insight.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
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
            </motion.a>
          ))}
        </div>

        {!loading && cards.length === 0 ? (
          <div className="mt-10 text-gray-600 font-light">
            Pronto publicaremos nuevos insights.
          </div>
        ) : null}

        {/* Mobile View All */}
        <div className="lg:hidden mt-12 text-center">
          <a
            href={cards.length ? '/insights' : '#'}
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
