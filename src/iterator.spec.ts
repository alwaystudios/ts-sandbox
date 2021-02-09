const A_CHAR_CODE = 65
const Z_CHAR_CODE = 90

const createAlphabetIterator = () => {
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

test('iterator', () => {
  const iterator = createAlphabetIterator()
  const alphabet: string[] = []
  let iterationResult = iterator.next()
  while (!iterationResult.done) {
    alphabet.push(iterationResult.value!)
    iterationResult = iterator.next()
  }

  expect(alphabet).toEqual([
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ])
})
