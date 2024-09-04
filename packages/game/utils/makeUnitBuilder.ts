import { nanoid } from 'nanoid'
import { Id, UnitBuilder } from '../types'
import { getUnitBase } from './getUnitBase'

export function makeUnitBuilder(baseId: Id, level: number) {
  const { base, config } = getUnitBase(baseId)
  if (!base) throw new Error('base not found')

  const builder: UnitBuilder = {
    id: nanoid(),
    level,
    base,
    config,
    ability: config.abilities[0],
    name: base.name,
    actions: config.actions.filter((a) =>
      config.defaultActionIds.includes(a.id)
    ),
  }

  return builder
}
