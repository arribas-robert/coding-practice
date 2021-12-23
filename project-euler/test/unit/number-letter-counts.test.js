const { expect } = require('chai')
const NumLetterCounts = require('../../number-letter-counts')

describe('Project Euler Number-Letter-Counts Unit Tests:', () => {
  describe('#getNumLengthUnderOneHundred function', () => {
    it('should calculate the length of any number represented as a string(e.g. 20 => twenty) below 100 accurately', () => {
      const numsBelow100 = [...Array(100).keys()].map(
        NumLetterCounts.getNumLengthUnderOneHundred
      )
      const result = numsBelow100.reduce((acc, val) => {
        return acc + val
      }, 0)
      expect(result).to.be.a('number').and.to.equal(854)
    })

    it('should throw an error if the number value is greater than 99 ', () => {
      expect(() => NumLetterCounts.getNumLengthUnderOneHundred(100)).to.throw(
        'The #num value must not be greater than 99'
      )
    })
  })

  describe('#getFirstAndLastDigit function', () => {
    it('should return the first and last digits from a double digit number', () => {
      const { firstDigit, lastDigit } = NumLetterCounts.getFirstAndLastDigit(23)

      expect(firstDigit).to.be.a('number').and.to.equal(2)
      expect(lastDigit).to.be.a('number').and.to.equal(3)
    })
  })

  describe('#getNumLength function', () => {
    it('should throw an error if the #num value is not of type Number', () => {
      expect(() => NumLetterCounts.getNumLength('23')).to.throw(
        'The #num value must be of type Number'
      )

      expect(() => NumLetterCounts.getNumLength('')).to.throw(
        'The #num value must be of type Number'
      )
      expect(() => NumLetterCounts.getNumLength({})).to.throw(
        'The #num value must be of type Number'
      )
      expect(() => NumLetterCounts.getNumLength(true)).to.throw(
        'The #num value must be of type Number'
      )
      expect(() => NumLetterCounts.getNumLength(undefined)).to.throw(
        'The #num value must be of type Number'
      )
      expect(() => NumLetterCounts.getNumLength(null)).to.throw(
        'The #num value must be of type Number'
      )
    })

    it('should calculate the length of any number from 1-100 accurately', () => {
      // #num = 0
      const zeroAsNumValueAsNumValueCheck = NumLetterCounts.getNumLength(0)
      expect(zeroAsNumValueAsNumValueCheck).to.be.a('number').and.to.equal(0)

      const singleDigitCheck = NumLetterCounts.getNumLength(7)
      expect(singleDigitCheck).to.be.a('number').and.to.equal(5)

      // double digit check #num in teens
      const doubleDigitCheckTeens = NumLetterCounts.getNumLength(19)
      expect(doubleDigitCheckTeens).to.be.a('number').and.to.equal(10)

      // double digit check #num > 20
      const doubleDigitCheckGt20 = NumLetterCounts.getNumLength(47)
      expect(doubleDigitCheckGt20).to.be.a('number').and.to.equal(10)

      // importance: must not account for the word "and" in the calculated length
      const trplDigitCheckWithoutAndIncluded = NumLetterCounts.getNumLength(300)
      expect(trplDigitCheckWithoutAndIncluded)
        .to.be.a('number')
        .and.to.equal(12)

      // importance: must account for the word "and" in the calculated length
      const trplDigitCheckWithAndIncluded = NumLetterCounts.getNumLength(342)
      expect(trplDigitCheckWithAndIncluded).to.be.a('number').and.to.equal(23)

      // #num = 1000
      const oneThousandAsNumValueCheck = NumLetterCounts.getNumLength(1000)
      expect(oneThousandAsNumValueCheck).to.be.a('number').and.to.equal(11)
    })
  })
})
