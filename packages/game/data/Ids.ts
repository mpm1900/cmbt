import { nanoid } from 'nanoid'

export const ActionId = () => `Action@${nanoid()}`
export const ItemId = () => `Item@${nanoid()}`
export const ModifierId = () => `Modifier@${nanoid()}`
export const MutationId = () => `Mutation@${nanoid()}`
export const TeamId = () => `Team@${nanoid()}`
export const TriggerId = () => `Trigger@${nanoid()}`
export const UnitId = () => `Unit@${nanoid()}`
