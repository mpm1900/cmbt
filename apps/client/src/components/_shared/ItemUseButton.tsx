import { useCombatContext, useEncounterContext } from '@/hooks'
import { PopoverPortal } from '@radix-ui/react-popover'
import { BASE_UNIT } from '@repo/game/data'
import { Action, Unit } from '@repo/game/types'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

export type ItemUseButtonProps = {
  action: (unit: Unit) => Action
}

export function ItemUseButton(props: ItemUseButtonProps) {
  const { action } = props
  const baseAction = action(BASE_UNIT)
  const ctx = useEncounterContext()
  const cmbt = useCombatContext()

  const units = ctx.units
    .filter((u) => baseAction.filter(u, cmbt))
    .map((unit) => (
      <Button key={unit.id} variant="outline" onClick={() => {}}>
        {unit.name}
      </Button>
    ))

  if (units.length === 0) return null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Use
        </Button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent className="w-full">
          <div className="flex space-x-2">{units}</div>
        </PopoverContent>
      </PopoverPortal>
    </Popover>
  )
}
