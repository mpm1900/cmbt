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
    <div className="w-full h-full max-h-screen flex flex-1 flex-col bg-slate-900">
      {header}
      <div className="flex-1 flex flex-row overflow-hidden">
        {navbar}
        <div ref={ref} className="flex flex-1 flex-col relative overflow-auto">
          {children}
        </div>
        <div>{aside}</div>
      </div>
    </div>
  )
}
