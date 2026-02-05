import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { fetchInsightBySlug, type Insight } from '@/app/lib/insights';
import { ChevronLeft, Clock, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

function formatDate(dateIso: string | null) {
  if (!dateIso) return '';
  try {
    return new Date(dateIso).toLocaleDateString('es-CL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateIso;
  }
}

export function InsightDetailPage({ slug }: { slug: string }) {
  const [insight, setInsight] = useState<Insight | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchInsightBySlug(slug)
      .then((data) => {
        if (cancelled) return;
        setInsight(data);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Error cargando insight');
      })
      .finally(() => {
        if (cancelled) return;
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const meta = useMemo(() => {
    if (!insight) return null;
    const dateLabel = formatDate(insight.published_at ?? insight.created_at);
    const readTime = insight.read_time_min ? `${insight.read_time_min} min` : null;
    return { dateLabel, readTime };
  }, [insight]);

  const shareUrl = useMemo(() => {
    if (typeof window === 'undefined') return `/insights/${slug}`;
    try {
      return new URL(`/insights/${slug}`, window.location.origin).toString();
    } catch {
      return window.location.href;
    }
  }, [slug]);

  const shareLinks = useMemo(() => {
    const title = insight?.title ?? 'Brücken Global';
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    return {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${shareUrl}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    };
  }, [insight?.title, shareUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-28 lg:pt-36 pb-24">
          <div className="max-w-[960px] mx-auto px-6 lg:px-12">
            <div className="h-6 w-40 bg-gray-100 rounded mb-6" />
            <div className="h-12 w-full bg-gray-100 rounded mb-3" />
            <div className="h-12 w-2/3 bg-gray-100 rounded mb-10" />
            <div className="h-64 w-full bg-gray-100 rounded-2xl" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !insight || insight.status !== 'published') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-28 lg:pt-36 pb-24">
          <div className="max-w-[960px] mx-auto px-6 lg:px-12">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Insight</p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 leading-tight">
              No disponible
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl">
              {error ?? 'Este insight no existe o aun no esta publicado.'}
            </p>
            <a
              href="/#insights"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-gray-900 text-white/95 hover:bg-black transition-colors shadow-sm mt-10"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver a insights
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-24 lg:pt-28">
        <section className="bg-white">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <motion.a
              href="/#insights"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors rounded-full px-4 py-2 bg-gray-50 hover:bg-gray-100 ring-1 ring-inset ring-gray-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20"
            >
              <ChevronLeft className="w-4 h-4" />
              Volver a insights
            </motion.a>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="mt-10"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.22em] text-gray-500">
                {insight.category ? (
                  <span className="bg-blue-600/10 text-blue-700 ring-1 ring-inset ring-blue-600/20 px-4 py-2 rounded-full">
                    {insight.category}
                  </span>
                ) : null}
                <span>{meta?.dateLabel}</span>
                {meta?.readTime ? (
                  <span className="inline-flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" />
                    {meta.readTime}
                  </span>
                ) : null}

                <DropdownMenu.Root>
                  <DropdownMenu.Trigger asChild>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white ring-1 ring-inset ring-gray-200 hover:ring-gray-300 text-gray-700 hover:text-gray-900 transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900/20"
                      aria-label="Compartir insight"
                      title="Compartir"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      Compartir
                    </button>
                  </DropdownMenu.Trigger>

                  <DropdownMenu.Portal>
                    <DropdownMenu.Content
                      align="start"
                      sideOffset={10}
                      className="z-50 min-w-[220px] rounded-2xl bg-white border border-gray-100 shadow-xl p-2"
                    >
                      <DropdownMenu.Item asChild>
                        <a
                          href={shareLinks.whatsapp}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm text-gray-900 hover:bg-slate-50 focus:bg-slate-50 outline-none"
                        >
                          WhatsApp
                          <span className="text-xs text-gray-500">+ link</span>
                        </a>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <a
                          href={shareLinks.linkedin}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm text-gray-900 hover:bg-slate-50 focus:bg-slate-50 outline-none"
                        >
                          LinkedIn
                          <span className="text-xs text-gray-500">share</span>
                        </a>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item asChild>
                        <a
                          href={shareLinks.x}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm text-gray-900 hover:bg-slate-50 focus:bg-slate-50 outline-none"
                        >
                          X
                          <span className="text-xs text-gray-500">tweet</span>
                        </a>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Portal>
                </DropdownMenu.Root>
              </div>

              <h1 className="mt-6 text-4xl lg:text-6xl font-semibold tracking-tight text-gray-900 leading-[1.05]">
                {insight.title}
              </h1>

              {insight.excerpt ? (
                <p className="mt-6 text-lg lg:text-xl text-gray-600 font-light leading-relaxed max-w-3xl">
                  {insight.excerpt}
                </p>
              ) : null}

              {insight.author_name ? (
                <div className="mt-8 text-sm text-gray-500">
                  Por <span className="text-gray-900 font-medium">{insight.author_name}</span>
                </div>
              ) : null}
            </motion.div>

            {insight.cover_image_url ? (
              <div className="mt-12 rounded-3xl overflow-hidden border border-gray-100 bg-gray-50">
                <ImageWithFallback
                  src={insight.cover_image_url}
                  alt={insight.title}
                  className="w-full h-[320px] lg:h-[420px] object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            ) : null}

            <div className="mt-12 pb-20">
              <article className="max-w-none">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight text-gray-900 mt-10 mb-4">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900 mt-10 mb-4">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl lg:text-2xl font-semibold tracking-tight text-gray-900 mt-8 mb-3">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-gray-700 font-light leading-relaxed text-[16px] lg:text-[17px] mb-5">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 mb-6 text-gray-700 font-light leading-relaxed">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 mb-6 text-gray-700 font-light leading-relaxed">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => <li className="mb-2">{children}</li>,
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-blue-700 underline decoration-blue-700/30 underline-offset-4 hover:text-blue-800"
                        target={href?.startsWith('http') ? '_blank' : undefined}
                        rel={href?.startsWith('http') ? 'noreferrer' : undefined}
                      >
                        {children}
                      </a>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-2 border-gray-200 pl-5 py-1 my-6 text-gray-700">
                        {children}
                      </blockquote>
                    ),
                    code: ({ children }) => (
                      <code className="px-2 py-1 bg-gray-50 border border-gray-200 rounded text-[13px]">
                        {children}
                      </code>
                    ),
                    pre: ({ children }) => (
                      <pre className="p-5 bg-gray-900 text-gray-50 rounded-2xl overflow-auto text-[13px] leading-relaxed my-6">
                        {children}
                      </pre>
                    ),
                    hr: () => <hr className="my-10 border-gray-200" />,
                  }}
                >
                  {insight.content_md}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
