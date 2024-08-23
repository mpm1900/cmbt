import {
  PropsWithChildren,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import Fog from 'vanta/dist/vanta.fog.min'

export type PageLayoutProps = PropsWithChildren<{
  navbar?: ReactNode
  header?: ReactNode
  aside?: ReactNode
}>

export function PageLayout(props: PageLayoutProps) {
  const { children, header, navbar, aside } = props
  console.log(window)
  const [vantaEffect, setVantaEffect] = useState<any>()
  const ref = useRef(null)
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        Fog({
          el: ref.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          highlightColor: 0x76aeff,
          midtoneColor: 0x0,
          lowlightColor: 0xb13333,
          baseColor: 0x0,
          blurFactor: 0.29,
          speed: 0.2,
          zoom: 0.2,
        })
      )
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy()
    }
  }, [vantaEffect])
  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-900">
      {header}
      <div className="flex flex-1 flex-row">
        {navbar}
        <div
          ref={ref}
          className="flex flex-1 flex-col overflow-hidden relative"
        >
          {children}
        </div>
        {aside}
      </div>
    </div>
  )
}
