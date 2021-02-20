import { EventEmitter, once } from 'events'

const mockDbQuery = jest.fn()

class DB extends EventEmitter {
  connected = false

  connect() {
    // simulate the delay of the connection
    setTimeout(() => {
      this.connected = true
      this.emit('connected')
    }, 500)
  }

  async query(queryString: string) {
    if (!this.connected) {
      throw new Error('Not connected yet')
    }
    mockDbQuery(queryString)
  }
}

describe('local initialization check', () => {
  beforeEach(jest.resetAllMocks)

  test('with check', async () => {
    const db = new DB()
    db.connect()
    if (!db.connected) {
      await once(db, 'connected')
    }
    await db.query(`select * from recipes`)

    expect(mockDbQuery).toHaveBeenCalledTimes(1)
    expect(mockDbQuery).toHaveBeenCalledWith('select * from recipes')
  })

  test('without check', async () => {
    const db = new DB()
    db.connect()
    await expect(db.query(`select * from recipes`)).rejects.toEqual(new Error('Not connected yet'))
    expect(mockDbQuery).not.toHaveBeenCalled()
  })
})
