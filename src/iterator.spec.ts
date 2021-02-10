const A_CHAR_CODE = 65
const Z_CHAR_CODE = 90
class AlphabetIterator {
  [Symbol.iterator]() {
    let currCode = A_CHAR_CODE

    return {
      next() {
        const currChar = String.fromCodePoint(currCode)
        if (currCode > Z_CHAR_CODE) {
          return { done: true }
        }

        currCode++
        return { value: currChar, done: false }
      },
    }
  }
}

const ALPHABET = [...new AlphabetIterator()]
console.log(ALPHABET)

describe('iterators', () => {
  it('iterator for..of', () => {
    const iterator = new AlphabetIterator()
    const alphabet: string[] = []

    for (const code of iterator) {
      alphabet.push(code!)
    }

    expect(alphabet).toEqual(ALPHABET)
  })

  it('iterator basic', () => {
    const iterator = new AlphabetIterator()[Symbol.iterator]()
    const alphabet: string[] = []
    let iterationResult = iterator.next()
    while (!iterationResult.done) {
      alphabet.push(iterationResult.value!)
      iterationResult = iterator.next()
    }

    expect(alphabet).toEqual(ALPHABET)
  })
})

describe('generators', () => {
  function* alphbetGenerator() {
    let currCode = A_CHAR_CODE
    while (currCode <= Z_CHAR_CODE) {
      yield String.fromCharCode(currCode++)
    }
  }

  it('generator for..of', () => {
    const alphabet: string[] = []
    for (const code of alphbetGenerator()) {
      alphabet.push(code)
    }

    expect(alphabet).toEqual(ALPHABET)
  })
})
