# Portfolio — Next.js · TypeScript · Tailwind · GSAP · Lenis

## التشغيل / Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## تعديل المحتوى / Edit content
كل البيانات في ملف واحد: `src/data/portfolio.ts`
(الاسم، النبذة، الخدمات، الخبرات، المشاريع، الأدوات، آراء العملاء، اللينكات).

- صور المشاريع: حطيها في `public/projects/` واكتبي في المشروع `image: "/projects/name.jpg"`.
- لو مفيش صورة، بيظهر placeholder ملوّن تلقائياً.
- المشاريع اللي عليها `featured: true` بتظهر في قسم الكروت الكبيرة، وكل المشاريع بتظهر في Projects List وليها صفحة تفاصيل `/projects/<slug>`.
- الـ CV: حطيه في `public/cv.pdf` وغيّري `cvUrl: "/cv.pdf"`.

## Sections & motion
| Section | Motion |
|---|---|
| Preloader | name reveal, 000→100 counter, clip-path wipe |
| Hero | char-by-char name reveal, signature draw, floating glow orbs, scroll parallax |
| What I do | heading char reveal, GSAP accordion |
| Experience | scroll-scrubbed timeline line + popping dots |
| Featured work | sticky stacked cards that scale/dim, clip-path image reveal |
| Stack | staggered chips |
| Projects list | hover image preview following the cursor |
| Testimonials | two-way infinite marquee (slows on hover) |
| Contact | giant outlined name marquee driven by scroll velocity |
| Global | Lenis smooth scroll synced with ScrollTrigger, custom cursor, film grain, hide-on-scroll navbar |

## Deploy
Push to GitHub then import the repo on https://vercel.com/new (zero config).
