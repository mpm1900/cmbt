import { PropsWithChildren } from 'react'

export type PropsWithClassname<T = {}> = T & {
  className?: string
}

export type ElementProps<T = {}> = PropsWithChildren<PropsWithClassname<T>>
