import { getMarkerDataList, displaySelectedMarkerList } from './map.js';
import { debounce } from './utils/debounce.js';
import {
  selectSelectElement,
  resetCheckboxListElement,
  getNameOfPlace,
  getNameOfPrice
} from './util.js';

const ANY = 'any';

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

const getFeaturesFromNotice = (marker) => {
  const noticeFeatureList = Array.from(
    getPopupContentElement(marker, '.popup__features').querySelectorAll('.popup__feature'))
    .map((element) => {
      const features = [];
      element.classList.forEach((className) => {
        if (className.startsWith('popup__feature--')) {
          features.push(className.replace('popup__feature--', ''));
        }
      });
      return features.toString();
    });
  return noticeFeatureList;
};

const getFeaturesRank = (filterFeatures, noticeFeatures) => {
  let rank = 0;
  if (filterFeatures.length === 0) {
    return rank;
  }

  rank = filterFeatures.reduce((total, feature) => {
    if (noticeFeatures.includes(feature)) {
      total += 1;
    }
    return total;
  }, 0);

  if (filterFeatures.sort().toString() === noticeFeatures.sort().toString()) {
    rank += 1;
  }
  return rank;
};

const compareFeatures = () => {
  const filteredFeatures = Array.from(mapFeaturesCheckboxList)
    .filter((element) => element.checked)
    .map((element) => element.value);

  const compare = (markerA, markerB) => {
    const featuresA = getFeaturesFromNotice(markerA);
    const featuresB = getFeaturesFromNotice(markerB);

    const rankA = getFeaturesRank(filteredFeatures, featuresA);
    const rankB = getFeaturesRank(filteredFeatures, featuresB);
    return rankB - rankA;
  };
  return compare;
};

const filterHousingType = (marker) => {
  const value = housingTypeSelectElement.value;
  if (value === ANY) {
    return true;
  }
  const element = getPopupContentElement(marker, '.popup__type');
  return element.textContent === getNameOfPlace(value);
};

const filterHousingPrice = (marker) => {
  const value = housingPriceSelectElement.value;
  if (value === ANY) {
    return true;
  }
  const element = getPopupContentElement(marker, '.popup__text--price');
  const [minimal, maximal] = getNameOfPrice(value);
  const price = Number(element.firstChild.textContent);
  return price >= minimal && price <= maximal;
};

const filterHousingRooms = (marker) => {
  const value = housingRoomsSelectElement.value;
  if (value === ANY) {
    return true;
  }
  const element = getPopupContentElement(marker, '.popup__text--capacity');
  return element.firstChild.textContent.startsWith(value);
};

const filterHousingGuests = (marker) => {
  const value = housingGuestsSelectElement.value;
  if (value === ANY) {
    return true;
  }
  const element = getPopupContentElement(marker, '.popup__text--capacity');
  const [, second] = element.firstChild.textContent.split('для');
  const [numGests] = second.trim().split(' ');
  return Number(numGests) === Number(value);
};

const filterHousingFeatures = (marker) => {
  const filteredFeatures = Array.from(mapFeaturesCheckboxList)
    .filter((element) => element.checked)
    .map((element) => element.value);

  const noticeFeatureList = Array.from(
    getPopupContentElement(marker, '.popup__features').querySelectorAll('.popup__feature'))
    .map((element) => {
      const features = [];
      element.classList.forEach((className) => {
        if (className.startsWith('popup__feature--')) {
          features.push(className.replace('popup__feature--', ''));
        }
      });
      return features.toString();
    });

  const isIncludesFeatures = filteredFeatures.every((feature) => noticeFeatureList.includes(feature));

  return filteredFeatures.length === 0 || isIncludesFeatures;
};

const onFilter = () => {
  const markerList = getMarkerDataList();
  const compareFeature = compareFeatures();
  const filteredMarkerList = markerList
    .slice()
    .sort((featureA, featureB) => compareFeature(featureA, featureB))
    .filter(
      (marker) =>
        filterHousingType(marker) &&
        filterHousingPrice(marker) &&
        filterHousingRooms(marker) &&
        filterHousingGuests(marker) &&
        filterHousingFeatures(marker),
    );

  displaySelectedMarkerList(filteredMarkerList);
};

const onCallbackReturn = (cb) => () => cb();

formMapFiltersElement.addEventListener('change', onCallbackReturn(debounce(onFilter)));

const setActiveStateFormMapFilters = () => {
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => {
    mapFilter.disabled = false;
  });

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.disabled = false;
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
  mapFiltersElement.forEach((mapFilter) => {
    mapFilter.disabled = true;
  });

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.disabled = true;
};

export {
  setActiveStateFormMapFilters,
  setInactiveStateFormMapFilters,
  resetFormFilters
};
