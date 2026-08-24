import { useState, useEffect, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import AboutMentor from './components/AboutMentor'
import HowItWorks from './components/HowItWorks'
import Curriculum from './components/Curriculum'
import Reviews from './components/Reviews'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import { fetchContent, fetchApprovedReviews } from './lib/data'
import { defaultContent, defaultReviews } from './lib/defaultData'
import type { SiteContent, Review } from './lib/types'

function AppContent() {
  useScrollReveal()

  const [content, setContent] = useState<SiteContent>(defaultContent)
  const [reviews, setReviews] = useState<Review[]>(defaultReviews)
  const [adminOpen, setAdminOpen] = useState(false)

  const loadContent = useCallback(async () => {
    const data = await fetchContent()
    setContent(data)
  }, [])

  const loadReviews = useCallback(async () => {
    const data = await fetchApprovedReviews()
    setReviews(data)
  }, [])

  useEffect(() => {
    loadContent()
    loadReviews()
  }, [loadContent, loadReviews])

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <AboutMentor stats={content.mentorStats} />
        <HowItWorks steps={content.howItWorks} />
        <Curriculum items={content.curriculum} />
        <Reviews reviews={reviews} onReviewSubmitted={loadReviews} />
        <FAQ faqs={content.faqs} />
      </main>
      <Footer onAdminClick={() => setAdminOpen(true)} />
      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        content={content}
        onContentChanged={loadContent}
        onReviewsChanged={loadReviews}
      />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
