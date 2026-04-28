'use client'

/**
 * Quiz interativo do Heavy Duty Method.
 *
 * Faz 5 perguntas e mapeia o respondente pra um dos 6 PDFs (T1..T6) com
 * base em duas perguntas decisivas:
 *   - P2 define o nível: Iniciante (I) | Intermediário (M) | Avançado (A)
 *   - P3 define o objetivo: Massa | Força
 *
 * Mapa de combinação:
 *   I+Massa => T1   M+Massa => T2   A+Massa => T3
 *   I+Força => T4   M+Força => T5   A+Força => T6
 *
 * As outras perguntas (P1, P4, P5) não influenciam o mapeamento — servem
 * pra engajamento, qualificação de intenção e personalização da copy
 * de resultado (especialmente P4, que define a headline da dor).
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Flame,
  Sparkles,
  Target,
} from 'lucide-react'
import { HeavyDutyEvents } from '@/lib/meta-pixel'

const HOTMART_URL = 'https://pay.hotmart.com/M105294904O'

// ---------------------------------------------------------------------------
// Perguntas
// ---------------------------------------------------------------------------

type Question = {
  id: number
  title: string
  subtitle?: string
  options: string[]
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Há quanto tempo você treina sério?',
    subtitle: 'Sem contar fases que você só ia na academia pra postar story.',
    options: [
      'Menos de 1 ano',
      '1 a 3 anos',
      '3 a 5 anos',
      'Mais de 5 anos',
    ],
  },
  {
    id: 2,
    title: 'Qual seu nível atual de treino?',
    subtitle: 'Seja honesto. O método só funciona se a prescrição for certa.',
    options: [
      'Iniciante — ainda aprendendo execução dos exercícios',
      'Intermediário — já tenho boa base, mas progresso travou',
      'Avançado — já testei vários métodos, quero algo cientificamente real',
    ],
  },
  {
    id: 3,
    title: 'Qual seu objetivo principal AGORA?',
    subtitle: 'Foco em uma meta. Quem corre atrás de duas, perde as duas.',
    options: [
      'Hipertrofia — quero ganhar massa muscular máxima',
      'Força — quero ficar mais forte e progredir nas cargas',
    ],
  },
  {
    id: 4,
    title: 'O que mais te frustra no seu treino atual?',
    subtitle: 'Sua resposta define a abordagem do seu programa.',
    options: [
      'Treinar 5-6x por semana e não ver resultado',
      'Não saber se tô treinando certo',
      'Falta de tempo pra ficar horas na academia',
      'Estagnação total — não cresço mais',
    ],
  },
  {
    id: 5,
    title: 'Se eu te entregasse o método certo agora, você aplicaria?',
    subtitle: 'Método sem execução é entretenimento.',
    options: [
      'Sim, começo essa semana',
      'Sim, mas preciso de mais informações',
      'Talvez, depende',
    ],
  },
]

// ---------------------------------------------------------------------------
// Mapeamento de plano (lógica decisiva: P2 + P3)
// ---------------------------------------------------------------------------

type Level = 'I' | 'M' | 'A'
type Goal = 'Massa' | 'Força'
type PlanCode = 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6'

// P2 (índice 0/1/2) -> nível
const LEVEL_FROM_P2: Record<number, Level> = { 0: 'I', 1: 'M', 2: 'A' }
// P3 (índice 0/1) -> objetivo
const GOAL_FROM_P3: Record<number, Goal> = { 0: 'Massa', 1: 'Força' }

// Combinação nível+objetivo -> PDF.
const PLAN_MAP: Record<`${Level}-${Goal}`, PlanCode> = {
  'I-Massa': 'T1',
  'M-Massa': 'T2',
  'A-Massa': 'T3',
  'I-Força': 'T4',
  'M-Força': 'T5',
  'A-Força': 'T6',
}

type Plan = {
  code: PlanCode
  label: string // ex.: "Intermediário Massa"
  level: Level
  levelLabel: string
  goal: Goal
  bullets: string[]
}

const PLANS: Record<PlanCode, Plan> = {
  T1: {
    code: 'T1',
    label: 'Iniciante Massa',
    level: 'I',
    levelLabel: 'Iniciante',
    goal: 'Massa',
    bullets: [
      'Estrutura ABC com os exercícios compostos certos pra você dominar a base',
      'Frequência calibrada: 3-4 treinos por semana com recuperação real',
      'Foco em técnica perfeita antes de carga máxima',
      'Tabela semanal de progressão de carga pra não chutar peso',
    ],
  },
  T2: {
    code: 'T2',
    label: 'Intermediário Massa',
    level: 'M',
    levelLabel: 'Intermediário',
    goal: 'Massa',
    bullets: [
      'Split otimizado pra hipertrofia com volume controlado (sem volume inútil)',
      'Treino até a falha verdadeira em séries de 6 a 10 reps',
      'Técnicas de intensidade: rest-pause, drop-sets e parciais aplicadas com critério',
      'Periodização pra romper o platô que travou seu crescimento',
    ],
  },
  T3: {
    code: 'T3',
    label: 'Avançado Massa',
    level: 'A',
    levelLabel: 'Avançado',
    goal: 'Massa',
    bullets: [
      'HIT puro de Mentzer: 1 série brutal por exercício, falha absoluta',
      'Frequência mínima (2-3x semana) pra recuperação completa do SNC',
      'Estratégias de pré-exaustão pra recrutar fibras que treino comum não pega',
      'Ciclos de deload programados pra evoluir sem overtraining',
    ],
  },
  T4: {
    code: 'T4',
    label: 'Iniciante Força',
    level: 'I',
    levelLabel: 'Iniciante',
    goal: 'Força',
    bullets: [
      'Padrões de movimento dos 4 grandes: agachamento, supino, terra e desenvolvimento',
      'Progressão linear semanal — você sai mais forte de cada treino',
      'Séries de 3 a 5 reps com carga submáxima pra construir base neural',
      'Técnica blindada antes de qualquer tentativa de PR',
    ],
  },
  T5: {
    code: 'T5',
    label: 'Intermediário Força',
    level: 'M',
    levelLabel: 'Intermediário',
    goal: 'Força',
    bullets: [
      'Periodização linear em blocos de força com cargas pesadas',
      'Trabalho em 3 a 5 reps onde força é construída de verdade',
      'Acessórios estratégicos pra fortalecer pontos fracos identificados',
      'Testes de 1RM intermediários pra calibrar progressão e quebrar platô',
    ],
  },
  T6: {
    code: 'T6',
    label: 'Avançado Força',
    level: 'A',
    levelLabel: 'Avançado',
    goal: 'Força',
    bullets: [
      'Periodização ondulatória avançada — diferentes estímulos na mesma semana',
      'Trabalho em zonas de 1 a 3 reps com cargas máximas controladas',
      'Estratégias de pico de força pra ultrapassar PRs antigos',
      'Gestão de fadiga sistêmica e recuperação ativa programada',
    ],
  },
}

/**
 * Headline emocional da tela de resultado, baseada em P4 (a dor).
 * Usa o índice da resposta de P4. Fallback genérico se não respondida.
 */
function headlineFromPain(painIndex: number | undefined, plan: PlanCode): string {
  switch (painIndex) {
    case 0:
      return 'Você tá treinando demais. O Heavy Duty inverte essa lógica.'
    case 1:
      return `Chega de adivinhar. Seu programa ${plan} é prescrição, não palpite.`
    case 2:
      return '2 a 3 treinos por semana. Curto, brutal, eficaz.'
    case 3:
      return `Quando o método tá errado, mais esforço não resolve. Seu ${plan} vai destravar.`
    default:
      return `Seu programa ${plan} foi calibrado pro seu perfil exato.`
  }
}

// ---------------------------------------------------------------------------
// Componente
// ---------------------------------------------------------------------------

export default function Quiz() {
  // -1 = tela de intro, 0..4 = perguntas, 5 = resultado
  const [step, setStep] = useState<number>(-1)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const sectionRef = useRef<HTMLElement>(null)

  // Animação simples: forçamos remount via key e aplicamos fade/slide
  const [animKey, setAnimKey] = useState(0)
  useEffect(() => {
    setAnimKey((k) => k + 1)
  }, [step])

  // Observer pra fade-in do bloco completo no scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll')
    elements?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  // ---- Cálculo do plano (memoizado) ---------------------------------------
  const plan: Plan | null = useMemo(() => {
    const p2 = answers[2]
    const p3 = answers[3]
    if (p2 === undefined || p3 === undefined) return null
    const level = LEVEL_FROM_P2[p2]
    const goal = GOAL_FROM_P3[p3]
    if (!level || !goal) return null
    const code = PLAN_MAP[`${level}-${goal}`]
    return PLANS[code]
  }, [answers])

  // ---- Side effects de tracking ao chegar no resultado --------------------
  const trackedResultRef = useRef(false)
  useEffect(() => {
    if (step === 5 && plan && !trackedResultRef.current) {
      trackedResultRef.current = true
      // viewContent: payload padrão de produto (definido em lib/meta-pixel.ts)
      HeavyDutyEvents.viewContent()
      // quizCompleted: dispara CompleteRegistration com plan/level/goal + value
      HeavyDutyEvents.quizCompleted(plan.code, plan.levelLabel, plan.goal)
    }
  }, [step, plan])

  // ---- Handlers -----------------------------------------------------------
  const start = () => setStep(0)

  const selectAnswer = (questionIndex: number, optionIndex: number) => {
    const newAnswers = { ...answers, [questionIndex + 1]: optionIndex }
    setAnswers(newAnswers)

    const q = QUESTIONS[questionIndex]
    // step_name = título curto da pergunta (sem ponto interrogativo final)
    HeavyDutyEvents.quizStepCompleted(
      q.id,
      QUESTIONS.length,
      q.title.replace(/\?$/, '')
    )

    // Avança automaticamente após pequena pausa (feedback visual de seleção)
    setTimeout(() => {
      if (questionIndex < QUESTIONS.length - 1) {
        setStep(questionIndex + 1)
      } else {
        setStep(5) // resultado
      }
    }, 220)
  }

  const goBack = () => {
    if (step <= 0) {
      setStep(-1)
    } else if (step === 5) {
      setStep(QUESTIONS.length - 1)
    } else {
      setStep(step - 1)
    }
  }

  const restart = () => {
    setAnswers({})
    trackedResultRef.current = false
    setStep(-1)
  }

  const handleCheckoutClick = () => {
    if (plan) {
      HeavyDutyEvents.initiateCheckout(`quiz_result_${plan.code}`)
    }
  }

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------
  return (
    <section
      ref={sectionRef}
      id="quiz"
      className="py-20 md:py-28 bg-[#161616] noise-bg relative"
      aria-labelledby="quiz-heading"
    >
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="animate-on-scroll">
          {step === -1 && <IntroCard onStart={start} />}

          {step >= 0 && step < QUESTIONS.length && (
            <QuestionCard
              key={animKey}
              questionIndex={step}
              total={QUESTIONS.length}
              question={QUESTIONS[step]}
              selected={answers[QUESTIONS[step].id]}
              onSelect={(opt) => selectAnswer(step, opt)}
              onBack={goBack}
              isFirst={step === 0}
            />
          )}

          {step === 5 && plan && (
            <ResultCard
              key={animKey}
              plan={plan}
              painIndex={answers[4]}
              onBack={goBack}
              onRestart={restart}
              onCheckoutClick={handleCheckoutClick}
            />
          )}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Sub-componentes
// ---------------------------------------------------------------------------

function IntroCard({ onStart }: { onStart: () => void }) {
  return (
    <div className="rounded-2xl border border-gold/30 bg-background/40 p-8 md:p-12 text-center shadow-lg shadow-black/20">
      <div className="flex justify-center mb-5">
        <div className="w-14 h-14 rounded-full bg-gold/15 flex items-center justify-center">
          <Target className="w-7 h-7 text-gold" strokeWidth={2} />
        </div>
      </div>
      <h2
        id="quiz-heading"
        className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
      >
        DESCUBRA QUAL PROTOCOLO É O SEU
      </h2>
      <p className="text-foreground/80 text-base md:text-lg mb-8 max-w-lg mx-auto">
        Cinco perguntas sobre seu nível, seu objetivo e seu tempo disponível. 
        Em 1 minuto, você tem clareza sobre qual protocolo aplicar.
      </p>
      <button
        type="button"
        onClick={onStart}
        className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-black font-heading text-lg md:text-xl px-8 py-4 rounded-lg shadow-lg shadow-gold/20 transition-all hover:shadow-xl hover:shadow-gold/30 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
      >
        COMEÇAR O QUIZ
        <ArrowRight className="w-5 h-5" />
      </button>
      <p className="text-foreground/50 text-xs md:text-sm mt-5">
        Sem cadastro. Sem email. 
        Você recebe o resultado na tela; o plano completo chega depois da compra.
      </p>
    </div>
  )
}

function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2 text-xs md:text-sm font-medium">
        <span className="text-foreground/60">
          Pergunta {current + 1} de {total}
        </span>
        <span className="text-gold">{Math.round(pct)}%</span>
      </div>
      <div className="h-1.5 w-full bg-foreground/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gold transition-all duration-300 ease-out"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={current + 1}
          aria-valuemin={1}
          aria-valuemax={total}
        />
      </div>
    </div>
  )
}

function QuestionCard({
  questionIndex,
  total,
  question,
  selected,
  onSelect,
  onBack,
  isFirst,
}: {
  questionIndex: number
  total: number
  question: Question
  selected: number | undefined
  onSelect: (optionIndex: number) => void
  onBack: () => void
  isFirst: boolean
}) {
  return (
    <div className="quiz-step-enter rounded-2xl border border-foreground/10 bg-background/40 p-6 md:p-10 shadow-lg shadow-black/20">
      <ProgressBar current={questionIndex} total={total} />

      <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 leading-tight">
        {question.title}
      </h3>
      {question.subtitle && (
        <p className="text-foreground/60 text-sm md:text-base mb-6">
          {question.subtitle}
        </p>
      )}

      <div
        role="radiogroup"
        aria-label={question.title}
        className="space-y-3 mb-6"
      >
        {question.options.map((option, idx) => {
          const isSelected = selected === idx
          return (
            <button
              key={idx}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(idx)}
              className={[
                'w-full text-left px-5 py-4 rounded-xl border transition-all duration-200',
                'flex items-center gap-3 group',
                'focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background',
                isSelected
                  ? 'border-gold bg-gold/10 shadow-md shadow-gold/10'
                  : 'border-foreground/10 hover:border-gold/60 hover:bg-foreground/[0.03]',
              ].join(' ')}
            >
              <span
                className={[
                  'flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
                  isSelected
                    ? 'border-gold bg-gold'
                    : 'border-foreground/30 group-hover:border-gold/60',
                ].join(' ')}
                aria-hidden
              >
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-black" />
                )}
              </span>
              <span className="text-foreground text-base md:text-lg leading-snug">
                {option}
              </span>
            </button>
          )
        })}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-gold text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gold rounded px-2 py-1"
          aria-label={isFirst ? 'Voltar para a introdução' : 'Voltar para a pergunta anterior'}
        >
          <ArrowLeft className="w-4 h-4" />
          {isFirst ? 'Voltar' : 'Pergunta anterior'}
        </button>

        <span className="text-foreground/40 text-xs">
          Selecione uma opção pra continuar
        </span>
      </div>
    </div>
  )
}

function ResultCard({
  plan,
  painIndex,
  onBack,
  onRestart,
  onCheckoutClick,
}: {
  plan: Plan
  painIndex: number | undefined
  onBack: () => void
  onRestart: () => void
  onCheckoutClick: () => void
}) {
  const headline = headlineFromPain(painIndex, plan.code)

  return (
    <div className="quiz-step-enter rounded-2xl border border-gold/30 bg-background/40 p-7 md:p-12 shadow-lg shadow-black/30 text-center">
      {/* Badge */}
      <div className="inline-flex items-center gap-2 text-gold text-xs md:text-sm font-medium border border-gold/40 bg-gold/5 rounded-full px-4 py-1.5 mb-6">
        <Sparkles className="w-3.5 h-3.5" />
        Plano personalizado pro seu perfil
      </div>

      {/* PDF code */}
      <div className="mb-3">
        <span className="font-heading text-foreground/60 text-sm md:text-base tracking-widest">
          PROGRAMA RECOMENDADO
        </span>
      </div>
      <h2 className="font-heading text-4xl md:text-6xl font-bold text-gold mb-2 leading-none">
        {plan.code} — {plan.label.toUpperCase()}
      </h2>

      {/* Headline emocional baseada em P4 */}
      <p className="text-foreground text-lg md:text-2xl font-medium mt-6 mb-8 max-w-xl mx-auto leading-snug">
        {headline}
      </p>

      {/* Bullets do plano */}
      <ul className="text-left space-y-3 mb-10 max-w-lg mx-auto">
        {plan.bullets.map((bullet, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle2
              className="w-5 h-5 md:w-6 md:h-6 text-gold flex-shrink-0 mt-0.5"
              strokeWidth={2}
            />
            <span className="text-foreground/90 text-sm md:text-base leading-relaxed">
              {bullet}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a
        href={HOTMART_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onCheckoutClick}
        className="inline-flex items-center gap-2 bg-gold hover:bg-gold/90 text-black font-heading text-lg md:text-xl px-8 py-5 rounded-lg shadow-lg shadow-gold/30 transition-all hover:shadow-xl hover:shadow-gold/40 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-background"
      >
        <Flame className="w-5 h-5" />
        QUERO MEU PROGRAMA {plan.code} AGORA
      </a>

      <p className="text-foreground/50 text-xs md:text-sm mt-4">
        Pagamento único. Acesso vitalício. Garantia de 7 dias.
      </p>

      {/* Ações secundárias */}
      <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-foreground/10">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-foreground/60 hover:text-gold text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Revisar resposta
        </button>
        <button
          type="button"
          onClick={onRestart}
          className="text-foreground/60 hover:text-gold text-sm font-medium transition-colors"
        >
          Refazer o quiz
        </button>
      </div>
    </div>
  )
}
