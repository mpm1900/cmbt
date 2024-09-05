import { faker } from '@faker-js/faker'
import { BASE_CONFIGS, PLAYER_BASES } from '@repo/game/data'
import { UnitBuilder } from '@repo/game/types'
import { nanoid } from 'nanoid'

export const makeBuilder = (i: number = 0): UnitBuilder => {
  const base = PLAYER_BASES[i % PLAYER_BASES.length]
  const config = BASE_CONFIGS[base.id]
  return {
    id: nanoid(),
    name: faker.person.firstName(),
    level: 50,
    base,
    config,
    ability: config.abilities.find((a) => a.id === config.defaultAbilityId),
    actions: config.actions.filter((m) =>
      config.defaultActionIds.includes(m.id)
    ),
  }
}
