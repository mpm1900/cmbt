import { ActionRenderers } from '@/renderers'
import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { Action } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { ActionDescription } from './ActionDescription'

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
            <div className="flex items-start justify-between">
              <div>{renderer.name}</div>
              <div className="font-black text-xs uppercase text-muted-foreground/40">
                Action
              </div>
            </div>
            <ActionDescription action={action} />
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
