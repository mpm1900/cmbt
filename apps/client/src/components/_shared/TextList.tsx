import { Children, Fragment, ReactNode } from 'react'

export type TextListProps = {
  children: ReactNode | ReactNode[]
}

export function TextList(props: TextListProps) {
  const { children } = props
  const length = Array.isArray(children) ? children.length : 1
  return Children.map(children, (child, index) => (
    <Fragment>
      {length > 1 && index === length - 1 && ' and '}
      {child}
      {length > 2 && index !== length - 1 && ', '}
    </Fragment>
  ))
}
