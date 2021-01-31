import { difference, pathOr } from 'ramda'
import { removeFalsy } from './removeFalsy'

export type Hierarchy = { [key: string]: string[] | Hierarchy } | string[]

export const hierarchicalFilter = <T extends Hierarchy>(
  filter: DeepPartial<T>,
  data: T,
): Hierarchy => {
  if (Array.isArray(filter) && Array.isArray(data)) {
    const array = difference(data, filter)
    return array.length ? array : []
  }
  return removeFalsy(
    Object.entries(data).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: hierarchicalFilter(pathOr([], [key], filter) as any, value),
      }),
      {},
    ),
  )
}
