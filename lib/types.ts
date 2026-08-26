export type ReviewStatus = 'pending' | 'approved' | 'rejected'

export interface Review {
  id: string
  full_name: string
  phone: string
  rating: number
  comment: string
  media_urls: string[]
  media_types: string[]
  status: ReviewStatus
  created_at: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
  order_index: number
}

export interface MentorStat {
  id: string
  label: string
  value: string
  icon: string
  order_index: number
}

export interface HowItWorksStep {
  id: string
  step_number: number
  title: string
  description: string
  icon: string
}

export interface CurriculumItem {
  id: string
  title: string
  description: string
  level: string
  order_index?: number
}

export interface SiteContent {
  faqs: FaqItem[]
  mentorStats: MentorStat[]
  howItWorks: HowItWorksStep[]
  curriculum: CurriculumItem[]
}
