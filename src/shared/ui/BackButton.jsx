import { Link } from 'react-router-dom'
import { CatIcon } from './CatIcon'

export function BackButton({ to, delay = 0 }) {
  return (
    <Link
      to={to}
      aria-label="Назад"
      style={{ animationDelay: `${delay}ms` }}
      className="animate-rise flex size-12 items-center justify-center rounded-full bg-primary text-on-primary transition hover:scale-110 hover:bg-primary-container hover:text-on-primary-container active:scale-95"
    >
    <CatIcon />
    </Link>
  )
}
