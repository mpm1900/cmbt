import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { ElementProps } from '@/types'
import { Damage } from '@repo/game/types'
import { GiPlainCircle } from 'react-icons/gi'
import { DamageIcon } from './DamageIcon'

export type DamageInlineProps = ElementProps<{
  color?: string
  damage: Damage | undefined
  showAttackTypeIndicator?: boolean
}>

export function DamageInline(props: DamageInlineProps) {
  const { damage, color, showAttackTypeIndicator, className } = props
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
      {showAttackTypeIndicator && (
        <GiPlainCircle
          className={cn('h-2 w-2 self-center', {
            'fill-green-400': damage?.attackType === 'physical',
            'fill-blue-400': damage?.attackType === 'magic',
          })}
        />
      )}

      {damage && damage.power === Infinity && (
        <div className="text-2xl leading-[20px] max-h-[20px]">∞</div>
      )}
      {damage && !damage.factor && damage.power !== Infinity && (
        <span className="font-black text-lg leading-[20px] num">
          {damage?.power || '--'}
        </span>
      )}
      {damage && damage.factor && (
        <span className="font-bold num">
          {(damage.factor * 100).toFixed(1)}%
        </span>
      )}
      <DamageIcon
        color={color}
        damageType={damage?.damageType}
        className="h-[20px] w-[20px] self-center"
        content={(name) => <>{name} Power</>}
      />
    </span>
  )
}
