import {
  Action,
  ActionResolveOptions,
  ActionResult,
  CombatContext,
  Id,
  Unit,
} from '../../types'
import { buildActionResult, getActionData } from '../../utils'
import { modifyRenderContext } from '../../utils/modifyRenderContext'
import { DeathRitesId } from '../Ids'
import { Identity } from '../Mutations'
import { GetUnits } from '../Queries'
import { KillParentOnTurnEnd } from '../Triggers'

export class DeathRites extends Action {
  delay = 2

  constructor(sourceId: Id, teamId: Id) {
    super(DeathRitesId, {
      sourceId,
      teamId,
      cost: new Identity(),
      targets: new GetUnits({
        notTeamId: teamId,
        isActive: true,
        isHidden: false,
      }),
      maxTargetCount: 1,
    })
  }

  threshold = (source: Unit): number | undefined => {
    return 90 + source.stats.accuracy
  }

  resolve = (
    source: Unit,
    targets: Unit[],
    ctx: CombatContext,
    options: ActionResolveOptions
  ): ActionResult[] => {
    ctx = modifyRenderContext(options, ctx)
    const data = getActionData(source, this, ctx)

    return [
      buildActionResult(
        this,
        data,
        source,
        targets,
        ctx,
        (modifiedTargets) => ({
          onSuccess: {
            addedModifiers: modifiedTargets.map(
              (target) =>
                new KillParentOnTurnEnd({
                  sourceId: source.id,
                  parentId: target.id,
                  delay: this.delay,
                })
            ),
          },
        })
      ),
    ]
  }
}
