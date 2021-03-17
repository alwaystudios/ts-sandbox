import readline from 'readline'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NlpManager } = require('node-nlp')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const manager = new NlpManager({ languages: ['en'], forceNER: true })
manager.addDocument('en', 'peel carrot', 'veg.carrot')
manager.addDocument('en', 'peel chop potato', 'veg.potato')
manager.addDocument('en', 'pan heat', 'cooking')
manager.addDocument('en', 'boil', 'cooking')
manager.addDocument('en', 'cook beef', 'meat')

manager.addAnswer('en', 'cooking', 'boil a kettle')
manager.addAnswer('en', 'cooking', 'heat a large wide based pan')
manager.addAnswer('en', 'veg.carrot', 'top tail and peel the carrots')
manager.addAnswer('en', 'veg.potato', 'peel and roughly chop the potatoes')
manager.addAnswer('en', 'meat', 'cook the beef until browned')

const processText = async () => {
  return new Promise<string>((resolve) => {
    rl.question('>>', (text: string) => {
      resolve(text)
    })
  })
}

const runner = async () => {
  await manager.train()

  let text = ''

  while (text !== 'exit') {
    text = await processText()
    const res = await manager.process('en', text)
    console.log(res.answer)
    console.log(res.answers.map((a: any) => a.answer))
  }
}

runner().then(() => {
  process.exit(0)
})
