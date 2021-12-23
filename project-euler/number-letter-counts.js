/**
 * * Prompt:
 * * If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.
 * * If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?
 * * NOTE: Do not count spaces or hyphens. For example, 342 (three hundred and forty-two) contains 23 letters and 115 (one hundred and fifteen) contains 20 letters. The use of "and" when writing out numbers is in compliance with British usage.
 */

/**
 * Steps:
 * 1. Know the input and output of the problem (e.g. input is list containing the numbers 1-1000 (represented as type Number) and output should be a Number, sum of all the lengths of each number represented as it's string value)
 * 2. Determine what and how many unique numbers from 1-100 there are. (e.g)
 * 3. Calculate the lengths of numbers under 1-20 ( single digits and numbers in the teens)
 * 4. Calculate the lengths of numbers under 100 (double digit numbers)
 * 5. Calculate the lengths of numbers under 100-999 (triple digit numbers)
 * 6. Calculate the lengths of the number 1000
 * 3. Must account for the length of the word "and" (e.g. only relevant for digits in the hundreths, 121 => one hundred and twenty-one)
 * 4. Determine big O for solution and refactor accordingly.
 */

// ! My solution 21113
const main = () => {
  const total = [...Array(1000).keys()].map((val) => getNumLength(val))
  return total.reduce((acc, val) => {
    return (acc += val)
  }, 0)
}

const getNumLength = (num) => {
  if (typeof num !== 'number')
    throw new TypeError('The #num value must be of type Number')

  if (num < 100) return getNumLengthUnderOneHundred(num)

  let total = 0

  // had difficulty finding a good name for this variable, #tensPlaceVal
  const tensPlaceVal = num % 100

  if (num === 1000) total += getNumLengthUnderOneHundred(1) + 'thousand'.length

  // nums in the hundreths ending in 0 (e.g. 100, 200, 300, etc)
  total += numValueUnderTwentyArr[Math.floor(num / 100)] + 'hundred'.length

  if (tensPlaceVal !== 0)
    total += 'and'.length + getNumLengthUnderOneHundred(tensPlaceVal)
  return total
}

const getNumLengthUnderOneHundred = (num) => {
  // not sure if we should just return or throw an error if num value is > 99, but technically any value > 99 shouldn't get here
  if (num > 99)
    throw new TypeError('The #num value must not be greater than 99')

  if (num < 20) return numValueUnderTwentyArr[num]

  const { firstDigit, lastDigit } = getFirstAndLastDigit(num)
  return (
    tenthsDigitLengthArr[matchValToTenthsDigitArrVal(firstDigit)] +
    numValueUnderTwentyArr[lastDigit]
  )
}

const getFirstAndLastDigit = (num) => {
  const numAsString = num.toString()
  return {
    firstDigit: Number(numAsString.slice(0, 1)),
    lastDigit: Number(numAsString.slice(-1)),
  }
}

const matchValToTenthsDigitArrVal = (char) => {
  switch (char) {
    case 2: {
      return 0
    }
    case 3: {
      return 1
    }
    case 4: {
      return 2
    }
    case 5: {
      return 3
    }
    case 6: {
      return 4
    }
    case 7: {
      return 5
    }
    case 8: {
      return 6
    }
    case 9: {
      return 7
    }
  }
}

const numValueUnderTwentyArr = [
  0,
  'one'.length,
  'two'.length,
  'three'.length,
  'four'.length,
  'five'.length,
  'six'.length,
  'seven'.length,
  'eight'.length,
  'nine'.length,
  'ten'.length,
  'eleven'.length,
  'twelve'.length,
  'thirteen'.length,
  'fourteen'.length,
  'fifteen'.length,
  'sixteen'.length,
  'seventeen'.length,
  'eighteen'.length,
  'nineteen'.length,
]

const tenthsDigitLengthArr = [
  'twenty'.length,
  'thirty'.length,
  'forty'.length,
  'fifty'.length,
  'sixty'.length,
  'seventy'.length,
  'eighty'.length,
  'ninety'.length,
]

module.exports = {
  main,
  getNumLength,
  getNumLengthUnderOneHundred,
  getFirstAndLastDigit,
}
