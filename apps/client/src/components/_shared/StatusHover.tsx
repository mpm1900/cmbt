import { StatusRenderers } from '@/renderers'
import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { ZERO_UNIT } from '@repo/game/data'
import { Status } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { FaHourglassStart } from 'react-icons/fa6'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { ModifierDescription } from './ModifierDescription'

export type StatusHoverProps = PropsWithChildren<{
  status: Status
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function StatusHover(props: StatusHoverProps) {
  const { children, status, side } = props

  const renderer = StatusRenderers[status.id]
  const modifiers = status.modifiers(ZERO_UNIT, ZERO_UNIT)

  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side={side} className="w-[320px]">
          <div className="space-y-2">
            {renderer.name}

            <div className="space-y-1">
              {modifiers.map((modifier) => (
                <ModifierDescription key={modifier.id} modifier={modifier} />
              ))}
            </div>
            <div className="text-xs font-bold text-muted-foreground/60 text-right space-x-4 flex flex-row justify-end items-center">
              {!!status.duration && (
                <div className="flex items-center space-x-1">
                  <FaHourglassStart />
                  <span>
                    {status.duration} turn{status.duration > 1 && 's'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
