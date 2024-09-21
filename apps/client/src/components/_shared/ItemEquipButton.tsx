import { useEncounterContext } from '@/hooks'
import { PopoverPortal } from '@radix-ui/react-popover'
import { Item } from '@repo/game/types'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export type ItemEquipButtonProps = {
  item: Item
  onClose: () => void
  onClick: () => void
  onUnitClick: () => void
}

export function ItemEquipButton(props: ItemEquipButtonProps) {
  const { item, onClose, onClick, onUnitClick } = props
  const ctx = useEncounterContext()
  const isEquipped = ctx.units.some((u) =>
    u.augments.some((a) => a.itemRtid === item.rtid)
  )
  if (isEquipped)
    return <div className="px-2 text-muted-foreground/60 text-xs">Equipped</div>

  const equipableUnits = ctx.units.filter((u) =>
    item.augment?.unitBaseIds
      ? item.augment.unitBaseIds.includes(u.baseId)
      : true
  )
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost" onClick={onClick}>
          Equip
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="w-full z-40" onCloseAutoFocus={onClose}>
          <div className="flex space-x-2">
            {equipableUnits.map((unit) => (
              <Button
                key={unit.id}
                variant="outline"
                onClick={() => {
                  onUnitClick()
                }}
              >
                {unit.name}
              </Button>
            ))}
          </div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}
