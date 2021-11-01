import { selectSelectElement, resetCheckboxListElement } from './util.js';

const formMapFiltersElement = document.querySelector('.map__filters');

const housingTypeSelectElement = formMapFiltersElement.querySelector('#housing-type');
const housingPriceSelectElement = formMapFiltersElement.querySelector('#housing-price');
const housingRoomsSelectElement = formMapFiltersElement.querySelector('#housing-rooms');
const housingGuestsSelectElement = formMapFiltersElement.querySelector('#housing-guests');
const housingFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
const mapFeaturesCheckboxList = housingFeaturesElement.querySelectorAll('input');

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
