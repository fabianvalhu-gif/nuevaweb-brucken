import { Linkedin, Twitter, Instagram, Youtube } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Servicios',
      links: [
        { label: 'Estrategia de crecimiento', href: '/#consultoria', emphasize: true },
        { label: 'Transformación operacional', href: '/#consultoria' },
        { label: 'Software factory', href: '/#consultoria' },
        { label: 'Expansión internacional', href: '/#consultoria' },
        { label: 'IA y analytics', href: '/#consultoria' },
        { label: 'Transformación digital', href: '/#consultoria' },
      ],
    },
    {
      title: 'Industrias',
      links: [
        { label: 'Technology & SaaS', href: '/#industrias' },
        { label: 'Financial Services', href: '/#industrias' },
        { label: 'Retail & Consumer', href: '/#industrias' },
        { label: 'Healthcare', href: '/#industrias' },
        { label: 'Manufacturing', href: '/#industrias' },
        { label: 'Energy & Utilities', href: '/#industrias' },
      ],
    },
    {
      title: 'Insights',
      links: [
        { label: 'Artículos destacados', href: '/#insights' },
        { label: 'Investigación', href: '/#insights' },
        { label: 'Whitepapers', href: '/#insights' },
        { label: 'Casos de éxito', href: '/#insights' },
        { label: 'Webinars', href: '/#insights' },
        { label: 'Podcast', href: '/#insights' },
      ],
    },
    {
      title: 'Nosotros',
      links: [
        { label: 'Quiénes somos', href: '/#nosotros' },
        { label: 'Liderazgo', href: '/#nosotros' },
        { label: 'Carreras', href: '/#nosotros' },
        { label: 'Ubicaciones', href: '/#nosotros' },
        { label: 'Sostenibilidad', href: '/#nosotros' },
        { label: 'Prensa', href: '/#nosotros' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <a href="/" aria-label="Ir al inicio" className="inline-flex items-center">
                <img
                  src="/hero/header/logo.png"
                  alt="Brücken Global"
                  className="h-10 w-auto"
                />
              </a>
            </div>
            <p className="text-sm font-light text-gray-400 leading-relaxed">
              Consultoría estratégica y tecnológica para LATAM y mercados globales.
            </p>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white text-sm font-normal mb-6 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className={`text-sm transition-colors font-light ${
                        link.emphasize
                          ? 'text-white hover:text-blue-100'
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Social Links */}
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                © {currentYear} Brücken Global
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Términos de uso
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Privacidad
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookies
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Accesibilidad
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
