import { Bleed } from './Bleed'
import { Burn } from './Burn'
import { Charged } from './Charge'
import { Guidance } from './Guidance'
import { Poison } from './Poison'

export * from './Bleed'
export * from './Burn'
export * from './Charge'
export * from './Guidance'
export * from './Poison'

export const ALL_STATUSES = [Bleed, Burn, Poison, Charged, Guidance]
