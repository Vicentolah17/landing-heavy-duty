'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '1',
    text: 'Compra R$ 37 pela Hotmart (Pix ou cartão).',
  },
  {
    number: '2',
    text: 'Acesso imediato à biblioteca completa na área de membros.',
  },
  {
    number: '3',
    text: 'Você escolhe o protocolo certo pro seu momento e começa a treinar.',
  },
]

export function HowItWorks() {
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
    <section ref={sectionRef} className="py-16 md:py-20 bg-background noise-bg relative">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* H2 */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl font-bold text-foreground text-center mb-10 md:mb-12 leading-tight">
          Três passos.{' '}
          <span className="text-gold">Sem rodeio.</span>
        </h2>

        {/* Steps */}
        <div className="space-y-5 md:space-y-6 mb-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="animate-on-scroll flex items-start gap-4 md:gap-5"
              style={{ transitionDelay: `${index * 120}ms` }}
            >
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-gold rounded-full flex items-center justify-center">
                <span className="font-heading text-lg md:text-xl font-bold text-primary-foreground">
                  {step.number}
                </span>
              </div>
              <p className="text-foreground text-base md:text-lg leading-relaxed pt-1.5 md:pt-2.5">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Closer */}
        <p className="animate-on-scroll text-center text-foreground/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
          Sem espera. Sem app. Sem comunidade.
          <br />
          <span className="text-gold font-medium">Só o método que você precisa pra treinar segunda-feira.</span>
        </p>
      </div>
    </section>
  )
}
