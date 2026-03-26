import { Phone, MapPin, Star, Zap, Store } from 'lucide-react'
import { useEffect, useRef } from 'react'

const PHONE_HREF = 'tel:+33466217433'
const PHONE = '04 66 21 74 33'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const orb = document.getElementById('hero-orb')
      if (!orb) return
      const x = (e.clientX / window.innerWidth - 0.5) * 28
      const y = (e.clientY / window.innerHeight - 0.5) * 28
      orb.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Accueil AF-PHONE"
    >
      {/* Red gradient orbs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(230,0,0,0.15) 0%, transparent 70%)' }}
      />
      <div
        id="hero-orb"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[700px] h-[700px] rounded-full opacity-15 transition-transform duration-700 ease-out"
        style={{ background: 'radial-gradient(circle, rgba(230,0,0,0.7) 0%, transparent 70%)', filter: 'blur(70px)' }}
      />
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(180,0,0,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 text-center">
        {/* Badge localisation */}
        <div
          className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-10 text-xs font-body font-medium text-af-silver animate-fade-in opacity-0"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <Store size={12} style={{ color: '#E60000' }} />
          Galerie Marchande Intermarché · 100 Rue des Mousquetaires · Nîmes 30000
          <span className="w-1.5 h-1.5 rounded-full bg-af-accent animate-pulse" />
          <span className="text-af-accent">Ouvert maintenant</span>
        </div>

        {/* H1 */}
        <h1
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-af-white leading-[0.95] tracking-tight mb-6 animate-slide-up opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          Votre téléphone{' '}
          <span className="shimmer-text">réparé</span>
          <br />
          <span style={{ color: '#E60000' }}>par des experts.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-af-silver font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-slide-up opacity-0"
          style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
        >
          Réparation d'iPhone, Samsung, tablettes — sans rendez-vous. Diagnostic gratuit*.
          Devis immédiat en boutique. <strong className="text-af-white">AF-PHONE</strong>,
          dans la galerie marchande Intermarché, Nîmes.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up opacity-0"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-white font-display font-semibold px-8 py-4 rounded-full text-base transition-all duration-300"
            style={{
              background: '#E60000',
              boxShadow: '0 0 30px rgba(230,0,0,0.5)',
              animation: 'pulseRed 2.5s ease-in-out infinite',
            }}
            aria-label={`Appeler AF-PHONE au ${PHONE}`}
          >
            <Phone size={18} />
            Appeler la Boutique
          </a>
          <a href="#services" className="btn-glass text-base px-8 py-4">
            Nos Services
          </a>
        </div>

        {/* Trust Stats */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in opacity-0"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <div className="flex items-center gap-2 text-af-silver text-sm font-body">
            <Star size={14} style={{ color: '#FFD60A' }} fill="#FFD60A" />
            5/5 avis Google
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/10" />
          <div className="flex items-center gap-2 text-af-silver text-sm font-body">
            <Zap size={14} style={{ color: '#E60000' }} />
            Devis immédiat
          </div>
          <div className="hidden sm:block w-px h-5 bg-white/10" />
          <div className="flex items-center gap-2 text-af-silver text-sm font-body">
            <MapPin size={14} style={{ color: '#E60000' }} />
            Sans rendez-vous
          </div>
        </div>

        <p className="text-af-silver/40 font-body text-xs mt-8">
          * Diagnostic gratuit uniquement s'il ne nécessite pas une recherche approfondie
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-af-silver text-xs font-body">Défiler</span>
        <div className="w-px h-10 bg-gradient-to-b from-af-silver to-transparent animate-bounce-subtle" />
      </div>
    </section>
  )
}
