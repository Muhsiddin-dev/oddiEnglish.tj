"use client"
import { ArrowRight, Play, Sparkles, Star, Users, Award, TrendingUp } from 'lucide-react'
import { useTilt } from '../hooks/useTilt'
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('Hero');
  const tilt = useTilt(6)
  const ref = useRef<HTMLDivElement | null>(null);

  const stats = [
    { icon: Award, label: t('experience') },
    { icon: Users, label: t('students') },
    { icon: TrendingUp, label: t('satisfaction') },
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
      <div className="glow-orb w-[500px] h-[500px] bg-brand-500/20 -top-20 -left-20 animate-glow" />
      <div className="glow-orb w-[400px] h-[400px] bg-brand-700/15 top-1/2 right-0 animate-glow" style={{ animationDelay: '1.5s' }} />
      <div className="glow-orb w-[300px] h-[300px] bg-brand-400/10 bottom-0 left-1/3 animate-glow" style={{ animationDelay: '3s' }} />

      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="max-w-7xl mx-auto container-px relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="reveal">
            <div className="section-badge mb-6 animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              {t('badge')}
            </div>

            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-6">
              {t('titleLine1')}{' '}
              <span className="text-gradient">{t('titleHighlight')}</span>
              {' '}{t('titleLine2')}
              <br />
              {t('titleLine3')}
            </h1>

            <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              {t('description')}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#how" className="btn-primary group">
                {t('startBtn')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#reviews" className="btn-secondary group">
                <Play className="w-4 h-4" />
                {t('reviewsBtn')}
              </a>
            </div>

            <div className="flex flex-wrap gap-6">
              {stats.map((s) => (
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
              <div className="glass-card rounded-3xl p-8 preserve-3d">
                <div className="flex items-center gap-3 mb-6" style={{ transform: 'translateZ(40px)' }}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/40">
                    <Image src={"/nazaroveng.png"} className='rounded-xl object-contain w-full h-auto' width={500} height={400} alt="Oddi English" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-lg">{t('instructorName')}</p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {t('instructorRole')}
                    </p>
                  </div>
                </div>

                <div className="space-y-4" style={{ transform: 'translateZ(30px)' }}>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('currentLevelLabel')}</span>
                    <span className="font-display font-bold text-brand-500">B2 → C1</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('lessonsPerMonthLabel')}</span>
                    <span className="font-display font-bold">{t('lessonsCount')}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{t('formatLabel')}</span>
                    <span className="font-display font-bold">{t('formatValue')}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-1 mb-2" style={{ transform: 'translateZ(20px)' }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" />
                    ))}
                    <span className="ml-2 text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                      4.9 / 5
                    </span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {t('ratingCount')}
                  </p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 opacity-80 blur-xl animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-brand-500/30 blur-lg animate-float" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}