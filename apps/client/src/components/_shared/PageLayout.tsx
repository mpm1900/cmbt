import { useVantaContext } from '@/hooks'
import { PropsWithChildren, ReactNode } from 'react'

export type PageLayoutProps = PropsWithChildren<{
  navbar?: ReactNode
  header?: ReactNode
  aside?: ReactNode
}>

export function PageLayout(props: PageLayoutProps) {
  const { children, header, navbar, aside } = props
  const { effect, ref } = useVantaContext()
  return (
    <div className="min-h-screen w-full flex-col bg-slate-900">
      {header}
      <div className="h-full flex flex-row">
        {navbar}
        <div
          ref={ref}
          className="flex flex-1 flex-col relative overflow-hidden"
        >
          {children}
        </div>
        {aside}
      </div>
    </div>
  )
}
