import { ElementProps } from '@/types'
import { Damage } from '@repo/game/types'
import { Fragment } from 'react/jsx-runtime'
import { DamageInline } from './DamageInline'

export type DamageListInlineProps = ElementProps<{
  color?: string
  damages: Damage[]
}>

export function DamageListInline(props: DamageListInlineProps) {
  const { color, damages, ...rest } = props
  return (
    <span>
      {damages.map((damage, i) => (
        <Fragment key={i}>
          {i === damages.length - 1 && i !== 0 && `,`}
          <DamageInline damage={damage} color={color} {...rest} />
        </Fragment>
      ))}
    </span>
  )
}
