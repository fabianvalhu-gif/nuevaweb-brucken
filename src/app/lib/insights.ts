import { supabase, isSupabaseConfigured } from '@/app/lib/supabaseClient';

export type InsightStatus = 'draft' | 'published';

export type Insight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content_md: string;
  cover_image_url: string | null;
  category: string | null;
  author_name: string | null;
  read_time_min: number | null;
  status: InsightStatus;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type InsightCard = Omit<Insight, 'content_md'>;

function orderByPublishedDesc(a: Insight, b: Insight) {
  const ap = a.published_at ? new Date(a.published_at).getTime() : 0;
  const bp = b.published_at ? new Date(b.published_at).getTime() : 0;
  return bp - ap;
}

function orderByPublishedDescCards(a: InsightCard, b: InsightCard) {
  const ap = a.published_at ? new Date(a.published_at).getTime() : 0;
  const bp = b.published_at ? new Date(b.published_at).getTime() : 0;
  return bp - ap;
}

export async function fetchPublishedInsightCards(limit = 6): Promise<InsightCard[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('insights')
    .select(
      'id,slug,title,excerpt,cover_image_url,category,author_name,read_time_min,status,published_at,created_at,updated_at',
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data as InsightCard[]).slice().sort(orderByPublishedDescCards);
}

export async function fetchPublishedInsights(limit = 6): Promise<Insight[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('insights')
    .select(
      'id,slug,title,excerpt,content_md,cover_image_url,category,author_name,read_time_min,status,published_at,created_at,updated_at',
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return (data as Insight[]).slice().sort(orderByPublishedDesc);
}

export async function fetchInsightBySlug(slug: string): Promise<Insight | null> {
  if (!isSupabaseConfigured) return null;

  const { data, error } = await supabase
    .from('insights')
    .select(
      'id,slug,title,excerpt,content_md,cover_image_url,category,author_name,read_time_min,status,published_at,created_at,updated_at',
    )
    .eq('slug', slug)
    .maybeSingle();

  if (error) throw error;
  return (data as Insight) ?? null;
}

export async function fetchAllInsightsForAdmin(): Promise<Insight[]> {
  if (!isSupabaseConfigured) return [];

  const { data, error } = await supabase
    .from('insights')
    .select(
      'id,slug,title,excerpt,content_md,cover_image_url,category,author_name,read_time_min,status,published_at,created_at,updated_at',
    )
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return (data as Insight[]) ?? [];
}

export type InsightUpsert = {
  slug: string;
  title: string;
  excerpt?: string | null;
  content_md: string;
  cover_image_url?: string | null;
  category?: string | null;
  author_name?: string | null;
  read_time_min?: number | null;
  status: InsightStatus;
  published_at?: string | null;
};

export async function createInsight(payload: InsightUpsert) {
  const { data, error } = await supabase
    .from('insights')
    .insert(payload)
    .select('id')
    .single();
  if (error) throw error;
  return data;
}

export async function updateInsight(id: string, payload: Partial<InsightUpsert>) {
  const { data, error } = await supabase
    .from('insights')
    .update(payload)
    .eq('id', id)
    .select('id')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteInsight(id: string) {
  const { error } = await supabase.from('insights').delete().eq('id', id);
  if (error) throw error;
}
