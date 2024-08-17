import { cn } from '@/lib/utils'
import { ModifierRenderers } from '@/renderers'
import { Modifier } from '@repo/game/types'
import { ModifierHover } from './ModifierHover'

export type ModifierInlineProps = {
  className?: string
  modifier: Modifier
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export function ModifierInline(props: ModifierInlineProps) {
  const { className, modifier, side } = props
  const renderer = ModifierRenderers[modifier.rid]

  return (
    <ModifierHover side={side} modifier={modifier}>
      <span
        className={cn('hover:underline cursor-pointer font-bold', className)}
      >
        {renderer?.name}
      </span>
    </ModifierHover>
  )
}
