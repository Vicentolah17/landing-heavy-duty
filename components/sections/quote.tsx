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
    <section ref={sectionRef} className="py-16 md:py-24 bg-[#0A0A0A] noise-bg relative">
      {/* Decorative top/bottom lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      <div className="container mx-auto px-4 max-w-3xl text-center">
        {/* Quote icon */}
        <div className="animate-on-scroll mb-6">
          <QuoteIcon className="w-10 h-10 md:w-12 md:h-12 text-gold/40 mx-auto" />
        </div>

        {/* Quote */}
        <blockquote className="animate-on-scroll mb-6">
          <p className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground italic leading-snug text-balance">
            &ldquo;O estímulo para o crescimento é breve e intenso.
            <br />
            A recuperação é longa e indispensável.&rdquo;
          </p>
        </blockquote>

        {/* Attribution */}
        <p className="animate-on-scroll text-gold font-heading text-base md:text-lg font-medium tracking-wide">
          — Mike Mentzer
        </p>
        <p className="animate-on-scroll text-foreground/60 text-sm md:text-base mt-1">
          Mr. Olympia Heavyweight, 1979
        </p>
      </div>
    </section>
  )
}