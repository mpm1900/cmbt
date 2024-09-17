import { ItemRarityRenderers } from '@/renderers/ItemRarity'
import { Item, Unit } from '@repo/game/types'
import { PropsWithChildren } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { ActionDescription } from './ActionDescription'
import { AugmentDescription } from './AugmentDescription'

export type ItemHoverProps = PropsWithChildren<{
  item: Item
  unit: Unit
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function ItemHover(props: ItemHoverProps) {
  const { item, unit, children, side } = props
  const renderer = ItemRarityRenderers[item.rarity]
  return (
    <HoverCard openDelay={100} closeDelay={0}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>

      <HoverCardContent
        side={side}
        className="w-[320px]"
        style={{ backgroundColor: renderer.bg }}
      >
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <div style={{ color: renderer.color }}>{item.name}</div>
            <div className="font-black text-xs uppercase text-muted-foreground/40">
              Item
            </div>
          </div>

          {item.augment && <AugmentDescription augment={item.augment} />}
          {item.action && <ActionDescription action={item.action(unit)} />}
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
