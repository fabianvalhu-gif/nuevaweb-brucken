import { useEffect } from 'react';
import { Header } from '@/app/components/Header';
import { HeroSection } from '@/app/components/HeroSection';
import { FeaturedInsight } from '@/app/components/FeaturedInsight';
import { ServicesSection } from '@/app/components/ServicesSection';
import { IndustriesSection } from '@/app/components/IndustriesSection';
import { ExpertiseSection } from '@/app/components/ExpertiseSection';
import { InsightsSection } from '@/app/components/InsightsSection';
import { AboutSection } from '@/app/components/AboutSection';
import { CTASection } from '@/app/components/CTASection';
import { Footer } from '@/app/components/Footer';
import { ContactPage } from '@/app/pages/ContactPage';
import { IndustryDetailPage } from '@/app/pages/IndustryDetailPage';
import { InsightDetailPage } from '@/app/pages/InsightDetailPage';
import { AdminInsightsPage } from '@/app/pages/AdminInsightsPage';
import { InsightsIndexPage } from '@/app/pages/InsightsIndexPage';
import { applySeo } from '@/app/lib/seo';
import { SupportedByMarquee } from '@/app/components/SupportedByMarquee';

export default function App() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const path = window.location.pathname;

    const base = 'Br\u00fccken Global';
    const canonical = `${window.location.origin}${path}`.replace(/\/+$/, '') || `${window.location.origin}/`;

    if (path.startsWith('/admin')) {
      applySeo({
        title: `Admin | ${base}`,
        description: 'Acceso privado para administracion de insights.',
        canonical,
        noindex: true,
      });
      return;
    }

    if (path.startsWith('/contacto')) {
      applySeo({
        title: `Contacto | ${base}`,
        description: 'Conversemos sobre tu proximo desafio. Te respondemos en menos de 24 horas habiles.',
        canonical,
      });
      return;
    }

    if (path === '/insights') {
      applySeo({
        title: `Insights | ${base}`,
        description: 'Articulos y pensamiento accionable sobre estrategia, tecnologia y operaciones.',
        canonical,
      });
      return;
    }

    if (path.startsWith('/insights/')) {
      applySeo({
        title: `Insight | ${base}`,
        description: 'Articulo de Br\u00fccken Global.',
        canonical,
        type: 'article',
      });
      return;
    }

    if (path.startsWith('/industrias/')) {
      applySeo({
        title: `Industria | ${base}`,
        description: 'Capacidades y casos por industria.',
        canonical,
      });
      return;
    }

    applySeo({
      title: base,
      description:
        'Consultoria estrategica y software factory para Latinoamerica y el mundo. Aceleramos crecimiento con estrategia, tecnologia y ejecucion.',
      canonical: `${window.location.origin}/`,
    });
  }, []);

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/contacto')) {
    return <ContactPage />;
  }

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/industrias/')) {
    const slug = window.location.pathname.replace('/industrias/', '').split('/')[0];
    return <IndustryDetailPage slug={slug} />;
  }

  if (typeof window !== 'undefined' && window.location.pathname === '/insights') {
    return <InsightsIndexPage />;
  }

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/insights/')) {
    const slug = window.location.pathname.replace('/insights/', '').split('/')[0];
    return <InsightDetailPage slug={slug} />;
  }

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
    return <AdminInsightsPage />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <SupportedByMarquee />
        <FeaturedInsight />
        <ServicesSection />
        <IndustriesSection />
        <ExpertiseSection />
        <InsightsSection />
        <AboutSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
