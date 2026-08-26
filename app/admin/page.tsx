"use client"
import { useState } from 'react'
import { Lock, Mail, Loader2, Shield, GraduationCap } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!supabase) {
      setError('Supabase пайваст нашудааст!')
      setLoading(false)
      return
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Почта ё парол хато аст!')
      setLoading(false)
      return
    }

    if (data?.session) {
      localStorage.setItem('oddi-admin-session', JSON.stringify({
        email: data.user.email,
        access_token: data.session.access_token
      }))

        router.push("/admin/reviews")
    }
    setLoading(false)
  }

  return (
    <div className="flex h-screen min-h-[450px]">
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-10 relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-slate-900">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `url('/nazaroveng.png')`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10">
          <a href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Image src="/Logo.png" className="rounded-xl object-contain w-full h-auto" width={500} height={400} alt="Oddi English" />
            </div>
            <span className="font-display font-extrabold text-lg tracking-tight" style={{ color: 'var(--text-primary)' }}>
              ODDI<span className="text-brand-500"> ENGLISH</span>
            </span>
          </a>
        </div>

        <div className="relative -bottom-20 z-10">
          <h2 className="font-display font-extrabold text-3xl text-white mb-3 leading-tight">
            Панели<br />идоракунии<br />админ
          </h2>
          <p className="text-white/70 text-sm max-w-xs">
            Муҳити эмин барои идоракунии мӯҳтавои сайт, отзивҳо ва дигар маълумот.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-white/50 text-xs">
          <Shield className="w-4 h-4" />
          Access restricted — Authorized personnel only
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 lg:p-10">
        <div className="w-full max-w-sm ">
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <Image src={"/Logo.png"} className='rounded-xl object-contain w-full h-auto' width={500} height={400} alt="Oddi English" />
            </div>
            <span className="font-display font-extrabold text-lg">ODDI ENGLISH</span>
          </div>

          <h3 className="font-display text-center md:text-start font-bold text-2xl mb-2">Хуш омадед</h3>
          <p className="text-sm mb-8 text-center md:text-start" style={{ color: 'var(--text-secondary)' }}>
            Барои ворид шудан маълумоти худро дохил кунед
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:border-brand-500 transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Парол
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent outline-none focus:border-brand-500 transition-colors"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-500/10 rounded-lg px-4 py-2">{error}</p>
            )}

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 text-white font-medium">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Ворид шуда истодааст...
                </>
              ) : (
                'Ворид шудан'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}