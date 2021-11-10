
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
      return 'Любой тип жилья';
  }
};

const getNameOfPrice = (valuePrice) => {
  switch (valuePrice) {
    case 'any':
      return 'Любая';
    case 'middle':
      return [10000, 49999];
    case 'low':
      return [0, 9999];
    case 'high':
      return [50000, 1000000];
    default:
      return 'Любая';
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
  checkboxListElement.forEach((element) => {
    element.checked = false;
  });
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getMinimalPriceFromTypeHousing,
  getNameOfPlace,
  getNameOfPrice,
  latLngToAddress,
  selectSelectElement,
  resetCheckboxListElement,
  isEscapeKey
};
