export class StackCalculator {
  stack: number[]

  constructor() {
    this.stack = []
  }

  putValue(value: number) {
    this.stack.push(value)
  }

  getValue() {
    return this.stack.pop()
  }

  peekValue() {
    return this.stack[this.stack.length - 1]
  }

  clear() {
    this.stack = []
  }

  divide() {
    if (this.stack.length < 2) {
      return
    }
    const divisor = this.getValue()!
    const dividend = this.getValue()!
    const result = dividend / divisor
    this.putValue(result)
    return result
  }

  multiply() {
    if (this.stack.length < 2) {
      return
    }
    const multiplicand = this.getValue()!
    const multiplier = this.getValue()!
    const result = multiplier * multiplicand
    this.putValue(result)
    return result
  }

  add() {
    if (this.stack.length < 2) {
      return
    }
    const value1 = this.getValue()!
    const value2 = this.getValue()!
    const result = value2 + value1
    this.putValue(result)
    return result
  }
}
