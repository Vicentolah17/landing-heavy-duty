'use client'

import { useEffect, useRef } from 'react'
import { ShieldCheck } from 'lucide-react'

export function Guarantee() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#1A1A1A] noise-bg relative">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="animate-on-scroll border border-gold/30 rounded-2xl p-8 md:p-14 text-center bg-background/30">
          {/* Shield icon */}
          <div className="flex justify-center mb-6">
            <ShieldCheck className="w-16 h-16 md:w-20 md:h-20 text-gold" strokeWidth={1.8} />
          </div>

          {/* Title */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            GARANTIA INCONDICIONAL DE 7 DIAS
          </h2>

          {/* Subtext */}
          <p className="text-foreground/80 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-8">
            Se por qualquer motivo você não gostar do seu programa, devolvemos 100% do seu dinheiro.
            Sem perguntas. Sem burocracia. O risco é todo nosso.
          </p>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-gold text-sm md:text-base font-medium border border-gold/40 rounded-full px-4 py-2">
            <span>✓ Processado pela Hotmart — reembolso garantido</span>
          </div>
        </div>
      </div>
    </section>
  )
}