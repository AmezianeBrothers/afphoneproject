/**
 * AF-PHONE — Site officiel
 * Boutique : 100 Rue des Mousquetaires, 30000 Nîmes
 * Tél : 07 66 82 97 44
 *
 * Stack : React + TypeScript + Tailwind CSS (Vite)
 * Prêt pour déploiement Lovable
 */

/**
 * AF-PHONE — Site officiel v2
 * Galerie Marchande Intermarché · 100 Rue des Mousquetaires, 30000 Nîmes
 * Tél : 04 66 21 74 33
 */
import './index.css'
import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import Services    from './components/Services'
import Repairs     from './components/Repairs'
import Boutique    from './components/Boutique'
import Reviews     from './components/Reviews'
import Game        from './components/Game'
import Contact     from './components/Contact'
import FloatingCTA from './components/FloatingCTA'
import Footer      from './components/Footer'
// AppointmentForm supprimé — plus de prise de RDV en ligne

export default function App() {
  return (
    <div className="bg-af-black min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Repairs />
        <Boutique />
        <Reviews />
        <Game />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
