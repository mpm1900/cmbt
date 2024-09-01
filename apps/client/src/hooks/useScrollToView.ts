import React, { MutableRefObject, useRef } from 'react'

export function useScrollToView<T>(
  dep: T
): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start',
      })
    }
  }, [dep])
  return ref
}
