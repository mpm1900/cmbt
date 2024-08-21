import { ActionRenderers } from '@/renderers'
import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { Action } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'

export type ActionHoverProps = PropsWithChildren<{
  action: Action
  open?: boolean
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function ActionHover(props: ActionHoverProps) {
  const { action, children, open, side } = props
  const renderer = ActionRenderers[action.id]
  return (
    <HoverCard openDelay={100} closeDelay={0} open={open}>
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
