"use client"
import { useState, useEffect, useCallback } from 'react'
import { Loader2, Star, CircleCheck as CheckCircle, Clock, Trash2 } from 'lucide-react'
import type { Review } from '@/lib/types'
import { deleteReview, fetchAllReviews, updateReviewStatus } from '@/lib/data'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending')

  const load = useCallback(async () => {
    setLoading(true)
    const data = await fetchAllReviews()
    setReviews(data || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const filtered = filter === 'all' ? reviews : reviews.filter((r) => r.status === filter)

  const handleApprove = async (id: string) => {
    await updateReviewStatus(id, 'approved')
    load()
  }

  const handleReject = async (id: string) => {
    await updateReviewStatus(id, 'rejected')
    load()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Шумо мутмаин ҳастед, ки ин отзивро нест мекунед?')) return
    await deleteReview(id)
    load()
  }

  return (
    <div>
      <div className="flex md:flex-row flex-col md:items-center items-start md:gap-0 gap-2 justify-between mb-5">
        <h3 className="font-display font-bold text-lg">Отзивҳо</h3>
        <div className="flex  gap-1 p-1 rounded-xl" style={{ background: 'var(--bg-tertiary)' }}>
          {(['pending', 'approved', 'rejected', 'all'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 w-full py-1.5 rounded-lg text-xs font-medium transition-all ${
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
        <div className="space-y-3 grid md:grid-cols-3 grid-cols-1 ">
          {filtered.map((review) => (
            <div key={review.id} className="glass-card rounded-xl p-4 border" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white text-sm font-bold">
                    {review.full_name ? review.full_name.charAt(0) : 'U'}
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