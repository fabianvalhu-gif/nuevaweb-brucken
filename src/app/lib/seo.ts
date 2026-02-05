export type SeoMeta = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
};

function upsertMetaByName(name: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertMetaByProperty(property: string, content: string) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string) {
  if (typeof document === 'undefined') return;
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function absolutizeUrl(urlOrPath: string, origin: string) {
  if (!urlOrPath) return '';
  try {
    return new URL(urlOrPath, origin).toString();
  } catch {
    return urlOrPath;
  }
}

export function applySeo(meta: SeoMeta) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const origin = window.location.origin;
  const canonical = meta.canonical ? absolutizeUrl(meta.canonical, origin) : window.location.href.split('#')[0];
  const ogImage = absolutizeUrl(meta.ogImage || '/og-image.jpg', origin);
  const description =
    meta.description ||
    'Consultoria estrategica y software factory para Latinoamerica y el mundo. Aceleramos crecimiento con estrategia, tecnologia y ejecucion.';

  document.title = meta.title;
  upsertMetaByName('description', description);
  upsertMetaByName('robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');
  upsertLink('canonical', canonical);

  upsertMetaByProperty('og:site_name', 'Br\u00fccken Global');
  upsertMetaByProperty('og:locale', 'es_CL');
  upsertMetaByProperty('og:type', meta.type ?? 'website');
  upsertMetaByProperty('og:title', meta.title);
  upsertMetaByProperty('og:description', description);
  upsertMetaByProperty('og:url', canonical);
  upsertMetaByProperty('og:image', ogImage);

  upsertMetaByName('twitter:card', 'summary_large_image');
  upsertMetaByName('twitter:title', meta.title);
  upsertMetaByName('twitter:description', description);
  upsertMetaByName('twitter:image', ogImage);
}
