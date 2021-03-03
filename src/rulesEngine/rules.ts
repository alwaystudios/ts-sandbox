import { Rule, RuleProperties } from 'json-rules-engine'

type RecipeRule = {
  ruleName: string
  cuisines: string[]
  proteinSources: string[]
  exclusions: {
    categories: string[]
    recipes: string[]
    ingredients: string[]
  }
}

export const createRule = ({
  ruleName,
  cuisines = [],
  proteinSources = [],
  exclusions,
}: DeepPartial<RecipeRule>): RuleProperties => {
  if (!ruleName) {
    throw new Error('rule name undefined')
  }
  const categories = (exclusions && exclusions.categories) || []
  const recipes = (exclusions && exclusions.recipes) || []
  const ingredients = (exclusions && exclusions.ingredients) || []

  const cuisinesInclusion = {
    fact: 'cuisine',
    operator: 'in',
    value: cuisines,
  }

  const proteinSourcesInclusion = {
    fact: 'proteinSource',
    operator: 'in',
    value: proteinSources,
  }

  const recipeExclusions = recipes.map((value) => ({
    fact: 'id',
    operator: 'notEqual',
    value,
  }))

  const categoryExclusions = categories.map((value) => ({
    fact: 'category',
    operator: 'notEqual',
    value,
  }))

  const ingredientExclusions = ingredients.map((value) => ({
    fact: 'ingredients',
    operator: 'doesNotContain',
    value,
  }))

  return new Rule({
    conditions: {
      any: [
        {
          all: [
            cuisinesInclusion,
            ...categoryExclusions,
            ...recipeExclusions,
            ...ingredientExclusions,
          ],
        },
        {
          all: [
            proteinSourcesInclusion,
            ...recipeExclusions,
            ...categoryExclusions,
            ...ingredientExclusions,
          ],
        },
      ],
    },
    event: {
      type: ruleName,
    },
  })
}
