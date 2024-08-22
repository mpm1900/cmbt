import { DamageRenderers } from '@/renderers/Damage'
import { Damage } from '@repo/game/types'

export type DamageInlineProps = {
  damage: Damage | undefined
}

export function DamageInline(props: DamageInlineProps) {
  const { damage } = props
  const icon = damage?.damageType
    ? DamageRenderers[damage.damageType]?.icon
    : undefined

  return (
    <span className="text-white inline-flex items-center space-x-1">
      <span className="font-black">{damage?.value}</span>{' '}
      <span>{icon ? icon : damage?.damageType}</span> <span>damage</span>
    </span>
  )
}
