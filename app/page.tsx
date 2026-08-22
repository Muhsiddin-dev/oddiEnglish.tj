'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  Clock3,
  Headphones,
  Instagram,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Quote,
  Send,
  Sparkles,
  Star,
  User,
  Users,
  Video,
  X,
  Zap,
} from 'lucide-react';

const navItems = [
  ['Курс', '#course'],
  ['Чӣ гуна мегузарад', '#process'],
  ['Дар бораи ментор', '#mentor'],
  ['Шогирдон', '#students'],
  ['Саволҳо', '#faq'],
  ['Алоқа', '#contact'],
];

const modules = [
  {
    number: '01',
    title: 'Грамматика',
    description: 'Асосҳоро қадам ба қадам бо ду зина аз худ кунед.',
    meta: 'Beginner ва Elementary',
    icon: BookOpen,
    tone: 'blue',
  },
  {
    number: '02',
    title: 'Видеодарсҳо',
    description: 'Дарсҳои кӯтоҳ барои омӯзиши мустақил бо калимаҳо ва тестҳо.',
    meta: '60+ дарси амалӣ',
    icon: Video,
    tone: 'sky',
  },
  {
    number: '03',
    title: 'Муошират',
    description: 'Он чизеро, ки омӯхтед, дар муҳити зинда истифода баред.',
    meta: '3 бор дар ҳафта',
    icon: MessageCircle,
    tone: 'cyan',
  },
  {
    number: '04',
    title: 'Сири забономӯзӣ',
    description: 'Топ-7 усули самаранок ва аудиокитоби 1001 калима.',
    meta: 'Мукофоти иловагӣ',
    icon: Headphones,
    tone: 'indigo',
  },
];

const steps = [
  { number: '01', title: 'Теорияи кӯтоҳ', text: 'Ҳар мавзӯъро дар 15 дақиқа бо забони сода мефаҳмед.', icon: Sparkles },
  { number: '02', title: 'Амалияи муошират', text: 'Дар эфири зинда бо гурӯҳ ҳар ҳафта сухан мегӯед.', icon: Users },
  { number: '03', title: 'Вазифаи хонагӣ', text: 'Мавзӯъро бо тестҳо ва супоришҳои равшан мустаҳкам мекунед.', icon: Check },
  { number: '04', title: 'Низоми рейтинг', text: 'Пешрафтатонро мебинед ва барои қадами нав ҳавасманд мемонед.', icon: BarChart3 },
];

const initialReviews = [
  { name: 'Манижа', role: 'Шогирди курс', quote: 'Ман баъд аз моҳи аввал тавонистам бо ҳамкоронам бо англисӣ озодтар суҳбат кунам.', initials: 'М', color: 'from-blue-500 to-cyan-400' },
  { name: 'Фаррух', role: 'Аз сатҳи сифр', quote: 'Дарсҳо хеле фаҳмоанд. Муҳимаш ин аст, ки ҳар ҳафта натиҷаи худро ҳис мекунӣ.', initials: 'Ф', color: 'from-sky-500 to-blue-600' },
  { name: 'Ситора', role: 'Шогирди ODDI', quote: 'Муоширати зинда тарси маро аз гап задан бартараф кард. Ташаккур ба Назар!', initials: 'С', color: 'from-cyan-400 to-blue-500' },
];

const faqs = [
  ['Агар ман тамоман англисӣ надонам, метавонам ҳамроҳ шавам?', 'Албатта. Курс аз сатҳи Beginner оғоз мешавад ва тамоми шарҳҳо бо забони тоҷикӣ дода мешаванд.'],
  ['Дарсҳои зинда чӣ гуна мегузаранд?', 'Се бор дар як ҳафта дар гурӯҳи хурд эфири зинда дорем. Шумо бо ментор ва дигар шогирдон машқ мекунед.'],
  ['Чӣ гуна ба курс ҳамроҳ шавам?', 'Ба мо дар Telegram нависед, мо сатҳи шуморо муайян карда, қадамҳои сабти номро мефиристем.'],
  ['Нарх ва муҳлати курс чанд аст?', 'Нархи пурраи курс 499 сомонӣ барои 6 моҳ мебошад. Пардохт як маротиба анҷом дода мешавад.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [reviews, setReviews] = useState(initialReviews);
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setRating(0);
    setHoverRating(0);
    setName('');
    setPhone('');
    setComment('');
    setError('');
  };

  const closeModal = () => {
    setIsOpen(false);
    setSubmitted(false);
    resetForm();
  };

  const handleSubmit = () => {
    if (!name.trim()) return setError('Лутфан ному фамилияи худро нависед.');
    if (!phone.trim()) return setError('Лутфан рақами телефони худро нависед.');
    if (rating === 0) return setError('Лутфан бо ситора баҳо гузоред.');
    if (!comment.trim()) return setError('Лутфан каментии худро нависед.');

    const initials = name.trim().split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
    const palette = ['from-blue-500 to-cyan-400', 'from-sky-500 to-blue-600', 'from-cyan-400 to-blue-500'];

    setReviews((prev) => [
      { name: name.trim(), role: `Баҳо: ${rating}/5`, quote: comment.trim(), initials, color: palette[prev.length % palette.length] },
      ...prev,
    ]);
    setError('');
    setSubmitted(true);
  };

  const avgRating = (reviews.reduce((s, r) => s + (r.role.includes('Баҳо') ? Number(r.role.split(': ')[1].split('/')[0]) : 5), 0) / reviews.length).toFixed(1);

  return (
    <main className="min-h-screen overflow-hidden bg-[#080d17] text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-14%] top-[-12%] h-[520px] w-[520px] rounded-full bg-blue-600/10 blur-[130px]" />
        <div className="absolute right-[-10%] top-[20%] h-[430px] w-[430px] rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#080d17]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#top" className="flex items-center gap-2 text-[15px] font-bold tracking-[-0.03em]">
            <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-blue-500 shadow-[0_0_25px_rgba(59,130,246,.4)]"><Play className="ml-0.5 h-4 w-4 fill-white" /></span>
            oddienglish<span className="text-blue-400">.tj</span>
          </a>
          <nav className="hidden items-center gap-6 xl:flex">
            {navItems.map(([label, href]) => <a key={href} href={href} className="text-[13px] text-slate-400 transition hover:text-white">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500"><span className="text-white">TJ</span><span>/</span><span>RU</span><span>/</span><span>EN</span></div>
            <a href="#contact" className="rounded-full border border-white/15 px-4 py-2 text-[12px] font-semibold transition hover:border-blue-400 hover:text-blue-300">Ворид шудан</a>
          </div>
          <button aria-label="Меню" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg border border-white/10 p-2 text-slate-300 md:hidden">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
        {menuOpen && <div className="border-t border-white/[0.07] bg-[#0b1220] px-5 py-5 md:hidden"><div className="flex flex-col gap-4">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)} className="text-sm text-slate-300">{label}</a>)}<a href="#contact" className="mt-2 rounded-xl bg-blue-500 px-4 py-3 text-center text-sm font-semibold">Ворид шудан</a></div></div>}
      </header>

      <section id="top" className="relative mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-8">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/[0.08] px-3 py-2 text-[11px] font-semibold tracking-[0.12em] text-blue-300"><span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" /> ОМӮЗИШИ НАВИ АНГЛИСӢ</div>
            <h1 className="max-w-3xl text-[clamp(2.65rem,6vw,5.75rem)] font-bold leading-[.98] tracking-[-0.06em]">Ман ҳеҷ гоҳ<br /><span className="relative inline-block text-slate-400/70 line-through decoration-blue-400 decoration-2">англисӣ гуфта</span><br /><span className="blue-text-glow">наметавонам.</span></h1>
            <p className="mt-8 max-w-xl text-[16px] leading-7 text-slate-400">Курси омӯзиши англисӣ пурра бо забони тоҷикӣ — аз сатҳи сифр то озодона муошират кардан. Формати нави омӯзиш бо муоширати зинда.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"><a href="#contact" className="group inline-flex items-center justify-center gap-3 rounded-full bg-blue-500 px-6 py-3.5 text-sm font-bold shadow-[0_0_35px_rgba(59,130,246,.28)] transition hover:bg-blue-400">Бепул сар кардан <ArrowRight size={17} className="transition group-hover:translate-x-1" /></a><button onClick={() => setVideoOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-blue-400 hover:text-blue-300"><span className="grid h-6 w-6 place-items-center rounded-full bg-white/10"><Play size={11} className="ml-0.5 fill-current" /></span> Видеои муаррифӣ</button></div>
            <div className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-4 text-xs text-slate-500"><span className="flex items-center gap-2"><Check size={15} className="text-blue-400" /> Аз сатҳи сифр</span><span className="flex items-center gap-2"><Check size={15} className="text-blue-400" /> 6 моҳ дастрасӣ</span><span className="flex items-center gap-2"><Check size={15} className="text-blue-400" /> 3 эфири зинда</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -inset-10 rounded-full bg-blue-500/15 blur-[90px]" />
            <div className="relative rounded-[28px] border border-blue-300/20 bg-[#0d1728]/80 p-3 shadow-[0_24px_100px_rgba(0,0,0,.45)]"><div className="overflow-hidden rounded-[20px] border border-white/10"><Image src="/images/image.png" alt="Nazar Nazarov ва курси ODDI ENGLISH" width={1152} height={2048} priority className="h-auto w-full object-cover" /></div><div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#101c2f]/95 px-4 py-3 shadow-xl backdrop-blur"><span className="grid h-9 w-9 place-items-center rounded-full bg-blue-500/15 text-blue-300"><Star size={17} fill="currentColor" /></span><div><p className="text-[11px] font-bold text-white">4.9 / 5.0</p><p className="text-[10px] text-slate-500">Аз шогирдон</p></div></div></div>
            <div className="absolute -right-5 top-12 hidden rounded-2xl border border-white/10 bg-[#101c2f]/95 px-4 py-3 shadow-xl backdrop-blur sm:block"><p className="text-[10px] uppercase tracking-wider text-slate-500">Шогирдони фаъол</p><p className="mt-1 text-xl font-bold text-blue-300">2,400<span className="text-slate-500">+</span></p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/[0.06] bg-white/[0.015] py-6"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-600 lg:justify-between lg:px-8"><span>Омӯзиши зинда</span><span>Гурӯҳи дӯстона</span><span>Методикаи санҷидашуда</span><span>Натиҷаи воқеӣ</span></div></section>

      <section id="course" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">§ 02 — ШУМО ЧИРО МЕОМӮЗЕД</p><h2 className="section-title mt-4">Аз «Beginner» то<br /><span className="text-blue-400">муоширати озод.</span></h2></div><p className="max-w-sm text-sm leading-6 text-slate-500">Як система барои онҳое, ки мехоҳанд англисиро дар ҳаёти воқеӣ истифода баранд, на танҳо қоидаҳоро аз ёд кунанд.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{modules.map(({ number, title, description, meta, icon: Icon, tone }) => <article key={number} className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1523] p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-[#101b2c]"><div className={`absolute -right-10 -top-10 h-28 w-28 rounded-full bg-${tone}-500/10 blur-2xl`} /><div className="mb-10 flex items-center justify-between"><span className="text-xs font-bold text-slate-600">{number}</span><span className="grid h-10 w-10 place-items-center rounded-xl border border-blue-400/20 bg-blue-400/10 text-blue-300"><Icon size={19} /></span></div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-3 min-h-[70px] text-sm leading-6 text-slate-500">{description}</p><div className="mt-6 flex items-center gap-2 text-xs font-semibold text-blue-300"><span className="h-1 w-1 rounded-full bg-blue-400" />{meta}</div></article>)}</div></section>

      <section className="mx-auto max-w-7xl px-5 pb-24 lg:px-8 lg:pb-32"><div className="relative overflow-hidden rounded-[28px] border border-blue-400/15 bg-gradient-to-br from-[#101d32] via-[#0c1728] to-[#0a111d] px-6 py-10 md:px-12 md:py-14"><div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-[80px]" /><div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto]"><div><div className="mb-4 flex items-center gap-2 text-xs font-semibold text-blue-300"><Zap size={15} fill="currentColor" /> ҲАМИН ҲАФТА ОҒОЗ КУНЕД</div><h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">6 моҳ барои як қадами<br /><span className="text-blue-300">калон ба пеш.</span></h2><p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">Дастрасӣ ба тамоми модулҳо, эфири зинда, вазифаҳо ва ҷомеаи шогирдон.</p></div><div className="flex flex-col items-start gap-4 md:items-end"><div className="flex items-baseline gap-2"><span className="text-5xl font-bold">499</span><span className="text-lg text-slate-400">сомонӣ</span></div><a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#0b1220] transition hover:bg-blue-100">Ҷойи худро гиред <ArrowRight size={16} /></a></div></div></div></section>

      <section id="process" className="border-t border-white/[0.06] bg-[#0a111d] py-24 lg:py-32"><div className="mx-auto max-w-7xl px-5 lg:px-8"><div className="mb-14"><p className="eyebrow">§ 03 — ЧӢ ГУНА МЕГУЗАРАД</p><h2 className="section-title mt-4">Омӯзиш бо<br /><span className="text-blue-400">ритми шумо.</span></h2></div><div className="grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-4">{steps.map(({ number, title, text, icon: Icon }) => <div key={number} className="bg-[#0d1523] p-7 transition hover:bg-[#111d2e]"><div className="flex items-center justify-between"><span className="text-3xl font-bold text-blue-400/40">{number}</span><Icon size={20} className="text-blue-400" /></div><h3 className="mt-10 text-base font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-500">{text}</p></div>)}</div></div></section>

      <section id="mentor" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32"><div className="grid items-center gap-12 lg:grid-cols-[.86fr_1.14fr] lg:gap-20"><div className="relative mx-auto w-full max-w-md"><div className="absolute -inset-4 rounded-[30px] bg-blue-500/15 blur-2xl" /><div className="relative overflow-hidden rounded-[25px] border border-white/10 bg-[#0d1523] p-3"><Image src="/images/image copy.png" alt="Профили Nazarov.eng" width={1152} height={2048} className="h-[500px] w-full rounded-[18px] object-cover object-top opacity-90" /></div><div className="absolute -bottom-5 -right-5 rounded-2xl border border-blue-300/20 bg-[#111d2e] px-5 py-4"><p className="text-2xl font-bold text-blue-300">54K<span className="text-sm text-slate-500">+</span></p><p className="text-[10px] text-slate-400">пайравон дар Instagram</p></div></div><div><p className="eyebrow">§ 04 — ДАР БОРАИ МЕНТОР</p><h2 className="section-title mt-4">Омӯзгоре, ки<br /><span className="text-blue-400">шуморо мефаҳмад.</span></h2><p className="mt-7 max-w-xl text-[15px] leading-7 text-slate-400">Назар Назаров — методист, омӯзгори англисӣ ва блогер. Солҳо таҷрибаи омӯзишро ба як платформаи онлайн табдил дод, то ҳар як тоҷик тавонад англисиро бо роҳи дуруст омӯзад.</p><div className="mt-8 grid grid-cols-2 gap-4 border-y border-white/[0.08] py-6 sm:grid-cols-3"><div><p className="text-xl font-bold">10+</p><p className="mt-1 text-xs text-slate-500">сол таҷриба</p></div><div><p className="text-xl font-bold">2.4K</p><p className="mt-1 text-xs text-slate-500">шогирди фаъол</p></div><div><p className="text-xl font-bold">4.9/5</p><p className="mt-1 text-xs text-slate-500">баҳогузорӣ</p></div></div><a href="https://www.instagram.com/nazarov.eng" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-blue-300 transition hover:text-white"><Instagram size={17} /> @nazarov.eng <ArrowRight size={15} /></a></div></div></section>

      <section id="students" className="border-y border-white/[0.06] bg-[#0a111d] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">§ 05 — ФИДБАК АЗ ШОГИРДОН</p>
              <h2 className="section-title mt-4">
                Натиҷаи онҳо,<br />
                <span className="text-blue-400">илҳоми шумо.</span>
              </h2>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <div className="flex text-blue-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} fill="currentColor" />
                  ))}
                </div>
                {avgRating} аз 5
              </div>
              <button
                onClick={() => setIsOpen(true)}
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2.5 text-sm font-semibold text-[#0a111d] transition hover:opacity-90"
              >
                Гузоштани шарҳ
              </button>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {reviews.map(({ name, role, quote, initials, color }, idx) => (
              <article
                key={`${name}-${idx}`}
                className="group rounded-2xl border border-white/[0.08] bg-[#0d1523] p-6 transition hover:border-blue-400/30 hover:bg-[#0e1626]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${color} text-sm font-bold text-[#0a111d]`}>
                      {initials}
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{name}</p>
                      <p className="text-xs text-slate-500">{role}</p>
                    </div>
                  </div>
                  <Quote size={20} className="text-blue-400/40" />
                </div>
                <p className="mt-6 text-[15px] leading-7 text-slate-300">"{quote}"</p>
                <div className="mt-6 flex items-center gap-1 text-blue-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="currentColor" />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl border border-white/[0.08] bg-[#0d1523] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  {submitted ? 'Ташаккур!' : 'Шарҳи худро нависед'}
                </h3>
                <button onClick={closeModal} className="rounded-full p-1 text-slate-400 hover:bg-white/5 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              {submitted ? (
                <div className="mt-6 flex flex-col items-center gap-3 py-4 text-center">
                  <div className="flex text-blue-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={20} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-300">Шарҳи шумо бомуваффақият сабт шуд.</p>
                  <button
                    onClick={closeModal}
                    className="mt-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-[#0a111d]"
                  >
                    Пӯшидан
                  </button>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  <div className="flex justify-center gap-1 py-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      const value = i + 1;
                      return (
                        <button
                          key={value}
                          type="button"
                          onMouseEnter={() => setHoverRating(value)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => setRating(value)}
                          className="p-1 transition"
                        >
                          <Star
                            size={30}
                            fill={(hoverRating || rating) >= value ? 'currentColor' : 'none'}
                            className={(hoverRating || rating) >= value ? 'text-blue-400' : 'text-slate-600'}
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="relative">
                    <User size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ному фамилия"
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0a111d] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-400/50"
                    />
                  </div>

                  <div className="relative">
                    <Phone size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+992 __ ___ __ __"
                      className="w-full rounded-xl border border-white/[0.08] bg-[#0a111d] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-400/50"
                    />
                  </div>

                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Фикри худро дар бораи курс нависед..."
                    rows={4}
                    className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#0a111d] p-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-400/50"
                  />

                  {error && <p className="text-xs text-red-400">{error}</p>}

                  <button
                    onClick={handleSubmit}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 py-3 text-sm font-semibold text-[#0a111d] transition hover:opacity-90"
                  >
                    <Send size={16} />
                    Фиристодани шарҳ
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>
      <section id="faq" className="mx-auto max-w-3xl px-5 py-24 lg:py-32"><div className="text-center"><p className="eyebrow">§ 06 — САВОЛҲОИ ШУМО</p><h2 className="section-title mt-4">Ҳама чиз<br /><span className="text-blue-400">равшан аст.</span></h2></div><div className="mt-12 space-y-3">{faqs.map(([question, answer], index) => <div key={question} className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1523]"><button onClick={() => setActiveFaq(activeFaq === index ? null : index)} className="flex w-full items-center justify-between gap-5 p-5 text-left text-sm font-semibold transition hover:text-blue-300 md:p-6"><span>{question}</span><ChevronDown size={18} className={`shrink-0 text-blue-400 transition ${activeFaq === index ? 'rotate-180' : ''}`} /></button>{activeFaq === index && <div className="px-5 pb-6 text-sm leading-6 text-slate-500 md:px-6">{answer}</div>}</div>)}</div></section>

      <footer id="contact" className="border-t border-white/[0.07] bg-[#060a12]"><div className="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end"><div><p className="eyebrow">§ 07 — АЛОҚА</p><h2 className="mt-5 max-w-xl text-4xl font-bold leading-tight tracking-tight md:text-5xl">Савол доред?<br /><span className="blue-text-glow">Нависед.</span></h2><p className="mt-6 max-w-md text-sm leading-6 text-slate-500">Барои сабти ном ё гирифтани маълумоти бештар ба мо дар Telegram нависед. Мо дар ҷавоби шумо ҳастем.</p></div><div className="lg:justify-self-end"><a href="https://t.me/nazaroveng" className="group flex items-center gap-4 rounded-2xl border border-blue-400/20 bg-blue-500/[0.08] p-5 transition hover:border-blue-400/50 hover:bg-blue-500/[0.14]"><span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-500 text-white"><MessageCircle size={22} /></span><span><span className="block text-xs text-slate-500">Ба мо нависед</span><span className="mt-1 block text-lg font-bold text-blue-300">@oddienglish <ArrowRight size={16} className="ml-1 inline transition group-hover:translate-x-1" /></span></span></a><p className="mt-4 text-right text-xs text-slate-600">Нарх: 499 сомонӣ барои 6 моҳ</p></div></div><div className="mt-20 flex flex-col justify-between gap-5 border-t border-white/[0.07] pt-7 text-xs text-slate-600 md:flex-row"><span>© 2024 ODDI ENGLISH. Ҳамаи ҳуқуқҳо ҳифз шудаанд.</span><span>Омӯзишро оддӣ кун.</span></div></div></footer>

      {videoOpen && <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-5 backdrop-blur-sm" onClick={() => setVideoOpen(false)}><div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d1523] p-3" onClick={(event) => event.stopPropagation()}><button aria-label="Бастан" onClick={() => setVideoOpen(false)} className="absolute right-5 top-5 z-10 rounded-full bg-black/50 p-2 text-white"><X size={18} /></button><div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#0a2e68] via-[#0b1730] to-black"><div className="text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-blue-500 shadow-[0_0_40px_rgba(59,130,246,.55)]"><Play className="ml-1 fill-white" /></div><p className="mt-5 text-sm font-semibold">Видеои муаррифии ODDI ENGLISH</p><p className="mt-2 text-xs text-slate-500">Назар Назаров — 01:42</p></div></div></div></div>}
    </main>
  );
}
