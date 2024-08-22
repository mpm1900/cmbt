import { DamageRenderers } from '@/renderers/Damage'
import { Damage } from '@repo/game/types'
import { DamageIcon } from './DamageIcon'

export type DamageInlineProps = {
  damage: Damage | undefined
}

export function DamageInline(props: DamageInlineProps) {
  const { damage } = props
  const renderer = damage?.damageType
    ? DamageRenderers[damage.damageType]
    : undefined
  const icon = renderer?.icon

  return (
    <span className="text-white inline-flex items-center space-x-1">
      <span className="font-black">{damage?.value}</span>{' '}
      <DamageIcon
        damageType={damage?.damageType}
        className="h-[18px] w-[18px]"
      />{' '}
      <span>damage</span>
    </span>
  )
}
