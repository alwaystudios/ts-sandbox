import { isPlainObject } from './isPlainObject'

export const removeFalsy = <T>(object: T): T => {
  if (!object || !isPlainObject(object)) {
    return object
  }

  return Object.keys(object).reduce((acc, key) => {
    const untypedValue = (object as any)[key]
    const value =
      Array.isArray(untypedValue) && !untypedValue.length
        ? undefined
        : typeof untypedValue === 'object' &&
          untypedValue !== null &&
          !Object.keys(untypedValue).length
        ? undefined
        : untypedValue

    return !value
      ? acc
      : {
          ...acc,
          [key]: value,
        }
  }, {} as T)
}
