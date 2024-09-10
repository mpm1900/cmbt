import { DamageParent, UpdateValueParent } from '../data'
import { Mutation, Unit } from '../types'
import { CalculateDamageResult } from './calculateDamage'

export function getMutationsFromDamageResult(
  source: Unit,
  target: Unit,
  result: CalculateDamageResult
): Mutation[] {
  const { damage, evasionSuccess, physicalArmor, magicArmor } = result

  return [
    new UpdateValueParent({
      sourceId: source.id,
      parentId: target.id,
      valueKey: 'magicArmor',
      static: magicArmor * -1,
    }),
    new UpdateValueParent({
      sourceId: source.id,
      parentId: target.id,
      valueKey: 'physicalArmor',
      static: physicalArmor * -1,
    }),
    new DamageParent({
      sourceId: source.id,
      parentId: target.id,
      static: damage,
      evasionSuccess,
    }),
  ]
}
