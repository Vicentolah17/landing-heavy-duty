'use client'

import { useEffect, useRef } from 'react'

const steps = [
  {
    number: '1',
    text: 'Clique no botão e finalize o pagamento (R$37 — Pix ou cartão)',
  },
  {
    number: '2',
    text: 'Responda 3 perguntas rápidas sobre seu perfil',
  },
  {
    number: '3',
    text: 'Receba sua planilha personalizada em até 24h no seu email',
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-background noise-bg relative">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Title */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 md:mb-16">
          Como funciona
        </h2>

        {/* Steps */}
        <div className="space-y-6 md:space-y-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="animate-on-scroll flex items-start gap-5 md:gap-6"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 bg-gold rounded-full flex items-center justify-center">
                <span className="font-heading text-xl md:text-2xl font-bold text-primary-foreground">
                  {step.number}
                </span>
              </div>
              <p className="text-foreground text-lg md:text-xl leading-relaxed pt-2 md:pt-3">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <p className="animate-on-scroll text-center text-foreground/70 text-base md:text-lg">
          Simples. Sem cadastro. Sem app.{' '}
          <span className="text-gold font-medium">Só o treino que você precisa.</span>
        </p>
      </div>
    </section>
  )
}
