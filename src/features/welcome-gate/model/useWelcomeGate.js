import { useState } from 'react'

const KEY = 'welcome-gate-passed'

export function useWelcomeGate() {
  const [passed, setPassed] = useState(() => {
    try {
      return sessionStorage.getItem(KEY) === '1'
    } catch {
      return false
    }
  })

  const pass = () => {
    try {
      sessionStorage.setItem(KEY, '1')
    } catch {
      // storage недоступен (например, приватный режим), тогда флаг живёт только в памяти
    }
    setPassed(true)
  }

  return { passed, pass }
}
