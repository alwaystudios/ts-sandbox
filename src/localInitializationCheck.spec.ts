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

  query(queryString: string) {
    if (!this.connected) {
      this.emit('error', new Error('Not connected'))
      return
    }
    mockDbQuery(queryString).then((data) => this.emit('data', data))
  }
}

describe('local initialization check', () => {
  beforeEach(jest.clearAllMocks)

  test('with check', async () => {
    const onData = jest.fn()
    const db = new DB()
    db.on('data', onData)
    db.connect()
    if (!db.connected) {
      await once(db, 'connected')
    }
    db.query(`select * from foods`)

    await once(db, 'data')

    expect(onData).toHaveBeenCalledTimes(1)
    expect(onData).toHaveBeenCalledWith(foods)
    expect(mockDbQuery).toHaveBeenCalledTimes(1)
    expect(mockDbQuery).toHaveBeenCalledWith('select * from foods')
  })

  test('without check', () => {
    const db = new DB()
    const errorMock = jest.fn()
    db.on('error', errorMock)
    db.connect()
    db.query(`select * from foods`)
    expect(mockDbQuery).not.toHaveBeenCalled()
    expect(errorMock).toHaveBeenCalledTimes(1)
    expect(errorMock).toHaveBeenCalledWith(new Error('Not connected'))
  })
})
