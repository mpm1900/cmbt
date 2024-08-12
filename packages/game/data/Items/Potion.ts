import { nanoid } from 'nanoid'
import {
  ActionResult,
  ActionAi,
  CombatContext,
  Unit,
  Action,
  ActionProps,
} from '../../types'
import { ActionId } from '../Ids'
import { DamageParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export const PotionActionId = ActionId()
export class PotionAction extends Action {
  constructor(props: Omit<ActionProps, 'targets'>) {
    super(PotionActionId, {
      ...props,
      targets: new GetUnits({
        teamId: props.teamId,
      }),
    })
  }

  threshold = (source: Unit): number | undefined => undefined
  criticalThreshold = (source: Unit): number | undefined => undefined
  criticalFactor = (source: Unit): number | undefined => undefined
  getAi(targets: Unit[], ctx: CombatContext): ActionAi {
    return { action: this, weight: 0, targetIds: [] }
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult => {
    const target = targets[0]
    return {
      action: this,
      source,
      targets,
      mutations: [
        new DamageParent({
          sourceId: source.id,
          parentId: target.id,
          damage: -20,
        }),
      ],
      addedModifiers: [],
    }
  }
}

export const Potion = () => ({
  id: nanoid(),
  count: 1,
  action: (u: Unit) =>
    new PotionAction({
      sourceId: u.id,
      teamId: u.teamId,
      maxTargetCount: 1,
      cost: new Identity({}),
    }),
  cost: 1000,
})
