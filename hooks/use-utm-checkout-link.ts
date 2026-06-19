'use client'

import { useState, useEffect } from 'react'

const BASE_CHECKOUT_URL = 'https://pay.hotmart.com/M105294904O?checkoutMode=10'

const UTM_MAP: Record<string, string> = {
  utm_source: 'source',
  utm_medium: 'medium',
  utm_campaign: 'campaign',
  utm_content: 'content',
  utm_term: 'term',
}

export function useUTMCheckoutLink(): string {
  const [checkoutUrl, setCheckoutUrl] = useState(BASE_CHECKOUT_URL)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const parts: string[] = []

    for (const [utmKey, sckKey] of Object.entries(UTM_MAP)) {
      const value = params.get(utmKey)
      if (value) parts.push(`${sckKey}=${value}`)
    }

    if (parts.length > 0) {
      const sck = parts.join('|')
      const url = `${BASE_CHECKOUT_URL}&sck=${encodeURIComponent(sck)}`
      console.log('[UTM] sck capturado:', sck)
      console.log('[UTM] URL final checkout:', url)
      setCheckoutUrl(url)
    } else {
      console.log('[UTM] Nenhum UTM encontrado — URL padrão sem sck.')
    }
  }, [])

  return checkoutUrl
}
