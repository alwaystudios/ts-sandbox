import { isPlainObject } from './isPlainObject'

interface Book {
  title: string
  author: string
  publishDate?: Date
}

const isBook = (val: unknown): val is Book =>
  isPlainObject(val) && 'title' in (val as any) && 'author' in (val as any)

test.each<[unknown, boolean]>([
  [
    {
      title: 'test',
      author: 'test',
      publishDate: new Date(),
    },
    true,
  ],
  [
    {
      title: 'test',
      author: 'test',
    },
    true,
  ],
  [
    {
      title: 'test',
      publishDate: new Date(),
    },
    false,
  ],
])('[%s] is a book? [%s]', (val, expected) => {
  expect(isBook(val)).toBe(expected)
})
