import { getMarkerDataList, displayMarkerList } from './map.js';
import {
  selectSelectElement,
  resetCheckboxListElement,
  getNameOfPlace,
  getNameOfPrice
} from './util.js';

const formMapFiltersElement = document.querySelector('.map__filters');

const housingTypeSelectElement = formMapFiltersElement.querySelector('#housing-type');
const housingPriceSelectElement = formMapFiltersElement.querySelector('#housing-price');
const housingRoomsSelectElement = formMapFiltersElement.querySelector('#housing-rooms');
const housingGuestsSelectElement = formMapFiltersElement.querySelector('#housing-guests');
const housingFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
const mapFeaturesCheckboxList = housingFeaturesElement.querySelectorAll('input');

const getPopupContentElement = (marker, selector) => marker
  .getPopup()
  .getContent()
  .querySelector(selector);

const filterHousingType = (markerList) => {
  const value = housingTypeSelectElement.value;
  if (value === 'any') {
    return [...markerList];
  }
  return markerList.filter((marker) => {
    const element = getPopupContentElement(marker, '.popup__type');
    return element.textContent === getNameOfPlace(value);
  });
};

const filterHousingPrice = (markerList) => {
  const value = housingPriceSelectElement.value;
  if (value === 'any') {
    return [...markerList];
  }
  return markerList.filter((marker) => {
    const element = getPopupContentElement(marker, '.popup__text--price');
    const [minimal, maximal] = getNameOfPrice(value);
    const price = Number(element.firstChild.textContent);
    return price >= minimal && price <= maximal;
  });
};

const filterHousingRooms = (markerList) => {
  const value = housingRoomsSelectElement.value;
  if (value === 'any') {
    return [...markerList];
  }
  return markerList.filter((marker) => {
    const element = getPopupContentElement(marker, '.popup__text--capacity');
    return element.firstChild.textContent.startsWith(value);
  });
};

const filterHousingGuests = (markerList) => {
  const value = housingGuestsSelectElement.value;
  if (value === 'any') {
    return [...markerList];
  }
  return markerList.filter((marker) => {
    const element = getPopupContentElement(marker, '.popup__text--capacity');
    const [, second] = element.firstChild.textContent.split('для');
    const [numGests] = second.trim().split(' ');
    return Number(numGests) === Number(value);
  });
};

const filterHousingFeatures = ((markerList) => {
  const filteredFeatures = Array.from(mapFeaturesCheckboxList)
    .filter((element) => element.checked)
    .map((element) => element.value)
    .sort()
    .toString();

  const noticeFeatures = markerList.filter((marker) => {
    const noticeFeatureList = Array.from(getPopupContentElement(marker, '.popup__features')
      .querySelectorAll('.popup__feature'))
      .map((element) => {
        const features = [];
        element.classList.forEach((className) => {
          if (className.startsWith('popup__feature--')) {
            features.push(className.replace('popup__feature--', ''));
          }
        });
        return features.toString();
      })
      .sort()
      .toString();

    return filteredFeatures === noticeFeatureList;
  });

  return filteredFeatures.length === 0 ? markerList : noticeFeatures;
});

const onFilter = () => {
  const myPromise = new Promise((resolve) => resolve());
  myPromise
    .then(getMarkerDataList)
    .then(filterHousingType)
    .then(filterHousingPrice)
    .then(filterHousingRooms)
    .then(filterHousingGuests)
    .then(filterHousingFeatures)
    .then(displayMarkerList);
};

formMapFiltersElement.addEventListener('change', onFilter);

const setActiveStateFormMapFilters = () => {
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => mapFilter.removeAttribute('disabled'));

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.removeAttribute('disabled');
  formMapFiltersElement.classList.remove('map__filters--disabled');
};

const resetFormFilters = () => {
  selectSelectElement(housingTypeSelectElement);
  selectSelectElement(housingPriceSelectElement);
  selectSelectElement(housingRoomsSelectElement);
  selectSelectElement(housingGuestsSelectElement);
  resetCheckboxListElement(mapFeaturesCheckboxList);
};

const setInactiveStateFormMapFilters = () => {
  formMapFiltersElement.classList.add('map__filters--disabled');
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => mapFilter.setAttribute('disabled', true));

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.setAttribute('disabled', true);
};

export { setActiveStateFormMapFilters, setInactiveStateFormMapFilters, resetFormFilters };
