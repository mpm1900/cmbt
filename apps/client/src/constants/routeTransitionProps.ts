import { HTMLMotionProps } from 'framer-motion'

export const routeTransitionProps: HTMLMotionProps<'div'> = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: {
    duration: 0.75,
    delay: 0.15,
  },
}
