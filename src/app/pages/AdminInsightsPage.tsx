import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { supabase, isSupabaseConfigured } from '@/app/lib/supabaseClient';
import {
  createInsight,
  deleteInsight,
  fetchAllInsightsForAdmin,
  updateInsight,
  type Insight,
  type InsightStatus,
} from '@/app/lib/insights';
import { motion } from 'motion/react';
import { Lock, LogOut, Plus, Save, Trash2 } from 'lucide-react';

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80);
}

function isoNow() {
  return new Date().toISOString();
}

type EditorState = {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  content_md: string;
  cover_image_url: string;
  category: string;
  author_name: string;
  read_time_min: string;
  status: InsightStatus;
  published_at: string;
};

const EMPTY: EditorState = {
  slug: '',
  title: '',
  excerpt: '',
  content_md: '',
  cover_image_url: '',
  category: '',
  author_name: '',
  read_time_min: '',
  status: 'draft',
  published_at: '',
};

function toEditor(insight: Insight): EditorState {
  return {
    id: insight.id,
    slug: insight.slug,
    title: insight.title,
    excerpt: insight.excerpt ?? '',
    content_md: insight.content_md ?? '',
    cover_image_url: insight.cover_image_url ?? '',
    category: insight.category ?? '',
    author_name: insight.author_name ?? '',
    read_time_min: insight.read_time_min ? String(insight.read_time_min) : '',
    status: insight.status,
    published_at: insight.published_at ? insight.published_at.slice(0, 16) : '',
  };
}

function parseReadTime(v: string) {
  const n = Number(v);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

export function AdminInsightsPage() {
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState<EditorState>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = Boolean(sessionEmail);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setAuthLoading(false);
      return;
    }

    let ignore = false;

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (ignore) return;
        setSessionEmail(data.session?.user.email ?? null);
      })
      .finally(() => {
        if (ignore) return;
        setAuthLoading(false);
      });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSessionEmail(session?.user.email ?? null);
    });

    return () => {
      ignore = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsAdmin(null);
      return;
    }

    let cancelled = false;
    setIsAdmin(null);
    setError(null);

    supabase.auth.getSession().then(async ({ data }) => {
      if (cancelled) return;
      const userId = data.session?.user.id;
      if (!userId) {
        setIsAdmin(false);
        return;
      }

      const { data: adminRow, error: adminError } = await supabase
        .from('admins')
        .select('user_id')
        .eq('user_id', userId)
        .maybeSingle();

      if (cancelled) return;
      if (adminError) {
        setIsAdmin(false);
        setError(adminError.message);
        return;
      }

      setIsAdmin(Boolean(adminRow?.user_id));
    });

    return () => {
      cancelled = true;
    };
  }, [isLoggedIn]);

  async function refresh() {
    setLoading(true);
    setError(null);
    try {
      const list = await fetchAllInsightsForAdmin();
      setInsights(list);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error cargando insights');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!isLoggedIn) return;
    if (isAdmin !== true) return;
    refresh();
  }, [isLoggedIn, isAdmin]);

  const titleHint = useMemo(() => {
    if (!editor.title) return '';
    const s = slugify(editor.title);
    if (!s) return '';
    if (!editor.slug) return `Sugerencia de slug: ${s}`;
    return '';
  }, [editor.slug, editor.title]);

  async function signInWithEmailPassword(email: string, password: string) {
    setError(null);
    setNotice(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  }

  async function signOut() {
    setError(null);
    setNotice(null);
    await supabase.auth.signOut();
    setInsights([]);
    setEditor(EMPTY);
    setIsAdmin(null);
  }

  async function onSave() {
    setSaving(true);
    setError(null);
    setNotice(null);

    const slug = editor.slug.trim() || slugify(editor.title);
    if (!editor.title.trim()) {
      setSaving(false);
      setError('El titulo es obligatorio.');
      return;
    }
    if (!slug) {
      setSaving(false);
      setError('El slug es obligatorio.');
      return;
    }
    if (!editor.content_md.trim()) {
      setSaving(false);
      setError('El contenido (Markdown) es obligatorio.');
      return;
    }

    const isPublishing = editor.status === 'published';
    const publishedAtIso = isPublishing
      ? editor.published_at
        ? new Date(editor.published_at).toISOString()
        : isoNow()
      : null;

    const payload = {
      slug,
      title: editor.title.trim(),
      excerpt: editor.excerpt.trim() || null,
      content_md: editor.content_md,
      cover_image_url: editor.cover_image_url.trim() || null,
      category: editor.category.trim() || null,
      author_name: editor.author_name.trim() || null,
      read_time_min: parseReadTime(editor.read_time_min),
      status: editor.status,
      published_at: publishedAtIso,
    };

    try {
      if (editor.id) {
        await updateInsight(editor.id, payload);
        setNotice('Insight actualizado.');
      } else {
        await createInsight(payload);
        setNotice('Insight creado.');
      }
      await refresh();
      setEditor((prev) => ({ ...prev, slug, published_at: publishedAtIso ? publishedAtIso.slice(0, 16) : '' }));
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error guardando insight');
    } finally {
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!editor.id) return;
    // eslint-disable-next-line no-alert
    const ok = window.confirm('Eliminar este insight? Esta accion no se puede deshacer.');
    if (!ok) return;

    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await deleteInsight(editor.id);
      setNotice('Insight eliminado.');
      setEditor(EMPTY);
      await refresh();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Error eliminando insight');
    } finally {
      setSaving(false);
    }
  }

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-28 lg:pt-36 pb-24">
          <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Admin</p>
            <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 leading-tight">
              Falta configurar Supabase
            </h1>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl">
              Agrega <code className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">VITE_SUPABASE_URL</code> y{' '}
              <code className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">VITE_SUPABASE_ANON_KEY</code> en Vercel y/o en tu entorno local.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header logoTone="dark" />

      <main className="pt-24 lg:pt-32 pb-20 bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10"
          >
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-500">Admin</p>
              <h1 className="text-4xl lg:text-5xl font-semibold text-gray-900 mt-4 leading-tight">
                Insights (Blog)
              </h1>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl">
                Crea, edita y publica insights que aparecen automaticamente en la pagina.
              </p>
            </div>

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <div className="text-sm text-gray-600">
                  Sesion: <span className="text-gray-900 font-medium">{sessionEmail}</span>
                </div>
                <button
                  onClick={signOut}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-900 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </button>
              </div>
            ) : null}
          </motion.div>

          {authLoading ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-8">Cargando...</div>
          ) : isLoggedIn && isAdmin === null ? (
            <div className="bg-white border border-gray-100 rounded-2xl p-8">Verificando permisos...</div>
          ) : isLoggedIn && isAdmin === false ? (
            <div className="max-w-[760px] mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl p-8 lg:p-10">
              <div className="text-sm uppercase tracking-[0.2em] text-gray-500">Acceso</div>
              <div className="mt-3 text-2xl font-semibold text-gray-900">No autorizado</div>
              <p className="mt-4 text-gray-600 font-light leading-relaxed">
                Este usuario no esta habilitado como admin en Supabase. Verifica que su <code className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">user_id</code> exista en la tabla <code className="px-2 py-1 bg-gray-50 border border-gray-200 rounded">public.admins</code>.
              </p>
              <button
                onClick={signOut}
                className="mt-8 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-black transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          ) : isLoggedIn ? (
            <div className="grid lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-4 bg-white border border-gray-100 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex items-center justify-between gap-4">
                  <div className="text-sm uppercase tracking-[0.2em] text-gray-500">Posts</div>
                  <button
                    onClick={() => setEditor(EMPTY)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-900 text-white hover:bg-black transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Nuevo
                  </button>
                </div>

                <div className="divide-y divide-gray-100 max-h-[70vh] overflow-auto">
                  {loading ? (
                    <div className="p-6 text-gray-600">Cargando...</div>
                  ) : insights.length === 0 ? (
                    <div className="p-6 text-gray-600">Aun no hay insights.</div>
                  ) : (
                    insights.map((i) => (
                      <button
                        key={i.id}
                        onClick={() => setEditor(toEditor(i))}
                        className={`w-full text-left p-6 hover:bg-slate-50 transition-colors ${
                          editor.id === i.id ? 'bg-slate-50' : 'bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className="text-sm text-gray-900 font-medium">{i.title}</div>
                            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-gray-500">
                              {i.status} {i.category ? `• ${i.category}` : ''}
                            </div>
                          </div>
                          <div
                            className={`text-[11px] px-3 py-1 rounded-full ring-1 ring-inset ${
                              i.status === 'published'
                                ? 'bg-emerald-600/10 text-emerald-700 ring-emerald-600/20'
                                : 'bg-gray-100 text-gray-700 ring-gray-200'
                            }`}
                          >
                            {i.status === 'published' ? 'PUBLICADO' : 'BORRADOR'}
                          </div>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                {(notice || error) && (
                  <div
                    className={`rounded-2xl p-5 border ${
                      error ? 'bg-rose-50 border-rose-100 text-rose-900' : 'bg-emerald-50 border-emerald-100 text-emerald-900'
                    }`}
                  >
                    {error ?? notice}
                  </div>
                )}

                <div className="bg-white border border-gray-100 rounded-2xl p-7 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm uppercase tracking-[0.2em] text-gray-500">
                      {editor.id ? 'Editar insight' : 'Nuevo insight'}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {editor.id ? (
                        <button
                          onClick={onDelete}
                          disabled={saving}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-rose-400 hover:text-rose-700 transition-colors disabled:opacity-50"
                        >
                          <Trash2 className="w-4 h-4" />
                          Eliminar
                        </button>
                      ) : null}
                      <button
                        onClick={onSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gray-900 text-white hover:bg-black transition-colors disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        {saving ? 'Guardando...' : 'Guardar'}
                      </button>
                    </div>
                  </div>

                  {titleHint ? <div className="mt-4 text-sm text-gray-500">{titleHint}</div> : null}

                  <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <label className="flex flex-col gap-2 text-sm text-gray-800">
                      Titulo
                      <input
                        value={editor.title}
                        onChange={(e) => {
                          const v = e.target.value;
                          setEditor((prev) => ({ ...prev, title: v, slug: prev.slug || slugify(v) }));
                        }}
                        className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        placeholder="Ej: El futuro de la expansion comercial en LATAM"
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-gray-800">
                      Slug (URL)
                      <input
                        value={editor.slug}
                        onChange={(e) => setEditor((prev) => ({ ...prev, slug: slugify(e.target.value) }))}
                        className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        placeholder="ej: futuro-expansion-latam"
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-gray-800">
                      Categoria
                      <input
                        value={editor.category}
                        onChange={(e) => setEditor((prev) => ({ ...prev, category: e.target.value }))}
                        className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        placeholder="Strategy / Technology / Operations..."
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-gray-800">
                      Autor
                      <input
                        value={editor.author_name}
                        onChange={(e) => setEditor((prev) => ({ ...prev, author_name: e.target.value }))}
                        className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        placeholder="Tu nombre"
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-gray-800 md:col-span-2">
                      Imagen de portada (URL)
                      <input
                        value={editor.cover_image_url}
                        onChange={(e) => setEditor((prev) => ({ ...prev, cover_image_url: e.target.value }))}
                        className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        placeholder="https://..."
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-gray-800 md:col-span-2">
                      Extracto (card)
                      <textarea
                        rows={3}
                        value={editor.excerpt}
                        onChange={(e) => setEditor((prev) => ({ ...prev, excerpt: e.target.value }))}
                        className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        placeholder="Resumen corto para la card..."
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-gray-800">
                      Lectura (min)
                      <input
                        value={editor.read_time_min}
                        onChange={(e) => setEditor((prev) => ({ ...prev, read_time_min: e.target.value }))}
                        className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                        placeholder="8"
                      />
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-gray-800">
                      Estado
                      <select
                        value={editor.status}
                        onChange={(e) => setEditor((prev) => ({ ...prev, status: e.target.value as InsightStatus }))}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                      >
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                      </select>
                    </label>

                    <label className="flex flex-col gap-2 text-sm text-gray-800 md:col-span-2">
                      Publicado en (opcional)
                      <input
                        type="datetime-local"
                        value={editor.published_at}
                        onChange={(e) => setEditor((prev) => ({ ...prev, published_at: e.target.value }))}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
                      />
                      <span className="text-xs text-gray-500">
                        Si publicas y dejas vacio, se usa la hora actual.
                      </span>
                    </label>
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-2xl p-7 lg:p-8">
                  <div className="text-sm uppercase tracking-[0.2em] text-gray-500">Contenido (Markdown)</div>
                  <textarea
                    rows={18}
                    value={editor.content_md}
                    onChange={(e) => setEditor((prev) => ({ ...prev, content_md: e.target.value }))}
                    className="mt-4 w-full rounded-xl border border-gray-200 bg-slate-50 px-4 py-4 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors font-mono text-[13px] leading-relaxed"
                    placeholder="# Titulo\n\nEscribe tu insight en Markdown..."
                  />

                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="text-sm text-gray-600">
                      Preview publico: <a className="text-blue-700 underline" href={`/insights/${editor.slug || slugify(editor.title)}`} target="_blank" rel="noreferrer">/insights/{editor.slug || slugify(editor.title)}</a>
                    </div>
                    <a
                      href="/#insights"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 hover:border-gray-900 transition-colors"
                    >
                      Ver en home
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <LoginCard onSubmit={signInWithEmailPassword} error={error} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

function LoginCard({
  onSubmit,
  error,
}: {
  onSubmit: (email: string, password: string) => Promise<void>;
  error: string | null;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="max-w-[560px] mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl p-8 lg:p-10">
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 via-fuchsia-600 to-rose-500 flex items-center justify-center">
          <Lock className="w-5 h-5 text-white" />
        </div>
        <div>
          <div className="text-sm uppercase tracking-[0.2em] text-gray-500">Acceso</div>
          <div className="text-xl font-semibold text-gray-900">Login admin</div>
        </div>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setSubmitting(true);
          try {
            await onSubmit(email, password);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {error ? (
          <div className="rounded-2xl p-4 border bg-rose-50 border-rose-100 text-rose-900 text-sm">
            {error}
          </div>
        ) : null}

        <label className="flex flex-col gap-2 text-sm text-gray-800">
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
            placeholder="tu@email.com"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-gray-800">
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            className="rounded-lg border border-gray-200 bg-slate-50 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-colors"
            placeholder="••••••••"
          />
        </label>

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-sm uppercase tracking-[0.08em] hover:bg-gray-800 transition-colors rounded-lg shadow-sm disabled:opacity-50"
        >
          {submitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
