'use client'

import { useEffect, useRef } from 'react'
import { Zap, Timer, CalendarDays } from 'lucide-react'

const principles = [
  {
    icon: Zap,
    title: 'INTENSIDADE',
    rule: '1 série até a falha muscular absoluta.',
    mechanism: 'Hipertrofia responde a estímulo máximo, não ao acumulado. 20 séries mornas não cruzam o limite — uma série até a falha cruza.',
  },
  {
    icon: Timer,
    title: 'DURAÇÃO',
    rule: '30 minutos. Não mais que isso.',
    mechanism: 'Intensidade real esgota o sistema nervoso rápido. Se o treino passou de 30 min, a intensidade não foi alta.',
  },
  {
    icon: CalendarDays,
    title: 'FREQUÊNCIA',
    rule: '4 a 7 dias de descanso entre cada sessão.',
    mechanism: 'Músculo cresce na recuperação, não na academia. Treinar antes disso é treinar em cima de fadiga.',
  },
]

export function Method() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-background noise-bg relative overflow-hidden">
      {/* Gradiente dourado sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,150,46,0.05)_0%,_transparent_70%)]" />

      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        {/* H2 */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-4 md:mb-6 leading-tight text-balance">
          Três princípios.
          <br />
          <span className="text-gold">Trinta anos de aplicação em campeões.</span>
        </h2>

        {/* Subhead */}
        <p className="animate-on-scroll text-center text-foreground/80 text-base md:text-lg max-w-2xl mx-auto mb-14 md:mb-16 leading-relaxed">
          O que Mentzer formulou nos anos 80 não é teoria.
          <br />
          É como o corpo responde — e a academia moderna esqueceu.
        </p>

        {/* Princípios — grid 3 colunas */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 mb-16 md:mb-20">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="animate-on-scroll text-center"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Ícone */}
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gold/10 border border-gold/30 rounded-full mb-5">
                <principle.icon className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              </div>

              {/* Título */}
              <h3 className="font-heading text-xl md:text-2xl font-bold text-gold mb-4 tracking-wide">
                {principle.title}
              </h3>

              {/* Regra */}
              <p className="text-foreground text-base md:text-lg font-semibold mb-3 leading-snug">
                {principle.rule}
              </p>

              {/* Mecanismo */}
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                {principle.mechanism}
              </p>
            </div>
          ))}
        </div>

        {/* Closer — ponte pro Protocolo BRUTO */}
        <div className="animate-on-scroll max-w-3xl mx-auto text-center">
          <p className="text-foreground/90 text-lg md:text-xl leading-relaxed">
            Esses princípios são universais.
            <br className="hidden md:inline" />
            {' '}
            <span className="text-gold font-semibold">Protocolo BRUTO é como você aplica eles na sua semana</span> —
            sem virar acadêmico de fisiologia, sem chutar carga, sem inventar.
          </p>
        </div>
      </div>
    </section>
  )
}