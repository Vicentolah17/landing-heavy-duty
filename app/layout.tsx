import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const bebasNeue = Bebas_Neue({ 
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  weight: ['400']
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600']
})

export const metadata: Metadata = {
  title: 'Heavy Duty Method | Treine Menos. Cresça Mais.',
  description: 'O Sistema Heavy Duty de Mike Mentzer — o único método de treino baseado em ciência real. Planilha de treino personalizada por apenas R$37.',
  keywords: ['heavy duty', 'mike mentzer', 'treino intenso', 'hipertrofia', 'musculação', 'bodybuilding'],
  openGraph: {
    title: 'Heavy Duty Method | Treine Menos. Cresça Mais.',
    description: 'O Sistema Heavy Duty de Mike Mentzer — o único método de treino baseado em ciência real.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1C1C1C',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`${bebasNeue.variable} ${inter.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
