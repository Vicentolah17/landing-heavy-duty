import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
      <head>
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="dlwh1z0e0zjiu9b7rddwrc10mix3gh" />

        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2JEK8J9610"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2JEK8J9610');
          `}
        </Script>

        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1473071244351456');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img 
            height="1" 
            width="1" 
            style={{display:'none'}}
            src="https://www.facebook.com/tr?id=1473071244351456&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}