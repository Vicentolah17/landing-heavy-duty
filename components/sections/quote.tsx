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
            &ldquo;O estímulo para o crescimento é breve e intenso. A recuperação é longa e indispensável.&rdquo;
          </p>
        </blockquote>

        {/* Attribution */}
        <p className="animate-on-scroll text-foreground font-heading text-lg md:text-xl font-medium mb-6">
          — Mike Mentzer
        </p>

        {/* Bio */}
        <p className="animate-on-scroll text-foreground/70 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Mr. Olympia Heavyweight em 1979 com pontuação perfeita.
          Treinador de Dorian Yates — 6x Mr. Olympia consecutivo.
          Defendeu, contra o consenso da indústria, que treinar menos com mais intensidade produz mais resultado.
        </p>
      </div>
    </section>
  )
}