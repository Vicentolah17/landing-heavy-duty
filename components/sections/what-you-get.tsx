'use client'

import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

const features = [
  'Plano de treino montado pro seu nível e objetivo',
  'Divisão semanal completa — Treino A e Treino B alternados',
  'Exercícios com séries, repetições, cadência e técnica (pré-exaustão aplicada)',
  'Tabela de progressão de carga semana a semana',
  'Página dedicada ao aquecimento — anti-lesão pra quem treina pesado',
  'Protocolo de break-in nas duas primeiras semanas (adaptação de tendões)',
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#0A0A0A] noise-bg relative">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* H2 */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4 md:mb-6 leading-tight">
          O que chega no seu{' '}
          <span className="text-gold">email.</span>
        </h2>

        {/* Subhead */}
        <p className="animate-on-scroll text-center text-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-14 leading-relaxed">
          Não é planilha solta. Não é catálogo.
          <br />
          É o protocolo certo pro seu nível, aplicado direto.
        </p>

        {/* Features list */}
        <div className="animate-on-scroll mb-12">
          <ul className="space-y-4 md:space-y-5">
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

        {/* Bloco de entrega */}
        <div className="animate-on-scroll bg-card/50 border border-gold/15 rounded-lg p-6 md:p-8 mb-10">
          <p className="text-foreground text-lg md:text-xl font-semibold mb-3">
            Entrega em até 24h.
          </p>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
            Você responde um formulário curto por email após a compra.
            <br />
            Eu monto seu plano e envio.
          </p>
        </div>

        {/* Divisor */}
        <div className="animate-on-scroll flex justify-center mb-8">
          <div className="h-px w-24 bg-gold/30" />
        </div>

        {/* Order bump */}
        <div className="animate-on-scroll text-center max-w-2xl mx-auto">
          <p className="text-foreground/60 text-sm md:text-base mb-3 tracking-wide uppercase">
            No checkout, opcional:
          </p>
          <p className="font-heading text-xl md:text-2xl text-gold font-semibold mb-4">
            Kit Aplicação BRUTO — R$ 19
          </p>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
            Planner mensal de treino + planilha de progressão de cargas
            que compara semana a semana automaticamente.
          </p>
          <p className="text-foreground/60 text-sm md:text-base italic mt-3">
            Pra quem quer aplicar com rigor, não na intuição.
          </p>
        </div>
      </div>
    </section>
  )
}