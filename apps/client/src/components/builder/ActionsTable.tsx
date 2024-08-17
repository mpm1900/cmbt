import { useUnitBuilders } from '@/hooks/state/useUnitBuilders'
import { ZERO_UNIT } from '@repo/game/data'
import { UnitBuilder } from '@repo/game/types'
import { ActionListTable } from '@shared/ActionListTable'

export type ActionsTablePrpos = {
  builder: UnitBuilder
}

export function ActionsTable(props: ActionsTablePrpos) {
  const { builder } = props
  const store = useUnitBuilders()

  return (
    <ActionListTable
      actions={builder.config.actions}
      selectedActionIds={builder.actions.map((m) => m.make(ZERO_UNIT).id)}
      maxActionCount={builder.config.actionsCount}
      onSelect={(maker, isSelected) => {
        if (isSelected) {
          store.updateBuilder(builder.id, (b) => ({
            actions: b.actions.concat(maker),
          }))
        } else {
          store.updateBuilder(builder.id, (b) => ({
            actions: b.actions.filter((m) => m.id !== maker.id),
          }))
        }
      }}
    />
  )
}
