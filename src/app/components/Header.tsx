import { useState, useEffect } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type HeaderProps = {
  logoTone?: 'color' | 'dark';
  variant?: 'default' | 'overlay';
};

export function Header({ logoTone = 'color', variant = 'default' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isOverlay = variant === 'overlay' && !isScrolled;

  const logoFilterClass =
    // Requirement: white at the very top; black once you start scrolling.
    isScrolled ? 'brightness-0' : 'brightness-0 invert';
  const logoShadowClass = isScrolled ? '' : 'drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]';
  const navTextClass = isOverlay
    ? 'text-white/85 hover:text-white'
    : 'text-gray-700 hover:text-gray-900';
  const iconClass = isOverlay ? 'text-white/85' : 'text-gray-700';
  const iconHoverBg = isOverlay ? 'hover:bg-white/10' : 'hover:bg-gray-100';
  const contactCtaClass = isOverlay
    ? 'bg-white text-gray-900 hover:bg-gray-100'
    : 'bg-black text-white hover:bg-gray-800';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Consultoría', href: '#consultoria' },
    { name: 'Industrias', href: '#industrias' },
    { name: 'Insights', href: '#insights' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Carreras', href: '#carreras' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 shadow-sm backdrop-blur'
          : isOverlay
            ? 'bg-transparent'
            : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#" className="flex items-center gap-3">
              <img
                src="/hero/header/logo.png"
                alt="Brücken Global"
                className={`h-11 w-auto object-contain transition-[filter] duration-300 ${logoShadowClass} ${logoTone === 'dark' ? 'brightness-0' : logoFilterClass}`}
                loading="lazy"
              />
              <span className="sr-only">Brücken Global</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm transition-colors font-light ${navTextClass}`}
              >
                {item.name}
              </a>
            ))}
            <button className={`p-2 rounded-full transition-colors ${iconHoverBg}`}>
              <Search className={`w-5 h-5 ${iconClass}`} />
            </button>
            <a
              href="/contacto"
              className={`px-5 py-2 text-sm transition-colors ${contactCtaClass}`}
            >
              Contacto
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 rounded transition-colors ${iconHoverBg} ${isOverlay ? 'text-white' : 'text-gray-900'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-gray-900 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/contacto"
                className="block w-full bg-black text-white px-5 py-3 text-sm mt-4 text-center"
              >
                Contacto
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
