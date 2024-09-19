import { ElementProps } from '@/types'
import { Status } from '@repo/game/types'
import { StatusInline } from './StatusInline'

export type StatusListInlineProps = ElementProps<{
  conjunction?: string
  seporator?: string
  statuses: Status[]
}>

export function StatusListInline(props: StatusListInlineProps) {
  const {
    conjunction = 'and',
    statuses,
    className,
    children = '',
    seporator = ', ',
  } = props
  return (
    <span className={className}>
      {statuses.map((status, i) => (
        <span key={i}>
          {seporator && i > 0 && seporator}
          {conjunction &&
            i > 0 &&
            i === statuses.length - 1 &&
            `${conjunction} `}
          <StatusInline status={status} />
        </span>
      ))}{' '}
      {children}
    </span>
  )
}
