import { BookOpen, ArrowRight } from 'lucide-react'
import type { CurriculumItem } from '../lib/types'

interface Props {
  items: CurriculumItem[]
}

export default function Curriculum({ items }: Props) {
  return (
    <section id="curriculum" className="section-py relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-brand-700/10 bottom-1/4 -left-20" />

      <div className="max-w-7xl mx-auto container-px relative z-10">
        <div className="text-center mb-16 reveal">
          <div className="section-badge mb-5">ШУМО ЧИРО МЕОМӮЗЕД</div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4">
            Барномаи{' '}
            <span className="text-gradient">пурраи</span>{' '}курс
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Аз грамматикаи асосӣ то сухангӯии озод — ҳама чиз барои муваффақият
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`reveal reveal-delay-${(i % 3) + 1} group glass-card rounded-2xl p-6 hover:border-brand-500/40 transition-all hover:-translate-y-2 cursor-default`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/15 flex items-center justify-center group-hover:bg-brand-500 group-hover:scale-110 transition-all">
                  <BookOpen className="w-5 h-5 text-brand-500 group-hover:text-white transition-colors" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold font-display bg-brand-500/10 text-brand-500 border border-brand-500/20">
                  {item.level}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg mb-2 group-hover:text-brand-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
                {item.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-medium text-brand-500 opacity-0 group-hover:opacity-100 transition-opacity">
                Маълумоти бештар
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* CTA banner */}
        <div className="reveal mt-16 glass-card rounded-3xl p-8 lg:p-12 text-center relative overflow-hidden">
          <div className="glow-orb w-[300px] h-[300px] bg-brand-500/20 -top-10 left-1/2 -translate-x-1/2" />
          <div className="relative z-10">
            <h3 className="font-display font-extrabold text-2xl lg:text-3xl mb-4">
              Тайёр ҳастед, ки оғоз кунед?
            </h3>
            <p className="text-lg mb-6 max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
              Санҷиши ройгони 15-дақиқа — бе ягон уҳдадорӣ
            </p>
            <a href="#reviews" className="btn-primary group">
              Санҷиши ройгон
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
