import { ChoiceAttributes } from '@/components/encounter/ChoiceAttributes'
import { ChoiceLabel } from '@/components/encounter/ChoiceLabel'
import { ChoiceLog } from '@/components/encounter/ChoiceLog'
import {
  EncounterChoice,
  EncounterContext,
  Id,
  WorldEdge,
  WorldNode,
} from '@repo/game/types'
import { nanoid } from 'nanoid'
import random from 'random'
import { ReactNode } from 'react'

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
  label: ReactNode
  before?: ReactNode
  after?: ReactNode
  action?: boolean

  back?: boolean
  to?: Id
  clearLog?: boolean
}
export function choice(props: ChoiceProps): EncounterChoice {
  return {
    id: nanoid(),
    active: props.active,
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
        ctx.back()
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
        {props.icon}
        {`, ${props.chance}%`}
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
            <span className="text-green-400">[Success]</span>
          ) : (
            <span className="text-red-400">[Failure]</span>
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
