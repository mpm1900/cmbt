import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'

export type PageHeaderProps = ElementProps

export function PageHeader(props: PageHeaderProps) {
  return (
    <div
      className={cn(
        'border-b bg-slate-950 flex flex-row items-center',
        props.className
      )}
    >
      <div className="w-[64px] bg-black p-2 text-center font-mono text-muted-foreground border-r">
        cmbt
      </div>
      {props.children}
    </div>
  )
}
