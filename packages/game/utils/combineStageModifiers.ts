import { UpdateStatStageParent } from '../data'
import { Modifier } from '../types'

export function combineStageModifiers(modifiers: Modifier[]) {
  return modifiers.reduce<Modifier[]>((result, modifier) => {
    if (modifier instanceof UpdateStatStageParent) {
      const base = result.find(
        (mod) => mod.key === modifier.key
      ) as UpdateStatStageParent
      if (base) {
        const stages = base.stages + modifier.stages
        if (stages === 0) {
          return result.filter((mod) => mod.key !== base.key)
        }
        return result.map((mod) => {
          if (mod.key === base.key) {
            return new UpdateStatStageParent({
              rtid: base.rtid,
              registryId: base.registryId,
              stat: base.stat,
              stages: stages,
              sourceId: base.sourceId,
              parentId: base.parentId,
            })
          }
          return mod
        })
      }
    }

    return result.concat(modifier)
  }, [])
}
