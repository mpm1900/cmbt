import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { ElementProps } from '@/types'
import { Damage } from '@repo/game/types'
import { DamageIcon } from './DamageIcon'

export type DamageInlineProps = {
  damage: Damage | undefined
}

export function DamageInline(props: ElementProps<DamageInlineProps>) {
  const { damage, children = 'damage', className } = props
  const renderer = damage?.damageType
    ? DamageRenderers[damage.damageType]
    : undefined

  return (
    <span
      className={cn('text-white space-x-1 inline-flex items-end', className)}
      style={{ color: renderer?.color }}
    >
      {damage?.value === 0 && (
        <span className="font-black">{damage.value || '--'}</span>
      )}
      {damage && damage.value === Infinity && <span>∞</span>}
      {damage && damage.value > 0 && damage.value !== Infinity && (
        <span className="font-black">{damage?.value}</span>
      )}
      <DamageIcon
        damageType={damage?.damageType}
        className="h-[20px] w-[20px] self-center"
      />
      <span>{children}</span>
    </span>
  )
}
