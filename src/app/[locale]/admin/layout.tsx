"use client"
import '../globals.css';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/src/context/ThemeContext';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import {
  X, Loader2, Shield, Star, CircleHelp as HelpCircle,
  ListChecks, BookOpen, Target, Menu
} from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/src/lib/supabase'
import Image from 'next/image';

const ADMIN_EMAIL = 'muhsinnazarov21@gmail.com'
const SESSION_KEY = 'oddi-admin-session'

type Tab = 'reviews' | 'faqs' | 'stats' | 'steps' | 'curriculum'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname()
  const isLogin = path === "/admin"
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false)
  const [checking, setChecking] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Муайян кардани tab-и фаъол аз рӯи URL (масалан /admin/reviews -> reviews)
  const getCurrentTab = (): Tab => {
    if (path.includes('/admin/faqs')) return 'faqs'
    if (path.includes('/admin/stats')) return 'stats'
    if (path.includes('/admin/steps')) return 'steps'
    if (path.includes('/admin/curriculum')) return 'curriculum'
    return 'reviews'
  }

  const activeTab = getCurrentTab()

  const tabs: { id: Tab; label: string; icon: typeof Star; path: string }[] = [
    { id: 'reviews', label: 'Отзивҳо', icon: Star, path: '/admin/reviews' },
    { id: 'faqs', label: 'Саволҳо', icon: HelpCircle, path: '/admin/faqs' },
    { id: 'stats', label: 'Омор', icon: Target, path: '/admin/stats' },
    { id: 'steps', label: 'Қадамҳо', icon: ListChecks, path: '/admin/steps' },
    { id: 'curriculum', label: 'Барномаи курс', icon: BookOpen, path: '/admin/curriculum' },
  ]

  useEffect(() => {
    if (isLogin) {
      setChecking(false)
      return
    }

    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      try {
        const data = JSON.parse(session)
        if (data.email === ADMIN_EMAIL) {
          setLoggedIn(true)
        } else {
          localStorage.removeItem(SESSION_KEY)
          router.replace('/admin')
        }
      } catch {
        localStorage.removeItem(SESSION_KEY)
        router.replace('/admin')
      }
    } else {
      router.replace('/admin')
    }
    setChecking(false)
  }, [isLogin, router])

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY)
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut()
    }
    setLoggedIn(false)
    router.push('/admin')
  }

  if (checking) {
    return (
      <html lang="tg">
        <body className={inter.className}>
          <div className="flex h-screen items-center justify-center bg-[var(--bg-primary)]">
            <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang="tg">
      <body className={inter.className}>
        <ThemeProvider>
          {isLogin ? (
            children
          ) : (
            <div className="flex h-screen overflow-hidden bg-[var(--bg-primary)]">
              {mobileMenuOpen && (
                <div
                  className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
                  onClick={() => setMobileMenuOpen(false)}
                />
              )}

              <aside className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-72 flex flex-col border-r bg-[var(--bg-secondary)] transition-transform duration-300 ease-in-out
                ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
              `} style={{ borderColor: 'var(--border-color)' }}>

                <div className="flex items-center justify-between px-6 py-3 border-b" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg">
                      <Image src={"/Logo.png"} className='rounded-md object-contain w-full h-auto' width={500} height={400} alt="Oddi English" />
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm">Админ панели </p>
                      <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>ODDI ENGLISH</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="lg:hidden w-8 h-8 rounded-lg flex items-center justify-center hover:bg-[var(--bg-tertiary)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                    Менюи асосӣ
                  </p>
                  {tabs.map((tab) => {
                    const Icon = tab.icon
                    const isActive = activeTab === tab.id
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          router.push(tab.path)
                          setMobileMenuOpen(false)
                        }}
                        className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                          ? 'bg-brand-500 text-white shadow-md shadow-brand-500/20'
                          : 'hover:bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                          }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                        {tab.label}
                      </button>
                    )
                  })}
                </div>

                {/* Logout Footer */}
                <div className="p-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium bg-red-500/10 text-red-500 hover:bg-red-500/20 transition-colors"
                  >
                    Баромадан аз система
                  </button>
                </div>
              </aside>

              <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-16 flex items-center justify-between px-3 border-b bg-[var(--bg-secondary)] shrink-0" style={{ borderColor: 'var(--border-color)' }}>
                  <div className="flex  gap-1.5">
                    <button
                      onClick={() => setMobileMenuOpen(true)}
                      className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center border hover:bg-[var(--bg-tertiary)] transition-colors"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <Menu className="w-5 h-5" />
                    </button>

                    <div className="w-full hidden md:block relative">
                      <input
                        type="text"
                        placeholder="Ҷустуҷӯ дар система..."
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border bg-[var(--bg-primary)] focus:outline-none focus:ring-2 focus:ring-brand-500/30 transition-all"
                        style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      className="relative w-10 h-10 rounded-xl border flex items-center justify-center hover:bg-[var(--bg-tertiary)] transition-colors"
                      style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                      title="Огоҳиномаҳо"
                    >
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                    </button>

                    {/* Маълумоти Админ */}
                    <div className="flex items-center gap-3 pl-2 border-l" style={{ borderColor: 'var(--border-color)' }}>
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-bold text-xs shadow-md">
                        ММ
                      </div>
                      <div className="hidden lg:block text-left">
                        <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>Муҳсиддин</p>
                        <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Super Admin</p>
                      </div>
                    </div>
                  </div>
                </header>

                <main className="flex-1 overflow-y-auto  ">
                  <div className="max-w-7xl p-5 mx-auto">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}