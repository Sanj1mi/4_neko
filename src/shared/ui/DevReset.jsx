export function DevReset() {
  if (!import.meta.env.DEV) return null

  const reset = () => {
    try {
      sessionStorage.clear()
    } catch {
      // storage недоступен
    }
    location.reload()
  }

  return (
    <button
      onClick={reset}
      className="fixed bottom-3 left-3 z-[100] rounded-full bg-error-container px-3 py-1 text-xs text-on-error-container opacity-70 transition hover:opacity-100"
    >
      ↺ reset
    </button>
  )
}
