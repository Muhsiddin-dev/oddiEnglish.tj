"use client"
import { ArrowRight, Play, Sparkles, Star, Users, Award, TrendingUp } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'
import { useRef } from 'react';

export default function Hero() {
  const tilt = useTilt(6)
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      {/* Background glow orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-brand-500/20 -top-20 -left-20 animate-glow" />
      <div className="glow-orb w-[400px] h-[400px] bg-brand-700/15 top-1/2 right-0 animate-glow" style={{ animationDelay: '1.5s' }} />
      <div className="glow-orb w-[300px] h-[300px] bg-brand-400/10 bottom-0 left-1/3 animate-glow" style={{ animationDelay: '3s' }} />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto container-px relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left: Text */}
          <div className="reveal">
            <div className="section-badge mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              Курсҳои англисӣ бо Назар Назаров
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
              Англисиро{' '}
              <span className="text-gradient">амалӣ</span> ёд гиред,
              <br />
              на танҳо назарӣ
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              Системаи муосири таълим, ки шуморо аз навбигин то сатҳи озод сухангӯӣ мебарад.
              Таҷрибаи 10+ сол, 500+ хонанда, ва натиҷаҳои воқеӣ.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#how" className="btn-primary group">
                Оғоз кунед
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#reviews" className="btn-secondary group">
                <Play className="w-4 h-4" />
                Отзивҳоро бубинед
              </a>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: Award, label: '10+ сол таҷриба' },
                { icon: Users, label: '500+ хонанда' },
                { icon: TrendingUp, label: '98% қаноатмандӣ' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <s.icon className="w-4 h-4 text-brand-500" />
                  <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal reveal-delay-2 perspective flex justify-center lg:justify-end">
            <div
              ref={tilt.ref as any}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              style={tilt.style}
              className="relative w-full max-w-md"
            >
              {/* Main card */}
              <div className="glass-card rounded-3xl p-8 preserve-3d">
                <div className="flex items-center gap-3 mb-6" style={{ transform: 'translateZ(40px)' }}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/40">
                    <span className="text-white font-display font-bold text-xl">N</span>
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg">Назар Назаров</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      Ментор & Муаллими англисӣ
                    </p>
                  </div>
                </div>

                <div className="space-y-4" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Сатҳи имрӯза</span>
                    <span className="font-display font-bold text-brand-500">B2 → C1</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Дарсҳои моҳ</span>
                    <span className="font-display font-bold">12 дарс</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Формат</span>
                    <span className="font-display font-bold">Online / Zoom</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }} >
                  <div className="flex items-center gap-1 mb-2" style={{ transform: 'translateZ(20px)' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" />
                    ))}
                    <span className="ml-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      4.9 / 5
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    Аз 200+ отзивҳои хонандагон
                  </p>
                </div>
              </div>

              {/* Floating accent */}
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 opacity-80 blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-brand-500/30 blur-lg animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}