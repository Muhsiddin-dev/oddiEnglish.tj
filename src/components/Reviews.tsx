import { useState, useRef, type ReactNode } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation, Autoplay } from 'swiper/modules'
import { Star, Quote, X, Upload, Image as ImageIcon, Video, Loader as Loader2, CircleCheck as CheckCircle, Plus } from 'lucide-react'


import type { Review } from '../lib/types'
import { submitReview } from '../lib/data'

interface Props {
  reviews?: Review[]
  onReviewSubmitted?: () => void
}

function StarRating({
  value,
  onChange,
  readOnly = false,
}: {
  value: number
  onChange?: (v: number) => void
  readOnly?: boolean
}) {
  const [hover, setHover] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readOnly}
          onClick={() => onChange?.(star)}
          onMouseEnter={() => !readOnly && setHover(star)}
          onMouseLeave={() => !readOnly && setHover(0)}
          className={`${readOnly ? 'cursor-default' : 'cursor-pointer'} transition-transform ${
            !readOnly ? 'hover:scale-125' : ''
          }`}
        >
          <Star
            className={`w-6 h-6 ${
              (hover || value) >= star
                ? 'fill-brand-500 text-brand-500'
                : 'text-[var(--border-color)]'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="glass-card rounded-3xl p-7 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white font-display font-bold text-lg">
            {review.full_name.charAt(0)}
          </div>
          <div>
            <p className="font-display font-bold text-base">{review.full_name}</p>
            <div className="flex gap-0.5 mt-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i <= review.rating ? 'fill-brand-500 text-brand-500' : 'text-[var(--border-color)]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <Quote className="w-8 h-8 text-brand-500/20" />
      </div>

      <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
        "{review.comment}"
      </p>

      {/* {review.media_urls && review.media_urls.length > 0 && (
        <div className="mt-4 flex gap-2 flex-wrap">
          {review.media_urls.map((url, i) =>
            review.media_types[i] === 'video' ? (
              <video
                key={i}
                src={url}
                controls
                className="w-20 h-20 rounded-lg object-cover"
              />
            ) : (
              <img
                key={i}
                src={url}
                alt="Review media"
                className="w-20 h-20 rounded-lg object-cover"
              />
            ),
          )}
        </div>
      )} */}

      <p className="mt-4 pt-4 border-t text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}>
        {new Date(review.created_at).toLocaleDateString('tg-TJ', { year: 'numeric', month: 'long', day: 'numeric' })}
      </p>
    </div>
  )
}

function ReviewForm({ onClose, onSubmitted }: { onClose: () => void; onSubmitted: () => void }) {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || [])
    const valid = selected.filter((f) => f.type.startsWith('image/') || f.type.startsWith('video/'))
    if (valid.length === 0) return
    setFiles((prev) => [...prev, ...valid].slice(0, 5))
    const newPreviews = valid.map((f) => URL.createObjectURL(f))
    setPreviews((prev) => [...prev, ...newPreviews].slice(0, 5))
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => {
      URL.revokeObjectURL(prev[index])
      return prev.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim() || !comment.trim()) {
      setError('Лутфан ном ва матнро пур кунед.')
      return
    }
    setLoading(true)
    setError('')
    const result = await submitReview(fullName.trim(), phone.trim(), rating, comment.trim(), files)
    setLoading(false)
    if (result.success) {
      setSuccess(true)
      onSubmitted()
      setTimeout(() => onClose(), 2500)
    } else {
      setError(result.error || 'Хатогӣ рух дод.')
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-500/15 flex items-center justify-center mb-4 animate-scale-in">
          <CheckCircle className="w-8 h-8 text-brand-500" />
        </div>
        <h3 className="font-display font-bold text-xl mb-2">Ташаккур!</h3>
        <p className="text-sm max-w-xs" style={{ color: 'var(--text-secondary)' }}>
          Отзиви шумо қабул шуд. Пас аз тасдиқи админ он дар сайт пайдо мешавад.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-bold text-xl">Отзиви нав</h3>
        <button type="button" onClick={onClose} className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-[var(--bg-tertiary)]">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Star rating */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Баҳо
        </label>
        <StarRating value={rating} onChange={setRating} />
      </div>

      {/* Full name */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Ному фамилия *
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Ном ва фамилияи шумо"
          className="w-full px-4 py-3 rounded-xl border bg-transparent outline-none focus:border-brand-500 transition-colors"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Рақами телефон
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+992 90 123 45 67"
          className="w-full px-4 py-3 rounded-xl border bg-transparent outline-none focus:border-brand-500 transition-colors"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
        />
      </div>

      {/* Comment */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Отзив *
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Таҷрибаи худро мубодагӣ кунед..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border bg-transparent outline-none focus:border-brand-500 transition-colors resize-none"
          style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
          required
        />
      </div>

      {/* <div>
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
          Сурат ё видео (ихтиёрӣ — то 5 файл)
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full border-2 border-dashed rounded-xl py-6 flex flex-col items-center gap-2 transition-colors hover:border-brand-500 hover:bg-brand-500/5"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <Upload className="w-6 h-6 text-brand-500" />
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            Файлро аз компютер интихоб кунед
          </span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            JPG, PNG, MP4 — то 50MB
          </span>
        </button>

        {previews.length > 0 && (
          <div className="mt-3 flex gap-2 flex-wrap">
            {previews.map((preview, i) => (
              <div key={i} className="relative group">
                {files[i].type.startsWith('video') ? (
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <Video className="w-6 h-6 text-white/60" />
                  </div>
                ) : (
                  <img src={preview} alt="Preview" className="w-20 h-20 rounded-lg object-cover" />
                )}
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div> */}

      {error && (
        <p className="text-sm text-red-500 bg-red-500/10 rounded-lg px-4 py-2">{error}</p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed">
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Ирсол...
          </>
        ) : (
          'Ирсоли отзив'
        )}
      </button>
    </form>
  )
}

export default function Reviews({ reviews = [], onReviewSubmitted }: Props) {
  const [showForm, setShowForm] = useState(false)

  return (
    <section id="reviews" className="section-py relative overflow-hidden">
      <div className="glow-orb w-[400px] h-[400px] bg-brand-500/10 top-1/3 -right-20" />

      <div className="max-w-7xl mx-auto container-px relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <div className="section-badge mb-5">ОТЗИВҲО</div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl mb-4">
              Чӣ мегӯянд{' '}
              <span className="text-gradient">хонандагон</span>
            </h2>
            <p className="text-lg max-w-xl" style={{ color: 'var(--text-secondary)' }}>
              200+ отзив аз хонандагоне, ки бо мо англисиро ёд гирифтанд
            </p>
          </div>
          <button onClick={() => setShowForm(true)} className="btn-primary group self-start lg:self-auto">
            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Отзиви худро илова кунед
          </button>
        </div>

        {/* Swiper carousel */}
        {reviews && reviews.length > 0 ? (
          <div className="reveal reveal-delay-2">
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              pagination={{ clickable: true }}
              navigation
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="!pb-12"
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id} className="!h-auto pb-2">
                  <ReviewCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="glass-card rounded-2xl p-12 text-center reveal">
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              Ҳоло отзивҳо нест. Аввалин шуда отзив диҳед!
            </p>
          </div>
        )}
      </div>

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 animate-fade-in">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="relative w-full max-w-lg glass-card rounded-3xl max-h-[90vh] overflow-y-auto no-scrollbar animate-scale-in">
            <ReviewForm onClose={() => setShowForm(false)} onSubmitted={() => onReviewSubmitted?.()} />
          </div>
        </div>
      )}
    </section>
  )
}