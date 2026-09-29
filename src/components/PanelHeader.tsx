import type { ReactNode } from 'react'

/** Единый стиль заголовка секций правых панелей (Свойства, Заливка, Слои). */
export function PanelHeader({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
      {children}
    </h2>
  )
}
