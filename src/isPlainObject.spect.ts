import { isPlainObject } from './isPlainObject'

describe('isPlainObject', () => {
  it('returns false for a NaN', () => {
    expect(isPlainObject(NaN)).toBe(false)
  })

  it('returns false for a null', () => {
    expect(isPlainObject(null)).toBe(false)
  })

  it('returns false for a string', () => {
    expect(isPlainObject('hello world')).toBe(false)
  })

  it('returns false for a number', () => {
    expect(isPlainObject(12345)).toBe(false)
  })

  it('returns false for undefined', () => {
    expect(isPlainObject(undefined)).toBe(false)
  })

  it('returns false for a map', () => {
    expect(isPlainObject(new Map())).toBe(false)
  })

  it('returns false for a set', () => {
    expect(isPlainObject(new Set())).toBe(false)
  })

  it('returns false for an object with no keys', () => {
    expect(isPlainObject({})).toBe(true)
  })

  it('returns false for an object', () => {
    expect(isPlainObject({ key: 'value' })).toBe(true)
  })

  it('returns false for Object.create(null)', () => {
    expect(isPlainObject(Object.create(null))).toBe(true)
  })

  it('returns false for new Object()', () => {
    expect(isPlainObject(new Object())).toBe(true)
  })
})
