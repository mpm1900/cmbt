import { nanoid } from 'nanoid'
import {
  ActionsQueueItem,
  AttackTypes,
  GameContext,
  Id,
  Modifier,
  Query,
  Unit,
  ValueKey,
} from '.'
import {
  ActionRenderData,
  applyMutation,
  applyModifiers,
  ZERO_UNIT,
} from '../utils'
import random from 'random'
import { Mutation } from './Mutation'

export type AiAction = {
  action: Action
  weight: number
  targetIds: Id[]
}

export type ActionResult = {
  action?: Action
  source?: Unit
  targets?: Unit[]
  data?: ActionRenderData
  mutations?: Mutation[]
  addedModifiers?: Modifier[]
  addedUnits?: Unit[]
  updateModifiers?: (modifiers: Modifier[]) => Modifier[]
  updateActionQueue?: (queue: ActionsQueueItem[]) => ActionsQueueItem[]
}

export type ActionRenderOptions = {
  disableLogging?: boolean
  disableRandomness?: boolean
  bypassAccuracyRolls?: boolean
}

export type ActionProps = {
  sourceId: Id
  teamId: Id
  cost: Mutation
  targets: Query<Unit[]>
  attackType: AttackTypes
  priority?: number
  maxTargetCount: number
}

export const ActionId = () => `Action@${nanoid()}`

export abstract class Action {
  readonly id: Id
  readonly rtid: Id
  readonly sourceId: Id
  readonly teamId: Id
  readonly priority: number
  readonly maxTargetCount: number
  readonly attackType: AttackTypes
  readonly cost: Mutation
  readonly targets: Query<Unit[]>
  abstract threshold: (source: Unit) => number | undefined
  abstract critical: (source: Unit) => number | undefined
  abstract resolve(
    source: Unit,
    targets: Unit[],
    ctx: GameContext,
    options?: ActionRenderOptions
  ): ActionResult

  // this only works for damage actions
  getAiAction = (targets: Unit[], ctx: GameContext): AiAction => {
    const source = ctx.units.find((u) => u.id === this.sourceId) as Unit
    const modifiedSource = applyModifiers(source, ctx).unit
    const unModifiedTargets = ctx.units.filter(
      (u) => !!targets.find((t) => t.id === u.id)
    )
    const accuracy = (this.threshold(modifiedSource) ?? 100) / 100
    const damage = this.getDamage(source, unModifiedTargets, ctx).reduce(
      (p, c) => p + c,
      0
    )
    const weight = damage * accuracy * random.float(0.85, 1.15)

    return {
      action: this,
      targetIds: targets.map((t) => t.id),
      weight,
    }
  }

  constructor(id: Id, props: ActionProps) {
    this.id = id
    this.rtid = nanoid()
    this.sourceId = props.sourceId
    this.teamId = props.teamId
    this.cost = props.cost
    this.targets = props.targets
    this.priority = props.priority ?? 0
    this.attackType = props.attackType
    this.maxTargetCount = props.maxTargetCount
  }

  getDamage(source: Unit, targets: Unit[], ctx: GameContext): number[] {
    const { mutations = [] } = this.resolve(source, targets, ctx, {
      bypassAccuracyRolls: true,
      disableLogging: true,
      disableRandomness: true,
    })
    return mutations
      .map((m) => applyMutation(ZERO_UNIT, m))
      .flatMap((u) => u.values.damage)
      .filter((d) => d > 0)
  }

  checkCost(source: Unit): boolean {
    const costs = applyMutation(ZERO_UNIT, this.cost).values
    return Object.entries(costs).every(([key, value]) => {
      return value * -1 <= source.values[key as ValueKey]
    })
  }
}
