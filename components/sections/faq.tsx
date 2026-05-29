'use client'

import { useEffect, useRef } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'Por que treinar menos cresce mais?',
    answer: 'Hipertrofia responde a estímulo máximo, não ao volume acumulado. Vinte séries mornas não cruzam o limite de adaptação — uma série até a falha cruza. O resto da semana é pra recuperação, que é quando o músculo de fato cresce.',
  },
  {
    question: 'Treinei pesado a vida toda. Vou conseguir aos 50?',
    answer: 'Sim, e provavelmente com mais facilidade do que aos 25. O método tem duas semanas de break-in a 60% da carga pra adaptar tendões e articulações antes da intensidade total. Você não começa na falha — você prepara o corpo pra ela.',
  },
  {
    question: 'Como sei qual dos 6 protocolos começar?',
    answer: 'Cada protocolo é nomeado pelo nível e objetivo (T1 — Iniciante/Massa até T6 — Avançado/Força). Se você está voltando depois de tempo parado, começa pelo T1 ou T2. Se já treina há anos com base, vai direto pro T3 ou T4. As progressões T5 e T6 são pra quem já dominou as fases anteriores. Você nunca fica preso: conforme dominar uma fase, sobe pra próxima.',
  },
  {
    question: 'Como sei que vai funcionar pra mim?',
    answer: 'Não vai saber por garantia. Vai saber por aplicação. Os princípios que sustentam o Protocolo BRUTO foram aplicados por campeões da golden era e estão hoje validados pela ciência da hipertrofia. O resultado depende de você aplicar com a intensidade que o método exige.',
  },
  {
    question: 'Preciso de academia?',
    answer: 'Sim. Os exercícios usam barras, halteres e máquinas — método feito pra academia. Não é treino de casa.',
  },
  {
    question: 'Como recebo o método?',
    answer: 'Acesso imediato após a compra. Tudo fica liberado na sua área de membros Hotmart — os 6 protocolos progressivos, o aquecimento, a tabela de progressão. Sem espera, sem etapa intermediária.',
  },
  {
    question: 'Por que custa R$ 37?',
    answer: 'Porque é a fase de validação do método no Brasil. O preço baixo é pra remover barreira de entrada — não porque o conteúdo seja genérico. O PDF é estruturado, com aquecimento dedicado, técnica detalhada, progressão registrada e regras claras.',
  },
]

export function FAQ() {
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
    <section ref={sectionRef} className="py-20 md:py-24 bg-background noise-bg relative">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* H2 */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-10 md:mb-14 leading-tight">
          Perguntas{' '}
          <span className="text-gold">frequentes.</span>
        </h2>

        {/* Accordion */}
        <div className="animate-on-scroll">
          <Accordion type="single" collapsible className="space-y-3 md:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-gold/20 rounded-lg px-5 md:px-6 data-[state=open]:border-gold/40 transition-colors"
              >
                <AccordionTrigger className="text-left font-heading text-base md:text-lg font-medium text-foreground hover:text-gold hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-foreground/80 text-sm md:text-base leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
