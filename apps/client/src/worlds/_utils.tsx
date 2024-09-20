import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { ChoiceLabel } from '@/components/encounter/ChoiceLabel'
import { ChoiceLog } from '@/components/encounter/ChoiceLog'
import { TeamId } from '@repo/game/data'
import {
  EncounterChoice,
  EncounterContext,
  Id,
  Npc,
  Team,
  UnitBase,
  WorldEdge,
  WorldNode,
} from '@repo/game/types'
import { makeUnit } from '@repo/game/utils'
import { nanoid } from 'nanoid'
import random from 'random'
import { ReactNode } from 'react'
import { BsQuestionLg } from 'react-icons/bs'

export function edge(target: Id): WorldEdge {
  return {
    id: nanoid(),
    target,
  }
}

export type NodeMaker = (
  id: Id,
  edges: WorldEdge[],
  overries?: Partial<WorldNode>
) => WorldNode

export type ChoiceProps = Pick<
  Partial<EncounterChoice>,
  'active' | 'resolve'
> & {
  filter?: boolean
  disabled?: boolean
  label: ReactNode
  before?: ReactNode
  after?: ReactNode
  action?: boolean

  back?: boolean
  to?: Id
  clearLog?: boolean
}
export function choice(props: ChoiceProps): EncounterChoice | undefined {
  if (props.filter === false) return undefined
  return {
    id: nanoid(),
    active: props.active,
    disabled: props.disabled,
    label: (
      <ChoiceLabel
        before={props.before}
        after={props.after}
        action={props.action}
      >
        {props.label}
      </ChoiceLabel>
    ),
    resolve: (ctx) => {
      if (props.clearLog) {
        ctx.clearLog()
      }
      if (props.back) {
        ctx.updateActiveWorldNode((n) => ({
          completed: true,
          visited: true,
          encounter: ctx.encounter,
        }))
        ctx.back(true)
      }
      if (props.to) {
        ctx.log(<ChoiceLog>{props.label}</ChoiceLog>)
        ctx.gotoNode(props.to)
      }
      if (props.resolve) {
        props.resolve(ctx)
      }
    },
  }
}

export type CheckProps = {
  chance: number
  filter: boolean
  icon: ReactNode
  label: ReactNode

  onSuccess?: (ctx: EncounterContext) => void
  onFailure?: (ctx: EncounterContext) => void
  onSettled?: (ctx: EncounterContext) => void
}
export function check(props: CheckProps): EncounterChoice | undefined {
  if (!props.filter) return undefined

  return choice({
    before: (
      <ChoiceAttributes>
        <div>{props.icon}</div>
        <div>,</div>
        <div>
          <BsQuestionLg />
        </div>
      </ChoiceAttributes>
    ),
    label: props.label,
    action: true,
    resolve: (ctx) => {
      const roll = random.int(0, 100)
      const success = props.chance >= roll
      ctx.log(
        <div className="flex items-center space-x-2">
          <ChoiceLog>{props.label}</ChoiceLog>
          {success ? (
            <ChoiceAttributes className="text-green-400">
              Success
            </ChoiceAttributes>
          ) : (
            <ChoiceAttributes className="text-red-400">
              Failure
            </ChoiceAttributes>
          )}
        </div>
      )

      if (success && props.onSuccess) {
        props.onSuccess(ctx)
      } else if (props.onFailure) {
        props.onFailure(ctx)
      }
      if (props.onSettled) {
        props.onSettled(ctx)
      }
    },
  })
}

export type NpcConfigs = Record<
  Id,
  {
    level: number
    bases: UnitBase[]
  }
>

export type InitializeNpcCombatProps = {
  npcs: Npc[]
  configs: NpcConfigs
  xp: number
  ctx: EncounterContext
  onSuccess?: () => void
  onFailure?: () => void
}

export function initializeNpcCombat(props: InitializeNpcCombatProps) {
  const { npcs, configs, xp, ctx, onFailure, onSuccess } = props

  const enemyTeam: Team = {
    id: TeamId(),
    resources: { credits: 0 },
    items: [],
    maxActiveUnits: Math.min(npcs.length, 2),
  }

  ctx.initializeCombat({
    enemyTeam,
    enemyUnits: npcs.map((npc) => {
      const config = configs[npc.id]
      const unit = makeUnit(
        { level: config.level, teamId: enemyTeam.id },
        config.bases
      )
      unit.name = npc.name ?? unit.name
      return unit
    }),
    commit: true,
    reward: {
      items: npcs.flatMap((npc) => npc.items),
      resources: {
        credits: npcs.reduce((sum, npc) => sum + npc.resources.credits, 0),
      },
      xp,
    },
    onSuccess: () => {
      ctx.updateActiveWorldNode((n) => ({
        completed: true,
        visited: true,
        repeatable: false,
      }))
      ctx.nav('/world')
    },
    onFailure: () => {},
  })
}
