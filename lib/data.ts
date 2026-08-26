import { supabase, isSupabaseConfigured } from './supabase'
import { defaultContent, defaultReviews } from './defaultData'
import type {
  Review,
  SiteContent,
  FaqItem,
  MentorStat,
  HowItWorksStep,
  CurriculumItem,
} from './types'

/* ---------- Reviews ---------- */

export async function fetchApprovedReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured || !supabase) return defaultReviews
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
  if (error || !data) return defaultReviews
  return data as Review[]
}

export async function fetchAllReviews(): Promise<Review[]> {
  if (!isSupabaseConfigured || !supabase) return defaultReviews
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
  if (error || !data) return defaultReviews
  return data as Review[]
}

export async function submitReview(
  fullName: string,
  phone: string,
  rating: number,
  comment: string,
  files: File[],
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Система ҳоло танзим нашудааст. Лутфан баъдтар кӯшиш кунед.' }
  }

  const mediaUrls: string[] = []
  const mediaTypes: string[] = []

  for (const file of files) {
    const ext = file.name.split('.').pop() || 'bin'
    const fileName = `reviews/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('review-media')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })
    if (uploadError) {
      return { success: false, error: 'Боркунии файл муяссар нашуд. Лутфан аз нав кӯшиш кунед.' }
    }
    const { data: urlData } = supabase.storage.from('review-media').getPublicUrl(fileName)
    mediaUrls.push(urlData.publicUrl)
    mediaTypes.push(file.type.startsWith('video') ? 'video' : 'image')
  }

  const { error: insertError } = await supabase.from('reviews').insert({
    full_name: fullName,
    phone,
    rating,
    comment,
    media_urls: mediaUrls,
    media_types: mediaTypes,
    status: 'pending',
  })

  if (insertError) {
    return { success: false, error: 'Ирсоли отзив муяссар нашуд. Лутфен аз нав кӯшиш кунед.' }
  }

  return { success: true }
}

export async function updateReviewStatus(
  id: string,
  status: 'approved' | 'rejected' | 'pending',
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('reviews').update({ status }).eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteReview(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('reviews').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

/* ---------- Site Content ---------- */

export async function fetchContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured || !supabase) return defaultContent

  const [faqRes, statsRes, stepsRes, curRes] = await Promise.all([
    supabase.from('faqs').select('*').order('order_index', { ascending: true }),
    supabase.from('mentor_stats').select('*').order('order_index', { ascending: true }),
    supabase.from('how_it_works').select('*').order('step_number', { ascending: true }),
    supabase.from('curriculum').select('*').order('order_index', { ascending: true }),
  ])

  return {
    faqs: faqRes.data && faqRes.data.length > 0 ? (faqRes.data as FaqItem[]) : defaultContent.faqs,
    mentorStats:
      statsRes.data && statsRes.data.length > 0
        ? (statsRes.data as MentorStat[])
        : defaultContent.mentorStats,
    howItWorks:
      stepsRes.data && stepsRes.data.length > 0
        ? (stepsRes.data as HowItWorksStep[])
        : defaultContent.howItWorks,
    curriculum:
      curRes.data && curRes.data.length > 0
        ? (curRes.data as CurriculumItem[])
        : defaultContent.curriculum,
  }
}

export async function upsertFaq(item: FaqItem): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('faqs').upsert(item, { onConflict: 'id' })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteFaq(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('faqs').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function upsertMentorStat(
  item: MentorStat,
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('mentor_stats').upsert(item, { onConflict: 'id' })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteMentorStat(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('mentor_stats').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function upsertHowItWorks(
  item: HowItWorksStep,
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('how_it_works').upsert(item, { onConflict: 'id' })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteHowItWorks(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('how_it_works').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function upsertCurriculum(
  item: CurriculumItem,
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('curriculum').upsert(item, { onConflict: 'id' })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function deleteCurriculum(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) return { success: false, error: 'Not configured' }
  const { error } = await supabase.from('curriculum').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  return { success: true }
}
