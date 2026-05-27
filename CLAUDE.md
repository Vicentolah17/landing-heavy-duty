# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## REGRAS OBRIGATÓRIAS DE TRABALHO

1. NUNCA crie git worktrees. Trabalhe SEMPRE direto no diretório principal.
2. NUNCA execute git commit automaticamente.
3. NUNCA execute git push automaticamente.
4. NUNCA execute git merge, rebase, reset --hard ou qualquer comando que altere histórico.
5. O usuário revisa todas as mudanças pelo VS Code (aba Source Control) antes de decidir commitar.
6. Se precisar executar comandos de terminal que alterem estrutura de pastas (rd, rm, mv), PERGUNTAR antes.
7. Ao final de cada tarefa, apenas mostrar um resumo dos arquivos criados/modificados e dizer "pronto para revisão".

---

## Project Overview

Landing page de vendas para o **Heavy Duty Method** — um sistema de treinamento personalizado baseado na metodologia de Mike Mentzer. Todo o conteúdo é em português (pt-BR).

**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix UI)

---

## Commands

```bash
npm run dev      # Dev server (localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

No test framework is configured.

---

## Architecture

### Page Composition

`app/page.tsx` orchestrates all sections in order — it is the single entry point for the landing page. Each section is an independent component under `components/sections/`:

```
Hero → Problem → Method → WhatYouGet → HowItWorks → Quote → FAQ → FinalCTA → Footer
```

Scroll-triggered fade-in animations are implemented via `IntersectionObserver` directly inside each section component (class `animate-on-scroll` defined in `app/globals.css`).

### Styling System

Tailwind v4 with CSS custom properties defined in `app/globals.css` via `@theme`:
- Background: `#1C1C1C` (dark), `#252525` (cards)
- Accent: `#B8962E` (gold)
- Fonts: **Bebas Neue** (headings), **Inter** (body) — loaded in `app/layout.tsx`
- Custom utilities: `.noise-bg`, `.text-gold-gradient`, `.animate-on-scroll`
- Custom scrollbar (gold thumb)

### Key Config Notes

- `next.config.mjs`: `typescript.ignoreBuildErrors: true` and `images.unoptimized: true`
- Path alias `@/*` maps to project root (use for all internal imports)
- shadcn/ui style: "new-york", base color: neutral, RSC enabled

### Component Organization

- `components/sections/` — one file per landing page section
- `components/ui/` — shadcn/ui primitives (do not edit manually; use shadcn CLI to add/update)
- `lib/utils.ts` — exports `cn()` (clsx + tailwind-merge) used everywhere for class merging
- `hooks/` — `use-mobile.ts`, `use-toast.ts`

### Notable Installed but Lightly Used

- `recharts` — charting library present but not visibly used yet
- `react-hook-form` + `zod` — form/validation stack available
- `embla-carousel-react` — carousel component available
- `next-themes` — dark mode support wired via `components/theme-provider.tsx`
