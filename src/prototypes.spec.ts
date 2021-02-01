interface Function {
  method: Function
}

interface Number {
  integer: Function
}

Function.prototype.method = function (name: string, func: Function) {
  if (!this.prototype[name]) {
    this.prototype[name] = func
  }
  return this
}

describe('prototypes', () => {
  it('extend a prototype with a new method', () => {
    Number.method('integer', function (this: number) {
      return Math[this < 0 ? 'ceil' : 'floor'](this)
    })

    Number.method('integer', function () {
      return 22
    })

    const val = -10 / 3
    expect(val.integer()).toEqual(-3)
  })
})
