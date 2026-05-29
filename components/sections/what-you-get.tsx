'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { Check } from 'lucide-react'

const features = [
  'Acesso imediato após a compra. Tudo liberado na sua área de membros Hotmart. Sem espera. Sem app. Sem etapa intermediária.',
  '6 protocolos progressivos — do iniciante ao avançado, massa e força',
  'Divisão semanal estruturada — Treino A e Treino B alternados',
  'Exercícios com séries, repetições, cadência e técnica de pré-exaustão',
  'Tabela de progressão de carga semana a semana',
  'Página dedicada ao aquecimento — anti-lesão pra quem treina pesado',
  'Protocolo de break-in nas duas primeiras semanas (adaptação de tendões)',
]

const protocols = [
  { code: 'T1', level: 'Iniciante', goal: 'Massa' },
  { code: 'T2', level: 'Iniciante', goal: 'Força' },
  { code: 'T3', level: 'Intermediário', goal: 'Massa' },
  { code: 'T4', level: 'Intermediário', goal: 'Força' },
  { code: 'T5', level: 'Avançado', goal: 'Massa' },
  { code: 'T6', level: 'Avançado', goal: 'Força' },
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
          O método completo.{' '}
          <span className="text-gold">Acesso imediato.</span>
        </h2>

        {/* Subhead */}
        <p className="animate-on-scroll text-center text-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-14 leading-relaxed">
          6 protocolos progressivos. Do iniciante ao avançado.
          <br />
          Você navega entre eles conforme dominar cada fase.
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

        {/* Grid T1–T6 */}
        <div className="animate-on-scroll mb-16">
          <p className="text-center text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-6">
            Os 6 protocolos do método
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {protocols.map((p) => (
              <div
                key={p.code}
                className="flex items-center gap-4 border border-gold/20 rounded-lg px-5 py-4 hover:border-gold/40 transition-colors"
              >
                <span className="font-heading text-2xl md:text-3xl text-gold leading-none w-10 flex-shrink-0">
                  {p.code}
                </span>
                <div>
                  <p className="text-foreground font-medium text-sm md:text-base leading-tight">
                    {p.level}
                  </p>
                  <p className="text-foreground/50 text-xs md:text-sm mt-0.5">
                    {p.goal}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Preview spread */}
        <div className="animate-on-scroll mb-16">
          {/* Label */}
          <p className="text-center text-gold text-xs tracking-[0.25em] uppercase font-semibold mb-3">
            Veja por dentro
          </p>
          <p className="text-center text-foreground/60 text-sm mb-10 leading-relaxed">
            Não é imagem genérica. É o método real que você acessa na hora.
          </p>

          {/* Spread de imagens */}
          <div className="relative flex items-end justify-center gap-0 px-4 md:px-0">

            {/* Esquerda — Sumário */}
            <div
              className="relative w-[30%] max-w-[160px] flex-shrink-0 -rotate-6 translate-y-4 z-10
                         drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]
                         transition-transform duration-300 hover:-rotate-3 hover:translate-y-1 hover:z-30"
            >
              <div className="rounded-lg overflow-hidden border border-white/8 ring-1 ring-black/40">
                <Image
                  src="/media/preview_nova1.png"
                  alt="Sumário do protocolo"
                  width={420}
                  height={672}
                  className="w-full h-auto"
                  quality={90}
                />
              </div>
            </div>

            {/* Centro — Treino A (destaque) */}
            <div
              className="relative w-[40%] max-w-[220px] flex-shrink-0 z-20 -mx-4 md:-mx-6
                         drop-shadow-[0_28px_50px_rgba(184,150,46,0.18)]
                         transition-transform duration-300 hover:scale-[1.03] hover:z-30"
            >
              {/* Badge no topo */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-gold px-3 py-1 rounded-full">
                <span className="text-black text-[10px] font-bold tracking-widest uppercase whitespace-nowrap">
                  Nível de detalhe
                </span>
              </div>
              <div className="rounded-lg overflow-hidden border border-gold/30 ring-1 ring-gold/10">
                <Image
                  src="/media/preview_nova3.png"
                  alt="Sessão de treino detalhada"
                  width={420}
                  height={672}
                  className="w-full h-auto"
                  quality={90}
                />
              </div>
            </div>

            {/* Direita — Boas-vindas */}
            <div
              className="relative w-[30%] max-w-[160px] flex-shrink-0 rotate-6 translate-y-4 z-10
                         drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]
                         transition-transform duration-300 hover:rotate-3 hover:translate-y-1 hover:z-30"
            >
              <div className="rounded-lg overflow-hidden border border-white/8 ring-1 ring-black/40">
                <Image
                  src="/media/preview_nova2.png"
                  alt="Boas-vindas e introdução"
                  width={420}
                  height={672}
                  className="w-full h-auto"
                  quality={90}
                />
              </div>
            </div>
          </div>

          {/* Caption discreta */}
          <p className="text-center text-foreground/35 text-xs mt-8 tracking-wide">
            Exercícios · Séries · Reps · Carga · Progressão semana a semana
          </p>
        </div>

        {/* Bloco de acesso */}
        <div className="animate-on-scroll bg-card/50 border border-gold/15 rounded-lg p-6 md:p-8 mb-10">
          <p className="text-foreground text-lg md:text-xl font-semibold mb-3">
            Acesso imediato após a compra.
          </p>
          <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
            Tudo liberado na sua área de membros Hotmart.
            <br />
            Sem espera, sem formulário, sem etapa intermediária.
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
