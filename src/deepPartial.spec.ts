import { dissoc } from 'ramda'

type Data = {
  key1: string
  deepKey: {
    key2: number
    optionalDeepKey?: {
      key3: number
    }
  }
}

test('deep partial', () => {
  const data: Data = {
    key1: 'test 1',
    deepKey: {
      key2: 1,
    },
  }

  const partialData: DeepPartial<Data> = {}

  expect(data).not.toEqual(partialData)

  const partialData2: DeepPartial<Data> = { ...data }
  expect(data).toEqual(partialData2)

  const partialData3: DeepPartial<Data> = { key1: 'test 1', deepKey: { optionalDeepKey: {} } }
  expect(data).toMatchObject(dissoc<Data>('deepKey', partialData3))
  expect(data).not.toMatchObject({ ...partialData3, someOtherKey: 22 })
})
