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

export default function App() {
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
