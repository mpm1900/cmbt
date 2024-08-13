import { ModifierRenderers } from '@/renderers'
import { Modifier } from '@repo/game/types'
import { ModifierHover } from './ModifierHover'

export type ModifierInlineProps = {
  modifier: Modifier
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function ModifierInline(props: ModifierInlineProps) {
  const { modifier, side } = props
  const renderer = ModifierRenderers[modifier.rid]

  return (
    <ModifierHover side={side} modifier={modifier}>
      <span className="hover:underline cursor-pointer font-bold">
        {renderer?.name}
      </span>
    </ModifierHover>
  )
}
