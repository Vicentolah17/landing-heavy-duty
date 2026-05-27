'use client'

import { useEffect, useRef } from 'react'
import { Clock, TrendingDown, Dumbbell } from 'lucide-react'

const painPoints = [
  {
    icon: Clock,
    text: '"Treino há mais de uma década.\nA carga parou de subir."',
  },
  {
    icon: TrendingDown,
    text: '"Faço mais série pra crescer.\nO corpo não responde mais como antes."',
  },
  {
    icon: Dumbbell,
    text: '"Saio da academia exausto.\nSem ter movido nada de verdade."',
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#0A0A0A] noise-bg relative">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Title */}
        <h2 className="animate-on-scroll font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 md:mb-16 leading-tight text-balance">
          Você não está fraco.
          <br />
          Você não está sem disciplina.
          <br />
          <span className="text-gold">Você está aplicando volume onde precisa de intensidade.</span>
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
              <p className="text-foreground text-base md:text-lg italic leading-relaxed whitespace-pre-line">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        {/* Transition / Proof block */}
        <div className="animate-on-scroll max-w-3xl mx-auto text-center space-y-4">
          <p className="text-foreground/90 text-lg md:text-xl leading-relaxed">
            Os princípios que reinventaram o fisiculturismo nos anos 80 diziam o oposto do que a academia moderna te ensinou.
          </p>

          <p className="text-foreground text-xl md:text-2xl font-semibold leading-relaxed">
            Mais carga, menos volume.
            <br />
            Menos frequência, mais recuperação.
          </p>

          <p className="text-foreground/80 text-base md:text-lg leading-relaxed pt-2">
            Não é teoria. É como os campeões da golden era construíram corpos que ninguém mais consegue replicar treinando seis dias por semana.
          </p>
        </div>
      </div>
    </section>
  )
}