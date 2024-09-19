import { ElementProps } from '@/types'
import { Modifier } from '@repo/game/types'
import { ModifierInline } from './ModifierInline'

export type ModifierListInlineProps = ElementProps<{
  conjunction?: string
  seporator?: string
  modifiers: Modifier[]
  modifierClassName?: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}>

export function ModifierListInline(props: ModifierListInlineProps) {
  const {
    conjunction = 'and',
    className,
    modifiers,
    modifierClassName,
    children = '',
    seporator = ', ',
    side,
  } = props
  return (
    <span className={className}>
      {modifiers.map((modifier, i) => (
        <span key={i}>
          {seporator && i > 0 && seporator}
          {conjunction &&
            i > 0 &&
            i === modifiers.length - 1 &&
            `${conjunction} `}
          <ModifierInline
            className={modifierClassName}
            modifier={modifier}
            side={side}
          />
        </span>
      ))}{' '}
      {children}
    </span>
  )
}
