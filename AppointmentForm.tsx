import { useState } from 'react'
import { Calendar, CheckCircle2, Loader2, Phone, Smartphone } from 'lucide-react'
import { createAppointment } from '../lib/supabase'
import { useReveal } from '../hooks/useReveal'

const DEVICES = [
  'iPhone 11 / 12 / 13 / 14 / 15',
  'Samsung Galaxy',
  'Huawei / Honor',
  'Xiaomi / Redmi',
  'iPad / Tablette',
  'Autre',
]

const ISSUES = [
  'Écran cassé',
  'Batterie HS',
  'Port de charge',
  'Boutons / Caméra',
  'Logiciel / Blocage',
  'Autre panne',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function AppointmentForm() {
  const sectionRef = useReveal()
  const [form, setForm] = useState({ name: '', phone: '', device: '', issue: '', slot: '' })
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async () => {
    if (!form.name || !form.phone || !form.device) {
      setErrorMsg('Merci de remplir les champs obligatoires.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      await createAppointment({
        name:   form.name,
        phone:  form.phone,
        device: form.device,
        issue:  form.issue,
        slot:   form.slot || new Date().toISOString(),
      })
      setStatus('success')
    } catch (e) {
      console.error(e)
      setStatus('error')
      setErrorMsg('Une erreur est survenue. Appelez-nous directement au 07 66 82 97 44.')
    }
  }

  return (
    <section
      id="rdv"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 px-5 bg-gradient-to-b from-transparent via-af-dark/40 to-transparent"
      aria-label="Prendre rendez-vous chez AF-PHONE Nîmes"
    >
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label reveal mb-4">Rendez-vous</p>
          <h2 className="section-title text-4xl md:text-5xl reveal reveal-delay-1 mb-5">
            Déposez votre <span className="text-af-blue">demande</span>
          </h2>
          <p className="text-af-silver font-body reveal reveal-delay-2">
            Sans engagement — notre équipe vous rappelle pour confirmer le créneau.
          </p>
        </div>

        {status === 'success' ? (
          <div className="glass-card p-10 text-center reveal">
            <CheckCircle2 size={48} className="text-af-accent mx-auto mb-4" />
            <h3 className="font-display font-bold text-af-white text-xl mb-2">Demande reçue !</h3>
            <p className="text-af-silver font-body">
              Nous vous rappelons très prochainement au <strong className="text-af-white">{form.phone}</strong>.
            </p>
          </div>
        ) : (
          <div className="glass-card p-8 reveal reveal-delay-2 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="rdv-name" className="block text-af-silver text-xs font-display font-semibold uppercase tracking-wider mb-2">
                Votre prénom *
              </label>
              <input
                id="rdv-name"
                type="text"
                placeholder="Jean-Pierre"
                value={form.name}
                onChange={set('name')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                           text-af-white font-body text-sm placeholder:text-af-silver/40
                           focus:outline-none focus:border-af-blue/60 transition-colors"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="rdv-phone" className="block text-af-silver text-xs font-display font-semibold uppercase tracking-wider mb-2">
                Téléphone de contact *
              </label>
              <div className="relative">
                <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-af-silver/50" />
                <input
                  id="rdv-phone"
                  type="tel"
                  placeholder="06 xx xx xx xx"
                  value={form.phone}
                  onChange={set('phone')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3
                             text-af-white font-body text-sm placeholder:text-af-silver/40
                             focus:outline-none focus:border-af-blue/60 transition-colors"
                />
              </div>
            </div>

            {/* Device */}
            <div>
              <label htmlFor="rdv-device" className="block text-af-silver text-xs font-display font-semibold uppercase tracking-wider mb-2">
                Appareil concerné *
              </label>
              <div className="relative">
                <Smartphone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-af-silver/50 pointer-events-none" />
                <select
                  id="rdv-device"
                  value={form.device}
                  onChange={set('device')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3
                             text-af-white font-body text-sm appearance-none
                             focus:outline-none focus:border-af-blue/60 transition-colors"
                >
                  <option value="" className="bg-af-carbon">Sélectionner un appareil</option>
                  {DEVICES.map((d) => (
                    <option key={d} value={d} className="bg-af-carbon">{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Issue */}
            <div>
              <label htmlFor="rdv-issue" className="block text-af-silver text-xs font-display font-semibold uppercase tracking-wider mb-2">
                Type de panne
              </label>
              <select
                id="rdv-issue"
                value={form.issue}
                onChange={set('issue')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3
                           text-af-white font-body text-sm appearance-none
                           focus:outline-none focus:border-af-blue/60 transition-colors"
              >
                <option value="" className="bg-af-carbon">Sélectionner la panne</option>
                {ISSUES.map((i) => (
                  <option key={i} value={i} className="bg-af-carbon">{i}</option>
                ))}
              </select>
            </div>

            {/* Slot */}
            <div>
              <label htmlFor="rdv-slot" className="block text-af-silver text-xs font-display font-semibold uppercase tracking-wider mb-2">
                Créneau souhaité
              </label>
              <div className="relative">
                <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-af-silver/50 pointer-events-none" />
                <input
                  id="rdv-slot"
                  type="datetime-local"
                  value={form.slot}
                  onChange={set('slot')}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3
                             text-af-white font-body text-sm
                             focus:outline-none focus:border-af-blue/60 transition-colors"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-400 text-xs font-body text-center">{errorMsg}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={status === 'loading'}
              className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Envoi en cours…
                </>
              ) : (
                <>
                  <Calendar size={18} />
                  Envoyer ma demande
                </>
              )}
            </button>

            <p className="text-af-silver/50 text-xs text-center font-body">
              Ou appelez directement : <a href="tel:+33766829744" className="text-af-blue hover:underline">07 66 82 97 44</a>
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
