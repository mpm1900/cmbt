import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { ElementProps } from '@/types'
import { Damage } from '@repo/game/types'
import { DamageIcon } from './DamageIcon'

export type DamageInlineProps = {
  color?: string
  damage:
    | (Omit<Damage, 'attackType' | 'value'> & { value: string | number })
    | undefined
}

export function DamageInline(props: ElementProps<DamageInlineProps>) {
  const { damage, color, children = 'damage', className } = props
  const renderer = damage?.damageType
    ? DamageRenderers[damage.damageType]
    : undefined

  return (
    <span
      className={cn(
        'text-white space-x-1 inline-flex items-center flex-wrap',
        className
      )}
      style={{ color: color || renderer?.color }}
    >
      {damage && damage.value === Infinity && <span>∞</span>}
      {damage && damage.value && damage.value !== Infinity && (
        <span className="font-black">{damage?.value ?? '--'}</span>
      )}
      <DamageIcon
        color={color}
        damageType={damage?.damageType}
        className="h-[20px] w-[20px] self-center"
      />
      <span className="self-end">{children}</span>
    </span>
  )
}
