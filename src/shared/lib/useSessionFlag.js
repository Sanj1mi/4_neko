import { useState } from 'react'

export function useSessionFlag(key) {
  const [value, setValue] = useState(() => {
    try {
      return sessionStorage.getItem(key) === '1'
    } catch {
      return false
    }
  })

  const set = () => {
    try {
      sessionStorage.setItem(key, '1')
    } catch {
      // storage недоступен, флаг живёт только в памяти
    }
    setValue(true)
  }

  return [value, set]
}
