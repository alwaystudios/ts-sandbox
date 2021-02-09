import { join } from 'path'
import level from 'level'

export function levelSubscribe(db: any) {
  db.subscribe = (pattern: any, listener: any) => {
    db.on('put', (key: string, val: any) => {
      const match = Object.keys(pattern).every((k) => pattern[k] === val[k])
      if (match) {
        listener(key, val)
      }
    })
  }

  return db
}

test('levelUP decorator', (done) => {
  const dbPath = join(__dirname, 'db')
  const db = level(dbPath, { valueEncoding: 'json' })
  levelSubscribe(db)

  db.subscribe({ doctype: 'tweet', language: 'en' }, (k: any, val: any) => {
    console.log(k, val)
    done()
  })
  db.put('1', {
    doctype: 'tweet',
    text: 'Hi',
    language: 'en',
  })
  db.put('2', {
    doctype: 'company',
    name: 'ACME Co.',
  })
})
