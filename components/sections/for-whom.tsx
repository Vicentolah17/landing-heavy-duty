'use client'

import { useEffect, useRef } from 'react'
import { Check } from 'lucide-react'

const bullets = [
  'Você treina há anos e o corpo não responde mais como antes',
  'Você tem trabalho, família, e não cabe mais 1h na academia',
  'Você quer prática direta — e entender o porquê de cada coisa',
  'Você sabe que esforço breve e intenso supera horas de moderado',
  'Você está disposto a treinar pesado de verdade — não muito',
  'Você odeia sair da academia agoniado pensando que se esgotou à toa',
]

export function ForWhom() {
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#000000] noise-bg relative">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Title */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-gold text-center mb-12 md:mb-16">
          ESSE TREINO É PRA VOCÊ SE:
        </h2>

        {/* Bullets */}
        <ul className="space-y-5 md:space-y-6 mb-12">
          {bullets.map((bullet, index) => (
            <li
              key={index}
              className="animate-on-scroll flex items-start gap-4"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <Check className="w-6 h-6 md:w-7 md:h-7 text-gold flex-shrink-0 mt-1" strokeWidth={2.5} />
              <span className="text-foreground text-lg md:text-xl leading-relaxed">
                {bullet}
              </span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="animate-on-scroll flex justify-center mb-8">
          <div className="h-px w-24 bg-gold/60" />
        </div>

        {/* Closing text */}
        <p className="animate-on-scroll text-center italic text-foreground/80 text-base md:text-lg max-w-2xl mx-auto">
          Se 3 desses descrevem seu cenário, o protocolo é pra você.
        </p>
      </div>
    </section>
  )
}
