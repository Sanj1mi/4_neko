import { ROUTES } from '../../shared/config/routes'
import { BackButton, RevealText } from '../../shared/ui'
import { TRACKS } from '../../entities/track'
import { SnippetPlayer } from '../../features/snippet-player'

export function FirstPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center gap-8 bg-background p-4 py-8">
      <header className="flex flex-col items-center gap-2 text-center">
        <RevealText as="h1" text="Private music" className="text-2xl text-primary md:text-4xl" />
        <RevealText as="p" text={"мои ассоциации тебя (><)\n с парочкой треков)"} delay={400} className="text-on-surface-variant" />
      </header>

      <SnippetPlayer tracks={TRACKS} />

      <BackButton to={ROUTES.general} delay={800} />
    </main>
  )
}
