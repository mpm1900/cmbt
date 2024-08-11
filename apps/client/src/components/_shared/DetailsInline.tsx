import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Id } from '@repo/game/types'
import { DetailsRenderer } from '@/renderers'

export type DetailsInlineProps = {
  detailsId: Id
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function DetailsInline(props: DetailsInlineProps) {
  const { detailsId: statusId, side } = props
  const renderer = DetailsRenderer[statusId]
  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <span className="hover:underline cursor-pointer">{renderer.name}</span>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side={side} className="w-[320px]">
          {renderer.description}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
