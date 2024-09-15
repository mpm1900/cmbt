import { Damage } from '@repo/game/types'
import { getAttackTypesFromDamages } from '@repo/game/utils'
import { AttackTypeBadge } from './AttackTypeBadge'

export type DamagesAttackTypesProps = {
  damages: Damage[]
}

export function DamagesAttackTypes(props: DamagesAttackTypesProps) {
  const { damages } = props
  const attackTypes = getAttackTypesFromDamages(damages)
  return (
    <div className="flex items-center">
      {damages.length > 0
        ? attackTypes.map((attackType) => (
            <AttackTypeBadge key={attackType} attackType={attackType} />
          ))
        : '—'}
    </div>
  )
}
