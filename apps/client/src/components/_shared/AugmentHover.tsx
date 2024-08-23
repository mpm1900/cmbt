import { AugmentRenderers } from '@/renderers'
import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { Augment } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { AugmentDescription } from './AugmentDescription'

export type AugmentHoverProps = PropsWithChildren<{
  augment: Augment
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function AugmentHover(props: AugmentHoverProps) {
  const { children, augment } = props
  const renderer = AugmentRenderers[augment.id]

  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side="left" className="w-[360px]">
          <div className="space-y-2">
            {renderer?.name}
            <AugmentDescription augment={augment} />
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
