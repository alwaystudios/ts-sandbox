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

const db = new DB()

async function queryTest() {
  if (!db.connected) {
    await once(db, 'connected')
  }

  await db.query(`select * from recipes`)
}

test('local initialization check', async () => {
  db.connect()
  await queryTest()
  expect(mockDbQuery).toHaveBeenCalledTimes(1)
  expect(mockDbQuery).toHaveBeenCalledWith('select * from recipes')
})
