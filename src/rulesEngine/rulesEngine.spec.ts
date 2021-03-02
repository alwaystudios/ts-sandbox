import { Engine, Rule } from 'json-rules-engine'

/*
Rule:
- Cuisine
- Protein
- Exclusions
    - recipes
    - ingredients
    - dish category
*/

const rule1 = new Rule({
  conditions: {
    any: [
      {
        all: [
          {
            fact: 'proteinSource',
            operator: 'equal',
            value: 'chicken',
          },
        ],
      },
    ],
  },
  event: {
    type: 'chickenAddRule',
    params: {
      message: 'Would you like something with your chicken?',
    },
  },
})

const recipe1 = {
  name: 'chicken curry',
  ingredients: ['rice', 'chicken', 'carrot', 'soy sauce', 'onion', 'egg', 'curry powder'],
  proteinSource: 'chicken',
  dish_category: 'lean in 15',
}

const recipe2 = {
  name: 'beef curry',
  ingredients: ['rice', 'beef', 'carrot', 'soy sauce', 'onion', 'egg', 'curry powder'],
  proteinSource: 'beef',
  dish_category: 'lean in 15',
}

describe('rules engine', () => {
  it('simple rule test', async () => {
    const engine = new Engine()
    engine.addRule(rule1)

    const { events } = await engine.run(recipe2)

    events.map((e) => console.log(e.params?.message))
  })

  it('serialize / deserialize rules', async () => {
    const serializedRule = rule1.toJSON()
    console.log(serializedRule)
    const deserializeRule = new Rule(serializedRule)
    const engine = new Engine()
    engine.addRule(deserializeRule)

    const { events } = await engine.run(recipe1)

    events.map((e) => console.log(e.params?.message))
  })
})
