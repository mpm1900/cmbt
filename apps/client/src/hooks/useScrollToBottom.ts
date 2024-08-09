import React, { MutableRefObject, useRef } from 'react'

export function useScrollToBottom<T>(
  dep: T
): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (ref.current) {
      console.log('scrolling')
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      })
    }
  }, [dep])
  return ref
}
