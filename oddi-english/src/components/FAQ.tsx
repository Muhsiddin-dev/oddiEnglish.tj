import { useState } from 'react'
import { ChevronDown, CircleHelp as HelpCircle } from 'lucide-react'
import type { FaqItem } from '../lib/types'

interface Props {
  faqs: FaqItem[]
}

export default function FAQ({ faqs }: Props) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <section id="faq" className="section-py relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto container-px relative z-10">
        <div className="text-center mb-14 reveal">
          <div className="section-badge mb-5">
            <HelpCircle className="w-3.5 h-3.5" />
            САВОЛҲОИ ШУМО
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Саволҳои{' '}
            <span className="text-gradient">зуд-зуд</span>{' '}
            додашуда
          </h2>
          <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
            Ҷавобҳои саволҳое, ки хонандагон зуд-зуд медиҳанд
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className={`reveal reveal-delay-${Math.min(i + 1, 4)} glass-card rounded-2xl overflow-hidden transition-all ${
                  isOpen ? 'border-brand-500/40' : ''
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-display font-semibold text-base lg:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all ${
                      isOpen ? 'bg-brand-500 text-white rotate-180' : ''
                    }`}
                    style={!isOpen ? { background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' } : {}}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{ maxHeight: isOpen ? '300px' : '0px' }}
                >
                  <p className="px-5 pb-5 text-sm lg:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
