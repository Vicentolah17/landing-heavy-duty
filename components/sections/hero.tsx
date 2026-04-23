'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

export function Hero() {
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
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center noise-bg overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C1C1C] via-[#1C1C1C] to-[#151515]" />

      {/* Mentzer photo placeholder - Mobile: full background with overlay */}
      <div className="mentzer-photo absolute inset-0 md:left-1/2 md:right-0 bg-gradient-to-r from-[#1C1C1C] via-[#1C1C1C]/80 to-transparent md:from-[#1C1C1C] md:via-transparent md:to-transparent z-[1]">
        {/* Photo container - replace background-image in CSS with actual photo */}
        <div className="absolute inset-0 bg-[url('/media/mentzer7_hero.jpg')] bg-cover bg-center bg-no-repeat opacity-40 md:opacity-60" />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1C1C] via-[#1C1C1C]/90 to-[#1C1C1C]/40 md:from-[#1C1C1C] md:via-[#1C1C1C]/70 md:to-transparent" />
      </div>

      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl z-0" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="animate-on-scroll mb-8">
            <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium tracking-wide">
              O MÉTODO QUE A INDÚSTRIA DO FITNESS NÃO QUER QUE VOCÊ CONHEÇA
            </span>
          </div>

          {/* H1 */}
          <h1 className="animate-on-scroll font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-6 tracking-tight text-balance">
            Treine Menos. Cresça Mais.
          </h1>

          {/* H2 */}
          <h2 className="animate-on-scroll font-heading text-xl md:text-2xl lg:text-3xl text-gold mb-6 font-medium">
            O Sistema Heavy Duty de Mike Mentzer — o único método de treino baseado em ciência real.
          </h2>

          {/* Subtext */}
          <p className="animate-on-scroll text-foreground/80 text-base md:text-lg max-w-xl mb-10 leading-relaxed">
            1 série. Falha muscular total. 4-7 dias de descanso. Resultados que a maioria nunca vai ter porque continua seguindo método errado.
          </p>

          {/* CTA Button */}
          <div className="animate-on-scroll mb-6">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary-foreground font-heading text-lg md:text-xl px-8 py-6 h-auto rounded-lg shadow-lg shadow-gold/20 transition-all hover:shadow-xl hover:shadow-gold/30 hover:scale-105"
            >
              <a href="https://pay.hotmart.com/M105294904O">
                QUERO MEU PROGRAMA AGORA
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="animate-on-scroll flex flex-wrap items-center gap-4 md:gap-6 text-sm text-foreground/70">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" />
              Entrega em até 24h
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" />
              Personalizado pro seu perfil
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-gold" />
              Baseado no livro original de Mentzer
            </span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-10">
        <div className="w-6 h-10 border-2 border-gold/50 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold rounded-full" />
        </div>
      </div>
    </section>
  )
}