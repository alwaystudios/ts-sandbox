import { unnest } from 'ramda'

type Data = {
  index: number
  name: string
}
const data: Data[] = [...Array(10)].map((_, index) => ({ index, name: `item ${index}` }))

type Keys = keyof typeof data[0]
const KeysArr: Array<Keys> = Object.keys(data[0]) as Keys[]

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
  expect(genericStringOverride(data, KeysArr, overrides)).toEqual([
    '0',
    'name:item 0',
    '1',
    'name:item 1',
    '2',
    'name:item 2',
    '3',
    'name:item 3',
    '4',
    'name:item 4',
    '5',
    'name:item 5',
    '6',
    'name:item 6',
    '7',
    'name:item 7',
    '8',
    'name:item 8',
    '9',
    'name:item 9',
  ])
})
