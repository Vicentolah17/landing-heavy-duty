'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import { HeavyDutyEvents } from '@/lib/meta-pixel'
import { useUTMCheckoutLink } from '@/hooks/use-utm-checkout-link'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const checkoutUrl = useUTMCheckoutLink()

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

  const handleCheckoutClick = () => {
    HeavyDutyEvents.initiateCheckout('hero')
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center noise-bg overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#000000] via-[#000000] to-[#0A0A0A]" />

      {/* Hero photo — golden era B&W (não identificável como Mentzer) */}
      <div className="absolute inset-0 md:left-1/2 md:right-0 bg-gradient-to-r from-[#000000] via-[#000000]/80 to-transparent md:from-[#000000] md:via-transparent md:to-transparent z-[1]">
        <div className="absolute inset-0 bg-[url('/media/golden_era_bd.png')] bg-cover bg-center bg-no-repeat opacity-40 md:opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-[#000000]/90 to-[#000000]/40 md:from-[#000000] md:via-[#000000]/70 md:to-transparent" />
      </div>

      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl z-0" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="animate-on-scroll mb-8">
            <span className="inline-block px-4 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm font-medium tracking-[0.2em]">
              PROTOCOLO BRUTO
            </span>
          </div>

          {/* H1 */}
          <h1 className="animate-on-scroll font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 tracking-tight text-balance leading-[1.05]">
            Você treina há 15 anos.
            <br />
            Se acaba na academia.
            <br />
            <span className="text-gold">Por que o corpo parou de mudar?</span>
          </h1>

          {/* H2 — promessa em destaque */}
          <h2 className="animate-on-scroll font-heading text-xl md:text-2xl lg:text-3xl text-foreground mb-8 font-medium leading-snug">
            3 treinos por semana. 30 minutos.
            <br />
            Até a falha. 4 a 7 dias de descanso.
          </h2>

          {/* Subtext */}
          <p className="animate-on-scroll text-foreground/80 text-base md:text-lg max-w-xl mb-10 leading-relaxed space-y-2">
            A geração que construiu o fisiculturismo nos anos 80 já tinha a resposta.
            A indústria do fitness te empurrou volume pra te manter pagando academia.
            <br />
            <br />
            Protocolo BRUTO é a interpretação brasileira desses princípios — pro homem 40+ que não tem mais tempo a perder com treino que não funciona.
          </p>

          {/* CTA Button */}
          <div className="animate-on-scroll mb-4">
            <Button
              asChild
              size="lg"
              className="bg-gold hover:bg-gold/90 text-primary-foreground font-heading text-lg md:text-xl px-8 py-6 h-auto rounded-lg shadow-lg shadow-gold/20 transition-all hover:shadow-xl hover:shadow-gold/30 hover:scale-105"
            >
              <a
                href={checkoutUrl}
                onClick={handleCheckoutClick}
              >
                COMEÇAR O PROTOCOLO — R$ 37
              </a>
            </Button>
          </div>

          {/* Microcopy abaixo do CTA */}
          <p className="animate-on-scroll text-foreground/60 text-sm md:text-base max-w-md mb-8 leading-relaxed">
            Acesso imediato à biblioteca completa do método direto na área de membros Hotmart.
          </p>

          {/* Trust badges */}
          <div className="animate-on-scroll flex flex-col gap-3 text-sm text-foreground/70">
            <span className="flex items-start gap-2">
              <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              Garantia de 7 dias pela Hotmart
            </span>
            <span className="flex items-start gap-2">
              <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              Acesso Imediato
            </span>
            <span className="flex items-start gap-2">
              <Check className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
              Inspirado nos princípios de Mike Mentzer e da golden era
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