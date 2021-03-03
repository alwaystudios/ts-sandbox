import createConnectionPool from '@databases/mysql'
import { sql } from '@databases/mysql'

const asyncGeneratoryDbCursor = async () => {
  const db = createConnectionPool('mysql://root:secret@localhost:33061/recipemanager')

  for await (const record of db.queryStream(sql`select * from allergens`)) {
    console.log(record)
  }
}

test.skip('async generator cursor', async () => {
  await asyncGeneratoryDbCursor()
})
