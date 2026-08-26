"use client"

import { useState, useEffect } from 'react'
import { Plus, Save, Edit3, Trash2, Target, Star, Award, Users, Loader2, AlertCircle } from 'lucide-react'
import type { MentorStat } from '@/lib/types'
import { upsertMentorStat, deleteMentorStat } from '@/lib/data'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

const ICON_OPTIONS = [
  { key: 'star', label: 'Ситора', Icon: Star },
  { key: 'award', label: 'Мукофот', Icon: Award },
  { key: 'users', label: 'Корбарон', Icon: Users },
  { key: 'target', label: 'Ҳадаф', Icon: Target },
]

const getIconComp = (icon?: string) => ICON_OPTIONS.find(o => o.key === icon)?.Icon || Target

export default function StatsManager() {
  const [items, setItems] = useState<MentorStat[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [editing, setEditing] = useState<MentorStat | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const fetchStats = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }
    setLoading(true)
    setLoadError(null)
    const { data, error } = await supabase
      .from('mentor_stats')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('GET mentor_stats хатогӣ:', error)
      setLoadError('Маълумот бор нашуд: ' + error.message)
    } else if (data) {
      setItems(data as MentorStat[])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const startNew = () => {
    setEditing({
      id: crypto.randomUUID(),
      label: '',
      value: '',
      icon: 'award',
      order_index: items.length,
    })
  }

  const handleSave = async () => {
    if (!editing || !editing.label.trim() || !editing.value.trim()) return
    setSaving(true)

    try {
      const result = await upsertMentorStat(editing)

      if (result && result.error) {
        setSaving(false)
        return
      }

      setEditing(null)
      await fetchStats()
    } catch (error) {
      console.error("Хатогӣ ҳангоми захиракунӣ:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Шумо мутмаин ҳастед, ки ин омор нест карда шавад?')) return
    setDeletingId(id)

    try {
      const result = await deleteMentorStat(id)

      if (result && result.error) {
        setDeletingId(null)
        return
      }

      await fetchStats()
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
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Боргирии оморҳо...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="font-display font-bold text-lg">Омори ментор</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Рақамҳое, ки дар саҳифаи асосӣ намоён мешаванд
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
          <button onClick={fetchStats} className="ml-auto text-xs font-semibold underline underline-offset-2 shrink-0">
            Аз нав кӯшиш
          </button>
        </div>
      )}

      {items.length === 0 && !loadError ? (
        <div className="text-center py-16 glass-card rounded-2xl border border-dashed" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <Target className="w-9 h-9 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">Ҳоло ягон омор илова нашудааст</p>
          <p className="text-xs mt-1 opacity-70">Тугмаи "Илова кардан"-ро пахш кунед</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {items.map((item: any) => {
            const IconComp = getIconComp(item.icon)
            const isDeleting = deletingId === item.id
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-5 border relative group transition-all duration-200 hover:shadow-lg hover:border-brand-500/30"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shrink-0">
                    <IconComp className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditing(item)}
                      className="p-1.5 rounded-lg hover:bg-brand-500/10 transition-colors"
                    >
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

                <p className="font-display font-extrabold text-2xl leading-tight">{item.value}</p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{item.label}</p>

                <span className="absolute top-4 right-4 text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--bg-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: 'var(--text-muted)' }}>
                  #{item.order_index ?? 0}
                </span>
              </div>
            )
          })}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-[450px] border-0">
          <DialogHeader>
            <DialogTitle>
              {isNewItem ? 'Омори нав' : 'Таҳрири омор'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Нишондиҳанда (мас: 5+, 10K)
              </label>
              <input
                type="text"
                value={editing?.value || ''}
                onChange={(e) => setEditing(editing ? { ...editing, value: e.target.value } : null)}
                placeholder="5+"
                className="w-full px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-brand-500 text-sm transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Номгӯй (мас: Солҳои таҷриба)
              </label>
              <input
                type="text"
                value={editing?.label || ''}
                onChange={(e) => setEditing(editing ? { ...editing, label: e.target.value } : null)}
                placeholder="Солҳои таҷриба..."
                className="w-full px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-brand-500 text-sm transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Нишона
              </label>
              <div className="grid grid-cols-4 gap-2">
                {ICON_OPTIONS.map(({ key, label, Icon }) => {
                  const active = editing?.icon === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setEditing(editing ? { ...editing, icon: key } : null)}
                      className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border text-[10px] font-medium transition-all ${
                        active
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
              disabled={saving || !editing?.label.trim() || !editing?.value.trim()}
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