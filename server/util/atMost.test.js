const atMost = require('./atMost')

describe('atMost', () => {
    it('returns empty array when quantity 0', () => {
        const array = [1, 2, 3]
        const quantity = 0

        const result = atMost(quantity, array)

        expect(result).toHaveLength(0)
    })

    it('returns same array when quantity is equal the length of it', () => {
        const array = [1, 2, 3]
        const quantity = array.length

        const result = atMost(quantity, array)

        expect(result).toEqual(array)
    })

    it('returns same array when quantity is greater the length of it', () => {
        const array = [1, 2, 3]
        const quantity = 10

        const result = atMost(quantity, array)

        expect(result).toEqual(array)
    })

    it('returns the array shorten to quantity when length is greater ', () => {
        const array = [1, 2, 3, 4, 5]
        const quantity = 3

        const result = atMost(quantity, array)

        expect(result).toHaveLength(3)
        expect(result).toEqual([1, 2, 3])
    })
})
