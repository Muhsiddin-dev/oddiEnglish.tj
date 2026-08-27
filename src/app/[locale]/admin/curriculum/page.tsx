"use client"

import { useState, useEffect } from 'react'
import { Plus, Edit3, Trash2, BookOpen, Loader2, AlertCircle } from 'lucide-react'
import type { CurriculumItem } from '@/src/lib/types'
import { upsertCurriculum, deleteCurriculum } from '@/src/lib/data'
import { supabase, isSupabaseConfigured } from '@/src/lib/supabase'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/src/components/ui/dialog"

const LEVEL_COLORS: Record<string, string> = {
  A1: 'bg-emerald-500/15 text-emerald-500',
  A2: 'bg-teal-500/15 text-teal-500',
  B1: 'bg-blue-500/15 text-blue-500',
  B2: 'bg-indigo-500/15 text-indigo-500',
  C1: 'bg-purple-500/15 text-purple-500',
  C2: 'bg-pink-500/15 text-pink-500',
  Beginner: 'bg-amber-500/15 text-amber-500',
}

const getLevelColor = (level?: string) => LEVEL_COLORS[level || ''] || 'bg-brand-500/15 text-brand-500'

export default function CurriculumManagerPage() {
  const [items, setItems] = useState<CurriculumItem[]>([])
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [editing, setEditing] = useState<CurriculumItem | null>(null)
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    fetchCurriculum()
  }, [])

  const fetchCurriculum = async () => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false)
      return
    }
    setLoading(true)
    setLoadError(null)
    const { data, error } = await supabase
      .from('curriculum')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('GET curriculum хатогӣ:', error)
      setLoadError('Маълумот бор нашуд: ' + error.message)
    } else if (data) {
      setItems(data as CurriculumItem[])
    }
    setLoading(false)
  }

  const startNew = () => {
    setEditing({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      level: 'A1',
      order_index: items.length,
    })
  }

  const handleSave = async () => {
    if (!editing || !editing.title.trim()) return
    setSaving(true)

    try {
      const result = await upsertCurriculum(editing)

      if (!result || !result.success) {
        return
      }

      setEditing(null)
      // Аз нав бор кардани маълумоти тоза аз база
      await fetchCurriculum()
    } catch (error) {
      console.error("Хатогӣ ҳангоми захиракунӣ:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Ин мавзӯъ нест карда шавад?')) return
    setDeletingId(id)

    try {
      const result = await deleteCurriculum(id)

      if (!result || !result.success) {
        return
      }

      // Аз нав бор кардани маълумоти тоза аз база
      await fetchCurriculum()
    } catch (error) {
      console.error("Хатогӣ ҳангоми несткунӣ:", error)
    } finally {
      setDeletingId(null)
    }
  }

  const isNewItem = !items.some(i => i.id === editing?.id)

  if (loading && items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center py-16 gap-3">
        <Loader2 className="w-7 h-7 animate-spin text-brand-500" />
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Боргирии барномаи курс...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="font-display font-bold text-lg">Барномаи курс (Curriculum)</h3>
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>
            Мавзӯъҳо ва мӯҳтавои дарсҳо
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
          <button onClick={fetchCurriculum} className="ml-auto text-xs font-semibold underline underline-offset-2 shrink-0">
            Аз нав кӯшиш
          </button>
        </div>
      )}

      {items.length === 0 && !loadError ? (
        <div className="text-center py-16 glass-card rounded-2xl border border-dashed" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
          <BookOpen className="w-9 h-9 mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">Ҳоло ягон мавзӯъ илова нашудааст</p>
          <p className="text-xs mt-1 opacity-70">Тугмаи "Илова кардан"-ро пахш кунед</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const isDeleting = deletingId === item.id
            return (
              <div
                key={item.id}
                className="glass-card rounded-2xl p-4 flex items-start gap-4 border transition-all duration-200 hover:shadow-lg hover:border-brand-500/30 group"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getLevelColor(item.level)}`}>
                      {item.level}
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
            )
          })}
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-[450px] border-0">
          <DialogHeader>
            <DialogTitle>
              {isNewItem ? 'Мавзӯи нав' : 'Таҳрири мавзӯъ'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Сатҳ (Level)
              </label>
              <input
                type="text"
                value={editing?.level || ''}
                onChange={(e) => setEditing(editing ? { ...editing, level: e.target.value } : null)}
                placeholder="Масалан: A1, 3 бор/ҳафта, Иловагӣ..."
                className="w-full px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-brand-500 text-sm transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
            </div>

            <div>
              <label className="block text-xs font-medium mb-1.5" style={{ color: 'var(--text-muted)' }}>
                Сарлавҳаи мавзӯъ
              </label>
              <input
                type="text"
                value={editing?.title || ''}
                onChange={(e) => setEditing(editing ? { ...editing, title: e.target.value } : null)}
                placeholder="Мӯҳтавои дарси..."
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
                placeholder="Тавсифи дарс..."
                rows={3}
                className="w-full px-3 py-2.5 rounded-xl border bg-transparent outline-none focus:border-brand-500 text-sm resize-none transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
              />
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
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {saving ? 'Дар ҳоли захира...' : 'Нигоҳ доштан'}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}