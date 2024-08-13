import { StatusRenderers } from '@/renderers/Status'
import { ZERO_UNIT } from '@repo/game/data'
import { Status } from '@repo/game/types'
import { StatusHover } from './StatusHover'

export type StatusInlineProps = {
  status: Status
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function StatusInline(props: StatusInlineProps) {
  const { status, side } = props
  const renderer = StatusRenderers[status.id]
  const modifiers = status.modifiers(ZERO_UNIT, ZERO_UNIT)

  return (
    <StatusHover side={side} status={status}>
      <span className="hover:underline cursor-pointer font-bold">
        {renderer.name}
      </span>
    </StatusHover>
  )
}
