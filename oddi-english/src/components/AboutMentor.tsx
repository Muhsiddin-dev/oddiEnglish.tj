import { Award, Users, BookOpen, Smile, type LucideIcon } from 'lucide-react'
import type { MentorStat } from '../lib/types'

const iconMap: Record<string, LucideIcon> = {
  award: Award,
  users: Users,
  'book-open': BookOpen,
  smile: Smile,
}

interface Props {
  stats: MentorStat[]
}

export default function AboutMentor({ stats }: Props) {
  return (
    <section id="about" className="section-py relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-brand-500/10 top-1/4 -right-20" />

      <div className="max-w-7xl mx-auto container-px relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image / Visual */}
          <div className="reveal relative">
            <div className="relative rounded-3xl overflow-hidden glass-card p-2">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-brand-600 via-brand-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
                {/* Decorative pattern */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="relative z-10 text-center p-8">
                  <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6 border border-white/20">
                    <span className="font-display font-extrabold text-5xl text-white">N</span>
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">Назар Назаров</h3>
                  <p className="text-white/70 text-sm mb-6">
                    Ментори англисӣ • Сертификати CELTA • 10+ сол таҷриба
                  </p>
                  <div className="flex justify-center gap-2">
                    {['CELTA', 'IELTS 8.5', 'TESOL'].map((cert) => (
                      <span key={cert} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/10">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 glass-card rounded-2xl px-5 py-3 flex items-center gap-3 animate-float">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 flex items-center justify-center">
                <Award className="w-5 h-5 text-brand-500" />
              </div>
              <div>
                <p className="font-display font-bold text-sm">Top Rated</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>2024 Mentor</p>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="reveal reveal-delay-2">
            <div className="section-badge mb-5">ДАР БОРАИ МЕНТОР</div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Ментори шумо барои{' '}
              <span className="text-gradient">муваффақият</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              Ман Назар Назаров — муаллими англисӣ бо таҷрибаи 10+ сол. Дар ин муддат
              зиёда аз 500 хонандаро таълим додаам, ки бисёриашон имрӯз дар хориҷа
              меҳнат мекунанд ё дар имтиҳонҳои байналмилалӣ натиҷаҳои баланд гирифтаанд.
              Ман боварӣ дорам, ки англисӣ набояд "сахт" бошад — он бояд ҷолиб ва
              амалӣ бошад.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => {
                const Icon = iconMap[stat.icon] || Award
                return (
                  <div
                    key={stat.id}
                    className={`reveal reveal-delay-${i + 1} glass-card rounded-2xl p-5 hover:border-brand-500/40 transition-all hover:-translate-y-1`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-500/15 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-brand-500" />
                    </div>
                    <p className="font-display font-extrabold text-2xl text-gradient mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {stat.label}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
