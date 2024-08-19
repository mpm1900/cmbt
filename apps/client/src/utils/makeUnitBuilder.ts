import { faker } from '@faker-js/faker'
import { ALL_BASES, BASE_CONFIGS } from '@repo/game/data'
import { UnitBuilder } from '@repo/game/types'
import { nanoid } from 'nanoid'

export const makeBuilder = (i: number = 0): UnitBuilder => {
  const base = ALL_BASES[i % ALL_BASES.length]
  const config = BASE_CONFIGS[base.id]
  return {
    id: nanoid(),
    name: faker.person.fullName(),
    level: 15,
    base,
    config,
    ability: config.abilities.find((a) => a.id === config.defaultAbilityId),
    actions: config.actions.filter((m) =>
      config.defaultActionIds.includes(m.id)
    ),
  }
}
