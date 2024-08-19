import { cn } from '@/lib/utils'
import { StatusRenderers } from '@/renderers/Status'
import { PropsWithClassname } from '@/types'
import { Status } from '@repo/game/types'
import { StatusHover } from './StatusHover'

export type StatusInlineProps = PropsWithClassname<{
  status: Status | undefined
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function StatusInline(props: StatusInlineProps) {
  const { status, side, className } = props
  const renderer = StatusRenderers[status?.id ?? '']
  if (!status) return null

  return (
    <StatusHover side={side} status={status}>
      <span
        className={cn('hover:underline cursor-pointer font-bold', className)}
      >
        {renderer.name}
      </span>
    </StatusHover>
  )
}
