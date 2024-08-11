import { HoverCardPortal } from '@radix-ui/react-hover-card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Modifier } from '@repo/game/types'
import { ModifierRenderers } from '@/renderers'

export type ModifierInlineProps = {
  modifier: Modifier
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function ModifierInline(props: ModifierInlineProps) {
  const { modifier, side } = props
  const renderer = ModifierRenderers[modifier.rid]
  return (
    <HoverCard openDelay={0} closeDelay={200}>
      <HoverCardTrigger asChild>
        <span className="hover:underline cursor-pointer">{renderer?.name}</span>
      </HoverCardTrigger>
      <HoverCardPortal>
        <HoverCardContent side={side} className="w-[320px]">
          {renderer.description && renderer?.description(modifier)}
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}
