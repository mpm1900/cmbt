import { StatRenderers } from '@/renderers/Stats'
import { StatKey } from '@repo/game/types'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'

export type StatModifierIconProps = {
  stat: StatKey
  type: 'up' | 'down'
}

export function StatModifierIcon(props: StatModifierIconProps) {
  return (
    <div className="h-full w-full relative">
      {StatRenderers[props.stat].icon}
      {props.type === 'down' && (
        <AiFillCaretDown
          className="absolute fill-red-400 h-[24px] w-[24px]"
          style={{ bottom: -6, right: -6 }}
        />
      )}

      {props.type === 'up' && (
        <AiFillCaretUp
          className="absolute fill-green-400 h-[24px] w-[24px]"
          style={{ bottom: -6, right: -6 }}
        />
      )}
    </div>
  )
}
