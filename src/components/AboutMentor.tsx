'use client'

import { useState, useRef, useEffect } from 'react'
import { Award, Users, BookOpen, Smile, Play, Pause, Volume2, VolumeX, Loader2, type LucideIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('AboutMentor')

  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [hoverTime, setHoverTime] = useState<number | null>(null)
  const [hoverX, setHoverX] = useState(0)
  const hideControlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleTimeUpdate = () => {
    if (!videoRef.current) return
    const current = videoRef.current.currentTime
    const total = videoRef.current.duration || 1
    setCurrentTime(current)
    setDuration(total)
    setProgress((current / total) * 100)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    if (videoRef.current && duration) {
      const newTime = (clickX / width) * duration
      videoRef.current.currentTime = newTime
      setProgress((newTime / duration) * 100)
    }
  }

  const handleProgressHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const width = rect.width
    const ratio = Math.min(Math.max(x / width, 0), 1)
    setHoverTime(ratio * duration)
    setHoverX(x)
  }

  const formatTime = (timeInSeconds: number) => {
    if (!isFinite(timeInSeconds)) return '0:00'
    const minutes = Math.floor(timeInSeconds / 60)
    const seconds = Math.floor(timeInSeconds % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const resetHideTimer = () => {
    setShowControls(true)
    if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    if (isPlaying) {
      hideControlsTimer.current = setTimeout(() => setShowControls(false), 2500)
    }
  }

  useEffect(() => {
    resetHideTimer()
    return () => {
      if (hideControlsTimer.current) clearTimeout(hideControlsTimer.current)
    }
  }, [isPlaying])

  return (
    <section id="about" className="section-py relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-brand-500/10 top-1/4 -right-20" />

      <div className="max-w-7xl mx-auto container-px relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div className="reveal relative">
            <div className="relative rounded-3xl overflow-hidden glass-card p-2 group/player">
              <div
                className="aspect-[4/5] rounded-2xl bg-slate-950 flex items-center justify-center relative overflow-hidden"
                onMouseMove={resetHideTimer}
                onMouseLeave={() => isPlaying && setShowControls(false)}
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-950 z-40">
                    <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
                  </div>
                )}

                <video
                  ref={videoRef}
                  loop
                  playsInline
                  preload="metadata"
                  muted={isMuted}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={() => setIsLoading(false)} 
                  onCanPlay={() => setIsLoading(false)}     
                  onWaiting={() => setIsLoading(true)}
                  onPlaying={() => setIsLoading(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover rounded-2xl cursor-pointer"
                  onClick={togglePlay}
                >
                  <source src="/166844863.mp4" type="video/mp4" />
                  {t('videoError')}
                </video>

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 pointer-events-none z-10" />

                <button
                  onClick={togglePlay}
                  className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${!isPlaying || showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                  {!isPlaying && (
                    <span className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                      <Play className="w-7 h-7 sm:w-8 sm:h-8 text-brand-600 ml-1" fill="currentColor" />
                    </span>
                  )}
                </button>

                {/* Bottom Panel */}
                <div
                  className={`absolute inset-x-0 bottom-0 px-4 pb-4 pt-10 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2.5 z-30 transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                  {/* Progress bar */}
                  <div
                    onClick={handleProgressClick}
                    onMouseMove={handleProgressHover}
                    onMouseLeave={() => setHoverTime(null)}
                    className="relative w-full h-1.5 bg-white/25 rounded-full cursor-pointer group/bar hover:h-2 transition-all"
                  >
                    <div
                      className="absolute top-0 left-0 h-full bg-brand-500 rounded-full transition-all group-hover/bar:bg-brand-400"
                      style={{ width: `${progress}%` }}
                    />
                    <div
                      className="absolute top-0 h-full w-3 -ml-1.5 rounded-full bg-white opacity-0 group-hover/bar:opacity-100 transition-opacity shadow"
                      style={{ left: `${progress}%` }}
                    />
                    {hoverTime !== null && (
                      <div
                        className="absolute -top-8 -translate-x-1/2 px-2 py-1 rounded-md bg-black/90 text-white text-[10px] font-medium whitespace-nowrap pointer-events-none"
                        style={{ left: `${hoverX}px` }}
                      >
                        {formatTime(hoverTime)}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-white text-xs font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={togglePlay}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-brand-500 transition-colors"
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4" fill="currentColor" />
                        ) : (
                          <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                        )}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/15 hover:bg-brand-500 transition-colors"
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>

                      <span className="text-white/80 text-[11px] tabular-nums ml-1">
                        {formatTime(currentTime)} / {formatTime(duration || 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2">
            <div className="section-badge mb-5">{t('badge')}</div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              {t('titlePrefix')}
              <span className="text-gradient">{t('titleGradient')}</span>
            </h2>
            <p className="text-lg leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
              {t('description')}
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => {
                const Icon = iconMap[stat.icon] || Award
                return (
                  <div
                    key={stat.id}
                    className="glass-card rounded-2xl p-5 hover:border-brand-500/40 transition-all hover:-translate-y-1"
                  >
                    <div className="w-11 h-11 rounded-xl bg-brand-500/15 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-brand-500" />
                    </div>
                    <p className="font-display font-extrabold text-2xl text-gradient mb-1">
                      {stat.value}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                      {t.has(`stats.${stat.id}`) ? t(`stats.${stat.id}`) : stat.label}
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