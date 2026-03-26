import { useState, useEffect, useCallback, useRef } from 'react'
import { Zap, Trophy, RotateCcw, Star } from 'lucide-react'
import { useReveal } from '../hooks/useReveal'

type Crack = { id: number; x: number; y: number; fixed: boolean }
type Particle = { id: number; x: number; y: number; color: string }

const CRACKS_TO_WIN = 8
const TIMER_SECS = 20

export default function Game() {
  const sectionRef = useReveal()
  const [cracks, setCracks] = useState<Crack[]>([])
  const [particles, setParticles] = useState<Particle[]>([])
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(TIMER_SECS)
  const [phase, setPhase] = useState<'idle' | 'playing' | 'win' | 'lose'>('idle')
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const crackIdRef = useRef(0)
  const particleIdRef = useRef(0)

  // Spawn a crack randomly on the phone screen
  const spawnCrack = useCallback(() => {
    const id = crackIdRef.current++
    const x = 10 + Math.random() * 80
    const y = 10 + Math.random() * 80
    setCracks((prev) => [...prev, { id, x, y, fixed: false }])
  }, [])

  // Start game
  const startGame = () => {
    setCracks([])
    setParticles([])
    setScore(0)
    setTimeLeft(TIMER_SECS)
    setPhase('playing')
  }

  // Fix a crack (player click)
  const fixCrack = (id: number, x: number, y: number) => {
    setCracks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, fixed: true } : c))
    )
    setScore((s) => s + 1)

    // Particle burst
    const colors = ['#0A84FF', '#30D158', '#FFD60A', '#FF375F']
    const newParticles: Particle[] = Array.from({ length: 6 }).map(() => ({
      id: particleIdRef.current++,
      x: x + (Math.random() - 0.5) * 30,
      y: y + (Math.random() - 0.5) * 30,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setParticles((prev) => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)))
    }, 600)
  }

  // Spawn cracks while playing
  useEffect(() => {
    if (phase !== 'playing') return
    spawnCrack()
    const interval = setInterval(spawnCrack, 1800)
    return () => clearInterval(interval)
  }, [phase, spawnCrack])

  // Timer countdown
  useEffect(() => {
    if (phase !== 'playing') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current!)
  }, [phase])

  // Win/lose check
  useEffect(() => {
    if (phase !== 'playing') return
    const active = cracks.filter((c) => !c.fixed)
    if (active.length >= CRACKS_TO_WIN) {
      setPhase('lose')
      setHighScore((h) => Math.max(h, score))
    }
  }, [cracks, score, phase])

  useEffect(() => {
    if (phase === 'playing' && timeLeft === 0) {
      setPhase('win')
      setHighScore((h) => Math.max(h, score))
    }
  }, [timeLeft, phase, score])

  const timerPct = (timeLeft / TIMER_SECS) * 100
  const timerColor =
    timeLeft > 10 ? '#0A84FF' : timeLeft > 5 ? '#FFD60A' : '#FF375F'

  return (
    <section
      id="jeu"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative py-32 px-5"
      aria-label="Jeu AF-PHONE — Répare le téléphone"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label reveal mb-4">Mini-Jeu Exclusif</p>
          <h2 className="section-title text-4xl md:text-5xl reveal reveal-delay-1 mb-5">
            🎮 Répare le téléphone !
          </h2>
          <p className="text-af-silver font-body text-lg max-w-xl mx-auto reveal reveal-delay-2">
            Clique sur les fissures avant qu'elles envahissent l'écran. Bats le record !
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 reveal reveal-delay-2">
          {/* Phone game area */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              {/* Phone shell */}
              <div
                className="relative w-64 h-[480px] rounded-[40px] bg-af-carbon border-4 border-af-gray shadow-glass-lg overflow-hidden select-none"
                style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)' }}
              >
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-af-black rounded-b-2xl z-10 flex items-center justify-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-af-gray" />
                  <div className="w-3 h-3 rounded-full bg-af-gray/60" />
                </div>

                {/* Screen */}
                <div className="phone-game-screen absolute inset-0 pt-8 cursor-crosshair">
                  {/* Timer bar */}
                  <div className="absolute top-8 left-0 right-0 h-1 bg-white/10">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{ width: `${timerPct}%`, background: timerColor }}
                    />
                  </div>

                  {/* Cracks */}
                  {phase === 'playing' &&
                    cracks
                      .filter((c) => !c.fixed)
                      .map((c) => (
                        <button
                          key={c.id}
                          onClick={() => fixCrack(c.id, c.x, c.y)}
                          className="absolute -translate-x-1/2 -translate-y-1/2 text-3xl
                                     hover:scale-125 transition-transform duration-150 z-20
                                     animate-fade-in opacity-0"
                          style={{
                            left: `${c.x}%`,
                            top: `${c.y}%`,
                            animationDuration: '0.2s',
                            animationFillMode: 'forwards',
                            textShadow: '0 0 12px rgba(255,55,95,0.8)',
                            filter: 'drop-shadow(0 0 6px rgba(255,55,95,0.5))',
                          }}
                          aria-label="Réparer la fissure"
                        >
                          💥
                        </button>
                      ))}

                  {/* Particles */}
                  {particles.map((p) => (
                    <div
                      key={p.id}
                      className="absolute w-2 h-2 rounded-full pointer-events-none z-30
                                 animate-ping"
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        background: p.color,
                        animationDuration: '0.5s',
                      }}
                    />
                  ))}

                  {/* Idle screen */}
                  {phase === 'idle' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                      <span className="text-5xl animate-float">📱</span>
                      <p className="text-af-white font-display font-bold text-lg">
                        Le Jeu AF-PHONE
                      </p>
                      <p className="text-af-silver text-xs font-body leading-relaxed">
                        Clique sur les fissures avant d'en avoir trop !
                      </p>
                      <button
                        onClick={startGame}
                        className="btn-primary text-sm px-5 py-2.5 mt-2"
                      >
                        <Zap size={14} />
                        Jouer !
                      </button>
                    </div>
                  )}

                  {/* Playing HUD */}
                  {phase === 'playing' && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-between px-4 items-center">
                      <span className="text-white text-xs font-display font-bold bg-white/10 px-3 py-1 rounded-full">
                        ⚡ {score} réparés
                      </span>
                      <span
                        className="text-white text-xs font-display font-bold px-3 py-1 rounded-full"
                        style={{ background: `${timerColor}30`, color: timerColor }}
                      >
                        ⏱ {timeLeft}s
                      </span>
                    </div>
                  )}

                  {/* Win screen */}
                  {phase === 'win' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center bg-af-accent/10 backdrop-blur-sm">
                      <span className="text-5xl">🏆</span>
                      <p className="text-af-accent font-display font-bold text-xl">Bravo !</p>
                      <p className="text-af-white font-body text-sm">
                        {score} téléphones réparés !
                      </p>
                      <button onClick={startGame} className="btn-primary text-xs px-4 py-2 mt-1">
                        <RotateCcw size={12} />
                        Rejouer
                      </button>
                    </div>
                  )}

                  {/* Lose screen */}
                  {phase === 'lose' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center bg-red-500/10 backdrop-blur-sm">
                      <span className="text-5xl">😱</span>
                      <p className="text-red-400 font-display font-bold text-xl">Trop de fissures !</p>
                      <p className="text-af-white font-body text-sm">{score} réparations</p>
                      <button onClick={startGame} className="btn-primary text-xs px-4 py-2 mt-1">
                        <RotateCcw size={12} />
                        Réessayer
                      </button>
                    </div>
                  )}
                </div>

                {/* Home button area */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-af-gray/60 rounded-full" />
              </div>
            </div>
          </div>

          {/* Game info panel */}
          <div className="flex-1 max-w-sm space-y-6">
            {/* Score card */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={20} className="text-af-amber" />
                <h3 className="font-display font-bold text-af-white text-lg">Tableau des scores</h3>
              </div>
              <div className="space-y-3">
                <ScoreRow label="Score actuel" value={score} color="text-af-blue" />
                <ScoreRow label="Meilleur score" value={highScore} color="text-af-amber" icon={<Star size={12} fill="currentColor" />} />
                <ScoreRow label="Fissures actives" value={cracks.filter((c) => !c.fixed).length} color="text-red-400" />
              </div>
            </div>

            {/* Rules */}
            <div className="glass-card p-6">
              <h3 className="font-display font-bold text-af-white text-base mb-4">Comment jouer ?</h3>
              <ul className="space-y-2.5 text-af-silver text-sm font-body">
                {[
                  '💥 Clique sur les fissures pour les réparer',
                  '⏱ Tu as 20 secondes pour réparer le plus possible',
                  '📵 Si 8 fissures s\'accumulent, c\'est perdu !',
                  '🏆 Bats ton record à chaque partie',
                ].map((r) => (
                  <li key={r} className="flex items-start gap-2">
                    <span className="leading-5">{r}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="glass-card p-6 border border-af-blue/20">
              <p className="text-af-white font-display font-semibold text-sm mb-2">
                Vrai téléphone cassé ? 😅
              </p>
              <p className="text-af-silver text-xs font-body mb-4">
                On s'en occupe en 30 minutes au 100 Rue des Mousquetaires, Nîmes !
              </p>
              <a href="tel:+33766829744" className="btn-primary text-xs w-full justify-center">
                📞 Appeler AF-PHONE
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ScoreRow({
  label,
  value,
  color,
  icon,
}: {
  label: string
  value: number
  color: string
  icon?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-af-silver text-sm font-body">{label}</span>
      <span className={`font-display font-bold text-lg ${color} flex items-center gap-1`}>
        {icon}
        {value}
      </span>
    </div>
  )
}
