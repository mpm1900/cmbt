import { DamageParent } from '../data'
import { UpdateMagicArmorParent } from '../data/Mutations/UpdateMagicArmorParent'
import { UpdatePhysicalArmorParent } from '../data/Mutations/UpdatePhysicalArmorParent'
import { Mutation, Unit } from '../types'
import { CalculateDamageResult } from './calculateDamage'

export function getMutationsFromDamageResult(
  source: Unit,
  target: Unit,
  result: CalculateDamageResult
): Mutation[] {
  const { damage, evasionSuccess, physicalArmor, magicArmor } = result

  return [
    new UpdateMagicArmorParent({
      sourceId: source.id,
      parentId: target.id,
      static: magicArmor * -1,
    }),
    new UpdatePhysicalArmorParent({
      sourceId: source.id,
      parentId: target.id,
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
