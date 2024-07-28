import React, { MutableRefObject, useRef } from 'react'

export function useScrollToBottom<T>(
  dep: T
): MutableRefObject<HTMLDivElement | null> {
  const ref = useRef<HTMLDivElement>(null)
  React.useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight
    }
  }, [dep])
  return ref
}
