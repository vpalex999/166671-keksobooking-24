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

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
console.log(cardTemplate);


const cardElement = cardTemplate.cloneNode(true);
const notice = createWizardNotice();
console.log(notice);

cardElement.children[1].textContent = notice.offer.title;
cardElement.children[2].textContent = notice.offer.address;
cardElement.children[3].textContent = `${notice.offer.price} ₽/ночь`;
cardElement.children[4].textContent = getNameOfPlace(notice.offer.type);
console.log(cardElement);
