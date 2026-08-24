import type { SiteContent } from './types'

export const defaultContent: SiteContent = {
  faqs: [
    {
      id: 'd-faq-1',
      question: 'Курсҳои англисӣ чӣ гуна мегузаранд?',
      answer:
        'Дарсҳо тавассути Zoom дар шакли онлайн мегузаранд. Ҳар як дарс дар навор гирифта шуда, ба шумо дастрас карда мешавад, то ки онро дар вақти озод аз нав тамошо кунед.',
      order_index: 0,
    },
    {
      id: 'd-faq-2',
      question: 'Барои оғози курс чӣ даркор аст?',
      answer:
        'Танҳо ҳавас ва интернет. Мо ҳама маводҳои дарсиро ҳозир мекунем — аз китобҳо то видеомаводҳо. Шумо танҳо бояд дарсҳоро пайравӣ кунед.',
      order_index: 1,
    },
    {
      id: 'd-faq-3',
      question: 'Агар сатҳи ман паст бошад, чӣ?',
      answer:
        'Мо барои ҳар сатҳ — аз навбигин то пешрафта — барномаи алоҳида дорем. Аввал сатҳи шуморо месанҷем ва баъд барномаи мувофиқро пешниҳод мекунем.',
      order_index: 2,
    },
    {
      id: 'd-faq-4',
      question: 'Мӯҳлати курс чанд аст?',
      answer:
        'Барномаи асосӣ 3 моҳ давом мекунад, аммо шумо метавонед барномаи кӯтоҳтар ё дарозтар интихоб кунед. Ҳар моҳ 12 дарс гузаронида мешавад.',
      order_index: 3,
    },
    {
      id: 'd-faq-5',
      question: 'Пул баргаштан мумкин аст?',
      answer:
        'Бале, агар дар 7 рӯзи аввал аз курс розӣ нашавед, пули шумо пурра бармегардад — бе ягон савол.',
      order_index: 4,
    },
  ],
  mentorStats: [
    { id: 'd-stat-1', label: 'Соли таҷриба', value: '10+', icon: 'award', order_index: 0 },
    { id: 'd-stat-2', label: 'Хонандагон', value: '500+', icon: 'users', order_index: 1 },
    { id: 'd-stat-3', label: 'Курсҳои тайёр', value: '15', icon: 'book-open', order_index: 2 },
    { id: 'd-stat-4', label: 'Сатҳи қаноатмандӣ', value: '98%', icon: 'smile', order_index: 3 },
  ],
  howItWorks: [
    {
      id: 'd-step-1',
      step_number: 1,
      title: 'Санҷиши ройгон',
      description:
        'Аввал сатҳи англисии шуморо месанҷем, то барномаи дурустро тарҳрезӣ кунем. Ин санҷиш ройгон ва танҳо 15 дақиқа давом мекунад.',
      icon: 'clipboard-check',
    },
    {
      id: 'd-step-2',
      step_number: 2,
      title: 'Барномаи шахсӣ',
      description:
        'Бар асоси натиҷаҳои санҷиш, мо барномаи таълимиро мувофиқи ҳадафҳо ва вақти шумо месозем.',
      icon: 'target',
    },
    {
      id: 'd-step-3',
      step_number: 3,
      title: 'Дарсҳои онлайн',
      description:
        'Дарсҳо тавассути Zoom мегузаранд. Ҳар дарс 60-90 дақиқа давом мекунад ва дар навор гирифта мешавад.',
      icon: 'video',
    },
    {
      id: 'd-step-4',
      step_number: 4,
      title: 'Машқ ва назорат',
      description:
        'Баъди ҳар дарс машқҳои амалӣ дода мешаванд. Мо пешравии шуморо ҳар ҳафта месанҷем ва баҳо медиҳем.',
      icon: 'check-circle',
    },
  ],
  curriculum: [
    {
      id: 'd-cur-1',
      title: 'Грамматикаи асосӣ',
      description:
        'Замонҳо, шартҳо, нумбҳо ва сохтори ҷумла — ҳама чизе ки барои суханани дуруст лозим аст.',
      level: 'A1–A2',
      order_index: 0,
    },
    {
      id: 'd-cur-2',
      title: 'Сухангӯӣ ва талаффуз',
      description:
        'Машқҳои талаффуз, сухани ройгон ва муколамаҳои амалӣ барои тавсеъи луғат.',
      level: 'B1–B2',
      order_index: 1,
    },
    {
      id: 'd-cur-3',
      title: 'Хондан ва навиштан',
      description:
        'Стратегияҳои хониши тез, навиштани эссе ва фаҳмиши матнҳои мураккаб.',
      level: 'B2–C1',
      order_index: 2,
    },
    {
      id: 'd-cur-4',
      title: 'Англисӣ барои кор',
      description:
        'CV, суҳбати кор, эмаилҳои касбӣ ва луғати тиҷоратӣ.',
      level: 'B1+',
      order_index: 3,
    },
    {
      id: 'd-cur-5',
      title: 'Омодагӣ ба IELTS/TOEFL',
      description:
        'Стратегияҳои имтиҳон, машқҳои тестӣ ва кор бо модулҳои асосӣ.',
      level: 'B2–C1',
      order_index: 4,
    },
    {
      id: 'd-cur-6',
      title: 'Англисӣ дар ҳаёти рӯзмарра',
      description:
        'Сайёҳӣ, харид, муошират ва фаҳмиши фарҳанги англисзабонҳо.',
      level: 'A2–B1',
      order_index: 5,
    },
  ],
}

export const defaultReviews = [
  {
    id: 'd-rev-1',
    full_name: 'Алишер Раҳимов',
    phone: '+992 901 234567',
    rating: 5,
    comment:
      'Назар акосан олиҷаноб меъмор! Дар 3 моҳ сатҳи ман аз A2 ба B4 расид. Усули таълимаш фаҳмо ва дилчасп аст. Тавсия мекунам!',
    media_urls: [],
    media_types: [],
    status: 'approved' as const,
    created_at: new Date().toISOString(),
  },
  {
    id: 'd-rev-2',
    full_name: 'Малика Юсуфова',
    phone: '+992 918 765432',
    rating: 5,
    comment:
      'Ман барои омодагӣ ба IELTS меомӯхтам ва натиҷаи 7.5 гирифтам! Назар ҳар як қисмати имтиҳонро аъло шарҳ дод. Ташаккур!',
    media_urls: [],
    media_types: [],
    status: 'approved' as const,
    created_at: new Date().toISOString(),
  },
  {
    id: 'd-rev-3',
    full_name: 'Умед Холов',
    phone: '+992 934 112233',
    rating: 4,
    comment:
      'Курс хеле писандид. Дарсҳо ҷолиб ва фоиданок. Якто ягона — баъзе машқҳо зиёд буданд, аммо ин барои пешравӣ хуб аст.',
    media_urls: [],
    media_types: [],
    status: 'approved' as const,
    created_at: new Date().toISOString(),
  },
]
