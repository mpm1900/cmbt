import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { ElementProps } from '@/types'
import { Damage } from '@repo/game/types'
import { DamageIcon } from './DamageIcon'

export type DamageInlineProps = {
  color?: string
  damage: Omit<Damage, 'attackType'> | undefined
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
      {damage && damage.power === Infinity && (
        <span className="text-xl">∞</span>
      )}
      {damage && !damage.factor && damage.power !== Infinity && (
        <span className="font-black">{damage?.power || '--'}</span>
      )}
      {damage && damage.factor && (
        <span className="font-black">{(damage.factor * 100).toFixed(1)}%</span>
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
