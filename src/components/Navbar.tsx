"use client"
import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun, Globe, ChevronDown } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'



const LANGUAGES = [
  { code: 'tj', label: 'Тоҷикӣ', flag: '🇹🇯' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const t = useTranslations('Navbar')

  const navLinks = [
  { label: t('home'), href: '#hero' },
  { label: t('about'), href: '#about' },
  { label: t('how'), href: '#how' },
  { label: t('curriculum'), href: '#curriculum' },
  { label: t('reviews'), href: '#reviews' },
  { label: t('faq'), href: '#faq' },
]

  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()

  const currentLocaleCode = pathname.split('/')[1] || 'tj'
  const currentLang = LANGUAGES.find((l) => l.code === currentLocaleCode) || LANGUAGES[0]

  const changeLanguage = (newLang: typeof LANGUAGES[0]) => {
    setIsLangOpen(false)
    const segments = pathname.split('/')
    segments[1] = newLang.code
    const newPath = segments.join('/')
    router.push(newPath)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-2' : 'py-4 bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto container-px flex items-center justify-between">
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-xs shadow-brand-500/30 group-hover:scale-110 transition-transform">
            <Image
              src={"/Logo.png"}
              className="rounded-xl object-contain w-full h-auto"
              width={500}
              height={400}
              alt="Oddi English"
            />
          </div>
          <div className="leading-tight">
            <span className="font-display font-extrabold md:text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
              ODDI<span className="text-brand-500"> ENGLISH</span>
            </span>
            <span className="block text-[10px] font-medium tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Nazar Nazarov
            </span>
          </div>
        </a>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium font-display rounded-lg transition-colors hover:text-brand-500"
              style={{ color: 'var(--text-secondary)' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center md:gap-2 gap-1">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 md:px-3 px-2 md:py-2 py-1.5 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium"
            >
              <Globe className="hidden md:block w-4 h-4 text-brand-500" />
              <span className="uppercase">{currentLang.code}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-2xl bg-[var(--bg-secondary,#111)] border border-white/10 shadow-2xl  z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang)}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-medium transition-colors hover:bg-brand-500/10 ${currentLang.code === lang.code ? 'text-brand-500 font-bold bg-brand-500/5' : ''
                      }`}
                  >
                    <span>{lang.flag}</span>
                    <span>{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="md:w-10 w-8 md:h-10 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-tertiary)]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a href="#hero" className="hidden sm:inline-flex btn-primary !px-5 !py-2.5 text-sm">
            {t('start')}
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden glass-nav mt-2 mx-4 rounded-2xl p-4 animate-fade-in">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-sm font-medium font-display rounded-lg transition-colors hover:bg-[var(--bg-tertiary)]"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#hero"
              onClick={() => setMobileOpen(false)}
              className="btn-primary mt-2 !py-3 text-sm text-center"
            >
              Оғоз кунед
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}