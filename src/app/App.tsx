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

export default function App() {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/contacto')) {
    return <ContactPage />;
  }

  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/industrias/')) {
    const slug = window.location.pathname.replace('/industrias/', '').split('/')[0];
    return <IndustryDetailPage slug={slug} />;
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
