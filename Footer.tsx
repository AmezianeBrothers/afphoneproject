import { Phone, MapPin, Store } from 'lucide-react'

const PHONE = '04 66 21 74 33'
const PHONE_HREF = 'tel:+33466217433'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t border-white/8 py-16 px-5"
      aria-label="Pied de page AF-PHONE"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: '#E60000' }}>
                <Phone size={15} className="text-white" fill="white" />
              </div>
              <span className="font-display font-bold text-lg text-af-white tracking-tight">
                AF<span style={{ color: '#E60000' }}>·</span>PHONE
              </span>
            </div>
            <p className="text-af-silver text-sm font-body leading-relaxed mb-3">
              Votre expert en réparation et vente de téléphones à Nîmes.
            </p>
            <div className="flex items-start gap-2 text-af-silver text-xs font-body">
              <Store size={12} style={{ color: '#E60000' }} className="flex-shrink-0 mt-0.5" />
              <span>Dans la galerie marchande Intermarché, Rue des Mousquetaires</span>
            </div>
          </div>

          {/* Links */}
          <nav aria-label="Liens rapides">
            <h3 className="font-display font-semibold text-af-white text-sm mb-4 uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2 text-af-silver text-sm font-body">
              {[
                ['#reparation', 'Réparation iPhone Nîmes'],
                ['#reparation', 'Réparation Samsung Nîmes'],
                ['#reparation', 'Réparation tablette Nîmes'],
                ['#boutique',   'Achat iPhone Nîmes'],
                ['#boutique',   'Téléphones reconditionnés'],
                ['#contact',    'Diagnostic téléphone Nîmes'],
              ].map(([href, label]) => (
                <li key={label}>
                  <a href={href} className="hover:text-af-white transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <h3 className="font-display font-semibold text-af-white text-sm mb-4 uppercase tracking-wider">
              Contact
            </h3>
            <div className="space-y-3 text-af-silver text-sm font-body">
              <a
                href={PHONE_HREF}
                className="flex items-center gap-2 hover:text-af-white transition-colors font-semibold text-base"
                style={{ color: '#E60000' }}
              >
                <Phone size={14} style={{ color: '#E60000' }} className="flex-shrink-0" />
                {PHONE}
              </a>
              <a
                href="https://maps.google.com/?q=Intermarché+100+Rue+des+Mousquetaires+30000+Nimes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-af-white transition-colors"
              >
                <MapPin size={13} style={{ color: '#E60000' }} className="flex-shrink-0 mt-0.5" />
                <span>
                  Galerie Marchande Intermarché<br />
                  100 Rue des Mousquetaires<br />
                  30000 Nîmes
                </span>
              </a>
            </div>
          </address>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-af-silver text-xs font-body">
            © {year} AF-PHONE Nîmes. Tous droits réservés.
          </p>
          <p className="text-af-silver/40 text-xs font-body text-center">
            Réparation iPhone Nîmes · Galerie Intermarché Rue des Mousquetaires · Diagnostic gratuit*
          </p>
        </div>
      </div>
    </footer>
  )
}
