import { createReadStream, createWriteStream } from 'fs'
import { createGzip } from 'zlib'

test('gzip stream', (done) => {
  const filename = `${__dirname}/../readme.md`
  console.log(filename)

  createReadStream(filename)
    .pipe(createGzip())
    .pipe(createWriteStream(`${filename}.gz`))
    .on('finish', () => {
      console.log('File successfully compressed')
      done()
    })
})
