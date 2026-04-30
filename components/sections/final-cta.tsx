'use client'

import { useEffect, useRef } from 'react'
import { Zap } from 'lucide-react'
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
        })
      },
      { threshold: 0.1 }
    )

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleCheckoutClick = () => {
    HeavyDutyEvents.initiateCheckout('final_cta')
  }

  return (
    <section
      ref={sectionRef}
      id="checkout"
      className="py-20 md:py-28 bg-[#151515] noise-bg relative overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/10 rounded-full blur-3xl" />
      
      {/* Gold gradient overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 max-w-3xl text-center">
        {/* Title */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
          Você já leu o suficiente.
        </h2>

        {/* Subtext */}
        <p className="text-foreground/80 text-lg md:text-xl mb-2 max-w-xl mx-auto">
          Ou aplica o método e descobre o que mudou.
        </p>
        <p className="text-foreground/80 text-lg md:text-xl mb-10 max-w-xl mx-auto">
          Ou continua treinando do mesmo jeito.
        </p>
        {/* CTA Button */}
        <div className="animate-on-scroll mb-6">
          <a 
              href="https://pay.hotmart.com/M105294904O"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCheckoutClick}
              className="inline-block bg-gold hover:bg-gold/90 text-black font-heading text-lg md:text-xl px-10 py-5 rounded-lg shadow-lg shadow-gold/30 transition-all hover:shadow-xl hover:shadow-gold/40 hover:scale-105"
            >
              COMEÇAR AGORA — R$ 37
          </a>
        </div>

       {/* Trust line */}
<p className="animate-on-scroll text-gold text-sm md:text-base font-medium mb-3">
  Pagamento via Hotmart · Garantia de 7 dias
</p>

{/* Process explanation */}
<p className="animate-on-scroll text-foreground/70 text-sm md:text-base max-w-md mx-auto leading-relaxed">
  Após a compra, você responde um formulário rápido por email.
  Seu plano será montado e entregue em até 24h.
</p>


      </div>
    </section>
  )
}