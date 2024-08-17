import { ActionRenderers } from '@/renderers'
import { HoverCardPortal, HoverCardTrigger } from '@radix-ui/react-hover-card'
import { Action } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { HoverCard, HoverCardContent } from '../ui/hover-card'

export type ActionHoverProps = PropsWithChildren<{
  action: Action
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function ActionHover(props: ActionHoverProps) {
  const { action, children, side } = props
  const renderer = ActionRenderers[action.id]
  return (
    <HoverCard openDelay={100} closeDelay={0}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side={side} className="w-[320px]">
          <div className="space-y-2">
            <div>{renderer.name}</div>
            <div className="text-muted-foreground">
              {renderer.description(action)}
            </div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
