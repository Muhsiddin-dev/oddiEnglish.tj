"use client"

import { useState, useEffect } from 'react'
import {
  Plus, Save, Edit3, Trash2, ListChecks, Loader2, AlertCircle,
  Users, Check, Sparkles, BarChart3,
} from 'lucide-react'
import type { HowItWorksStep } from '@/src/lib/types'
import { upsertHowItWorks, deleteHowItWorks } from '@/src/lib/data'
import { supabase, isSupabaseConfigured } from '@/src/lib/supabase'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog"

const ICON_OPTIONS = [
  { key: 'sparkles', label: 'Назария', Icon: Sparkles },
  { key: 'users', label: 'Амалия', Icon: Users },
  { key: 'check', label: 'Вазифа', Icon: Check },
  { key: 'bar-chart-3', label: 'Рейтинг', Icon: BarChart3 },
]

const getIconComp = (icon?: string) => ICON_OPTIONS.find(o => o.key === icon)?.Icon || ListChecks

export default function StepsManager() {
  const [items, setItems] = useState<HowItWorksStep[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [editing, setEditing] = useState<HowItWorksStep | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchSteps = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }
    setLoading(true)
    setLoadError(null)
    const { data, error } = await supabase
      .from('how_it_works')
      .select('*')
      .order('step_number', { ascending: true })

    if (error) {
      console.error('GET how_it_works хатогӣ:', error)
      setLoadError('Маълумот бор нашуд: ' + error.message)
    } else if (data) {
      setItems(data as HowItWorksStep[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSteps()
  }, [])

  const startNew = () => {
    setEditing({
      id: crypto.randomUUID(),
      step_number: items.length + 1,
      title: '',
      description: '',
      icon: 'sparkles',
    } as any)
  }

  const handleSave = async () => {
    if (!editing || !editing.title.trim()) return
    setSaving(true)

    try {
      const result = await upsertHowItWorks(editing)

      if (result && result.error) {
        alert("Хатогӣ аз Supabase: " + result.error)
        setSaving(false)
        return
      }

      setEditing(null)
      await fetchSteps() // Гирифтани маълумоти навтарин аз база
    } catch (error) {
      console.error("Хатогӣ ҳангоми захиракунӣ:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Ин қадам нест карда шавад?')) return
    setDeletingId(id)

    try {
      const result = await deleteHowItWorks(id)

      if (result && result.error) {
        setDeletingId(null)
        return
      }

      await fetchSteps()
    } catch (error) {
      console.error("Хатогӣ ҳангоми несткунӣ:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const isNewItem = !items.some(i => i.id === editing?.id)

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center py-16 gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-brand-500" />
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Боргирии қадамҳо...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="font-display font-bold text-lg">Қадамҳо (Чӣ гуна мегузарад)</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Марҳилаҳои раванди таълим дар саҳифаи асосӣ
          </p>
        </div>
        <button
          onClick={startNew}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20"
        >
          <Plus className="w-3.5 h-3.5" /> Илова кардан
        </button>
      </div>

      {loadError && (
        <div className="flex items-center gap-2 text-sm text-red-500 bg-red-500/10 rounded-xl px-4 py-3 mb-4">
          <AlertCircle className="w-4 h-4 shrink-0" /> {loadError}
          <button onClick={fetchSteps} className="ml-auto text-xs font-semibold underline underline-offset-2 shrink-0">
            Аз нав кӯшиш
          </button>
        </div>
      )}

      {items.length === 0 && !loadError ? (
        <div className="text-center py-16 glass-card rounded-2xl border border-dashed" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <ListChecks className="w-9 h-9 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">Ҳоло ягон қадам илова нашудааст</p>
          <p className="text-xs mt-1 opacity-70">Тугмаи "Илова кардан"-ро пахш кунед</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item: any, idx) => {
            const IconComp = getIconComp(item.icon)
            const isDeleting = deletingId === item.id
            const isLast = idx === items.length - 1
            return (
              <div key={item.id} className="relative">
                {!isLast && (
                  <div
                    className="absolute left-[23px] top-12 bottom-[-12px] w-px"
                    style={{ background: 'var(--border-color)' }}
                  />
                )}
                <div
                  className="glass-card rounded-2xl p-4 flex items-start gap-4 border relative transition-all duration-200 hover:shadow-lg hover:border-brand-500/30 group"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shrink-0 relative z-10">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>

                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-brand-500/15 text-brand-500">
                        Қадами {item.step_number}
                      </span>
                    </div>
                    <p className="font-bold text-sm mb-0.5">{item.title}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>{item.description}</p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button onClick={() => setEditing(item)} className="p-1.5 rounded-lg hover:bg-brand-500/10 transition-colors">
                      <Edit3 className="w-3.5 h-3.5 text-brand-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={isDeleting}
                      className="p-1.5 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-3.5 h-3.5 text-red-500 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5 text-red-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-[450px] border-0">
          <DialogHeader>
            <DialogTitle>
              {isNewItem ? 'Қадами нав' : 'Таҳрири қадам'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Рақами қадам
              </label>
              <input
                type="number"
                value={editing?.step_number ?? ''}
                onChange={(e) => setEditing(editing ? { ...editing, step_number: Number(e.target.value) } : null)}
                className="w-full px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-brand-500 text-sm transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Сарлавҳа
              </label>
              <input
                type="text"
                value={editing?.title || ''}
                onChange={(e) => setEditing(editing ? { ...editing, title: e.target.value } : null)}
                placeholder="Сарлавҳаи қадам..."
                className="w-full px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-brand-500 text-sm transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Тавсиф
              </label>
              <textarea
                value={editing?.description || ''}
                onChange={(e) => setEditing(editing ? { ...editing, description: e.target.value } : null)}
                placeholder="Тавсифи муфассал..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-brand-500 text-sm resize-none transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Нишона
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ICON_OPTIONS.map(({ key, label, Icon }) => {
                  const active = (editing as any)?.icon === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setEditing(editing ? { ...editing, icon: key } as any : null)}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-[10px] font-medium transition-all ${active
                        ? 'bg-brand-500 border-brand-500 text-white shadow-sm shadow-brand-500/20'
                        : 'hover:bg-[var(--bg-tertiary)]'
                        }`}
                      style={!active ? { borderColor: 'var(--border-color)', color: 'var(--text-secondary)' } : {}}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2 justify-end mt-4">
            <button
              onClick={() => setEditing(null)}
              className="px-4 py-2 rounded-xl text-xs font-medium border transition-colors hover:bg-[var(--bg-tertiary)]"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
            >
              Бекор кардан
            </button>
            <button
              onClick={handleSave}
              disabled={saving || !editing?.title.trim()}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-brand-500 text-white hover:bg-brand-600 disabled:opacity-60 transition-colors shadow-sm shadow-brand-500/20"
            >
              {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              {saving ? 'Дар ҳоли захира...' : 'Нигоҳ доштан'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}