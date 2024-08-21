import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export type CounterProps = { from: number; to: number; duration: number }

export function Counter(props: CounterProps) {
  const { from, to, duration } = props
  const value = useMotionValue(from)
  const rounded = useTransform(value, (latest) => Math.round(latest))

  useEffect(() => {
    const controls = animate(value, to, { duration: duration })
    return controls.stop
  }, [from, to])

  return <motion.span>{rounded}</motion.span>
}
