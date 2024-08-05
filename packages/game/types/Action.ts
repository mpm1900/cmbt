import { nanoid } from 'nanoid'
import { Id } from './'
import { CombatContext } from './CombatContext'
import { Query } from './Query'
import { AttackTypes, Unit } from './Unit'
import { Modifier } from './Modifier'
import { Mutation } from './Mutation'

export type AiAction = {
  action: Action
  weight: number
  targetIds: Id[]
}

export type RollAccuracyResult = {
  roll: number
  success: boolean
  threshold: number | undefined
  critical: number | undefined
  criticalSuccess: boolean
}

export type ActionResolveData = {
  source: Unit
  accuracyRoll: RollAccuracyResult
  setLastUsed: Mutation
}

export type ActionsQueueItem = {
  id: string
  action: Action
  targetIds: string[]
}

export type ActionResult = {
  action?: Action
  source?: Unit
  targets?: Unit[]
  data?: ActionResolveData
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
    ctx: CombatContext,
    options?: ActionRenderOptions
  ): ActionResult
  abstract getAiAction(targets: Unit[], ctx: CombatContext): AiAction

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
}
