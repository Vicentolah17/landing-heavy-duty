'use client'

import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

const features = [
  'Plano montado pro seu nível e objetivo',
  'Técnica de pré-exaustão aplicada — isolação seguida de composto, sem descanso',
  'Protocolo de break-in nas semanas 1-2 (adaptação de tendões antes da falha)',
  'Divisão semanal estruturada (Treino A / Treino B alternados)',
  'Exercícios com séries, reps, cargas e cadência (4s/2s/4s)',
  'Tabela de progressão de carga e regras de avanço',
  'Página dedicada de aquecimento obrigatório',
  'Os princípios do Heavy Duty explicados em linguagem aplicada',
  'Entrega em até 24h após o quiz ou formulário',
  'Baseado em High-Intensity Training the Mike Mentzer Way (2003)',
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
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4">
          O que você recebe
        </h2>

        {/* Subhead */}
        <p className="animate-on-scroll text-center text-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-16">
          Não é um ebook genérico vendido pra todo mundo.
          O método cobre todos os níveis e objetivos — você recebe a versão certa pro seu caso.
        </p>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Features list */}
          <div className="animate-on-scroll">
            <ul className="space-y-4">
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

          {/* Mockups */}
          <div className="animate-on-scroll grid grid-cols-2 gap-4 items-center" style={{ transitionDelay: '200ms' }}>
            <img 
              src="/media/preview.jpg"
              alt="Sumário do programa"
              className="rounded-xl shadow-2xl shadow-gold/20 w-full"
            />
            <img 
              src="/media/outra-preview2.jpg"
              alt="Preview do treino"
              className="rounded-xl shadow-2xl shadow-gold/20 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  )
}