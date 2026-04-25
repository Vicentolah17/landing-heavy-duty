// lib/meta-pixel.ts

/**
 * Utilitário centralizado para eventos do Meta Pixel
 * 
 * O fbq é injetado globalmente pelo script do pixel no layout.tsx
 */

declare global {
  interface Window {
    fbq?: (
      type: 'track' | 'trackCustom',
      eventName: string,
      params?: Record<string, unknown>
    ) => void
  }
}

type PixelEvent = 
  | 'PageView'
  | 'ViewContent'
  | 'InitiateCheckout'
  | 'AddToCart'
  | 'Purchase'
  | 'Lead'
  | 'CompleteRegistration'

interface EventParams {
  content_name?: string
  content_ids?: string[]
  content_type?: string
  value?: number
  currency?: string
  [key: string]: unknown
}

/**
 * Dispara um evento padrão do Meta Pixel
 */
export function trackPixelEvent(event: PixelEvent, params?: EventParams) {
  if (typeof window === 'undefined') return
  
  if (window.fbq) {
    window.fbq('track', event, params)
    
    // Log em desenvolvimento pra debug
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Meta Pixel] ${event}`, params)
    }
  }
}

/**
 * Eventos pré-configurados do Heavy Duty
 */
export const HeavyDutyEvents = {
  /**
   * Disparar quando usuário clica em qualquer CTA de compra
   */
  initiateCheckout: (location: 'hero' | 'final_cta' | string) => {
    trackPixelEvent('InitiateCheckout', {
      content_name: 'Heavy Duty Method',
      content_ids: ['heavy-duty-method'],
      content_type: 'product',
      value: 37.00,
      currency: 'BRL',
      cta_location: location, // pra você saber qual botão converteu mais
    })
  },
  
  /**
   * Disparar quando usuário visualiza conteúdo do produto
   */
  viewContent: () => {
    trackPixelEvent('ViewContent', {
      content_name: 'Heavy Duty Method',
      content_ids: ['heavy-duty-method'],
      content_type: 'product',
      value: 37.00,
      currency: 'BRL',
    })
  },
}