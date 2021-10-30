import { getMinimalPriceFromTypeHousing, latLngToAddress } from './util.js';
import { displayError } from './error.js';
import { sendData } from './api.js';
import { initAddressMarker} from './map.js';

const formNoticeElement = document.querySelector('.ad-form');
const avatarInputElement = formNoticeElement.querySelector('#avatar');
const titleInputElement = formNoticeElement.querySelector('#title');
const addressInputElement = formNoticeElement.querySelector('#address');
const typeHousingSelectElement = formNoticeElement.querySelector('#type');
const timeInSelectElement = formNoticeElement.querySelector('#timein');
const timeOutSelectElement = formNoticeElement.querySelector('#timeout');
const priceInputElement = formNoticeElement.querySelector('#price');
const roomNumberSelectElement = formNoticeElement.querySelector('#room_number');
const capacitySelectElement = formNoticeElement.querySelector('#capacity');
const featuresInputList = formNoticeElement.querySelectorAll('.features input');
const descriptionElement = formNoticeElement.querySelector('#description');
const imagesInputElement = formNoticeElement.querySelector('#images');


const setCapacity = (rooms) => {
  const capacityListElement = capacitySelectElement.querySelectorAll('option');

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

const onSubmitFormNotice = (evt) => {
  evt.preventDefault();
  sendData(
    displayError,
    new FormData(evt.target),
  );
};

// TODO:
// перенести selectSelectElement функцию в утилиты
const selectSelectElement = (selectElement, indexOption=0) => {
  const listElement = selectElement.querySelectorAll('option');
  listElement.forEach((element) => element.removeAttribute('selected'));
  selectElement.value = '';
  listElement[indexOption].selected = 'selected';
};

const resetallInputsFormNotice = () => {
  avatarInputElement.value = '';
    titleInputElement.value = '';
  
    priceInputElement.value = '';
    priceInputElement.setAttribute('placeholder', '5000');

    selectSelectElement(typeHousingSelectElement);
    selectSelectElement(timeInSelectElement);
    selectSelectElement(timeOutSelectElement);
    selectSelectElement(typeHousingSelectElement, 1);
    selectSelectElement(roomNumberSelectElement);
    selectSelectElement(capacitySelectElement, 2);
    featuresInputList.forEach((element) => element.checked = false);
    descriptionElement.value = '';
    imagesInputElement.value = '';
};

const onResetFormNotice = (evt) => {
  evt.preventDefault();
  resetallInputsFormNotice();
  initAddressMarker();
  // - фильтрация (состояние фильтров и отфильтрованные метки) сбрасывается;
  resetAllFilters();
  resetFilteredMarkers();
  // - если на карте был показан балун, то он должен быть скрыт.
  hideAllBallons();
};

titleInputElement.addEventListener('invalid', onTitleInputValidation);
typeHousingSelectElement.addEventListener('change', onTypeHousingChange);
priceInputElement.addEventListener('invalid', onPriceInputValidation);
roomNumberSelectElement.addEventListener('change', onRoomNumberValidation);
formNoticeElement.addEventListener('submit', onSubmitFormNotice);
formNoticeElement.addEventListener('reset', onResetFormNotice)

const formMapFiltersElement = document.querySelector('.map__filters');

const setInactiveStateFormNotice = () => {
  formNoticeElement.classList.add('ad-form--disabled');

  const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
  fieldsetListElement.forEach((fieldset) => fieldset.setAttribute('disabled', true));
};

const setActiveStateFormNotice = (map) => {
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => mapFilter.removeAttribute('disabled'));

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.removeAttribute('disabled');
  formMapFiltersElement.classList.remove('map__filters--disabled');

  setAddressInput(map.getCenter());
};

const setActiveStateFormMapFilters = () => {
  const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
  fieldsetListElement.forEach((fieldset) => fieldset.removeAttribute('disabled'));
  formNoticeElement.classList.remove('ad-form--disabled');
};

const setInactiveStateFormMapFilters = () => {
  formMapFiltersElement.classList.add('map__filters--disabled');
  const mapFiltersElement = formMapFiltersElement.querySelectorAll('.map__filter');
  mapFiltersElement.forEach((mapFilter) => mapFilter.setAttribute('disabled', true));

  const mapFeaturesElement = formMapFiltersElement.querySelector('#housing-features');
  mapFeaturesElement.setAttribute('disabled', true);
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
