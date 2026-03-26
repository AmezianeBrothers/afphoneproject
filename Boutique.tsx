import { Smartphone, ShoppingBag, CheckCircle2 } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const phones = [
  { name: 'iPhone 15', tag: 'Neuf', color: 'from-red-900/20 to-af-dark' },
  { name: 'iPhone 14', tag: 'Reconditionné', color: 'from-red-800/15 to-af-dark' },
  { name: 'Samsung Galaxy S24', tag: 'Neuf', color: 'from-red-700/10 to-af-dark' },
  { name: 'iPhone 13', tag: 'Reconditionné', color: 'from-red-900/15 to-af-dark' },
]

const accessories = [
  { icon: '🛡️', name: 'Coques & Protections', desc: 'Pour tous modèles' },
  { icon: '🔋', name: 'Chargeurs & Câbles', desc: 'USB-C, Lightning, USB-A' },
  { icon: '🎧', name: 'Écouteurs', desc: 'Filaire & Bluetooth' },
  { icon: '📶', name: 'Accessoires divers', desc: 'Films, supports, batteries externes' },
]

export default function Boutique() {
  const sectionRef = useReveal()

  return (
    <section
      id="boutique"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 px-5"
      aria-label="Boutique AF-PHONE — Vente téléphones Nîmes"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <p className="section-label reveal mb-4" style={{ color: '#E60000' }}>Boutique</p>
          <h2 className="section-title text-4xl md:text-5xl reveal reveal-delay-1 mb-5">
            Achat iPhone & Smartphones
            <br />
            <span style={{ color: '#E60000' }}>à Nîmes</span>
          </h2>
          <p className="text-af-silver font-body text-lg max-w-xl mx-auto reveal reveal-delay-2">
            Neufs ou reconditionnés, nos téléphones sont testés et garantis.
            Nous consulter en boutique pour les disponibilités et les prix.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {phones.map((p, i) => (
            <article
              key={p.name}
              className={`service-card glass-card p-6 reveal reveal-delay-${i + 1}`}
              aria-label={`${p.name} disponible chez AF-PHONE Nîmes`}
            >
              <div className={`w-full h-36 rounded-2xl bg-gradient-to-b ${p.color} flex items-center justify-center mb-5`}>
                <Smartphone size={48} className="text-af-white/50" strokeWidth={1} />
              </div>
              <span
                className="inline-block px-2.5 py-1 rounded-full text-xs font-display font-semibold mb-3"
                style={p.tag === 'Neuf'
                  ? { background: 'rgba(48,209,88,.18)', color: '#30D158' }
                  : { background: 'rgba(230,0,0,.15)', color: '#E60000' }
                }
              >
                {p.tag}
              </span>
              <h3 className="font-display font-bold text-af-white text-base mb-3">{p.name}</h3>
              <p className="text-af-silver font-body text-xs mb-4">Prix sur devis en boutique</p>
              <a href="tel:+33466217433" className="btn-glass text-xs w-full justify-center py-2">
                Nous consulter
              </a>
            </article>
          ))}
        </div>

        <div className="glass-card p-10 reveal">
          <div className="flex items-center gap-3 mb-8">
            <ShoppingBag size={22} className="text-af-amber" />
            <h2 className="font-display font-bold text-af-white text-2xl">Accessoires</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {accessories.map((a, i) => (
              <div key={a.name} className={`flex items-start gap-4 reveal reveal-delay-${i + 1}`}>
                <span className="text-3xl flex-shrink-0">{a.icon}</span>
                <div>
                  <h3 className="font-display font-semibold text-af-white text-sm mb-1">{a.name}</h3>
                  <p className="text-af-silver text-xs font-body">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 reveal">
          {[
            'Appareils testés et contrôlés',
            'Garantie 3 à 12 mois',
            'Prix sur devis en boutique',
          ].map((g) => (
            <div key={g} className="flex items-center gap-2 text-af-silver text-sm font-body">
              <CheckCircle2 size={16} style={{ color: '#E60000' }} />
              {g}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
