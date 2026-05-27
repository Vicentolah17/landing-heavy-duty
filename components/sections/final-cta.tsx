'use client'

import { useEffect, useRef } from 'react'
import { HeavyDutyEvents } from '@/lib/meta-pixel'

export function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        });
      },
      { threshold: 0.1 }
    )

    // Busca os elementos dentro da ref da section
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleCheckoutClick = () => {
    // Certifique-se que HeavyDutyEvents está devidamente tipado/importado
    HeavyDutyEvents.initiateCheckout('final_cta')
  }

  return (
    <section
      ref={sectionRef}
      id="checkout"
      className="py-20 md:py-28 bg-[#0A0A0A] relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/10 rounded-full blur-3xl" />

      {/* Gold gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-2xl text-center">
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
          Você já leu o suficiente.
        </h2>

        <p className="animate-on-scroll text-foreground/80 text-lg md:text-xl mb-2 leading-relaxed">
          Ou aplica o protocolo e descobre como o corpo responde.
        </p>
        <p className="animate-on-scroll text-foreground/80 text-lg md:text-xl mb-10 leading-relaxed">
          Ou continua treinando do mesmo jeito.
        </p>

        {/* CTA Button Corrigido */}
        <div className="animate-on-scroll mb-5">
          <a
            href="https://pay.hotmart.com/M105294904O"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleCheckoutClick}
            className="inline-block bg-gold hover:bg-gold/90 text-black font-heading text-lg md:text-xl px-10 py-5 rounded-lg shadow-lg shadow-gold/30 transition-all hover:shadow-xl hover:shadow-gold/40 hover:scale-105"
          >
            COMEÇAR O PROTOCOLO — R$ 37
          </a>
        </div>

        <p className="animate-on-scroll text-gold text-sm md:text-base font-medium mb-4">
          Pagamento via Hotmart · Garantia de 7 dias
        </p>

        <p className="animate-on-scroll text-foreground/60 text-sm md:text-base max-w-md mx-auto leading-relaxed">
          Após a compra, você responde um formulário curto por email.
          <br />
          Em até 24h, eu envio seu protocolo montado.
        </p>
      </div>
    </section>
  )
}