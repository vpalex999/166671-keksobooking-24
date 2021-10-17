
const formNoticeElement = document.querySelector('.ad-form');

const setInactiveStateFormNotice = () => {
  formNoticeElement.classList.add('ad-form--disabled');

  const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
  fieldsetListElement.forEach((fieldset) => fieldset.setAttribute('disabled', true));
};

const setActiveStateFormMapFilters = () => {
  const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
  fieldsetListElement.forEach((fieldset) => fieldset.removeAttribute('disabled'));

  formNoticeElement.classList.remove('ad-form--disabled');
};

const formMapFiltersElement = document.querySelector('.map__filters');

const setInactiveStateFormMapFilters = () => {
  formMapFiltersElement.classList.add('map__filters--disabled');
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => mapFilter.setAttribute('disabled', true));

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.setAttribute('disabled', true);
};

const setActiveStateFormNotice = () => {
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => mapFilter.removeAttribute('disabled'));

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.removeAttribute('disabled');
  formMapFiltersElement.classList.remove('map__filters--disabled');
};

const setInactiveState = () => {
  setInactiveStateFormMapFilters();
  setInactiveStateFormNotice();
};


const setActiveState = () => {
  setActiveStateFormMapFilters();
  setActiveStateFormNotice();
};

export {
  setInactiveState,
  setActiveState
};
