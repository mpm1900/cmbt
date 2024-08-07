import { DamageParent } from '../data'
import { RemoveMagicArmorParent } from '../data/Mutations/RemoveMagicArmorParent'
import { RemovePhysicalArmorParent } from '../data/Mutations/RemovePhysicalArmorParent'
import { Mutation, Unit } from '../types'
import { CalculateDamageResult } from './calculateDamage'

export function getMutationsFromDamageResult(
  source: Unit,
  target: Unit,
  result: CalculateDamageResult
): Mutation[] {
  const { damage, physicalArmor, magicArmor } = result

  return [
    new RemoveMagicArmorParent({
      sourceId: source.id,
      parentId: target.id,
      amount: magicArmor,
    }),
    new RemovePhysicalArmorParent({
      sourceId: source.id,
      parentId: target.id,
      amount: physicalArmor,
    }),
    new DamageParent({
      sourceId: source.id,
      parentId: target.id,
      damage,
    }),
  ]
}
