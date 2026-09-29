import { SELECTION_COLOR, SELECTION_HANDLE_SIZE } from '../constants/shapes'
import type { Point, Shape } from '../types/shape'

const HANDLE_POSITIONS = [
  { left: '0%', top: '0%' },
  { left: '50%', top: '0%' },
  { left: '100%', top: '0%' },
  { left: '0%', top: '50%' },
  { left: '100%', top: '50%' },
  { left: '0%', top: '100%' },
  { left: '50%', top: '100%' },
  { left: '100%', top: '100%' },
] as const

interface ShapeProps {
  shape: Shape
  selected: boolean
  /** true — фигуру можно выделять и перетаскивать (инструмент «выбор», нет панорамирования). */
  interactive: boolean
  /** Эта фигура перетаскивается прямо сейчас. */
  moving: boolean
  /** Текущий зум: маркеры делятся на него, чтобы держать размер на экране. */
  zoom: number
  onSelect: (id: string) => void
  /** Начало перетаскивания: client-координаты события (Canvas переведёт в канвасные). */
  onDragStart: (id: string, client: Point) => void
}

/** Рендер одной фигуры с рамкой и маркерами выделения. */
export function Shape({
  shape,
  selected,
  interactive,
  moving,
  zoom,
  onSelect,
  onDragStart,
}: ShapeProps) {
  const handleSize = SELECTION_HANDLE_SIZE / zoom
  const borderWidth = 1 / zoom

  return (
    <div
      onMouseDown={(e) => {
        // Не интерактивна — событие уходит на холст (там рисование черновика).
        if (!interactive) return
        e.stopPropagation()
        onSelect(shape.id)
        onDragStart(shape.id, { x: e.clientX, y: e.clientY })
      }}
      className="absolute"
      style={{
        left: shape.x,
        top: shape.y,
        width: shape.width,
        height: shape.height,
        cursor: interactive && !moving ? 'move' : 'inherit',
      }}
    >
      <div
        className={`h-full w-full ${shape.kind === 'ellipse' ? 'rounded-full' : ''}`}
        style={{ backgroundColor: shape.fill }}
      />

      {selected && (
        <>
          {/* Рамка выделения */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ border: `${borderWidth}px solid ${SELECTION_COLOR}` }}
          />
          {/* 8 маркеров: 4 угла + 4 середины сторон */}
          {HANDLE_POSITIONS.map((pos) => (
            <div
              key={`${pos.left}-${pos.top}`}
              className="pointer-events-none absolute"
              style={{
                left: pos.left,
                top: pos.top,
                width: handleSize,
                height: handleSize,
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ffffff',
                border: `${borderWidth}px solid ${SELECTION_COLOR}`,
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}
