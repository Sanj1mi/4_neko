import { ROUTES } from '../../shared/config/routes'
import { useSessionFlag } from '../../shared/lib'
import { BackButton, RevealText } from '../../shared/ui'
import { CARDS } from '../../entities/card'
import { YesNoGate } from '../../features/yes-no-gate'
import { CardGallery } from '../../features/card-gallery'

export function SecondPage() {
  const [passed, pass] = useSessionFlag('second-gate-passed')

  return (
    <main className="flex min-h-dvh flex-col items-center gap-8 bg-background p-4 py-8">
      <header className="flex flex-col items-center gap-2 text-center">
        <RevealText as="h1" text="Сборник котиков и картинки" play={passed} className="text-2xl text-primary md:text-4xl" />
        <RevealText as="p" text="кликай на все что видишь (=^^=)" play={passed} delay={400} className="text-on-surface-variant" />
      </header>

      {passed && <CardGallery cards={CARDS} />}
      {passed && <BackButton to={ROUTES.general} delay={800} />}

      <YesNoGate
        open={!passed}
        question="Кто моя любимая кощк?"
        denyText={`Тэкс... Почему шалим.
          сделаю вид...
          что это был мисклик (_-_)`}
        denyAlign="center"
        denyImage="/media/deny.gif"
        onYes={pass}
      />
    </main>
  )
}
