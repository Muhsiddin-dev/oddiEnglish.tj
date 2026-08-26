import React, { useState } from 'react'
import { HelpCircle, ChevronDown } from 'lucide-react'

interface FaqItem {
  id: string
  question: string
  answer: string
}

interface Props {
  faqs: FaqItem[]
}

export default function FAQ({ faqs }: Props) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)

  return (
    <section id="faq" className="section-py relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto container-px relative z-10">
        <div className="text-center mb-14">
          <div className="section-badge mb-5 inline-flex items-center gap-2">
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
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div
                key={faq.id}
                className={`glass-card rounded-2xl overflow-hidden transition-all duration-200 ${
                  isOpen ? 'border-brand-500/40 shadow-lg' : ''
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <span className="font-display font-semibold text-base lg:text-lg">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-brand-500 text-white rotate-180' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Қисми ҷавоб ки бевосита ва бе ягон аниматсияи нолозим кор мекунад */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-0 opacity-100 block">
                    <p className="text-sm lg:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {faq.answer}
                    </p>
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