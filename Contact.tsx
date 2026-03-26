import { Phone, MapPin, Clock, Navigation, Store } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const PHONE = '04 66 21 74 33'
const PHONE_HREF = 'tel:+33466217433'

const hours = [
  { day: 'Lundi – Vendredi', time: '09h30 – 19h00' },
  { day: 'Samedi', time: '09h30 – 18h00' },
  { day: 'Dimanche', time: 'Fermé' },
]

export default function Contact() {
  const sectionRef = useReveal()

  return (
    <section
      id="contact"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 px-5"
      aria-label="Contact et localisation AF-PHONE Nîmes Galerie Intermarché"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label reveal mb-4" style={{ color: '#E60000' }}>Nous Trouver</p>
          <h2 className="section-title text-4xl md:text-5xl reveal reveal-delay-1 mb-5">
            Dans la galerie
            <br />
            <span style={{ color: '#E60000' }}>Intermarché, Nîmes.</span>
          </h2>
          <p className="text-af-silver font-body text-base reveal reveal-delay-2 max-w-xl mx-auto">
            Retrouvez-nous directement à l'intérieur de la galerie marchande Intermarché,
            100 Rue des Mousquetaires — stationnement gratuit, accès facile.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Info panel */}
          <div className="space-y-5">
            {/* Galerie card */}
            <div className="glass-card p-7 reveal">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(230,0,0,0.12)' }}>
                  <Store size={20} style={{ color: '#E60000' }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-af-white text-lg mb-1">Galerie Marchande</h3>
                  <p className="text-af-silver font-body text-sm leading-relaxed">
                    Boutique AF-PHONE située <strong className="text-af-white">à l'intérieur de la galerie Intermarché</strong>
                  </p>
                  <address className="text-af-silver font-body text-sm not-italic mt-2 leading-relaxed">
                    100 Rue des Mousquetaires<br />
                    30000 Nîmes, France
                  </address>
                  <a
                    href="https://maps.google.com/?q=Intermarché+100+Rue+des+Mousquetaires+30000+Nimes"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-display font-semibold mt-3 hover:underline"
                    style={{ color: '#E60000' }}
                    aria-label="Itinéraire Google Maps vers AF-PHONE Nîmes"
                  >
                    <Navigation size={12} />
                    Obtenir l'itinéraire
                  </a>
                </div>
              </div>
            </div>

            {/* Phone card */}
            <div className="glass-card p-7 reveal reveal-delay-1">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(230,0,0,0.12)' }}>
                  <Phone size={20} style={{ color: '#E60000' }} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-af-white text-lg mb-1">Téléphone</h3>
                  <a
                    href={PHONE_HREF}
                    className="font-display font-semibold text-2xl text-af-white transition-colors hover:underline"
                    style={{ color: '#E60000' }}
                    aria-label="Appeler AF-PHONE Nîmes"
                  >
                    {PHONE}
                  </a>
                  <p className="text-af-silver text-xs font-body mt-1">Appel direct — sans attente</p>
                </div>
              </div>
            </div>

            {/* Hours card */}
            <div className="glass-card p-7 reveal reveal-delay-2">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,214,10,0.10)' }}>
                  <Clock size={20} className="text-af-amber" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-af-white text-lg mb-4">Horaires</h3>
                  <dl className="space-y-2">
                    {hours.map((h) => (
                      <div key={h.day} className="flex items-center justify-between">
                        <dt className="text-af-silver font-body text-sm">{h.day}</dt>
                        <dd className={`font-display font-semibold text-sm ${h.time === 'Fermé' ? 'text-red-400' : 'text-af-white'}`}>
                          {h.time}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>

            {/* Diagnostic note */}
            <div
              className="glass-card p-5 reveal reveal-delay-3 border"
              style={{ borderColor: 'rgba(230,0,0,0.2)' }}
            >
              <p className="text-af-silver font-body text-sm leading-relaxed">
                <span className="font-display font-semibold text-af-white">ℹ️ Diagnostic :</span>{' '}
                Gratuit uniquement s'il ne nécessite pas une recherche approfondie.
                Pour les pannes complexes, un devis vous sera proposé avant toute intervention.
              </p>
            </div>

            {/* Big CTA */}
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-3 text-white font-display font-semibold text-base py-4 rounded-2xl reveal reveal-delay-4 transition-all duration-300 hover:opacity-90 hover:scale-[1.02]"
              style={{ background: '#E60000', boxShadow: '0 8px 32px rgba(230,0,0,0.4)' }}
              aria-label="Appeler AF-PHONE Nîmes maintenant"
            >
              <Phone size={20} />
              Appeler la Boutique — {PHONE}
            </a>
          </div>

          {/* Map */}
          <div className="glass-card p-3 overflow-hidden reveal reveal-delay-1 map-container" style={{ minHeight: 420 }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=4.348%2C43.830%2C4.372%2C43.845&layer=mapnik&marker=43.8374%2C4.3601"
              width="100%"
              height="420"
              title="AF-PHONE — Galerie Marchande Intermarché, 100 Rue des Mousquetaires, Nîmes"
              loading="lazy"
              allowFullScreen
              className="rounded-2xl"
              aria-label="Carte de localisation AF-PHONE Nîmes Galerie Intermarché"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
