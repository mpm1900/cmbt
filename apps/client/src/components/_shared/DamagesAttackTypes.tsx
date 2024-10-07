import { AttackType, Damage } from '@repo/game/types'
import { getAttackTypesFromDamages } from '@repo/game/utils'
import { AttackTypeBadge } from './AttackTypeBadge'

function getTypeFromTypes(
  types: AttackType[]
): AttackType | 'hybrid' | undefined {
  if (types.length === 0) return undefined
  if (types.every((t) => t === 'magic')) return 'magic'
  if (types.every((t) => t === 'physical')) return 'physical'
  return 'hybrid'
}

export type DamagesAttackTypesProps = {
  damages: Damage[]
}

export function DamagesAttackTypes(props: DamagesAttackTypesProps) {
  const { damages } = props
  const attackTypes = getAttackTypesFromDamages(damages)
  return (
    <div className="flex items-center">
      <AttackTypeBadge attackType={getTypeFromTypes(attackTypes)} />
    </div>
  )
}
