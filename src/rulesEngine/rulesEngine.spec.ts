import { Engine } from 'json-rules-engine'
import { createRule } from './rules'

const ruleName = 'test_rule'
const engine = new Engine()
engine.addRule(
  createRule({
    ruleName,
    cuisines: ['indian', 'turkish'],
    proteinSources: ['chicken', 'beef'],
    exclusions: {
      recipes: ['b1', 'b2'],
      ingredients: ['eggs', 'butter'],
      categories: ['easy', 'hard'],
    },
  }),
)

describe('rules engine', () => {
  it('rule name is the only mandatory param', () => {
    expect(() => createRule({})).toThrowError('rule name undefined')
  })

  describe('inclusions only', () => {
    it('fires an event for a recipe that meets the cuisine rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'beef curry',
        cuisine: 'indian',
        ingredients: ['rice', 'curry powder', 'beef'],
        proteinSource: 'minced beef',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(1)
      expect(events[0].type).toBe(ruleName)
    })

    it('fires an event for a recipe that meets the protein sources rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'chicken curry',
        cuisine: 'Thai',
        ingredients: ['rice', 'curry powder', 'chicken'],
        proteinSource: 'chicken',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(1)
      expect(events[0].type).toBe(ruleName)
    })

    it('fires an event for a recipe that meets the cuisine and protein sources rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'chicken curry',
        cuisine: 'indian',
        ingredients: ['rice', 'curry powder', 'chicken'],
        proteinSource: 'chicken',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(1)
      expect(events[0].type).toBe(ruleName)
    })
  })

  describe('recipe exclusions', () => {
    it('fires no event for a recipe that meets the cuisine rule but breaks the recipe exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'b1',
        name: 'beef curry',
        cuisine: 'indian',
        ingredients: ['rice', 'curry powder', 'beef'],
        proteinSource: 'minced beef',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(0)
    })

    it('fires no event for a recipe that meets the protein sources rule but breaks the recipe exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'b1',
        name: 'chicken curry',
        cuisine: 'Thai',
        ingredients: ['rice', 'curry powder', 'chicken'],
        proteinSource: 'chicken',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(0)
    })

    it('fires no event for a recipe that meets the cuisine and protein sources rule but breaks the recipe exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'b1',
        name: 'chicken curry',
        cuisine: 'indian',
        ingredients: ['rice', 'curry powder', 'chicken'],
        proteinSource: 'chicken',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(0)
    })
  })

  describe('category exclusions', () => {
    it('fires no event for a recipe that meets the cuisine rule but breaks the category exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'beef curry',
        cuisine: 'indian',
        ingredients: ['rice', 'curry powder', 'beef'],
        proteinSource: 'minced beef',
        category: 'easy',
      })

      expect(events).toHaveLength(0)
    })

    it('fires no event for a recipe that meets the protein sources rule but breaks the category exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'chicken curry',
        cuisine: 'Thai',
        ingredients: ['rice', 'curry powder', 'chicken'],
        proteinSource: 'chicken',
        category: 'easy',
      })

      expect(events).toHaveLength(0)
    })

    it('fires no event for a recipe that meets the cuisine and protein sources rule but breaks the category exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'chicken curry',
        cuisine: 'indian',
        ingredients: ['rice', 'curry powder', 'chicken'],
        proteinSource: 'chicken',
        category: 'easy',
      })

      expect(events).toHaveLength(0)
    })
  })

  describe('ingredient exclusions', () => {
    it('fires no event for a recipe that meets the cuisine rule but breaks the ingredient exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'beef curry',
        cuisine: 'indian',
        ingredients: ['rice', 'curry powder', 'beef', 'eggs'],
        proteinSource: 'minced beef',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(0)
    })

    it('fires no event for a recipe that meets the protein sources rule but breaks the ingredient exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'chicken curry',
        cuisine: 'Thai',
        ingredients: ['rice', 'curry powder', 'chicken', 'butter'],
        proteinSource: 'chicken',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(0)
    })

    it('fires no event for a recipe that meets the cuisine and protein sources rule but breaks the ingredient exclusion rule', async () => {
      const { events } = await engine.run({
        id: 'abc123',
        name: 'chicken curry',
        cuisine: 'indian',
        ingredients: ['rice', 'curry powder', 'chicken', 'eggs'],
        proteinSource: 'chicken',
        category: 'lean in 15',
      })

      expect(events).toHaveLength(0)
    })
  })
})
