const LOGOS: Array<{ src: string; name: string }> = [
  { src: '/logos_1/Amazon_Web_Services-Logo.wine.png', name: 'Amazon Web Services' },
  { src: '/logos_1/Microsoft-Logo.png', name: 'Microsoft' },
  { src: '/logos_1/microsoft_powerbi_logo_icon_169958.png', name: 'Microsoft Power BI' },
  { src: '/logos_1/Google_Favicon_2025.svg.png', name: 'Google' },
  { src: '/logos_1/android-6.svg', name: 'Android' },
  { src: '/logos_1/React-icon.svg.png', name: 'React' },
  { src: '/logos_1/swift_logo_icon_168770.webp', name: 'Swift' },
];

export function SupportedByMarquee() {
  // Duplicate once for a seamless loop.
  const items = [...LOGOS, ...LOGOS];

  return (
    <section aria-label="Supported by" className="py-10 lg:py-12 bg-white border-y border-gray-100">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-5 mb-7">
          <p className="text-xs uppercase tracking-[0.22em] text-gray-500">Supported by</p>
          <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent" />
        </div>

        <div
          className="relative overflow-hidden"
          style={{
            WebkitMaskImage:
              'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
            maskImage:
              'linear-gradient(90deg, transparent 0%, #000 10%, #000 90%, transparent 100%)',
          }}
        >
          <div className="bg-logo-marquee-track flex items-center gap-10 w-max py-3">
            {items.map((logo, idx) => (
              <div
                key={`${logo.src}-${idx}`}
                className="h-10 w-[170px] flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="bg-logo-marquee-logo max-h-full max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

