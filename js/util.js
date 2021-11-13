const HousingType = {
  FLAT: 'flat',
  BUNGALOW: 'bungalow',
  HOUSE: 'house',
  PALACE: 'palace',
  HOTEL: 'hotel',
};

const getMinimalPriceFromTypeHousing = (nameType) => {
  switch (nameType) {
    case HousingType.FLAT:
      return 1000;
    case HousingType.BUNGALOW:
      return 0;
    case HousingType.HOUSE:
      return 5000;
    case HousingType.PALACE:
      return 10000;
    case HousingType.HOTEL:
      return 3000;
    default:
      return 0;
  }
};

const getNameOfPlace = (type) => {
  switch (type) {
    case HousingType.FLAT:
      return 'Квартира';
    case HousingType.BUNGALOW:
      return 'Бунгало';
    case HousingType.HOUSE:
      return 'Дом';
    case HousingType.PALACE:
      return 'Дворец';
    case HousingType.HOTEL:
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
  listElement.forEach((element) => {
    element.selected = false;
  });

  selectElement.value = '';
  listElement[indexOption].selected = true;
};

const resetCheckboxListElement = (checkboxListElement) => {
  checkboxListElement.forEach((element) => {
    element.checked = false;
  });
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const loadHousingType = () => HousingType;

export {
  getMinimalPriceFromTypeHousing,
  getNameOfPlace,
  getNameOfPrice,
  latLngToAddress,
  selectSelectElement,
  resetCheckboxListElement,
  isEscapeKey,
  loadHousingType
};
