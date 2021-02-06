import { promisify } from 'util'
import { randomBytes } from 'crypto'
import { promises as fsPromises } from 'fs'

describe('node promisify and fs promises', () => {
  it('randomBytes promise', async () => {
    const randomBytesP = promisify(randomBytes)
    const result = await randomBytesP(32)
    expect(result).toMatchObject(expect.any(Object))
  })

  it('fs promises', async () => {
    expect(await fsPromises.readFile(`${__dirname}/readFilePromise.spec.ts`)).toBeTruthy()
  })
})
