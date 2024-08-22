import { cn } from '@/lib/utils'
import { PropsWithClassname } from '@/types'

export type StatBarProps = PropsWithClassname<{
  ratio: number
}>

export function StatBar(props: StatBarProps) {
  const { ratio, className } = props

  return (
    <div className={cn('h-[24px] w-full bg-white/10', className)}>
      <div
        className="h-full bg-slate-500/60 transition-all ease-in-out"
        style={{ width: `${ratio * 100}%` }}
      />
    </div>
  )
}
