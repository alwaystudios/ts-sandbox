import { isPlainObject } from './isPlainObject'
import { truthy } from './truthy'

const toString = <T extends Object>(object: T): string => {
  if (!object || !isPlainObject(object)) {
    return ''
  }

  return Object.entries(object)
    .map(([key, value]) =>
      value ? `[${key}]: ${typeof value === 'object' ? JSON.stringify(value) : value}` : undefined,
    )
    .filter(truthy)
    .sort((a, b) => a.localeCompare(b))
    .join(', ')
}

test.each<[Object, string]>([
  [{ id: 1, name: 'test 1', desc: null }, '[id]: 1, [name]: test 1'],
  [{ someKey: undefined }, ''],
  [[], ''],
])('object to string [%s "%s"]', (obj, expected) => {
  expect(toString(obj)).toEqual(expected)
})
