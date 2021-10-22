import { createWizardNotice } from './data.js';

// TODO:
// перенести в utils
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
      return `Неизвестный тип помещения: ${type}`;
  }
};

const hideElement = (element) => element.style.display = 'none';

const createCardElement = (notice) => {

  const cardTemplateElement = document.querySelector('#card').content.querySelector('.popup');
  const cardElement = cardTemplateElement.cloneNode(true);

  const avatarElement = cardElement.querySelector('.popup__avatar');
  if (notice.author && notice.author.avatar) {
    avatarElement.src = notice.author.avatar;
  } else {
    hideElement(avatarElement);
  }

  const titleElement = cardElement.querySelector('.popup__title');
  if (notice.offer && notice.offer.title) {
    titleElement.textContent = notice.offer.title;
  } else {
    hideElement(titleElement);
  }

  const addressElement = cardElement.querySelector('.popup__text--address');
  if (notice.offer && notice.offer.address) {
    addressElement.textContent = notice.offer.address;
  } else {
    hideElement(addressElement);
  }

  const priceElement = cardElement.querySelector('.popup__text--price');
  if (notice.offer && notice.offer.price) {
    priceElement.firstChild.textContent = `${notice.offer.price} `;
  } else {
    hideElement(priceElement);
  }

  const typeElement = cardElement.querySelector('.popup__type');
  if (notice.offer && notice.offer.type) {
    typeElement.textContent = getNameOfPlace(notice.offer.type);
  } else {
    hideElement(typeElement);
  }

  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  if (notice.offer && notice.offer.rooms && notice.offer.guests) {
    capacityElement.textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей`;
  } else {
    hideElement(capacityElement);
  }

  const timeElement = cardElement.querySelector('.popup__text--time');
  if (notice.offer && notice.offer.checkin && notice.offer.checkout) {
    timeElement.textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}`;
  } else {
    hideElement(timeElement);
  }

  const featuresElement = cardElement.querySelector('.popup__features');
  if (notice.offer && notice.offer.features) {
    const featureListElement = featuresElement.querySelectorAll('.popup__feature');
    featureListElement.forEach((featureElement) => {
      const isNecessary = notice.offer.features.some(
        (noticeFeature) => featureElement.classList.contains(`popup__feature--${noticeFeature}`),
      );
      if (!isNecessary) {
        featureElement.remove();
      }
    });
  } else {
    hideElement(featuresElement);
  }

  const descriptionElement = cardElement.querySelector('.popup__description');
  if (notice.offer && notice.offer.description) {
    descriptionElement.textContent = notice.offer.description;
  } else {
    hideElement(descriptionElement);
  }

  const photosElement = cardElement.querySelector('.popup__photos');
  if (notice.offer && notice.offer.photos) {
    const photoElement = photosElement.querySelector('.popup__photo');
    const tempPhotoElement = photoElement.cloneNode(true);
    photoElement.remove();

    notice.offer.photos.forEach((photo) => {
      const newPhotoElement = tempPhotoElement.cloneNode(true);
      newPhotoElement.src = photo;
      photosElement.appendChild(newPhotoElement);
    });
  } else {
    hideElement(photosElement);
  }

  return cardElement;
};

const noticeList = Array.from({ length: 10 }, createWizardNotice);
const cards = noticeList.map((notice) => createCardElement(notice));

const mapElement = document.querySelector('#map-canvas');
mapElement.appendChild(cards[0]);
