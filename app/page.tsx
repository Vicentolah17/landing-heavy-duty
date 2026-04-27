import { Hero } from '@/components/sections/hero'
import { Problem } from '@/components/sections/problem'
import { Method } from '@/components/sections/method'
import { WhatYouGet } from '@/components/sections/what-you-get'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Quote } from '@/components/sections/quote'
import { ForWhom } from '@/components/sections/for-whom'
import { Guarantee } from '@/components/sections/guarantee'
import { FAQ } from '@/components/sections/faq'
import { FinalCTA } from '@/components/sections/final-cta'
import { Footer } from '@/components/sections/footer'
import Quiz from '@/components/Quiz'

export default function HeavyDutyLanding() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Problem />
      <Method />
      <WhatYouGet />
      <HowItWorks />
      <Quote />
      <ForWhom />
      <Quiz />
      <Guarantee />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  )
}
