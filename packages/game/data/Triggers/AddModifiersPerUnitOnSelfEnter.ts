import {
  CombatContext,
  Modifier,
  MutationFilterArgs,
  Trigger,
  TriggerProps,
  Unit,
} from '../../types'
import { AddModifiersPerUnitOnSelfEnterId } from '../Ids'

export class AddModifiersPerUnitOnSelfEnter extends Trigger {
  filterUnits?: (unit: Unit) => boolean
  makeModifiers: (unit: Unit | undefined) => Modifier[]
  targetsLabel: string

  constructor(
    props: TriggerProps & {
      filterUnits?: (unit: Unit) => boolean
      makeModifiers: (unit: Unit | undefined) => Modifier[]
      targetsLabel: string
    }
  ) {
    const { filterUnits = () => true } = props
    super(AddModifiersPerUnitOnSelfEnterId, {
      ...props,
      events: ['on Unit Enter'],
      maxInstances: 1,
      modifiers: (ctx) =>
        ctx.units
          .filter((u) => super.filter(u, ctx, {}) && filterUnits(u))
          .flatMap((u) => props.makeModifiers(u)),
    })

    this.filterUnits = filterUnits
    this.makeModifiers = props.makeModifiers
    this.targetsLabel = props.targetsLabel
  }

  filter = (
    unit: Unit,
    ctx: CombatContext,
    args: MutationFilterArgs
  ): boolean => {
    return (
      super.filter(unit, ctx, args) &&
      Trigger.OnSelfEnter(this, unit, ctx, args)
    )
  }
}
