"use client"
import { useState, useEffect, useCallback } from 'react'
import { Plus, Save, Edit3, Trash2, HelpCircle, Loader2 } from 'lucide-react'
import type { FaqItem } from '@/lib/types'
import { supabase } from '@/lib/supabase'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function FaqAdmin({ onContentChanged }: { onContentChanged?: () => void }) {
  const [items, setItems] = useState<FaqItem[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<FaqItem | null>(null)
  const [saving, setSaving] = useState(false)

  // Функсияи бор кардани маълумот аз Supabase (монанди ReviewsPage)
  const loadFaqs = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index', { ascending: true })

    if (error) {
      console.error('Хатогӣ ҳангоми боркунӣ:', error.message)
    } else {
      setItems(data || [])
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    loadFaqs()
  }, [loadFaqs])

  const startNew = () => setEditing({
    id: crypto.randomUUID(),
    question: '',
    answer: '',
    order_index: items.length
  })

  const handleSave = async () => {
    if (!editing || !editing.question.trim()) return
    setSaving(true)

    try {
      const { error } = await supabase
        .from('faqs')
        .upsert({
          id: editing.id,
          question: editing.question,
          answer: editing.answer,
          order_index: editing.order_index ?? items.length
        })

      if (error) {
        console.error('Хатогӣ ҳангоми захиракунӣ:', error.message)
        alert('Хатогӣ: ' + error.message)
        setSaving(false)
        return
      }

      setEditing(null)
      loadFaqs() // Бор кардани маълумоти нав аз база

      if (typeof onContentChanged === 'function') {
        onContentChanged()
      }
    } catch (err) {
      console.error('Хатогии ғайричашмдошт:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Савол нест карда шавад?')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)

      if (error) {
        console.error('Хатогӣ ҳангоми несткунӣ:', error.message)
        alert('Хатогӣ: ' + error.message)
        return
      }

      loadFaqs() // Навсозии рӯйхат аз база

      if (typeof onContentChanged === 'function') {
        onContentChanged()
      }
    } catch (err) {
      console.error('Хатогии ғайричашмдошт:', err)
    }
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
        <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
  <DialogContent className="sm:max-w-[500px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-2xl">
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">
        {editing?.id ? 'Таҳрири савол' : 'Саволи нав'}
      </DialogTitle>
    </DialogHeader>

    <div className="space-y-4 py-4">
      <div>
        <label className="text-xs font-semibold text-zinc-500 mb-1 block">Савол</label>
        <input 
          type="text"
          value={editing?.question || ''}
          onChange={(e) => setEditing({ ...editing, question: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm outline-none focus:border-blue-500"
          placeholder="Саволро нависед..."
        />
      </div>
      <div>
        <label className="text-xs font-semibold text-zinc-500 mb-1 block">Ҷавоб</label>
        <textarea 
          rows={4}
          value={editing?.answer || ''}
          onChange={(e) => setEditing({ ...editing, answer: e.target.value })}
          className="w-full px-3 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent text-sm outline-none focus:border-blue-500 resize-none"
          placeholder="Ҷавобро нависед..."
        />
      </div>
    </div>

    <DialogFooter className="flex gap-2 justify-end">
      <button 
        onClick={() => setEditing(null)}
        className="px-4 py-2 rounded-lg text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
      >
        Бекор кардан
      </button>
      <button 
        onClick={handleSave}
        className="px-4 py-2 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        Нигоҳ доштан
      </button>
    </DialogFooter>
  </DialogContent>
</Dialog>
      )}

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
        </div>
      ) : items.length === 0 ? (
        <p className="text-center py-8 text-xs" style={{ color: 'var(--text-muted)' }}>Ҳоло ягон савол илова нашудааст.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="glass-card rounded-xl p-3 flex items-start gap-3 border" style={{ borderColor: 'var(--border-color)' }}>
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
      )}

    </div>
  )
}