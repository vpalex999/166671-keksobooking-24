import {
  getMinimalPriceFromTypeHousing,
  latLngToAddress,
  selectSelectElement,
  resetCheckboxListElement
} from './util.js';
import { sendData } from './api.js';
import { closeAllPopup, initAddressMarker, displayInitData } from './map.js';
import { setActiveStateFormMapFilters, setInactiveStateFormMapFilters, resetFormFilters } from './form-filters.js';
import { openSuccessModal } from './succes-modal.js';
import { openErrorModal } from './error-modal.js';

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
const featuresCheckboxList = formNoticeElement.querySelectorAll('.features input');
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

const resetFormNotice = () => {
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
  resetCheckboxListElement(featuresCheckboxList);

  descriptionElement.value = '';
  imagesInputElement.value = '';

  displayInitData();
};

const doSuccesSendForm = () => {
  openSuccessModal();
  initAddressMarker();
  resetFormNotice();
  resetFormFilters();
  closeAllPopup();
};

const doErrorSendForm = () => {
  openErrorModal();
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
    doSuccesSendForm,
    doErrorSendForm,
    new FormData(evt.target),
  );
};

const onResetFormNotice = (evt) => {
  evt.preventDefault();
  initAddressMarker();
  resetFormNotice();
  resetFormFilters();
  closeAllPopup();
};

titleInputElement.addEventListener('invalid', onTitleInputValidation);
typeHousingSelectElement.addEventListener('change', onTypeHousingChange);
priceInputElement.addEventListener('invalid', onPriceInputValidation);
roomNumberSelectElement.addEventListener('change', onRoomNumberValidation);
formNoticeElement.addEventListener('submit', onSubmitFormNotice);
formNoticeElement.addEventListener('reset', onResetFormNotice);

const setInactiveStateFormNotice = () => {
  formNoticeElement.classList.add('ad-form--disabled');

  const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
  fieldsetListElement.forEach((fieldset) => fieldset.setAttribute('disabled', true));
};

const setActiveStateFormNotice = (map) => {
  const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
  fieldsetListElement.forEach((fieldset) => fieldset.removeAttribute('disabled'));
  formNoticeElement.classList.remove('ad-form--disabled');
  setAddressInput(map.getCenter());
};

const setInactiveState = () => {
  setInactiveStateFormMapFilters();
  setInactiveStateFormNotice();
};

const setActiveState = (map) => {
  setActiveStateFormNotice(map);
};

export {
  setInactiveState,
  setActiveState,
  setAddressInput,
  setActiveStateFormMapFilters
};
