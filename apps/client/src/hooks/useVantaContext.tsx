import {
  createContext,
  PropsWithChildren,
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import Fog from 'vanta/dist/vanta.fog.min'

export type VantaEffectContext = {
  ref: RefObject<HTMLDivElement>
  effect: any | undefined
  set: (v: any) => void
}

const defaultValue: VantaEffectContext = {
  ref: { current: null },
  effect: undefined,
  set: () => {},
}

export const VantaContext = createContext(defaultValue)
export const useVantaContext = () => useContext(VantaContext)

export function VantaContextProvider(props: PropsWithChildren) {
  const [effect, set] = useState<any>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!effect) {
      set(
        Fog({
          el: ref.current,
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
      if (effect) effect.destroy()
    }
  }, [effect])

  const value = { effect, set, ref }
  return (
    <VantaContext.Provider value={value}>
      {props.children}
    </VantaContext.Provider>
  )
}
