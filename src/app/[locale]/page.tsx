'use client';

import AboutMentor from "@/src/components/AboutMentor";
import Curriculum from "@/src/components/Curriculum";
import FAQ from "@/src/components/FAQ";
import Footer from "@/src/components/Footer";
import Hero from "@/src/components/Hero";
import HowItWorks from "@/src/components/HowItWorks";
import Navbar from "@/src/components/Navbar";
import Reviews from "@/src/components/Reviews";
import { useScrollReveal } from "@/src/hooks/useScrollReveal";
import { fetchContent, fetchApprovedReviews } from "@/src/lib/data";
import { SiteContent, Review } from "@/src/lib/types";
import { useState, useCallback, useEffect } from 'react';

const defaultContent: SiteContent = {
  faqs: [],
  mentorStats: [],
  howItWorks: [],
  curriculum: [],
};

export default function Home() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [adminOpen, setAdminOpen] = useState(false);
  const [contentVersion, setContentVersion] = useState(0);

  useScrollReveal();

  const loadContent = useCallback(async () => {
    const data = await fetchContent();
    if (data) setContent(data);
  }, []);

  const loadReviews = useCallback(async () => {
    const data = await fetchApprovedReviews();
    if (data) setReviews(data);
  }, []);

  useEffect(() => {
    loadContent();
    loadReviews();
  }, [loadContent, loadReviews, contentVersion]);

  const handleContentChanged = () => setContentVersion((v) => v + 1);
  const handleReviewsChanged = () => setContentVersion((v) => v + 1);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground selection:bg-blue-500/30">
      <Navbar />
      <Hero />

      <section className="border-y border-border bg-secondary/30 py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground lg:justify-between lg:px-8">
          <span>Омӯзиши зинда</span>
          <span>Гурӯҳи дӯстона</span>
          <span>Методикаи санҷидашуда</span>
          <span>Натиҷаи воқеӣ</span>
        </div>
      </section>

      <Curriculum items={content.curriculum} />
      <HowItWorks steps={content.howItWorks} />
      <AboutMentor stats={content.mentorStats} />

      <Reviews reviews={reviews} onReviewSubmitted={handleReviewsChanged} />

      <FAQ faqs={content.faqs} />
      <Footer />
    </main>
  );
}