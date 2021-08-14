import { EventEmitter, once } from 'events'

const foods = ['ham', 'cheese', 'eggs', 'butter', 'onions']
const mockDbQuery: (query: string) => Promise<string[]> = jest.fn().mockResolvedValue(foods)

class DB extends EventEmitter {
  connected = false

  connect() {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
    }, 500)
  }

  async query(queryString: string): Promise<string[]> {
    if (!this.connected) {
      this.emit('error', new Error('Not connected'))
      return []
    }
    return mockDbQuery(queryString)
  }
}

describe('local initialization check', () => {
  beforeEach(jest.clearAllMocks)

  test('with check', async () => {
    const db = new DB()
    db.connect()
    if (!db.connected) {
      await once(db, 'connected')
    }
    const results = await db.query(`select * from foods`)

    expect(results).toEqual(foods)
    expect(mockDbQuery).toHaveBeenCalledTimes(1)
    expect(mockDbQuery).toHaveBeenCalledWith('select * from foods')
  })

  test('without check no event listener', async () => {
    const db = new DB()
    db.connect()
    await expect(db.query(`select * from foods`)).rejects.not.toBeUndefined()
    expect(mockDbQuery).not.toHaveBeenCalled()
  })

  test('without check with event listener', async () => {
    const db = new DB()
    const errorMock = jest.fn()
    db.on('error', errorMock)
    db.connect()
    const results = await db.query(`select * from foods`)
    expect(results).toEqual([])
    expect(mockDbQuery).not.toHaveBeenCalled()
    expect(errorMock).toHaveBeenCalledTimes(1)
    expect(errorMock).toHaveBeenCalledWith(new Error('Not connected'))
  })
})
