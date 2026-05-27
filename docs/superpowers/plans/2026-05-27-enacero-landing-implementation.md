# Enacero Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the Claude Design HTML/CSS/JS prototype (`/tmp/enacero-bundle/enacero/project/`) into a production Next.js 16 landing page with pixel-fidelity to the prototype's visual output and animation polish.

**Architecture:** Next.js App Router with a single `app/page.tsx` composing ten section components. Design tokens live in `app/globals.css` via Tailwind v4's `@theme` block. Animations are React-native via Framer Motion. Smooth scroll provided by Lenis. No GSAP (Framer Motion's `useScroll` + `useTransform` covers the pinned horizontal scroll). No shadcn/ui (design is bespoke; raw HTML + Tailwind keeps it lean). Hero sparks remain a `<canvas>` particle system ported to a `useEffect`.

**Tech Stack:**
- Next.js 16 (App Router, TypeScript, static export ready)
- Tailwind CSS v4 (CSS-first config via `@theme`)
- Framer Motion (component motion + scroll-driven animations)
- Lenis (smooth scroll with controlled inertia)
- General Sans typeface (loaded via Fontshare CSS import)
- No GSAP, no shadcn/ui, no jQuery

**Reference files** (read-only, source of truth for visual output):
- `/tmp/enacero-bundle/enacero/project/Enacero Landing.html`
- `/tmp/enacero-bundle/enacero/project/styles.css`
- `/tmp/enacero-bundle/enacero/project/app.js`
- `/tmp/enacero-bundle/enacero/project/assets/logo.jpeg`

**Git rules (per user CLAUDE.md):**
- No automatic commits — every commit step ends with "Ask user before running `git commit`."
- No `git push` ever (only on explicit user request).
- Commit messages do NOT include co-author lines for Claude.

---

## File Structure

```
/home/avsolem/sites/enacero/
├── app/
│   ├── layout.tsx               # Root layout, fonts, metadata, Lenis provider
│   ├── page.tsx                 # Landing composition (all 10 sections)
│   ├── globals.css              # Tailwind v4 + @theme tokens + base styles
│   └── favicon.ico
├── components/
│   ├── Loader.tsx               # Cinematic loading screen
│   ├── ScrollProgress.tsx       # Right-edge copper progress bar
│   ├── Nav.tsx                  # Floating nav, scrolled state, theme toggle
│   ├── WhatsAppFAB.tsx          # Floating WhatsApp button with pulse ring
│   ├── LenisProvider.tsx        # Wraps app in Lenis smooth scroll
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Statement.tsx
│   │   ├── Cifras.tsx
│   │   ├── Productos.tsx        # Pinned horizontal scroll
│   │   ├── ProductoCard.tsx
│   │   ├── Sectores.tsx
│   │   ├── Proceso.tsx
│   │   ├── Cobertura.tsx
│   │   ├── Aliados.tsx
│   │   ├── CtaFinal.tsx
│   │   └── Footer.tsx
│   └── visuals/
│       ├── SparksCanvas.tsx     # Hero sparks particle system
│       ├── MexicoMap.tsx        # SVG map with path-drawing
│       ├── ProductoVisualBeam.tsx
│       ├── ProductoVisualTube.tsx
│       ├── ProductoVisualSheet.tsx
│       └── ProductoVisualRebar.tsx
├── hooks/
│   └── useTheme.ts              # Dark/light toggle persistence
├── public/
│   └── logo.jpeg                # Enacero logo (copied from bundle)
├── package.json
├── tsconfig.json
├── postcss.config.mjs
├── next.config.ts
├── .gitignore
└── README.md
```

---

## Task 1: Scaffold Next.js 16 + TypeScript + Tailwind v4

**Files:**
- Create: `/home/avsolem/sites/enacero/package.json`
- Create: `/home/avsolem/sites/enacero/tsconfig.json`
- Create: `/home/avsolem/sites/enacero/next.config.ts`
- Create: `/home/avsolem/sites/enacero/postcss.config.mjs`
- Create: `/home/avsolem/sites/enacero/.gitignore`

- [ ] **Step 1: Initialize project with create-next-app**

Run from `/home/avsolem/sites/enacero`:

```bash
cd /home/avsolem/sites/enacero
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --src-dir false \
  --import-alias "@/*" \
  --eslint \
  --turbopack \
  --use-npm \
  --yes
```

Expected: project files generated, no prompts.

- [ ] **Step 2: Verify versions**

```bash
cat package.json | grep -E '"next"|"react"|"tailwindcss"'
```

Expected: `next` >= 16, `tailwindcss` >= 4.

If `tailwindcss` is < 4, upgrade:

```bash
npm install tailwindcss@latest @tailwindcss/postcss@latest
```

- [ ] **Step 3: Confirm dev server runs**

```bash
npm run dev
```

Expected: dev server starts on port 3000 (or next available). Confirm by `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000` returns `200`. Then stop the server (Ctrl+C or kill the background process).

- [ ] **Step 4: Ask user before committing**

When ready to commit, ask the user: *"Quiero hacer commit del scaffold inicial. ¿Confirmas?"*

If user confirms:

```bash
cd /home/avsolem/sites/enacero
git init
git add .
git commit -m "scaffold: initialize next.js 16 + ts + tailwind v4 project"
```

---

## Task 2: Set up design tokens and General Sans typeface

**Files:**
- Modify: `/home/avsolem/sites/enacero/app/globals.css` (full rewrite)
- Modify: `/home/avsolem/sites/enacero/app/layout.tsx` (metadata, lang="es")

- [ ] **Step 1: Rewrite `app/globals.css` with full design system**

Replace the contents of `app/globals.css` with:

```css
@import url('https://api.fontshare.com/v2/css?f[]=general-sans@200,300,400,500,600,700,800&display=swap');
@import "tailwindcss";

@theme {
  /* Dark dominant backgrounds */
  --color-bg-0: #07080a;
  --color-bg-1: #0a0c10;
  --color-bg-2: #101216;
  --color-bg-3: #14171c;

  /* Light backgrounds */
  --color-bg-light: #f4f2ee;
  --color-bg-light-2: #ebe7df;

  /* Accents */
  --color-copper: #c26f3a;
  --color-copper-bright: #d98147;
  --color-copper-deep: #8f4f24;
  --color-navy: #1f2d7a;
  --color-navy-bright: #2a3da0;

  /* Neutrals */
  --color-n-100: #f4f2ee;
  --color-n-200: #d4d6d9;
  --color-n-400: #8a8f94;
  --color-n-600: #4a4d52;
  --color-n-700: #2a2d32;
  --color-n-800: #1a1d22;

  /* Typography */
  --font-sans: 'General Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --tracking-tight: -0.02em;
  --tracking-tighter: -0.035em;
  --tracking-tightest: -0.05em;

  /* Layout */
  --spacing-pad: clamp(20px, 4vw, 72px);
  --container-max: 1640px;

  /* Easings */
  --ease-out-soft: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-soft: cubic-bezier(0.65, 0, 0.35, 1);
}

:root {
  color-scheme: dark;
}

* { box-sizing: border-box; }

html, body {
  background: var(--color-bg-0);
  color: var(--color-n-100);
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

body { min-height: 100vh; }

img, svg { display: block; max-width: 100%; }

a { color: inherit; text-decoration: none; }

button { font: inherit; color: inherit; background: none; border: 0; cursor: pointer; }

::selection { background: var(--color-copper); color: var(--color-bg-0); }

/* Lenis */
html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: clip; }

/* Keyframes used across components */
@keyframes drift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(8%, -6%); }
}
@keyframes pin-ring {
  0% { transform: scale(.4); opacity: .8; }
  100% { transform: scale(2.5); opacity: 0; }
}
@keyframes fab-pulse {
  0% { transform: scale(.9); opacity: .8; }
  100% { transform: scale(1.25); opacity: 0; }
}
@keyframes scroll-hint {
  0% { transform: scaleY(0); }
  50% { transform: scaleY(1); }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
@keyframes mark-pulse {
  0%, 100% { opacity: .6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.05); }
}
@keyframes load-fill { to { width: 100%; } }
@keyframes marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```

- [ ] **Step 2: Rewrite `app/layout.tsx`**

Replace contents with:

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enacero — Encuentro Acerero MX · Distribución de Acero B2B",
  description:
    "Distribución de acero estructural, comercial, plano y de refuerzo para construcción e industria en México.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Verify tokens resolve**

Replace `app/page.tsx` temporarily with:

```tsx
export default function Page() {
  return (
    <main style={{ padding: 40 }}>
      <h1 style={{ color: "var(--color-copper)", fontSize: 48 }}>
        Enacero — token check
      </h1>
      <p style={{ color: "var(--color-n-200)" }}>
        General Sans should be loaded. Copper color visible above.
      </p>
    </main>
  );
}
```

Run `npm run dev`, open `http://localhost:3000`, confirm:
- Title shows in copper (`#c26f3a`)
- Body text in `--color-n-200` gray
- Font is General Sans (sans-serif geometric, distinct from system default)

- [ ] **Step 4: Copy logo asset**

```bash
cp "/tmp/enacero-bundle/enacero/project/assets/logo.jpeg" /home/avsolem/sites/enacero/public/logo.jpeg
```

- [ ] **Step 5: Ask user before committing**

When ready: *"Tokens y tipografía listos. ¿Hago commit?"*

```bash
git add .
git commit -m "feat(design-system): tailwind v4 tokens + general sans + base styles"
```

---

## Task 3: Install Framer Motion and Lenis

**Files:**
- Modify: `/home/avsolem/sites/enacero/package.json` (via npm install)
- Create: `/home/avsolem/sites/enacero/components/LenisProvider.tsx`

- [ ] **Step 1: Install dependencies**

```bash
cd /home/avsolem/sites/enacero
npm install framer-motion lenis
```

Confirm in `package.json` that `framer-motion` and `lenis` appear in `dependencies`.

- [ ] **Step 2: Create LenisProvider**

Create `components/LenisProvider.tsx`:

```tsx
"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
```

- [ ] **Step 3: Wire LenisProvider in layout**

Edit `app/layout.tsx` body to wrap children:

```tsx
import { LenisProvider } from "@/components/LenisProvider";

// ...inside RootLayout return:
<body>
  <LenisProvider>{children}</LenisProvider>
</body>
```

- [ ] **Step 4: Verify smooth scroll works**

Replace `app/page.tsx` with a tall test page:

```tsx
export default function Page() {
  return (
    <main>
      {Array.from({ length: 20 }).map((_, i) => (
        <section
          key={i}
          style={{
            height: "60vh",
            display: "grid",
            placeItems: "center",
            borderBottom: "1px solid #2a2d32",
          }}
        >
          <h2 style={{ fontSize: 32 }}>Section {i + 1}</h2>
        </section>
      ))}
    </main>
  );
}
```

Run `npm run dev` and scroll. Expected: scroll has buttery inertia (not instant snap). Confirm visually.

- [ ] **Step 5: Ask user before committing**

```bash
git add .
git commit -m "feat(motion): framer-motion + lenis smooth scroll provider"
```

---

## Task 4: Loader component

**Files:**
- Create: `/home/avsolem/sites/enacero/components/Loader.tsx`

- [ ] **Step 1: Implement Loader**

```tsx
"use client";

import { useEffect, useState } from "react";

export function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1700);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      aria-hidden={hidden}
      className={`fixed inset-0 z-[200] grid place-items-center bg-bg-0 transition-[opacity,visibility] duration-[900ms] ${
        hidden ? "pointer-events-none opacity-0 invisible" : "opacity-100"
      }`}
      style={{ transitionTimingFunction: "var(--ease-out-soft)" }}
    >
      <div className="flex w-[min(420px,70vw)] flex-col items-center gap-7">
        <div className="flex w-full justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-n-400">
          <span>ENACERO</span>
          <span>MX · 2026</span>
        </div>

        <div
          className="relative h-16 w-16"
          style={{ animation: "mark-pulse 2.4s var(--ease-in-out-soft) infinite" }}
        >
          <svg viewBox="0 0 64 64" width="64" height="64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="rgba(212,214,217,.25)" strokeWidth="1" />
            <path d="M32 12 L50 50 L42 50 L32 26 L22 50 L14 50 Z" fill="#c26f3a" />
            <path d="M32 26 L36 34 L28 34 Z" fill="#1f2d7a" />
          </svg>
        </div>

        <div className="relative h-[2px] w-full overflow-hidden bg-white/[.08]">
          <div
            className="absolute inset-0 w-0"
            style={{
              background:
                "linear-gradient(90deg, var(--color-copper-deep), var(--color-copper) 50%, var(--color-copper-bright))",
              animation: "load-fill 1.8s var(--ease-out-soft) forwards",
            }}
          />
        </div>

        <div className="flex w-full justify-between text-[11px] font-medium uppercase tracking-[0.12em] text-n-400">
          <span>Cargando experiencia</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Wire Loader in `app/page.tsx`**

Temporarily render only the Loader to verify:

```tsx
import { Loader } from "@/components/Loader";

export default function Page() {
  return (
    <>
      <Loader />
      <main className="min-h-screen" />
    </>
  );
}
```

Expected: on page load, dark screen shows ENACERO + spinning logo + filling copper bar for 1.7 seconds, then fades to empty page.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(loader): cinematic loading screen"
```

---

## Task 5: ScrollProgress + Nav

**Files:**
- Create: `/home/avsolem/sites/enacero/components/ScrollProgress.tsx`
- Create: `/home/avsolem/sites/enacero/components/Nav.tsx`
- Create: `/home/avsolem/sites/enacero/hooks/useTheme.ts`

- [ ] **Step 1: ScrollProgress component**

Create `components/ScrollProgress.tsx`:

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      aria-hidden
      className="fixed top-0 right-0 z-50 h-screen w-[2px] bg-white/[.04]"
    >
      <motion.div
        style={{
          height,
          background:
            "linear-gradient(180deg, var(--color-copper-bright), var(--color-copper))",
          boxShadow: "0 0 18px rgba(194,111,58,.6)",
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: useTheme hook**

Create `hooks/useTheme.ts`:

```ts
"use client";

import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = localStorage.getItem("enacero-theme") as "dark" | "light" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.classList.toggle("theme-light", stored === "light");
    }
  }, []);

  function toggle() {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("enacero-theme", next);
      document.documentElement.classList.toggle("theme-light", next === "light");
      return next;
    });
  }

  return { theme, toggle };
}
```

- [ ] **Step 3: Nav component**

Create `components/Nav.tsx`:

```tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "@/hooks/useTheme";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Principal"
      className={`fixed inset-x-0 top-0 z-[60] flex items-center justify-between transition-[background,backdrop-filter,padding] duration-[350ms] ${
        scrolled
          ? "border-b border-white/[.06] bg-bg-0/70 py-3 backdrop-blur-xl backdrop-saturate-[1.4]"
          : "py-[18px]"
      }`}
      style={{ paddingLeft: "var(--spacing-pad)", paddingRight: "var(--spacing-pad)" }}
    >
      <a href="#hero" className="flex items-center gap-3">
        <div className="h-[34px] w-[34px] overflow-hidden rounded-full bg-bg-2 shadow-[0_0_0_1px_rgba(255,255,255,.08),inset_0_0_0_1px_rgba(255,255,255,.04)]">
          <Image src="/logo.jpeg" alt="Enacero" width={34} height={34} className="h-full w-full object-cover" />
        </div>
        <div className="text-[15px] font-semibold uppercase tracking-[.14em] text-n-100">
          Enacero
          <small className="mt-0.5 block text-[9px] font-medium tracking-[.22em] text-copper">
            Encuentro Acerero MX
          </small>
        </div>
      </a>

      <div className="hidden items-center gap-1 md:flex">
        {["Productos", "Sectores", "Proceso", "Contacto"].map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            className="relative rounded-full px-4 py-2.5 text-[13px] font-medium tracking-[.04em] text-n-200 transition-colors duration-[250ms] hover:text-n-100"
          >
            {label}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={toggle}
          aria-label="Cambiar tema"
          className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/10 text-n-200 transition-colors hover:border-copper hover:text-copper"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        </button>
        <a
          href="https://wa.me/525548896854"
          aria-label="WhatsApp"
          className="grid h-[38px] w-[38px] place-items-center rounded-full border border-white/10 text-n-200 transition-colors hover:border-copper hover:text-copper"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M20.5 3.5A10.6 10.6 0 0 0 3.4 17.2L2 22l4.9-1.3A10.6 10.6 0 1 0 20.5 3.5Zm-8.4 16.3a8.7 8.7 0 0 1-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3a8.6 8.6 0 1 1 7 3.7Zm4.8-6.5c-.3-.1-1.5-.7-1.8-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
          </svg>
        </a>
        <a
          href="#contacto"
          className="inline-flex items-center gap-2 rounded-full bg-copper px-[18px] py-2.5 text-[13px] font-semibold text-bg-0 transition-colors hover:bg-copper-bright"
        >
          Cotizar
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Add to `app/page.tsx`**

```tsx
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Page() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Nav />
      <main className="min-h-[300vh]" />
    </>
  );
}
```

Verify in browser: nav renders at top, condenses on scroll. Right-edge copper bar grows as you scroll. WhatsApp + Cotizar buttons styled correctly.

- [ ] **Step 5: Ask user before committing**

```bash
git add .
git commit -m "feat(nav): floating nav with scroll state, theme toggle, scroll progress"
```

---

## Task 6: WhatsAppFAB

**Files:**
- Create: `/home/avsolem/sites/enacero/components/WhatsAppFAB.tsx`

- [ ] **Step 1: Build the component**

```tsx
export function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/525548896854"
      aria-label="WhatsApp directo"
      className="fixed bottom-6 right-6 z-[55] grid h-14 w-14 place-items-center rounded-full bg-copper text-bg-0 shadow-[0_16px_40px_-8px_rgba(194,111,58,.55),0_0_0_1px_rgba(255,255,255,.08)] transition-[transform,background] duration-300 hover:scale-110 hover:-translate-y-0.5 hover:bg-copper-bright"
    >
      <span
        aria-hidden
        className="absolute -inset-1.5 rounded-full border border-copper/40"
        style={{ animation: "fab-pulse 2.4s ease-out infinite" }}
      />
      <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
        <path d="M20.5 3.5A10.6 10.6 0 0 0 3.4 17.2L2 22l4.9-1.3A10.6 10.6 0 1 0 20.5 3.5Zm-8.4 16.3a8.7 8.7 0 0 1-4.4-1.2l-.3-.2-2.9.8.8-2.8-.2-.3a8.6 8.6 0 1 1 7 3.7Zm4.8-6.5c-.3-.1-1.5-.7-1.8-.8-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.6.1-1.6-.8-2.7-1.5-3.8-3.4-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.6.7.6-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
      </svg>
    </a>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { WhatsAppFAB } from "@/components/WhatsAppFAB";

// inside the fragment:
<WhatsAppFAB />
```

Verify in browser: fixed copper button bottom-right with pulsing ring animation.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(fab): whatsapp floating action button with pulse ring"
```

---

## Task 7: SparksCanvas (hero particle system)

**Files:**
- Create: `/home/avsolem/sites/enacero/components/visuals/SparksCanvas.tsx`

- [ ] **Step 1: Port the canvas particle system**

```tsx
"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
  size: number;
  hue: number;
};

export function SparksCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const particles: Particle[] = [];
    const MAX = 60;
    let rafId = 0;

    function resize() {
      if (!canvas || !ctx) return;
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function spawn() {
      const ox = w * (0.08 + Math.random() * 0.12);
      const oy = h * (0.68 + Math.random() * 0.12);
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
      const speed = 0.5 + Math.random() * 2.2;
      particles.push({
        x: ox,
        y: oy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - Math.random() * 0.5,
        life: 0,
        max: 80 + Math.random() * 80,
        size: 0.6 + Math.random() * 1.4,
        hue: 18 + Math.random() * 20,
      });
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      while (particles.length < MAX && Math.random() < 0.7) spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.035;
        p.vx *= 0.995;
        const lifeP = p.life / p.max;
        if (lifeP >= 1 || p.x < 0 || p.x > w || p.y > h) {
          particles.splice(i, 1);
          continue;
        }
        const alpha = (1 - lifeP) * 0.9;
        const sz = p.size * (1 - lifeP * 0.4);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 6);
        g.addColorStop(0, `hsla(${p.hue}, 95%, 70%, ${alpha})`);
        g.addColorStop(0.5, `hsla(${p.hue}, 95%, 55%, ${alpha * 0.3})`);
        g.addColorStop(1, `hsla(${p.hue}, 95%, 50%, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(${p.hue + 10}, 95%, 80%, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(step);
    }

    resize();
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 z-[-1] pointer-events-none opacity-90"
    />
  );
}
```

- [ ] **Step 2: Ask user before committing**

```bash
git add .
git commit -m "feat(visuals): hero sparks particle canvas"
```

---

## Task 8: Hero section

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/Hero.tsx`

- [ ] **Step 1: Build the Hero**

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SparksCanvas } from "@/components/visuals/SparksCanvas";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const steelY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-screen items-end overflow-hidden bg-bg-0"
      style={{ padding: "0 var(--spacing-pad) clamp(60px,8vw,100px)" }}
    >
      {/* Cinematic gradient background */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          y: mediaY,
          scale: mediaScale,
          background:
            "radial-gradient(ellipse 70% 60% at 50% 30%, rgba(194,111,58,.18), transparent 65%), radial-gradient(ellipse 90% 80% at 20% 90%, rgba(31,45,122,.22), transparent 60%), linear-gradient(180deg, #07080a 0%, #0a0c10 40%, #07080a 100%)",
        }}
      />

      {/* Drift gradient */}
      <div
        aria-hidden
        className="absolute -inset-1/5 -z-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 30% 70%, rgba(194,111,58,.12), transparent 35%)",
          animation: "drift 18s var(--ease-in-out-soft) infinite alternate",
        }}
      />

      <SparksCanvas />

      {/* Brushed steel divider */}
      <motion.div
        aria-hidden
        className="absolute inset-x-0 -z-10 h-px"
        style={{
          bottom: "22%",
          y: steelY,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(212,214,217,.18) 15%, rgba(212,214,217,.6) 50%, rgba(212,214,217,.18) 85%, transparent 100%)",
          boxShadow: "0 0 24px rgba(212,214,217,.06)",
        }}
      />

      {/* Vignette */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% 50%, transparent 50%, rgba(0,0,0,.55) 100%), linear-gradient(180deg, rgba(7,8,10,.4) 0%, transparent 25%, transparent 75%, rgba(7,8,10,.8) 100%)",
        }}
      />

      {/* Top meta */}
      <div
        className="absolute left-[var(--spacing-pad)] hidden items-center gap-3.5 md:flex"
        style={{ top: "clamp(100px,14vh,160px)" }}
      >
        <span className="text-[11px] font-medium uppercase tracking-[.22em] text-n-400">
          <strong className="font-medium text-n-100">01</strong> — Distribución de acero
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[.22em] text-n-400">
          CDMX · MX
        </span>
      </div>

      {/* Content */}
      <div
        className="relative z-[2] mx-auto grid w-full gap-7 md:gap-12"
        style={{ maxWidth: "var(--container-max)" }}
      >
        <h1
          className="font-medium"
          style={{
            fontSize: "clamp(56px,11vw,184px)",
            lineHeight: 0.92,
            letterSpacing: "var(--tracking-tightest)",
            textWrap: "balance",
            maxWidth: "14ch",
          }}
        >
          {["Acero", "que", "sostiene", "México."].map((word, i) => (
            <span key={i} className="inline-block overflow-hidden align-top">
              <motion.span
                className={`inline-block ${i === 3 ? "italic text-copper font-normal" : ""}`}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{
                  duration: 1.4,
                  delay: 1.7 + 0.15 * i,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
                {i < 3 ? " " : ""}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-10">
          <p className="max-w-[36ch] text-sm font-normal leading-[1.55] text-n-200">
            Distribuimos los perfiles, planos y refuerzos que levantan las obras más exigentes del país.
            Atención puntual. Inventario disponible. Entrega confiable.
          </p>
          <div className="flex flex-wrap gap-3.5">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-copper px-7 py-4 text-sm font-semibold text-bg-0 transition-colors hover:bg-copper-bright"
            >
              Cotizar
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
            <a
              href="#productos"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-n-100 transition-colors hover:border-n-100"
            >
              Ver productos
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 5v14M6 13l6 6 6-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[.25em] text-n-400 md:flex"
      >
        <span>Scroll</span>
        <span
          className="block h-8 w-px origin-top"
          style={{
            background: "linear-gradient(180deg, var(--color-n-400), transparent)",
            animation: "scroll-hint 2.2s var(--ease-in-out-soft) infinite",
          }}
        />
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";

// inside main:
<Hero />
```

Verify in browser: hero takes full viewport, tagline animates in word-by-word, sparks visible bottom-left, scroll-hint pulses at bottom.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(hero): cinematic hero with parallax, sparks canvas, word reveal"
```

---

## Task 9: Statement section (word-by-word reveal)

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/Statement.tsx`

- [ ] **Step 1: Build the component**

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const WORDS: Array<{ text: string; em?: boolean; accent?: boolean }> = [
  { text: "Distribuimos", em: true }, { text: "el" }, { text: "acero" }, { text: "que" },
  { text: "levanta" }, { text: "los" }, { text: "proyectos" }, { text: "más" },
  { text: "exigentes" }, { text: "de" }, { text: "México.", accent: true },
  { text: "Desde" }, { text: "la" },
  { text: "viga", em: true }, { text: "estructural", em: true },
  { text: "hasta" }, { text: "la" },
  { text: "varilla", em: true }, { text: "de", em: true }, { text: "obra.", em: true },
  { text: "Atención" }, { text: "puntual." },
  { text: "Seguimiento" }, { text: "continuo." },
  { text: "Capacidad" }, { text: "de" }, { text: "respuesta." },
];

export function Statement() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const visibleCount = useTransform(scrollYProgress, [0.15, 0.75], [0, WORDS.length]);

  return (
    <section
      ref={ref}
      className="relative bg-bg-0 text-n-100"
      style={{ padding: "clamp(120px,18vw,220px) var(--spacing-pad)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <p
          className="font-normal"
          style={{
            fontSize: "clamp(32px,5.4vw,88px)",
            lineHeight: 1.08,
            letterSpacing: "var(--tracking-tighter)",
            maxWidth: "22ch",
          }}
        >
          {WORDS.map((w, i) => (
            <StatementWord
              key={i}
              index={i}
              text={w.text}
              em={!!w.em}
              accent={!!w.accent}
              visibleCount={visibleCount}
            />
          ))}
        </p>

        <div
          className="mt-15 flex justify-between gap-10 border-t border-white/[.08] pt-8 text-xs uppercase tracking-[.15em] text-n-400"
          style={{ marginTop: "clamp(60px,8vw,100px)" }}
        >
          <span>02 · <strong className="font-medium text-n-100">Quiénes somos</strong></span>
          <span>Encuentro Acerero MX</span>
        </div>
      </div>
    </section>
  );
}

function StatementWord({
  index, text, em, accent, visibleCount,
}: {
  index: number;
  text: string;
  em: boolean;
  accent: boolean;
  visibleCount: import("framer-motion").MotionValue<number>;
}) {
  const color = useTransform(visibleCount, (v) =>
    v > index ? (accent ? "var(--color-copper)" : "var(--color-n-100)") : "var(--color-n-400)"
  );

  return (
    <motion.span
      className={`mr-[.22em] inline-block ${em ? "font-medium" : ""}`}
      style={{ color, transition: "color .8s var(--ease-out-soft)" }}
    >
      {text}
    </motion.span>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { Statement } from "@/components/sections/Statement";

// after Hero:
<Statement />
```

Verify: as you scroll past the section, words turn from gray to white (and "México." to copper) progressively.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(statement): scroll-driven word-by-word reveal"
```

---

## Task 10: Cifras section (animated counters)

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/Cifras.tsx`

- [ ] **Step 1: Build with Framer Motion's animate-on-view counter**

```tsx
"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

type Item = { plus?: boolean; target: number; unit?: string; label: string };

const ITEMS: Item[] = [
  { plus: true, target: 25, unit: "años", label: "Años de operación distribuyendo acero a la industria mexicana [placeholder]" },
  { plus: true, target: 800, label: "Proyectos atendidos en construcción e industria pesada [placeholder]" },
  { target: 14, unit: "estados", label: "Estados de cobertura para entrega directa de material [placeholder]" },
  { target: 4, label: "Certificaciones activas en calidad y procesos [placeholder]" },
];

export function Cifras() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });

  return (
    <section
      ref={ref}
      className="bg-bg-light text-[#14171c]"
      style={{ padding: "clamp(80px,12vw,160px) var(--spacing-pad)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div className="mb-15 flex flex-wrap items-end justify-between gap-10" style={{ marginBottom: "clamp(60px,8vw,100px)" }}>
          <div>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper-deep before:h-px before:w-6 before:bg-copper-deep before:content-['']" />
            <span className="mt-3 inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper-deep">
              <span className="h-px w-6 bg-copper-deep" />
              03 · Autoridad
            </span>
            <h2
              className="mt-3 font-medium"
              style={{
                fontSize: "clamp(28px,3.6vw,56px)",
                lineHeight: 1.05,
                letterSpacing: "var(--tracking-tighter)",
                maxWidth: "18ch",
              }}
            >
              Operación medible.<br />Resultados medibles.
            </h2>
          </div>
          <p className="max-w-[36ch] text-sm leading-[1.55] text-n-600">
            Cifras que respaldan la capacidad operativa, el alcance geográfico y los estándares con los que trabajamos cada proyecto.
          </p>
        </div>

        <div className="grid border-t border-[#14171c]/12 md:grid-cols-4 grid-cols-2">
          {ITEMS.map((item, i) => (
            <CifraCell key={i} item={item} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CifraCell({ item, inView }: { item: Item; inView: boolean }) {
  return (
    <div className="relative flex flex-col gap-4.5 border-r border-b border-[#14171c]/12 px-8 pt-10 pb-8 last:border-r-0 md:[&:nth-child(n+3)]:border-b-0 [&:nth-child(2n)]:border-r-0 md:[&:nth-child(2n)]:border-r md:[&:last-child]:border-r-0">
      <motion.div
        className="absolute left-0 top-[-1px] h-0.5 bg-copper"
        initial={{ width: 0 }}
        animate={inView ? { width: "60%" } : { width: 0 }}
        transition={{ duration: 1.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        className="flex items-baseline gap-1 font-medium text-[#14171c]"
        style={{
          fontSize: "clamp(64px,9vw,144px)",
          lineHeight: 0.9,
          letterSpacing: "var(--tracking-tightest)",
        }}
      >
        {item.plus && <span className="mr-1 font-normal text-copper">+</span>}
        <Counter target={item.target} inView={inView} />
        {item.unit && (
          <span className="ml-1.5 text-[.3em] font-normal tracking-normal text-n-600">{item.unit}</span>
        )}
      </div>
      <div className="max-w-[22ch] text-[13px] leading-[1.5] text-n-600">{item.label}</div>
    </div>
  );
}

function Counter({ target, inView }: { target: number; inView: boolean }) {
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (v) => Math.round(v).toString());
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(motionValue, target, {
      duration: 1.8,
      ease: [0.34, 1, 0.64, 1],
    });
    const unsub = rounded.on("change", (v) => {
      if (ref.current) ref.current.textContent = v;
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target, motionValue, rounded]);

  return <span ref={ref}>0</span>;
}
```

- [ ] **Step 2: Add to `app/page.tsx`** and verify

```tsx
import { Cifras } from "@/components/sections/Cifras";

// after Statement:
<Cifras />
```

Verify: on entry, copper bars fill (60%), numbers count up smoothly from 0 to target.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(cifras): animated counters on light background"
```

---

## Task 11: Producto visual SVG components

**Files:**
- Create: `/home/avsolem/sites/enacero/components/visuals/ProductoVisualBeam.tsx`
- Create: `/home/avsolem/sites/enacero/components/visuals/ProductoVisualTube.tsx`
- Create: `/home/avsolem/sites/enacero/components/visuals/ProductoVisualSheet.tsx`
- Create: `/home/avsolem/sites/enacero/components/visuals/ProductoVisualRebar.tsx`

- [ ] **Step 1: ProductoVisualBeam**

```tsx
export function ProductoVisualBeam() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(194,111,58,.15), transparent 70%), linear-gradient(180deg, #14171c 0%, #0a0c10 100%)",
      }}
    >
      <svg
        viewBox="0 0 600 480"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="g-beam" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#3a4048" />
            <stop offset=".5" stopColor="#8a8f94" />
            <stop offset="1" stopColor="#2a2d32" />
          </linearGradient>
          <linearGradient id="g-beam-side" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#4a4d52" />
            <stop offset="1" stopColor="#1a1d22" />
          </linearGradient>
        </defs>
        <g transform="translate(120 120) skewY(-12)">
          <rect x="0" y="0" width="360" height="40" fill="url(#g-beam)" />
          <rect x="160" y="40" width="40" height="200" fill="url(#g-beam-side)" />
          <rect x="0" y="240" width="360" height="40" fill="url(#g-beam)" />
        </g>
        <line x1="60" y1="380" x2="540" y2="380" stroke="#c26f3a" strokeWidth="1" opacity=".6" />
        <text x="60" y="402" fill="#c26f3a" fontFamily="General Sans" fontSize="11" letterSpacing="3">
          IPR · HSS · IPS
        </text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: ProductoVisualTube**

```tsx
export function ProductoVisualTube() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(circle at 70% 30%, rgba(31,45,122,.25), transparent 50%), linear-gradient(135deg, #0a0c10 0%, #14171c 50%, #0a0c10 100%)",
      }}
    >
      <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="g-tube" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#6a6f74" />
            <stop offset=".4" stopColor="#3a3d42" />
            <stop offset="1" stopColor="#1a1d22" />
          </linearGradient>
          <linearGradient id="g-tube-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8a8f94" />
            <stop offset="1" stopColor="#2a2d32" />
          </linearGradient>
        </defs>
        <g transform="translate(80 80)">
          <rect x="0" y="0" width="380" height="60" fill="url(#g-tube)" />
          <ellipse cx="380" cy="30" rx="14" ry="30" fill="url(#g-tube-r)" />
          <rect x="20" y="80" width="380" height="40" fill="url(#g-tube)" />
          <ellipse cx="400" cy="100" rx="10" ry="20" fill="url(#g-tube-r)" />
          <rect x="40" y="140" width="380" height="80" fill="url(#g-tube)" />
          <ellipse cx="420" cy="180" rx="18" ry="40" fill="url(#g-tube-r)" />
          <rect x="60" y="240" width="380" height="30" fill="url(#g-tube)" />
          <ellipse cx="440" cy="255" rx="8" ry="15" fill="url(#g-tube-r)" />
        </g>
        <line x1="60" y1="380" x2="540" y2="380" stroke="#c26f3a" strokeWidth="1" opacity=".6" />
        <text x="60" y="402" fill="#c26f3a" fontFamily="General Sans" fontSize="11" letterSpacing="3">
          PTR · ÁNGULOS · CANALES
        </text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 3: ProductoVisualSheet**

```tsx
export function ProductoVisualSheet() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(115deg, #14171c 0%, #20252b 30%, #2a3038 50%, #20252b 70%, #14171c 100%)",
      }}
    >
      <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="g-sheet" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#aaadb0" />
            <stop offset=".3" stopColor="#5a5d62" />
            <stop offset=".7" stopColor="#3a3d42" />
            <stop offset="1" stopColor="#1a1d22" />
          </linearGradient>
        </defs>
        <g transform="translate(120 120)">
          <ellipse cx="180" cy="120" rx="180" ry="100" fill="url(#g-sheet)" />
          <ellipse cx="180" cy="120" rx="120" ry="65" fill="#0a0c10" />
          <ellipse cx="180" cy="120" rx="90" ry="50" fill="#1a1d22" stroke="#3a3d42" strokeWidth="1" />
          <ellipse cx="180" cy="120" rx="60" ry="33" fill="#0a0c10" />
        </g>
        <line x1="60" y1="380" x2="540" y2="380" stroke="#c26f3a" strokeWidth="1" opacity=".6" />
        <text x="60" y="402" fill="#c26f3a" fontFamily="General Sans" fontSize="11" letterSpacing="3">
          LÁMINA · ROLLO · GALVANIZADO
        </text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 4: ProductoVisualRebar**

```tsx
export function ProductoVisualRebar() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: "linear-gradient(180deg, #0a0c10 0%, #14171c 100%)" }}
    >
      <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="g-rebar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#7a7d82" />
            <stop offset=".5" stopColor="#3a3d42" />
            <stop offset="1" stopColor="#1a1d22" />
          </linearGradient>
        </defs>
        <g transform="translate(80 80) rotate(-12 250 160)">
          <rect x="0" y="0" width="500" height="22" fill="url(#g-rebar)" />
          <g transform="translate(20 50)">
            <rect x="0" y="0" width="500" height="20" fill="url(#g-rebar)" />
          </g>
          <g transform="translate(-20 100)">
            <rect x="0" y="0" width="500" height="24" fill="url(#g-rebar)" />
          </g>
          <g transform="translate(40 160)">
            <rect x="0" y="0" width="500" height="18" fill="url(#g-rebar)" />
          </g>
          <g transform="translate(10 215)">
            <rect x="0" y="0" width="500" height="22" fill="url(#g-rebar)" />
          </g>
        </g>
        <line x1="60" y1="380" x2="540" y2="380" stroke="#c26f3a" strokeWidth="1" opacity=".6" />
        <text x="60" y="402" fill="#c26f3a" fontFamily="General Sans" fontSize="11" letterSpacing="3">
          VARILLA · MALLA · ALAMBRÓN
        </text>
      </svg>
    </div>
  );
}
```

- [ ] **Step 5: Ask user before committing**

```bash
git add .
git commit -m "feat(visuals): 4 producto SVG visuals (beam, tube, sheet, rebar)"
```

---

## Task 12: Productos section (pinned horizontal scroll)

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/ProductoCard.tsx`
- Create: `/home/avsolem/sites/enacero/components/sections/Productos.tsx`

- [ ] **Step 1: ProductoCard**

```tsx
import type { ReactNode } from "react";

export type Producto = {
  idx: string;
  eyebrow: string;
  title: string;
  sub: string;
  specs: string[];
  visual: ReactNode;
};

export function ProductoCard({ producto }: { producto: Producto }) {
  return (
    <article className="relative mr-8 flex h-full max-w-[1100px] flex-[0_0_78vw] grid-cols-[1.15fr_1fr] overflow-hidden border border-white/[.06] bg-bg-2 md:grid">
      <div className="relative min-h-[480px] overflow-hidden bg-bg-3">
        <span className="absolute left-6 top-6 z-[2] text-[11px] font-medium uppercase tracking-[.25em] text-n-400">
          {producto.idx}
        </span>
        <div className="absolute inset-0">{producto.visual}</div>
      </div>
      <div className="flex min-h-[480px] flex-col justify-between gap-8 p-10">
        <div>
          <span className="inline-flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[.22em] text-copper before:h-px before:w-6 before:bg-copper before:content-['']">
            <span className="h-px w-6 bg-copper" />
            {producto.eyebrow}
          </span>
          <h3
            className="mt-4.5 font-medium"
            style={{
              fontSize: "clamp(28px,3vw,48px)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-tighter)",
            }}
          >
            {producto.title}
          </h3>
          <p className="mt-2 max-w-[38ch] text-sm leading-[1.5] text-n-400">{producto.sub}</p>
        </div>
        <ul className="flex flex-col gap-3 border-t border-white/[.08] pt-6">
          {producto.specs.map((spec) => (
            <li key={spec} className="flex items-baseline gap-3.5 text-sm font-normal text-n-200 before:block before:h-1.5 before:w-1.5 before:flex-shrink-0 before:-translate-y-[2px] before:bg-copper before:content-['']" />
          ))}
        </ul>
        <a
          href="#"
          className="inline-flex items-center gap-2.5 self-start border-b border-white/20 pb-1.5 text-[13px] font-semibold tracking-[.04em] text-n-100 transition-colors hover:border-copper hover:text-copper"
        >
          Ver ficha técnica
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  );
}
```

Then fix the bullet list — `before:` pseudo doesn't work without content for the actual text. Replace the `<ul>` with proper rendering:

```tsx
<ul className="flex flex-col gap-3 border-t border-white/[.08] pt-6">
  {producto.specs.map((spec) => (
    <li key={spec} className="flex items-baseline gap-3.5 text-sm font-normal text-n-200">
      <span className="block h-1.5 w-1.5 flex-shrink-0 -translate-y-[2px] bg-copper" />
      {spec}
    </li>
  ))}
</ul>
```

(Use this corrected version — not the `before:` version above.)

- [ ] **Step 2: Productos section with pinned horizontal scroll via Framer Motion**

```tsx
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ProductoCard, type Producto } from "./ProductoCard";
import { ProductoVisualBeam } from "@/components/visuals/ProductoVisualBeam";
import { ProductoVisualTube } from "@/components/visuals/ProductoVisualTube";
import { ProductoVisualSheet } from "@/components/visuals/ProductoVisualSheet";
import { ProductoVisualRebar } from "@/components/visuals/ProductoVisualRebar";

const PRODUCTOS: Producto[] = [
  {
    idx: "01 / 04",
    eyebrow: "Estructural",
    title: "Perfiles Estructurales",
    sub: "Alta resistencia para construcción civil, naves industriales y estructuras de gran claro.",
    specs: [
      "Vigas IPR — A36 / A572 Gr.50",
      "Tubos HSS cuadrados y rectangulares",
      "Perfiles IPS y canal CPS",
      "Certificación bajo NMX-B-284 y ASTM",
    ],
    visual: <ProductoVisualBeam />,
  },
  {
    idx: "02 / 04",
    eyebrow: "Comercial",
    title: "Perfiles Comerciales",
    sub: "Material de uso general para taller, fabricación ligera y obra civil cotidiana.",
    specs: [
      "PTR y tubo cuadrado calibres 11 al 18",
      "Ángulos LI / LD lados iguales y desiguales",
      "Canales y soleras laminadas en caliente",
      "Redondos sólidos, hexágonos, cuadrados",
    ],
    visual: <ProductoVisualTube />,
  },
  {
    idx: "03 / 04",
    eyebrow: "Planos",
    title: "Aceros Planos",
    sub: "Laminados y galvanizados para techo, fachada, fabricación de equipo y troquelado.",
    specs: [
      "Lámina laminada en frío y en caliente",
      "Lámina galvanizada cal. 22 al 30",
      "Lámina negra y antiderrapante",
      "Rollos slitting a medida bajo pedido",
    ],
    visual: <ProductoVisualSheet />,
  },
  {
    idx: "04 / 04",
    eyebrow: "Refuerzo",
    title: "Aceros de Refuerzo",
    sub: "Refuerzo para concreto en obra civil, vivienda, infraestructura y losacero.",
    specs: [
      "Varilla corrugada 3/8\" a 1 1/4\" — Gr.42 y Gr.60",
      "Malla electrosoldada 6×6, 10×10, 15×15",
      "Alambrón liso y trefilado",
      "Estribos prefabricados bajo pedido",
    ],
    visual: <ProductoVisualRebar />,
  },
];

export function Productos() {
  const pinRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinRef,
    offset: ["start start", "end end"],
  });
  // total cards width (78vw per card + 32px gap) × 4 cards minus 1 viewport, in vw:
  // Each card is 78vw + ~2vw gap; rough: -((78+2)*4 - 100) = -220vw
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-240vw"]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const progressNum = useTransform(scrollYProgress, (p) => {
    const n = Math.min(4, Math.max(1, Math.ceil(p * 4) || 1));
    return `0${n}`;
  });

  return (
    <section id="productos" className="relative bg-bg-0 p-0">
      <div ref={pinRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
          <div
            className="flex flex-shrink-0 flex-wrap items-end justify-between gap-10 pb-8 pt-20"
            style={{ paddingLeft: "var(--spacing-pad)", paddingRight: "var(--spacing-pad)" }}
          >
            <div>
              <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper">
                <span className="h-px w-6 bg-copper" />
                04 · Líneas de producto
              </span>
              <h2
                className="mt-4 font-medium"
                style={{
                  fontSize: "clamp(36px,5vw,80px)",
                  lineHeight: 1,
                  letterSpacing: "var(--tracking-tighter)",
                  maxWidth: "14ch",
                }}
              >
                Cuatro familias.<br />Un solo estándar.
              </h2>
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[.2em] text-n-400">
              <motion.span>{progressNum}</motion.span> / 04
              <div className="relative h-px w-[120px] bg-white/10">
                <motion.div
                  className="absolute left-0 top-0 h-px bg-copper"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>
          </div>

          <motion.div
            className="hidden flex-1 will-change-transform md:flex"
            style={{ x, paddingLeft: "var(--spacing-pad)" }}
          >
            {PRODUCTOS.map((p) => (
              <ProductoCard key={p.idx} producto={p} />
            ))}
          </motion.div>

          {/* Mobile fallback: stacked */}
          <div className="flex flex-1 flex-col gap-6 overflow-auto pb-15 md:hidden" style={{ paddingLeft: "var(--spacing-pad)", paddingRight: "var(--spacing-pad)" }}>
            {PRODUCTOS.map((p) => (
              <ProductoCard key={p.idx} producto={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

Note: the `-240vw` translate value is calibrated for 4 cards of 78vw each. If cards visually overshoot or undershoot during testing, adjust to `-220vw` or `-260vw` accordingly.

- [ ] **Step 3: Add to `app/page.tsx`** and verify

```tsx
import { Productos } from "@/components/sections/Productos";

// after Cifras:
<Productos />
```

Test: scroll into Productos section. The section pins; cards translate horizontally as you continue to scroll vertically. Progress counter goes 01 → 04. After all 4 cards, section unpins and you continue down.

- [ ] **Step 4: Ask user before committing**

```bash
git add .
git commit -m "feat(productos): pinned horizontal scroll with 4 product cards"
```

---

## Task 13: Sectores section

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/Sectores.tsx`

- [ ] **Step 1: Build the grid**

```tsx
type Sector = {
  num: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  feature?: boolean;
};

const SECTORES: Sector[] = [
  {
    num: "01 — Énfasis",
    title: "Construcción",
    desc: "Obra civil, edificación residencial, vivienda vertical e infraestructura urbana.",
    feature: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-14 w-14">
        <path d="M4 42h40M8 42V20l16-12 16 12v22M16 42V28h16v14M22 28v14M28 28v14" />
      </svg>
    ),
  },
  {
    num: "02 — Énfasis",
    title: "Industrial",
    desc: "Plantas, fabricantes de maquinaria, equipo y línea blanca. Especificaciones críticas.",
    feature: true,
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-14 w-14">
        <path d="M4 42h40M8 42V24l10 6V18l10 8V12l12 10v20" />
        <rect x="12" y="34" width="4" height="6" />
        <rect x="22" y="34" width="4" height="6" />
        <rect x="32" y="34" width="4" height="6" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Estructuras Metálicas",
    desc: "Talleres de naves, mezzanines y estructuras a medida.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
        <path d="M4 8h40M4 16h40M4 24h40M4 32h40M4 40h40M12 4v40M24 4v40M36 4v40" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Techadores",
    desc: "Lámina galvanizada, perfiles de soporte y herraje.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
        <path d="M4 36L24 8l20 28M4 36h40M10 36v6h28v-6" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "Distribuidores",
    desc: "Volumen para reventa con condiciones comerciales claras.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
        <path d="M4 16l20-8 20 8-20 8-20-8zM4 16v16l20 8 20-8V16M4 24l20 8 20-8" />
      </svg>
    ),
  },
  {
    num: "06",
    title: "Ferreteros",
    desc: "Surtido mixto, entregas escalonadas, soporte de catálogo.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" className="h-10 w-10">
        <rect x="6" y="10" width="36" height="32" />
        <path d="M6 18h36M14 10V6M34 10V6M14 26h8M14 32h12M28 26h6M28 32h6" />
      </svg>
    ),
  },
];

export function Sectores() {
  return (
    <section
      id="sectores"
      className="bg-bg-light text-[#14171c]"
      style={{ padding: "clamp(80px,12vw,160px) var(--spacing-pad)" }}
    >
      <div className="mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div className="mb-15 flex flex-wrap items-end justify-between gap-10" style={{ marginBottom: "clamp(50px,6vw,80px)" }}>
          <div>
            <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper-deep">
              <span className="h-px w-6 bg-copper-deep" />
              05 · A quién atendemos
            </span>
            <h2
              className="mt-4 font-medium"
              style={{
                fontSize: "clamp(36px,5vw,80px)",
                lineHeight: 1,
                letterSpacing: "var(--tracking-tighter)",
                maxWidth: "14ch",
              }}
            >
              Sectores que confían en nuestro acero.
            </h2>
          </div>
          <p className="max-w-[36ch] text-sm leading-[1.55] text-n-600">
            Atendemos a constructores, fabricantes y distribuidores con el mismo estándar: respuesta puntual,
            material en especificación, entrega documentada.
          </p>
        </div>

        <div
          className="grid border border-[#14171c]/12 sm:grid-cols-2 md:grid-cols-6"
          style={{ gridAutoRows: "200px" }}
        >
          {SECTORES.map((s, i) => (
            <SectorTile key={s.title} sector={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SectorTile({ sector, index }: { sector: Sector; index: number }) {
  // The two feature tiles take 3 cols × 2 rows on desktop
  const featureColClass = index === 0 ? "md:col-start-1 md:col-end-4 md:row-span-2" : "md:col-start-4 md:col-end-7 md:row-span-2";

  return (
    <a
      href="#contacto"
      className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden border-b border-r border-[#14171c]/12 bg-bg-light p-7 transition-colors duration-500 hover:bg-[#14171c] hover:text-n-100 last:border-r-0 md:[&:nth-child(3n)]:border-r-0 ${
        sector.feature ? featureColClass : "md:col-span-2"
      }`}
    >
      <span className="text-[10px] font-medium uppercase tracking-[.25em] text-n-600 group-hover:text-n-400">
        {sector.num}
      </span>
      <div>
        <span className="text-n-700 transition-colors duration-500 group-hover:text-copper">
          {sector.icon}
        </span>
        <h3
          className={`mt-3 font-medium ${sector.feature ? "" : ""}`}
          style={{
            fontSize: sector.feature ? "clamp(32px,3.6vw,56px)" : "clamp(22px,2.2vw,34px)",
            lineHeight: 1.05,
            letterSpacing: "var(--tracking-tight)",
          }}
        >
          {sector.title}
        </h3>
        <p className="mt-3 max-h-0 max-w-[32ch] overflow-hidden text-sm leading-[1.5] text-n-600 opacity-0 transition-[max-height,opacity] duration-500 group-hover:max-h-[100px] group-hover:opacity-100 group-hover:text-n-200">
          {sector.desc}
        </p>
      </div>
      <div className="flex items-end justify-between gap-4">
        <span />
        <div className="grid h-8 w-8 place-items-center rounded-full border border-[#14171c]/20 transition-colors duration-300 group-hover:border-copper group-hover:bg-copper group-hover:text-bg-0">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </div>
      </div>
    </a>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** and verify

```tsx
import { Sectores } from "@/components/sections/Sectores";

// after Productos:
<Sectores />
```

Verify: 6 tiles in a 6-column grid on desktop, Construcción + Industrial larger (3 cols × 2 rows each). Hover inverts colors and reveals description.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(sectores): grid with feature tiles and hover reveals"
```

---

## Task 14: Proceso section (brushed steel stepper)

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/Proceso.tsx`

- [ ] **Step 1: Build the component**

```tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  { num: "01", title: "Cotización ágil", desc: "Respuesta misma jornada en pedidos estándar. Volumen y especificación validados." },
  { num: "02", title: "Asesoría técnica", desc: "Revisión de grados, tolerancias y compatibilidad con el proyecto." },
  { num: "03", title: "Inventario disponible", desc: "Existencia en almacén de los códigos de mayor rotación, listos para salida." },
  { num: "04", title: "Logística confiable", desc: "Transporte propio y aliado, ruteo confirmado, ventana de entrega comprometida." },
  { num: "05", title: "Entrega puntual", desc: "Material certificado, remisión documentada, soporte post-entrega." },
];

export function Proceso() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      ref={ref}
      id="proceso"
      className="relative overflow-hidden bg-bg-0"
      style={{ padding: "clamp(80px,12vw,160px) var(--spacing-pad)" }}
    >
      {/* Brushed steel band */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-80 -translate-y-1/2 opacity-[.85]"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(255,255,255,0) 0px, rgba(255,255,255,.025) 1px, rgba(255,255,255,.06) 2px, rgba(255,255,255,0) 3px, rgba(255,255,255,0) 6px), linear-gradient(180deg, #0a0c10 0%, #2a2d32 30%, #3a3d42 50%, #2a2d32 70%, #0a0c10 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, transparent 0%, rgba(7,8,10,.7) 100%)" }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(circle at 30% 30%, rgba(194,111,58,.08), transparent 50%)" }}
        />
      </div>

      <div className="relative z-[2] mx-auto" style={{ maxWidth: "var(--container-max)" }}>
        <div className="mb-15" style={{ marginBottom: "clamp(60px,8vw,100px)" }}>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper">
            <span className="h-px w-6 bg-copper" />
            06 · Cómo trabajamos
          </span>
          <h2
            className="mt-4.5 font-medium"
            style={{
              fontSize: "clamp(36px,5vw,80px)",
              lineHeight: 1,
              letterSpacing: "var(--tracking-tighter)",
              maxWidth: "16ch",
            }}
          >
            Un proceso corto, sin fricción, documentado.
          </h2>
          <p className="mt-6 max-w-[50ch] text-[15px] leading-[1.55] text-n-200">
            Desde la solicitud inicial hasta la entrega en obra: cada paso tiene un responsable y un tiempo de respuesta acordado.
          </p>
        </div>

        <div className="relative z-[2] grid grid-cols-1 border-t border-white/[.18] sm:grid-cols-2 md:grid-cols-5">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative flex min-h-[240px] flex-col gap-5.5 border-r border-b border-white/10 p-6 last:border-r-0 md:border-b-0"
            >
              <motion.div
                className="absolute left-0 top-[-1px] h-0.5 bg-copper"
                initial={{ width: 0 }}
                animate={inView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              />
              <span className="text-[13px] font-medium tracking-[.2em] text-copper">{step.num}</span>
              <h3
                className="font-medium"
                style={{
                  fontSize: "clamp(20px,2vw,28px)",
                  lineHeight: 1.1,
                  letterSpacing: "var(--tracking-tight)",
                }}
              >
                {step.title}
              </h3>
              <p className="mt-auto text-[13px] leading-[1.55] text-n-400">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** and verify

```tsx
import { Proceso } from "@/components/sections/Proceso";

// after Sectores:
<Proceso />
```

Verify: brushed steel band visible behind stepper, 5 steps in row on desktop, copper bars fill above each step staggered on entrance.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(proceso): 5-step process with brushed steel backdrop"
```

---

## Task 15: Cobertura section (Mexico map)

**Files:**
- Create: `/home/avsolem/sites/enacero/components/visuals/MexicoMap.tsx`
- Create: `/home/avsolem/sites/enacero/components/sections/Cobertura.tsx`

- [ ] **Step 1: MexicoMap visual**

Build `components/visuals/MexicoMap.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";

const PINS = [
  { x: 395, y: 350, r: 6, label: "CDMX", primary: true, labelX: 408, labelY: 354 },
  { x: 370, y: 240, r: 4, label: "MTY", primary: false, labelX: 380, labelY: 244 },
  { x: 320, y: 320, r: 4, label: "GDL", primary: false, labelX: 270, labelY: 324 },
  { x: 435, y: 365, r: 3 },
  { x: 375, y: 320, r: 3 },
  { x: 105, y: 195, r: 3 },
  { x: 475, y: 360, r: 3 },
  { x: 700, y: 380, r: 3 },
  { x: 340, y: 305, r: 3 },
  { x: 425, y: 285, r: 3 },
];

const COUNTRY_D = `
  M 70 200
  C 85 175, 110 165, 135 168
  C 155 170, 170 178, 188 192
  C 205 205, 220 210, 240 215
  C 270 222, 295 230, 320 245
  C 345 260, 365 268, 385 270
  C 410 272, 430 268, 450 260
  C 470 252, 488 240, 505 232
  C 525 222, 545 218, 565 222
  C 588 226, 605 240, 615 258
  C 622 272, 622 285, 615 300
  C 605 320, 590 332, 570 340
  C 555 346, 540 350, 525 355
  C 510 360, 498 372, 495 388
  C 493 398, 498 410, 510 418
  C 525 428, 545 432, 568 434
  C 590 436, 615 432, 635 422
  C 655 412, 670 398, 685 380
  C 695 368, 705 354, 720 348
  C 735 343, 750 348, 760 360
  C 770 372, 770 388, 762 402
  C 752 420, 735 432, 715 438
  C 690 446, 660 446, 632 442
  C 605 438, 580 432, 555 428
  C 530 425, 510 425, 490 432
  C 470 438, 455 448, 442 458
  C 430 466, 418 470, 405 468
  C 390 466, 380 458, 372 446
  C 365 435, 360 422, 352 410
  C 340 392, 322 380, 302 372
  C 280 364, 258 360, 238 354
  C 218 348, 200 340, 185 328
  C 168 314, 158 298, 148 282
  C 138 268, 128 256, 115 248
  C 100 240, 88 236, 78 228
  C 68 220, 65 210, 70 200 Z
`;

export function MexicoMap({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 800 480" fill="none" className="h-auto w-full" style={{ filter: "drop-shadow(0 12px 60px rgba(194,111,58,.1))" }}>
      <motion.path
        d={COUNTRY_D}
        strokeLinejoin="round"
        stroke="rgba(255,255,255,.4)"
        strokeWidth={1}
        fill={active ? "rgba(194,111,58,.05)" : "rgba(255,255,255,.03)"}
        initial={{ pathLength: 0 }}
        animate={active ? { pathLength: 1 } : { pathLength: 0 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
      />
      <g>
        {PINS.map((p, i) => (
          <g key={i}>
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="none"
              stroke="var(--color-copper)"
              strokeWidth={1}
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              style={{
                transformBox: "fill-box",
                transformOrigin: "center",
                animation: active ? "pin-ring 2.4s ease-out infinite" : "none",
              }}
            />
            <motion.circle
              cx={p.x}
              cy={p.y}
              r={p.r}
              fill="var(--color-copper)"
              initial={{ opacity: 0 }}
              animate={active ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            {p.label && (
              <text
                x={p.labelX}
                y={p.labelY}
                fill={p.primary ? "var(--color-copper)" : "rgba(255,255,255,.7)"}
                fontFamily="General Sans"
                fontSize={p.primary ? 11 : 10}
                fontWeight={p.primary ? 600 : 400}
              >
                {p.label}
              </text>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}
```

- [ ] **Step 2: Cobertura section**

Build `components/sections/Cobertura.tsx`:

```tsx
"use client";

import { useInView } from "framer-motion";
import { useRef } from "react";
import { MexicoMap } from "@/components/visuals/MexicoMap";

export function Cobertura() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      ref={ref}
      className="bg-bg-1"
      style={{ padding: "clamp(80px,12vw,160px) var(--spacing-pad)" }}
    >
      <div className="mx-auto grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr]" style={{ maxWidth: "var(--container-max)", columnGap: "clamp(40px,6vw,80px)" }}>
        <div>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper">
            <span className="h-px w-6 bg-copper" />
            07 · Cobertura
          </span>
          <h2
            className="mt-4.5 font-medium"
            style={{
              fontSize: "clamp(36px,5vw,80px)",
              lineHeight: 1,
              letterSpacing: "var(--tracking-tighter)",
              maxWidth: "14ch",
            }}
          >
            Operamos desde CDMX. Entregamos en todo el país.
          </h2>
          <p className="mt-7 max-w-[38ch] text-[15px] leading-[1.55] text-n-200">
            Base en Ciudad de México, con rutas activas hacia el Bajío, Norte y Sureste. Pedidos coordinados con
            ventana de entrega comprometida.
          </p>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-7">
            <div className="flex flex-col gap-1.5">
              <div
                className="font-medium"
                style={{
                  fontSize: "clamp(32px,4vw,56px)",
                  lineHeight: 1,
                  letterSpacing: "var(--tracking-tighter)",
                }}
              >
                <span className="font-normal text-copper">14</span>
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[.2em] text-n-400">
                Estados activos
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <div
                className="font-medium"
                style={{
                  fontSize: "clamp(32px,4vw,56px)",
                  lineHeight: 1,
                  letterSpacing: "var(--tracking-tighter)",
                }}
              >
                CDMX
              </div>
              <div className="text-[11px] font-medium uppercase tracking-[.2em] text-n-400">
                Sede operativa
              </div>
            </div>
          </div>
        </div>

        <div>
          <MexicoMap active={inView} />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to `app/page.tsx`** and verify

```tsx
import { Cobertura } from "@/components/sections/Cobertura";

// after Proceso:
<Cobertura />
```

Verify: map outline draws on entrance, copper pins fade in with pulsing rings around them.

- [ ] **Step 4: Ask user before committing**

```bash
git add .
git commit -m "feat(cobertura): animated mexico map with path drawing and pins"
```

---

## Task 16: Aliados section (infinite marquee)

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/Aliados.tsx`

- [ ] **Step 1: Build the section**

```tsx
const BRANDS = ["ArcelorMittal", "Ternium", "DeAcero", "Ahmsa", "Villacero", "Gerdau", "Aceros Camesa"];
const CERTS = ["ISO 9001:2015", "NMX-B-284", "ASTM A36 / A572", "CANACERO", "NOM-008-SCFI"];

export function Aliados() {
  // Duplicate the brand list for seamless loop
  const track = [...BRANDS, ...BRANDS];

  return (
    <section
      className="relative overflow-hidden bg-bg-0"
      style={{ padding: "clamp(80px,10vw,140px) 0" }}
    >
      <div
        className="mb-15 flex flex-wrap items-end justify-between gap-10"
        style={{ padding: "0 var(--spacing-pad)", marginBottom: "clamp(50px,6vw,80px)" }}
      >
        <div>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-copper">
            <span className="h-px w-6 bg-copper" />
            08 · Aliados y certificaciones
          </span>
          <h2
            className="mt-4.5 font-medium"
            style={{
              fontSize: "clamp(28px,3.4vw,48px)",
              lineHeight: 1.05,
              letterSpacing: "var(--tracking-tighter)",
              maxWidth: "18ch",
            }}
          >
            Acero certificado, abastecido por molinos de primer nivel.
          </h2>
        </div>
        <p className="max-w-[40ch] text-sm leading-[1.55] text-n-400">
          Trabajamos con los principales molinos del país y mantenemos certificaciones que respaldan cada entrega.
        </p>
      </div>

      <div
        className="relative overflow-hidden border-y border-white/[.06] py-8"
        style={{
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
      >
        <div
          className="flex w-max gap-16 hover:[animation-play-state:paused]"
          style={{ animation: "marquee 32s linear infinite" }}
        >
          {track.map((brand, i) => (
            <span
              key={i}
              className="flex items-center gap-2.5 whitespace-nowrap font-semibold text-n-200 opacity-65 transition-opacity hover:opacity-100"
              style={{ fontSize: "clamp(22px,2.4vw,32px)" }}
            >
              <span className="h-2 w-2 flex-shrink-0 rounded-full bg-copper" />
              {brand}
            </span>
          ))}
        </div>
      </div>

      <div
        className="mt-8 flex flex-wrap gap-3"
        style={{ padding: "0 var(--spacing-pad)" }}
      >
        {CERTS.map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-2 rounded-full border border-white/[.12] px-4 py-2.5 text-xs font-medium uppercase tracking-[.12em] text-n-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-navy-bright" />
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** and verify

```tsx
import { Aliados } from "@/components/sections/Aliados";

// after Cobertura:
<Aliados />
```

Verify: brand names scroll horizontally in a seamless loop, edges fade out with mask, hovering pauses animation, cert chips below.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(aliados): infinite marquee of suppliers + cert chips"
```

---

## Task 17: CTA final section

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/CtaFinal.tsx`

- [ ] **Step 1: Build the component**

```tsx
"use client";

import { useState } from "react";

export function CtaFinal() {
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-bg-0"
      style={{ padding: "clamp(100px,14vw,180px) var(--spacing-pad)" }}
    >
      {/* Brushed copper background */}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "repeating-linear-gradient(95deg, rgba(0,0,0,0) 0px, rgba(0,0,0,.07) 1px, rgba(255,255,255,.04) 2px, rgba(0,0,0,0) 3px, rgba(0,0,0,0) 5px), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(217,129,71,.4), transparent 60%), radial-gradient(ellipse 80% 60% at 20% 80%, rgba(143,79,36,.6), transparent 60%), linear-gradient(135deg, #8f4f24 0%, #c26f3a 50%, #6e3a18 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(7,8,10,.15) 0%, rgba(7,8,10,.6) 100%)" }}
        />
      </div>

      <div
        className="relative z-[2] mx-auto grid items-start gap-10 lg:grid-cols-[1.3fr_1fr]"
        style={{ maxWidth: "var(--container-max)", columnGap: "clamp(40px,6vw,80px)" }}
      >
        <div>
          <span className="inline-flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[.22em] text-white">
            <span className="h-px w-6 bg-white" />
            09 · Cotización
          </span>
          <h2
            className="mt-6 font-medium"
            style={{
              fontSize: "clamp(40px,6.5vw,104px)",
              lineHeight: 0.95,
              letterSpacing: "var(--tracking-tightest)",
              textWrap: "balance",
            }}
          >
            ¿Tu próximo proyecto necesita{" "}
            <span className="font-normal italic text-copper">acero confiable</span>?
          </h2>
          <p className="mt-8 max-w-[40ch] text-[15px] leading-[1.55] text-white/85">
            Escríbenos o levanta el teléfono. Si trae especificación, recibes cotización el mismo día. Si necesitas
            asesoría técnica, agendamos llamada con el equipo.
          </p>

          <div className="mt-12 flex flex-col gap-5">
            <ContactRow label="WhatsApp" value="+52 554 889 6854" sub="Respuesta directa · L-V 8:00 a 18:00" href="https://wa.me/525548896854" />
            <ContactRow label="Email" value="contacto@acerossidiva.com" sub="Respuesta en máx. 4 horas" href="mailto:contacto@acerossidiva.com" />
            <ContactRow label="Almacén" value="Calle Ote. 182 #362" sub="Col. Moctezuma 2da Secc, Venustiano Carranza, CDMX 15530" />
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="border border-white/10 bg-bg-0/60 p-9 backdrop-blur-[18px]"
        >
          <div className="mb-6 flex justify-between text-[11px] font-medium uppercase tracking-[.25em] text-white/70">
            <span>Cotización rápida</span>
            <span className="text-copper-bright">— 4 campos</span>
          </div>

          <Field label="Nombre" id="f-nombre" placeholder="Juan Pérez" required />
          <Field label="Empresa" id="f-empresa" placeholder="Constructora MX" required />
          <Field label="Email" id="f-email" type="email" placeholder="tu@empresa.com" required />
          <Field label="¿Qué necesitas?" id="f-msg" placeholder="Ej: 12 ton de varilla #4, entrega en CDMX, semana del 15" textarea />

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/525548896854"
              className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-copper px-7 py-4 text-sm font-semibold text-bg-0 transition-colors hover:bg-copper-bright"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M20.5 3.5A10.6 10.6 0 0 0 3.4 17.2L2 22l4.9-1.3A10.6 10.6 0 1 0 20.5 3.5Z" />
              </svg>
              WhatsApp ahora
            </a>
            <button
              type="submit"
              className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-n-100 transition-colors hover:border-n-100 hover:bg-white/[.06]"
            >
              {sent ? "Enviado ✓" : "Enviar"}
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function ContactRow({ label, value, sub, href }: { label: string; value: string; sub: string; href?: string }) {
  const inner = (
    <span className="font-medium text-n-100" style={{ fontSize: "clamp(16px,1.4vw,20px)", letterSpacing: "var(--tracking-tight)" }}>
      {value}
      <small className="mt-1 block text-[13px] font-normal tracking-normal text-white/70">{sub}</small>
    </span>
  );
  return (
    <div className="grid grid-cols-[100px_1fr] items-baseline gap-6 border-b border-white/[.18] pb-4.5">
      <span className="text-[10px] font-medium uppercase tracking-[.25em] text-white/65">{label}</span>
      {href ? <a href={href}>{inner}</a> : inner}
    </div>
  );
}

function Field({ label, id, placeholder, type = "text", required, textarea }: {
  label: string;
  id: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  return (
    <div className="relative mb-1 flex flex-col border-b border-white/15 py-3.5 focus-within:border-copper">
      <label htmlFor={id} className="mb-2 text-[10px] font-medium uppercase tracking-[.2em] text-white/50 [.focus-within>&]:text-copper">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={3}
          className="resize-none bg-transparent text-[15px] text-n-100 outline-none placeholder:text-white/40"
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className="bg-transparent text-[15px] text-n-100 outline-none placeholder:text-white/40"
        />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** and verify

```tsx
import { CtaFinal } from "@/components/sections/CtaFinal";

// after Aliados:
<CtaFinal />
```

Verify: copper brushed background visible, form fields show underline focus state in copper, "Enviado ✓" appears after submit.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(cta-final): copper background with contact form and details"
```

---

## Task 18: Footer

**Files:**
- Create: `/home/avsolem/sites/enacero/components/sections/Footer.tsx`

- [ ] **Step 1: Build the footer**

```tsx
import Image from "next/image";

export function Footer() {
  return (
    <footer
      className="bg-bg-0 text-n-200"
      style={{ padding: "clamp(60px,8vw,100px) var(--spacing-pad) 32px", borderTop: "1px solid rgba(255,255,255,.06)" }}
    >
      <div className="grid gap-10 border-b border-white/[.06] pb-15 md:grid-cols-[2fr_1fr_1fr_1fr]" style={{ paddingBottom: "60px" }}>
        <div>
          <div className="mb-5 h-12 w-12 overflow-hidden rounded-full">
            <Image src="/logo.jpeg" alt="Enacero" width={48} height={48} className="h-full w-full object-cover" />
          </div>
          <h3 className="text-sm font-semibold uppercase tracking-[.14em] text-n-100">
            ENACERO
            <small className="mt-1 block text-[11px] tracking-[.2em] text-copper">Encuentro Acerero MX</small>
          </h3>
          <p className="mt-5 max-w-[32ch] text-[13px] leading-[1.55] text-n-400">
            Distribuidora de acero B2B con base en Ciudad de México. Servicio a construcción, industria,
            fabricantes, techadores y distribuidores.
          </p>
        </div>

        <FooterCol title="Productos" links={[
          { label: "Estructurales", href: "#productos" },
          { label: "Comerciales", href: "#productos" },
          { label: "Planos", href: "#productos" },
          { label: "Refuerzo", href: "#productos" },
        ]} />

        <FooterCol title="Sectores" links={[
          { label: "Construcción", href: "#sectores" },
          { label: "Industrial", href: "#sectores" },
          { label: "Estructuras", href: "#sectores" },
          { label: "Distribuidores", href: "#sectores" },
        ]} />

        <FooterCol title="Contacto" links={[
          { label: "+52 554 889 6854", href: "https://wa.me/525548896854" },
          { label: "contacto@acerossidiva.com", href: "mailto:contacto@acerossidiva.com" },
          { label: "CDMX, México" },
        ]} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6 pt-8 text-xs text-n-400">
        <span>© 2026 Enacero — Encuentro Acerero MX. Todos los derechos reservados.</span>
        <div className="flex gap-6">
          <span>Aviso de privacidad</span>
          <span>Términos</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: Array<{ label: string; href?: string }> }) {
  return (
    <div>
      <h4 className="mb-4.5 text-[11px] font-medium uppercase tracking-[.2em] text-n-400">{title}</h4>
      <ul className="flex flex-col gap-2.5">
        {links.map((l, i) => (
          <li key={i} className="text-sm text-n-200">
            {l.href ? (
              <a href={l.href} className="transition-colors hover:text-copper">{l.label}</a>
            ) : l.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { Footer } from "@/components/sections/Footer";

// after CtaFinal:
<Footer />
```

Verify in browser: 4-column footer on desktop, links hover copper, copyright at bottom.

- [ ] **Step 3: Ask user before committing**

```bash
git add .
git commit -m "feat(footer): site footer with brand, columns, and copyright"
```

---

## Task 19: Final page composition + production build verification

**Files:**
- Modify: `/home/avsolem/sites/enacero/app/page.tsx` (final clean composition)

- [ ] **Step 1: Confirm final composition of `app/page.tsx`**

```tsx
import { Loader } from "@/components/Loader";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppFAB } from "@/components/WhatsAppFAB";
import { Hero } from "@/components/sections/Hero";
import { Statement } from "@/components/sections/Statement";
import { Cifras } from "@/components/sections/Cifras";
import { Productos } from "@/components/sections/Productos";
import { Sectores } from "@/components/sections/Sectores";
import { Proceso } from "@/components/sections/Proceso";
import { Cobertura } from "@/components/sections/Cobertura";
import { Aliados } from "@/components/sections/Aliados";
import { CtaFinal } from "@/components/sections/CtaFinal";
import { Footer } from "@/components/sections/Footer";

export default function Page() {
  return (
    <>
      <Loader />
      <ScrollProgress />
      <Nav />
      <WhatsAppFAB />
      <main>
        <Hero />
        <Statement />
        <Cifras />
        <Productos />
        <Sectores />
        <Proceso />
        <Cobertura />
        <Aliados />
        <CtaFinal />
        <Footer />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Type check**

```bash
cd /home/avsolem/sites/enacero
npx tsc --noEmit
```

Expected: zero TS errors. If any appear, fix and re-run before continuing.

- [ ] **Step 3: Production build**

```bash
npm run build
```

Expected: build completes with no errors. Note any warnings; address only the ones that block functionality.

- [ ] **Step 4: Smoke test the production build**

```bash
npm start
```

Open `http://localhost:3000`. Walk through the page end to end:
- Loader appears and fades
- Nav condenses on scroll
- Scroll-progress copper bar fills as you scroll
- Hero tagline animates in
- Sparks visible
- Statement words turn copper/white as you scroll past
- Cifras counters animate up
- Productos pin and translate horizontally over its scroll runway
- Sectores hover state works
- Proceso copper bars animate in
- Cobertura map draws and pins fade in
- Aliados marquee scrolls
- CTA final form's "Enviado ✓" works
- Footer links navigate to anchors

Document any visual issues; do NOT auto-fix in this task. List them for a follow-up cleanup task if needed.

Then stop the server.

- [ ] **Step 5: Ask user before committing**

```bash
git add .
git commit -m "feat(page): compose final landing page and verify production build"
```

---

## Task 20: Initialize git repo and link memory

**Files:**
- Create: `/home/avsolem/sites/enacero/README.md` (minimal — only if user asks; per CLAUDE.md don't create docs unsolicited)

- [ ] **Step 1: Verify git status**

```bash
cd /home/avsolem/sites/enacero
git status
```

If repo was already initialized in Task 1, confirm there are no untracked files outside `.gitignore` rules.

- [ ] **Step 2: Ask user about commits**

If the user has been approving each commit task-by-task, the history should already be clean. If commits were skipped, ask: *"¿Quieres que ahora hagamos los commits que dejamos pendientes, o cierro la sesión sin más cambios?"*

- [ ] **Step 3: Do NOT push automatically**

Per user CLAUDE.md rules: **never** run `git push` without explicit instruction from the user. If the user wants to push, they will say so.

---

## Self-Review

### Spec coverage
- ✅ Loader → Task 4
- ✅ Scroll progress → Task 5
- ✅ Nav with theme toggle + WhatsApp → Task 5
- ✅ WhatsApp FAB → Task 6
- ✅ Hero (cinematic + sparks + word reveal + parallax) → Tasks 7 + 8
- ✅ Statement (word-by-word scroll-driven reveal) → Task 9
- ✅ Cifras (animated counters) → Task 10
- ✅ Productos (pinned horizontal scroll, 4 categories, custom visuals) → Tasks 11 + 12
- ✅ Sectores (6 tiles with feature emphasis on Construcción + Industrial) → Task 13
- ✅ Proceso (5 steps on brushed steel) → Task 14
- ✅ Cobertura (Mexico map with path-drawing + pins) → Task 15
- ✅ Aliados (infinite marquee + cert chips) → Task 16
- ✅ CTA final (copper background + form + contacts) → Task 17
- ✅ Footer → Task 18
- ✅ Final composition + build verification → Task 19

All ten sections of the design + supporting chrome (loader, nav, scroll progress, FAB) are accounted for.

### Placeholder scan
- No `TBD`, `TODO`, or `fill in details` markers.
- The `[placeholder]` strings in Cifras labels are intentional client-facing markers per the original brief — these will be replaced by Enacero before launch.
- The horizontal scroll translate value (`-240vw`) is calibrated and includes a fallback note to adjust if needed.

### Type consistency
- `Producto` type is defined in `ProductoCard.tsx` and consumed in `Productos.tsx` — names match.
- All components use the same `useScroll`/`useTransform`/`useInView` import patterns from `framer-motion`.
- `useTheme` hook signature is consistent with Nav's usage.

### Ambiguity check
- Tailwind v4 token names (e.g., `--color-copper`) are referenced consistently both as CSS vars and Tailwind classes (e.g., `bg-copper`).
- The `before:` content pattern issue in ProductoCard is explicitly corrected inline (Step 1 of Task 12).
- Sectores grid feature columns are calibrated for desktop only with explicit Tailwind classes — mobile falls back to 2 columns.

No issues to fix.

---

## Execution Handoff

Plan complete and saved to `/home/avsolem/sites/enacero/docs/superpowers/plans/2026-05-27-enacero-landing-implementation.md`.

**Two execution options:**

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review the output between tasks, and we iterate fast. Each subagent gets only what it needs for that task, keeping context clean. Best when there are many tasks (20 here).

**2. Inline Execution** — I execute tasks in this same session in batches with checkpoints for your review. Faster for very small plans, but here the context will fill up well before task 20.

For this implementation, I recommend **Subagent-Driven** given the 20 tasks and the volume of code per task.

**Which approach?**
