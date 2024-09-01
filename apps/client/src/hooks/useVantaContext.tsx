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

export type VantaEffectOptions = {
  minHeight: number
  minWidth: number
  highlightColor: number
  midtoneColor: number
  lowlightColor: number
  baseColor: number
  blurFactor: number
  speed: number
  zoom: number
}

export type VantaEffect = {
  setOptions: (options: Partial<VantaEffectOptions>) => void
  destroy: () => void
}

export type VantaEffectContext = {
  ref: RefObject<HTMLDivElement>
  effect: VantaEffect | undefined
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
  const [effect, set] = useState<VantaEffect>()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
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
    } catch (e) {}
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
