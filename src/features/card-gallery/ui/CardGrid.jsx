import { Media } from "../../../shared/ui";
import { TiltCard } from "../../../shared/ui/TiltCard";

export function CardGrid({ cards, onSelect }) {
  return (
    <ul className="grid w-full max-w-md grid-cols-2 gap-3 md:max-w-3xl md:grid-cols-3 md:gap-4">
      {cards.map((c, i) => (
        <li
          key={c.id}
          className="animate-pop-in"
          style={{ animationDelay: `${600 + i * 90}ms` }}
        >
        <TiltCard>
          <button
            onClick={() => onSelect(c)}
            className="group relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-surface-container md:aspect-[3/2]"
          >
            <Media
              src={c.cover ?? c.media}
              alt={c.title}
              loading="lazy"
              className="size-full object-cover transition duration-300 group-hover:scale-105"
            />
            <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-scrim/70 to-transparent p-3 text-left text-sm font-medium text-white">
              {c.title}
            </span>
          </button>

        </TiltCard>
        </li>
      ))}
    </ul>
  )
}
