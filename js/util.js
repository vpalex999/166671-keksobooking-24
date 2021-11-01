
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

const getNameOfPlace = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
    default:
      return `Неизвестный тип помещения: ${type}`;
  }
};

const latLngToAddress = (latLng) => {
  const { lat, lng } = latLng;
  return `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
};

const selectSelectElement = (selectElement, indexOption = 0) => {
  const listElement = selectElement.querySelectorAll('option');
  listElement.forEach((element) => element.removeAttribute('selected'));
  selectElement.value = '';
  listElement[indexOption].selected = 'selected';
};

const resetCheckboxListElement = (checkboxListElement) => {
  checkboxListElement.forEach((element) => element.checked = false);
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getRandomFloat,
  getMinimalPriceFromTypeHousing,
  getNameOfPlace,
  latLngToAddress,
  selectSelectElement,
  resetCheckboxListElement,
  isEscapeKey
};
