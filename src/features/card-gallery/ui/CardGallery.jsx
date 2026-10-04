import { useState } from 'react'
import { Media, Modal, RevealText } from '../../../shared/ui'
import { CardGrid } from './CardGrid'

export function CardGallery({ cards }) {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <CardGrid cards={cards} onSelect={setSelected} />

      {selected && (
        <Modal onClose={() => setSelected(null)}>
          <div key={selected.id} className="flex flex-col gap-4">
            <Media
              src={selected.media}
              alt={selected.title}
              className="w-full animate-fade-in rounded-2xl object-cover"
            />
            <RevealText as="h3" text={selected.title} delay={200} className="text-lg text-on-surface" />
            <RevealText
              as="p"
              text={selected.text}
              delay={200 + selected.title.length * 40}
              step={25}
              className="text-on-surface-variant"
            />
            <button
              onClick={() => setSelected(null)}
              className="rounded-xl bg-secondary-container py-2 font-medium text-on-secondary-container transition hover:brightness-110"
            >
              Закрыть
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
