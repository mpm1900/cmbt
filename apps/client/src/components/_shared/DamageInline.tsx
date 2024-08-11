import { Damage } from '@repo/game/types'

export type DamageInlineProps = {
  damage: Damage | undefined
}

export function DamageInline(props: DamageInlineProps) {
  const { damage } = props

  return (
    <span className="text-white">
      {damage?.value} base {damage?.damageType} damage
    </span>
  )
}
