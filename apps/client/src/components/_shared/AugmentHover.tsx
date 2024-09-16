import { AugmentRenderers } from '@/renderers'
import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { BASE_UNIT } from '@repo/game/data'
import { Augment } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { FaHourglassStart } from 'react-icons/fa6'
import { RxLapTimer } from 'react-icons/rx'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { AugmentDescription } from './AugmentDescription'

export type AugmentHoverProps = PropsWithChildren<{
  augment: Augment | undefined
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function AugmentHover(props: AugmentHoverProps) {
  const { children, augment } = props
  if (!augment) return children

  const renderer = AugmentRenderers[augment.id]
  const modifier = augment.modifiers(BASE_UNIT)[0]

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side="left" className="w-[360px]">
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <div>{renderer?.name}</div>
              <div className="font-black text-xs uppercase text-muted-foreground/40">
                Augment
              </div>
            </div>
            <AugmentDescription augment={augment} />
            <div className="text-xs font-bold text-muted-foreground/60 text-right space-x-4 flex flex-row justify-end items-center">
              {!!modifier.duration && (
                <div className="flex items-center space-x-1">
                  <FaHourglassStart />
                  <span>
                    {modifier.duration} turn{modifier.duration > 1 && 's'}
                  </span>
                </div>
              )}
              {!!modifier.delay && (
                <div className="flex items-center space-x-1">
                  <RxLapTimer />
                  <span>
                    {modifier.delay} turn{modifier.delay > 1 && 's'}
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
