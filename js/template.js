import { createWizardNotice } from './data.js';

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

const cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');
console.log(cardTemplate);


const cardElement = cardTemplate.cloneNode(true);
console.log('ElNode: ', cardElement);

const notice = createWizardNotice();

const avatarElement = cardElement.querySelector('.popup__avatar');
(notice.author && notice.author.avatar) ?
  avatarElement.src = notice.author.avatar : hideElement(avatarElement);

const titleElement = cardElement.querySelector('.popup__title');
(notice.offer && notice.offer.title) ?
  titleElement.textContent = notice.offer.title : hideElement(titleElement);

const addressElement = cardElement.querySelector('.popup__text--address');
(notice.offer && notice.offer.address) ? addressElement.textContent = notice.offer.address : hideElement(addressElement);

const priceElement = cardElement.querySelector('.popup__text--price');
(notice.offer && notice.offer.price) ? priceElement.firstChild.textContent = `${notice.offer.price} ` : hideElement(priceElement);

const typeElement = cardElement.querySelector('.popup__type');
(notice.offer && notice.offer.type) ? typeElement.textContent = getNameOfPlace(notice.offer.type) : hideElement(typeElement);

const capacityElement = cardElement.querySelector('.popup__text--capacity');
(notice.offer && notice.offer.rooms && notice.offer.guests) ?
  capacityElement.textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей` : 
  hideElement(capacityElement);

const timeElement = cardElement.querySelector('.popup__text--time');
(notice.offer && notice.offer.checkin && notice.offer.checkout) ? 
  timeElement.textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}` :
  hideElement(timeElement);
  
const featuresElement = cardElement.querySelector('.popup__features');
if (notice.offer && notice.offer.features){
  const featuresList = featuresElement.querySelectorAll('.popup__feature');
  featuresList.forEach((featureElement) => {
    const isNecessary = notice.offer.features.some(
      (noticeFeature) => featureElement.classList.contains(`popup__feature--${noticeFeature}`)
      );
      if(!isNecessary){
        featureElement.remove();
      }
  });
} else {
  hideElement(featuresElement);
}

const descriptionElement = cardElement.querySelector('.popup__description');
(notice.offer && notice.offer.description) ? descriptionElement.textContent = notice.offer.description :
  hideElement(descriptionElement);

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

console.log('Photos: ', photosElement.children);

console.log('FE2: ', cardElement);


console.log('El1: ', cardElement.textContent);

const mapElement = document.querySelector('#map-canvas');
mapElement.appendChild(cardElement);
