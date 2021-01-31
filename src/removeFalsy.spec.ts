import { removeFalsy } from './removeFalsy'

describe('remove falsy', () => {
  it('removes falsy values from an object', () => {
    const result = removeFalsy({
      one: null,
      two: undefined,
      three: '',
      four: ' ',
      five: 0,
      six: '0',
      seven: 'keep',
      eight: [],
      nine: [1],
      ten: {},
      eleven: { key: 2 },
    })

    expect(result).toEqual({
      four: ' ',
      six: '0',
      seven: 'keep',
      nine: [1],
      eleven: { key: 2 },
    })
  })

  it('removes falsy for a string', () => {
    expect(removeFalsy('test')).toEqual('test')
  })

  it('removes falsy for a number', () => {
    expect(removeFalsy(1)).toBe(1)
  })

  it('removes falsy with empty object', () => {
    expect(removeFalsy({})).toEqual({})
  })

  it('removes falsy with empty array', () => {
    expect(removeFalsy([])).toEqual([])
  })

  it('removes falsy with an array', () => {
    expect(removeFalsy([true])).toEqual([true])
  })

  it('removes falsy with undefined', () => {
    expect(removeFalsy(undefined)).toBeUndefined()
  })

  it('removes falsy with null', () => {
    expect(removeFalsy(null)).toBeNull()
  })
})
