'use client'

import { useEffect, useRef } from 'react'
import { Quote as QuoteIcon } from 'lucide-react'

export function Quote() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#111111] noise-bg relative">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 max-w-4xl text-center">
        {/* Quote icon */}
        <div className="animate-on-scroll mb-8">
          <QuoteIcon className="w-12 h-12 md:w-16 md:h-16 text-gold/50 mx-auto" />
        </div>

        {/* Quote */}
        <blockquote className="animate-on-scroll mb-8">
          <p className="font-heading text-xl md:text-2xl lg:text-3xl text-gold italic leading-relaxed text-balance">
            &ldquo;A intensidade do esforço é o único fator responsável pelo estímulo do crescimento muscular.&rdquo;
          </p>
        </blockquote>

        {/* Attribution */}
        <p className="animate-on-scroll text-foreground font-heading text-lg md:text-xl font-medium mb-6">
          — Mike Mentzer, Heavyweight Mr. Olympia 1979 · Revolucionário do Treinamento Científico
        </p>

        {/* Bio */}
        <p className="animate-on-scroll text-foreground/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Mentzer foi o primeiro bodybuilder a aplicar ciência real ao treino. Obteve pontuação perfeita no Mr. Olympia Heavyweight em 1979 — e seus clientes cresciam mais treinando 1x por semana do que atletas que treinavam 6x.
        </p>
      </div>
    </section>
  )
}
