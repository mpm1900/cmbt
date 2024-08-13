import { HoverCardPortal, HoverCardTrigger } from '@radix-ui/react-hover-card'
import { HoverCard, HoverCardContent } from '../ui/hover-card'
import { PropsWithChildren } from 'react'
import { Action } from '@repo/game/types'
import { ActionRenderers } from '@/renderers'

export type ActionHoverProps = PropsWithChildren<{
  action: Action
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function ActionHover(props: ActionHoverProps) {
  const { action, children, side } = props
  const renderer = ActionRenderers[action.id]
  return (
    <HoverCard openDelay={0} closeDelay={0}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side={side}>
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
