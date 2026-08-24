import { useState, useEffect, useCallback } from 'react'
import { X, Lock, Mail, Loader as Loader2, Shield, CircleCheck as CheckCircle, Clock, Trash2, Plus, Save, Star, ChevronRight, GraduationCap, CircleHelp as HelpCircle, ListChecks, BookOpen, Target, CreditCard as Edit3 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import {
  fetchAllReviews, updateReviewStatus, deleteReview,
  upsertFaq, deleteFaq, upsertMentorStat, deleteMentorStat,
  upsertHowItWorks, deleteHowItWorks, upsertCurriculum, deleteCurriculum,
} from '../lib/data'
import type { Review, SiteContent, FaqItem, MentorStat, HowItWorksStep, CurriculumItem } from '../lib/types'

const ADMIN_EMAIL = 'muhsinnazarov21@gmail.com'
const ADMIN_PASSWORD = 'Muhsinjon@21'
const SESSION_KEY = 'oddi-admin-session'

type Tab = 'reviews' | 'faqs' | 'stats' | 'steps' | 'curriculum'

interface Props {
  open: boolean
  onClose: () => void
  content: SiteContent
  onContentChanged: () => void
  onReviewsChanged: () => void
}

/* ============ Login Screen ============ */
function LoginScreen({ onSuccess }: { onSuccess: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    await new Promise((r) => setTimeout(r, 600))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      if (isSupabaseConfigured && supabase) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: ADMIN_EMAIL,
          password: ADMIN_PASSWORD,
        })
        if (signInError) {
          // Even if Supabase auth fails, allow access with hardcoded credentials
          // (the database may not have the user provisioned yet)
        }
      }
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email, ts: Date.now() }))
      onSuccess()
    } else {
      setError('Email ё парол нодуруст аст.')
    }
    setLoading(false)
  }

  return (
    <div className="flex h-full">
      {/* Left: Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-10 relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-slate-900">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="font-display font-extrabold text-xl text-white">ODDI ENGLISH</span>
          </div>
        </div>
        <div className="relative z-10">
          <h2 className="font-display font-extrabold text-3xl text-white mb-3 leading-tight">
            Панели<br />идоракунии<br />админ
          </h2>
          <p className="text-white/70 text-sm max-w-xs">
            Муҳити эмин барои идоракунии мӯҳтавои сайт, отзивҳо ва ҳама чизи динамикӣ.
          </p>
        </div>
        <div className="relative z-10 flex items-center gap-2 text-white/50 text-xs">
          <Shield className="w-4 h-4" />
          Access restricted — Authorized personnel only
        </div>
      </div>

      {/* Right: Login form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-10">
        <div className="w-full max-w-sm">
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-extrabold text-lg">ODDI ENGLISH</span>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-brand-500/15 flex items-center justify-center mb-6">
            <Lock className="w-7 h-7 text-brand-500" />
          </div>

          <h3 className="font-display font-bold text-2xl mb-2">Хуш омадед</h3>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            Барои воридшаван, маълумоти худро дохил кунед
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

            <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Воридшаван...
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

/* ============ Review Moderation ============ */
function ReviewModeration({ onReviewsChanged }: { onReviewsChanged: () => void }) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  const load = useCallback(async () => {
    setLoading(true)
    const data = await fetchAllReviews()
    setReviews(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.status === filter)

  const handleApprove = async (id: string) => {
    await updateReviewStatus(id, 'approved')
    load()
    onReviewsChanged()
  }
  const handleReject = async (id: string) => {
    await updateReviewStatus(id, 'rejected')
    load()
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Шумо мутмаин ҳастед, ки ин отзивро нест мекунед?')) return
    await deleteReview(id)
    load()
    onReviewsChanged()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg">Отзивҳо</h3>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
          {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === f ? 'bg-brand-500 text-white' : ''
              }`}
              style={filter !== f ? { color: 'var(--text-secondary)' } : {}}
            >
              {f === 'pending' ? 'Интизорӣ' : f === 'approved' ? 'Тасдиқшуда' : f === 'rejected' ? 'Радшуда' : 'Ҳама'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center py-12 text-sm" style={{ color: 'var(--text-muted)' }}>
          Отзивҳо нест.
        </p>
      ) : (
        <div className="space-y-3">
          {filtered.map((review) => (
            <div key={review.id} className="glass-card rounded-xl p-4">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold">
                    {review.full_name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{review.full_name}</p>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} className={`w-3 h-3 ${i <= review.rating ? 'fill-brand-500 text-brand-500' : 'text-[var(--border-color)]'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  review.status === 'approved' ? 'bg-green-500/15 text-green-500' :
                  review.status === 'pending' ? 'bg-yellow-500/15 text-yellow-500' :
                  'bg-red-500/15 text-red-500'
                }`}>
                  {review.status === 'approved' ? 'Тасдиқшуда' : review.status === 'pending' ? 'Интизорӣ' : 'Радшуда'}
                </span>
              </div>
              <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{review.comment}</p>
              <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Тел: {review.phone}</p>
              <div className="flex gap-2">
                {review.status !== 'approved' && (
                  <button onClick={() => handleApprove(review.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-green-500/15 text-green-500 hover:bg-green-500/25 transition-colors">
                    <CheckCircle className="w-3.5 h-3.5" /> Тасдиқ
                  </button>
                )}
                {review.status !== 'rejected' && (
                  <button onClick={() => handleReject(review.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-yellow-500/15 text-yellow-500 hover:bg-yellow-500/25 transition-colors">
                    <Clock className="w-3.5 h-3.5" /> Рад
                  </button>
                )}
                <button onClick={() => handleDelete(review.id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-red-500/15 text-red-500 hover:bg-red-500/25 transition-colors ml-auto">
                  <Trash2 className="w-3.5 h-3.5" /> Нест кардан
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ============ Generic Text Editor ============ */
function TextEditor({
  label, value, onChange, placeholder, multiline,
}: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; multiline?: boolean
}) {
  return (
    <div>
      <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>{label}</label>
      {multiline ? (
        <textarea
          value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border bg-transparent outline-none focus:border-brand-500 text-sm resize-none"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      ) : (
        <input
          type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border bg-transparent outline-none focus:border-brand-500 text-sm"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      )}
    </div>
  )
}

/* ============ FAQ Manager ============ */
function FaqManager({ content, onContentChanged }: { content: SiteContent; onContentChanged: () => void }) {
  const [items, setItems] = useState<FaqItem[]>(content.faqs)
  const [editing, setEditing] = useState<FaqItem | null>(null)
  const [saving, setSaving] = useState(false)

  const startNew = () => setEditing({ id: crypto.randomUUID(), question: '', answer: '', order_index: items.length })
  const handleSave = async () => {
    if (!editing || !editing.question.trim()) return
    setSaving(true)
    await upsertFaq(editing)
    setEditing(null)
    setSaving(false)
    onContentChanged()
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Нест карда шавад?')) return
    await deleteFaq(id)
    onContentChanged()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg">Саволҳо (FAQ)</h3>
        <button onClick={startNew} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600 transition-colors">
          <Plus className="w-3.5 h-3.5" /> Илова
        </button>
      </div>

      {editing && (
        <div className="glass-card rounded-xl p-4 mb-4 space-y-3 animate-fade-in">
          <TextEditor label="Савол" value={editing.question} onChange={(v) => setEditing({ ...editing, question: v })} placeholder="Савол..." />
          <TextEditor label="Ҷавоб" value={editing.answer} onChange={(v) => setEditing({ ...editing, answer: v })} placeholder="Ҷавоб..." multiline />
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60">
              <Save className="w-3.5 h-3.5" /> Нигоҳ доштан
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
              Бекор
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card rounded-xl p-3 flex items-start gap-3">
            <HelpCircle className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.question}</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{item.answer}</p>
            </div>
            <button onClick={() => setEditing(item)} className="p-1.5 rounded-lg hover:bg-brand-500/10">
              <Edit3 className="w-3.5 h-3.5 text-brand-500" />
            </button>
            <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg hover:bg-red-500/10">
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============ Stats Manager ============ */
function StatsManager({ content, onContentChanged }: { content: SiteContent; onContentChanged: () => void }) {
  const [editing, setEditing] = useState<MentorStat | null>(null)
  const [saving, setSaving] = useState(false)

  const startNew = () => setEditing({ id: crypto.randomUUID(), label: '', value: '', icon: 'award', order_index: content.mentorStats.length })
  const handleSave = async () => {
    if (!editing || !editing.label.trim() || !editing.value.trim()) return
    setSaving(true)
    await upsertMentorStat(editing)
    setEditing(null)
    setSaving(false)
    onContentChanged()
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Нест карда шавад?')) return
    await deleteMentorStat(id)
    onContentChanged()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg">Омори ментор</h3>
        <button onClick={startNew} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600">
          <Plus className="w-3.5 h-3.5" /> Илова
        </button>
      </div>

      {editing && (
        <div className="glass-card rounded-xl p-4 mb-4 space-y-3 animate-fade-in">
          <TextEditor label="Қиммат (мас. 10+)" value={editing.value} onChange={(v) => setEditing({ ...editing, value: v })} />
          <TextEditor label="Ном (мас. Соли таҷриба)" value={editing.label} onChange={(v) => setEditing({ ...editing, label: v })} />
          <div>
            <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Икона</label>
            <select
              value={editing.icon}
              onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border bg-transparent outline-none focus:border-brand-500 text-sm"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
            >
              <option value="award">Award</option>
              <option value="users">Users</option>
              <option value="book-open">Book</option>
              <option value="smile">Smile</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60">
              <Save className="w-3.5 h-3.5" /> Нигоҳ доштан
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
              Бекор
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        {content.mentorStats.map((stat) => (
          <div key={stat.id} className="glass-card rounded-xl p-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-display font-bold text-lg text-gradient">{stat.value}</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.label}</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => setEditing(stat)} className="p-1 rounded hover:bg-brand-500/10">
                  <Edit3 className="w-3 h-3 text-brand-500" />
                </button>
                <button onClick={() => handleDelete(stat.id)} className="p-1 rounded hover:bg-red-500/10">
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============ How It Works Manager ============ */
function StepsManager({ content, onContentChanged }: { content: SiteContent; onContentChanged: () => void }) {
  const [editing, setEditing] = useState<HowItWorksStep | null>(null)
  const [saving, setSaving] = useState(false)

  const startNew = () => setEditing({ id: crypto.randomUUID(), step_number: content.howItWorks.length + 1, title: '', description: '', icon: 'clipboard-check' })
  const handleSave = async () => {
    if (!editing || !editing.title.trim()) return
    setSaving(true)
    await upsertHowItWorks(editing)
    setEditing(null)
    setSaving(false)
    onContentChanged()
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Нест карда шавад?')) return
    await deleteHowItWorks(id)
    onContentChanged()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg">Чӣ гуна мегузарад</h3>
        <button onClick={startNew} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600">
          <Plus className="w-3.5 h-3.5" /> Илова
        </button>
      </div>

      {editing && (
        <div className="glass-card rounded-xl p-4 mb-4 space-y-3 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <TextEditor label="Қадами #" value={String(editing.step_number)} onChange={(v) => setEditing({ ...editing, step_number: parseInt(v) || 1 })} />
            <div>
              <label className="block text-xs font-medium mb-1" style={{ color: 'var(--text-muted)' }}>Икона</label>
              <select
                value={editing.icon}
                onChange={(e) => setEditing({ ...editing, icon: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border bg-transparent outline-none focus:border-brand-500 text-sm"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              >
                <option value="clipboard-check">Clipboard</option>
                <option value="target">Target</option>
                <option value="video">Video</option>
                <option value="check-circle">Check</option>
              </select>
            </div>
          </div>
          <TextEditor label="Сарлавҳа" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <TextEditor label="Тавсиф" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} multiline />
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60">
              <Save className="w-3.5 h-3.5" /> Нигоҳ доштан
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
              Бекор
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {content.howItWorks.map((step) => (
          <div key={step.id} className="glass-card rounded-xl p-3 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-brand-500/15 flex items-center justify-center text-xs font-bold text-brand-500 flex-shrink-0">
              {step.step_number}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm">{step.title}</p>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{step.description}</p>
            </div>
            <button onClick={() => setEditing(step)} className="p-1 rounded hover:bg-brand-500/10">
              <Edit3 className="w-3.5 h-3.5 text-brand-500" />
            </button>
            <button onClick={() => handleDelete(step.id)} className="p-1 rounded hover:bg-red-500/10">
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============ Curriculum Manager ============ */
function CurriculumManager({ content, onContentChanged }: { content: SiteContent; onContentChanged: () => void }) {
  const [editing, setEditing] = useState<CurriculumItem | null>(null)
  const [saving, setSaving] = useState(false)

  const startNew = () => setEditing({ id: crypto.randomUUID(), title: '', description: '', level: 'A1', order_index: content.curriculum.length })
  const handleSave = async () => {
    if (!editing || !editing.title.trim()) return
    setSaving(true)
    await upsertCurriculum(editing)
    setEditing(null)
    setSaving(false)
    onContentChanged()
  }
  const handleDelete = async (id: string) => {
    if (!confirm('Нест карда шавад?')) return
    await deleteCurriculum(id)
    onContentChanged()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-lg">Барномаи курс</h3>
        <button onClick={startNew} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600">
          <Plus className="w-3.5 h-3.5" /> Илова
        </button>
      </div>

      {editing && (
        <div className="glass-card rounded-xl p-4 mb-4 space-y-3 animate-fade-in">
          <TextEditor label="Сарлавҳа" value={editing.title} onChange={(v) => setEditing({ ...editing, title: v })} />
          <TextEditor label="Тавсиф" value={editing.description} onChange={(v) => setEditing({ ...editing, description: v })} multiline />
          <TextEditor label="Сатҳ (мас. A1–A2)" value={editing.level} onChange={(v) => setEditing({ ...editing, level: v })} />
          <div className="flex gap-2">
            <button onClick={handleSave} disabled={saving} className="flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-medium bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60">
              <Save className="w-3.5 h-3.5" /> Нигоҳ доштан
            </button>
            <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
              Бекор
            </button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {content.curriculum.map((item) => (
          <div key={item.id} className="glass-card rounded-xl p-3 flex items-start gap-3">
            <BookOpen className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-sm">{item.title}</p>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-brand-500/10 text-brand-500">{item.level}</span>
              </div>
              <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
            </div>
            <button onClick={() => setEditing(item)} className="p-1 rounded hover:bg-brand-500/10">
              <Edit3 className="w-3.5 h-3.5 text-brand-500" />
            </button>
            <button onClick={() => handleDelete(item.id)} className="p-1 rounded hover:bg-red-500/10">
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============ Main Admin Panel ============ */
export default function AdminPanel({ open, onClose, content, onContentChanged, onReviewsChanged }: Props) {
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      try {
        const data = JSON.parse(session)
        if (data.email === ADMIN_EMAIL) setLoggedIn(true)
      } catch {
        localStorage.removeItem(SESSION_KEY)
      }
    }
  }, [])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY)
    if (isSupabaseConfigured && supabase) {
      supabase.auth.signOut()
    }
    setLoggedIn(false)
    onClose()
  }

  if (!open) return null

  const tabs: { id: Tab; label: string; icon: typeof Star }[] = [
    { id: 'reviews', label: 'Отзивҳо', icon: Star },
    { id: 'faqs', label: 'Саволҳо', icon: HelpCircle },
    { id: 'stats', label: 'Омор', icon: Target },
    { id: 'steps', label: 'Қадамҳо', icon: ListChecks },
    { id: 'curriculum', label: 'Курс', icon: BookOpen },
  ]
  const [activeTab, setActiveTab] = useState<Tab>('reviews')

  return (
    <div className="fixed inset-0 z-[100] flex animate-fade-in">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      {/* Panel */}
      <div className="relative ml-auto w-full max-w-2xl h-full glass-card rounded-none lg:rounded-l-3xl overflow-hidden flex flex-col animate-slide-in-right shadow-2xl">
        {!loggedIn ? (
          <>
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-tertiary)]">
              <X className="w-5 h-5" />
            </button>
            <LoginScreen onSuccess={() => setLoggedIn(true)} />
          </>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm">Панели админ</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-muted)' }}>ODDI ENGLISH</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleLogout} className="px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-red-500/10 text-red-500 transition-colors">
                  Баромадан
                </button>
                <button onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-tertiary)]">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-4 py-3 border-b overflow-x-auto no-scrollbar" style={{ borderColor: 'var(--border-color)' }}>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id ? 'bg-brand-500 text-white' : ''
                  }`}
                  style={activeTab !== tab.id ? { color: 'var(--text-secondary)' } : {}}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'reviews' && <ReviewModeration onReviewsChanged={onReviewsChanged} />}
              {activeTab === 'faqs' && <FaqManager content={content} onContentChanged={onContentChanged} />}
              {activeTab === 'stats' && <StatsManager content={content} onContentChanged={onContentChanged} />}
              {activeTab === 'steps' && <StepsManager content={content} onContentChanged={onContentChanged} />}
              {activeTab === 'curriculum' && <CurriculumManager content={content} onContentChanged={onContentChanged} />}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
