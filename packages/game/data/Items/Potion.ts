import { nanoid } from 'nanoid'
import {
  Action,
  ActionProps,
  ActionResult,
  CombatContext,
  Item,
  Unit,
} from '../../types'
import { PotionActionId } from '../Ids'
import { HealParent, Identity } from '../Mutations'
import { GetUnits } from '../Queries'

export class PotionAction extends Action {
  constructor(props: Omit<ActionProps, 'targets'>) {
    super(PotionActionId, {
      ...props,
      targets: new GetUnits({
        teamId: props.teamId,
      }),
    })
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext
  ): ActionResult[] => {
    const target = targets[0]
    return [
      {
        action: this,
        source,
        targets,
        expandedTargets: targets,
        mutations: [
          new HealParent({
            sourceId: source.id,
            parentId: target.id,
            static: 20,
          }),
        ],
        addedModifiers: [],
      },
    ]
  }
}

export const PotionId = nanoid()
export const Potion = (): Item => ({
  id: PotionId,
  rtid: nanoid(),
  name: 'Potion',
  rarity: 'common',
  action: (u: Unit) =>
    new PotionAction({
      sourceId: u.id,
      teamId: u.teamId,
      maxTargetCount: 1,
      priority: 5,
      cost: new Identity({}),
    }),
  cost: 150,
})
