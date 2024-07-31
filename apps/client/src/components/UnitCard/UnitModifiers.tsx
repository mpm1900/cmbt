import { ModifierRenderers } from '@/renderers'
import { ModifierIcon } from '../ModifierIcon'
import { applyModifiers } from '@repo/game/utils'
import { useGameContext } from '@/hooks'
import { Unit } from '@repo/game/types'

export type UnitModifiersProps = {
  unit: Unit
}

export function UnitModifiers(props: UnitModifiersProps) {
  const ctx = useGameContext()
  const { appliedModifiers, registeredTriggers } = applyModifiers(
    props.unit,
    ctx
  )
  return (
    <div className="mt-2 space-x-2 flex flex-row">
      {[...appliedModifiers, ...registeredTriggers].map((m) => {
        const r = ModifierRenderers[m.rid]
        return (
          <ModifierIcon
            key={m.rtid}
            modifier={m}
            fallback={
              <span key={m.rtid} className="font-bold">
                {r.Inline ? <r.Inline /> : `${r?.name ?? m.id}`}
              </span>
            }
          />
        )
      })}
    </div>
  )
}
