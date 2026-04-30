'use client'

import { useEffect, useRef } from 'react'
import { Clock, BookOpen, TrendingDown } from 'lucide-react'

const painPoints = [
  {
    icon: Clock,
    text: 'Anos de treino. Mesmo corpo de sempre.',
  },
  {
    icon: BookOpen,
    text: 'Informação demais. Resultado de menos.',
  },
  {
    icon: TrendingDown,
    text: 'Carga não sobe. Espelho não muda.',
  },
]

export function Problem() {
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
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Title */}
        <h2 className="animate-on-scroll font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 md:mb-16 leading-tight">
          <span className="block md:whitespace-nowrap">
            Você treina há anos. O corpo parou de mudar.
          </span>

          <span className="block text-gold">
            O problema não é você — é o método.
          </span>
        </h2>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12 md:mb-16">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="animate-on-scroll bg-card border border-gold/20 rounded-lg p-6 md:p-8 text-center hover:border-gold/50 transition-colors"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <point.icon className="w-10 h-10 md:w-12 md:h-12 text-gold mx-auto mb-4" />
              <p className="text-foreground text-lg md:text-xl font-medium">{point.text}</p>
            </div>
          ))}
        </div>

        {/* Transition text — bloco de prova */}
<div className="animate-on-scroll text-center max-w-3xl mx-auto space-y-4">
  <p className="text-foreground/90 text-lg md:text-xl leading-relaxed">
    Mike Mentzer venceu o Mr. Olympia 1979 com pontuação perfeita treinando{' '}
    <span className="text-gold font-semibold">45 minutos, 2x por semana</span>.
  </p>

  <p className="text-foreground/90 text-lg md:text-xl leading-relaxed">
    Dorian Yates ganhou{' '}
    <span className="text-gold font-semibold">6 Mr. Olympia consecutivos</span>{' '}
    aplicando o mesmo princípio.
  </p>

  <p className="text-foreground text-xl md:text-2xl font-semibold pt-2">
    Não é coincidência. É ciência.
  </p>
</div>
      </div>
    </section>
  )
}