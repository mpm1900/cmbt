import { nanoid } from 'nanoid'
import { Id } from '.'

export const TeamId = () => `Team@${nanoid()}`

export type Team = {
  id: Id
}
