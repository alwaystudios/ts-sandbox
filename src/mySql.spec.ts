const createConnectionPool = require('@databases/mysql')
const { sql } = require('@databases/mysql')

const asyncGeneratoryDbCursor = async () => {
  const db = createConnectionPool('mysql://root:secret@localhost:33061/recipemanager')

  for await (const record of db.queryStream(sql`select * from allergens`)) {
    console.log(record)
  }
}

test('async generator cursor', async () => {
  await asyncGeneratoryDbCursor()
})
