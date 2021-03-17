import readline from 'readline'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { NlpManager } = require('node-nlp')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const manager = new NlpManager({ languages: ['en'], forceNER: true })
manager.addDocument('en', 'peel carrot', 'veg.prep')
manager.addDocument('en', 'peel chop potato potatoes', 'veg.prep')
manager.addDocument('en', 'pan heat hob fry', 'cooking.frying')
manager.addDocument('en', 'boil make water hot kettle', 'cooking.kettle')
manager.addDocument('en', 'cook beef', 'meat')

manager.addAnswer('en', 'cooking.kettle', 'boil a kettle')
manager.addAnswer('en', 'cooking.frying', 'heat a large wide based pan')
manager.addAnswer('en', 'veg.prep', 'top tail and peel the carrots')
manager.addAnswer('en', 'veg.prep', 'peel and roughly chop the potatoes')
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
