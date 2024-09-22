import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { choice } from '@/worlds/_utils'
import { AncientGolem, TeamId } from '@repo/game/data'
import { EncounterNode, Team } from '@repo/game/types'
import { makeUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import { GiGolemHead } from 'react-icons/gi'
import { LuSwords } from 'react-icons/lu'
import { GolemEncounterPostCombatId } from './GolemEncounterPostCombat'

export const GolemEncounterPreCombatId = nanoid()
export const GolemEncounterPreCombat: EncounterNode = {
  id: GolemEncounterPreCombatId,
  icon: <GiGolemHead />,
  title: 'Overgrown Ruins',
  choices(ctx, props) {
    return [
      choice({
        before: (
          <ChoiceAttributes>
            <LuSwords />
          </ChoiceAttributes>
        ),
        label: <>Fight!</>,
        action: true,
        resolve: (ctx) => {
          const enemyTeam: Team = {
            id: TeamId(),
            resources: { credits: 0 },
            items: [],
            maxActiveUnits: 2,
          }
          ctx.initializeCombat({
            enemyTeam,
            enemyUnits: Array.from({ length: 1 }).map((_, i) => {
              const level = Math.max(...ctx.units.map((u) => u.level + 3, 7))
              const e = makeUnit({ level, teamId: enemyTeam.id }, [
                AncientGolem,
              ])
              return e
            }),
            commit: false,
            reward: {
              items: [],
              resources: {
                credits: 0,
              },
              xp: 100,
            },
            onSuccess: () => {
              ctx.gotoNode(GolemEncounterPostCombatId)
              ctx.nav('/encounter')
            },
            onFailure: () => {
              ctx.nav('/')
            },
          })
        },
      }),
    ]
  },
}
