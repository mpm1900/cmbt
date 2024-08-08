import { faker } from '@faker-js/faker'
import { ALL_BASES, BASE_CONFIGS, Intimidate } from '@repo/game/data'
import { UnitBuilder } from '@repo/game/types'
import { nanoid } from 'nanoid'

export const makeBuilder = (): UnitBuilder => {
  const base = ALL_BASES[0]
  const config = BASE_CONFIGS[base.id]
  return {
    id: nanoid(),
    name: faker.person.fullName(),
    base,
    config,
    ability: config.abilities.find((a) => a.id === config.defaultAbilityId),
    actions: config.actions.filter((m) =>
      config.defaultActionIds.includes(m.id)
    ),
  }
}
