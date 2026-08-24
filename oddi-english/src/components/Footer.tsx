import { GraduationCap, Mail, Phone, MapPin, Shield } from 'lucide-react'

interface Props {
  onAdminClick: () => void
}

export default function Footer({ onAdminClick }: Props) {
  return (
    <footer className="relative overflow-hidden border-t" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}>
      <div className="glow-orb w-[300px] h-[300px] bg-brand-500/10 -bottom-10 left-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto container-px relative z-10 py-16">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/30">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-extrabold text-lg">
                ODDI<span className="text-brand-500"> ENGLISH</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: 'var(--text-secondary)' }}>
              Курсҳои англисии премиум бо Назар Назаров. 10+ сол таҷриба, 500+ хонанда,
              натиҷаҳои воқеӣ.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
              Саҳифаҳо
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Асосӣ', href: '#hero' },
                { label: 'Дар бораи ментор', href: '#about' },
                { label: 'Чӣ гуна мегузар', href: '#how' },
                { label: 'Барномаи курс', href: '#curriculum' },
                { label: 'Отзивҳо', href: '#reviews' },
                { label: 'Саволҳо', href: '#faq' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm hover:text-brand-500 transition-colors"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--text-muted)' }}>
              Тамос
            </h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Mail className="w-4 h-4 text-brand-500" />
                nazar@oddi-english.com
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <Phone className="w-4 h-4 text-brand-500" />
                +992 90 123 45 67
              </li>
              <li className="flex items-center gap-2.5 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <MapPin className="w-4 h-4 text-brand-500" />
                Душанбе, Тоҷикистон
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            © 2024 ODDI ENGLISH. Ҳама ҳуқуқҳо ҳифз шудаанд.
          </p>

          {/* Discreet Admin button */}
          <button
            onClick={onAdminClick}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-brand-500/10"
            style={{ color: 'var(--text-muted)' }}
            aria-label="Admin panel"
          >
            <Shield className="w-3.5 h-3.5 group-hover:text-brand-500 transition-colors" />
            <span className="group-hover:text-brand-500 transition-colors">Admin</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
