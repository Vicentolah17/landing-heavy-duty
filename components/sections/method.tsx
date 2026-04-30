'use client'

import { useEffect, useRef } from 'react'
import { Zap, Timer, CalendarDays } from 'lucide-react'

const principles = [
  {
    icon: Zap,
    title: 'INTENSIDADE',
    description: '1 série até a falha absoluta supera 20 séries mornas. \nHipertrofia responde ao estímulo máximo, não ao acumulado.',
  },
  {
    icon: Timer,
    title: 'DURAÇÃO',
    description: 'Treinos de 30 a 45 minutos. \nMais que isso significa que a intensidade não foi alta o suficiente.',
  },
  {
    icon: CalendarDays,
    title: 'FREQUÊNCIA',
    description: '4 a 7 dias de descanso entre cada sessão de treino. \nO músculo cresce no descanso, não na academia.',
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
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      
      {/* Imagem de fundo com opacidade 30% */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('/media/mentzer4.webp')",
          opacity: 0.3
        }} 
      />
      
      {/* Overlay escuro para garantir legibilidade */}
      <div className="absolute inset-0 bg-[#1C1C1C]/70" />

      {/* Gradiente dourado sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(184,150,46,0.05)_0%,_transparent_70%)]" />

      {/* Conteúdo — z-10 garante que fica acima de tudo */}
      <div className="relative z-10 container mx-auto px-4 max-w-6xl">
        <h2 className="animate-on-scroll opacity-100 font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gold text-center mb-12 md:mb-16">
          Os 3 Princípios que mudam tudo
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <div
              key={index}
              className="animate-on-scroll opacity-100 text-center"
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gold/10 border border-gold/30 rounded-full mb-6">
                <principle.icon className="w-8 h-8 md:w-10 md:h-10 text-gold" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
                {principle.title}
              </h3>
              <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
