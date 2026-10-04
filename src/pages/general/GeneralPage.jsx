import { Link } from 'react-router-dom'
import { ROUTES } from '../../shared/config/routes'
import { useSessionFlag } from '../../shared/lib'
import { RevealText } from '../../shared/ui'
import { WelcomeGate } from '../../features/welcome-gate'

export function GeneralPage() {
  const [passed, pass] = useSessionFlag('welcome-gate-passed')

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 p-4">
      <RevealText
        as="h1"
        text="няняняня (^^)"
        play={passed}
        delay={200}
        className="text-center text-3xl text-primary md:text-5xl"
      />

      {/* TODO: картинки / гифки / музыка */}

      {passed && (
        <nav className="flex w-full max-w-sm flex-col gap-3 sm:max-w-md sm:flex-row">
          {[
            { to: ROUTES.first, label: 'С#' },
            { to: ROUTES.second, label: 'Db' },
          ].map((l, i) => (
            <Link
              key={l.to}
              to={l.to}
              style={{ animationDelay: `${900 + i * 150}ms` }}
              className="animate-rise flex-1 rounded-2xl bg-surface-container p-4 text-center text-on-surface transition hover:bg-surface-container-highest"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}

      <WelcomeGate
        open={!passed}
        onConfirm={pass}
        emptyText={`Мяу..
          так не пойдёт (>_<)`}
        emptyAlign="center"
      />
    </main>
  )
}
