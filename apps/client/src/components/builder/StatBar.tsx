import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'

export type StatBarProps = PropsWithClassname<{
  ratio: number
}>

export function StatBar(props: StatBarProps) {
  const { ratio, className } = props

  return (
    <div className={cn('h-3 w-full', className)}>
      <div
        className="h-full bg-white/30 transition-all ease-in-out"
        style={{ width: `${ratio * 100}%` }}
      />
    </div>
  )
}
