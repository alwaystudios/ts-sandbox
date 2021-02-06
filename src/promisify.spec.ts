import { randomBytes } from 'crypto'

const promisify = <T>(callbackFn: Function) => (...args: unknown[]) =>
  new Promise((resolve, reject) => {
    const newArgs = [
      ...args,
      (err: Error, result: T) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      },
    ]
    callbackFn(...newArgs)
  })

describe('promisify', () => {
  const name = 'test'
  const date = new Date()

  it('randomBytes promise', async () => {
    const randomBytesP = promisify<Object>(randomBytes)
    const result = await randomBytesP(32)
    expect(result).toMatchObject(expect.any(Object))
  })

  it('custom callback function', async () => {
    const myCallbackApi = (name: string, date: Date, cb: Function) => {
      cb(undefined, { name, date })
    }

    const myCallbackApiP = promisify(myCallbackApi)
    const result = await myCallbackApiP(name, date)

    expect(result).toEqual({ name, date })
  })

  it('handles errors', async () => {
    const error = new Error('boom')
    const myCallbackApi = (name: string, date: Date, cb: Function) => {
      cb(error, { name, date })
    }

    const myCallbackApiP = promisify(myCallbackApi)
    await expect(myCallbackApiP(name, date)).rejects.toEqual(error)
  })
})
