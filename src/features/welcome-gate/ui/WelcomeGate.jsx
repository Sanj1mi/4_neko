import { useState } from 'react'
import { Modal, RevealText } from '../../../shared/ui'

const TITLE = 'Небольшенький сайтик для моей любимой...\n я очень надеюсь тебе понравится \n честно \np.s. не успел к сожалению по таймингу... '
const QUESTION = 'скажи сик севен'

const STEP = 45 // мс между буквами
const TITLE_DELAY = 400
const QUESTION_DELAY = TITLE_DELAY + TITLE.length * STEP + 200
const CONTROLS_DELAY = QUESTION_DELAY + QUESTION.length * STEP + 200

export function WelcomeGate({
  open,
  onConfirm,
  emptyText = 'Эй, тут пусто (o_o)',
  emptyAlign = 'center',
}) {
  const [value, setValue] = useState('')
  const [emptyHits, setEmptyHits] = useState(0)

  const submit = (e) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) {
      setEmptyHits((n) => n + 1)
      return
    }
    onConfirm(trimmed)
  }

  const onChange = (e) => {
    setValue(e.target.value)
    if (emptyHits) setEmptyHits(0)
  }

  const alert = emptyHits > 0 && (
    // key меняется при каждой попытке, поэтому текст печатается заново
    <div key={emptyHits} role="alert" className="flex flex-col items-center gap-3">
      <RevealText
        as="p"
        text={emptyText}
        align={emptyAlign}
        delay={100}
        className="w-full text-on-surface drop-shadow-md"
      />
    </div>
  )

  return (
    <Modal open={open} aside={alert}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <RevealText
          as="h2"
          text={TITLE}
          delay={TITLE_DELAY}
          step={STEP}
          className="text-xl text-on-surface sm:text-2xl"
        />
        <RevealText
          as="p"
          text={QUESTION}
          delay={QUESTION_DELAY}
          step={STEP}
          className="text-sm text-on-surface-variant sm:text-base"
        />

        <input
          value={value}
          onChange={onChange}
          placeholder="помурлыкац"
          aria-invalid={emptyHits > 0}
          style={{ animationDelay: `${CONTROLS_DELAY}ms` }}
          className={`animate-rise rounded-xl border bg-surface-container-lowest px-4 py-2 text-on-surface outline-none placeholder:text-outline focus:border-primary ${
            emptyHits > 0 ? 'border-error' : 'border-outline-variant'
          }`}
        />
        <button
          type="submit"
          style={{ animationDelay: `${CONTROLS_DELAY + 150}ms` }}
          className="animate-rise rounded-xl bg-primary py-2 font-medium text-on-primary transition hover:bg-primary-container hover:text-on-primary-container"
        >
          Just do it
        </button>
      </form>
    </Modal>
  )
}
