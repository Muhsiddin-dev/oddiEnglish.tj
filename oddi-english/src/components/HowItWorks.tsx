import { ClipboardCheck, Target, Video, CheckCircle, type LucideIcon } from 'lucide-react'
import type { HowItWorksStep } from '../lib/types'

const iconMap: Record<string, LucideIcon> = {
  'clipboard-check': ClipboardCheck,
  target: Target,
  video: Video,
  'check-circle': CheckCircle,
}

interface Props {
  steps: HowItWorksStep[]
}

export default function HowItWorks({ steps }: Props) {
  return (
    <section id="how" className="section-py relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="glow-orb w-[350px] h-[350px] bg-brand-500/10 -top-10 left-1/4" />

      <div className="max-w-7xl mx-auto container-px relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="section-badge mb-5">ЧӢ ГУНА МЕГУЗАРАД</div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Чор қадами осон то{' '}
            <span className="text-gradient">оғоз</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Аз санҷиши ройгон то дарсҳои амалӣ — ҳама чиз шаффоф ва содда
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon] || ClipboardCheck
            return (
              <div
                key={step.id}
                className={`reveal reveal-delay-${i + 1} relative group`}
              >
                <div className="glass-card rounded-2xl p-6 h-full hover:border-brand-500/40 transition-all hover:-translate-y-2">
                  {/* Step number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-display font-extrabold text-4xl opacity-10" style={{ color: 'var(--text-primary)' }}>
                      0{step.step_number}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {step.description}
                  </p>
                </div>

                {/* Connector arrow (desktop) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                    <div className="w-6 h-6 rounded-full glass-card flex items-center justify-center">
                      <svg className="w-3 h-3 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
