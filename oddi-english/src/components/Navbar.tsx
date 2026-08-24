import { useEffect, useState } from 'react'
import { Menu, X, Moon, Sun, GraduationCap } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'АСОСӢ', href: '#hero' },
  { label: 'МЕНТОР', href: '#about' },
  { label: 'ЧӢ ГУНА', href: '#how' },
  { label: 'КУРС', href: '#curriculum' },
  { label: 'ОТЗИВҲО', href: '#reviews' },
  { label: 'САВОЛҲО', href: '#faq' },
]

export default function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-2' : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto container-px flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="font-display font-extrabold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
              ODDI<span className="text-brand-500"> ENGLISH</span>
            </span>
            <span className="block text-[10px] font-medium tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
              Nazar Nazarov
            </span>
          </div>
        </a>

        {/* Desktop nav */}
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

        {/* Right side */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--bg-tertiary)]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          <a href="#hero" className="hidden sm:inline-flex btn-primary !px-5 !py-2.5 text-sm">
            Оғоз кунед
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ color: 'var(--text-primary)' }}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
              className="btn-primary mt-2 !py-3 text-sm"
            >
              Оғоз кунед
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}
