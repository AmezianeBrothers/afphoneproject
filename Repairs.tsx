import { CheckCircle2, Shield, Wrench, Search } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

const repairs = [
  { device: 'iPhone 11 / 12', service: 'Remplacement écran', price: 'Nous consulter' },
  { device: 'iPhone 13 / 14', service: 'Remplacement écran', price: 'Nous consulter' },
  { device: 'iPhone 15 Series', service: 'Remplacement écran', price: 'Nous consulter' },
  { device: 'Samsung Galaxy S', service: 'Remplacement écran', price: 'Nous consulter' },
  { device: 'Tous smartphones', service: 'Remplacement batterie', price: 'Nous consulter' },
  { device: 'iPhone / Android', service: 'Port de charge', price: 'Nous consulter' },
  { device: 'iPad / Tablettes', service: 'Remplacement écran', price: 'Nous consulter' },
  { device: 'Tous appareils', service: 'Diagnostic', price: 'Gratuit*' },
]

const strengths = [
  { icon: <Shield size={22} style={{ color: '#E60000' }} />, title: 'Sans rendez-vous', desc: 'Déposez votre téléphone directement en boutique.' },
  { icon: <CheckCircle2 size={22} style={{ color: '#E60000' }} />, title: 'Pièces garanties', desc: '3 mois de garantie sur toutes les réparations.' },
  { icon: <Wrench size={22} style={{ color: '#E60000' }} />, title: 'Techniciens experts', desc: 'Réparations iPhone et Android par des professionnels.' },
  { icon: <Search size={22} style={{ color: '#E60000' }} />, title: 'Diagnostic*', desc: 'Gratuit s\'il ne nécessite pas de recherche approfondie.' },
]

export default function Repairs() {
  const sectionRef = useReveal()

  return (
    <section
      id="reparation"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 px-5"
      style={{ background: 'linear-gradient(180deg,transparent,rgba(20,20,20,.4),transparent)' }}
      aria-label="Tarifs de réparation téléphone Nîmes"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="section-label reveal mb-4" style={{ color: '#E60000' }}>Réparation téléphone Nîmes</p>
          <h2 className="section-title text-4xl md:text-5xl reveal reveal-delay-1 mb-5">
            Réparations expertes,
            <br />
            <span style={{ color: '#E60000' }}>devis transparent.</span>
          </h2>
          <p className="text-af-silver font-body text-lg max-w-xl mx-auto reveal reveal-delay-2">
            Devis gratuit avant toute intervention. Prix communiqués directement en boutique
            selon le modèle et l'état de votre appareil.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {strengths.map((s, i) => (
            <div key={s.title} className={`glass-card p-6 reveal reveal-delay-${i + 1} flex items-start gap-4`}>
              <div className="mt-0.5 flex-shrink-0">{s.icon}</div>
              <div>
                <h3 className="font-display font-semibold text-af-white text-sm mb-1">{s.title}</h3>
                <p className="text-af-silver font-body text-xs leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="glass-card overflow-hidden reveal">
          <div className="p-6 border-b border-white/8">
            <h3 className="font-display font-bold text-af-white text-xl">
              Services de réparation — Galerie Intermarché, Rue des Mousquetaires, Nîmes
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full" aria-label="Services de réparation AF-PHONE Nîmes">
              <thead>
                <tr className="border-b border-white/8">
                  <th className="text-left p-4 text-af-silver font-display font-semibold text-xs uppercase tracking-wider">Appareil</th>
                  <th className="text-left p-4 text-af-silver font-display font-semibold text-xs uppercase tracking-wider">Service</th>
                  <th className="text-left p-4 text-af-silver font-display font-semibold text-xs uppercase tracking-wider">Tarif</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((r, i) => (
                  <tr key={`${r.device}-${r.service}`} className={`border-b border-white/5 hover:bg-white/4 transition-colors ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                    <td className="p-4 font-display font-semibold text-af-white text-sm">{r.device}</td>
                    <td className="p-4 text-af-silver font-body text-sm">{r.service}</td>
                    <td className="p-4">
                      <span
                        className="inline-block px-2.5 py-1 rounded-full text-xs font-display font-semibold"
                        style={r.price === 'Gratuit*'
                          ? { background: 'rgba(48,209,88,.15)', color: '#30D158' }
                          : { background: 'rgba(230,0,0,.12)', color: '#E60000' }
                        }
                      >
                        {r.price}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 text-center border-t border-white/5">
            <p className="text-af-silver text-xs font-body">
              * Diagnostic gratuit uniquement s'il ne nécessite pas une recherche approfondie. Venez nous voir ou appelez le{' '}
              <a href="tel:+33466217433" className="font-semibold hover:underline" style={{ color: '#E60000' }}>04 66 21 74 33</a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
