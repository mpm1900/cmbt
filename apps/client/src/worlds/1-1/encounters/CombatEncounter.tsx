import {
  Bear,
  FlameCultist,
  RestlessSpirit,
  Revenant,
  Snake,
  SpeedUpTeamId,
  TeamId,
  UpdateStatTeam,
  Wolf,
} from '@repo/game/data'
import { Encounter, Team } from '@repo/game/types'
import { makeUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'

export const CombatEncounterId = nanoid()
export function CombatEncounter(): Encounter {
  return {
    id: CombatEncounterId,
    setup: (ctx) => {
      const enemyTeam: Team = {
        id: TeamId(),
        resources: { credits: 0 },
        items: [],
        maxActiveUnits: 2,
      }
      if (ctx.team && ctx.units.length > 0) {
        ctx.initializeCombat({
          enemyTeam,
          enemyUnits: Array.from({ length: 3 }).map(() =>
            makeUnit({ level: 4, teamId: enemyTeam.id }, [
              Wolf,
              Snake,
              RestlessSpirit,
              Revenant,
              Bear,
              FlameCultist,
            ])
          ),
          commit: true,
          reward: {
            items: [],
            resources: {
              credits: 200,
            },
            xp: 200,
          },
          modifiers: [
            new UpdateStatTeam({
              registryId: SpeedUpTeamId,
              teamId: ctx.team.id,
              stat: 'speed',
              factor: 0.5,
              duration: 2,
            }),
          ],
          onSuccess: () => {
            ctx.updateActiveWorldNode((n) => ({
              completed: true,
              visited: true,
            }))
            ctx.nav('/world')
          },
          onFailure: () => {},
        })
      }
    },
    nodes: [],
    activeNodeId: '',
    visitedNodeIds: [],
    values: {},
  }
}
