import { cn } from '@/lib/utils'
import { Separator } from '@radix-ui/react-separator'
import { PropsWithChildren } from 'react'

export function LogHeader(props: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'flex flex-row items-center w-full space-x-2 text-muted-foreground/40 font-bold uppercase overflow-hidden',
        props.className
      )}
    >
      <div className="text-nowrap">{props.children}</div>
      <Separator />
    </div>
  )
}
