import { getMinimalPriceFromTypeHousing, latLngToAddress } from './util.js';

const formNoticeElement = document.querySelector('.ad-form');
const titleInputElement = formNoticeElement.querySelector('#title');
const addressInputElement = formNoticeElement.querySelector('#address');
const typeHousingElement = formNoticeElement.querySelector('#type');
const priceInputElement = formNoticeElement.querySelector('#price');
const roomNumberElement = formNoticeElement.querySelector('#room_number');
const capacityElement = formNoticeElement.querySelector('#capacity');

const setCapacity = (rooms) => {
  const capacityListElement = capacityElement.querySelectorAll('option');

  capacityListElement.forEach((capacity) => {
    capacity.style.display = 'none';
    capacity.removeAttribute('selected');
  });

  if (rooms === 100) {
    capacityListElement.forEach((capacity) => {
      const capacityNums = Number(capacity.value);
      if (capacityNums === 0) {
        capacity.style.display = '';
      }
    });
  } else {
    capacityListElement.forEach((capacity) => {
      const capacityNums = Number(capacity.value);
      if (rooms >= capacityNums && capacityNums !== 0) {
        capacity.style.display = '';
      }
    });
  }

  for (const capacity of capacityListElement) {
    if (capacity.style.display !== 'none') {
      capacity.setAttribute('selected', 'selected');
      break;
    }
  }
};

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

const setAddressInput = (lanLng) => {
  addressInputElement.value = latLngToAddress(lanLng);
};

const onTitleInputValidation = () => {
  if (titleInputElement.validity.tooShort) {
    titleInputElement.setCustomValidity('Заголовок объявления должен состоять минимум их 30-ти символов');
  } else if (titleInputElement.validity.tooLong) {
    titleInputElement.setCustomValidity('Заголовок объявления не должен превышать 100 символов');
  } else if (titleInputElement.validity.valueMissing) {
    titleInputElement.setCustomValidity('Обязательное поле');
  } else {
    titleInputElement.setCustomValidity('');
  }
};

const onTypeHousingChange = (evt) => {
  const price = getMinimalPriceFromTypeHousing(evt.target.value);
  priceInputElement.setAttribute('placeholder', price);
  priceInputElement.setAttribute('min', price);
};

const onPriceInputValidation = () => {
  if (priceInputElement.validity.rangeUnderflow) {
    const minimalPrice = priceInputElement.getAttribute('min');
    priceInputElement.setCustomValidity(`Цена за ночь не должна быть меньше ${minimalPrice}`);
  } else if (priceInputElement.validity.rangeOverflow) {
    priceInputElement.setCustomValidity('Цена за ночь не должна превышать значения 1000000');
  } else if (priceInputElement.validity.valueMissing) {
    priceInputElement.setCustomValidity('Обязательное поле');
  } else {
    priceInputElement.setCustomValidity('');
  }
};

const onRoomNumberValidation = (evt) => {
  const roomsNumber = Number(evt.target.value);
  setCapacity(roomsNumber);
};

titleInputElement.addEventListener('invalid', onTitleInputValidation);
typeHousingElement.addEventListener('change', onTypeHousingChange);
priceInputElement.addEventListener('invalid', onPriceInputValidation);
roomNumberElement.addEventListener('change', onRoomNumberValidation);


const formMapFiltersElement = document.querySelector('.map__filters');

const setInactiveStateFormMapFilters = () => {
  formMapFiltersElement.classList.add('map__filters--disabled');
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => mapFilter.setAttribute('disabled', true));

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.setAttribute('disabled', true);
};

const setActiveStateFormNotice = (map) => {
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => mapFilter.removeAttribute('disabled'));

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.removeAttribute('disabled');
  formMapFiltersElement.classList.remove('map__filters--disabled');

  setAddressInput(map.getCenter());
};

const setInactiveState = () => {
  setInactiveStateFormMapFilters();
  setInactiveStateFormNotice();
};


const setActiveState = (map) => {
  setActiveStateFormMapFilters();
  setActiveStateFormNotice(map);
};

export {
  setInactiveState,
  setActiveState,
  setAddressInput
};
