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
        'text-white space-x-1 inline-flex items-baseline',
        className
      )}
      style={{ color: color || renderer?.color }}
    >
      {damage && damage.power === Infinity && (
        <div className="text-2xl leading-[20px] max-h-[20px]">∞</div>
      )}
      {damage && !damage.factor && !damage.raw && damage.power !== Infinity && (
        <span className="font-black text-lg leading-[20px] num">
          {damage?.power || '--'}
        </span>
      )}
      {damage && damage.factor && (
        <span className="font-bold num">
          {(damage.factor * 100).toFixed(1)}%
        </span>
      )}
      {damage && damage.raw && (
        <span className="font-bold num">{damage.raw}</span>
      )}
      {damage?.raw && <span>{` pure `}</span>}
      <DamageIcon
        color={color}
        damageType={damage?.damageType}
        className="h-[20px] w-[20px] self-center"
      />
      <span>{children}</span>
    </span>
  )
}
