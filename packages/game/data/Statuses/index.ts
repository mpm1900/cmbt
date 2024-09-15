import { Bleed } from './Bleed'
import { Burn } from './Burn'
import { Charged } from './Charge'
import { Poison } from './Poison'

export * from './Bleed'
export * from './Burn'
export * from './Charge'
export * from './Poison'

export const ALL_STATUSES = [Bleed, Burn, Poison, Charged]
