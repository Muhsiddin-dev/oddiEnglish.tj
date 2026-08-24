'use client';

import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/site-navbar';
import Hero from '@/components/site-hero';
import Curriculum from '@/components/site-curriculum';
import HowItWorks from '@/components/site-how-it-works';
import AboutMentor from '@/components/site-about-mentor';
import Reviews from '@/components/site-reviews';
import FAQ from '@/components/site-faq';
import Footer from '@/components/site-footer';
import AdminPanel from '@/components/admin-panel';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { fetchContent } from '@/lib/data';
import type { SiteContent } from '@/lib/types';

const defaultContent: SiteContent = {
  faqs: [],
  mentorStats: [],
  howItWorks: [],
  curriculum: [],
};

export default function Home() {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [adminOpen, setAdminOpen] = useState(false);
  const [contentVersion, setContentVersion] = useState(0);

  useScrollReveal();

  const loadContent = useCallback(async () => {
    const data = await fetchContent();
    setContent(data);
  }, []);

  useEffect(() => {
    loadContent();
  }, [loadContent, contentVersion]);

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
      <Reviews />
      <FAQ faqs={content.faqs} />
      <Footer onAdminClick={() => setAdminOpen(true)} />

      <AdminPanel
        open={adminOpen}
        onClose={() => setAdminOpen(false)}
        onContentChanged={handleContentChanged}
        onReviewsChanged={handleReviewsChanged}
      />
    </main>
  );
}
