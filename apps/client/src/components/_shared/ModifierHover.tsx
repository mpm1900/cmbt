import { ModifierRenderers } from '@/renderers'
import { Modifier } from '@repo/game/types'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { ModifierDescription } from './ModifierDescription'
import { PropsWithChildren } from 'react'

export type ModifierHoverProps = PropsWithChildren<{
  modifier: Modifier
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function ModifierHover(props: ModifierHoverProps) {
  const { modifier, side, children } = props
  const renderer = ModifierRenderers[modifier.rid]
  return (
    <HoverCard openDelay={200} closeDelay={200}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side={side} className="w-[320px]">
          <div className="space-y-2">
            {renderer.name}
            <ModifierDescription modifier={modifier} />
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
