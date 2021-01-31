import { hierarchicalFilter, Hierarchy } from './hierarchicalFilter'

const DATA: Hierarchy = {
  mammals: {
    marsupials: ['koala', 'kangaroo', 'platypus'],
    placental: ['human'],
  },
  fish: {
    bony: ['barracuda', 'pufferfish', 'lionfish'],
    cartilaginous: {
      sharks: ['great white', 'hammerhead'],
      stingrays: ['giant freshwater', 'round', 'bluespotted'],
    },
    lampreys: {
      parasitic: ['northern brook', 'chestnut'],
      nonParasitic: ['least brook'],
    },
  },
}

describe('hierarchical filter', () => {
  it('returns a partially filter hierarchy', () => {
    expect(
      hierarchicalFilter(
        {
          mammals: {
            marsupials: ['koala', 'kangaroo'],
          },
          fish: {
            bony: ['barracuda', 'pufferfish'],
            cartilaginous: {
              sharks: ['great white', 'hammerhead'],
              stingrays: ['giant freshwater', 'bluespotted', 'round'],
            },
            lampreys: {
              parasitic: ['northern brook', 'chestnut'],
            },
          },
        },
        DATA,
      ),
    ).toEqual({
      mammals: {
        marsupials: ['platypus'],
        placental: ['human'],
      },
      fish: {
        bony: ['lionfish'],
        lampreys: {
          nonParasitic: ['least brook'],
        },
      },
    })
  })

  it('returns all the data if the filter is empty', () => {
    expect(hierarchicalFilter({}, DATA)).toEqual(DATA)
  })

  it('returns an empty object when the filter matches the data', () => {
    expect(hierarchicalFilter(DATA, DATA)).toEqual({})
  })
})
