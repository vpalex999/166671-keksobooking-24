import { openSuccessModal } from './succes-modal.js';
import { openErrorModal } from './error-modal.js';
import { sendData } from './api.js';

import {
  getMinimalPriceFromTypeHousing,
  latLngToAddress,
  selectSelectElement,
  resetCheckboxListElement,
  loadHousingType
} from './util.js';

import {
  getMap,
  closeAllPopup,
  resetAddressMarker,
  displayInitData
} from './map.js';

import {
  setActiveStateFormMapFilters,
  setInactiveStateFormMapFilters,
  resetFormFilters
} from './form-filters.js';


const FILE_TYPES = ['png', 'jpg'];
const DEFAULT_AVATAR_IMAGE = 'img/muffin-grey.svg';
const NUMBER_ROOMS = 100;

const formNoticeElement = document.querySelector('.ad-form');
const previewAvatarElement = formNoticeElement.querySelector('.ad-form-header__preview img');
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
const previewHouseElement = formNoticeElement.querySelector('.ad-form__photo');

const setCapacity = (roomList) => {
  const capacityListElement = capacitySelectElement.querySelectorAll('option');

  capacityListElement.forEach((capacity) => {
    capacity.style.display = 'none';
    capacity.selected = false;
  });

  if (roomList === NUMBER_ROOMS) {
    capacityListElement.forEach((capacity) => {
      const capacityNums = Number(capacity.value);
      if (capacityNums === 0) {
        capacity.style.display = '';
      }
    });
  } else {
    capacityListElement.forEach((capacity) => {
      const capacityNums = Number(capacity.value);
      if (roomList >= capacityNums && capacityNums !== 0) {
        capacity.style.display = '';
      }
    });
  }

  for (const capacity of capacityListElement) {
    if (capacity.style.display !== 'none') {
      capacity.selected = true;
      break;
    }
  }
};

const setAddressInput = (lanLng) => {
  addressInputElement.value = latLngToAddress(lanLng);
};

const setPriceInputElement = (price) => {
  priceInputElement.value = '';
  priceInputElement.placeholder = price;
  priceInputElement.min = price;
};

const resetFormNotice = () => {
  previewAvatarElement.src = DEFAULT_AVATAR_IMAGE;
  avatarInputElement.value = '';
  titleInputElement.value = '';

  selectSelectElement(typeHousingSelectElement, 1);
  const flatPrice = getMinimalPriceFromTypeHousing(loadHousingType().FLAT);
  setPriceInputElement(flatPrice);

  selectSelectElement(timeInSelectElement);
  selectSelectElement(timeOutSelectElement);

  selectSelectElement(roomNumberSelectElement);
  setCapacity(roomNumberSelectElement.value);

  resetCheckboxListElement(featuresCheckboxList);

  descriptionElement.value = '';
  imagesInputElement.value = '';
  previewHouseElement.style.backgroundImage = '';

  displayInitData();
};

const doSuccesSendForm = () => {
  openSuccessModal();
  resetAddressMarker();
  resetFormNotice();
  resetFormFilters();
  closeAllPopup();
};

const doErrorSendForm = () => openErrorModal();

const onAvatarImagePreview = () => {
  const file = avatarInputElement.files[0];
  const fileName = file.name.toLowerCase();

  const matchers = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matchers) {
    previewAvatarElement.src = URL.createObjectURL(file);
  }
};

const onHouseImagePreview = () => {
  const file = imagesInputElement.files[0];
  const fileName = file.name.toLowerCase();
  const matchers = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matchers) {
    previewHouseElement.style.backgroundImage = `url('${URL.createObjectURL(file)}')`;
    previewHouseElement.style.backgroundSize = 'cover';
  }
};

const onTitleInputValidation = () => {
  if (titleInputElement.validity.tooShort) {
    titleInputElement.setCustomValidity('?????????????????? ???????????????????? ???????????? ???????????????? ?????????????? ???? 30-???? ????????????????');
  } else if (titleInputElement.validity.tooLong) {
    titleInputElement.setCustomValidity('?????????????????? ???????????????????? ???? ???????????? ?????????????????? 100 ????????????????');
  } else if (titleInputElement.validity.valueMissing) {
    titleInputElement.setCustomValidity('???????????????????????? ????????');
  } else {
    titleInputElement.setCustomValidity('');
  }
};

const onTypeHousingChange = (evt) => {
  const price = getMinimalPriceFromTypeHousing(evt.target.value);
  setPriceInputElement(price);
};

const onPriceInputValidation = () => {
  if (priceInputElement.validity.rangeUnderflow) {
    const minimalPrice = priceInputElement.min;
    priceInputElement.setCustomValidity(`???????? ???? ???????? ???? ???????????? ???????? ???????????? ${minimalPrice}`);
  } else if (priceInputElement.validity.rangeOverflow) {
    priceInputElement.setCustomValidity('???????? ???? ???????? ???? ???????????? ?????????????????? ???????????????? 1000000');
  } else if (priceInputElement.validity.valueMissing) {
    priceInputElement.setCustomValidity('???????????????????????? ????????');
  } else {
    priceInputElement.setCustomValidity('');
  }
};

const onTimeInChange = (evt) => {
  timeOutSelectElement.value = evt.target.value;
};

const onTimeOutChange = (evt) => {
  timeInSelectElement.value = evt.target.value;
};

const onRoomNumberValidation = (evt) => {
  const roomsNumber = Number(evt.target.value);
  setCapacity(roomsNumber);
};

const onSubmitFormNotice = (evt) => {
  evt.preventDefault();
  sendData(doSuccesSendForm, doErrorSendForm, new FormData(evt.target));
};

const onResetFormNotice = (evt) => {
  evt.preventDefault();
  resetAddressMarker();
  resetFormNotice();
  resetFormFilters();
  closeAllPopup();
};

avatarInputElement.addEventListener('change', onAvatarImagePreview);
titleInputElement.addEventListener('invalid', onTitleInputValidation);
typeHousingSelectElement.addEventListener('change', onTypeHousingChange);
priceInputElement.addEventListener('invalid', onPriceInputValidation);
timeInSelectElement.addEventListener('change', onTimeInChange);
timeOutSelectElement.addEventListener('change', onTimeOutChange);
roomNumberSelectElement.addEventListener('change', onRoomNumberValidation);
imagesInputElement.addEventListener('change', onHouseImagePreview);
formNoticeElement.addEventListener('submit', onSubmitFormNotice);
formNoticeElement.addEventListener('reset', onResetFormNotice);

const setInactiveStateFormNotice = () => {
  formNoticeElement.classList.add('ad-form--disabled');

  const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
  fieldsetListElement.forEach((fieldset) => {
    fieldset.disabled = true;
  });
};

const setActiveStateFormNotice = () => {
  resetFormNotice();
  const fieldsetListElement = formNoticeElement.querySelectorAll('fieldset');
  fieldsetListElement.forEach((fieldset) => {
    fieldset.disabled = false;
  });

  formNoticeElement.classList.remove('ad-form--disabled');
  setAddressInput(getMap().getCenter());
};

const setInactiveState = () => {
  setInactiveStateFormMapFilters();
  setInactiveStateFormNotice();
};

const setActiveState = () => setActiveStateFormNotice();

export {
  setInactiveState,
  setActiveState,
  setAddressInput,
  setActiveStateFormMapFilters
};
