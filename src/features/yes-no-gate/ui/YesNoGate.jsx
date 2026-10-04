import { useState } from 'react'
import { Modal, RevealText } from '../../../shared/ui'

const BTN =
  'animate-rise flex-1 rounded-xl bg-primary py-2 font-medium text-on-primary transition hover:bg-primary-container hover:text-on-primary-container'

export function YesNoGate({
  open, question, denyText, denyAlign = 'center', denyImage, onYes,
}) {
  const [denied, setDenied] = useState(false)
  const btnDelay = 300 + question.length * 40 + 200

  const alert = denied && (
    <div role="alert" className="flex flex-col items-center gap-3">
      {denyImage && (
        <img src={denyImage} alt="" className="max-h-40 animate-pop-in rounded-xl object-contain" />
      )}
      <RevealText
        as="p"
        text={denyText}
        align={denyAlign}
        delay={200}
        className="w-full text-on-surface drop-shadow-md"
      />
    </div>
  )

  return (
    <Modal open={open} aside={alert}>
      <div className="flex flex-col gap-4">
        <RevealText as="h2" text={question} delay={300} className="text-xl text-on-surface sm:text-2xl" />

        <div className="flex gap-3">
          <button onClick={onYes} style={{ animationDelay: `${btnDelay}ms` }} className={BTN}>
            Яяя
          </button>
          <button
            onClick={() => setDenied(true)}
            aria-hidden={denied}
            tabIndex={denied ? -1 : 0}
            style={{ animationDelay: `${btnDelay + 150}ms` }}
            className={`${BTN} ${denied ? 'invisible' : ''}`}
          >
            Не я...
          </button>
        </div>
      </div>
    </Modal>
  )
}
