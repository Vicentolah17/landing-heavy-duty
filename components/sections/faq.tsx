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
    answer: 'Hipertrofia é uma resposta de adaptação. O músculo só cresce quando o estímulo ultrapassa o que ele já suporta — e isso só acontece em séries levadas à falha real. Treinar 5x por semana com séries moderadas mantém o corpo no esforço médio, abaixo do limite de adaptação. Treinar 2-3x com intensidade máxima cruza esse limite. Mentzer testou. Yates aplicou em 6 Mr. Olympia consecutivos.',
  },
  {
    question: 'Como sei que vai funcionar pra mim?',
    answer: 'Você não vai saber por garantia. Vai saber por aplicação. O método é o mesmo que o Mentzer aplicou no Mr. Olympia 1979 e o Yates aplicou em 6 títulos consecutivos. A ciência da hipertrofia confirma os princípios. Mas não vou prometer X kg em Y semanas — qualquer um que faz isso tá mentindo. O que prometo é o método estruturado, com progressão registrada. O resultado depende de você aplicar com a intensidade que o método exige.',
  },
  {
    question: 'Já tentei outros métodos, por que esse seria diferente?',
    answer: 'Porque a maioria dos outros métodos pede mais volume — mais séries, mais frequência, mais tempo na academia. Heavy Duty pede o oposto: menos volume, mais intensidade, mais descanso. Se você já fez bro split, ABC, ABCDE, push-pull-legs e estagnou, é provável que o problema não seja escolha de divisão, mas excesso de volume sem recuperação. O método ataca exatamente isso.',
  },
  {
    question: 'Funciona pra iniciante?',
    answer: 'Sim. O plano de iniciante começa com um break-in de duas semanas a 60% da carga, justamente pra adaptar tendões e articulações antes de levar uma série até a falha. A progressão é gradual e registrada. Se você treina há pouco tempo, o método te leva ao ponto de aplicar intensidade real sem se machucar.',
  },
  {
    question: 'Preciso de academia?',
    answer: 'Sim. Os exercícios usam barras, halteres e máquinas — o método foi desenhado pra ambiente de academia. Não é treino de casa.',
  },
  {
    question: 'É realmente personalizado?',
    answer: 'Sim. Você responde um quiz curto sobre seu nível e objetivo, e eu monto o plano usando o protocolo que faz sentido pro seu caso. A entrega é por email em até 24h após o pagamento.',
  },
  {
    question: 'Por que custa R$ 37?',
    answer: 'Porque é a fase de validação do método. O preço baixo é pra remover barreira de entrada, não porque o conteúdo seja genérico. O PDF tem 12 páginas estruturadas, com aquecimento, divisão semanal, técnicas avançadas (pré-exaustão, cadência 4s/2s/4s), tabela de progressão e regras claras.',
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
    <section ref={sectionRef} className="py-20 md:py-28 bg-background noise-bg relative">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Title */}
        <h2 className="animate-on-scroll font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center mb-12 md:mb-16">
          Perguntas frequentes
        </h2>

        {/* Accordion */}
        <div className="animate-on-scroll">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-gold/20 rounded-lg px-6 data-[state=open]:border-gold/40"
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
