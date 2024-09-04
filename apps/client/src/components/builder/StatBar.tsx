import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'

export type StatBarProps = ElementProps<{
  ratio: number
}>

export function StatBar(props: StatBarProps) {
  const { ratio, children, className } = props

  return (
    <div className={cn('h-[24px] w-full bg-white/10 relative', className)}>
      <div
        className="h-full bg-slate-500/60 transition-all ease-in-out"
        style={{ width: `${ratio * 100}%` }}
      />
      <div className="absolute top-0 right-0 bottom-0 left-0 text-right px-2 opacity-40">
        {children}
      </div>
    </div>
  )
}
