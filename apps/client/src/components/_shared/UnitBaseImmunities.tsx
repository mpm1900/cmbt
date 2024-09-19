import { getStatusesFromModifiers } from '@/utils/getStatusesFromModifiers'
import { InspectedAllId } from '@repo/game/data'
import { UnitBase } from '@repo/game/types'
import { combineStageModifiers } from '@repo/game/utils'
import { ModifierListInline } from './ModifierListInline'
import { StatusListInline } from './StatusListInline'

export type UnitBaseImmunitiesProps = {
  base: UnitBase
}

export function UnitBaseImmunities(props: UnitBaseImmunitiesProps) {
  const { base } = props
  if (base.immunities.length === 0) return null

  const nonStatusModifiers = combineStageModifiers(
    base.immunities.filter((m) => {
      return !m.statusId && m.id !== InspectedAllId
    })
  )
  const statuses = getStatusesFromModifiers(base.immunities)

  return (
    <div>
      <div className="text-muted-foreground">Immunities</div>
      <div className="text-muted-foreground">
        <ModifierListInline modifiers={nonStatusModifiers} conjunction="" />
        <StatusListInline statuses={statuses} conjunction="" />
      </div>
    </div>
  )
}
