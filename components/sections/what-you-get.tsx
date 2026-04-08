'use client'

import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

const features = [
  'Planilha de treino 100% personalizada pro seu perfil',
  'Exercícios, séries, reps e técnica detalhada de cada movimento',
  'Tabela de progressão de cargas',
  'Os 7 princípios do Heavy Duty explicados',
  'Baseado no livro original: High-Intensity Training the Mike Mentzer Way (2003)',
]

const profiles = [
  { level: 'Iniciante', goal: 'Massa' },
  { level: 'Iniciante', goal: 'Força' },
  { level: 'Intermediário', goal: 'Massa' },
  { level: 'Intermediário', goal: 'Força' },
  { level: 'Avançado', goal: 'Massa' },
  { level: 'Avançado', goal: 'Força' },
]

export function WhatYouGet() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#151515] noise-bg relative">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Title */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 md:mb-16">
          O que você recebe
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Features list */}
          <div className="animate-on-scroll">
            <ul className="space-y-5">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center mt-0.5">
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <span className="text-foreground text-base md:text-lg leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Profile selector visual */}
          <div className="animate-on-scroll" style={{ transitionDelay: '200ms' }}>
            <div className="bg-card border border-gold/20 rounded-xl p-6 md:p-8">
              <h3 className="font-heading text-lg md:text-xl font-bold text-gold mb-6 text-center">
                6 Variações de Treino
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {profiles.map((profile, index) => (
                  <div
                    key={index}
                    className="bg-background/50 border border-gold/10 rounded-lg p-3 md:p-4 text-center hover:border-gold/40 transition-colors"
                  >
                    <span className="block text-gold text-sm font-medium mb-1">
                      {profile.level}
                    </span>
                    <span className="block text-foreground/80 text-xs md:text-sm">
                      {profile.goal}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-foreground/60 text-sm text-center mt-6">
                Você recebe o plano certo para seu nível e objetivo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
