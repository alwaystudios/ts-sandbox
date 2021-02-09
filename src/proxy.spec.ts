import { StackCalculator } from './StackCalculator'

const calculator = new StackCalculator()
const safeCalculator = new Proxy(calculator, {
  get: (target: any, property: any) => {
    if (property === 'divide') {
      return function () {
        const divisor = target.peekValue()
        if (divisor === 0) {
          throw Error('Division by 0')
        }
        return target.divide()
      }
    }

    return target[property]
  },
})

test('safe calc proxy div by zero', () => {
  safeCalculator.clear()
  safeCalculator.putValue(4)
  safeCalculator.putValue(0)
  expect(() => safeCalculator.divide()).toThrow(Error('Division by 0'))
  expect(typeof safeCalculator).toEqual('object')
  expect(safeCalculator.add()).toEqual(4)
})

test('double number, even nos only', () => {
  const doubleNumber = new Proxy<number[]>([], {
    get: (_, index: number) => index * 2,
    has: (_, index: number) => index % 2 === 0,
  })

  expect(2 in doubleNumber).toBe(true)
  expect(5 in doubleNumber).toBe(false)
  expect(doubleNumber[7]).toEqual(14)
})
