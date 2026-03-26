import { Phone, MapPin, Star, Clock, Zap } from 'lucide-react'
import { useEffect, useRef } from 'react'

const PHONE_HREF = 'tel:+33766829744'
const PHONE = '07 66 82 97 44'

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null)

  // Parallax subtle on hero orb
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const orb = document.getElementById('hero-orb')
      if (!orb) return
      const { innerWidth: w, innerHeight: h } = window
      const x = (e.clientX / w - 0.5) * 30
      const y = (e.clientY / h - 0.5) * 30
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
      {/* Background gradient orbs */}
      <div className="absolute inset-0 bg-hero-gradient pointer-events-none" />
      <div
        id="hero-orb"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none
                   w-[700px] h-[700px] rounded-full opacity-20 transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, rgba(10,132,255,0.6) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(48,209,88,0.5) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 py-20 text-center">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-10
                     text-xs font-body font-medium text-af-silver
                     animate-fade-in opacity-0"
          style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
        >
          <MapPin size={12} className="text-af-blue" />
          100 Rue des Mousquetaires · Nîmes 30000
          <span className="w-1.5 h-1.5 rounded-full bg-af-accent animate-pulse" />
          <span className="text-af-accent">Ouvert maintenant</span>
        </div>

        {/* H1 */}
        <h1
          className="font-display font-bold text-5xl md:text-7xl lg:text-8xl text-af-white
                     leading-[0.95] tracking-tight mb-6
                     animate-slide-up opacity-0"
          style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
        >
          Votre téléphone{' '}
          <span className="shimmer-text">réparé</span>
          <br />
          <span className="text-af-blue">en 30 minutes.</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-af-silver font-body text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed
                     animate-slide-up opacity-0"
          style={{ animationDelay: '0.35s', animationFillMode: 'forwards' }}
        >
          Réparation express d'iPhone, Samsung, tablettes — sans rendez-vous. Pièces de qualité,
          diagnostic gratuit. <strong className="text-af-white">AF-PHONE Nîmes</strong>, votre
          expert de la Rue des Mousquetaires.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16
                     animate-slide-up opacity-0"
          style={{ animationDelay: '0.5s', animationFillMode: 'forwards' }}
        >
          <a
            href={PHONE_HREF}
            className="btn-primary text-base px-8 py-4 floating-cta"
            aria-label={`Appeler AF-PHONE Nîmes au ${PHONE}`}
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
          className="flex flex-col sm:flex-row items-center justify-center gap-6
                     animate-fade-in opacity-0"
          style={{ animationDelay: '0.7s', animationFillMode: 'forwards' }}
        >
          <StatPill icon={<Star size={14} className="text-af-amber" fill="currentColor" />} label="5/5 avis Google" />
          <div className="hidden sm:block w-px h-5 bg-white/10" />
          <StatPill icon={<Zap size={14} className="text-af-accent" />} label="Réparation en 30 min" />
          <div className="hidden sm:block w-px h-5 bg-white/10" />
          <StatPill icon={<Clock size={14} className="text-af-blue" />} label="Sans rendez-vous" />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-af-silver text-xs font-body">Défiler</span>
        <div className="w-px h-10 bg-gradient-to-b from-af-silver to-transparent animate-bounce-subtle" />
      </div>
    </section>
  )
}

function StatPill({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <div className="flex items-center gap-2 text-af-silver text-sm font-body">
      {icon}
      <span>{label}</span>
    </div>
  )
}
