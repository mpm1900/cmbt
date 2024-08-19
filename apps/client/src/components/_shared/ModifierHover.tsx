import { ModifierRenderers } from '@/renderers'
import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { Modifier } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { ModifierDescription } from './ModifierDescription'

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
        <HoverCardContent
          side={side}
          collisionPadding={16}
          className="w-[320px]"
        >
          <div className="space-y-2">
            <div>{renderer.name}</div>
            <ModifierDescription modifier={modifier} />
            <div className="text-xs font-bold text-muted-foreground/60 text-right space-x-4">
              {modifier.duration && <span>Duration: {modifier.duration}</span>}
              {modifier.persistOnSwitch && <span>Persists on Switch</span>}
              {modifier.persistOnCombatEnd && (
                <span>Persists on Combat End</span>
              )}
            </div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
