/**
 * AF-PHONE — Site officiel
 * Boutique : 100 Rue des Mousquetaires, 30000 Nîmes
 * Tél : 07 66 82 97 44
 *
 * Stack : React + TypeScript + Tailwind CSS (Vite)
 * Prêt pour déploiement Lovable
 */

import './index.css'
import Navbar           from './components/Navbar'
import Hero             from './components/Hero'
import Services         from './components/Services'
import Repairs          from './components/Repairs'
import Boutique         from './components/Boutique'
import Reviews          from './components/Reviews'
import Game             from './components/Game'
import AppointmentForm  from './components/AppointmentForm'
import Contact          from './components/Contact'
import FloatingCTA      from './components/FloatingCTA'
import Footer           from './components/Footer'

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
        <AppointmentForm />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}
