import { PropsWithChildren, ReactNode } from 'react'

export type PageLayoutProps = PropsWithChildren<{
  navbar?: ReactNode
  header?: ReactNode
  aside?: ReactNode
}>

export function PageLayout(props: PageLayoutProps) {
  const { children, header, navbar, aside } = props
  return (
    <div className="flex min-h-screen w-full flex-row bg-slate-900 overflow-auto">
      {navbar}
      <div className="flex flex-1 flex-col">
        {header}
        <div className="flex flex-1 flex-col overflow-auto">{children}</div>
      </div>
      {aside}
    </div>
  )
}
