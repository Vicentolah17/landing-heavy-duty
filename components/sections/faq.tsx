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
    question: 'Isso funciona para iniciantes?',
    answer: 'Sim, temos planos específicos para cada nível. Se você está começando, vai receber um treino adequado para o seu momento, com progressão gradual de intensidade.',
  },
  {
    question: 'Preciso de academia?',
    answer: 'Sim, os exercícios utilizam equipamentos de academia como barras, halteres e máquinas. O método foi desenvolvido para ser aplicado em ambiente de academia.',
  },
  {
    question: 'Como recebo minha planilha?',
    answer: 'Por email em até 24 horas após o pagamento. Você responde 3 perguntas rápidas e recebe o plano personalizado diretamente na sua caixa de entrada.',
  },
  {
    question: 'É realmente personalizado?',
    answer: 'Sim, baseado nas suas respostas você recebe o plano certo pro seu perfil e objetivo. São 6 variações diferentes (Iniciante/Intermediário/Avançado × Massa/Força).',
  },
  {
    question: 'Por que só R$37?',
    answer: 'Porque o objetivo é validar o método e ajudar o máximo de pessoas possível a treinar de forma inteligente. O preço sobe em breve.',
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
