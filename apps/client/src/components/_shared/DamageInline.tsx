import { cn } from '@/lib/utils'
import { DamageRenderers } from '@/renderers/Damage'
import { PropsWithClassname } from '@/types'
import { Damage } from '@repo/game/types'
import { DamageIcon } from './DamageIcon'

export type DamageInlineProps = {
  damage: Damage | undefined
}

export function DamageInline(props: PropsWithClassname<DamageInlineProps>) {
  const { damage, className } = props
  const renderer = damage?.damageType
    ? DamageRenderers[damage.damageType]
    : undefined
  const icon = renderer?.icon

  return (
    <span className={cn('text-white', className)}>
      {damage && damage.value !== 0 && (
        <span className="font-black">{damage?.value} </span>
      )}
      <DamageIcon
        damageType={damage?.damageType}
        className="h-[20px] w-[20px] mb-[-3px] mr-[4px]"
      />
      <span>damage</span>
    </span>
  )
}
