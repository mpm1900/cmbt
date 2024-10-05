import { ActionsQueueItem, CombatContext } from '@repo/game/types'
import { applyModifiers, getPriority } from '@repo/game/utils'

export const queueComparator =
  (ctx: CombatContext) => (a: ActionsQueueItem, b: ActionsQueueItem) => {
    const _aSource = ctx.units.find((u) => u.id === a.action.sourceId)
    const aSource = _aSource ? applyModifiers(_aSource, ctx).unit : _aSource
    const _bSource = ctx.units.find((u) => u.id === b.action.sourceId)
    const bSource = _bSource ? applyModifiers(_bSource, ctx).unit : _bSource

    const aPriority = getPriority(a.action, aSource, ctx)
    const bPriority = getPriority(b.action, bSource, ctx)

    if (aPriority === bPriority) {
      if (!aSource && !bSource) return 0
      if (!aSource) return -1
      if (!bSource) return 1

      if (aSource.stats.speed === bSource.stats.speed) {
        return aSource.id.localeCompare(bSource.id)
      }

      return bSource.stats.speed - aSource.stats.speed
    } else {
      return bPriority - aPriority
    }
  }
