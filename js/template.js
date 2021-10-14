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

const cardTemplate = document.querySelector('#card')
  .content.querySelector('.popup');
console.log(cardTemplate);


const cardElement = cardTemplate.cloneNode(true);
console.log('ElNode: ', cardElement);

const notice = createWizardNotice();
console.log('Notice: ', notice);

cardElement.querySelector('.popup__title').textContent = notice.offer.title;
cardElement.querySelector('.popup__text--address').textContent = notice.offer.address;
cardElement.querySelector('.popup__text--price').firstChild.textContent = `${notice.offer.price} `;
cardElement.querySelector('.popup__type').textContent = getNameOfPlace(notice.offer.type);
cardElement.querySelector('.popup__text--capacity').textContent = `${notice.offer.rooms} комнаты для ${notice.offer.guests} гостей`;
cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${notice.offer.checkin}, выезд до ${notice.offer.checkout}`;

const featuresElement = cardElement.querySelectorAll('.popup__feature');
featuresElement.forEach((featureElement) => {
  const isNecessary = notice.offer.features.some(
    (noticeFeature) => featureElement.classList.contains(`popup__feature--${noticeFeature}`)
  );
  if(!isNecessary){
    featureElement.remove();
  }
});

cardElement.querySelector('.popup__description').textContent = notice.offer.description;

const photos = cardElement.querySelector('.popup__photos');


console.log('FE2: ', cardElement);


console.log('El1: ', cardElement.textContent);
