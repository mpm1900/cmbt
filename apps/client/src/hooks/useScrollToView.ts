import React, { MutableRefObject, useRef } from 'react'

export function useScrollToView<T>(
  container: HTMLDivElement | null,
  dep: T
): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (ref.current) {
      if (container) {
        container.scrollTo(0, ref.current.offsetTop + 100)
      }
    }
  }, [dep])
  return ref
}
