import { UnitBuilder } from '@repo/game/types'
import { Button } from '../ui/button'
import { useBuilderUi } from '@/hooks/state/useBuilderUi'

export type UnitSelectButtonProps = {
  builder: UnitBuilder | undefined
  onAddClick: () => void
  onUnitClick: () => void
}

export function UnitSelectButton(props: UnitSelectButtonProps) {
  const { builder, onAddClick, onUnitClick } = props
  const store = useBuilderUi()

  function handleClick() {
    if (!builder) {
      onAddClick()
      return
    }
    onUnitClick()
  }

  return (
    <Button
      variant={
        !builder
          ? 'outline'
          : store.activeBuilderId === builder.id
            ? 'default'
            : 'secondary'
      }
      onClick={handleClick}
    >
      {builder?.name ?? 'Add'}
    </Button>
  )
}
