
const NUMBER_NOTICE = 10;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 10;
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const TYPE_PLACES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const MAX_ROOMS = 10;
const MAX_GUESTS = 10;
const CHECKIN_LIST = ['12:00', '13:00', '14:00'];
const FEATURES_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS_LIST = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;

const getRandomInteger = (min, max) => {
  if ((min > max || min < 0 || max < 0)) {
    return -1;
  }

  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (min, max, numberDecimals) => {
  if (min > max || min < 0 || max < 0) {
    return -1;
  }

  if (numberDecimals < 0) {
    numberDecimals = 0;
  }

  const randomValue = Math.random() * (max - min + 1) + min;

  return randomValue.toFixed(numberDecimals);
};

const randomAvatarImage = () => {
  const numberAvatar = getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER);
  const firstSumbol = (numberAvatar < 10) ? '0' : '';

  return `img/avatars/user${firstSumbol}${numberAvatar}.png`;
};

const randomTitle = () => {
  const randomNotice = getRandomInteger(1, NUMBER_NOTICE);
  return `Заголовок предложения ${randomNotice}`;
};

const randomLocation = () => ({
  lat: getRandomFloat(MIN_LAT, MAX_LAT, 5),
  lng: getRandomFloat(MIN_LNG, MAX_LNG, 5),
});

const setAddress = (location) => {
  const { lat, lng } = location;
  return `${lat}, ${lng}`;
};

const randomPrice = () => getRandomInteger(MIN_PRICE, MAX_PRICE);

const randomTypePlaces = () => {
  const randomIndex = getRandomInteger(0, TYPE_PLACES.length - 1);
  return TYPE_PLACES[randomIndex];
};

const randomRooms = () => getRandomInteger(1, MAX_ROOMS);

const randomGuests = () => getRandomInteger(1, MAX_GUESTS);

const randomCheckIn = () => {
  const randomIndex = getRandomInteger(0, CHECKIN_LIST.length - 1);
  return CHECKIN_LIST[randomIndex];
};

const randomFeature = () => {
  const randomFeatureIndex = getRandomInteger(0, FEATURES_LIST.length - 1);
  return FEATURES_LIST[randomFeatureIndex];
};

const randomArrayItems = (sizeArray, randomFunc) => {
  const isWork = true;
  while (isWork) {
    let isContinue = true;
    const features = Array.from({ length: sizeArray }, randomFunc);

    for (let index = 0; index <= features.length - 1; index++) {
      const countItem = features.filter((item) => item === features[index]);

      if (countItem.length > 1) {
        isContinue = true;
        break;
      } else {
        isContinue = false;
      }
    }

    if (!isContinue) {
      return features;
    }
  }
};

const randomFeatures = () => {
  const randomFeaturesCount = getRandomInteger(1, FEATURES_LIST.length);
  return randomArrayItems(randomFeaturesCount, randomFeature);
};


const randomDescription = () => {
  const randomNumber = getRandomInteger(1, 100);
  return `Помещение №${randomNumber}`;
};


const randomPhoto = () => {
  const randomPhotoIndex = getRandomInteger(0, PHOTOS_LIST.length - 1);
  return PHOTOS_LIST[randomPhotoIndex];
};

const randomPhotos = () => {
  const randomPhotosCount = getRandomInteger(1, PHOTOS_LIST.length);
  return randomArrayItems(randomPhotosCount, randomPhoto);
};

const createWizardNotice = () => {

  const notice = {
    author: ({
      avatar: randomAvatarImage(),
    }),
    offer: ({
      title: randomTitle(),
      address: ',',
      price: randomPrice(),
      type: randomTypePlaces(),
      rooms: randomRooms(),
      guests: randomGuests(),
      checkin: randomCheckIn(),
      checkout: randomCheckIn(),
      features: randomFeatures(),
      description: randomDescription(),
      photos: randomPhotos(),
    }),
    location: randomLocation(),

    setAddress() {
      this.offer.address = setAddress(this.location);
    },
  };

  notice.setAddress();
  return notice;
};

const noticeList = () => Array.from({ length: 10 }, createWizardNotice);
noticeList();
