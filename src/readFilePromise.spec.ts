import fs from 'fs'

const readFilePromise = (file: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => (err ? reject(err) : resolve(data)))
  })

test('read file promise', async () => {
  expect(await readFilePromise(`${__dirname}/readFilePromise.spec.ts`)).toBeTruthy()
})

test('read file promise rejection', async () => {
  await expect(readFilePromise('err')).rejects.toThrow()
})
