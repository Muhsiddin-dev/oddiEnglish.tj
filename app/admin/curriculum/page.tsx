"use client"
import CurriculumManager from '@/components/admin/CurriculumManager'
import type { SiteContent } from '@/lib/types'

export default function CurriculumPage() {
  const dummyContent = {} as SiteContent
  const handleContentChanged = () => {}

  return (
    <CurriculumManager
      content={dummyContent} 
      onContentChanged={handleContentChanged} 
    />
  )
}