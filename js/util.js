
const getRandomInteger = (min, max) => {
  if ((min > max || min < 0 || max < 0)) {
    return -1;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, numberDecimals) => {
  if (min > max || min < 0 || max < 0) {
    return -1;
  }

  if (numberDecimals < 0) {
    numberDecimals = 0;
  }

  const randomValue = Math.random() * (max - min + 1) + min;

  return randomValue.toFixed(numberDecimals);
};

const getMinimalPriceFromTypeHousing = (nameType) => {
  switch (nameType) {
    case 'flat':
      return 1000;
    case 'bungalow':
      return 0;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
    case 'hotel':
      return 3000;
    default:
      return 0;
  }
};

export {
  getRandomInteger,
  getRandomFloat,
  getMinimalPriceFromTypeHousing
};
