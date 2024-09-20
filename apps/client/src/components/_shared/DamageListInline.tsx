import { ElementProps } from '@/types'
import { Damage } from '@repo/game/types'
import { getAttackTypesFromDamages } from '@repo/game/utils'
import { DamageInline } from './DamageInline'

export type DamageListInlineProps = ElementProps<{
  conjunction?: string
  color?: string
  seporator?: string
  damages: Damage[]
  damageClassName?: string
}>

export function DamageListInline(props: DamageListInlineProps) {
  const {
    conjunction = 'and',
    color,
    damages,
    className,
    damageClassName,
    children = '',
    seporator = ', ',
  } = props

  const attackTypes = getAttackTypesFromDamages(damages)
  return (
    <span className={className}>
      {damages.map((damage, i) => (
        <span key={i}>
          {seporator && i > 0 && seporator}
          {conjunction &&
            i > 0 &&
            i === damages.length - 1 &&
            `${conjunction} `}
          <DamageInline
            damage={damage}
            color={color}
            showAttackTypeIndicator={attackTypes.length > 1}
            className={damageClassName}
          />
        </span>
      ))}{' '}
      {children}
    </span>
  )
}
