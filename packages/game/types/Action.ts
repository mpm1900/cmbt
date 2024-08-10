import { nanoid } from 'nanoid'
import { Damage, Id } from './'
import { CombatContext } from './CombatContext'
import { Query } from './Query'
import { AttackTypes, Unit } from './Unit'
import { Modifier } from './Modifier'
import { Mutation } from './Mutation'

export type ActionAi = {
  action: Action
  weight: number
  targetIds: Id[]
}

export type ActionAccuracyResult = {
  roll: number
  success: boolean
  threshold: number | undefined
  criticalThreshold: number | undefined
  criticalFactor: number | undefined
  criticalSuccess: boolean
}

export type ActionResolveData = {
  source: Unit
  accuracyRoll: ActionAccuracyResult
  setLastUsed: Mutation
}

export type ActionsQueueItem = {
  id: string
  action: Action
  targetIds: string[]
}

export type ActionResult = {
  success?: boolean
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

export type ActionMaker = {
  id: Id
  make: (source: Unit) => Action
}

export type ActionResolveOptions = {
  disableLogging?: boolean
  disableRandomness?: boolean
  bypassAccuracyRolls?: boolean
}

export type ActionProps = {
  sourceId: Id
  teamId: Id
  cost: Mutation
  targets: Query<Unit[]>
  attackType?: AttackTypes
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
  readonly attackType: AttackTypes | undefined
  readonly cost: Mutation
  readonly targets: Query<Unit[]>
  damage?: Damage
  abstract threshold: (source: Unit) => number | undefined
  abstract criticalThreshold: (source: Unit) => number | undefined
  abstract criticalFactor: (source: Unit) => number | undefined
  abstract resolve(
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options?: ActionResolveOptions
  ): ActionResult

  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return { action: this, weight: 0, targetIds: [] }
  }

  mapTargets = (targets: Unit[], ctx: CombatContext): Unit[] => {
    return targets
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
}
