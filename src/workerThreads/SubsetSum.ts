import { EventEmitter } from 'events'

export class SubsetSum extends EventEmitter {
  #sum: number
  #set: number[]

  constructor(sum: number, set: number[]) {
    super()
    this.#sum = sum
    this.#set = set
  }

  private combine(set: number[], subset: number[]) {
    for (let i = 0; i < set.length; i++) {
      const newSubset = subset.concat(set[i])
      this.combine(set.slice(i + 1), newSubset)
      this.processSubset(newSubset)
    }
  }

  private processSubset(subset: number[]) {
    const res = subset.reduce((prev, item) => prev + item, 0)
    if (res === this.#sum) {
      this.emit('match', subset)
    }
  }

  process() {
    this.combine(this.#set, [])
    this.emit('end')
  }
}
