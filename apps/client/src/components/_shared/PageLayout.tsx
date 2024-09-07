import { useVantaContext } from '@/hooks'
import { cn } from '@/lib/utils'
import { ElementProps } from '@/types'
import { ReactNode } from 'react'

export type PageLayoutProps = ElementProps<{
  navbar?: ReactNode
  header?: ReactNode
  aside?: ReactNode
}>

export function PageLayout(props: PageLayoutProps) {
  const { children, className, header, navbar, aside } = props
  const { effect, ref } = useVantaContext()
  return (
    <div
      ref={ref}
      className="w-full h-full max-h-screen flex flex-1 flex-col bg-slate-900 relative"
    >
      {header}
      <div className="flex-1 flex flex-row overflow-hidden">
        {navbar}
        <div
          className={cn(
            'flex flex-1 flex-col relative overflow-hidden z-10',
            className
          )}
        >
          {children}
        </div>
        <div>{aside}</div>
      </div>
    </div>
  )
}
