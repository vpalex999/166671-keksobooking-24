
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


export {
  getRandomInteger,
  getRandomFloat
};
