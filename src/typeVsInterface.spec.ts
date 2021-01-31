interface Person {
  name: string
}

interface LifeSpan {
  birth: Date
  death?: Date
}

type PersonsLife = Person & LifeSpan
const person1: PersonsLife = {
  name: 'test person',
  birth: new Date(1977, 0, 21),
}

// there are no overlapping keys
type ThisTypeIsNever = keyof (Person | LifeSpan)

type Keys = keyof (Person & LifeSpan)
const keys: Array<Keys> = ['name', 'birth', 'death']

// TBinary and IBinary are interchangeable
type TBinary = (val1: number, val2: number) => number
interface IBinary {
  (val1: number, val2: number): number
}

interface InterfaceCanExtendTypes extends Object {
  someKey: string
}
type TypeCanExtendInterface = { someKey: string } & Object

class ClassCanImplementInterface implements InterfaceCanExtendTypes {
  someKey = 'test class implements interface'
}

class ClassCanImplementType implements TypeCanExtendInterface {
  someKey = 'test class implements type'
}

test('types', () => {
  expect(new ClassCanImplementInterface().someKey).toBe('test class implements interface')
  expect(new ClassCanImplementType().someKey).toBe('test class implements type')

  expect(new ClassCanImplementType() instanceof ClassCanImplementInterface).toBe(false)
})

// interfaces can be augmented (types cannot)
interface Number {
  customMethod: Function
}
Number.prototype.customMethod = () => 'custom function'

test('augmented interface', () => {
  expect(new Number(22).customMethod()).toEqual('custom function')
})
