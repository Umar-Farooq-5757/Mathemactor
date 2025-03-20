export default function decimalToFraction(decimal) {
  if (Number.isInteger(decimal)) {
    return { numerator: decimal, denominator: 1 };
  }

  const decimalString = decimal.toString();
  const decimalPlaces = decimalString.split(".")[1].length;
  const numerator = decimal * Math.pow(10, decimalPlaces);
  const denominator = Math.pow(10, decimalPlaces);

  function greatestCommonDivisor(a, b) {
    return b ? greatestCommonDivisor(b, a % b) : a;
  }

  const commonDivisor = greatestCommonDivisor(numerator, denominator);

  return {
    numerator: numerator / commonDivisor,
    denominator: denominator / commonDivisor,
  };
}
