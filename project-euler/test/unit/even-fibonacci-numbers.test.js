const { expect } = require('chai')
const EvenFibonacciNums = require('../../even-fibonacci-numbers')

describe('Project Euler Even Fibonacci Numbers Unit Tests: #calculateSum function ', () => {
  it('should calculate the sum of the even values when the #calculateSum fn is not provided any arguments', () => {
    // limit being tested is 4000000
    const result = EvenFibonacciNums.calculateSum()
    expect(result.sum).to.be.a('number').and.to.equal(4613732)
  })

  it('should calculate the sum of only the even values when given a maxLimit value', () => {
    // Fibonacci Sequence being tested:  1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987
    const limit = 1000
    const result = EvenFibonacciNums.calculateSum({
      maxLimit: limit,
    })

    expect(result)
      .to.be.an('object')
      .and.to.have.all.keys([
        'sum',
        'prevVal',
        'lastSeqValUsedInSumCalculation',
        'nextVal',
        'tempVal',
        'limit',
        'prevSum',
      ])

    // result.nextVal at this point was not  included in the calculation because it is greater than the limit
    expect(result.nextVal).to.be.a('number').and.to.be.greaterThan(limit)

    // result.prevSum is the second to last sum calculation and result.lastSeqValUsedInSumCalculation is the last result.nextVal used in the sum calculation bc the value is LESS THAN the limit.
    expect(result.prevSum + result.lastSeqValUsedInSumCalculation)
      .to.be.a('number')
      .and.to.equal(result.sum)
  })

  it('should calculate the sum of the even values when the #calculateSum fn uses a starting sequence starting that does NOT start at 1)', () => {
    const limit = 1133
    const result = EvenFibonacciNums.calculateSum({
      prevVal: 10,
      nextVal: 10,
      maxLimit: 1133,
    })
    expect(result.sum).to.be.a('number').and.to.equal(2310)
    expect(result.nextVal).to.be.a('number').and.to.be.lessThan(limit)
  })

  it('should throw an error when the starting values passed to the #calculateSum fn are not of type number', () => {
    expect(() =>
      EvenFibonacciNums.calculateSum({
        prevVal: '5',
        nextVal: 5,
        maxLimit: 1000,
      })
    ).to.throw('Sequence values must be of type number')
  })
})
