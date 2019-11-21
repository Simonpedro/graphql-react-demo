/**
 * Return at most {quantity} elements from array
 *
 * @param {number} quantity
 * @param {array} array
 */
const atMost = (quantity, array) =>
    array.slice(0, Math.min(quantity, array.length))

module.exports = atMost
