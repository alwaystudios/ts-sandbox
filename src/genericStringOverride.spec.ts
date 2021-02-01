import { unnest } from 'ramda'

type Data = {
  index: number
  name: string
  noOverride: number
}
const data: Data[] = [...Array(3)].map((_, index) => ({
  index,
  name: `item ${index}`,
  noOverride: index,
}))

type Keys = keyof typeof data[0] // or just typeof Data
const keysArr: Array<Keys> = Object.keys(data[0]) as Keys[]

type ValueOf<T> = T[keyof T]
type BaseItem = Record<string, any>

const defaultToString = <T extends BaseItem>(value: ValueOf<keyof T>) => {
  return String(value)
}

type ToStringFnOverrides<T> = {
  [F in keyof T]?: (value: T[F]) => string
}
const overrides: ToStringFnOverrides<Data> = {
  name: (value: string) => `name:${value}`,
  index: (value: number) => `index:${value}`,
}

const genericStringOverride = <T extends BaseItem, K extends Array<keyof T>>(
  dataItems: ReadonlyArray<T>,
  fields: K,
  toStringFnOverrides: ToStringFnOverrides<T>,
) =>
  unnest(
    dataItems.map((item) =>
      fields.map((field) =>
        toStringFnOverrides[field]
          ? toStringFnOverrides[field]!(item[field])
          : defaultToString(item[field]),
      ),
    ),
  )

test('generic string override', () => {
  expect(genericStringOverride(data, keysArr, overrides)).toEqual([
    'index:0',
    'name:item 0',
    '0',
    'index:1',
    'name:item 1',
    '1',
    'index:2',
    'name:item 2',
    '2',
  ])
})
